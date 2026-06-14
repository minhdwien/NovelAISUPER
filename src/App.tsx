import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  UserPlus, 
  Save, 
  ChevronRight, 
  PenTool, 
  Compass, 
  Settings, 
  FileText, 
  Clock, 
  BookOpen, 
  RefreshCw, 
  Flame, 
  Layers, 
  Coins, 
  ShieldAlert, 
  Users, 
  AlertCircle, 
  Check, 
  Feather, 
  Eye, 
  FileEdit,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Character, StoryProfile, Chapter, AISettings } from './types';

// Prepopulated Default States
const DEFAULT_PROFILE: StoryProfile = {
  title: 'Tuyệt Tình Kiếm Cảnh',
  idea: 'Một tác phẩm kiếm hiệp huyền ảo đầy kịch tính, bi thương nhưng cháy bỏng đam mê, xoay quanh linh hồn thiên kiếm bị nguyền rủa và mối duyên nợ cấm kỵ giữa Sư tôn thanh cao lãnh thấu xương tủy và Nữ đệ tử mang cốt phượng phong ấn.',
  worldBackground: 'Thần Châu Linh Giới chia băng hỏa nhị lộ. Lấy Băng Sương Tiên Tông ngự trị đỉnh Tuyết Sơn ngàn năm để cô lập độc lập với bên ngoài. Linh khí đậm đới, càng tu luyện lên cao tu vi càng chuyển biến tâm tính lạnh lùng cô tịch, nhưng đổi lại sức mạnh tuyệt đỉnh phá không sơ khai.',
  startingHook: 'Trong bối cảnh Tuyết Sơn đại hàn sụp đổ, Sư tôn Thẩm Thanh Ngôn do bộc phát âm độc tu vi suy giảm nghiêm trọng, cùng nữ đệ tử Dung Nguyệt trú lạnh trong một hang băng lấp lánh huyền ảo cô lập tuyệt đối, khởi nguồn cho một giao kèo bí mật.',
  cultivationSystem: ['Kiếm Vực Đạo', 'Phượng Cốt Quyết', 'Hàn Độc Tiên Pháp'],
  ranks: ['Luyện Khí Cảnh', 'Trúc Cơ Kỳ', 'Kiếm Tôn Cảnh', 'Nguyên Anh Thượng Thần', 'Đột Phá Hóa Thần'],
  currencies: ['Linh Thạch Ngũ Sắc', 'Huyết Tinh', 'Thần Nguyên Bảo'],
  rules: [
    'Người trong Tiên môn sau khi đột phá cảnh giới tuyệt đối không được bộc lộ thất tình lục dục kẻo tẩu hỏa nhập ma.',
    'Quan hệ sư đồ ở đỉnh Tuyết Phong là tôn nghiêm chí cao vô thượng, kẻ vi phạm sẽ bị trục xuất chịu phạt tại Vạn Kiếp Vực.',
    'Chiến đấu ngoài lầu thành thánh vực đại diện cho hành vi sinh tử tự quyết.'
  ],
  characters: [
    {
      id: 'char-1',
      name: 'Thẩm Thanh Ngôn',
      gender: 'Nam',
      biography: 'Sư tôn Thanh Cao của Tuyệt Tình Phong, Kiếm Tôn tuyệt đỉnh lừng lẫy thiên hạ. Vì cứu môn phái từng trấn áp phong ấn Ma giới nên bị trúng kịch độc Âm Hàn Chí Cực thấu tâm can, mỗi đêm trăng tròn phải hứng chịu thống khổ đông cứng thân xác.',
      personality: 'Lạnh lùng như băng cốc, đầy tính kiểm soát và bá đạo, mang gánh nặng thâm sâu nhưng thực chất thèm khát sự ấm áp chân thành, tính khí âm thầm chấp niệm lôi cuốn.',
      skills: 'Thái Cực Băng Sương Kiếm, Vạn Kiếm Quy Tông, Tâm Thức Ngự Thể',
      startingPower: 'Công lực: Cực Hạn Kiếm Tôn, Tinh Thần: Nguyên Anh Thần Thức, Cơ Thể: Suy bại âm độc (40%)'
    },
    {
      id: 'char-2',
      name: 'Mộ Dung Nguyệt',
      gender: 'Nữ',
      biography: 'Nữ đệ tử cuối cùng của Tuyệt Tình Phong. Vốn là hậu duệ duy nhất của Thượng Cổ Phượng tộc chịu phong ấn, có thân thể linh khí thuần dương phát hỏa tự nhiên cực kỳ quý hiếm. Nàng kiên cường, trốn chạy khỏi hôn ước gia tộc sắp đặt để tìm lối thoát tự sinh.',
      personality: 'Quật cường, thông tuệ, can đảm vô song, đối với Sư tôn tôn kính nhưng bên trong lại dấy lên sự tò mò mạnh mẽ và khao khát được khuất phục hay bộc phát ngọn lửa ẩn tàng trong tâm khảm.',
      skills: 'Phượng Dực Không Hành, Cố Nguyên Phục Linh Quyết, Ngự Hỏa Chiêm Tinh',
      startingPower: 'Công lực: Trúc Cơ Trung Kỳ, Tinh Thần: Linh Thần bẩm sinh, Cơ Thể: Thuần Dương Phượng Huyết'
    }
  ]
};

const DEFAULT_CHAPTERS: Chapter[] = [
  {
    id: 'chap-1',
    number: 1,
    title: 'Hồi 1: Đêm Tuyết Trong Hang Băng lấp lánh',
    userPrompt: 'Sư tôn Thẩm Thanh Ngôn đột ngột bị bộc phát kịch độc Âm Hàn lúc trời tuyết bão lớn dồn cả hai vào hang băng cô lập. Dung Nguyệt thấy cơ thể người dần đông cứng, sương giá thấu xương tủy, quyết định dùng ngọn lửa thuần dương khởi nguồn cứu mạng sư tôn, phá vỡ bức tường phòng ngự.',
    content: `Tuyết bão ngập trời giăng kín đỉnh Hàn Sơn, gào thét như vạn con mảnh thú gầm rú xé rách khoảng không tĩnh lặng. Gió lạnh luồn lách qua những vách đá nhọn hoắt, thổi thốc những hạt tuyết sắc ngọt như lưỡi dao cắm sâu vào da thịt. Khí lạnh căm căm của mặt đất sụt lún đã đẩy cả hai bước vào chân hang động băng thâm u.

Trong lòng hang đá cổ, những cột băng khổng lồ rủ xuống rực rỡ dưới ánh sáng huyền hoặc lấp lánh như lăng kính pha lê khúc xạ sắc xanh lam cô liêu. Thẩm Thanh Ngôn ngồi xếp bằng trên một tảng đá phẳng dẹt, tấm cẩm bào màu tuyết buông lơi không thể giấu nổi sự run rẩy kịch liệt từ tận sâu trong cơ thể hắn. Gương mặt thanh tao tuyệt mỹ như tạc từ ngọc thạch giờ đây tái nhợt không một giọt máu, hai hàng lông mày nam tính phủ đầy một lớp tơ tuyết trắng xóa. Gân xanh trên trán giật mạnh từng hồi theo từng biến đổi tâm mạch.

Luồng linh khí âm độc hắc ám rục rịch cuộn trào bên trong kinh mạch hắn, tàn nhẫn kết tinh thành muôn vạn lớp sương giá nhỏ li ti đâm miết, bóp nghẹt tâm phế. Hơi thở hắn thốt ra đục ngầu, hóa thành làn sương dày đặc lạnh lẽo rồi nhanh chóng ngưng tụ rơi rớt trên bệ đá.

"Sư tôn..."

Mộ Dung Nguyệt đứng bên cạnh, hô hấp hỗn loạn dập dồn ép chặt bầu ngực trẻ trung căng đầy sau mảnh y phục mỏng manh bị gió tuyết xé rách một mảng lớn nơi vai trần. Nàng nhìn lớp sương lạnh đang thô bạo bò dần từ ngón tay nam tính của hắn, thắt chặt cổ tay, bám dọc theo đường cổ mạnh mẽ thon dài rồi dâng thẳng lên gò má cao thanh ngạo. Đôi mắt phượng của nàng ngập tràn linh quang rực cháy, tim đập kịch liệt như trống trận dồn dập dội lên màng nhĩ. Nàng thừa biết, nếu dòng âm độc này chạm đến tâm cung hắn, vị Kiếm tôn lừng lẫy thiên hạ này sẽ vĩnh viễn hóa thành một bức tượng băng vô tri tại đây.

Sự kiên định bùng cháy lướt qua cái lý trí sư đồ nghiêm cẩn thường ngày. Nàng bước từng bước dứt khoát trên nền đá lạnh buốt, làn da thuần dương phượng huyết mỏng manh mang theo hơi ấm tự nhiên áp sát, xua tan lớp không khí đông cứng. 

"Nguyệt nhi... đứng lại..." Giọng nói Thẩm Thanh Ngôn khàn đục lịm đi, lạnh lẽo đến mức vỡ vụn như vụn thủy tinh rơi trên nền băng. Đôi đồng tử lạnh giá hờ hững liếc nhìn nàng, tràn ngập luồng quyền uy áp chế cuối cùng của một kẻ nắm giữ sinh sát Tuyệt Tình Phong, thế nhưng trong chiều sâu sâu thẳm lại bộc lộ sự mong manh bất lực đầu tiên diện kiến thế giới. "Tránh xa ta ra... tu vi này sẽ đóng băng toàn bộ phế phủ của ngươi..."

Tuy nhiên, ranh giới và quy tắc lạnh lẽo bấy nay của môn phái dường như đã bị nung chảy bởi hơi thở rạo rực bốc lên từ dòng máu phượng hoàng của nàng. Mộ Dung Nguyệt hé mở đôi môi đào nồng ấm, hít hà bầu không khí nồng đượm mùi băng giá ẩm ướt và hương nhục quế dã tính ngun ngút tỏa ra từ cơ thể hắn. Nàng không nghe lời áp chế, quỳ thụp xuống trước mặt hắn, hai bàn tay thon thả rực lửa thuần dương nắm chặt lấy bàn tay lạnh buốt đông cứng của Thẩm Thanh Ngôn.

"Sư đồ thì sao? Quy tắc tu tiên có thể cứu được mạng sư tôn sao? Hôm nay Nguyệt nhi sẽ nung chảy lòng băng của người!"

Xúc giác ngọt ngào hực nóng đột ngột truyền qua da thịt đông giá, khiến Thẩm Thanh Ngôn khẽ rên lên một tiếng nghẹn trong cổ họng. Một luồng xung điện nóng rực chạy dọc sống lưng, kéo ý chí mơ màng của hắn trở về ngọn lửa hồng hoang mãnh liệt. Đôi mắt hắn từ từ đỏ hừng hạt sương, ngước lên đối diện ánh mắt phượng dũng cảm chứa đầy mê lực tò mò và lòng quy phục thầm kín của nàng đệ tử ngỗ nghịch...`,
    wordCount: 820,
    createdAt: '2026-06-13T19:50:00-07:00'
  }
];

const DEFAULT_SETTINGS: AISettings = {
  writingMode: 'orinlo_m2',
  customTone: 'Gợi cảm, điện ảnh và kịch tính',
  sensoryEmphasis: true,
  psychologicalFocus: true,
  wordCountTarget: 1200
};

export default function App() {
  // Persistence & State States
  const [profile, setProfile] = useState<StoryProfile>(() => {
    const saved = localStorage.getItem('novel_app_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem('novel_app_chapters');
    return saved ? JSON.parse(saved) : DEFAULT_CHAPTERS;
  });

  const [settings, setSettings] = useState<AISettings>(() => {
    const saved = localStorage.getItem('novel_app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [selectedChapterId, setSelectedChapterId] = useState<string>(() => {
    return chapters[0]?.id || '';
  });

  // Current active entity view
  const [profileStep, setProfileStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [userInstruction, setUserInstruction] = useState<string>('');
  const [actionType, setActionType] = useState<'writeNew' | 'continue' | 'elaborate'>('writeNew');
  
  // Local lists pending strings
  const [newCultivation, setNewCultivation] = useState('');
  const [newRank, setNewRank] = useState('');
  const [newCurrency, setNewCurrency] = useState('');
  const [newRule, setNewRule] = useState('');

  // Character local state form
  const [editCharacterId, setEditCharacterId] = useState<string | null>(null);
  const [charFormName, setCharFormName] = useState('');
  const [charFormGender, setCharFormGender] = useState('Nữ');
  const [charFormBio, setCharFormBio] = useState('');
  const [charFormPersonality, setCharFormPersonality] = useState('');
  const [charFormSkills, setCharFormSkills] = useState('');
  const [charFormPower, setCharFormPower] = useState('');

  // Floating notifications/alerts
  const [notification, setNotification] = useState<{message: string, isError: boolean} | null>(null);
  const [aiStepFeedback, setAiStepFeedback] = useState<string>('');

  // Save changes to localstorage when they happen
  useEffect(() => {
    localStorage.setItem('novel_app_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('novel_app_chapters', JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem('novel_app_settings', JSON.stringify(settings));
  }, [settings]);

  const activeChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  const showNotification = (message: string, isError: boolean = false) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(null), 4000);
  };

  // Chapter Handlers
  const handleCreateChapter = () => {
    const nextNum = chapters.length + 1;
    const newChap: Chapter = {
      id: `chap-${Date.now()}`,
      number: nextNum,
      title: `Chương ${nextNum}: Tiêu Đề Mới Phác Thảo`,
      userPrompt: 'Nhấp nhập nội dung ý tưởng phác họa để AI viết sâu rộng phế tu vi hay cảnh ấm áp...',
      content: '',
      wordCount: 0,
      createdAt: new Date().toISOString()
    };
    const updated = [...chapters, newChap];
    setChapters(updated);
    setSelectedChapterId(newChap.id);
    showNotification(`Đã khởi tạo Chương ${nextNum} thành công!`);
  };

  const handleUpdateChapterField = (field: keyof Chapter, value: any) => {
    if (!activeChapter) return;
    const updated = chapters.map(c => {
      if (c.id === activeChapter.id) {
        const item = { ...c, [field]: value };
        if (field === 'content') {
          item.wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        }
        return item;
      }
      return c;
    });
    setChapters(updated);
  };

  const handleDeleteChapter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (chapters.length <= 1) {
      showNotification('Không thể xóa chương cuối cùng của cuốn tiểu thuyết!', true);
      return;
    }
    const filtered = chapters.filter(c => c.id !== id);
    setChapters(filtered);
    if (selectedChapterId === id) {
      setSelectedChapterId(filtered[0].id);
    }
    showNotification('Đã xóa chương lựa chọn.');
  };

  // Step 2 array helpers
  const handleAddCultivation = () => {
    if (!newCultivation.trim()) return;
    setProfile(p => ({
      ...p,
      cultivationSystem: [...p.cultivationSystem, newCultivation.trim()]
    }));
    setNewCultivation('');
    showNotification('Đã thêm phương pháp/hệ thống linh văn tu luyện!');
  };

  const handleAddRank = () => {
    if (!newRank.trim()) return;
    setProfile(p => ({
      ...p,
      ranks: [...p.ranks, newRank.trim()]
    }));
    setNewRank('');
    showNotification('Đã lưu tên cấp bậc/cảnh giới tu tiên mới!');
  };

  const handleAddCurrency = () => {
    if (!newCurrency.trim()) return;
    setProfile(p => ({
      ...p,
      currencies: [...p.currencies, newCurrency.trim()]
    }));
    setNewCurrency('');
    showNotification('Đã thêm đơn vị tiền tệ trao đổi!');
  };

  const handleAddRule = () => {
    if (!newRule.trim()) return;
    setProfile(p => ({
      ...p,
      rules: [...p.rules, newRule.trim()]
    }));
    setNewRule('');
    showNotification('Thiết lập quy luật thế giới thành công!');
  };

  const handleRemoveProfileArrayItem = (category: 'cultivationSystem' | 'ranks' | 'currencies' | 'rules', idx: number) => {
    setProfile(p => ({
      ...p,
      [category]: p[category].filter((_, i) => i !== idx)
    }));
    showNotification('Đã loại bỏ thiết chế bối cảnh.');
  };

  // Step 3 character helpers
  const handleSaveCharacter = () => {
    if (!charFormName.trim()) {
      showNotification('Vui lòng nhập Tên Nhân Vật vật phẩm!', true);
      return;
    }

    const details: Character = {
      id: editCharacterId || `char-${Date.now()}`,
      name: charFormName,
      gender: charFormGender,
      biography: charFormBio,
      personality: charFormPersonality,
      skills: charFormSkills,
      startingPower: charFormPower
    };

    if (editCharacterId) {
      setProfile(p => ({
        ...p,
        characters: p.characters.map(c => c.id === editCharacterId ? details : c)
      }));
      showNotification('Đã cập nhật chi tiết nhân vật!');
    } else {
      setProfile(p => ({
        ...p,
        characters: [...p.characters, details]
      }));
      showNotification('Đã lưu thêm nhân vật mới vào hồ sơ!');
    }

    // Reset Form
    setEditCharacterId(null);
    setCharFormName('');
    setCharFormBio('');
    setCharFormPersonality('');
    setCharFormSkills('');
    setCharFormPower('');
  };

  const handleStartEditCharacter = (char: Character) => {
    setEditCharacterId(char.id);
    setCharFormName(char.name);
    setCharFormGender(char.gender);
    setCharFormBio(char.biography);
    setCharFormPersonality(char.personality);
    setCharFormSkills(char.skills);
    setCharFormPower(char.startingPower);
  };

  const handleDeleteCharacter = (id: string) => {
    setProfile(p => ({
      ...p,
      characters: p.characters.filter(c => c.id !== id)
    }));
    if (editCharacterId === id) {
      setEditCharacterId(null);
    }
    showNotification('Đã xóa nhân vật khỏi hồ sơ tác phẩm.');
  };

  const handleResetDraft = () => {
    if (window.confirm('Bạn có thực sự muốn phục hồi hồ sơ mẫu Tuyết Tình Kiếm Cảnh không? Hành động này sẽ thay thế hồ sơ bối cảnh cốt truyện hiện tại.')) {
      setProfile(DEFAULT_PROFILE);
      setChapters(DEFAULT_CHAPTERS);
      setSelectedChapterId(DEFAULT_CHAPTERS[0].id);
      showNotification('Đã hoàn chế tác phẩm về cốt truyện mẫu!');
    }
  };

  // call full-stack Express generate chapter API
  const handleCallAIGeneration = async () => {
    if (!activeChapter) return;
    setIsGenerating(true);
    setAiStepFeedback('Khởi động động cơ ORINLO-CORE AI...');

    const feedCycles = [
      'Đại sư ORINLO đang thấm thấu Hồ sơ tu luyện và nhân vật...',
      'Đang dệt bối cảnh không gian năm giác quan kỳ ảo...',
      'Khảo sát kịch tính xúc cảm và chuyển biến tâm mạch sâu xa...',
      'Đang phóng bút sáng tác chi tiết thăng hoa nghệ thuật...'
    ];

    let cycleIndex = 0;
    const interval = setInterval(() => {
      if (cycleIndex < feedCycles.length) {
        setAiStepFeedback(feedCycles[cycleIndex]);
        cycleIndex++;
      }
    }, 2800);

    try {
      // Gather context of previous chapters if we choose writeNew or continue
      const previousChaptersText = chapters
        .filter(c => c.number < activeChapter.number)
        .map(c => `[Chương ${c.number}: ${c.title}]\n${c.content}`)
        .join('\n\n');

      const response = await fetch('/api/generate-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          settings,
          currentChapter: activeChapter,
          previousChaptersText,
          actionType,
          userInstruction
        })
      });

      const data = await response.json();
      clearInterval(interval);

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Lỗi không xác định khi liên kết AI.');
      }

      const generatedProse = data.content;
      const updates = data.characterUpdates || [];
      const suggestedPaths = data.suggestedPaths || [];
      const profileUpdates = data.storyProfileUpdates;

      // Process automatic story profile updates
      if (profileUpdates) {
        setProfile(p => ({ ...p, ...profileUpdates }));
        showNotification('AI đã tự động cập nhật Hồ sơ tác phẩm!');
      }

      // Process automatic character updates
      if (updates.length > 0) {
        let addedCount = 0;
        setProfile(p => {
          const currentNames = p.characters.map(c => c.name.toLowerCase());
          const newChars = updates.filter((u: any) => !currentNames.includes(u.name.toLowerCase())).map((u: any) => ({
            ...u,
            id: `char-${Date.now()}-${Math.random() * 1000}`
          }));
          
          if (newChars.length > 0) {
            addedCount = newChars.length;
            return { ...p, characters: [...p.characters, ...newChars] };
          }
          return p;
        });
        
        if (addedCount > 0) {
          showNotification(`AI đã phát hiện và thêm ${addedCount} nhân vật mới vào hồ sơ!`);
        }
      }

      // Update chapters depending on actionType
      const updatedChapters = chapters.map(c => {
        if (c.id !== activeChapter.id) return c;
        
        let newContent = c.content;
        if (actionType === 'continue') {
          newContent = c.content ? `${c.content}\n\n${generatedProse}` : generatedProse;
        } else {
          newContent = generatedProse;
        }
        
        return {
          ...c,
          content: newContent,
          suggestedPaths: suggestedPaths,
          wordCount: newContent.trim().split(/\s+/).filter(Boolean).length
        };
      });
      
      setChapters(updatedChapters);

      if (actionType === 'continue') {
        showNotification('AI đã hoàn viết tiếp nối phân hợp lưu chuyển mượt mà!');
      } else {
        showNotification('Đồng sáng tác tiểu thuyết thành công! Hãy đọc văn bản bên dưới.');
      }
      setUserInstruction(''); // clear input box

    } catch (err: any) {
      clearInterval(interval);
      showNotification(err.message || 'Kết nối bị ngắt quãng. Vui lòng thử lại.', true);
    } finally {
      setIsGenerating(false);
      setAiStepFeedback('');
    }
  };

  return (
    <div id="main-app-container" className="min-h-screen bg-[#eaecdf] text-[#2d2c25] font-sans antialiased flex flex-col pointer-events-auto custom-scrollbar">
      
      {/* Dynamic Alerts / Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            id="notification-bubble"
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3.5 rounded-xl shadow-xl border text-sm font-medium transition-all ${
              notification.isError 
              ? 'bg-red-50 border-red-200 text-red-800 shadow-red-200/40' 
              : 'bg-[#faf6eb] border-[#decb96] text-amber-950 shadow-amber-900/10'
            }`}
          >
            {notification.isError ? <AlertCircle className="w-5 h-5 text-red-600 shrink-0" /> : <Feather className="w-5 h-5 text-amber-700 shrink-0" />}
            <span id="notification-message">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP DECORATIVE HEADER BAR */}
      <header id="app-header" className="sticky top-0 z-40 bg-[#161512]/95 border-b border-[#2e2a22] text-amber-50/90 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-amber-600 to-red-800 rounded-xl shadow-inner border border-amber-500/30">
              <PenTool className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <h1 id="app-main-title" className="font-serif font-bold text-xl md:text-2xl text-amber-100 tracking-tight flex items-center gap-2">
                Hợp Tác Viết Tiểu Thuyết AI <span className="font-sans text-[10px] bg-red-900/60 border border-red-500/30 text-red-200 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">Co-Write Workspace</span>
              </h1>
              <p className="text-xs text-amber-300/60 font-mono">Bút pháp Orinlo Core & Hồ Sơ Thế Giới Hoàn Chỉnh</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              id="reset-state-btn"
              onClick={handleResetDraft}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-200 hover:text-amber-50 border border-amber-900/80 hover:bg-[#201e19] rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Dùng Bối Cảnh Mẫu</span>
            </button>
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-920/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              Linh Khí Sẵn Sàng
            </div>
          </div>

        </div>
      </header>

      {/* WORKSPACE AREA Container */}
      <main id="app-main-workspace" className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN: STORY PROFILE SYSTEM (Steps 1, 2, 3 wizard customizable at any time) */}
        <section id="sidebar-story-profile" className="md:col-span-5 lg:col-span-4 flex flex-col gap-4">
          
          <div className="bg-[#FAF9F5] border border-[#dbd8cf] rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            
            {/* Sidebar Title Header */}
            <div className="p-4 bg-gradient-to-r from-[#1c1a16] to-[#272621] text-amber-100 border-b border-[#ddda9a]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <h2 className="font-serif font-semibold text-base">Hồ Sơ Cốt Truyện Bảo Bản</h2>
              </div>
              <div className="text-[11px] font-mono text-amber-300-40 px-2 py-0.5 bg-amber-950/70 border border-amber-800/40 rounded-full">
                Sư Đồ - Tu Chân
              </div>
            </div>

            {/* Profile Step Selector Bar */}
            <div className="grid grid-cols-3 border-b border-[#ebdcca] bg-[#fdfcf9] font-medium text-xs text-[#5e5a52]">
              <button 
                id="step-1-tab-btn"
                onClick={() => setProfileStep(1)}
                className={`flex flex-col items-center gap-0.5 py-3 border-b-2 transition-all ${
                  profileStep === 1 
                  ? 'border-red-800 text-red-950 bg-[#f4f2eb]' 
                  : 'border-transparent hover:text-black hover:bg-[#FAF9F5]'
                }`}
              >
                <Layers className="w-4 h-4 text-emerald-700 font-bold" />
                <span>1. Tổng Quan</span>
              </button>
              <button 
                id="step-2-tab-btn"
                onClick={() => setProfileStep(2)}
                className={`flex flex-col items-center gap-0.5 py-3 border-b-2 transition-all ${
                  profileStep === 2 
                  ? 'border-red-800 text-red-950 bg-[#f4f2eb]' 
                  : 'border-transparent hover:text-black hover:bg-[#FAF9F5]'
                }`}
              >
                <Coins className="w-4 h-4 text-amber-700" />
                <span>2. Thiết Chế</span>
              </button>
              <button 
                id="step-3-tab-btn"
                onClick={() => setProfileStep(3)}
                className={`flex flex-col items-center gap-0.5 py-3 border-b-2 transition-all ${
                  profileStep === 3 
                  ? 'border-red-800 text-red-950 bg-[#f4f2eb]' 
                  : 'border-transparent hover:text-black hover:bg-[#FAF9F5]'
                }`}
              >
                <Users className="w-4 h-4 text-[#881337]" />
                <span>3. Nhân Vật</span>
              </button>
            </div>

            {/* STEP SCROLL CONTENT PANEL */}
            <div className="p-4 flex-1 overflow-y-auto max-h-[640px] md:max-h-[700px] lg:max-h-[800px] custom-scrollbar bg-[#FAF9F5]">

              {/* BƯỚC 1: TỔNG QUAN */}
              {profileStep === 1 && (
                <div id="setup-step1-pane" className="space-y-4 animate-fade-in">
                  <div className="bg-amber-50/50 border border-amber-200/50 p-3 rounded-xl text-xs text-amber-900 leading-relaxed">
                    <span className="font-bold">Bước 1: Tổng Quan Ý Tưởng</span> — Điền thông tin cốt lõi để làm kim chỉ nam vững vàng cho AI. Toàn bộ các bối cảnh bên dưới sẽ cách biệt độc lập để bạn hoàn thiện chi tiết nhất.
                  </div>

                  {/* Tên truyện */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5e5a52] mb-1 uppercase tracking-wider">Tên Truyện Tiểu Thuyết</label>
                    <input 
                      id="novel-title-input"
                      type="text"
                      className="w-full text-sm font-serif font-bold bg-white border border-[#dbd8cf] rounded-xl px-3 py-2.5 outline-none focus:border-amber-600 transition-colors"
                      placeholder="Nhập tên tiểu thuyết..."
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    />
                  </div>

                  {/* Ý tưởng cốt lõi */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5e5a52] mb-1 uppercase tracking-wider">Ý Tưởng Chủ Đạo / Cốt Lõi</label>
                    <textarea 
                      id="novel-idea-textarea"
                      className="w-full h-24 text-xs bg-white border border-[#dbd8cf] rounded-xl p-3 outline-none focus:border-amber-600 transition-colors leading-relaxed resize-none custom-scrollbar"
                      placeholder="Ý tưởng tổng hợp của tác phẩm là gì..."
                      value={profile.idea}
                      onChange={(e) => setProfile({ ...profile, idea: e.target.value })}
                    />
                  </div>

                  {/* Ý tưởng bối cảnh thế giới */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5e5a52] mb-1 uppercase tracking-wider">Ý Tưởng Bối Cảnh Thế Giới</label>
                    <textarea 
                      id="novel-world-textarea"
                      className="w-full h-24 text-xs bg-white border border-[#dbd8cf] rounded-xl p-3 outline-none focus:border-amber-600 transition-colors leading-relaxed resize-none custom-scrollbar"
                      placeholder="Mô tả không gian thế giới, lục địa, tiên môn, tông phái vĩ mô..."
                      value={profile.worldBackground}
                      onChange={(e) => setProfile({ ...profile, worldBackground: e.target.value })}
                    />
                  </div>

                  {/* Ý tưởng khởi đầu */}
                  <div>
                    <label className="block text-xs font-semibold text-[#5e5a52] mb-1 uppercase tracking-wider">Ý Tưởng Khởi Đầu (Hook)</label>
                    <textarea 
                      id="novel-hook-textarea"
                      className="w-full h-20 text-xs bg-white border border-[#dbd8cf] rounded-xl p-3 outline-none focus:border-amber-600 transition-colors leading-relaxed resize-none custom-scrollbar"
                      placeholder="Ví dụ khởi đầu: Đang trốn rượt đuổi, đột ngột bị nhốt cùng hang băng tôn nghiêm truyền ấm áp..."
                      value={profile.startingHook}
                      onChange={(e) => setProfile({ ...profile, startingHook: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* BƯỚC 2: HỆ THỐNG TU LUYỆN, TIỆN TỆ, QUY TẮC */}
              {profileStep === 2 && (
                <div id="setup-step2-pane" className="space-y-4 animate-fade-in">
                  <div className="bg-amber-50/50 border border-amber-200/50 p-3 rounded-xl text-xs text-amber-900 leading-relaxed">
                    <span className="font-bold">Bước 2: Hệ Thống Bối Cảnh Chi Tiết</span> — Thiết lập chuẩn mực thế giới quan. Để thêm, sử dụng biểu tượng <span className="font-bold">+</span> tương ứng để bổ sung các định chế chặt chẽ.
                  </div>

                  {/* Hệ thống tu luyện */}
                  <div className="border border-[#dbd8cf]/80 rounded-xl p-3 bg-[#FCFBF8] shadow-xs">
                    <label className="block text-xs font-bold text-[#514d45] mb-2 uppercase tracking-wider flex items-center gap-1">
                      <span>• Hệ Thống Tu Luyện Cốt Lõi</span>
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input 
                        id="new-cultivation-input"
                        type="text" 
                        className="flex-1 text-xs bg-white border border-[#dbd8cf] rounded-lg px-2 text-sm outline-none focus:border-amber-600"
                        placeholder="Thêm hệ thống mới..."
                        value={newCultivation}
                        onChange={(e) => setNewCultivation(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCultivation()}
                      />
                      <button 
                        id="add-cultivation-btn"
                        onClick={handleAddCultivation}
                        className="bg-amber-800 text-amber-50 hover:bg-amber-900 px-3 py-1 rounded-lg hover:shadow-md transition-all text-xs font-bold flex items-center cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {profile.cultivationSystem.length === 0 ? (
                      <p className="text-[11px] text-gray-400 italic">Chưa thiết lập hệ thống tu luyện.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {profile.cultivationSystem.map((item, i) => (
                          <span key={i} className="text-xs bg-[#f2ebd9] text-amber-950 px-2.5 py-1 rounded-lg border border-amber-200/60 flex items-center gap-1.5 font-medium">
                            {item}
                            <Trash2 className="w-3 h-3 text-red-800 hover:text-red-600 transition-colors cursor-pointer" onClick={() => handleRemoveProfileArrayItem('cultivationSystem', i)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tên cấp bậc tu luyện */}
                  <div className="border border-[#dbd8cf]/80 rounded-xl p-3 bg-[#FCFBF8] shadow-xs">
                    <label className="block text-xs font-bold text-[#514d45] mb-2 uppercase tracking-wider flex items-center gap-1">
                      <span>• Tên Các Cấp Bậc / Cảnh Giới</span>
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input 
                        id="new-rank-input"
                        type="text" 
                        className="flex-1 text-xs bg-white border border-[#dbd8cf] rounded-lg px-2 text-sm outline-none focus:border-amber-600"
                        placeholder="VD: Luyện Khí Kỳ, Trúc Cơ, Kim Đan..."
                        value={newRank}
                        onChange={(e) => setNewRank(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddRank()}
                      />
                      <button 
                        id="add-rank-btn"
                        onClick={handleAddRank}
                        className="bg-amber-800 text-amber-50 hover:bg-amber-900 px-3 py-1 rounded-lg hover:shadow-md transition-all text-xs font-bold flex items-center cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {profile.ranks.length === 0 ? (
                      <p className="text-[11px] text-gray-400 italic">Chưa lập cấp bậc tu luyện.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {profile.ranks.map((item, i) => (
                          <span key={i} className="text-xs bg-blue-50 text-blue-900 px-2.5 py-1 rounded-lg border border-blue-200/50 flex items-center gap-1.5 font-mono">
                            {item}
                            <Trash2 className="w-3 h-3 text-red-800 hover:text-red-500 cursor-pointer" onClick={() => handleRemoveProfileArrayItem('ranks', i)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tên tiền tệ */}
                  <div className="border border-[#dbd8cf]/80 rounded-xl p-3 bg-[#FCFBF8] shadow-xs">
                    <label className="block text-xs font-bold text-[#514d45] mb-2 uppercase tracking-wider flex items-center gap-1">
                      <span>• Đơn Vị Tiền Tệ</span>
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input 
                        id="new-currency-input"
                        type="text" 
                        className="flex-1 text-xs bg-white border border-[#dbd8cf] rounded-lg px-2 text-sm outline-none focus:border-amber-600"
                        placeholder="VD: Linh Thạch Ngũ Sắc, Huyết Ngọc..."
                        value={newCurrency}
                        onChange={(e) => setNewCurrency(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCurrency()}
                      />
                      <button 
                        id="add-currency-btn"
                        onClick={handleAddCurrency}
                        className="bg-amber-800 text-amber-50 hover:bg-amber-900 px-3 py-1 rounded-lg hover:shadow-md transition-all text-xs font-bold flex items-center cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {profile.currencies.length === 0 ? (
                      <p className="text-[11px] text-gray-400 italic">Chưa thiết chế tiền tệ bối cảnh.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {profile.currencies.map((item, i) => (
                          <span key={i} className="text-xs bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-lg border border-emerald-200/50 flex items-center gap-1.5 font-medium">
                            {item}
                            <Trash2 className="w-3 h-3 text-red-800 hover:text-red-500 cursor-pointer" onClick={() => handleRemoveProfileArrayItem('currencies', i)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quy tắc thế giới */}
                  <div className="border border-[#dbd8cf]/80 rounded-xl p-3 bg-[#FCFBF8] shadow-xs">
                    <label className="block text-xs font-bold text-[#514d45] mb-2 uppercase tracking-wider">
                      • Luật Lệ & Quy Tắc Vũ Trụ (Mãnh lực)
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input 
                        id="new-rule-input"
                        type="text" 
                        className="flex-1 text-xs bg-white border border-[#dbd8cf] rounded-lg px-2 text-sm outline-none focus:border-amber-600"
                        placeholder="Ghi quy tắc thế giới rồi bấm +..."
                        value={newRule}
                        onChange={(e) => setNewRule(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddRule()}
                      />
                      <button 
                        id="add-rule-btn"
                        onClick={handleAddRule}
                        className="bg-amber-800 text-amber-50 hover:bg-amber-900 px-3 py-1 rounded-lg hover:shadow-md transition-all text-xs font-bold flex items-center cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {profile.rules.length === 0 ? (
                      <p className="text-[11px] text-gray-400 italic">Chưa thiết lập quy tắc hành luật.</p>
                    ) : (
                      <ul className="space-y-1.5 text-xs text-[#2d2c25]">
                        {profile.rules.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 bg-slate-50 border border-slate-200/50 p-2 rounded-lg">
                            <span className="w-4 h-4 text-[10px] bg-slate-200 border border-slate-300 text-gray-700 font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                            <span className="flex-1 leading-relaxed text-[11px]">{item}</span>
                            <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-600 cursor-pointer self-center" onClick={() => handleRemoveProfileArrayItem('rules', i)} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* BƯỚC 3: BAN NHÂN VẬT THẾ GIỚI CHI TIẾT */}
              {profileStep === 3 && (
                <div id="setup-step3-pane" className="space-y-4 animate-fade-in">
                  <div className="bg-amber-50/50 border border-amber-200/50 p-3 rounded-xl text-xs text-amber-900 leading-relaxed">
                    <span className="font-bold">Bước 3: Tạo File Thiết Kế Nhân Vật</span> — Khắc họa đầy đủ tên, giới tính, tiểu sử, chỉ số sức mạnh. Bạn có thể biên tập và kiểm tra lại danh sách bất kỳ cơ hội nào.
                  </div>

                  {/* Character List Header & Modal switch */}
                  <div className="flex items-center justify-between border-b border-[#ebdcca] pb-2 font-serif font-bold text-sm text-[#413c33]">
                    <h3>Quản lý Nhân Vật ({profile.characters.length})</h3>
                    <button 
                      id="char-form-reset-btn"
                      onClick={() => {
                        setEditCharacterId(null);
                        setCharFormName('');
                        setCharFormBio('');
                        setCharFormPersonality('');
                        setCharFormSkills('');
                        setCharFormPower('');
                      }}
                      className="text-[10px] uppercase font-sans font-bold text-amber-700 hover:text-amber-900 tracking-wider flex items-center gap-0.5 outline-none cursor-pointer"
                    >
                      <UserPlus className="w-3 h-3" />
                      <span>Xóa trắng form</span>
                    </button>
                  </div>

                  {/* Character Creation & Edit Form Block */}
                  <div id="character-inline-form-box" className="bg-[#FAF9F5] border border-amber-800/10 p-3.5 rounded-xl space-y-2.5 pb-4 bg-gradient-to-br from-amber-50/30 to-rose-50/10">
                    <div className="text-xs font-extrabold text-amber-950 flex items-center gap-1">
                      <PenTool className="w-3.5 h-3.5 text-red-800" />
                      <span>{editCharacterId ? 'ĐANG BIÊN TẬP NHÂN VẬT' : 'THÊM NHÂN VẬT MỚI'}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Tên nhân vật *</label>
                        <input 
                          id="char-name-input"
                          type="text" 
                          className="w-full text-xs bg-white border border-[#dbd8cf] rounded-lg px-2 py-1.5 mt-0.5 outline-none focus:border-amber-600"
                          placeholder="Mộ Dung Nguyệt"
                          value={charFormName}
                          onChange={(e) => setCharFormName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase">Giới tính</label>
                        <select 
                          id="char-gender-select"
                          className="w-full text-xs bg-white border border-[#dbd8cf] rounded-lg px-2 py-1.5 mt-0.5 outline-none focus:border-amber-600"
                          value={charFormGender}
                          onChange={(e) => setCharFormGender(e.target.value)}
                        >
                          <option value="Nam">Nam Nhân</option>
                          <option value="Nữ">Nữ Nhân</option>
                          <option value="Khác">Phi Nhân / Linh Thú</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Tính Cách & Thần thái</label>
                      <input 
                        id="char-personality-input"
                        type="text" 
                        className="w-full text-xs bg-white border border-[#dbd8cf] rounded-lg px-2 py-1.5 mt-0.5 outline-none focus:border-amber-600"
                        placeholder="Lạnh lùng võ thuật, trung trinh ẩn giấu..."
                        value={charFormPersonality}
                        onChange={(e) => setCharFormPersonality(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Kỹ Năng / Cấp chiêu thức</label>
                      <input 
                        id="char-skills-input"
                        type="text" 
                        className="w-full text-xs bg-white border border-[#dbd8cf] rounded-lg px-2 py-1.5 mt-0.5 outline-none focus:border-amber-600"
                        placeholder="Sương Hàn Độc Quyết, Thuận Không Trảm..."
                        value={charFormSkills}
                        onChange={(e) => setCharFormSkills(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Sức Mạnh Khởi Đầu / Chỉ Số Sức Sống</label>
                      <input 
                        id="char-power-input"
                        type="text" 
                        className="w-full text-xs bg-white border border-[#dbd8cf] rounded-lg px-2 py-1.5 mt-0.5 outline-none focus:border-amber-600"
                        placeholder="Công lực: 480, Thể lực: Thuần Dương..."
                        value={charFormPower}
                        onChange={(e) => setCharFormPower(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase">Tiểu Sử / Điển Tích</label>
                      <textarea 
                        id="char-bio-textarea"
                        className="w-full h-16 text-xs bg-white border border-[#dbd8cf] rounded-lg p-2 mt-0.5 outline-none focus:border-amber-600 leading-normal resize-none custom-scrollbar"
                        placeholder="Vốn mang thiên cốt chi hỏa bị giấu đi..."
                        value={charFormBio}
                        onChange={(e) => setCharFormBio(e.target.value)}
                      />
                    </div>

                    <button 
                      id="char-save-btn"
                      onClick={handleSaveCharacter}
                      className="w-full bg-[#881337] hover:bg-red-800 text-white font-bold py-2 px-3 rounded-lg text-xs tracking-wider transition-colors shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editCharacterId ? 'LƯU BIẾN ĐỔI NHÂN VẬT' : 'THÊM NHÂN VẬT LIỀN'}</span>
                    </button>
                  </div>

                  {/* Render Character List with edit buttons */}
                  <div className="space-y-2 pt-2">
                    {profile.characters.map((c) => (
                      <div 
                        key={c.id} 
                        className={`p-3 rounded-xl border transition-all ${
                          editCharacterId === c.id 
                          ? 'bg-amber-50 border-amber-500 shadow-md' 
                          : 'bg-white border-[#dbd8cf]/80 shadow-xs hover:border-amber-400'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-serif font-semibold text-sm text-[#41392b] flex items-center gap-1.5">
                              {c.name}
                              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans font-bold leading-none ${
                                c.gender === 'Nam' 
                                ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' 
                                : 'bg-rose-50 border border-rose-200 text-rose-700'
                              }`}>
                                {c.gender}
                              </span>
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleStartEditCharacter(c)}
                              className="text-[10px] text-blue-800 hover:underline outline-none cursor-pointer"
                            >
                              Sửa
                            </button>
                            <button 
                              onClick={() => handleDeleteCharacter(c.id)}
                              className="text-red-700 hover:text-red-500 outline-none cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1 bg-[#fcfbf9]/90 p-1.5 rounded-lg text-[10px] text-gray-600">
                          <div><span className="font-bold">Tính cách:</span> {c.personality || '---'}</div>
                          <div><span className="font-bold">Kỹ năng:</span> {c.skills || '---'}</div>
                          <div className="col-span-2 mt-0.5"><span className="font-bold text-amber-950">Chỉ số:</span> <span className="font-mono">{c.startingPower || '---'}</span></div>
                        </div>

                        <p className="text-[10px] leading-relaxed text-gray-500 mt-2 line-clamp-2 italic">
                          "{c.biography}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar Sticky Footer info */}
            <div className="p-3.5 bg-[#f5f3eb] border-t border-[#ebdcca] text-[10.5px] text-[#5e5a52] text-center font-serif leading-normal italic">
              "Ý đồ phác họa chuẩn giúp AI không bao giờ đi lệch con đường nghệ thuật đã chọn."
            </div>

          </div>

        </section>

        {/* RIGHT COLUMN: CHAPTER WORKSPACE & AI INTERACTIVE PROCESS */}
        <section id="main-editor-workspace" className="md:col-span-7 lg:col-span-8 flex flex-col gap-4">
          
          {/* TOP CONTROLS: CHỌN CHƯƠNG & KHỞI TẠO CHƯƠNG */}
          <div className="bg-[#FAF9F5] border border-[#dbd8cf] p-4 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#881337] shrink-0" />
              <div>
                <label className="block text-[10px] text-gray-400 font-mono">ĐANG ĐỒNG HÀNH VIẾT</label>
                <select 
                  id="chapter-workspace-select"
                  className="bg-transparent font-serif font-bold text-[#443825] outline-none border-b border-amber-900/40 pr-8 text-sm focus:border-amber-600 pb-0.5"
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(e.target.value)}
                >
                  {chapters.map(c => (
                    <option key={c.id} value={c.id}>
                      Hồi {c.number}: {c.title.replace(/^(Chương|Hồi)\s*\d+:\s*/i, '')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                id="create-new-chap-btn"
                onClick={handleCreateChapter}
                className="bg-[#2a2822] hover:bg-black text-amber-100 px-3 py-2 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Chương Mới</span>
              </button>
              <button 
                id="delete-current-chap-btn"
                onClick={(e) => handleDeleteChapter(activeChapter.id, e)}
                className="hover:bg-red-50 text-red-800 border border-red-200 px-2.5 py-1.5 rounded-lg text-xs flex items-center transition-colors cursor-pointer"
                title="Xóa chương hiện tại"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* ACTIVE WORKSPACE AREA PARCHMENT VIEW */}
          <div className="bg-[#FAF9F5] border border-[#dbd8cf] rounded-2xl shadow-sm flex flex-col overflow-hidden">
            
            {/* Writer Config Drawer */}
            <div className="p-4 bg-gradient-to-r from-[#efebe1] to-[#e7e1d4] border-b border-[#dbd8cf] space-y-3">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#3a372d] tracking-wide uppercase flex items-center gap-1">
                  <Settings className="w-4 h-4 text-amber-800" />
                  <span>CẤU HÌNH BÚT PHÁP SÁNG TÁC</span>
                </span>
                <span className="text-[10px] text-amber-900 bg-amber-50-40 border border-amber-300 font-mono px-2 py-0.5 rounded uppercase">
                  ORINLO INTEGRATED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                
                {/* Mode Select */}
                <div>
                  <label className="block text-[10.5px] font-bold text-[#555042] mb-1">Mức Độ Chi Tiết (Orinlo Core)</label>
                  <select 
                    id="writing-mode-select"
                    className="w-full text-xs bg-white border border-[#cfcabb] rounded-lg px-2.5 py-1.8 outline-none focus:border-amber-700"
                    value={settings.writingMode}
                    onChange={(e) => setSettings({ ...settings, writingMode: e.target.value as any })}
                  >
                    <option value="standard">Tiểu Thuyết Thông Thường (Standard PG-13)</option>
                    <option value="orinlo_m1">Orinlo Mức 1 (Fade to Black - Tập trung tâm lý)</option>
                    <option value="orinlo_m2">Orinlo Mức 2 (Metaphorical 18+ - Mô tả bằng ẩn dụ nghệ thuật)</option>
                    <option value="orinlo_m3">Orinlo Mức 3 (Direct Core 18+ - Mô tả trực diện mãnh liệt)</option>
                  </select>
                </div>

                {/* Tone Select */}
                <div>
                  <label className="block text-[10.5px] font-bold text-[#555042] mb-1">Giọng Văn Chủ Định</label>
                  <select 
                    id="custom-tone-select"
                    className="w-full text-xs bg-white border border-[#cfcabb] rounded-lg px-2.5 py-1.8 outline-none focus:border-amber-700"
                    value={settings.customTone}
                    onChange={(e) => setSettings({ ...settings, customTone: e.target.value })}
                  >
                    <option value="Gợi cảm, điện ảnh và kịch tính">Gợi cảm, điện ảnh và lôi cuốn</option>
                    <option value="Lạnh lùng, khô khằn, đầy nguy hiểm">Lạnh lùng võ thuật hắc ám</option>
                    <option value="Chậm rãi, u mị và ngập hoài niệm">Chậm rãi sương mù trữ tình</option>
                    <option value="Nhịp điệu dồn dập, căng bức ngột thở">Nhịp điệu dồn dập kịch tính</option>
                    <option value="Kiếm hiệp cổ phong kỳ vĩ">Cổ phong Hán Việt diệu vợi</option>
                  </select>
                </div>

              </div>

              {/* Checkbox controls for 5 senses and psychological changes */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                
                <label className="flex items-center gap-2 text-xs text-[#413e34] font-medium cursor-pointer">
                  <input 
                    id="sensory-emphasis-checkbox"
                    type="checkbox"
                    checked={settings.sensoryEmphasis}
                    onChange={(e) => setSettings({ ...settings, sensoryEmphasis: e.target.checked })}
                    className="w-4 h-4 accent-amber-800"
                  />
                  <span>Mô tả kỹ lưỡng ngũ giác quan</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#413e34] font-medium cursor-pointer">
                  <input 
                    id="psychological-focus-checkbox"
                    type="checkbox"
                    checked={settings.psychologicalFocus}
                    onChange={(e) => setSettings({ ...settings, psychologicalFocus: e.target.checked })}
                    className="w-4 h-4 accent-amber-800"
                  />
                  <span>Khắc họa biến thiên tâm lý thâm tâm</span>
                </label>

                <div className="flex items-center gap-2 text-xs text-[#413e34]">
                  <span className="font-medium">Độ dài mục tiêu:</span>
                  <select 
                    id="word-count-select"
                    className="bg-white border border-[#cfcabb] rounded px-1.5 py-0.5 text-[11px]"
                    value={settings.wordCountTarget}
                    onChange={(e) => setSettings({ ...settings, wordCountTarget: Number(e.target.value) })}
                  >
                    <option value="600">~600 chữ (Ngắn)</option>
                    <option value="1200">~1200 chữ (Chuẩn)</option>
                    <option value="1800">~1800 chữ (Phân cảnh sâu sắc)</option>
                  </select>
                </div>

              </div>

            </div>

            {/* MAIN PARCHMENT CANVAS EXCLUSIVE CONTAINER */}
            <div className="p-4 bg-[#FAF9F5] space-y-4">
              
              {/* Ý Tưởng Khởi Điểm & Edit title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-[10.5px] font-bold text-[#555042] mb-1 uppercase tracking-wider">Tiêu Đề / Tên Hồi Chương</label>
                  <input 
                    id="chap-title-input"
                    type="text" 
                    className="w-full text-sm font-serif font-semibold bg-white border border-[#dbd8cf] rounded-xl px-3 py-2 outline-none focus:border-amber-600 transition-colors"
                    placeholder="VD: Hồi 1: Đêm Tuyết Hang Đá"
                    value={activeChapter?.title || ''}
                    onChange={(e) => handleUpdateChapterField('title', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-[#555042] mb-1 uppercase tracking-wider">Ý Tưởng Phác Thảo Của Bạn (Chi tiết cho chương này)</label>
                  <textarea 
                    id="chap-prompt-textarea"
                    className="w-full h-[38px] text-xs bg-white border border-[#dbd8cf] rounded-xl px-3 py-1 outline-none focus:border-amber-600 transition-colors leading-normal resize-none custom-scrollbar"
                    placeholder="Mô tả sự kiện then chốt của chương..."
                    value={activeChapter?.userPrompt || ''}
                    onChange={(e) => handleUpdateChapterField('userPrompt', e.target.value)}
                  />
                </div>

              </div>

              {/* INTERACTIVE WORKSPACE INSTRUMENTS */}
              <div className="bg-[#f0ede4] border border-[#cfcabb] p-3 rounded-xl space-y-3">
                
                <div className="flex flex-wrap items-center justify-between gap-2">
                  
                  <div className="flex items-center gap-2">
                    <Feather className="w-4 h-4 text-amber-800" />
                    <span className="text-xs font-extrabold text-[#3a372e] uppercase">BẢNG KÍCH HOẠT SÁNG TÁC</span>
                  </div>

                  {/* Mode Selector for Action */}
                  <div className="flex rounded-lg bg-white p-0.5 border border-[#cfcabb] text-xs">
                    <button 
                      id="action-write-new"
                      onClick={() => setActionType('writeNew')}
                      className={`px-2.5 py-1 rounded-md transition-all text-[11px] font-bold cursor-pointer ${
                        actionType === 'writeNew' 
                        ? 'bg-[#881337] text-white' 
                        : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Viết từ đầu
                    </button>
                    <button 
                      id="action-continue"
                      onClick={() => setActionType('continue')}
                      className={`px-2.5 py-1 rounded-md transition-all text-[11px] font-bold cursor-pointer ${
                        actionType === 'continue' 
                        ? 'bg-[#881337] text-white' 
                        : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Viết tiếp {activeChapter?.content ? '⬇' : ''}
                    </button>
                    <button 
                      id="action-elaborate"
                      onClick={() => setActionType('elaborate')}
                      className={`px-2.5 py-1 rounded-md transition-all text-[11px] font-bold cursor-pointer ${
                        actionType === 'elaborate' 
                        ? 'bg-[#881337] text-white' 
                        : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      Viết chi tiết hóa mảnh nháp
                    </button>
                  </div>

                  {/* AI Suggested Paths Rendering */}
                  {activeChapter?.suggestedPaths && activeChapter.suggestedPaths.length > 0 && (
                    <div className="bg-[#fdfcf9] border border-[#d8d5ca] p-3 rounded-lg shadow-inner mt-2">
                      <h4 className="text-[10px] font-bold text-[#555042] mb-1.5 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Gợi ý cốt truyện tiếp theo
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {activeChapter.suggestedPaths.map((path, idx) => (
                          <button 
                            key={idx} 
                            className="w-full text-left text-xs bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-950 p-2 rounded shadow-xs border border-[#e4e2d8] transition-all"
                            onClick={() => setUserInstruction(path)}
                          >
                            {path}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Additional Instruction TextArea */}
                <div>
                  <textarea 
                    id="user-instruction-input"
                    className="w-full h-18 text-xs bg-white border border-[#dbd8cf] rounded-lg p-2.5 outline-none focus:border-amber-600 leading-relaxed resize-none custom-scrollbar"
                    placeholder={
                      actionType === 'continue' 
                      ? 'Ý đồ hay tình tiết lôi cuốn bạn muốn thúc AI viết tiếp theo ở đây... (ví dụ: "Sư tôn đột ngột siết chặt hông, nén đau liếc mắt thắm lãng mạn...")'
                      : actionType === 'elaborate'
                      ? 'Bổ sung hướng dẫn chi tiết cụ thể để mở rộng mượt mà... (ví dụ: "Khắc sâu hơn xúc giác đập dập, hơi thở mập mờ trong hang động...")'
                      : 'Ý đồ bối cảnh cụ thể mà bạn muốn AI gia cố thêm trong chương này...'
                    }
                    value={userInstruction}
                    onChange={(e) => setUserInstruction(e.target.value)}
                  />
                </div>

                {/* Main Sparkles Trigger Button */}
                <button 
                  id="trigger-ai-btn"
                  onClick={handleCallAIGeneration}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-amber-800 to-red-950 hover:from-amber-900 hover:to-stone-900 text-amber-100 font-serif font-semibold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border border-amber-600/30 disabled:opacity-45 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <RefreshCw className="w-5 h-5 animate-spin text-amber-300" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                  )}
                  <span>
                    {isGenerating ? `ĐANG THỂ HIỆN bút pháp: ${settings.writingMode === 'orinlo_m3' ? 'Orinlo 18+' : 'Chi tiết văn học'}...` : '✨ ĐỒNG SÁNG TÁC - TOẢ LINH NỘI DUNG CHƯƠNG CHI TIẾT'}
                  </span>
                </button>

                {/* Loading status details rendering */}
                {isGenerating && aiStepFeedback && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] font-mono text-amber-900 text-center flex items-center justify-center gap-2 pt-1 font-semibold"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    <span>{aiStepFeedback}</span>
                  </motion.div>
                )}

              </div>

              {/* DÂN CHƯƠNG GIẤY IVORY - TEXT EDITOR PANEL */}
              <div className="relative">
                
                <div id="parchment-sheet-box" className="w-full bg-[#fcfbf9] border border-[#d9ccb4] shadow-md rounded-2xl p-4 md:p-6 flex flex-col relative overflow-hidden bg-[radial-gradient(#faf7ee_1px,transparent_1px)] [background-size:16px_16px]">
                  
                  {/* Decorative parchment line elements */}
                  <div className="absolute top-0 bottom-0 left-4 w-px bg-red-800/10 hidden md:block"></div>
                  <div className="absolute top-0 bottom-0 left-4.5 w-px bg-red-800/5 hidden md:block"></div>

                  <div className="flex justify-between items-center border-b border-[#eadaa6] pb-3 mb-4 font-serif text-xs text-[#6e685f]">
                    <span className="flex items-center gap-1">
                      <Feather className="w-3.5 h-3.5" />
                      <span>{activeChapter?.title || 'Chương Chưa Đặt Tên'}</span>
                    </span>
                    <span className="font-mono text-[11px]">
                      {activeChapter?.content ? `${activeChapter.wordCount} chữ` : 'TRANG GIẤY TRỐNG'}
                    </span>
                  </div>

                  {/* Manual Editable textarea of chapter content */}
                  <textarea 
                    id="parchment-text-area"
                    className="w-full text-sm md:text-base font-serif bg-transparent leading-loose text-[#2b271e] focus:outline-none resize-none min-h-[460px] max-h-[800px] z-10 pl-0 md:pl-6 text-justify custom-scrollbar"
                    placeholder="Ấn nút 'Để AI Đồng Sáng Tác' để khởi tạo áng văn lãng mạn lôi cuốn thăng hoa ngũ giác quan, hoặc tự tay viết suy tư thầm kín của bạn tại đây linh khí..."
                    value={activeChapter?.content || ''}
                    rows={16}
                    onChange={(e) => handleUpdateChapterField('content', e.target.value)}
                  />

                  {/* Ribbon indicating active style status */}
                  <div className="mt-4 pt-3.5 border-t border-[#eadaa6] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#787162] z-10">
                    <div>
                      <span className="font-sans font-bold uppercase text-[9px] bg-amber-950/20 text-amber-950 px-2 py-0.5 rounded mr-1.5">
                        {settings.writingMode === 'orinlo_m3' && 'MỨC 3: TRỰC TIẾP'}
                        {settings.writingMode === 'orinlo_m2' && 'MỨC 2: ẨN DỤ SÂU'}
                        {settings.writingMode === 'orinlo_m1' && 'MỨC 1: FADE-TO-BLACK'}
                        {settings.writingMode === 'standard' && 'THƯỜNG: STANDARD'}
                      </span>
                      <span>Tone: <span className="font-serif italic font-bold">{settings.customTone}</span></span>
                    </div>
                    {isGenerating ? (
                      <span className="text-red-800 animate-pulse flex items-center gap-1 font-bold">
                        <Flame className="w-3.5 h-3.5 animate-bounce" /> Sáng tác dạt dào...
                      </span>
                    ) : (
                      <span className="text-emerald-800 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Thể chương sẵn sàng
                      </span>
                    )}
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* EXTRA: ORINLO RULES EXPLAINER CARD */}
          <div id="orinlo-rules-card" className="bg-[#FAF9F5] border border-[#dbd8cf] p-4 rounded-xl shadow-xs">
            <h4 className="font-serif font-bold text-sm text-[#4a3a24] flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-red-800" />
              <span>Gợi ý Nguyên tắc Bút pháp Thăng hoa Orinlo Core</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-[#514d42]">
              <div className="space-y-1">
                <p><span className="font-bold text-amber-900">• Đỉnh Cao Ngũ Giác Quan:</span> Sáng tác thăng hoa cần trọn vẹn thị giác bập bùng, thính giác nồng say, xúc giác ngàn hơi điện dội và dồi dào vị giác môi kề môi mặn đắng nồng mật.</p>
                <p><span className="font-bold text-amber-900">• Phát triển Mâu Thuẫn:</span> Mỗi phân cảnh lãng mạn hay tẩu hỏa nhập ma là dòng chảy động lực của khao khát chiếm lĩnh và thử thách đạo lý cấm kỵ tinh vi.</p>
              </div>
              <div className="space-y-1">
                <p><span className="font-bold text-amber-900">• Tránh Sáo Rỗng:</span> Tránh các mô tả hoa mỹ nhạt nhòa, tập trung khắc sâu chuyển biến nhịp thở, nét mồ hôi li ti rơi trên ngực hay sự rùng mình run rẩy mê say thầm kín.</p>
                <p><span className="font-bold text-amber-900">• Duy Trì Hồ Sơ:</span> Hồ sơ cốt truyện ngăn AI sa đà vào các lối thoại hiện đại nhạt nhòa, giữ chất văn bay bổng hoặc quyến rũ đậm bối cảnh Việt Nam.</p>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* FOOTER BAR OF EXCELLENCE */}
      <footer id="app-footer" className="bg-[#11100e] border-t border-[#2e2a22] mt-8 py-5 text-center text-amber-200/50 text-xs font-serif italic">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2.5">
          <div>
            "Văn võ phong sương hành giang hồ, tình duyên dẫu cấm kỵ vẫn rực cháy mười phương."
          </div>
          <div className="font-sans font-mono text-[10.5px] not-italic">
            Thiết kế bởi Đồng Sáng Tác AI & Đại Sư ORINLO © 2026
          </div>
        </div>
      </footer>

    </div>
  );
}
