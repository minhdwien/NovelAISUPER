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
  themes: ['Bi thương', 'Đam mê cấm kỵ', 'Chính tà nan phân'],
  coreConflict: 'Mâu thuẫn giữa sư đồ trong môi trường khắc nghiệt và kịch độc Âm Hàn.',
  styleNotes: 'Cổ điển, hoa mỹ, nhiều từ ngữ gợi cảm, nhịp điệu chậm rãi nhưng căng thẳng.',
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
      startingPower: 'Công lực: Cực Hạn Kiếm Tôn, Tinh Thần: Nguyên Anh Thần Thức, Cơ Thể: Suy bại âm độc (40%)',
      relationships: 'Sư tôn của Mộ Dung Nguyệt.'
    },
    {
      id: 'char-2',
      name: 'Mộ Dung Nguyệt',
      gender: 'Nữ',
      biography: 'Nữ đệ tử cuối cùng của Tuyệt Tình Phong. Vốn là hậu duệ duy nhất của Thượng Cổ Phượng tộc chịu phong ấn, có thân thể linh khí thuần dương phát hỏa tự nhiên cực kỳ quý hiếm. Nàng kiên cường, trốn chạy khỏi hôn ước gia tộc sắp đặt để tìm lối thoát tự sinh.',
      personality: 'Quật cường, thông tuệ, can đảm vô song, đối với Sư tôn tôn kính nhưng bên trong lại dấy lên sự tò mò mạnh mẽ và khao khát được khuất phục hay bộc phát ngọn lửa ẩn tàng trong tâm khảm.',
      skills: 'Phượng Dực Không Hành, Cố Nguyên Phục Linh Quyết, Ngự Hỏa Chiêm Tinh',
      startingPower: 'Công lực: Trúc Cơ Trung Kỳ, Tinh Thần: Linh Thần bẩm sinh, Cơ Thể: Thuần Dương Phượng Huyết',
      relationships: 'Đệ tử của Thẩm Thanh Ngôn.'
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

  const [activeTab, setActiveTab] = useState<'write' | 'profile'>('write');
  const [profileStep, setProfileStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [userInstruction, setUserInstruction] = useState<string>('');
  const [actionType, setActionType] = useState<'writeNew' | 'continue' | 'elaborate'>('writeNew');
  
  const [newCultivation, setNewCultivation] = useState('');
  const [newRank, setNewRank] = useState('');
  const [newCurrency, setNewCurrency] = useState('');
  const [newRule, setNewRule] = useState('');

  const [editCharacterId, setEditCharacterId] = useState<string | null>(null);
  const [charFormName, setCharFormName] = useState('');
  const [charFormGender, setCharFormGender] = useState('Nữ');
  const [charFormBio, setCharFormBio] = useState('');
  const [charFormPersonality, setCharFormPersonality] = useState('');
  const [charFormSkills, setCharFormSkills] = useState('');
  const [charFormPower, setCharFormPower] = useState('');

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [driveFileId, setDriveFileId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; isError?: boolean } | null>(null);
  const [aiStepFeedback, setAiStepFeedback] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('novel_app_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('novel_app_chapters', JSON.stringify(chapters));
  }, [chapters]);

  useEffect(() => {
    localStorage.setItem('novel_app_settings', JSON.stringify(settings));
  }, [settings]);

  // Auth Status check for Drive sync on mount
  useEffect(() => {
    fetch('/api/auth/user')
      .then(res => {
        if (res.ok) return res.json();
        return null;
      })
      .then(user => {
        if (user && user.email) {
          setIsLoggedIn(true);
          if (user.driveFileId) {
            setDriveFileId(user.driveFileId);
          }
        }
      })
      .catch(() => {});
  }, []);

  const showNotification = (message: string, isError: boolean = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handleResetDraft = () => {
    if (confirm('Bạn có chắc chắn muốn nạp lại bối cảnh mẫu mặc định? Toàn bộ sửa đổi hiện tại sẽ ghi đè.')) {
      setProfile(DEFAULT_PROFILE);
      setChapters(DEFAULT_CHAPTERS);
      setSettings(DEFAULT_SETTINGS);
      setSelectedChapterId(DEFAULT_CHAPTERS[0].id);
      showNotification('Đã khởi hồi bối cảnh chuẩn!');
    }
  };

  const handleCreateChapter = () => {
    const nextNumber = chapters.length + 1;
    const newId = `chap-${Date.now()}`;
    const newChap: Chapter = {
      id: newId,
      number: nextNumber,
      title: `Hồi ${nextNumber}: Tiêu Đề Chưa Đặt`,
      userPrompt: '',
      content: '',
      wordCount: 0,
      createdAt: new Date().toISOString()
    };
    const updated = [...chapters, newChap];
    setChapters(updated);
    setSelectedChapterId(newId);
    showNotification(`Đã tạo Hồi ${nextNumber} thành công!`);
  };

  const handleDeleteChapter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (chapters.length <= 1) {
      showNotification('Không thể xóa hết hồi chương. Phải có ít nhất một chương khởi thủy.', true);
      return;
    }
    if (confirm('Bạn có chắc muốn xóa vĩnh viễn hồi chương này?')) {
      const remaining = chapters.filter(c => c.id !== id);
      const renumbered = remaining.map((c, idx) => ({ ...c, number: idx + 1 }));
      setChapters(renumbered);
      if (selectedChapterId === id) {
        setSelectedChapterId(renumbered[0]?.id || '');
      }
      showNotification('Đã xóa bỏ hồi chương.');
    }
  };

  const handleUpdateChapterField = (field: keyof Chapter, value: any) => {
    setChapters(prev => prev.map(c => {
      if (c.id === selectedChapterId) {
        const updated = { ...c, [field]: value };
        if (field === 'content') {
          updated.wordCount = (value || '').trim().split(/\s+/).filter(Boolean).length;
        }
        return updated;
      }
      return c;
    }));
  };

  const activeChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  // Steps collection triggers
  const handleAddCultivation = () => {
    if (!newCultivation.trim()) return;
    if (profile.cultivationSystem.includes(newCultivation.trim())) {
      showNotification('Hệ thống này đã tồn tại!', true);
      return;
    }
    setProfile({
      ...profile,
      cultivationSystem: [...profile.cultivationSystem, newCultivation.trim()]
    });
    setNewCultivation('');
    showNotification('Đã ghim hệ pháp tu luyện.');
  };

  const handleAddRank = () => {
    if (!newRank.trim()) return;
    if (profile.ranks.includes(newRank.trim())) {
      showNotification('Cảnh cảnh giới này đã tồn tại!', true);
      return;
    }
    setProfile({
      ...profile,
      ranks: [...profile.ranks, newRank.trim()]
    });
    setNewRank('');
    showNotification('Đã lưu cảnh giới.');
  };

  const handleAddCurrency = () => {
    if (!newCurrency.trim()) return;
    if (profile.currencies.includes(newCurrency.trim())) {
      showNotification('Tiền tệ này đã tồn tại!', true);
      return;
    }
    setProfile({
      ...profile,
      currencies: [...profile.currencies, newCurrency.trim()]
    });
    setNewCurrency('');
    showNotification('Đã ghim tiền tệ.');
  };

  const handleAddRule = () => {
    if (!newRule.trim()) return;
    if (profile.rules.includes(newRule.trim())) {
      showNotification('Pháp luật thiên địa này đã tồn tại!', true);
      return;
    }
    setProfile({
      ...profile,
      rules: [...profile.rules, newRule.trim()]
    });
    setNewRule('');
    showNotification('Đã ghi khắc bộ quy tắc thiên địa bối cảnh.');
  };

  const handleRemoveProfileArrayItem = (key: 'cultivationSystem' | 'ranks' | 'currencies' | 'rules', idx: number) => {
    const arr = [...profile[key]];
    arr.splice(idx, 1);
    setProfile({ ...profile, [key]: arr });
    showNotification('Đã gỡ bỏ bối cảnh thành phần.');
  };

  const handleSaveCharacter = () => {
    if (!charFormName.trim()) {
      showNotification('Phải ghi danh tính / tên nhân vật!', true);
      return;
    }
    const newChar: Character = {
      id: editCharacterId || `char-${Date.now()}`,
      name: charFormName.trim(),
      gender: charFormGender,
      biography: charFormBio.trim() || 'Nhân vật bí mật chưa hé lộ thần hồn.',
      personality: charFormPersonality.trim(),
      skills: charFormSkills.trim(),
      startingPower: charFormPower.trim(),
      relationships: ''
    };

    let updatedChars = [...profile.characters];
    if (editCharacterId) {
      updatedChars = updatedChars.map(c => c.id === editCharacterId ? newChar : c);
      showNotification(`Chỉnh sửa nhân vật ${charFormName} thành hệ thống.`);
    } else {
      updatedChars.push(newChar);
      showNotification(`Đã tạo hồ sơ cho ${charFormName}.`);
    }

    setProfile({ ...profile, characters: updatedChars });
    setEditCharacterId(null);
    setCharFormName('');
    setCharFormBio('');
    setCharFormPersonality('');
    setCharFormSkills('');
    setCharFormPower('');
  };

  const handleStartEditCharacter = (c: Character) => {
    setEditCharacterId(c.id);
    setCharFormName(c.name);
    setCharFormGender(c.gender);
    setCharFormBio(c.biography);
    setCharFormPersonality(c.personality || '');
    setCharFormSkills(c.skills || '');
    setCharFormPower(c.startingPower || '');
    setProfileStep(3);
    showNotification(`Đã nạp thông số ${c.name} lên bảng hiệu chỉnh.`);
  };

  const handleDeleteCharacter = (id: string) => {
    if (confirm('Sinh tử vô thường, bạn có chắc chắn muốn trục xuất nhân vật này khỏi hồ sơ?')) {
      const updated = profile.characters.filter(c => c.id !== id);
      setProfile({ ...profile, characters: updated });
      if (editCharacterId === id) setEditCharacterId(null);
      showNotification('Đã xóa bỏ nhân vật.');
    }
  };

  const handleDriveSave = async () => {
    try {
      showNotification('Đang gửi hồ sơ lên Google Drive...');
      const res = await fetch('/api/drive/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, chapters, settings })
      });
      if (res.ok) {
        const out = await res.json();
        if (out.fileId) setDriveFileId(out.fileId);
        showNotification('Đã đóng ấn và gửi nhớ mây thành công!');
      } else {
        throw new Error('Từ chối lưu trữ.');
      }
    } catch (err: any) {
      showNotification(err.message || 'Lỗi lưu trữ mây.', true);
    }
  };

  const handleDriveLoad = async () => {
    try {
      showNotification('Đang lục tìm hồ sơ của bạn trên Drive...');
      const res = await fetch('/api/drive/get');
      if (res.ok) {
        const out = await res.json();
        if (out.profile && out.chapters) {
          setProfile(out.profile);
          setChapters(out.chapters);
          if (out.settings) setSettings(out.settings);
          setSelectedChapterId(out.chapters[0]?.id || '');
          showNotification('Đã nạp lại bối cảnh lưu trữ mây thành công!');
        } else {
          showNotification('Chưa tìm thấy bản thảo đã đồng bộ trên Drive!', true);
        }
      } else {
         throw new Error('Không thể tiếp cận Server.');
      }
    } catch (err: any) {
       showNotification(err.message || 'Lỗi tải hồ sơ mây.', true);
    }
  };

  const handleCallAIGeneration = async () => {
    if (!activeChapter) return;
    setIsGenerating(true);
    setAiStepFeedback('Đang kết nối thần cốt linh thức...');
    
    let stepCount = 0;
    const interval = setInterval(() => {
      stepCount++;
      if (stepCount === 1) setAiStepFeedback('Trích xuất chỉ số tu vi bối cảnh sườn bối kịch...');
      if (stepCount === 2) setAiStepFeedback('Đồng chỉnh ngũ giác quan & cấu hình bút pháp...');
      if (stepCount === 3) setAiStepFeedback(`Đóng dệt văn phong ${settings.customTone}...`);
      if (stepCount === 4) setAiStepFeedback('Giải tỏa linh khí viết áng văn thăng hoa nhục cảm...');
    }, 2500);

    try {
      const res = await fetch('/api/generate-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          chapter: activeChapter,
          settings,
          actionType,
          userInstruction
        })
      });

      clearInterval(interval);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Gemini không phản hồi đúng dạng.');
      }

      const out = await res.json();
      if (out.content) {
        let contentToSave = out.content;
        if (actionType === 'continue' && activeChapter.content) {
          contentToSave = `${activeChapter.content}\n\n${out.content}`;
        }
        
        setChapters(prev => prev.map(c => {
          if (c.id === selectedChapterId) {
            const up = {
              ...c,
              content: contentToSave,
              wordCount: contentToSave.trim().split(/\s+/).filter(Boolean).length
            };
            if (out.suggestedPaths) up.suggestedPaths = out.suggestedPaths;
            return up;
          }
          return c;
        }));

        setUserInstruction('');
        showNotification('Thần thức bão bùng! Áng văn đắt giá đã lộ diện!');
      } else {
        throw new Error('Áng văn bị tản mác không có hồi đáp.');
      }

    } catch (err: any) {
      clearInterval(interval);
      showNotification(err.message || 'Lỗi kết nối hoặc kịch cảnh bị gián đoạn.', true);
    } finally {
      setIsGenerating(false);
      setAiStepFeedback('');
    }
  };

  return (
    <div id="main-app-container" className="min-h-screen bg-[#eae8de] text-[#2d2c25] font-sans antialiased flex flex-col pointer-events-auto custom-scrollbar pb-32">
      
      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            id="notification-bubble"
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-medium transition-all ${
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

      {/* HEADER SECTION - Pitch Dark Elegant Slate */}
      {isHeaderVisible && (
        <motion.header 
          id="app-header" 
          className="bg-[#161512] text-amber-100/90 border-b border-[#2e2a22] shadow-lg sticky top-0 z-45"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#2a2822] to-[#1a1915] rounded-xl border border-amber-600/30 flex items-center justify-center shadow-inner">
                <Feather className="w-6 h-6 text-[#decb96]" />
              </div>
              <div>
                <h1 id="app-main-title" className="font-serif font-black text-[#f4f2eb] text-lg tracking-tight leading-tight">
                  Hợp Tác Viết Tiểu Thuyết AI
                </h1>
                <p className="text-[11px] text-[#decb96]/75 font-serif italic mt-0.5">
                  Bút pháp Orinlo Core &amp; Hồ Sơ Thế Giới Hoàn Chỉnh
                </p>
              </div>
            </div>
            
            <div className="bg-[#881337] text-white text-[9px] font-sans font-bold px-2.5 py-1.5 rounded-lg tracking-widest uppercase border border-red-900/20 shadow-sm shrink-0">
              CO-WRITE WORKSPACE
            </div>
          </div>
        </motion.header>
      )}

      {/* PRIMARY FLOW CONTAINER - Centered Column */}
      <main className="max-w-2xl mx-auto w-full px-4 pt-4 pb-20 space-y-4 flex-1">
        
        {/* SPECIMEN ACTIVE CONTROLS ROW */}
        <div className="flex items-center justify-between gap-3 bg-[#FAF9F5]/80 p-2 rounded-2xl border border-[#dbd8cf]/30 shadow-6xs">
          <button 
            id="reset-state-btn"
            onClick={handleResetDraft}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-sans font-bold text-[#b45309] border border-amber-800/20 hover:border-amber-700 bg-white rounded-xl transition-all shadow-6xs cursor-pointer select-none"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
            <span>Dùng Bối Cảnh Mẫu</span>
          </button>

          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              <a href="/api/auth/login" className="px-3 py-1.5 text-[11px] font-bold bg-[#161512] text-[#f4f2eb] rounded-xl border border-[#2e2a22] hover:bg-black transition-colors select-none">
                Đăng nhập Drive
              </a>
            ) : (
              <div className="flex gap-1.5">
                <button onClick={handleDriveLoad} className="px-2.5 py-1 text-[10px] uppercase font-bold bg-emerald-950 text-emerald-200 border border-emerald-800/40 rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer">Tải Drive</button>
                <button onClick={handleDriveSave} className="px-2.5 py-1 text-[10px] uppercase font-bold bg-amber-950 text-amber-200 border border-amber-800/40 rounded-lg hover:bg-amber-900 transition-colors cursor-pointer">Lưu Drive</button>
              </div>
            )}
          </div>
        </div>

        {/* ----------------- TAB 1: VIẾT TRUYỆN ----------------- */}
        {activeTab === 'write' && (
          <div className="space-y-4 animate-fade-in pb-10">
            
            {/* Card 1: Hồi Chương Đang Viết */}
            <div className="bg-[#fcfbf9] border border-[#dedad0] p-5 rounded-2xl shadow-[0_4px_24px_-4px_rgba(45,44,37,0.04)] space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 text-[#881337] bg-rose-50 border border-rose-100/80 rounded-xl shrink-0 mt-0.5 shadow-6xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] text-stone-400 font-sans font-bold tracking-wider uppercase mb-1.5">CHỌN CHƯƠNG / HỒI ĐANG VIẾT</span>
                  <select 
                    id="chapter-workspace-select"
                    className="w-full bg-[#fdfdfb] border border-[#dedad0] rounded-xl px-3.5 py-2.5 font-serif font-bold text-sm text-[#2d2c25] outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 transition-all duration-200 cursor-pointer shadow-6xs"
                    value={activeChapter?.id || ''}
                    onChange={(e) => setSelectedChapterId(e.target.value)}
                  >
                    {chapters.map(c => (
                      <option key={c.id} value={c.id} className="font-serif text-[#2d2c25] bg-white">
                        Hồi {c.number}: {c.title.replace(/^(Chương|Hồi|Hồi\s*\d+:)\s*/i, '')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button 
                  id="create-new-chap-btn"
                  onClick={handleCreateChapter}
                  className="bg-[#2a2822] hover:bg-black text-amber-100 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all duration-150 active:scale-[0.98] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Chương Mới</span>
                </button>
                <button 
                  id="delete-current-chap-btn"
                  onClick={(e) => handleDeleteChapter(activeChapter.id, e)}
                  className="hover:bg-red-50 text-red-800 border border-[#dedad0] hover:border-red-200 px-3 py-2 rounded-xl text-xs flex items-center justify-center transition-all duration-150 bg-white shadow-6xs cursor-pointer"
                  title="Xóa chương hiện tại"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>

            {/* Card 2: Cấu Hình Bút Pháp */}
            <div className="bg-[#fcfbf9] border border-[#dedad0] p-5 rounded-2xl shadow-[0_4px_24px_-4px_rgba(45,44,37,0.04)] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3a372d] tracking-wider uppercase flex items-center gap-1.5 font-sans">
                  <Settings className="w-4 h-4 text-amber-800" />
                  <span>CẤU HÌNH BÚT PHÁP SÁNG TÁC</span>
                </span>
                <span className="text-[9.5px] text-[#ae3813] bg-amber-50 hover:bg-amber-100/50 border border-[#ae3813]/25 font-mono px-2 py-0.5 rounded font-extrabold uppercase tracking-wider select-none">
                  ORINLO INTEGRATED
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#555042] mb-1.5 font-sans">Mức Độ Chi Tiết (Orinlo Core)</label>
                  <select 
                    id="writing-mode-select"
                    className="w-full text-[13px] font-sans bg-[#fdfdfb] border border-[#dedad0] rounded-xl px-3.5 py-2.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 cursor-pointer text-[#2d2c25] shadow-6xs"
                    value={settings.writingMode}
                    onChange={(e) => setSettings({ ...settings, writingMode: e.target.value as any })}
                  >
                    <option value="standard">Tiểu Thuyết Thông Thường (Standard PG-13)</option>
                    <option value="orinlo_m1">Orinlo Mức 1 (Fade to Black - Tập trung tâm lý)</option>
                    <option value="orinlo_m2">Orinlo Mức 2 (Metaphorical 18+ - Mô tả bằng ẩn dụ nghệ thuật)</option>
                    <option value="orinlo_m3">Orinlo Mức 3 (Direct Core 18+ - Mô tả trực diện mãnh liệt)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#555042] mb-1.5 font-sans">Giọng Văn Chủ Định</label>
                  <select 
                    id="custom-tone-select"
                    className="w-full text-[13px] font-sans bg-[#fdfdfb] border border-[#dedad0] rounded-xl px-3.5 py-2.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 cursor-pointer text-[#2d2c25] shadow-6xs"
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

                <div className="space-y-2 border-t border-[#f2edd9]/50 pt-3.5">
                  <label className="flex items-center gap-2.5 text-xs text-[#2d2c25] font-medium cursor-pointer py-1.5 px-1 hover:bg-stone-50/50 rounded-lg transition-colors select-none">
                    <input 
                      id="sensory-emphasis-checkbox"
                      type="checkbox"
                      checked={settings.sensoryEmphasis}
                      onChange={(e) => setSettings({ ...settings, sensoryEmphasis: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-amber-600 border-[#dedad0] cursor-pointer accent-amber-700 transition-all focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="font-sans text-[12px] font-medium text-[#2d2c25]">Mô tả kỹ lưỡng ngũ giác quan</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-[#2d2c25] font-medium cursor-pointer py-1.5 px-1 hover:bg-stone-50/50 rounded-lg transition-colors select-none">
                    <input 
                      id="psychological-focus-checkbox"
                      type="checkbox"
                      checked={settings.psychologicalFocus}
                      onChange={(e) => setSettings({ ...settings, psychologicalFocus: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-amber-600 border-[#dedad0] cursor-pointer accent-amber-700 transition-all focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="font-sans text-[12px] font-medium text-[#2d2c25]">Khắc họa biến thiên tâm lý thâm tâm</span>
                  </label>
                </div>

                <div className="flex items-center justify-between text-xs text-[#413e34] border-t border-[#f2edd9]/50 pt-3.5">
                  <span className="font-bold font-sans">Độ dài mục tiêu:</span>
                  <select 
                    id="word-count-select"
                    className="bg-[#fdfdfb] border border-[#dedad0] rounded-xl px-3 py-1.5 text-xs font-sans outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 transition-all cursor-pointer shadow-6xs"
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

            {/* Card 3: Chi Tiết Tiêu Đề Chương */}
            <div className="bg-[#fcfbf9] border border-[#dedad0] p-5 rounded-2xl shadow-[0_4px_24px_-4px_rgba(45,44,37,0.04)] space-y-4">
              <div>
                <label className="block text-[10px] font-sans font-bold text-stone-400 mb-1.5 uppercase tracking-wider">TIÊU ĐỀ / TÊN HỒI CHƯƠNG</label>
                <input 
                  id="chap-title-input"
                  type="text" 
                  className="w-full text-sm font-serif font-bold bg-[#fdfdfb] border border-[#dedad0] rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 text-[#2d2c25] shadow-6xs placeholder-stone-400"
                  placeholder="VD: Hồi 1: Đêm Tuyết Trong Hang Băng lấp lánh"
                  value={activeChapter?.title || ''}
                  onChange={(e) => handleUpdateChapterField('title', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold text-stone-400 mb-1.5 uppercase tracking-wider">Ý TƯỞNG PHÁC THẢO CỦA BẠN (CHI TIẾT CHO CHƯƠNG NÀY)</label>
                <textarea 
                  id="chap-prompt-textarea"
                  className="w-full h-24 text-[12.5px] font-sans bg-[#fdfdfb] border border-[#dedad0] rounded-xl p-3.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 leading-relaxed resize-none text-[#2d2c25] custom-scrollbar shadow-6xs placeholder-stone-400"
                  placeholder="Mô tả các sự kiện bấu chốt mà bạn muốn vẽ bối cảnh..."
                  value={activeChapter?.userPrompt || ''}
                  onChange={(e) => handleUpdateChapterField('userPrompt', e.target.value)}
                />
              </div>
            </div>

            {/* Card 4: Bảng Kích Hoạt Sáng Tác */}
            <div className="bg-[#fcfbf9] border border-[#dedad0] p-5 rounded-2xl shadow-[0_4px_24px_-4px_rgba(45,44,37,0.04)] space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1 px-3 bg-gradient-to-r from-[#881337] to-[#161512] text-[#decb96] rounded-xl flex items-center gap-1.5 shadow-sm">
                  <Feather className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider">BẢNG KÍCH HOẠT SÁNG TÁC</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#efebd9]/55 rounded-xl border border-[#dedad0]/80 text-xs text-center font-bold font-sans shadow-6xs">
                <button 
                  id="action-write-new"
                  onClick={() => setActionType('writeNew')}
                  className={`py-2 rounded-lg transition-all duration-150 text-[11px] font-extrabold flex items-center justify-center cursor-pointer ${
                    actionType === 'writeNew' 
                    ? 'bg-[#881337] text-white shadow-sm' 
                    : 'text-[#5e5a52] bg-white border border-transparent hover:text-black hover:bg-white/80'
                  }`}
                >
                  viết từ đầu
                </button>
                <button 
                  id="action-continue"
                  onClick={() => setActionType('continue')}
                  className={`py-2 rounded-lg transition-all duration-150 text-[11px] font-extrabold flex items-center justify-center cursor-pointer ${
                    actionType === 'continue' 
                    ? 'bg-[#881337] text-white shadow-sm' 
                    : 'text-[#5e5a52] bg-white border border-transparent hover:text-black hover:bg-white/80'
                  }`}
                >
                  viết tiếp ⬇
                </button>
                <button 
                  id="action-elaborate"
                  onClick={() => setActionType('elaborate')}
                  className={`py-2 rounded-lg transition-all duration-150 text-[11px] font-extrabold flex items-center justify-center cursor-pointer ${
                    actionType === 'elaborate' 
                    ? 'bg-[#881337] text-white shadow-sm' 
                    : 'text-[#5e5a52] bg-white border border-transparent hover:text-black hover:bg-white/80'
                  }`}
                >
                  viết chi tiết
                </button>
              </div>

              {activeChapter?.suggestedPaths && activeChapter.suggestedPaths.length > 0 && (
                <div className="bg-[#fcfbf9] border border-[#eadaa6]/60 p-3.5 rounded-2xl shadow-inner space-y-2">
                  <h4 className="text-[10px] font-bold text-[#555042] uppercase flex items-center gap-1.5 tracking-wider font-sans">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" /> Gợi ý cốt truyện tiếp theo:
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    {activeChapter.suggestedPaths.map((path, idx) => (
                      <button 
                        key={idx} 
                        className="w-full text-left text-xs bg-white text-[#2d2c25] hover:bg-amber-50 hover:text-amber-950 p-2.5 rounded-xl border border-[#dedad0] hover:border-amber-700/55 transition-all duration-150 leading-normal shadow-6xs"
                        onClick={() => setUserInstruction(path)}
                      >
                        {path}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <textarea 
                  id="user-instruction-input"
                  className="w-full h-20 text-[12.5px] font-sans bg-[#fdfdfb] border border-[#dedad0] rounded-xl p-3.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 leading-relaxed resize-none text-[#2d2c25] custom-scrollbar shadow-6xs placeholder-stone-400"
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

              <button 
                id="trigger-ai-btn"
                onClick={handleCallAIGeneration}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-850 hover:to-stone-950 text-[#fffbeb] font-serif font-black text-sm py-4 px-4 rounded-xl shadow-md border-0 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none group transition-all duration-150 active:scale-[0.99]"
              >
                {isGenerating ? (
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-200" />
                ) : (
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse group-hover:scale-110 transition-transform" />
                )}
                <span>
                  {isGenerating ? 'ĐỒNG SÁNG TÁC ĐANG VIẾT...' : '✨ ĐỒNG SÁNG TÁC - TOẢ LINH NỘI DUNG CHƯƠNG CHI TIẾT'}
                </span>
              </button>

              {isGenerating && aiStepFeedback && (
                <div className="text-[11px] font-mono text-amber-900 text-center flex items-center justify-center gap-2 pt-1 font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-700 animate-ping"></span>
                  <span>{aiStepFeedback}</span>
                </div>
              )}
            </div>

            {/* Card 5: Tờ Giấy Bản Thảo Parchment */}
            <div id="parchment-sheet-box" className="w-full bg-[#fcfbf9] border border-[#d3cbb7] shadow-xl rounded-2xl p-5 md:p-8 flex flex-col relative overflow-hidden bg-[radial-gradient(#faf7ee_1px,transparent_1px)] [background-size:16px_16px] space-y-4">
              <div className="absolute top-0 bottom-0 left-5 w-px bg-red-800/10 hidden md:block"></div>
              <div className="absolute top-0 bottom-0 left-5.5 w-px bg-red-800/5 hidden md:block"></div>

              <div className="flex justify-between items-center border-b border-[#eadaa6] pb-3.5 font-serif text-xs text-[#6e685f]">
                <span className="flex items-center gap-1.5 font-bold">
                  <Feather className="w-4 h-4 text-amber-700" />
                  <span>{activeChapter?.title || 'Chương Chưa Đặt Tên'}</span>
                </span>
                <span className="font-mono text-[11px] px-2.5 py-0.5 bg-[#efebd9]/40 rounded-full font-bold">
                  {activeChapter?.content ? `${activeChapter.wordCount} chữ` : 'TRANG GIẤY TRỐNG'}
                </span>
              </div>

              <textarea 
                id="parchment-text-area"
                className="w-full text-base font-serif bg-transparent leading-loose text-[#2b271e] focus:outline-none resize-none min-h-[460px] max-h-[800px] z-10 pl-0 md:pl-7 text-justify custom-scrollbar font-normal"
                placeholder="Khởi tạo chương hoặc bắt tay sáng tác bối cảnh tại đây linh khí..."
                value={activeChapter?.content || ''}
                rows={18}
                onChange={(e) => handleUpdateChapterField('content', e.target.value)}
              />

              <div className="pt-3.5 border-t border-[#eadaa6] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#787162] z-10">
                <div className="flex items-center gap-1">
                  <span className="font-sans font-bold uppercase text-[9px] bg-amber-950/20 text-amber-950 px-2 py-0.5 rounded mr-1.5">
                    {settings.writingMode === 'orinlo_m3' && 'MỨC 3: TRỰC TIẾP'}
                    {settings.writingMode === 'orinlo_m2' && 'MỨC 2: ẨN DỤ SÂU'}
                    {settings.writingMode === 'orinlo_m1' && 'MỨC 1: FADE-TO-BLACK'}
                    {settings.writingMode === 'standard' && 'THƯỜNG: STANDARD'}
                  </span>
                  <span>giọng văn: <span className="font-serif italic font-bold text-amber-900">{settings.customTone}</span></span>
                </div>
                {isGenerating ? (
                  <span className="text-red-800 animate-pulse flex items-center gap-1 font-bold">
                    <Flame className="w-3.5 h-3.5 animate-bounce" /> Sáng tác dạt dào...
                  </span>
                ) : (
                  <span className="text-emerald-800 flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" /> Thể chương sẵn sàng
                  </span>
                )}
              </div>
            </div>

            {/* Explainer rules */}
            <div id="orinlo-rules-card" className="bg-[#fcfbf9] border border-[#dedad0] p-5 rounded-2xl shadow-[0_4px_24px_-4px_rgba(45,44,37,0.04)]">
              <h4 className="font-serif font-bold text-sm text-[#4a3a24] flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-red-800 shrink-0" />
                <span>Quy Tắc Bút Pháp Thăng Hoa Orinlo Core</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] leading-relaxed text-[#514d42] font-sans">
                <div className="space-y-1">
                  <p><span className="font-bold text-amber-900">• Đỉnh Cao Ngũ Giác:</span> Sáng tác lôi cuốn cần dốc tâm vẽ trọn vị giác nồng mật, thị giác bập bùng, thính giác náo nức.</p>
                </div>
                <div className="space-y-1">
                  <p><span className="font-bold text-amber-900">• Tránh Sáo Rỗng:</span> Nên khắc sâu hơi thở, nhịp thở, giọt mồ hôi li ti hay chấn động tâm can dồn dập thay cho các từ sáo hoa mỹ.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB 2: HỒ SƠ ----------------- */}
        {activeTab === 'profile' && (
          <div className="space-y-4 animate-fade-in pb-10">
            
            {/* Card 1: Hồ Sơ Cốt Truyện Header */}
            <div className="bg-[#fcfbf9] border border-[#dedad0] p-5 rounded-2xl shadow-[0_4px_24px_-4px_rgba(45,44,37,0.04)] space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 px-3 bg-gradient-to-r from-amber-700 to-[#161512] text-[#decb96] rounded-xl flex items-center gap-1.5 shadow-sm">
                    <Compass className="w-4 h-4 text-amber-300" />
                    <h2 className="font-serif font-bold text-xs text-[#decb96] tracking-wide uppercase">Hồ Sơ Cốt Truyện Bảo Bản</h2>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setIsHeaderVisible(!isHeaderVisible)}
                    className="px-2.5 py-1 text-[10.5px] font-sans font-bold bg-[#efebe1] text-[#5e5a52] rounded-lg border border-[#cfcabb] hover:text-[#2d2c25] hover:bg-white transition-all cursor-pointer select-none"
                  >
                    {isHeaderVisible ? 'Ẩn Header' : 'Hiện Header'}
                  </button>
                  <span className="text-[10px] font-sans font-extrabold bg-[#881337] text-white px-2 py-1 rounded-lg select-none">
                    Sư Đồ - Tu Chân
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f2edd9]/50">
                <button 
                  onClick={() => {
                    const data = JSON.stringify({ profile, chapters, settings }, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `novel_profile_${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    showNotification('Đã tải xuống file hồ sơ hoàn chỉnh!');
                  }}
                  className="text-center py-2.5 text-xs font-sans font-extrabold text-amber-950 border border-[#dedad0] hover:border-amber-800 hover:bg-amber-50/20 bg-white rounded-xl cursor-pointer transition-all active:scale-[0.98] shadow-6xs"
                >
                  Xuất Hồ sơ
                </button>
                <label className="text-center py-2.5 text-xs font-sans font-extrabold text-[#881337] border border-[#dedad0] hover:border-[#881337] hover:bg-rose-50/25 bg-white rounded-xl cursor-pointer block transition-all active:scale-[0.98] shadow-6xs">
                  Nhập Hồ sơ
                  <input 
                    type="file" 
                    accept=".json" 
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const data = JSON.parse(event.target?.result as string);
                          if (data.profile && data.chapters && data.settings) {
                            setProfile(data.profile);
                            setChapters(data.chapters);
                            setSettings(data.settings);
                            setSelectedChapterId(data.chapters[0]?.id || '');
                            showNotification('Thần thức đã khôi phục bản bối cảnh của bạn!');
                          } else {
                            showNotification('Định dạng hồ sơ .json không đúng mẫu!', true);
                          }
                        } catch {
                          showNotification('Thất bại khi đọc file hồ sơ!', true);
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Card 2: 3-column sub tabs */}
            <div className="grid grid-cols-3 border border-[#dedad0] bg-[#FAF9F5] rounded-xl overflow-hidden font-sans text-xs font-bold text-[#5e5a52] shadow-6xs">
              <button 
                onClick={() => setProfileStep(1)}
                className={`flex flex-col items-center gap-1.5 py-3.5 border-b-2.5 transition-all outline-none cursor-pointer ${
                  profileStep === 1 
                  ? 'border-[#881337] text-[#881337] bg-[#f5f3eb]' 
                  : 'border-transparent hover:text-black hover:bg-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>1. Tổng Quan</span>
              </button>
              <button 
                onClick={() => setProfileStep(2)}
                className={`flex flex-col items-center gap-1.5 py-3.5 border-b-2.5 transition-all outline-none cursor-pointer ${
                  profileStep === 2 
                  ? 'border-[#881337] text-[#881337] bg-[#f5f3eb]' 
                  : 'border-transparent hover:text-black hover:bg-white'
                }`}
              >
                <Coins className="w-4 h-4" />
                <span>2. Thiết Chế</span>
              </button>
              <button 
                onClick={() => setProfileStep(3)}
                className={`flex flex-col items-center gap-1.5 py-3.5 border-b-2.5 transition-all outline-none cursor-pointer ${
                  profileStep === 3 
                  ? 'border-[#881337] text-[#881337] bg-[#f5f3eb]' 
                  : 'border-transparent hover:text-black hover:bg-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>3. Nhân Vật</span>
              </button>
            </div>
            {profileStep === 1 && (
              <div id="setup-step1-pane" className="space-y-4 animate-fade-in bg-[#fcfbf9] border border-[#dedad0] p-5 rounded-2xl shadow-[0_4px_24px_-4px_rgba(45,44,37,0.04)]">
                <div className="bg-[#fffbeb] border border-[#fef3c7] p-3 rounded-xl text-xs text-[#ae3813] leading-relaxed">
                  <span className="font-bold">Bước 1: Tổng Quan Ý Tưởng</span> — Điền thông tin chính để định hình lối bút thuật tốt nhất cho AI.
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-[#8e8a7f] mb-1.5 uppercase tracking-wider">TÊN TRUYỆN TIỂU THUYẾT</label>
                  <input 
                    id="novel-title-input"
                    type="text"
                    className="w-full text-[13px] font-serif font-bold bg-[#fdfdfb] border border-[#dedad0] rounded-xl px-3.5 py-2.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 text-[#2d2c25] shadow-6xs placeholder-stone-400"
                    placeholder="Nhập tên tiểu thuyết..."
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-[#8e8a7f] mb-1.5 uppercase tracking-wider">Ý TƯỞNG CHỦ ĐẠO / CỐT LÕI</label>
                  <textarea 
                    id="novel-idea-textarea"
                    className="w-full h-24 text-[12.5px] font-sans bg-[#fdfdfb] border border-[#dedad0] rounded-xl p-3.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 leading-relaxed resize-none text-[#2d2c25] shadow-6xs placeholder-stone-400 custom-scrollbar"
                    placeholder="Tính đối lập mâu thuẫn chính..."
                    value={profile.idea}
                    onChange={(e) => setProfile({ ...profile, idea: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-[#8e8a7f] mb-1.5 uppercase tracking-wider">Ý TƯỞNG BỐI CẢNH THẾ GIỚI</label>
                  <textarea 
                    id="novel-world-textarea"
                    className="w-full h-24 text-[12.5px] font-sans bg-[#fdfdfb] border border-[#dedad0] rounded-xl p-3.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 leading-relaxed resize-none text-[#2d2c25] shadow-6xs placeholder-stone-400 custom-scrollbar"
                    placeholder="Tông môn thế gia..."
                    value={profile.worldBackground}
                    onChange={(e) => setProfile({ ...profile, worldBackground: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-bold text-[#8e8a7f] mb-1.5 uppercase tracking-wider">Ý TƯỞNG KHỞI ĐẦU (HOOK)</label>
                  <textarea 
                    id="novel-hook-textarea"
                    className="w-full h-20 text-[12.5px] font-sans bg-[#fdfdfb] border border-[#dedad0] rounded-xl p-3.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 leading-relaxed resize-none text-[#2d2c25] shadow-6xs placeholder-stone-400 custom-scrollbar"
                    placeholder="Sự cố hay biến cố ban đầu..."
                    value={profile.startingHook}
                    onChange={(e) => setProfile({ ...profile, startingHook: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* SUB-TAB 2: THIẾT CHẾ */}
            {profileStep === 2 && (
              <div id="setup-step2-pane" className="space-y-4 animate-fade-in bg-[#fcfbf9] border border-[#dedad0] p-5 rounded-2xl shadow-[0_4px_24px_-4px_rgba(45,44,37,0.04)]">
                <div className="bg-[#fffbeb] border border-[#fef3c7] p-3 rounded-xl text-xs text-[#ae3813] leading-relaxed">
                  <span className="font-bold">Bước 2: Hệ Thống Bối Cảnh Chi Tiết</span> — Đặt quy cách thế giới. Bấm <span className="font-bold">+</span> để lưu thông số.
                </div>

                {/* Tu luyện */}
                <div className="border border-[#dedad0] rounded-xl p-4 bg-[#fdfdfb] space-y-2.5">
                  <label className="block text-xs font-black text-[#2d2c25] uppercase tracking-wider font-sans">• HỆ THỐNG TU LUYỆN CỐT LÕI</label>
                  <div className="flex gap-2">
                    <input 
                      id="new-cultivation-input"
                      type="text" 
                      className="flex-grow text-xs font-sans bg-white border border-[#dedad0] rounded-xl px-3.5 py-2.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 text-[#2d2c25]"
                      placeholder="Thêm hệ pháp..."
                      value={newCultivation}
                      onChange={(e) => setNewCultivation(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCultivation()}
                    />
                    <button 
                      onClick={handleAddCultivation}
                      className="bg-amber-800 hover:bg-amber-955 text-amber-50 px-4 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {profile.cultivationSystem.map((item, i) => (
                      <span key={i} className="text-xs bg-[#f4ebd9]/85 text-[#513c06] px-3 py-1 rounded-xl border border-amber-200/50 flex items-center gap-1.5 font-medium shadow-6xs">
                        <span>{item}</span>
                        <Trash2 className="w-3.5 h-3.5 text-amber-955 hover:text-red-655 cursor-pointer transition-colors" onClick={() => handleRemoveProfileArrayItem('cultivationSystem', i)} />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cảnh giới */}
                <div className="border border-[#dedad0] rounded-xl p-4 bg-[#fdfdfb] space-y-2.5">
                  <label className="block text-xs font-black text-[#2d2c25] uppercase tracking-wider font-sans">• TÊN CÁC CẤP BẬC / CẢNH GIỚI</label>
                  <div className="flex gap-2">
                    <input 
                      id="new-rank-input"
                      type="text" 
                      className="flex-grow text-xs font-sans bg-white border border-[#dedad0] rounded-xl px-3.5 py-2.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-350 transition-all duration-200 text-[#2d2c25]"
                      placeholder="VD: Trúc Cơ, Kim Đan..."
                      value={newRank}
                      onChange={(e) => setNewRank(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddRank()}
                    />
                    <button 
                      onClick={handleAddRank}
                      className="bg-amber-800 hover:bg-amber-955 text-amber-50 px-4 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {profile.ranks.map((item, i) => (
                      <span key={i} className="text-xs bg-blue-50/70 text-blue-950 px-3 py-1 rounded-xl border border-blue-200/50 flex items-center gap-1.5 font-mono shadow-6xs">
                        <span>{item}</span>
                        <Trash2 className="w-3.5 h-3.5 text-blue-900 hover:text-red-500 cursor-pointer transition-colors" onClick={() => handleRemoveProfileArrayItem('ranks', i)} />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border border-[#dedad0] rounded-xl p-4 bg-[#fdfdfb] space-y-2.5">
                  <label className="block text-xs font-black text-[#2d2c25] uppercase tracking-wider font-sans">• ĐƠN VỊ TIỀN TỆ</label>
                  <div className="flex gap-2">
                    <input 
                      id="new-currency-input"
                      type="text" 
                      className="flex-grow text-xs font-sans bg-white border border-[#dedad0] rounded-xl px-3.5 py-2.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 text-[#2d2c25]"
                      placeholder="Linh thạch, Thần nguyên bảo..."
                      value={newCurrency}
                      onChange={(e) => setNewCurrency(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCurrency()}
                    />
                    <button 
                      onClick={handleAddCurrency}
                      className="bg-amber-805 hover:bg-amber-955 text-amber-50 px-4 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {profile.currencies.map((item, i) => (
                      <span key={i} className="text-xs bg-emerald-50/70 text-emerald-950 px-3 py-1 rounded-xl border border-emerald-200/50 flex items-center gap-1.5 shadow-6xs">
                        <span>{item}</span>
                        <Trash2 className="w-3.5 h-3.5 text-emerald-800 hover:text-red-555 cursor-pointer transition-colors" onClick={() => handleRemoveProfileArrayItem('currencies', i)} />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pháp tắc vạn cổ */}
                <div className="border border-[#dedad0] rounded-xl p-4 bg-[#fdfdfb] space-y-2.5">
                  <label className="block text-xs font-black text-[#2d2c25] uppercase tracking-wider font-sans">• QUY TẮC PHÁP TẮC VŨ TRỤ</label>
                  <div className="flex gap-2">
                    <input 
                      id="new-rule-input"
                      type="text" 
                      className="flex-grow text-xs font-sans bg-white border border-[#dedad0] rounded-xl px-3.5 py-2.5 outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 text-[#2d2c25]"
                      placeholder="Luật thiên địa..."
                      value={newRule}
                      onChange={(e) => setNewRule(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddRule()}
                    />
                    <button 
                      onClick={handleAddRule}
                      className="bg-amber-805 hover:bg-amber-955 text-amber-50 px-4 rounded-xl text-xs font-bold transition-all duration-150 active:scale-[0.98] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="space-y-2 pt-1">
                    {profile.rules.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 bg-stone-50 border border-[#dedad0]/60 p-3 rounded-xl text-xs shadow-6xs">
                        <span className="w-5 h-5 text-[10px] bg-stone-200 text-stone-700 font-bold rounded-full flex items-center justify-center shrink-0">{i+1}</span>
                        <span className="flex-grow leading-relaxed text-[#2d2c25] font-medium font-sans">{item}</span>
                        <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-650 cursor-pointer self-center transition-colors" onClick={() => handleRemoveProfileArrayItem('rules', i)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: NHÂN VẬT */}
            {profileStep === 3 && (
              <div id="setup-step3-pane" className="space-y-4 animate-fade-in bg-[#fcfbf9] border border-[#dedad0] p-5 rounded-2xl shadow-[0_4px_24px_-4px_rgba(45,44,37,0.04)]">
                <div className="bg-[#fffbeb] border border-[#fef3c7] p-3 rounded-xl text-xs text-[#ae3813] leading-relaxed">
                  <span className="font-bold">Bước 3: Tạo File Thiết Kế Nhân Vật</span> — Định nghĩa diện mạo, bí cảnh, bối cảnh nhân thể để AI lồng ghép phù hợp từng phân đoạn truyện.
                </div>

                <div className="flex items-center justify-between border-b pb-2 text-sm font-bold text-[#413c33] font-serif">
                  <span>Quản lý Nhân Vật ({profile.characters.length})</span>
                  <button 
                    onClick={() => {
                      setEditCharacterId(null);
                      setCharFormName('');
                      setCharFormBio('');
                      setCharFormPersonality('');
                      setCharFormSkills('');
                      setCharFormPower('');
                      showNotification('Đã xóa trắng thông tin form!');
                    }}
                    className="text-[10.5px] uppercase font-sans font-extrabold text-[#ae3813] flex items-center gap-1 cursor-pointer select-none hover:opacity-80-all"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>xóa trắng form</span>
                  </button>
                </div>

                {/* Form edit character */}
                <div className="bg-[#fdfdfb] border border-[#dedad0] p-5 rounded-xl space-y-3.5 shadow-6xs">
                  <div className="text-xs font-sans font-black text-amber-950 flex items-center gap-1.5 border-b border-[#f3ecd8] pb-2.5">
                    <PenTool className="w-4 h-4 text-red-800" />
                    <span>{editCharacterId ? 'ĐANG BIÊN TẬP NHÂN VẬT' : 'THÊM NHÂN VẬT MỚI'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase">Tên nhân vật *</label>
                      <input 
                        id="char-name-input"
                        type="text" 
                        className="w-full text-xs font-sans bg-white border border-[#dedad0] rounded-xl px-3.5 py-2.5 mt-1 text-[#2d2c25] outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 shadow-6xs"
                        placeholder="VD: Thẩm Thanh Ngôn"
                        value={charFormName}
                        onChange={(e) => setCharFormName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase">Giới tính</label>
                      <select 
                        className="w-full text-xs font-sans bg-white border border-[#dedad0] rounded-xl px-3.5 py-2.5 mt-1 cursor-pointer text-[#2d2c25] outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 shadow-6xs"
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
                    <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase">Tính cách &amp; Thần thái</label>
                    <input 
                      type="text" 
                      className="w-full text-xs font-sans bg-white border border-[#dedad0] rounded-xl px-3.5 py-2.5 mt-1 text-[#2d2c25] outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 shadow-6xs"
                      placeholder="Lạnh lùng võ đạo, thâm trầm, kiêu ngạo..."
                      value={charFormPersonality}
                      onChange={(e) => setCharFormPersonality(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase">Pháp khí / Tiên thuật sở trường</label>
                    <input 
                      type="text" 
                      className="w-full text-xs font-sans bg-white border border-[#dedad0] rounded-xl px-3.5 py-2.5 mt-1 text-[#2d2c25] outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 shadow-6xs"
                      placeholder="Cửu Trọng Thiên Nhãn, Phượng Dực Kiếm..."
                      value={charFormSkills}
                      onChange={(e) => setCharFormSkills(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase">Tu vi / Sức mạnh ban đầu</label>
                    <input 
                      type="text" 
                      className="w-full text-xs font-sans bg-white border border-[#dedad0] rounded-xl px-3.5 py-2.5 mt-1 text-[#2d2c25] outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 shadow-6xs"
                      placeholder="VD: Kiếm Tôn đại cực cảnh..."
                      value={charFormPower}
                      onChange={(e) => setCharFormPower(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold text-stone-500 uppercase">Tiểu Sử / Điển Tích</label>
                    <textarea 
                      className="w-full h-20 text-xs font-sans bg-white border border-[#dedad0] rounded-xl p-3.5 mt-1 text-[#2d2c25] outline-none focus:ring-4 focus:ring-amber-800/10 focus:border-amber-800 hover:border-stone-300 transition-all duration-200 resize-none custom-scrollbar leading-relaxed shadow-6xs placeholder-stone-400"
                      placeholder="Huyết hải chi thù, thầm chứa tiên đan..."
                      value={charFormBio}
                      onChange={(e) => setCharFormBio(e.target.value)}
                    />
                  </div>

                  <button 
                    onClick={handleSaveCharacter}
                    className="w-full bg-[#881337] hover:bg-black text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase cursor-pointer flex items-center justify-center gap-1.5 shadow transition-all duration-150 active:scale-[0.99]"
                  >
                    <Save className="w-4 h-4 text-[#decb96]" />
                    <span>{editCharacterId ? 'Lưu Thiết Kế Nhân Vật' : 'Xác Tạo Nhân Vật'}</span>
                  </button>
                </div>

                {/* List output character */}
                <div className="space-y-3 pt-2">
                  {profile.characters.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl bg-white border border-[#dedad0] shadow-sm space-y-3 hover:border-amber-700/60 transition-colors">
                      <div className="flex justify-between items-center bg-stone-50/50 p-1.5 rounded-xl">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-black text-[13.5px] text-[#2b271e]">{c.name}</span>
                          <span className={`text-[9.5px] font-sans font-extrabold px-2 py-0.5 rounded-lg border uppercase tracking-wider ${
                            c.gender === 'Nam' 
                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                            : 'bg-rose-55/15 border-rose-200 text-rose-700'
                          }`}>
                            {c.gender}
                          </span>
                        </div>
                        <div className="flex gap-2.5 text-xs font-bold font-sans">
                          <button onClick={() => handleStartEditCharacter(c)} className="text-amber-800 hover:underline cursor-pointer">Sửa</button>
                          <button onClick={() => handleDeleteCharacter(c.id)} className="text-red-700 hover:text-red-500 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2.5 bg-[#fcfbf9] border rounded-xl text-[11px] text-[#5e5a52]">
                        <div><span className="font-bold text-[#881337]">• Tính cách:</span> {c.personality || 'Chưa lập'}</div>
                        <div><span className="font-bold text-[#881337]">• Tiên pháp:</span> {c.skills || '---'}</div>
                        <div className="col-span-2 border-t border-stone-200/50 pt-1.5"><span className="font-bold text-amber-950">• Tu vi xuất thế:</span> <span className="font-mono text-amber-900 font-extrabold">{c.startingPower || '---'}</span></div>
                      </div>

                      <p className="text-[11px] leading-relaxed text-[#5e5a52] italic pl-2.5 border-l-2 border-amber-800/35 font-sans">
                        "{c.biography}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FIXED PINNED TAB FOOTER NAV & SIMULATED MOBILE SAFARI SHELL */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#161512] border-t border-[#2e2a22] flex flex-col pointer-events-auto shadow-2xl">
        <div className="max-w-2xl mx-auto w-full grid grid-cols-2 text-center text-xs font-sans font-bold">
          <button 
            id="tab-button-write"
            onClick={() => setActiveTab('write')}
            className={`py-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors outline-none select-none ${
              activeTab === 'write' 
              ? 'text-amber-300' 
              : 'text-[#dbd8cf]/55 hover:text-white'
            }`}
          >
            <Feather className="w-4 h-4 shrink-0" />
            <span className="text-[10.5px] uppercase tracking-wider font-extrabold">Viết Truyện</span>
          </button>
          <button 
            id="tab-button-profile"
            onClick={() => setActiveTab('profile')}
            className={`py-2 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors outline-none select-none ${
              activeTab === 'profile' 
              ? 'text-amber-300' 
              : 'text-[#dbd8cf]/55 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="text-[10.5px] uppercase tracking-wider font-extrabold">Hồ Sơ</span>
          </button>
        </div>

        {/* Realistic Vercel / Safari Browser mockup address bar footer */}
        <div className="w-full bg-[#11100e] py-1 flex items-center justify-center border-t border-[#2d2c25]">
          <div className="flex items-center gap-1.5 bg-[#1a1915] border border-[#2d2c25] px-3 py-0.5 rounded-full text-[9.5px] font-mono text-amber-50/50 w-11/12 max-w-sm justify-center shadow-inner select-none pointer-events-none">
            <span>🔒</span>
            <span>novel-ai-18.vercel.app</span>
          </div>
        </div>
      </nav>
      
    </div>
  );
}
