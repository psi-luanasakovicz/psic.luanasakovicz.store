import type { Product } from '@/types/product';

// Dados mockados usados apenas como referência para supabase/seed.sql
export const initialProducts: Product[] = [
  {
    id: '1',
    slug: 'ebook-ansiedade-tcc',
    title: 'E-book: Ansiedade sob o Olhar da TCC',
    category: 'Adultos',
    subtitle: 'Estratégias práticas de regulação emocional e reestruturação cognitiva.',
    price: 47.9,
    description:
      'Um guia prático e ricamente ilustrado, escrito para pacientes e psicólogos que desejam compreender os mecanismos da ansiedade através da Terapia Cognitivo-Comportamental. Contém folhas de exercício estruturadas, técnicas de respiração guiada e questionamentos socráticos aplicados.',
    pages: 112,
    format: 'PDF de Alta Resolução (Pronto para impressão)',
    bonus: '3 Áudios de Práticas de Mindfulness inclusos',
    rating: 5,
    sales: 142,
    imageColor: 'from-[#C8DDD4] to-[#EEF5F2]',
    badge: 'Mais Vendido',
    details: [
      'Modelos explicativos sobre o ciclo da ansiedade',
      'Registro de Pensamentos Disfuncionais (RPD) adaptado e interativo',
      'Guia completo para condução de dessensibilização sistemática',
      'Abordagem humanizada, baseada em evidências científicas',
    ],
    contents: [
      {
        title: 'Capítulo 1: O que acontece no cérebro ansioso',
        text: 'A ansiedade é uma resposta adaptativa de sobrevivência...',
      },
      {
        title: 'Capítulo 2: Identificando Distorções Cognitivas',
        text: 'Pensamentos catastróficos tendem a antecipar o pior cenário possível...',
      },
      {
        title: 'Capítulo 3: Técnicas de Manejo e Respiração Diafragmática',
        text: 'Ao desacelerar o ritmo respiratório, enviamos um sinal de segurança...',
      },
      {
        title: 'Capítulo 4: O Plano de Ação Diário',
        text: 'Crie pequenos hábitos previsíveis que reduzem a sobrecarga sensorial...',
      },
    ],
  },
  {
    id: '2',
    slug: 'baralho-emocoes-criancas',
    title: 'Baralho de Emoções para Crianças',
    category: 'Crianças',
    subtitle: '36 cartas interativas para facilitação da expressão emocional infantil.',
    price: 32.9,
    description:
      'Um recurso lúdico e indispensável para a clínica infantil. Este baralho ajuda a criança a nomear, aceitar e expressar suas principais emoções de forma segura e divertida. Acompanha manual completo de aplicação clínica com 5 dinâmicas diferentes para sessões presenciais ou online.',
    pages: '36 cartas + Manual',
    format: 'PDF Imprimível Colorido com guias de corte',
    bonus: 'Folha de colorir "Monstro das Emoções"',
    rating: 4.9,
    sales: 98,
    imageColor: 'from-[#EEF5F2] to-[#C8DDD4]',
    badge: 'Lúdico e Clínico',
    details: [
      'Ilustrações exclusivas e acolhedoras para fácil identificação',
      'Perguntas disparadoras no verso de cada carta para aprofundamento',
      'Ideal para psicólogos infantis, psicopedagogos e pais',
      'Formato ajustado para impressão em papel couché ou foto de gramatura alta',
    ],
    contents: [
      {
        title: 'Manual de Aplicação',
        text: 'A primeira regra no trabalho infantil é estabelecer um vínculo lúdico...',
      },
      {
        title: 'Dinâmica 1: Detetive dos Sentimentos',
        text: 'Esconda as cartas pela sala e peça para a criança encontrar as que correspondem...',
      },
      {
        title: 'Dinâmica 2: Espelho, Espelho Meu',
        text: 'A criança deve imitar a expressão facial da carta sorteada...',
      },
    ],
  },
  {
    id: '3',
    slug: 'guia-regulacao-adolescentes',
    title: 'Guia de Regulação Emocional para Adolescentes',
    category: 'Adolescentes',
    subtitle: 'Ferramentas de conexão, autoconhecimento e pertencimento.',
    price: 39.9,
    description:
      'Desenvolvido especialmente para a linguagem do adolescente, este material combina estética moderna com o embasamento da TCC e da Terapia Dialética Comportamental (DBT). Auxilia na navegação pelas crises de identidade, pressões escolares e relacionamentos sociais.',
    pages: 85,
    format: 'PDF Interativo (Pode ser preenchido no celular/tablet)',
    bonus: 'Planner de Rotina Semanal de Autocuidado',
    rating: 5,
    sales: 76,
    imageColor: 'from-[#88B7A5]/20 to-[#EEF5F2]',
    badge: 'Estilo Journaling',
    details: [
      'Abordagem livre de julgamentos, conectada aos desafios atuais',
      'Técnicas de tolerância ao mal-estar baseadas em DBT',
      'Espaço para escrita expressiva e diário reflexivo',
      'Design estético e convidativo',
    ],
    contents: [
      {
        title: 'Seção 1: Quem sou eu além das expectativas?',
        text: 'Durante a adolescência, construir sua própria identidade é um trabalho contínuo...',
      },
      {
        title: 'Seção 2: Sobrevivendo a dias difíceis',
        text: 'Quando a mente parecer barulhenta demais, use a técnica TIP (Temperatura, Intensidade, Ritmo)...',
      },
      {
        title: 'Seção 3: Limites Saudáveis nas redes sociais',
        text: 'A comparação social é o maior ladrão da nossa tranquilidade diária...',
      },
    ],
  },
  {
    id: '4',
    slug: 'kit-anamnese-contrato-clinico',
    title: 'Kit de Anamnese e Contrato Clínico Completo',
    category: 'Gestão Clínica',
    subtitle: 'Modelos editáveis e validados eticamente pelo CFP.',
    price: 59.9,
    description:
      'Documentos essenciais para formalizar seu consultório com elegância e conformidade legal. Inclui contrato de prestação de serviços psicológicos (adulto e infantil), ficha de anamnese completa e estruturada de acordo com as normas vigentes, e modelo de relatório de alta terapêutica.',
    pages: '5 Modelos Editáveis',
    format: 'Arquivos em formato Word (DOCX) + PDFs de referência',
    bonus: 'Guia explicativo sobre Prontuário Psicológico',
    rating: 4.8,
    sales: 210,
    imageColor: 'from-[#88B7A5]/10 to-[#C8DDD4]/40',
    badge: 'Essencial Profissional',
    details: [
      'Totalmente editável para você inserir seu logotipo e CRP',
      'Redigido com clareza ética sobre faltas, reajustes e sigilo',
      'Anamnese detalhada contemplando histórico biopsicossocial',
      'Aprovado e revisado por assessoria jurídica e clínica',
    ],
    contents: [
      {
        title: 'Instruções de Uso',
        text: 'Lembre-se de personalizar os campos em destaque com os dados do seu consultório...',
      },
      {
        title: 'Modelo 1: Ficha de Anamnese',
        text: 'Identificação completa do paciente, queixa principal, histórico familiar...',
      },
      {
        title: 'Modelo 2: Contrato Clínico Adulto',
        text: 'Cláusula 1: Das sessões e duração. Cláusula 2: Dos honorários e cancelamentos...',
      },
    ],
  },
].map((p) => ({ ...p, deliveryFiles: [] as import('@/types/product').DeliveryFile[] })) as Product[];

export function getProductBySlug(slug: string, products: Product[]): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string, products: Product[]): Product | undefined {
  return products.find((p) => p.id === id);
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
