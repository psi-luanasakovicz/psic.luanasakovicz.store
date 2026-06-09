import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Download, 
  ShoppingBag, 
  User, 
  Settings, 
  Plus, 
  Search, 
  ChevronRight, 
  Check, 
  Lock, 
  Info, 
  ArrowLeft, 
  Star, 
  FileText, 
  LogOut, 
  Heart, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Printer, 
  HelpCircle,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  Mail,
  Phone
} from 'lucide-react';

// --- GOOGLE FONTS INJECTION ---
// Injecting Playfair Display and Plus Jakarta Sans to match the premium boutique psychology look
const injectFonts = () => {
  if (!document.getElementById('brand-fonts')) {
    const link = document.createElement('link');
    link.id = 'brand-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.innerHTML = `
      .font-serif-brand { font-family: 'Playfair Display', Georgia, serif; }
      .font-sans-brand { font-family: 'Plus Jakarta Sans', sans-serif; }
      .organic-radius { border-radius: 40px 10px 40px 10px; }
      .organic-radius-reverse { border-radius: 10px 40px 10px 40px; }
    `;
    document.head.appendChild(style);
  }
};

export default function App() {
  useEffect(() => {
    injectFonts();
  }, []);

  // --- MOCK DATA ---
  const [products, setProducts] = useState([
    {
      id: '1',
      title: 'E-book: Ansiedade sob o Olhar da TCC',
      category: 'Adultos',
      subtitle: 'Estratégias práticas de regulação emocional e reestruturação cognitiva.',
      price: 47.90,
      description: 'Um guia prático e ricamente ilustrado, escrito para pacientes e psicólogos que desejam compreender os mecanismos da ansiedade através da Terapia Cognitivo-Comportamental. Contém folhas de exercício estruturadas, técnicas de respiração guiada e questionamentos socráticos aplicados.',
      pages: 112,
      format: 'PDF de Alta Resolução (Pronto para impressão)',
      bonus: '3 Áudios de Práticas de Mindfulness inclusos',
      rating: 5,
      sales: 142,
      imageColor: 'from-[#D4C6C2] to-[#ECE9E8]',
      badge: 'Mais Vendido',
      details: [
        'Modelos explicativos sobre o ciclo da ansiedade',
        'Registro de Pensamentos Disfuncionais (RPD) adaptado e interativo',
        'Guia completo para condução de dessensibilização sistemática',
        'Abordagem humanizada, baseada em evidências científicas'
      ],
      contents: [
        { title: 'Capítulo 1: O que acontece no cérebro ansioso', text: 'A ansiedade é uma resposta adaptativa de sobrevivência...' },
        { title: 'Capítulo 2: Identificando Distorções Cognitivas', text: 'Pensamentos catastróficos tendem a antecipar o pior cenário possível...' },
        { title: 'Capítulo 3: Técnicas de Manejo e Respiração Diafragmática', text: 'Ao desacelerar o ritmo respiratório, enviamos um sinal de segurança...' },
        { title: 'Capítulo 4: O Plano de Ação Diário', text: 'Crie pequenos hábitos previsíveis que reduzem a sobrecarga sensorial...' }
      ]
    },
    {
      id: '2',
      title: 'Baralho de Emoções para Crianças',
      category: 'Crianças',
      subtitle: '36 cartas interativas para facilitação da expressão emocional infantil.',
      price: 32.90,
      description: 'Um recurso lúdico e indispensável para a clínica infantil. Este baralho ajuda a criança a nomear, aceitar e expressar suas principais emoções de forma segura e divertida. Acompanha manual completo de aplicação clínica com 5 dinâmicas diferentes para sessões presenciais ou online.',
      pages: '36 cartas + Manual',
      format: 'PDF Imprimível Colorido com guias de corte',
      bonus: 'Folha de colorir "Monstro das Emoções"',
      rating: 4.9,
      sales: 98,
      imageColor: 'from-[#ECE9E8] to-[#D4C6C2]',
      badge: 'Lúdico e Clínico',
      details: [
        'Ilustrações exclusivas e acolhedoras para fácil identificação',
        'Perguntas disparadoras no verso de cada carta para aprofundamento',
        'Ideal para psicólogos infantis, psicopedagogos e pais',
        'Formato ajustado para impressão em papel couché ou foto de gramatura alta'
      ],
      contents: [
        { title: 'Manual de Aplicação', text: 'A primeira regra no trabalho infantil é estabelecer um vínculo lúdico...' },
        { title: 'Dinâmica 1: Detetive dos Sentimentos', text: 'Esconda as cartas pela sala e peça para a criança encontrar as que correspondem...' },
        { title: 'Dinâmica 2: Espelho, Espelho Meu', text: 'A criança deve imitar a expressão facial da carta sorteada...' }
      ]
    },
    {
      id: '3',
      title: 'Guia de Regulação Emocional para Adolescentes',
      category: 'Adolescentes',
      subtitle: 'Ferramentas de conexão, autoconhecimento e pertencimento.',
      price: 39.90,
      description: 'Desenvolvido especialmente para a linguagem do adolescente, este material combina estética moderna com o embasamento da TCC e da Terapia Dialética Comportamental (DBT). Auxilia na navegação pelas crises de identidade, pressões escolares e relacionamentos sociais.',
      pages: 85,
      format: 'PDF Interativo (Pode ser preenchido no celular/tablet)',
      bonus: 'Planner de Rotina Semanal de Autocuidado',
      rating: 5,
      sales: 76,
      imageColor: 'from-[#8A645D]/20 to-[#ECE9E8]',
      badge: 'Estilo Journaling',
      details: [
        'Abordagem livre de julgamentos, conectada aos desafios atuais',
        'Técnicas de tolerância ao mal-estar baseadas em DBT',
        'Espaço para escrita expressiva e diário reflexivo',
        'Design estético e convidativo'
      ],
      contents: [
        { title: 'Seção 1: Quem sou eu além das expectativas?', text: 'Durante a adolescência, construir sua própria identidade é um trabalho contínuo...' },
        { title: 'Seção 2: Sobrevivendo a dias difíceis', text: 'Quando a mente parecer barulhenta demais, use a técnica TIP (Temperatura, Intensidade, Ritmo)...' },
        { title: 'Seção 3: Limites Saudáveis nas redes sociais', text: 'A comparação social é o maior ladrão da nossa tranquilidade diária...' }
      ]
    },
    {
      id: '4',
      title: 'Kit de Anamnese e Contrato Clínico Completo',
      category: 'Gestão Clínica',
      subtitle: 'Modelos editáveis e validados eticamente pelo CFP.',
      price: 59.90,
      description: 'Documentos essenciais para formalizar seu consultório com elegância e conformidade legal. Inclui contrato de prestação de serviços psicológicos (adulto e infantil), ficha de anamnese completa e estruturada de acordo com as normas vigentes, e modelo de relatório de alta terapêutica.',
      pages: '5 Modelos Editáveis',
      format: 'Arquivos em formato Word (DOCX) + PDFs de referência',
      bonus: 'Guia explicativo sobre Prontuário Psicológico',
      rating: 4.8,
      sales: 210,
      imageColor: 'from-[#8A645D]/10 to-[#D4C6C2]/40',
      badge: 'Essencial Profissional',
      details: [
        'Totalmente editável para você inserir seu logotipo e CRP',
        'Redigido com clareza ética sobre faltas, reajustes e sigilo',
        'Anamnese detalhada contemplando histórico biopsicossocial',
        'Aprovado e revisado por assessoria jurídica e clínica'
      ],
      contents: [
        { title: 'Instruções de Uso', text: 'Lembre-se de personalizar os campos em destaque com os dados do seu consultório...' },
        { title: 'Modelo 1: Ficha de Anamnese', text: 'Identificação completa do paciente, queixa principal, histórico familiar...' },
        { title: 'Modelo 2: Contrato Clínico Adulto', text: 'Cláusula 1: Das sessões e duração. Cláusula 2: Dos honorários e cancelamentos...' }
      ]
    }
  ]);

  // --- STATE ---
  const [currentView, setCurrentView] = useState('home'); // home, catalog, product, login, register, dashboard, library, profile, admin
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [cart, setCart] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState(['1']); // Already purchased e-book for simulation
  const [user, setUser] = useState({
    name: 'Ana Carolina Silva',
    email: 'ana.carol@gmail.com',
    crp: 'CRP 08/12345',
    isLoggedIn: true,
    isAdmin: false
  });
  
  // Admin form state
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Adultos',
    subtitle: '',
    price: '',
    description: '',
    pages: '',
    format: '',
    bonus: '',
    badge: '',
    details: '',
    contents: ''
  });

  // UI feedback states
  const [toastMessage, setToastMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLibrarySection, setActiveLibrarySection] = useState(0);

  // --- NAVIGATION & LOGIC HANDLERS ---
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuy = (product) => {
    if (!user.isLoggedIn) {
      showToast('Por favor, faça login ou cadastre-se para adquirir os materiais.');
      setCurrentView('login');
      return;
    }

    if (purchasedProducts.includes(product.id)) {
      showToast('Você já possui este material! Acesse-o na sua Área do Cliente.');
      setCurrentView('dashboard');
      return;
    }

    // Direct checkout simulation
    setPurchasedProducts([...purchasedProducts, product.id]);
    showToast(`Parabéns! O material "${product.title}" foi adicionado à sua biblioteca com sucesso.`);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price) {
      showToast('Por favor, preencha pelo menos o título e o preço do material.');
      return;
    }

    const created = {
      id: String(products.length + 1),
      title: newProduct.title,
      category: newProduct.category,
      subtitle: newProduct.subtitle || 'Recurso prático de psicologia.',
      price: parseFloat(newProduct.price),
      description: newProduct.description || 'Material clínico desenvolvido com ética e embasamento científico para psicólogos e pacientes.',
      pages: newProduct.pages || 'Disponível após compra',
      format: newProduct.format || 'PDF de Alta Definição',
      bonus: newProduct.bonus || 'Incluso material extra reflexivo',
      rating: 5,
      sales: 0,
      imageColor: 'from-[#8A645D]/10 to-[#ECE9E8]',
      badge: newProduct.badge || 'Novo Lançamento',
      details: newProduct.details ? newProduct.details.split('\n') : ['Material terapêutico exclusivo', 'Fácil aplicação clínica'],
      contents: [
        { title: 'Introdução e Guia', text: 'Instruções fundamentadas na psicologia clínica...' },
        { title: 'Parte 1: Exercícios reflexivos', text: 'Roteiro de aplicação terapêutica...' }
      ]
    };

    setProducts([created, ...products]);
    showToast('Novo recurso adicionado ao catálogo com sucesso!');
    setNewProduct({
      title: '',
      category: 'Adultos',
      subtitle: '',
      price: '',
      description: '',
      pages: '',
      format: '',
      bonus: '',
      badge: '',
      details: '',
      contents: ''
    });
    setCurrentView('catalog');
  };

  const handleLogout = () => {
    setUser({ name: '', email: '', crp: '', isLoggedIn: false, isAdmin: false });
    setPurchasedProducts([]);
    showToast('Sessão encerrada com sucesso.');
    setCurrentView('home');
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // --- FILTERED PRODUCTS ---
  const filteredProducts = products.filter(p => {
    const matchesCategory = filterCategory === 'Todos' || p.category === filterCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F3F1F0] text-[#8A645D] font-sans-brand flex flex-col antialiased selection:bg-[#8A645D]/20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#8A645D] text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 transition-all transform duration-300 animate-bounce">
          <Sparkles className="w-5 h-5 flex-shrink-0 text-[#F3F1F0]" />
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-[#F3F1F0]/90 backdrop-blur-md border-b border-[#D4C6C2]/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button 
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex flex-col text-left group"
          >
            <span className="font-serif-brand text-xl sm:text-2xl font-bold tracking-wide text-[#8A645D] group-hover:opacity-80 transition-opacity">
              Psic. Luana Sakovicz
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#8A645D]/70 font-semibold -mt-1">
              Recursos Clínicos & Materiais
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => setCurrentView('home')} 
              className={`hover:text-[#76514B] transition-colors ${currentView === 'home' ? 'border-b-2 border-[#8A645D] pb-1' : ''}`}
            >
              Início
            </button>
            <button 
              onClick={() => { setCurrentView('catalog'); setFilterCategory('Todos'); }} 
              className={`hover:text-[#76514B] transition-colors ${currentView === 'catalog' ? 'border-b-2 border-[#8A645D] pb-1' : ''}`}
            >
              Materiais
            </button>
            {user.isLoggedIn && (
              <button 
                onClick={() => setCurrentView('dashboard')} 
                className={`hover:text-[#76514B] transition-colors ${currentView === 'dashboard' || currentView === 'library' ? 'border-b-2 border-[#8A645D] pb-1' : ''}`}
              >
                Minha Área
              </button>
            )}
            {user.isLoggedIn && (
              <button 
                onClick={() => setCurrentView('admin')} 
                className={`hover:text-[#76514B] flex items-center gap-1 transition-colors ${currentView === 'admin' ? 'border-b-2 border-[#8A645D] pb-1' : ''}`}
              >
                <Settings className="w-4 h-4" /> Painel Admin
              </button>
            )}
          </nav>

          {/* Auth & CTAs */}
          <div className="flex items-center gap-3">
            {user.isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setCurrentView('profile')}
                  className="hidden sm:flex items-center gap-2 bg-[#ECE9E8] border border-[#D4C6C2] px-3 py-1.5 rounded-full text-xs hover:bg-[#D4C6C2]/40 transition-all text-[#8A645D]"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="bg-[#8A645D] hover:bg-[#76514B] text-[#F3F1F0] px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Área do Cliente</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentView('login')}
                className="bg-[#8A645D] hover:bg-[#76514B] text-[#F3F1F0] px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5" />
                <span>Acessar Conta</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* --- CONTENT CONTAINER --- */}
      <main className="flex-grow">
        
        {/* ========================================================= */}
        {/* SCREEN: HOME                                              */}
        {/* ========================================================= */}
        {currentView === 'home' && (
          <div>
            
            {/* HERO SECTION - Inspired by actual web design provided */}
            <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Left Content */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8A645D]/85 bg-[#ECE9E8] px-3.5 py-1.5 rounded-full">
                    Consultório Digital & Recursos
                  </span>
                  <h1 className="font-serif-brand text-4xl sm:text-5xl lg:text-6xl font-bold text-[#8A645D] leading-tight">
                    Recursos que guiam, acolhem e <span className="italic font-normal font-serif-brand">transformam</span>.
                  </h1>
                  <p className="text-[#8A645D]/80 text-base sm:text-lg max-w-xl leading-relaxed">
                    Materiais terapêuticos e ferramentas clínicas baseados em evidência científica, criados para estruturar sessões de psicologia de forma lúdica, empática e altamente profissional.
                  </p>
                  
                  {/* Hero Actions */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => { setCurrentView('catalog'); setFilterCategory('Todos'); }}
                      className="bg-[#8A645D] hover:bg-[#76514B] text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-[#8A645D]/10 hover:shadow-[#8A645D]/20 transform hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Explorar Materiais</span>
                    </button>
                    <button 
                      onClick={() => {
                        const target = document.getElementById('benefits');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="border border-[#D4C6C2] hover:bg-[#ECE9E8] px-8 py-4 rounded-full font-semibold transition-all text-sm"
                    >
                      Conhecer Proposta
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-8 border-t border-[#D4C6C2]/40 grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-serif-brand text-2xl font-bold">100%</p>
                      <p className="text-xs text-[#8A645D]/75">Embasamento Clínico</p>
                    </div>
                    <div>
                      <p className="font-serif-brand text-2xl font-bold">+500</p>
                      <p className="text-xs text-[#8A645D]/75">Terapeutas Atendidos</p>
                    </div>
                    <div>
                      <p className="font-serif-brand text-2xl font-bold">Pronto</p>
                      <p className="text-xs text-[#8A645D]/75">Para Impressão</p>
                    </div>
                  </div>
                </div>

                {/* Hero Right Media (Simulating Premium Photo frame from reference) */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm">
                    {/* Shadow Decorator background */}
                    <div className="absolute inset-0 bg-[#ECE9E8] border border-[#D4C6C2] organic-radius transform rotate-3 scale-105"></div>
                    
                    {/* Interactive Frame Box simulating Luana's Photo and branding */}
                    <div className="relative bg-[#ECE9E8] border-2 border-[#D4C6C2] organic-radius overflow-hidden shadow-xl p-8 flex flex-col justify-between aspect-[4/5]">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8A645D]/60">CRP 08/48498</span>
                        <div className="w-8 h-8 rounded-full bg-[#8A645D]/10 flex items-center justify-center text-[#8A645D]">
                          Ψ
                        </div>
                      </div>
                      
                      {/* Stylized Silhouette representing professional photography */}
                      <div className="my-auto flex flex-col items-center justify-center space-y-3 text-center py-6">
                        <div className="w-24 h-24 rounded-full bg-[#8A645D]/15 flex items-center justify-center border-2 border-[#D4C6C2]">
                          <User className="w-12 h-12 text-[#8A645D]" />
                        </div>
                        <div>
                          <p className="font-serif-brand text-lg font-bold">Psic. Luana Sakovicz</p>
                          <p className="text-xs text-[#8A645D]/80">Terapia Cognitivo-Comportamental</p>
                        </div>
                        <div className="bg-[#F3F1F0]/70 backdrop-blur-sm border border-[#D4C6C2] px-4 py-2 rounded-xl text-[11px] max-w-xs text-center text-[#8A645D]/90">
                          "Cuidar da mente é um ato de coragem."
                        </div>
                      </div>

                      <div className="text-center text-[10px] text-[#8A645D]/50">
                        Atendimento Clínico & Recursos Digitais
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="bg-[#ECE9E8]/40 border-y border-[#D4C6C2]/40 py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center space-y-3 mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80">Boutique de Materiais</span>
                  <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold">Recursos em Destaque</h2>
                  <p className="text-[#8A645D]/75 max-w-lg mx-auto text-sm">
                    Selecionamos ferramentas práticas, testadas e validadas em consultório para otimizar sua rotina terapêutica.
                  </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.slice(0, 4).map((p) => (
                    <div 
                      key={p.id}
                      className="bg-[#ECE9E8] border border-[#D4C6C2]/60 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-[#8A645D]/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                      {/* Product Preview Box */}
                      <div className={`h-48 bg-gradient-to-br ${p.imageColor} relative p-6 flex flex-col justify-between border-b border-[#D4C6C2]/40`}>
                        <div className="flex justify-between items-start">
                          <span className="bg-[#F3F1F0] text-[#8A645D] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {p.category}
                          </span>
                          {p.badge && (
                            <span className="bg-[#8A645D] text-white text-[9px] px-2 py-0.5 rounded-full font-medium">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-left">
                          <div className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#8A645D] shadow-sm mb-2">
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <p className="text-xs text-[#8A645D]/70 font-semibold">{p.pages}</p>
                        </div>
                      </div>

                      {/* Info Content */}
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-serif-brand text-lg font-bold leading-snug hover:text-[#76514B] transition-colors">
                            {p.title}
                          </h3>
                          <p className="text-xs text-[#8A645D]/80 line-clamp-2">
                            {p.subtitle}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#D4C6C2]/40 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#8A645D]/60 block uppercase">Valor</span>
                            <span className="font-serif-brand text-lg font-bold">R$ {p.price.toFixed(2)}</span>
                          </div>
                          <button 
                            onClick={() => handleProductClick(p)}
                            className="bg-[#8A645D] hover:bg-[#76514B] text-[#F3F1F0] text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1"
                          >
                            <span>Saiba Mais</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button 
                    onClick={() => { setCurrentView('catalog'); setFilterCategory('Todos'); }}
                    className="border border-[#D4C6C2] hover:bg-[#ECE9E8] px-8 py-3.5 rounded-full font-semibold transition-all text-sm inline-flex items-center gap-2"
                  >
                    <span>Ver Catálogo Completo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* BENEFITS SECTION */}
            <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Interactive Aesthetic list */}
                <div className="space-y-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80 bg-[#ECE9E8] px-3.5 py-1.5 rounded-full">Diferenciais</span>
                  <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold leading-tight">
                    Materiais pensados com cuidado para elevar o nível da sua prática.
                  </h2>
                  <p className="text-sm text-[#8A645D]/85 leading-relaxed">
                    A prática clínica de psicologia exige recursos que combinem rigor científico com uma linguagem clara e uma apresentação impecável. Meus materiais são projetados para atuar como facilitadores da aliança terapêutica.
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-[#8A645D]/10 flex items-center justify-center text-[#8A645D] flex-shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif-brand font-semibold text-base">Rigor Científico e Ético</h4>
                        <p className="text-xs text-[#8A645D]/75 mt-1">Materiais totalmente respaldados pela TCC e de acordo com o Código de Ética do CFP.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-[#8A645D]/10 flex items-center justify-center text-[#8A645D] flex-shrink-0">
                        <Printer className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif-brand font-semibold text-base">Pronto para Imprimir ou Preencher</h4>
                        <p className="text-xs text-[#8A645D]/75 mt-1">Ficheiros organizados para impressão de excelência em alta definição e versões interativas em PDF.</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-[#8A645D]/10 flex items-center justify-center text-[#8A645D] flex-shrink-0">
                        <Heart className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif-brand font-semibold text-base">Design Acolhedor e Sensível</h4>
                        <p className="text-xs text-[#8A645D]/75 mt-1">Identidade estética pensada para não intimidar o paciente, promovendo bem-estar emocional.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Mockup Image simulation of cards */}
                <div className="bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 space-y-6 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A645D]/5 rounded-full blur-2xl"></div>
                  
                  <div className="bg-[#F3F1F0] p-6 rounded-2xl border border-[#D4C6C2]/60 shadow-sm space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A645D]/60">Feedback Recente</span>
                    </div>
                    <p className="text-xs italic text-[#8A645D]/90">
                      "Os cartões de emoções revolucionaram a minha clínica infantil. As crianças pedem para brincar toda sessão. O design transmite tanto cuidado!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#8A645D]/25 flex items-center justify-center text-[10px] font-bold">ML</div>
                      <div>
                        <p className="text-xs font-semibold">Mariana Lins</p>
                        <p className="text-[10px] text-[#8A645D]/60">Psicóloga Clínica • CRP 06/99882</p>
                      </div>
                    </div>
                  </div>

                  {/* Secondary mini floating card */}
                  <div className="bg-[#F3F1F0] p-6 rounded-2xl border border-[#D4C6C2]/60 shadow-sm space-y-2 max-w-sm ml-auto">
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-xs font-bold text-[#8A645D]">Material de alta fidelidade e fácil uso</p>
                    <p className="text-[11px] text-[#8A645D]/80">Fácil download imediato após a compra.</p>
                  </div>
                </div>

              </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="bg-[#ECE9E8]/40 border-t border-[#D4C6C2]/30 py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80">Depoimentos reais</span>
                  <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold">O que dizem os colegas de profissão</h2>
                  <p className="text-sm text-[#8A645D]/75 max-w-md mx-auto">Parcerias e conexões que se estendem através dos nossos materiais exclusivos.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Dra. Clarice Mendes',
                      role: 'Terapeuta Cognitiva e Autora',
                      text: 'Fazer o download do material e ter a segurança de uma anamnese bem montada e com excelente design facilita demais o acolhimento do paciente no início de jornada.',
                      stars: 5,
                    },
                    {
                      name: 'Psic. Gabriel Ortiz',
                      role: 'Clínica de Adolescentes',
                      text: 'Os materiais de Luana têm um toque de empatia único. Os adolescentes se conectam com as imagens, com as perguntas e se sentem ouvidos.',
                      stars: 5,
                    },
                    {
                      name: 'Dra. Beatriz Santos',
                      role: 'Psicóloga Hospitalar e Docente',
                      text: 'Toda a identidade visual exala acolhimento e sofisticação. É como ter um pedacinho da sensibilidade do consultório dela no nosso próprio espaço.',
                      stars: 5,
                    }
                  ].map((t, idx) => (
                    <div key={idx} className="bg-[#F3F1F0] p-8 rounded-3xl border border-[#D4C6C2]/50 shadow-sm flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex gap-1 text-amber-500">
                          {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-xs sm:text-sm text-[#8A645D]/90 italic leading-relaxed">
                          "{t.text}"
                        </p>
                      </div>
                      <div className="pt-4 border-t border-[#D4C6C2]/30">
                        <p className="text-xs font-bold text-[#8A645D]">{t.name}</p>
                        <p className="text-[11px] text-[#8A645D]/65">{t.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <div className="text-center space-y-3 mb-12">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80">Suporte e Dúvidas</span>
                <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold">Perguntas Frequentes</h2>
                <p className="text-sm text-[#8A645D]/75">Esclareça suas principais dúvidas sobre o uso e licenciamento dos nossos materiais digitais.</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: 'Como recebo os materiais após o pagamento?',
                    a: 'Imediatamente após a confirmação do pagamento, os arquivos estarão disponíveis para visualização e download em alta resolução diretamente na sua "Área do Cliente" nesta plataforma. Um e-mail com as instruções também será enviado automaticamente.'
                  },
                  {
                    q: 'Posso usar os recursos com quantos pacientes quiser?',
                    a: 'Sim. A aquisição concede a licença pessoal e de uso clínico ilimitado para você aplicar com seus próprios pacientes durante as sessões. É proibida, contudo, a revenda, partilha ou distribuição comercial dos ficheiros.'
                  },
                  {
                    q: 'Os materiais estão atualizados e corrigidos?',
                    a: 'Sempre. Mantemos um padrão rigoroso de qualidade. Quando há atualizações normativas ou melhorias estéticas nos e-books e manuais, disponibilizamos as novas versões sem qualquer custo adicional para quem já adquiriu.'
                  },
                  {
                    q: 'Vocês realizam reembolsos?',
                    a: 'Por se tratar de produtos digitais com entrega imediata, oferecemos garantia incondicional de 7 dias. Caso entenda que o material não se adequa à sua clínica, basta entrar em contato para estorno imediato.'
                  }
                ].map((faq, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#ECE9E8] rounded-2xl border border-[#D4C6C2]/60 overflow-hidden transition-all duration-300"
                  >
                    <button 
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-6 flex justify-between items-center font-serif-brand font-bold text-[#8A645D] hover:opacity-90 focus:outline-none"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <span className={`transform transition-transform duration-300 text-[#8A645D]/60 text-xl font-normal`}>
                        {openFaqIndex === idx ? '−' : '+'}
                      </span>
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-6 pb-6 text-xs sm:text-sm text-[#8A645D]/80 leading-relaxed border-t border-[#D4C6C2]/30 pt-4 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="bg-[#8A645D] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="text-xs uppercase tracking-[0.25em] text-white/80 font-semibold bg-white/15 px-3 py-1 rounded-full">Explore Hoje Mesmo</span>
                <h2 className="font-serif-brand text-3xl sm:text-5xl font-semibold leading-tight">
                  Eleve a experiência do seu consultório e encante seus pacientes.
                </h2>
                <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
                  Ofereça recursos visuais elegantes, cientificamente embasados e acolhedores nas suas sessões.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => { setCurrentView('catalog'); setFilterCategory('Todos'); }}
                    className="bg-[#F3F1F0] text-[#8A645D] hover:bg-white font-bold px-8 py-4 rounded-full transition-all text-sm inline-flex items-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Acessar nossa Boutique de Materiais</span>
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN: CATALOG                                           */}
        {/* ========================================================= */}
        {currentView === 'catalog' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            
            {/* Catalog Title */}
            <div className="text-center md:text-left space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80 bg-[#ECE9E8] px-3 py-1 rounded-full inline-block">Galeria Exclusiva</span>
              <h1 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold">Catálogo de Recursos</h1>
              <p className="text-sm text-[#8A645D]/85 max-w-xl">
                Navegue pelas ferramentas de intervenção e materiais de apoio criados para enriquecer o trabalho clínico em cada fase do desenvolvimento.
              </p>
            </div>

            {/* Filters & Search Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-[#D4C6C2]/40">
              
              {/* Category Toggles */}
              <div className="flex flex-wrap gap-2">
                {['Todos', 'Crianças', 'Adolescentes', 'Adultos', 'Gestão Clínica'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      filterCategory === cat 
                        ? 'bg-[#8A645D] text-white' 
                        : 'bg-[#ECE9E8] text-[#8A645D]/80 hover:bg-[#D4C6C2]/40 border border-[#D4C6C2]/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-[#8A645D]/60 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Pesquisar materiais..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#ECE9E8] border border-[#D4C6C2] rounded-full pl-10 pr-4 py-2 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]/80 transition-colors placeholder-[#8A645D]/50"
                />
              </div>

            </div>

            {/* Catalog Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <div 
                    key={p.id}
                    className="bg-[#ECE9E8] border border-[#D4C6C2]/60 rounded-[2rem] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Header Image Gradient simulation */}
                    <div className={`h-40 bg-gradient-to-br ${p.imageColor} p-6 flex flex-col justify-between relative`}>
                      <span className="bg-[#F3F1F0] text-[#8A645D] text-[10px] font-bold px-3 py-1 rounded-full uppercase self-start">
                        {p.category}
                      </span>
                      
                      <div className="text-left">
                        <span className="bg-white/40 text-xs px-2.5 py-1 rounded-full text-[#8A645D] font-medium backdrop-blur-sm">
                          {p.pages}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-2 text-left">
                        <h3 className="font-serif-brand text-xl font-bold leading-tight">{p.title}</h3>
                        <p className="text-xs text-[#8A645D]/80 line-clamp-3">{p.description}</p>
                      </div>

                      {/* Technical Specs bullet tags */}
                      <div className="space-y-1 text-xs text-[#8A645D]/70 pt-2">
                        <p className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 flex-shrink-0" /> {p.format}</p>
                        {p.bonus && <p className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 flex-shrink-0" /> {p.bonus}</p>}
                      </div>

                      <div className="pt-4 border-t border-[#D4C6C2]/40 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#8A645D]/50 block uppercase">Valor Comercial</span>
                          <span className="font-serif-brand text-lg font-bold">R$ {p.price.toFixed(2)}</span>
                        </div>
                        <button 
                          onClick={() => handleProductClick(p)}
                          className="bg-[#8A645D] hover:bg-[#76514B] text-[#F3F1F0] text-xs font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-1"
                        >
                          <span>Detalhes</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#ECE9E8] rounded-2xl border border-[#D4C6C2] max-w-md mx-auto space-y-4">
                <Info className="w-8 h-8 text-[#8A645D]/60 mx-auto" />
                <p className="font-serif-brand text-lg font-bold">Nenhum recurso encontrado</p>
                <p className="text-xs text-[#8A645D]/70">Tente ajustar seus filtros ou termos de pesquisa.</p>
                <button 
                  onClick={() => { setFilterCategory('Todos'); setSearchQuery(''); }}
                  className="bg-[#8A645D] text-white px-4 py-2 rounded-full text-xs font-semibold"
                >
                  Ver Todos
                </button>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN: PRODUCT DETAIL                                    */}
        {/* ========================================================= */}
        {currentView === 'product' && selectedProduct && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
            
            {/* Back button */}
            <button 
              onClick={() => setCurrentView('catalog')}
              className="inline-flex items-center gap-2 text-xs font-semibold hover:opacity-85"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para o catálogo</span>
            </button>

            {/* Product Body Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Product Visual Mockup Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className={`aspect-[4/3] sm:aspect-video rounded-[2.5rem] bg-gradient-to-br ${selectedProduct.imageColor} border-2 border-[#D4C6C2] shadow-md p-8 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[#8A645D]/5 pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start">
                    <span className="bg-[#F3F1F0] text-[#8A645D] text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">
                      {selectedProduct.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-[#8A645D]">
                      Ψ
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <h2 className="font-serif-brand text-2xl sm:text-3xl font-bold tracking-tight">{selectedProduct.title}</h2>
                    <p className="text-xs text-[#8A645D]/80 italic">{selectedProduct.subtitle}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-medium text-[#8A645D]/80">
                    <span className="bg-white/40 px-2.5 py-1 rounded-full backdrop-blur-sm">{selectedProduct.pages}</span>
                    <span className="bg-white/40 px-2.5 py-1 rounded-full backdrop-blur-sm">{selectedProduct.format}</span>
                  </div>
                </div>

                {/* Additional detailed facts of delivery */}
                <div className="bg-[#ECE9E8] rounded-2xl border border-[#D4C6C2] p-6 space-y-4">
                  <h4 className="font-serif-brand font-bold text-sm">Garantias & Processo de Compra</h4>
                  <ul className="text-xs text-[#8A645D]/80 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span><strong>Download Instantâneo:</strong> Acesso direto após validação bancária ou pix.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span><strong>Licença de uso Clínico:</strong> Use em formato digital ou impresso sem limites de pacientes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span><strong>Atualizações Vitalícias:</strong> Receba correções estéticas ou de conteúdo sem pagar a mais.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Product Info Description Column */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A645D]/80 bg-[#ECE9E8] px-3.5 py-1.5 rounded-full inline-block">Ficha Técnica e Detalhes</span>
                  <h1 className="font-serif-brand text-3xl sm:text-4xl font-bold">{selectedProduct.title}</h1>
                  <p className="text-sm font-semibold italic text-[#8A645D]/80">{selectedProduct.subtitle}</p>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs text-[#8A645D]/80">({selectedProduct.sales} terapeutas já adquiriram)</span>
                </div>

                <p className="text-sm text-[#8A645D]/95 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* What is in the package list */}
                <div className="space-y-3 bg-[#ECE9E8]/30 border border-[#D4C6C2]/40 rounded-2xl p-6">
                  <h3 className="font-serif-brand font-bold text-sm">O que está incluído no arquivo:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.details.map((detail, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs text-[#8A645D]/90">
                        <div className="w-1.5 h-1.5 bg-[#8A645D] rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details Table */}
                <div className="grid grid-cols-3 gap-4 border-y border-[#D4C6C2]/40 py-4 text-xs">
                  <div>
                    <span className="text-[#8A645D]/60 block uppercase">Páginas/Cartas</span>
                    <span className="font-semibold">{selectedProduct.pages}</span>
                  </div>
                  <div>
                    <span className="text-[#8A645D]/60 block uppercase">Formato</span>
                    <span className="font-semibold">{selectedProduct.format}</span>
                  </div>
                  <div>
                    <span className="text-[#8A645D]/60 block uppercase">Bônus Exclusivo</span>
                    <span className="font-semibold text-[#8A645D]">{selectedProduct.bonus}</span>
                  </div>
                </div>

                {/* Checkout pricing card */}
                <div className="bg-[#ECE9E8] rounded-[2rem] border border-[#D4C6C2] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs text-[#8A645D]/75 uppercase">Valor de Investimento</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-serif-brand text-3xl font-bold">R$ {selectedProduct.price.toFixed(2)}</span>
                      <span className="text-xs text-[#8A645D]/60">Pagamento Único</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleBuy(selectedProduct)}
                    className="bg-[#8A645D] hover:bg-[#76514B] text-white px-8 py-4 rounded-full font-bold shadow-md transform hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adquirir Acesso Imediato</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN: LOGIN                                             */}
        {/* ========================================================= */}
        {currentView === 'login' && (
          <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-6">
            
            <div className="bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 space-y-6 shadow-sm">
              <div className="text-center space-y-2">
                <span className="w-12 h-12 rounded-full bg-[#8A645D]/10 flex items-center justify-center text-[#8A645D] mx-auto">
                  <Lock className="w-5 h-5" />
                </span>
                <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">Acesse sua Conta</h1>
                <p className="text-xs text-[#8A645D]/80">Para acessar sua biblioteca exclusiva de recursos digitais.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setUser({
                  name: 'Ana Carolina Silva',
                  email: 'ana.carol@gmail.com',
                  crp: 'CRP 08/12345',
                  isLoggedIn: true,
                  isAdmin: false
                });
                showToast('Login efetuado com sucesso! Seja bem-vinda de volta.');
                setCurrentView('dashboard');
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">E-mail</label>
                  <input 
                    type="email" 
                    defaultValue="ana.carol@gmail.com"
                    required
                    className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">Senha</label>
                  <input 
                    type="password" 
                    defaultValue="senha123"
                    required
                    className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#8A645D] hover:bg-[#76514B] text-white py-3 rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  Confirmar Login
                </button>
              </form>

              <div className="text-center pt-2">
                <button 
                  onClick={() => setCurrentView('register')}
                  className="text-xs underline text-[#8A645D]/80 hover:text-[#8A645D]"
                >
                  Não tem conta? Crie uma agora.
                </button>
              </div>
            </div>

            <div className="text-center text-xs text-[#8A645D]/60">
              <p>Precisa de suporte com suas compras?</p>
              <p className="font-semibold underline cursor-pointer mt-1">luana.sakovicz@gmail.com</p>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN: REGISTER                                          */}
        {/* ========================================================= */}
        {currentView === 'register' && (
          <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-6">
            
            <div className="bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 space-y-6 shadow-sm">
              <div className="text-center space-y-2">
                <span className="w-12 h-12 rounded-full bg-[#8A645D]/10 flex items-center justify-center text-[#8A645D] mx-auto">
                  <User className="w-5 h-5" />
                </span>
                <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">Crie seu Cadastro</h1>
                <p className="text-xs text-[#8A645D]/80">Para salvar seus materiais e acessar onde preferir.</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const name = e.target.elements.name.value;
                const email = e.target.elements.email.value;
                const crp = e.target.elements.crp.value;
                setUser({
                  name,
                  email,
                  crp: crp || 'Psicólogo(a)',
                  isLoggedIn: true,
                  isAdmin: false
                });
                showToast('Seu cadastro foi criado e você já está conectada!');
                setCurrentView('dashboard');
              }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">Nome Completo</label>
                  <input 
                    name="name"
                    type="text" 
                    placeholder="Ex: Dra. Juliana Reis"
                    required
                    className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">E-mail Comercial</label>
                  <input 
                    name="email"
                    type="email" 
                    placeholder="exemplo@email.com"
                    required
                    className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">CRP (Opcional)</label>
                  <input 
                    name="crp"
                    type="text" 
                    placeholder="Ex: CRP 08/29103"
                    className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 uppercase tracking-wide">Crie uma Senha</label>
                  <input 
                    type="password" 
                    required
                    className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D]"
                  />
                </div>

                <div className="text-[10px] text-[#8A645D]/70 space-y-1">
                  <p>✓ Concordo com os Termos de Uso e Licenciamento Clínico.</p>
                  <p>✓ Meus dados estão protegidos sob a LGPD.</p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#8A645D] hover:bg-[#76514B] text-white py-3 rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  Registrar e Conectar
                </button>
              </form>

              <div className="text-center pt-2">
                <button 
                  onClick={() => setCurrentView('login')}
                  className="text-xs underline text-[#8A645D]/80 hover:text-[#8A645D]"
                >
                  Já tem uma conta? Faça Login.
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN: CLIENT DASHBOARD (ÁREA DO CLIENTE)                */}
        {/* ========================================================= */}
        {currentView === 'dashboard' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            
            {/* Dashboard Welcome Header */}
            <div className="bg-[#ECE9E8] rounded-[2rem] border border-[#D4C6C2] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A645D]/80">Ambiente do Psicólogo</span>
                </div>
                <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">Olá, {user.name}!</h1>
                <p className="text-xs text-[#8A645D]/80">
                  Bem-vindo ao seu consultório digital. Aqui estão organizados os materiais adquiridos para a sua prática diária.
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => { setCurrentView('catalog'); setFilterCategory('Todos'); }}
                  className="bg-[#8A645D] hover:bg-[#76514B] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm transition-all flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Material</span>
                </button>
                <button 
                  onClick={() => setCurrentView('profile')}
                  className="border border-[#D4C6C2] hover:bg-[#D4C6C2]/40 text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
                >
                  Meus Dados
                </button>
              </div>
            </div>

            {/* Dashboard grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Your materials */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between border-b border-[#D4C6C2]/40 pb-2">
                  <h3 className="font-serif-brand text-xl font-bold">Seus Recursos Ativos</h3>
                  <span className="text-xs text-[#8A645D]/70 font-semibold">{purchasedProducts.length} Materiais</span>
                </div>

                {purchasedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {products.filter(p => purchasedProducts.includes(p.id)).map(p => (
                      <div 
                        key={p.id}
                        className="bg-[#ECE9E8] border border-[#D4C6C2] rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div className="p-6 space-y-4 text-left">
                          <div className="flex justify-between items-start">
                            <span className="bg-[#F3F1F0] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-[#8A645D]">
                              {p.category}
                            </span>
                            <span className="text-[10px] text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded-full">Ativo</span>
                          </div>
                          
                          <div className="space-y-1">
                            <h4 className="font-serif-brand font-bold text-base leading-snug">{p.title}</h4>
                            <p className="text-[11px] text-[#8A645D]/75 line-clamp-2">{p.subtitle}</p>
                          </div>
                        </div>

                        {/* Card Bottom CTA for download or direct reading */}
                        <div className="p-4 bg-[#F3F1F0]/50 border-t border-[#D4C6C2]/50 flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedProduct(p);
                              setActiveLibrarySection(0);
                              setCurrentView('library');
                            }}
                            className="flex-1 bg-[#8A645D] hover:bg-[#76514B] text-white text-[11px] font-bold py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1.5"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Abrir Leitura</span>
                          </button>
                          
                          <a 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              showToast(`Download de "${p.title}" iniciado com sucesso no seu dispositivo.`);
                            }}
                            className="flex-1 border border-[#D4C6C2] hover:bg-[#ECE9E8] text-[#8A645D] text-[11px] font-bold py-2 rounded-lg text-center transition-all flex items-center justify-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Baixar PDF</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-[#ECE9E8] rounded-2xl border border-[#D4C6C2] space-y-4">
                    <BookOpen className="w-8 h-8 text-[#8A645D]/60 mx-auto" />
                    <p className="font-serif-brand text-lg font-bold">Nenhum recurso adquirido</p>
                    <p className="text-xs text-[#8A645D]/70 max-w-xs mx-auto">Explore nosso catálogo boutique e adquira materiais para iniciar o preenchimento.</p>
                    <button 
                      onClick={() => { setCurrentView('catalog'); setFilterCategory('Todos'); }}
                      className="bg-[#8A645D] text-white px-5 py-2.5 rounded-full text-xs font-semibold"
                    >
                      Ver Catálogo
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Invoices & Clinical Licenses */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Clinical License Card */}
                <div className="bg-[#ECE9E8] rounded-2xl border border-[#D4C6C2] p-6 space-y-4 text-left">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#8A645D]" />
                    <h3 className="font-serif-brand font-bold text-sm">Sua Licença de Uso</h3>
                  </div>
                  <p className="text-xs text-[#8A645D]/80 leading-relaxed">
                    Sua conta está registrada com a licença de uso individual clínica para <strong>{user.name}</strong> ({user.crp}). 
                    Os materiais podem ser expostos aos seus pacientes em atendimentos, adaptados para impressão física e preenchimento local.
                  </p>
                  <div className="text-[10px] text-[#8A645D]/60 pt-2 border-t border-[#D4C6C2]/40">
                    ID de Registro: <span className="font-mono">LUANA-CLI-2026-99182</span>
                  </div>
                </div>

                {/* Purchase Receipts mock */}
                <div className="bg-[#ECE9E8] rounded-2xl border border-[#D4C6C2] p-6 space-y-4 text-left">
                  <h3 className="font-serif-brand font-bold text-sm">Histórico de Faturas</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs p-2.5 bg-[#F3F1F0] rounded-xl">
                      <div>
                        <p className="font-semibold">E-book: Ansiedade TCC</p>
                        <p className="text-[10px] text-[#8A645D]/60">09 de Junho, 2026</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R$ 47,90</p>
                        <span className="text-[9px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">Pago</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs p-2.5 bg-[#F3F1F0]/60 rounded-xl opacity-75">
                      <div>
                        <p className="font-semibold">Baralho Emoções (Simulação)</p>
                        <p className="text-[10px] text-[#8A645D]/60">22 de Janeiro, 2026</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R$ 32,90</p>
                        <span className="text-[9px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded">Pago</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN: INTERACTIVE READING LIBRARY                       */}
        {/* ========================================================= */}
        {currentView === 'library' && selectedProduct && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            
            {/* Library Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4C6C2]/40 pb-6">
              <div className="space-y-1 text-left">
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-85 mb-2 text-[#8A645D]/70"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar para Área do Cliente</span>
                </button>
                <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">{selectedProduct.title}</h1>
                <p className="text-xs text-[#8A645D]/85 italic">{selectedProduct.subtitle}</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => showToast('Iniciando o download do arquivo PDF completo.')}
                  className="bg-[#8A645D] hover:bg-[#76514B] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-4 h-4" /> Baixar PDF
                </button>
                <button 
                  onClick={() => showToast('Funcionalidade de impressão enviada para a fila de impressão local.')}
                  className="border border-[#D4C6C2] hover:bg-[#ECE9E8] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Printer className="w-4 h-4" /> Imprimir
                </button>
              </div>
            </div>

            {/* Interactive Reader Simulation Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Book Chapter / Content Selector Panel */}
              <div className="lg:col-span-4 bg-[#ECE9E8] border border-[#D4C6C2] rounded-3xl p-6 space-y-4">
                <h3 className="font-serif-brand font-bold text-sm tracking-wide border-b border-[#D4C6C2]/40 pb-2">Conteúdo Disponível</h3>
                
                <div className="space-y-2">
                  {selectedProduct.contents?.map((sect, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveLibrarySection(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs transition-all flex items-center justify-between ${
                        activeLibrarySection === idx 
                          ? 'bg-[#8A645D] text-white shadow-sm' 
                          : 'bg-[#F3F1F0] hover:bg-[#F3F1F0]/70'
                      }`}
                    >
                      <span className="font-semibold line-clamp-1">{sect.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-80" />
                    </button>
                  ))}
                </div>

                <div className="bg-[#F3F1F0] rounded-2xl p-4 text-xs space-y-2 text-[#8A645D]/80">
                  <p className="font-semibold flex items-center gap-1"><Info className="w-3.5 h-3.5" /> Dica de Uso Clínico</p>
                  <p className="text-[11px] leading-relaxed">Você pode projetar esta tela diretamente do seu tablet ou notebook durante o atendimento online para realizar as leituras de forma interativa com o paciente.</p>
                </div>
              </div>

              {/* Reader Pane simulation */}
              <div className="lg:col-span-8 bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 md:p-12 shadow-sm text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A645D]/5 rounded-full blur-2xl"></div>
                
                <div className="max-w-2xl mx-auto space-y-6">
                  
                  {/* Decorative psychological brand logo watermarking */}
                  <div className="flex justify-between items-center text-[10px] text-[#8A645D]/50 border-b border-[#D4C6C2]/40 pb-4">
                    <span>Leitor Digital • Luana Sakovicz</span>
                    <span className="font-mono">Ψ Licenciado para {user.name}</span>
                  </div>

                  {/* Active Segment */}
                  <div className="space-y-4 min-h-[300px]">
                    <h2 className="font-serif-brand text-2xl font-bold">
                      {selectedProduct.contents?.[activeLibrarySection]?.title || 'Selecione uma seção'}
                    </h2>
                    <p className="text-sm leading-relaxed text-[#8A645D]/95">
                      {selectedProduct.contents?.[activeLibrarySection]?.text || 'Nenhum conteúdo carregado para esta seção.'}
                    </p>
                    <p className="text-sm leading-relaxed text-[#8A645D]/85">
                      Através deste recurso clínico, o psicólogo guia a conversação socrática perguntando: "Quais evidências apoiam esse pensamento negativo?". A resposta é estruturada no nosso modelo, garantindo o registro consciente.
                    </p>
                    
                    {/* Simulated Text area for client to interactive write notes */}
                    <div className="pt-8 space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#8A645D]/70">Suas Anotações Clínicas / Insights de Caso:</label>
                      <textarea 
                        placeholder="Escreva aqui anotações rápidas para a sessão..."
                        className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-2xl p-4 text-xs text-[#8A645D] focus:outline-none focus:border-[#8A645D] h-28 resize-none placeholder-[#8A645D]/50"
                      />
                    </div>
                  </div>

                  <div className="border-t border-[#D4C6C2]/40 pt-4 flex items-center justify-between text-xs text-[#8A645D]/60">
                    <span>Página {activeLibrarySection + 1} de {selectedProduct.contents?.length || 1}</span>
                    <span>CRP 08/48498</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN: USER PROFILE                                      */}
        {/* ========================================================= */}
        {currentView === 'profile' && (
          <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-xl mx-auto space-y-6">
            
            <div className="bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 space-y-6 shadow-sm">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#8A645D]/10 flex items-center justify-center text-[#8A645D] mx-auto border-2 border-[#D4C6C2]">
                  <User className="w-8 h-8" />
                </div>
                <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">Seu Perfil</h1>
                <p className="text-xs text-[#8A645D]/80">Seus dados cadastrais e registro profissional.</p>
              </div>

              <div className="space-y-4 text-left text-xs">
                
                <div className="bg-[#F3F1F0] p-4 rounded-2xl border border-[#D4C6C2]/60 space-y-1">
                  <span className="text-[10px] text-[#8A645D]/50 block uppercase">Nome</span>
                  <span className="font-semibold text-sm">{user.name}</span>
                </div>

                <div className="bg-[#F3F1F0] p-4 rounded-2xl border border-[#D4C6C2]/60 space-y-1">
                  <span className="text-[10px] text-[#8A645D]/50 block uppercase">E-mail Comercial</span>
                  <span className="font-semibold text-sm">{user.email}</span>
                </div>

                <div className="bg-[#F3F1F0] p-4 rounded-2xl border border-[#D4C6C2]/60 space-y-1">
                  <span className="text-[10px] text-[#8A645D]/50 block uppercase">Registro Profissional</span>
                  <span className="font-semibold text-sm">{user.crp || 'Não especificado'}</span>
                </div>

                <div className="bg-[#F3F1F0] p-4 rounded-2xl border border-[#D4C6C2]/60 space-y-1">
                  <span className="text-[10px] text-[#8A645D]/50 block uppercase">Status da Conta</span>
                  <span className="font-semibold text-sm text-green-700">Licença Clínica Ativa</span>
                </div>

              </div>

              <div className="flex gap-2 pt-4">
                <button 
                  onClick={() => {
                    showToast('As alterações no perfil foram salvas com sucesso.');
                    setCurrentView('dashboard');
                  }}
                  className="flex-1 bg-[#8A645D] hover:bg-[#76514B] text-white py-3 rounded-full text-xs font-semibold transition-all text-center"
                >
                  Salvar Dados
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 border border-[#D4C6C2] hover:bg-red-50 hover:text-red-700 text-[#8A645D] py-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da Conta</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN: ADMINISTRATOR PANEL (PAINEL ADMINISTRATIVO)       */}
        {/* ========================================================= */}
        {currentView === 'admin' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            
            {/* Admin Header */}
            <div className="bg-[#ECE9E8] rounded-[2rem] border border-[#D4C6C2] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A645D]/80">Portal do Administrador</span>
                </div>
                <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold">Gestão da Loja de Materiais</h1>
                <p className="text-xs text-[#8A645D]/80">Cadastre novos recursos terapêuticos, acompanhe vendas e controle a biblioteca.</p>
              </div>

              <div className="text-xs text-[#8A645D]/75 bg-[#F3F1F0] px-4 py-3 rounded-2xl border border-[#D4C6C2]/60">
                Acessado por: <strong>Psic. Luana Sakovicz</strong>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#ECE9E8] p-6 rounded-2xl border border-[#D4C6C2] text-left">
                <span className="text-xs text-[#8A645D]/60 uppercase font-semibold">Total Faturado</span>
                <p className="font-serif-brand text-2xl font-bold mt-1">R$ 14.890,00</p>
                <span className="text-[10px] text-green-700 font-semibold">Este mês: +R$ 2.400</span>
              </div>
              <div className="bg-[#ECE9E8] p-6 rounded-2xl border border-[#D4C6C2] text-left">
                <span className="text-xs text-[#8A645D]/60 uppercase font-semibold">Downloads Totais</span>
                <p className="font-serif-brand text-2xl font-bold mt-1">526 Downloads</p>
                <span className="text-[10px] text-[#8A645D]/70">Média de 4.8 estrelas</span>
              </div>
              <div className="bg-[#ECE9E8] p-6 rounded-2xl border border-[#D4C6C2] text-left">
                <span className="text-xs text-[#8A645D]/60 uppercase font-semibold">Clientes Ativos</span>
                <p className="font-serif-brand text-2xl font-bold mt-1">380 Terapeutas</p>
                <span className="text-[10px] text-[#8A645D]/70">Em todo o Brasil e Europa</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
              
              {/* Left Column: Create new product form */}
              <div className="lg:col-span-7 bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 space-y-6">
                <div className="border-b border-[#D4C6C2]/40 pb-4">
                  <h3 className="font-serif-brand font-bold text-lg">Adicionar Novo Material Clínico</h3>
                  <p className="text-xs text-[#8A645D]/75">Preencha os dados abaixo para publicar o recurso na boutique digital imediatamente.</p>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1 uppercase tracking-wide">Título Principal</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Baralho do Diálogo Socrático"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                        required
                        className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-[#8A645D]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 uppercase tracking-wide">Subtítulo Explicativo</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 30 cartas para questionamento cognitivo."
                        value={newProduct.subtitle}
                        onChange={(e) => setNewProduct({...newProduct, subtitle: e.target.value})}
                        className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-[#8A645D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold mb-1 uppercase tracking-wide">Preço (R$)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="39.90"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        required
                        className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-[#8A645D]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 uppercase tracking-wide">Categoria</label>
                      <select 
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-[#8A645D]"
                      >
                        <option value="Crianças">Crianças</option>
                        <option value="Adolescentes">Adolescentes</option>
                        <option value="Adultos">Adultos</option>
                        <option value="Gestão Clínica">Gestão Clínica</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 uppercase tracking-wide">Etiqueta/Selo</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Recomendado"
                        value={newProduct.badge}
                        onChange={(e) => setNewProduct({...newProduct, badge: e.target.value})}
                        className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-[#8A645D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold mb-1 uppercase tracking-wide">Páginas/Cartas</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 50 páginas"
                        value={newProduct.pages}
                        onChange={(e) => setNewProduct({...newProduct, pages: e.target.value})}
                        className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-[#8A645D]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 uppercase tracking-wide">Formato</label>
                      <input 
                        type="text" 
                        placeholder="Ex: PDF Imprimível"
                        value={newProduct.format}
                        onChange={(e) => setNewProduct({...newProduct, format: e.target.value})}
                        className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-[#8A645D]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1 uppercase tracking-wide">Bônus Incluso</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Folhas extras"
                        value={newProduct.bonus}
                        onChange={(e) => setNewProduct({...newProduct, bonus: e.target.value})}
                        className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl px-4 py-2.5 text-[#8A645D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 uppercase tracking-wide">Descrição Completa</label>
                    <textarea 
                      placeholder="Descreva minuciosamente o valor clínico e os temas contemplados pelo recurso..."
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl p-4 text-[#8A645D] h-24 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 uppercase tracking-wide">O que está incluído no arquivo (um por linha)</label>
                    <textarea 
                      placeholder="Modelo adaptado interativo&#10;Abordagem com embasamento&#10;Guia prático para impressão"
                      value={newProduct.details}
                      onChange={(e) => setNewProduct({...newProduct, details: e.target.value})}
                      className="w-full bg-[#F3F1F0] border border-[#D4C6C2] rounded-xl p-4 text-[#8A645D] h-20 resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#8A645D] hover:bg-[#76514B] text-white py-3.5 rounded-full font-bold shadow-md transition-all text-center"
                  >
                    Publicar Recurso Digital
                  </button>
                </form>
              </div>

              {/* Right Column: Existing catalog manager */}
              <div className="lg:col-span-5 bg-[#ECE9E8] border border-[#D4C6C2] rounded-[2.5rem] p-8 space-y-6">
                <h3 className="font-serif-brand font-bold text-lg border-b border-[#D4C6C2]/40 pb-2">Controle do Acervo ({products.length})</h3>
                
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {products.map((p) => (
                    <div 
                      key={p.id}
                      className="bg-[#F3F1F0] p-4 rounded-2xl border border-[#D4C6C2]/60 flex justify-between items-center text-xs"
                    >
                      <div className="space-y-1">
                        <p className="font-bold font-serif-brand">{p.title}</p>
                        <div className="flex gap-2 text-[10px] text-[#8A645D]/70">
                          <span>{p.category}</span>
                          <span>•</span>
                          <span className="font-semibold text-[#8A645D]">R$ {p.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleProductClick(p)}
                          className="p-1.5 bg-[#8A645D]/10 hover:bg-[#8A645D]/20 rounded-lg text-[#8A645D]"
                          title="Visualizar"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja apagar o material "${p.title}"?`)) {
                              setProducts(products.filter(item => item.id !== p.id));
                              showToast('Recurso removido com sucesso.');
                            }
                          }}
                          className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg text-red-700"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#8A645D] text-[#F3F1F0]/90 border-t border-[#D4C6C2]/20 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-serif-brand text-2xl font-bold tracking-wide">
              Psic. Luana Sakovicz
            </h3>
            <p className="text-xs text-[#F3F1F0]/85 max-w-sm leading-relaxed">
              Psicóloga com atuação clínica sob a abordagem Cognitivo-Comportamental (TCC). Oferecendo atendimento humanizado, sensível e ferramentas que potencializam o processo de autoconhecimento.
            </p>
            <div className="text-[11px] text-[#F3F1F0]/70 space-y-1">
              <p>Registro: CRP 08/48498</p>
              <p>Atendimento presencial em Campo Largo (PR) e online para todo o Brasil.</p>
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div className="space-y-4">
            <h4 className="font-serif-brand font-bold text-sm uppercase tracking-wider">Explorar</h4>
            <ul className="text-xs space-y-2.5">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:underline text-[#F3F1F0]/80">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView('catalog'); setFilterCategory('Todos'); }} className="hover:underline text-[#F3F1F0]/80">
                  Boutique de Materiais
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard')} className="hover:underline text-[#F3F1F0]/80">
                  Área do Cliente
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin')} className="hover:underline text-[#F3F1F0]/80">
                  Painel Administrativo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-4">
            <h4 className="font-serif-brand font-bold text-sm uppercase tracking-wider">Contacto Direto</h4>
            <div className="text-xs space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>luana.sakovicz@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(41) 99136-9954</span>
              </div>
            </div>
            
            {/* Social media mock */}
            <div className="flex gap-3 pt-2">
              {['Instagram', 'LinkedIn', 'WhatsApp'].map((s) => (
                <span 
                  key={s} 
                  onClick={() => showToast(`Redirecionando para o perfil oficial no ${s}...`)}
                  className="bg-[#F3F1F0]/15 hover:bg-[#F3F1F0]/25 text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer legal notes & copyright */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#D4C6C2]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#F3F1F0]/70">
          <p>© 2026 Luana Sakovicz. Todos os direitos reservados.</p>
          <p>Feito com carinho para o desenvolvimento profissional em saúde mental.</p>
        </div>
      </footer>

    </div>
  );
}