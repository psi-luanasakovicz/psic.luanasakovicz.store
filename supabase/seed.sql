-- ============================================================
-- Seed inicial de produtos (execute após schema.sql)
-- Fonte: src/data/products.ts
-- ============================================================

INSERT INTO public.products (
  id,
  slug,
  title,
  category,
  subtitle,
  price,
  description,
  pages,
  format,
  bonus,
  rating,
  sales,
  image_color,
  badge,
  details,
  contents,
  is_active
) VALUES
(
  'a1000001-0001-4001-8001-000000000001',
  'ebook-ansiedade-tcc',
  'E-book: Ansiedade sob o Olhar da TCC',
  'Adultos',
  'Estratégias práticas de regulação emocional e reestruturação cognitiva.',
  47.90,
  'Um guia prático e ricamente ilustrado, escrito para pacientes e psicólogos que desejam compreender os mecanismos da ansiedade através da Terapia Cognitivo-Comportamental. Contém folhas de exercício estruturadas, técnicas de respiração guiada e questionamentos socráticos aplicados.',
  '112',
  'PDF de Alta Resolução (Pronto para impressão)',
  '3 Áudios de Práticas de Mindfulness inclusos',
  5.0,
  142,
  'from-[#D4C6C2] to-[#ECE9E8]',
  'Mais Vendido',
  '["Modelos explicativos sobre o ciclo da ansiedade","Registro de Pensamentos Disfuncionais (RPD) adaptado e interativo","Guia completo para condução de dessensibilização sistemática","Abordagem humanizada, baseada em evidências científicas"]'::JSONB,
  '[{"title":"Capítulo 1: O que acontece no cérebro ansioso","text":"A ansiedade é uma resposta adaptativa de sobrevivência..."},{"title":"Capítulo 2: Identificando Distorções Cognitivas","text":"Pensamentos catastróficos tendem a antecipar o pior cenário possível..."},{"title":"Capítulo 3: Técnicas de Manejo e Respiração Diafragmática","text":"Ao desacelerar o ritmo respiratório, enviamos um sinal de segurança..."},{"title":"Capítulo 4: O Plano de Ação Diário","text":"Crie pequenos hábitos previsíveis que reduzem a sobrecarga sensorial..."}]'::JSONB,
  TRUE
),
(
  'a1000002-0002-4002-8002-000000000002',
  'baralho-emocoes-criancas',
  'Baralho de Emoções para Crianças',
  'Crianças',
  '36 cartas interativas para facilitação da expressão emocional infantil.',
  32.90,
  'Um recurso lúdico e indispensável para a clínica infantil. Este baralho ajuda a criança a nomear, aceitar e expressar suas principais emoções de forma segura e divertida. Acompanha manual completo de aplicação clínica com 5 dinâmicas diferentes para sessões presenciais ou online.',
  '36 cartas + Manual',
  'PDF Imprimível Colorido com guias de corte',
  'Folha de colorir "Monstro das Emoções"',
  4.9,
  98,
  'from-[#ECE9E8] to-[#D4C6C2]',
  'Lúdico e Clínico',
  '["Ilustrações exclusivas e acolhedoras para fácil identificação","Perguntas disparadoras no verso de cada carta para aprofundamento","Ideal para psicólogos infantis, psicopedagogos e pais","Formato ajustado para impressão em papel couché ou foto de gramatura alta"]'::JSONB,
  '[{"title":"Manual de Aplicação","text":"A primeira regra no trabalho infantil é estabelecer um vínculo lúdico..."},{"title":"Dinâmica 1: Detetive dos Sentimentos","text":"Esconda as cartas pela sala e peça para a criança encontrar as que correspondem..."},{"title":"Dinâmica 2: Espelho, Espelho Meu","text":"A criança deve imitar a expressão facial da carta sorteada..."}]'::JSONB,
  TRUE
),
(
  'a1000003-0003-4003-8003-000000000003',
  'guia-regulacao-adolescentes',
  'Guia de Regulação Emocional para Adolescentes',
  'Adolescentes',
  'Ferramentas de conexão, autoconhecimento e pertencimento.',
  39.90,
  'Desenvolvido especialmente para a linguagem do adolescente, este material combina estética moderna com o embasamento da TCC e da Terapia Dialética Comportamental (DBT). Auxilia na navegação pelas crises de identidade, pressões escolares e relacionamentos sociais.',
  '85',
  'PDF Interativo (Pode ser preenchido no celular/tablet)',
  'Planner de Rotina Semanal de Autocuidado',
  5.0,
  76,
  'from-[#8A645D]/20 to-[#ECE9E8]',
  'Estilo Journaling',
  '["Abordagem livre de julgamentos, conectada aos desafios atuais","Técnicas de tolerância ao mal-estar baseadas em DBT","Espaço para escrita expressiva e diário reflexivo","Design estético e convidativo"]'::JSONB,
  '[{"title":"Seção 1: Quem sou eu além das expectativas?","text":"Durante a adolescência, construir sua própria identidade é um trabalho contínuo..."},{"title":"Seção 2: Sobrevivendo a dias difíceis","text":"Quando a mente parecer barulhenta demais, use a técnica TIP (Temperatura, Intensidade, Ritmo)..."},{"title":"Seção 3: Limites Saudáveis nas redes sociais","text":"A comparação social é o maior ladrão da nossa tranquilidade diária..."}]'::JSONB,
  TRUE
),
(
  'a1000004-0004-4004-8004-000000000004',
  'kit-anamnese-contrato-clinico',
  'Kit de Anamnese e Contrato Clínico Completo',
  'Gestão Clínica',
  'Modelos editáveis e validados eticamente pelo CFP.',
  59.90,
  'Documentos essenciais para formalizar seu consultório com elegância e conformidade legal. Inclui contrato de prestação de serviços psicológicos (adulto e infantil), ficha de anamnese completa e estruturada de acordo com as normas vigentes, e modelo de relatório de alta terapêutica.',
  '5 Modelos Editáveis',
  'Arquivos em formato Word (DOCX) + PDFs de referência',
  'Guia explicativo sobre Prontuário Psicológico',
  4.8,
  210,
  'from-[#8A645D]/10 to-[#D4C6C2]/40',
  'Essencial Profissional',
  '["Totalmente editável para você inserir seu logotipo e CRP","Redigido com clareza ética sobre faltas, reajustes e sigilo","Anamnese detalhada contemplando histórico biopsicossocial","Aprovado e revisado por assessoria jurídica e clínica"]'::JSONB,
  '[{"title":"Instruções de Uso","text":"Lembre-se de personalizar os campos em destaque com os dados do seu consultório..."},{"title":"Modelo 1: Ficha de Anamnese","text":"Identificação completa do paciente, queixa principal, histórico familiar..."},{"title":"Modelo 2: Contrato Clínico Adulto","text":"Cláusula 1: Das sessões e duração. Cláusula 2: Dos honorários e cancelamentos..."}]'::JSONB,
  TRUE
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Promover um usuário a admin (execute após criar a conta):
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'seu-email@exemplo.com';
-- ============================================================
