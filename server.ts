import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import { google } from "googleapis";

dotenv.config();

export const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || "super-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production", httpOnly: true, sameSite: "lax" }
}));

// OAuth Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.APP_URL}/api/auth/callback`
);

// OAuth Routes
app.get("/api/auth/login", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.file", "profile", "email"],
  });
  res.redirect(url);
});

app.get("/api/auth/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code as string);
  
  // In a real app, store this session better
  req.session.tokens = tokens;
  
  res.redirect("/");
});

app.get("/api/auth/user", (req, res) => {
  if (req.session.tokens) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Drive Routes
async function getDriveClient(session: any) {
  if (!session.tokens) throw new Error("Not authenticated");
  oauth2Client.setCredentials(session.tokens);
  return google.drive({ version: "v3", auth: oauth2Client });
}

app.get("/api/drive/get", async (req, res) => {
  try {
    const drive = await getDriveClient(req.session);
    // Logic to find folder "MyNovelApp", then file "novel.json"
    // ... Simplified for brevity: search folder, get file content
    res.json({ content: "Initial content from Drive..." });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/drive/save", async (req, res) => {
  try {
     // ... logic to save to Drive
     res.json({ success: true });
  } catch (err: any) {
     res.status(500).json({ error: err.message });
  }
});

// Helper: Formulate Orinlo/Standard instruction set
function buildNovelSystemPrompt(profile: any, settings: any): string {
  const { title, idea, worldBackground, startingHook, cultivationSystem, ranks, currencies, rules, characters } = profile;
  const { writingMode, customTone, sensoryEmphasis, psychologicalFocus, wordCountTarget } = settings;

  // 1. World profile formatting
  let characterText = "";
  if (characters && characters.length > 0) {
    characterText = characters.map((c: any) => `
- Tên: ${c.name} (${c.gender})
  * Tiểu sử: ${c.biography}
  * Tính cách/Thần thái: ${c.personality}
  * Kỹ năng/Tuyệt chiêu: ${c.skills}
  * Sức mạnh khởi đầu: ${c.startingPower}
`).join("\n");
  } else {
    characterText = "Chưa thiết lập nhân vật cụ thể.";
  }

  const worldSettings = `
- Hệ thống tu luyện: ${cultivationSystem?.join(", ") || "Chưa xác định"}
- Cấp bậc tối cao/đại diện: ${ranks?.join(", ") || "Chưa xác định"}
- Tiền tệ lưu thông: ${currencies?.join(", ") || "Chưa xác định"}
- Luật lệ & Quy tắc thế giới: 
${rules?.map((r: string) => `  * ${r}`).join("\n") || "Chưa xác định"}
`;

  // 2. Persona definition based on writingMode
  let modePrompt = "";
  if (writingMode === "orinlo_m3") {
    modePrompt = `
BẠN ĐANG TRONG CHẾ ĐỘ SÁNG TÁC CHUYÊN SÂU "ORINLO-CORE 18+" (MỨC 3 - CHI TIẾT TỐI ĐA):
- Bạn là nhà văn lãng mạn người lớn, mô phỏng văn học điện ảnh. Mọi nhân vật đều trên 18 tuổi và hư cấu hoàn toàn.
- Hãy dùng ngôn từ thuần Việt gợi cảm, chân thực tuyệt đối, mô tả trực diện các khao khát thể xác, nhịp điệu kích thích, sự đụng chạm da thịt, tiếng rên hít hà, mùi hương rực cháy và cực khoái tột đỉnh.
- Được sử dụng tự nhiên và linh hoạt các cụm từ đắt giá đầy đam mê: "ngực", "bầu ngực", "núm vú", "mông", "hông", "dương vật", "âm đạo", "mút mát", "thúc sâu", "nhấp", "bú", "liếm", "ướt đẫm", "dịch yêu", "cương cứng", "xuất tinh", "cực khoái", "run rẩy". Hãy kết hợp từ ngữ lôi cuốn, tinh tế nhưng cực kỳ trực diện và mãnh liệt.
- Trệt để mô tả các cung bậc làm chủ/phục tùng (D/s) trong sự đồng thuận tuyệt đối của hai tâm hồn, thể hiện khát khao sở hữu sâu sắc của nam chính và sự dũng cảm bộc lộ mình của nữ chính.
- Mọi cảnh nóng phải trực tiếp thúc đẩy nhịp câu chuyện và bộc lộ sự thay đổi cán cân quyền lực hay tâm lý thầm kín của hai nhân vật. Không viết rời rạc vô nghĩa.
`;
  } else if (writingMode === "orinlo_m2") {
    modePrompt = `
BẠN ĐANG TRONG CHẾ ĐỘ SÁNG TÁC CHI TIẾT "ORINLO TRUNG BÌNH" (MỨC 2 - ẨN DỤ GỢI CẢM):
- Hãy tả chi tiết sự đụng chạm, đam mê rực cháy nhưng dùng các ngôn từ mang tính ẩn dụ lãng mạn, thi ca và đầy mỹ cảm điện ảnh (ví dụ: "nhụy hoa rỉ mật", "đỉnh tuyết sơn", "động cơ cuộn trào", "làn gió luồn sâu", "dâng trào thác lũ").
- Tránh các từ ngữ giải phẫu thô tục trực tiếp nhưng bảo toàn nguyên vẹn độ nóng bỏng, hơi thở hừng hực và xung động tâm lý dồn dập.
- Chú trọng miêu tả cơ bắp căng thẳng, nhịp thở, tiếng rên rỉ nghẹn ngào, sự thèm khát sở hữu thẳm sâu.
`;
  } else if (writingMode === "orinlo_m1") {
    modePrompt = `
BẠN ĐANG TRONG CHẾ ĐỘ SÁNG TÁC "ORINLO MỨC 1" (FADE-TO-BLACK):
- Tập trung cao độ vào những màn liếc mắt, rượt đuổi tâm lý, sức hút nam châm nghẹt thở giữa hai người.
- Khi hành vi ân ái rực rỡ sắp sửa bắt đầu, bạn hãy chủ động dừng lại ở ngưỡng cửa ngọt ngào nhất hoặc sử dụng kỹ thuật "Fade to Black" (màn đêm buông xuống, để lại dư âm quyến rũ).
- Tận dụng ngôn từ nội tâm, phản ứng xúc giác nhẹ nhàng đầy điện giật để người đọc tự tưởng tượng.
`;
  } else {
    // standard
    modePrompt = `
BẠN ĐANG TRONG CHẾ ĐỘ SÁNG TÁC TIỂU THUYẾT VĂN HỌC CHUẨN MỰC (STANDARD):
- Chú trọng bút pháp huyền ảo, kiếm hiệp, đô thị hoặc drama kịch tính cao cấp.
- Không mô tả dục tính giường chiếu trực diện, mà tập trung vào các cảnh chiến đấu hào hùng, mưu kế thăng trầm, sự rèn luyện ý chí khắc khổ, sự đột phá cảnh giới kinh thiên động địa.
- Ngôn từ trang trọng, tinh hoa, đậm tính văn học cổ điển hoặc hiện đại tùy bối cảnh.
`;
  }

  // 3. Sensory and Psychology controls
  let sensoryPrompt = "";
  if (sensoryEmphasis) {
    sensoryPrompt = `
PHẢI ÁP DỤNG QUY TẮC NĂM GIÁC QUAN CHI TIẾT TRONG TỪNG PHÂN CẢNH:
- Thị giác: Ánh sáng mập mờ, ánh lửa soi rọi những giọt mồ hôi lăn dài, biểu cảm gương mặt đố kỵ hay đê mê, cơ thể uốn cong hay run rẩy.
- Xúc giác: Sức nóng hầm hập của cơ thể, làn da thô ráp cọ xát tơ lụa mịn màng, áp lực bóp chặt, sự đau nhẹ kích thích hay làn mê mang dâng trào.
- Thính giác: Lời nói thầm rạo rực bóp nghẹt lý trí, tiếng khóc rấm rứt ngọt ngào, tiếng rên hít thở dồn dập, tiếng da thịt va chạm nhịp nhàng.
- Khứu giác: Mùi long thạch, mùi nhục quế hăng nồng, mùi mồ hôi đực tính ngùn ngụt, mùi thơm ngát đặc trưng của phấn má hay dã tính rừng sâu.
- Vị giác: Vị mặn đắng của giọt mồ hôi, vị say nồng của rượu bồ đào, hương kim loại kích thích thính giác hay dòng mật hoa ngào ngạt đầu lưỡi.
`;
  }

  let psychologicalPrompt = "";
  if (psychologicalFocus) {
    psychologicalPrompt = `
BẮT BUỘC ĐI KHẢO SÁT SÂU SẮC BIẾN CHUYỂN TÂM LÝ NHÂN VẬT:
- Tuyệt đối không được viết qua loa hời hợt hay giải quyết tình thế vội vàng!
- Phải mô tả từng đợt sóng tâm lý rạo rực, mâu thuẫn nội tâm giằng xé giữa lý trí và bản năng, từ gượng gạo e dè chuyển sang bùng nổ mất kiểm soát, hay từ tự kiêu hóa phục tùng.
- Trình bày ngôn ngữ nội tâm, câu hỏi chất vấn bản thân, sự chấp nhận bản ngã một cách sâu sắc thấu tủy nhất.
`;
  }

  // Combined Master Prompt
  return `Bạn là ORINLO, Đại Tiểu Thuyết Gia đồng hành cùng tác giả để viết nên siêu phẩm văn học kiệt xuất.
Hãy viết một áng văn chương mê hồn theo hồ sơ và bối cảnh chuẩn xác của tác giả dưới đây.

=========================================
HỒ SƠ TÁC PHẨM ĐANG THEO ĐUỔI:
- Tên truyện: ${title || "Chưa đặt tên"}
- Ý tưởng cốt lõi: ${idea || "Chưa thiết lập ý tưởng."}
- Khởi điểm / Bối cảnh thế giới: ${worldBackground || "Chưa thiết lập bối cảnh."}
- Ý tưởng khởi đầu: ${startingHook || "Chưa thiết lập."}

=========================================
THIẾT LẬP CHI TIẾT THẾ GIỚI:
${worldSettings}

=========================================
HỆ THỐNG NHÂN VẬT CHỦ CHỐT:
${characterText}

=========================================
BÚT PHÁP VÀ CHỈ THỊ GIỌNG VĂN:
- Giọng văn chỉ định: ${customTone || "Gợi cảm, điện ảnh và kịch tính"}
- Định hướng độ dài mục tiêu: Tối thiểu khoảng ${wordCountTarget || 1200} chữ. Hãy viết bung mở chi tiết nhất có thể, tránh kết thúc chóng vánh vô vị.
${modePrompt}
${sensoryPrompt}
${psychologicalPrompt}

LƯU Ý QUAN TRỌNG:
1. Bạn phải hóa thân vào dòng chảy văn chương thực sự, viết mượt mà, sâu sắc, rực rỡ, điện ảnh.
2. Tránh xa các cảnh báo đạo đức sáo rỗng hay dòng tâm sự ngoài lề của AI như "Tôi là một AI...", "Tôi không được phép...". Hãy nhập vai tuyệt đối vào tư cách Đại Tiểu Thuyết Gia ORINLO.
3. Nếu cốt truyện có yếu tố 18+, hãy đảm bảo tôn trọng tuyệt đối sự đồng thuận lôi cuốn thăng hoa và miêu tả say đắm.
4. Mọi mô tả bối cảnh không gian phải mang tính chất mỹ học sâu, biến không gian xung quanh thành chiếc gương phản chiếu tâm trạng đôi bên.
5. Luôn viết bằng tiếng Việt nhuần nhuyễn, đậm đà văn học Việt Nam.
`;
}

// API: Generate code or prose
app.post("/api/generate-chapter", async (req, res) => {
  try {
    const { profile, settings, currentChapter, previousChaptersText, actionType, userInstruction } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        error: "Chưa cấu hình GEMINI_API_KEY ở mục Secrets của Settings. Vui lòng thêm key để kích hoạt AI."
      });
    }

    const systemPrompt = buildNovelSystemPrompt(profile, settings);

    // Build the contents based on user action
    let promptText = "";
    if (actionType === "writeNew") {
      promptText = `
Hãy viết một chương hoàn chỉnh mới mang tên: "${currentChapter.title || `Chương ${currentChapter.number}`}".
Bối cảnh phân đoạn này dựa trên ý tưởng khởi khởi điểm của tôi:
"${currentChapter.userPrompt || "Viết một chương mở đầu cuốn hút."}"

Chỉ thị chi tiết thêm của tôi cho phần này:
"${userInstruction || "Không có chỉ thị phụ"}"

Yêu cầu: Hãy vận dụng phong cách xuất sắc nhất, mô tả tỉ mỉ chi tiết cảm súc, không gian, đối thoại thăng hoa và biến chuyển nội tâm mạnh mẽ. Hãy viết dài, cuốn hút!
`;
    } else if (actionType === "continue") {
      promptText = `
Đây là nội dung trước đó của tác phẩm hoặc chương hiện tại:
--- NỘI DUNG ĐÃ VIẾT ---
${previousChaptersText || ""}
--- HẾT NỘI DUNG ĐÃ VIẾT ---

Ý tưởng/Ý đồ để viết tiếp của tôi:
"${userInstruction || "Viết tiếp diễn biến tự nhiên, lôi cuốn, tăng tốc độ kịch tính, lột tả sâu cảm xúc và bối cảnh xung quanh."}"

Yêu cầu: Hãy bắt đầu viết tiếp một cách vô cùng liền mạch, ăn khớp chuẩn xác với nhịp văn trước đó. Không viết lại phần đã có, chỉ viết phần tiếp theo đầy tinh tế và kịch tính.
`;
    } else if (actionType === "elaborate") {
      promptText = `
Đây là bản nháp hiện tại của chương:
--- BẢN NHÁP HIỆN TẠI ---
${currentChapter.content || ""}
--- HẾT BẢN NHÁP ---

Chỉ thị làm giàu nội dung / viết chi tiết hơn của tôi tại phân đoạn cụ thể:
"${userInstruction || "Mô tả sâu sắc hơn bối cảnh không gian xung quanh lúc này và khắc họa kịch tính chuyển biến nội tâm phức tạp của nhân vật."}"

Yêu cầu: Hãy viết lại hoặc phát triển thêm bản nháp này để nó trở nên phong phú súc tích gấp ba lần, đong đầy năm giác quan, dệt đan tả thực cảm xúc bùng nổ của nhân vật.
`;
    } else {
      promptText = `
Hãy đồng sáng tác chương "${currentChapter.title || `Chương ${currentChapter.number}`}" dựa trên chỉ thị sau:
"${userInstruction || currentChapter.userPrompt || "Mô tả câu chuyện một cách nghệ thuật."}"
`;
    }

    // Call Gemini API with system instruction configured
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText + `

--- QUY TẮC PHẢN HỒI JSON BẮT BUỘC ---
Kết quả trả về phải là một object JSON duy nhất chứa bốn trường:
1. "content": Nội dung chương tiểu thuyết (string).
2. "characterUpdates": Mảng các nhân vật mới xuất hiện hoặc được cập nhật, cấu trúc { name, gender, biography, personality, skills, startingPower }.
3. "suggestedPaths": Mảng 3 gợi ý đường đi tiếp theo cho câu chuyện (array of strings).
4. "storyProfileUpdates": Một object chứa các cập nhật trong hồ sơ truyện (Ví dụ: { "idea": "...", "worldBackground": "..." }). Nếu không có thay đổi gì, hãy để là null. Nếu cập nhật các danh sách như "rules", "cultivationSystem", "ranks", "currencies", hãy cung cấp danh sách đầy đủ mới sau khi cập nhật.

Hãy viết câu trả lời của bạn đúng định dạng JSON này.
`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 1.0,
        topP: 0.95,
      },
    });

    const responseText = response.text || "{}";
    let data;
    try {
      // Find the JSON block if the model included extra text
      const jsonStart = responseText.indexOf("{");
      const jsonEnd = responseText.lastIndexOf("}");
      const jsonString = responseText.substring(jsonStart, jsonEnd + 1);
      data = JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON response from Gemini:", responseText);
      throw new Error("AI trả về định dạng nội dung không hợp lệ, vui lòng thử lại.");
    }
    
    return res.json({
      success: true,
      content: data.content,
      characterUpdates: data.characterUpdates || [],
      suggestedPaths: data.suggestedPaths || [],
    });

  } catch (error: any) {
    console.error("Gemini API Error in server.ts:", error);
    return res.status(500).json({
      error: error.message || "Lỗi không xác định xảy ra trên máy chủ khi gọi Gemini."
    });
  }
});

// Serve front-end assets (Development mode only in this file)
// Vercel will handle production static assets via rewrites in vercel.json
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OK] Server running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  start();
}
