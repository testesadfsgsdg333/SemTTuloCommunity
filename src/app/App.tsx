import { useState } from "react";
import {
  Heart, ShoppingCart, X, Star, BookOpen, Camera,
  Users, ChevronRight, Plus, Minus, Trash2, Award, Aperture,
} from "lucide-react";

interface CameraItem {
  id: number;
  name: string;
  brand: string;
  type: "DSLR" | "Mirrorless" | "Compacta" | "Action";
  price: number;
  image: string;
  shortDesc: string;
  description: string;
  specs: { label: string; value: string }[];
  tips: string[];
  rating: number;
  reviews: number;
  tall?: boolean;
}

interface Professional {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rate: string;
  rating: number;
  cameraType: string[];
  bio: string;
}

interface CartItem extends CameraItem {
  quantity: number;
}

interface StudySection {
  title: string;
  content: string;
}

interface StudyContent {
  type: string;
  title: string;
  icon: string;
  intro: string;
  sections: StudySection[];
  tips: string[];
}

const cameras: CameraItem[] = [
  {
    id: 1,
    name: "Canon EOS 5D Mark IV",
    brand: "Canon",
    type: "DSLR",
    price: 12999,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=750&fit=crop&auto=format",
    shortDesc: "DSLR Full Frame icônico para profissionais",
    description:
      "A Canon EOS 5D Mark IV é uma câmera DSLR Full Frame de alta performance com 30,4 megapixels e sistema AF avançado de 61 pontos. É a escolha favorita de fotógrafos de casamento, retratos e paisagens por sua qualidade excepcional mesmo em baixa luminosidade e pela confiabilidade em campo.",
    specs: [
      { label: "Sensor", value: "Full Frame CMOS 30,4 MP" },
      { label: "ISO", value: "100 – 32.000 (exp. 102.400)" },
      { label: "Autofoco", value: "61 pontos AF" },
      { label: "Vídeo", value: "4K a 30fps" },
      { label: "FPS", value: "7 quadros/s" },
      { label: "Peso", value: "890g" },
    ],
    tips: [
      "Use o modo Av (prioridade de abertura) para controlar o bokeh em retratos.",
      "No modo manual, equilibre ISO, abertura e velocidade em harmonia.",
      "Ative o Dual Pixel CMOS AF para foco preciso em vídeos.",
      "Calibre as lentes em Câmera > Configurações > Ajuste fino do AF.",
    ],
    rating: 4.8,
    reviews: 342,
    tall: true,
  },
  {
    id: 2,
    name: "Sony Alpha A7 III",
    brand: "Sony",
    type: "Mirrorless",
    price: 9499,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=500&fit=crop&auto=format",
    shortDesc: "Mirrorless Full Frame com Eye AF excepcional",
    description:
      "A Sony Alpha A7 III é considerada a melhor câmera custo-benefício do mercado mirrorless. Com sensor BSI-CMOS de 24 MP, 693 pontos de fase e rastreamento ocular por IA, é perfeita para retratos, eventos e fotojornalismo. Bateria de até 710 fotos por carga.",
    specs: [
      { label: "Sensor", value: "Full Frame BSI-CMOS 24,2 MP" },
      { label: "ISO", value: "100 – 51.200 (exp. 204.800)" },
      { label: "Autofoco", value: "693 pontos + Eye AF" },
      { label: "Vídeo", value: "4K a 30fps" },
      { label: "FPS", value: "10 quadros/s" },
      { label: "Bateria", value: "Até 710 fotos" },
    ],
    tips: [
      "Ative o Eye AF em Câmera 1 > AF > Eye-Start AF para retratos perfeitos.",
      "Use o S-Log3 para vídeos com maior latitude de cor na edição.",
      "Aproveite a estabilização IBIS de 5 eixos em ambientes escuros.",
      "Configure o joystick traseiro para controle rápido do ponto de foco.",
    ],
    rating: 4.9,
    reviews: 589,
  },
  {
    id: 3,
    name: "Nikon Z6 II",
    brand: "Nikon",
    type: "Mirrorless",
    price: 11299,
    image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=600&h=620&fit=crop&auto=format",
    shortDesc: "Mirrorless versátil com duplo processador EXPEED 6",
    description:
      "A Nikon Z6 II tem processador duplo EXPEED 6 que entrega velocidade impressionante. Com 24,5 MP e AF híbrido com 273 pontos, é excelente para esportes, natureza e eventos. Suporta dois cartões (CFexpress + SD) para segurança máxima em trabalhos profissionais.",
    specs: [
      { label: "Sensor", value: "Full Frame BSI-CMOS 24,5 MP" },
      { label: "ISO", value: "100 – 51.200 (exp. 204.800)" },
      { label: "Autofoco", value: "273 pontos híbrido" },
      { label: "Vídeo", value: "4K a 60fps" },
      { label: "FPS", value: "14 quadros/s" },
      { label: "Slots", value: "CFexpress + SD" },
    ],
    tips: [
      "Use o buffer estendido para sequências longas em esportes.",
      "Configure perfis Picture Control para tonalidades específicas sem edição.",
      "O AF de detecção animal funciona muito bem para fotografia de natureza.",
      "Saída RAW 12-bit via HDMI para produção de vídeo profissional.",
    ],
    rating: 4.7,
    reviews: 218,
    tall: true,
  },
  {
    id: 4,
    name: "Fujifilm X-T4",
    brand: "Fujifilm",
    type: "Mirrorless",
    price: 8799,
    image: "https://images.unsplash.com/photo-1679890179455-d278cd338713?w=600&h=550&fit=crop&auto=format",
    shortDesc: "Mirrorless APS-C com simulações de filme icônicas",
    description:
      "A Fujifilm X-T4 é a preferida de quem valoriza estética e controles físicos intuitivos. Com sensor APS-C X-Trans CMOS 4 de 26 MP e 18 simulações de filme (Velvia, Provia, Classic Chrome), entrega JPEGs prontos para publicar sem edição. Ideal para street photography, moda e viagens.",
    specs: [
      { label: "Sensor", value: "APS-C X-Trans CMOS 4, 26,1 MP" },
      { label: "ISO", value: "160 – 12.800 (exp. 51.200)" },
      { label: "Autofoco", value: "425 pontos de fase" },
      { label: "Vídeo", value: "4K a 60fps" },
      { label: "FPS", value: "15 quadros/s (eletrônico)" },
      { label: "Simulações", value: "18 simulações de filme" },
    ],
    tips: [
      "Explore as simulações: Eterna para cinema, Velvia para paisagens saturadas.",
      "Use os dials físicos de ISO, velocidade e compensação de exposição.",
      "Configure Recipes para looks únicos sem pós-processamento.",
      "O modo DR400% expande o range em cenas de alto contraste.",
    ],
    rating: 4.8,
    reviews: 431,
  },
  {
    id: 5,
    name: "Canon EOS R6 Mark II",
    brand: "Canon",
    type: "Mirrorless",
    price: 13499,
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=600&h=700&fit=crop&auto=format",
    shortDesc: "Mirrorless Full Frame para ação e vídeo 4K 60fps",
    description:
      "A Canon EOS R6 Mark II tem o sistema AF mais rápido já criado pela Canon. Com rastreamento por IA (humanos, animais, veículos), até 40 fps no modo eletrônico e vídeo 4K 60fps sem crop, é a câmera ideal para esportes, vida selvagem e criadores de conteúdo profissional.",
    specs: [
      { label: "Sensor", value: "Full Frame CMOS 24,2 MP" },
      { label: "ISO", value: "100 – 102.400" },
      { label: "Autofoco", value: "1053 pontos, AF por IA" },
      { label: "Vídeo", value: "4K 60fps sem crop" },
      { label: "FPS", value: "40 quadros/s (eletrônico)" },
      { label: "Estabilização", value: "IBIS 8 stops" },
    ],
    tips: [
      "Ative o Subject Detection por IA para rastrear atletas ou animais automaticamente.",
      "Use C-Log 3 no vídeo para máxima latitude de cor na edição.",
      "O Pre-Shooting captura até 15 frames ANTES do clique.",
      "Conecte via Bluetooth ao app Camera Connect para transferência automática.",
    ],
    rating: 4.9,
    reviews: 276,
    tall: true,
  },
  {
    id: 6,
    name: "OM System OM-5",
    brand: "OM System",
    type: "Mirrorless",
    price: 6999,
    image: "https://images.unsplash.com/photo-1679927137838-cb09ffc1f8b6?w=600&h=500&fit=crop&auto=format",
    shortDesc: "Compacta Micro 4/3 resistente a intempéries",
    description:
      "A OM System OM-5 é uma mirrorless Micro 4/3 resistente a intempéries (IP53), compacta e leve, perfeita para aventureiros e fotógrafos de natureza. Com estabilização de 7,5 stops e o modo Live ND exclusivo (filtro ND simulado em câmera), oferece recursos únicos que câmeras maiores não têm.",
    specs: [
      { label: "Sensor", value: "Micro 4/3 Live MOS 20,4 MP" },
      { label: "ISO", value: "200 – 25.600" },
      { label: "Resistência", value: "IP53 (chuva e poeira)" },
      { label: "Vídeo", value: "4K a 30fps" },
      { label: "Estabilização", value: "7,5 stops IBIS" },
      { label: "Peso", value: "414g" },
    ],
    tips: [
      "Use o Live ND para longa exposição sem filtros físicos em pleno dia.",
      "O Pro Capture capta frames retroativamente — perfeito para pássaros em voo.",
      "Ative o High Res Shot (50 MP) para paisagens com detalhes extraordinários.",
      "Leve para a chuva sem medo: a proteção IP53 foi feita para isso.",
    ],
    rating: 4.6,
    reviews: 189,
  },
  {
    id: 7,
    name: "GoPro Hero 12 Black",
    brand: "GoPro",
    type: "Action",
    price: 2899,
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600&h=750&fit=crop&auto=format",
    shortDesc: "Action cam 5.3K para aventuras extremas",
    description:
      "A GoPro Hero 12 Black é a action cam mais avançada da GoPro, com vídeo 5.3K, estabilização HyperSmooth 6.0 e resistência à água até 10m sem case. Bateria 38% maior que a geração anterior e conectividade Wi-Fi para compartilhamento instantâneo direto do campo.",
    specs: [
      { label: "Vídeo", value: "5.3K a 60fps" },
      { label: "Foto", value: "27 MP" },
      { label: "Estabilização", value: "HyperSmooth 6.0" },
      { label: "Resistência", value: "Até 10m sem case" },
      { label: "Bateria", value: "Enduro, até 2h30min" },
      { label: "Áudio", value: "3 microfones + entrada P2" },
    ],
    tips: [
      "Use HyperSmooth Max para estabilização extrema em mountain bike ou corrida.",
      "Ative o TimeWarp para timelapses estabilizados cinematográficos em movimento.",
      "Conecte o app GoPro Quik para edição com IA no celular.",
      "No frio, carregue baterias extras — o desempenho cai muito abaixo de 10°C.",
    ],
    rating: 4.7,
    reviews: 892,
    tall: false,
  },
  {
    id: 8,
    name: "Leica Q3",
    brand: "Leica",
    type: "Compacta",
    price: 35999,
    image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=600&h=650&fit=crop&auto=format",
    shortDesc: "Compacta Full Frame de luxo com lente Summilux",
    description:
      "A Leica Q3 é a expressão máxima da fotografia compacta premium. Com sensor Full Frame de 60 MP, lente Summilux 28mm f/1.7 fixa de qualidade ótica incomparável e corpo em alumínio usinado, é tanto ferramenta de trabalho quanto objeto de arte. Preferida de fotógrafos de street, viagem e documentários.",
    specs: [
      { label: "Sensor", value: "Full Frame BSI-CMOS 60 MP" },
      { label: "Lente", value: "Summilux 28mm f/1.7 ASPH" },
      { label: "Autofoco", value: "Contrast + Phase Detect" },
      { label: "Vídeo", value: "8K Timelapse, 4K 60fps" },
      { label: "Display", value: "OLED touchscreen articulado" },
      { label: "Corpo", value: "Alumínio usinado + couro" },
    ],
    tips: [
      "A lente fixa 28mm força você a se mover — aproxime-se do sujeito.",
      "Use o crop digital (35mm ou 50mm equivalente) com os 60 MP do sensor.",
      "O viewfinder com 5,76M pontos é um dos melhores para composição precisa.",
      "Conecte ao Leica FOTOS app para geotagging e transferência de RAW sem fio.",
    ],
    rating: 4.9,
    reviews: 124,
  },
];

const professionals: Professional[] = [
  {
    id: 1,
    name: "Marina Costa",
    specialty: "Casamentos & Celebrações",
    image: "https://images.unsplash.com/photo-1542992933-ce75d0187ec1?w=400&h=500&fit=crop&auto=format",
    rate: "R$ 1.800/dia",
    rating: 4.9,
    cameraType: ["Mirrorless", "DSLR"],
    bio: "8 anos de experiência, especialista em fotojornalismo de casamentos e celebrações inesquecíveis.",
  },
  {
    id: 2,
    name: "Carlos Mendez",
    specialty: "Natureza & Vida Selvagem",
    image: "https://images.unsplash.com/photo-1621024994278-e409544f4085?w=400&h=500&fit=crop&auto=format",
    rate: "R$ 2.200/dia",
    rating: 4.8,
    cameraType: ["DSLR", "Mirrorless", "Action"],
    bio: "Fotógrafo de natureza com publicações na National Geographic Brasil e Smithsonian.",
  },
  {
    id: 3,
    name: "Sofia Lima",
    specialty: "Moda & Editorial",
    image: "https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?w=400&h=500&fit=crop&auto=format",
    rate: "R$ 2.500/dia",
    rating: 5.0,
    cameraType: ["Mirrorless", "Compacta"],
    bio: "Referência em fotografia de moda no Brasil, trabalha com grandes marcas e revistas nacionais.",
  },
  {
    id: 4,
    name: "Rafael Santos",
    specialty: "Eventos & Corporativo",
    image: "https://images.unsplash.com/photo-1612242879330-cd06b2696e56?w=400&h=500&fit=crop&auto=format",
    rate: "R$ 1.500/dia",
    rating: 4.7,
    cameraType: ["Mirrorless", "DSLR"],
    bio: "Especialista em eventos corporativos, shows e cobertura jornalística de alto nível.",
  },
];

const studyContent: StudyContent[] = [
  {
    type: "DSLR",
    title: "DSLR — O Clássico Eterno",
    icon: "📷",
    intro:
      "As câmeras DSLR (Digital Single Lens Reflex) usam um espelho para direcionar a luz até o visor óptico. São robustas, com excelente autonomia de bateria e o ecossistema de lentes mais amplo do mercado.",
    sections: [
      {
        title: "Como funciona o espelho",
        content:
          "Ao olhar pelo visor, você vê através da própria lente graças ao espelho e prisma internos. No momento do clique, o espelho sobe, expondo o sensor à luz — por isso existe um blackout no visor durante a captura.",
      },
      {
        title: "Modos de exposição",
        content:
          "M (Manual), Av/A (Prioridade de Abertura), Tv/S (Prioridade de Velocidade), P (Programa). Comece pelo modo Av para aprender a controlar o desfoque de fundo antes de avançar para o manual.",
      },
      {
        title: "O triângulo da exposição",
        content:
          "ISO (sensibilidade à luz), Abertura (f/número — quanto menor, mais luz e mais bokeh) e Velocidade do obturador se interrelacionam. Diminuir o ISO reduz ruído; f/1.8 cria fundo desfocado; 1/1000s congela movimento.",
      },
    ],
    tips: [
      "Comece em Av com f/2.8 para retratos com fundo desfocado",
      "ISO 400–800 para ambientes internos com boa iluminação",
      "1/500s ou mais rápido para congelar movimentos em esportes",
      "Calibre o AF das lentes para evitar foco impreciso (front/back focus)",
    ],
  },
  {
    type: "Mirrorless",
    title: "Mirrorless — O Futuro Chegou",
    icon: "⚡",
    intro:
      "Sem espelho, sem prisma. As câmeras mirrorless são mais leves, compactas e permitem avanços no autofoco que DSLRs jamais conseguiriam — como rastreamento ocular por IA em tempo real a 40 fps.",
    sections: [
      {
        title: "Visor eletrônico (EVF)",
        content:
          "Em vez do visor óptico, você vê a imagem processada em tempo real. Isso significa visualizar exatamente como a foto vai ficar ANTES de fotografar — exposição, balanço de branco, profundidade de campo e tudo mais.",
      },
      {
        title: "Autofoco por inteligência artificial",
        content:
          "O Eye AF (rastreamento ocular) usa IA para manter o foco no olho mais próximo de forma automática. Câmeras modernas rastreiam humanos, animais e veículos com precisão impressionante, mesmo em movimento rápido.",
      },
      {
        title: "IBIS — Estabilização no sensor",
        content:
          "A estabilização In-Body Image Stabilization compensa movimentos da câmera independente da lente. Permite fotografar a mão em situações de baixa luz que antes exigiam tripé, chegando a 8 stops de compensação.",
      },
    ],
    tips: [
      "Confie no Eye AF — ele é mais preciso que o foco manual na maioria dos casos",
      "Use S-Log/C-Log para vídeos com mais margem de cor na edição",
      "IBIS + OIS da lente combinados somam até 8 stops de compensação",
      "O obturador eletrônico silencioso é perfeito para cerimônias e shows",
    ],
  },
  {
    type: "Compacta",
    title: "Compacta — Leveza sem Compromisso",
    icon: "💎",
    intro:
      "Câmeras compactas avançadas como a Leica Q3 provam que tamanho não é documento. Com lentes integradas de altíssima qualidade e sensores grandes, oferecem uma experiência de fotografia purista e discreta.",
    sections: [
      {
        title: "A filosofia da lente fixa",
        content:
          "Uma lente fixa te força a se mover pelo cenário em vez de usar o zoom. Isso cria engajamento, proximidade com o sujeito e uma compreensão mais profunda da composição fotográfica — e é por isso que tantos fotógrafos lendários a preferem.",
      },
      {
        title: "Crop digital com alta resolução",
        content:
          "Com sensores de 40–60 MP, o crop digital simula lentes mais longas sem perda significativa de qualidade. Na prática você tem múltiplas focais em uma só câmera, mantendo discrição e leveza.",
      },
      {
        title: "Street Photography",
        content:
          "Câmeras compactas são discretas e não intimidadoras. Uma Leica ou Ricoh passam despercebidas na rua, permitindo capturar momentos genuínos que uma câmera grande assustaria ou alertaria as pessoas.",
      },
    ],
    tips: [
      "Pré-configure o foco hiperfocal para reação rápida na rua",
      "f/8 a f/11 em luz do dia garante foco do primeiro plano ao infinito",
      "Use o foco por toque no LCD para composições criativas com câmera baixa",
      "Carregue sempre uma bateria extra — compactas têm autonomia menor",
    ],
  },
  {
    type: "Action",
    title: "Action Cam — Para os Aventureiros",
    icon: "🎬",
    intro:
      "As action cams redefinaram o que é possível em fotografia e vídeo de aventura. Resistentes, compactas e com estabilização eletrônica avançada, vão onde câmeras tradicionais não conseguem ir.",
    sections: [
      {
        title: "Estabilização HyperSmooth",
        content:
          "A estabilização eletrônica da GoPro modern elimina praticamente toda trepidação, mesmo em terreno acidentado. O resultado parece gravado com um steadicam profissional — em uma câmera que cabe no bolso.",
      },
      {
        title: "Modos de captura especiais",
        content:
          "Além do vídeo padrão: TimeWarp (hyperlapse estabilizado em movimento), modo noturno, fotografia em rajada de 30fps e intervalômetro embutido. São recursos profissionais em um corpo de bolso resistente à água.",
      },
      {
        title: "Montagem e acessórios",
        content:
          "O ecossistema de acessórios é vasto: suportes para capacete, peito, guidão, vara de selfie submarina. Planeje as montagens antes da aventura — os melhores ângulos são sempre os mais difíceis de improvisar.",
      },
    ],
    tips: [
      "Grave em 4K e exporte em 1080p para manter margem de edição e estabilização",
      "No surf ou na água, use vedação extra nos botões para segurança",
      "Carregue 3+ baterias — drena rapidamente em baixas temperaturas",
      "Use microfone externo para melhorar drasticamente a qualidade do áudio",
    ],
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"shop" | "services" | "learn">("shop");
  const [selectedCamera, setSelectedCamera] = useState<CameraItem | null>(null);
  const [cameraTab, setCameraTab] = useState<"description" | "professional">("description");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [studyType, setStudyType] = useState("DSLR");

  const addToCart = (camera: CameraItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === camera.id);
      if (existing) {
        return prev.map((i) => (i.id === camera.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...camera, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openCamera = (camera: CameraItem) => {
    setSelectedCamera(camera);
    setCameraTab("description");
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const currentStudy = studyContent.find((s) => s.type === studyType) || studyContent[0];
  const relatedPros = professionals.filter(
    (p) => selectedCamera && p.cameraType.includes(selectedCamera.type)
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Aperture className="w-6 h-6 text-pink-400" />
            <span className="font-display text-2xl font-black text-pink-400 tracking-tight leading-none">
              Kethlyn Foto
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {(["shop", "services", "learn"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-pink-500/15 text-pink-400"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab === "shop" ? "Loja" : tab === "services" ? "Serviços" : "Aprenda"}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 bg-yellow-100/8 hover:bg-yellow-100/15 border border-yellow-200/20 text-yellow-100 px-4 py-2 rounded-xl transition-all shrink-0"
          >
            <ShoppingCart className="w-4 h-4 text-yellow-200" />
            <span className="text-yellow-100 font-mono text-sm font-bold hidden sm:inline">
              Carrinho
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* mobile nav */}
        <div className="md:hidden flex border-t border-white/5">
          {(["shop", "services", "learn"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab
                  ? "text-pink-400 border-b-2 border-pink-500"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab === "shop" ? "Loja" : tab === "services" ? "Serviços" : "Aprenda"}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-16">

        {/* ─────────────── LOJA ─────────────── */}
        {activeTab === "shop" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-black text-pink-400 mb-1 font-display">
                Câmeras & Equipamentos
              </h1>
              <p className="text-white/40 text-sm">
                Clique em uma câmera para detalhes, descrição e contratar profissionais
              </p>
            </div>

            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
              {cameras.map((camera, idx) => (
                <div
                  key={camera.id}
                  className="break-inside-avoid mb-3 bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => openCamera(camera)}
                >
                  <div
                    className="relative overflow-hidden bg-zinc-800"
                    style={{ paddingBottom: idx % 4 === 0 ? "130%" : idx % 4 === 1 ? "100%" : idx % 4 === 2 ? "118%" : "108%" }}
                  >
                    <img
                      src={camera.image}
                      alt={camera.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <button
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
                        favorites.has(camera.id)
                          ? "bg-pink-500 shadow-lg shadow-pink-500/40"
                          : "bg-black/50 hover:bg-pink-500/80 backdrop-blur-sm"
                      }`}
                      onClick={(e) => toggleFavorite(camera.id, e)}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 text-white ${favorites.has(camera.id) ? "fill-white" : ""}`}
                      />
                    </button>

                    <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-xs text-white/70 px-2 py-0.5 rounded-full font-mono">
                      {camera.type}
                    </div>
                  </div>

                  <div className="p-3">
                    <p className="text-[10px] text-pink-400/60 font-mono mb-0.5 uppercase tracking-wider">
                      {camera.brand}
                    </p>
                    <h3 className="text-sm font-bold text-white leading-tight mb-1">
                      {camera.name}
                    </h3>
                    <p className="text-xs text-white/35 mb-2 line-clamp-2 leading-relaxed">
                      {camera.shortDesc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-pink-400 font-black font-mono text-sm">
                        R$ {camera.price.toLocaleString("pt-BR")}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                        <span className="text-xs text-white/40 font-mono">{camera.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {favorites.size > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-black text-pink-400 mb-4 font-display flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />
                  Favoritos ({favorites.size})
                </h2>
                <div className="flex gap-3 flex-wrap">
                  {cameras
                    .filter((c) => favorites.has(c.id))
                    .map((c) => (
                      <button
                        key={c.id}
                        onClick={() => openCamera(c)}
                        className="flex items-center gap-3 bg-zinc-900 border border-pink-500/20 rounded-2xl p-3 hover:border-pink-500/50 transition-all"
                      >
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-12 h-12 object-cover rounded-xl bg-zinc-800"
                        />
                        <div className="text-left">
                          <p className="text-sm font-bold text-white leading-tight">{c.name}</p>
                          <p className="text-xs text-pink-400 font-mono">
                            R$ {c.price.toLocaleString("pt-BR")}
                          </p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─────────────── SERVIÇOS ─────────────── */}
        {activeTab === "services" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-black text-pink-400 mb-1 font-display">
                Fotógrafos Profissionais
              </h1>
              <p className="text-white/40 text-sm">
                Contrate um profissional para o seu projeto — do casamento à natureza
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {professionals.map((pro) => (
                <div
                  key={pro.id}
                  className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/30 transition-all group"
                >
                  <div className="relative h-52 bg-zinc-800 overflow-hidden">
                    <img
                      src={pro.image}
                      alt={pro.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="font-black text-white text-base leading-tight">{pro.name}</p>
                      <p className="text-xs text-pink-300 font-medium">{pro.specialty}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs text-white/45 mb-3 leading-relaxed">{pro.bio}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {pro.cameraType.map((type) => (
                        <span
                          key={type}
                          className="text-xs bg-white/4 border border-white/8 px-2 py-0.5 rounded-full text-white/50 font-mono"
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-pink-400 font-black font-mono text-sm">{pro.rate}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                        <span className="text-sm text-white/60 font-mono">{pro.rating}</span>
                      </div>
                    </div>

                    <button className="w-full bg-pink-500 hover:bg-pink-400 text-white text-sm font-black py-2.5 rounded-xl transition-colors">
                      Contratar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─────────────── APRENDA ─────────────── */}
        {activeTab === "learn" && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-black text-pink-400 mb-1 font-display">
                Central de Aprendizado
              </h1>
              <p className="text-white/40 text-sm">
                Domine cada tipo de câmera com guias práticos e dicas de especialistas
              </p>
            </div>

            <div className="flex gap-2 mb-8 flex-wrap">
              {studyContent.map((s) => (
                <button
                  key={s.type}
                  onClick={() => setStudyType(s.type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    studyType === s.type
                      ? "bg-pink-500 text-white shadow-lg shadow-pink-500/25"
                      : "bg-zinc-900 border border-white/8 text-white/50 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.type}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-zinc-900 rounded-2xl border border-white/5 p-6">
                  <h2 className="text-2xl font-black text-white mb-3 font-display">
                    {currentStudy.title}
                  </h2>
                  <p className="text-white/55 leading-relaxed text-sm">{currentStudy.intro}</p>
                </div>

                {currentStudy.sections.map((section, i) => (
                  <div key={i} className="bg-zinc-900 rounded-2xl border border-white/5 p-6">
                    <div className="flex items-start gap-4 mb-3">
                      <span className="w-7 h-7 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-black flex items-center justify-center font-mono shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <h3 className="font-black text-white text-base">{section.title}</h3>
                    </div>
                    <p className="text-white/55 leading-relaxed text-sm pl-11">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-900 rounded-2xl border border-yellow-200/10 p-5 sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-yellow-200" />
                    <h3 className="font-black text-yellow-200 text-sm">Dicas Rápidas</h3>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {currentStudy.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2.5 text-sm">
                        <ChevronRight className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                        <span className="text-white/60 leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest font-mono mb-3">
                      Câmeras deste tipo
                    </h4>
                    <div className="space-y-1">
                      {cameras
                        .filter((c) => c.type === studyType)
                        .map((cam) => (
                          <button
                            key={cam.id}
                            onClick={() => {
                              setActiveTab("shop");
                              openCamera(cam);
                            }}
                            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors text-left"
                          >
                            <img
                              src={cam.image}
                              alt={cam.name}
                              className="w-10 h-10 object-cover rounded-lg bg-zinc-800 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white leading-tight truncate">
                                {cam.name}
                              </p>
                              <p className="text-xs text-pink-400 font-mono">
                                R$ {cam.price.toLocaleString("pt-BR")}
                              </p>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─────────────── MODAL DA CÂMERA ─────────────── */}
      {selectedCamera && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setSelectedCamera(null)}
          />
          <div className="relative bg-zinc-900 rounded-t-3xl sm:rounded-3xl border border-white/8 w-full sm:max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
              <div>
                <p className="text-xs text-pink-400/60 font-mono uppercase tracking-wider">
                  {selectedCamera.brand} · {selectedCamera.type}
                </p>
                <h2 className="font-black text-white text-lg leading-tight">
                  {selectedCamera.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCamera(null)}
                className="w-8 h-8 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* hero image */}
            <div className="relative h-52 bg-zinc-800 shrink-0 overflow-hidden">
              <img
                src={selectedCamera.image}
                alt={selectedCamera.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                <span className="text-3xl font-black text-pink-400 font-mono leading-none">
                  R$ {selectedCamera.price.toLocaleString("pt-BR")}
                </span>
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  <span className="text-white font-mono text-sm font-bold">
                    {selectedCamera.rating}
                  </span>
                  <span className="text-white/40 text-xs font-mono">
                    ({selectedCamera.reviews})
                  </span>
                </div>
              </div>
            </div>

            {/* tabs */}
            <div className="flex border-b border-white/5 shrink-0 px-2">
              {[
                { id: "description", label: "Sobre a Câmera", icon: <BookOpen className="w-3.5 h-3.5" /> },
                { id: "professional", label: "Contratar Profissional", icon: <Users className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCameraTab(tab.id as "description" | "professional")}
                  className={`flex items-center gap-1.5 px-4 py-3.5 text-sm font-bold border-b-2 transition-all ${
                    cameraTab === tab.id
                      ? "border-pink-500 text-pink-400"
                      : "border-transparent text-white/35 hover:text-white/60"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* tab content */}
            <div className="overflow-y-auto flex-1 p-5">
              {cameraTab === "description" && (
                <div className="space-y-5">
                  <p className="text-white/60 leading-relaxed text-sm">
                    {selectedCamera.description}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3 font-mono">
                      Especificações
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedCamera.specs.map((spec) => (
                        <div key={spec.label} className="bg-zinc-800 rounded-xl p-3">
                          <p className="text-xs text-white/35 font-mono mb-0.5">{spec.label}</p>
                          <p className="text-sm font-bold text-white">{spec.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3 font-mono">
                      Dicas de Uso
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedCamera.tips.map((tip, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="w-5 h-5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-400 text-xs font-black flex items-center justify-center shrink-0 font-mono mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-white/55 leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => toggleFavorite(selectedCamera.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                        favorites.has(selectedCamera.id)
                          ? "border-pink-500 bg-pink-500/10 text-pink-400"
                          : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${favorites.has(selectedCamera.id) ? "fill-current" : ""}`}
                      />
                      {favorites.has(selectedCamera.id) ? "Favoritado" : "Favoritar"}
                    </button>
                    <button
                      onClick={() => {
                        addToCart(selectedCamera);
                        setCartOpen(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-400 text-white text-sm font-black py-3 rounded-xl transition-colors shadow-lg shadow-pink-500/20"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              )}

              {cameraTab === "professional" && (
                <div>
                  <p className="text-sm text-white/45 mb-4">
                    Profissionais especializados em{" "}
                    <span className="text-pink-400 font-bold">{selectedCamera.type}</span> disponíveis
                    para contratação
                  </p>

                  {relatedPros.length > 0 ? (
                    <div className="space-y-3">
                      {relatedPros.map((pro) => (
                        <div
                          key={pro.id}
                          className="flex gap-4 bg-zinc-800 rounded-2xl p-4 items-center"
                        >
                          <img
                            src={pro.image}
                            alt={pro.name}
                            className="w-14 h-14 rounded-xl object-cover object-top bg-zinc-700 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-black text-white text-sm">{pro.name}</p>
                            <p className="text-xs text-pink-300 mb-1">{pro.specialty}</p>
                            <p className="text-xs text-white/35 leading-relaxed line-clamp-2">
                              {pro.bio}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-pink-400 font-black font-mono text-sm leading-tight">
                              {pro.rate}
                            </p>
                            <div className="flex items-center gap-1 justify-end my-1.5">
                              <Star className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                              <span className="text-xs text-white/45 font-mono">{pro.rating}</span>
                            </div>
                            <button className="text-xs bg-pink-500 hover:bg-pink-400 text-white px-3 py-1.5 rounded-lg transition-colors font-black">
                              Contratar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Users className="w-10 h-10 text-white/10 mx-auto mb-3" />
                      <p className="text-white/35 text-sm">
                        Nenhum profissional disponível para este tipo no momento.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────── CARRINHO ─────────────── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative bg-zinc-900 border-l border-white/6 w-full max-w-sm flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-5 h-5 text-yellow-200" />
                <h2 className="font-black text-white text-lg">Carrinho</h2>
                {cartCount > 0 && (
                  <span className="bg-pink-500 text-white text-xs font-black rounded-full px-2 py-0.5 font-mono">
                    {cartCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="text-center py-14">
                  <ShoppingCart className="w-12 h-12 text-white/8 mx-auto mb-3" />
                  <p className="text-white/25 text-sm font-medium">Seu carrinho está vazio</p>
                  <p className="text-white/15 text-xs mt-1">Explore a loja e adicione câmeras</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-zinc-800 rounded-2xl p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-xl bg-zinc-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white leading-tight truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-pink-400 font-mono mt-0.5">
                        R$ {item.price.toLocaleString("pt-BR")}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white/6 hover:bg-white/12 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3 h-3 text-white/60" />
                        </button>
                        <span className="text-sm font-mono font-bold text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white/6 hover:bg-white/12 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-3 h-3 text-white/60" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="self-start w-7 h-7 rounded-lg bg-white/4 hover:bg-red-500/15 flex items-center justify-center transition-colors group/del"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-white/30 group-hover/del:text-red-400 transition-colors" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 border-t border-white/5 space-y-3 shrink-0">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-sm">Total</span>
                  <span className="text-2xl font-black text-pink-400 font-mono">
                    R$ {cartTotal.toLocaleString("pt-BR")}
                  </span>
                </div>
                <button className="w-full bg-yellow-100 hover:bg-white text-black font-black py-3.5 rounded-2xl text-sm transition-colors shadow-lg shadow-yellow-200/10">
                  Finalizar Compra
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full border border-white/8 hover:border-white/15 text-white/50 hover:text-white font-medium py-2.5 rounded-2xl text-sm transition-all"
                >
                  Continuar Comprando
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
