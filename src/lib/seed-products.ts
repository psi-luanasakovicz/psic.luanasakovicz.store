import { mapProductToInsert } from '@/lib/mappers/product';
import { createClient } from '@/lib/supabase/client';
import type { Product } from '@/types/product';
import type { Json } from '@/types/database';

/** UUIDs fixos — espelham supabase/seed.sql */
const SEED_PRODUCTS: (Product & { id: string })[] = [
  {
    id: 'a1000001-0001-4001-8001-000000000001',
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
    ],
    deliveryFiles: [],
    isActive: true,
  },
  {
    id: 'a1000002-0002-4002-8002-000000000002',
    slug: 'baralho-emocoes-criancas',
    title: 'Baralho de Emoções para Crianças',
    category: 'Crianças',
    subtitle: '36 cartas interativas para facilitação da expressão emocional infantil.',
    price: 32.9,
    description:
      'Um recurso lúdico e indispensável para a clínica infantil. Este baralho ajuda a criança a nomear, aceitar e expressar suas principais emoções de forma segura e divertida. Acompanha manual completo de aplicação clínica com 5 dinâmicas diferentes para sessões presenciais ou online.',
    pages: '36 cartas + Manual',
    format: 'PDF Imprimível Colorido + App Interativo',
    bonus: 'Folha de colorir "Monstro das Emoções"',
    rating: 4.9,
    sales: 98,
    imageColor: 'from-[#EEF5F2] to-[#C8DDD4]',
    badge: 'Lúdico e Clínico',
    details: [
      'Ilustrações exclusivas e acolhedoras para fácil identificação',
      'Perguntas disparadoras no verso de cada carta para aprofundamento',
      'Baralho digital interativo incluso na Área do Cliente',
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
    ],
    deliveryFiles: [],
    isActive: true,
  },
  {
    id: 'a1000003-0003-4003-8003-000000000003',
    slug: 'guia-regulacao-adolescentes',
    title: 'Guia de Regulação Emocional para Adolescentes',
    category: 'Adolescentes',
    subtitle: 'Ferramentas de conexão, autoconhecimento e pertencimento.',
    price: 39.9,
    description:
      'Desenvolvido especialmente para a linguagem do adolescente, este material combina estética moderna com o embasamento da TCC e da Terapia Dialética Comportamental (DBT).',
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
    ],
    contents: [
      {
        title: 'Seção 1: Quem sou eu além das expectativas?',
        text: 'Durante a adolescência, construir sua própria identidade é um trabalho contínuo...',
      },
    ],
    deliveryFiles: [],
    isActive: true,
  },
  {
    id: 'a1000004-0004-4004-8004-000000000004',
    slug: 'kit-anamnese-contrato-clinico',
    title: 'Kit de Anamnese e Contrato Clínico Completo',
    category: 'Gestão Clínica',
    subtitle: 'Modelos editáveis e validados eticamente pelo CFP.',
    price: 59.9,
    description:
      'Documentos essenciais para formalizar seu consultório com elegância e conformidade legal.',
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
    ],
    contents: [
      {
        title: 'Instruções de Uso',
        text: 'Lembre-se de personalizar os campos em destaque com os dados do seu consultório...',
      },
    ],
    deliveryFiles: [],
    isActive: true,
  },
];

export async function seedInitialCatalog(): Promise<{ error: string | null; count: number }> {
  const supabase = createClient();

  const { count, error: countError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    return { error: countError.message, count: 0 };
  }

  if ((count ?? 0) > 0) {
    return { error: 'O catálogo já possui produtos cadastrados.', count: 0 };
  }

  const rows = SEED_PRODUCTS.map((product) => {
    const data = mapProductToInsert(product);
    return {
      ...data,
      id: product.id,
      details: data.details as unknown as Json,
      contents: data.contents as unknown as Json,
      delivery_files: data.delivery_files as unknown as Json,
    };
  });

  const { error } = await supabase.from('products').insert(rows);

  if (error) {
    return { error: error.message, count: 0 };
  }

  return { error: null, count: rows.length };
}

export const INITIAL_CATALOG_COUNT = SEED_PRODUCTS.length;
