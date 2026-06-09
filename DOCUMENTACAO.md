# Documentação — Plataforma de Materiais Clínicos
## Psic. Luana Sakovicz

> Documento de referência técnica e operacional do projeto.  
> Última atualização: junho de 2026.

---

## Sumário

1. [Visão geral](#1-visão-geral)
2. [Plataformas e serviços utilizados](#2-plataformas-e-serviços-utilizados)
3. [Stack tecnológica](#3-stack-tecnológica)
4. [Estrutura de pastas](#4-estrutura-de-pastas)
5. [Configuração do ambiente local](#5-configuração-do-ambiente-local)
6. [Comandos npm](#6-comandos-npm)
7. [Variáveis de ambiente](#7-variáveis-de-ambiente)
8. [Supabase — banco de dados](#8-supabase--banco-de-dados)
9. [Supabase — Storage (arquivos)](#9-supabase--storage-arquivos)
10. [Supabase — autenticação e perfis](#10-supabase--autenticação-e-perfis)
11. [Rotas da aplicação](#11-rotas-da-aplicação)
12. [API interna (Next.js)](#12-api-interna-nextjs)
13. [Funcionalidades implementadas](#13-funcionalidades-implementadas)
14. [Painel administrativo](#14-painel-administrativo)
15. [Fluxo de compra (simulado)](#15-fluxo-de-compra-simulado)
16. [Download protegido de arquivos](#16-download-protegido-de-arquivos)
17. [Estatísticas (home e admin)](#17-estatísticas-home-e-admin)
18. [Contato e redes sociais](#18-contato-e-redes-sociais)
19. [Arquivos SQL — ordem de execução](#19-arquivos-sql--ordem-de-execução)
20. [Problemas conhecidos e soluções](#20-problemas-conhecidos-e-soluções)
21. [Próximas fases (não implementadas)](#21-próximas-fases-não-implementadas)
22. [Referência rápida de arquivos importantes](#22-referência-rápida-de-arquivos-importantes)

---

## 1. Visão geral

Plataforma web para **venda e entrega de materiais clínicos** (PDFs, Word, links etc.) da Psic. Luana Sakovicz.

**O que o sistema faz hoje:**

- Catálogo público de materiais com filtros por categoria
- Cadastro, login e recuperação de senha
- Compra simulada (sem pagamento real ainda)
- Biblioteca do cliente com leitor de conteúdo e download protegido
- Painel admin para criar, editar, ativar/desativar e excluir produtos
- Upload de capa e arquivos para Supabase Storage
- Métricas reais no admin e estatísticas públicas na home

**Origem do código:** o protótipo monolítico original está em `_legacy/plataforma_de_materiais_luana_sakovicz.tsx`. Foi migrado para **Next.js 15 + App Router + TypeScript + Tailwind + Supabase**.

---

## 2. Plataformas e serviços utilizados

| Plataforma | Uso no projeto |
|------------|----------------|
| **Next.js 15** | Framework React com App Router, SSR, API Routes |
| **Supabase** | PostgreSQL, Auth, Storage, RLS, funções SQL |
| **Vercel** *(recomendado para deploy)* | Hospedagem do frontend (ainda não configurado) |
| **Mercado Pago** | Pagamento real — **não integrado ainda** |
| **Git** | Controle de versão (se configurado localmente) |

### Projeto Supabase

- **URL do projeto:** `https://lkgyfehlblarkwplldhb.supabase.co`
- **Dashboard:** [https://supabase.com/dashboard](https://supabase.com/dashboard) → selecionar o projeto
- **Áreas usadas:**
  - **SQL Editor** — executar schema e migrations
  - **Table Editor** — ver/editar dados
  - **Authentication** — usuários, confirmação de e-mail
  - **Storage** — buckets `product-covers` e `product-files`
  - **Settings → API** — URL e chaves

---

## 3. Stack tecnológica

| Tecnologia | Versão (package.json) | Função |
|------------|----------------------|--------|
| Next.js | ^15.1.0 (build: 15.5.19) | Framework |
| React | ^19.0.0 | UI |
| TypeScript | ^5 | Tipagem |
| Tailwind CSS | ^3.4.0 | Estilos |
| @supabase/supabase-js | ^2.108.0 | Cliente Supabase |
| @supabase/ssr | ^0.12.0 | Auth com cookies (SSR/middleware) |
| lucide-react | ^0.468.0 | Ícones |

**Fontes (Google Fonts via `next/font`):**

- Playfair Display — títulos (`font-serif-brand`)
- Plus Jakarta Sans — corpo (`font-sans-brand`)

**Paleta de cores** (`src/lib/theme.ts`):

- Fundo: `#F3F1F0`
- Primária: `#8A645D`
- Superfície: `#ECE9E8`
- Borda: `#D4C6C2`

---

## 4. Estrutura de pastas

```
site vendas psi.luanasakovicz/
├── DOCUMENTACAO.md          ← este arquivo
├── package.json
├── next.config.ts
├── .env.local               ← credenciais (NÃO commitar)
├── .env.local.example
├── scripts/
│   └── clean-next.mjs       ← limpa cache .next
├── supabase/
│   ├── schema.sql           ← schema completo (instalação inicial)
│   ├── seed.sql             ← 4 produtos de exemplo
│   ├── fix-grants.sql       ← corrige permission denied
│   └── migrations/          ← scripts incrementais
├── src/
│   ├── app/                 ← rotas Next.js (App Router)
│   │   ├── page.tsx         ← home
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── cadastro/
│   │   ├── materiais/
│   │   ├── biblioteca/
│   │   ├── perfil/
│   │   ├── admin/
│   │   └── api/files/download/
│   ├── components/          ← componentes React
│   ├── context/
│   │   └── AppContext.tsx   ← estado global (auth, compras, admin)
│   ├── lib/                 ← utilitários, Supabase, mappers
│   ├── types/               ← TypeScript (Product, Database, etc.)
│   ├── data/                ← mocks de referência (seed)
│   └── middleware.ts        ← proteção de rotas
└── _legacy/                 ← código original TSX
```

---

## 5. Configuração do ambiente local

### Pré-requisitos

- **Node.js** 18+ (recomendado 20 LTS)
- **npm** (vem com Node)
- Conta **Supabase** com projeto criado
- Arquivo `.env.local` na raiz do projeto

### Instalação

```powershell
cd "C:\Users\Gabriel\Desktop\site vendas psi.luanasakovicz"
npm install
```

Copie `.env.local.example` para `.env.local` e preencha as chaves do Supabase.

### Banco de dados (primeira vez)

No **SQL Editor** do Supabase, execute **nesta ordem**:

1. `supabase/schema.sql`
2. `supabase/fix-grants.sql`
3. `supabase/seed.sql` *(opcional — produtos de exemplo)*
4. Todas as migrations em `supabase/migrations/` *(ver seção 19)*

### Tornar um usuário administrador

Após cadastrar no site, no SQL Editor:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'seu-email@exemplo.com';
```

Depois: **logout → login** e acesse `/admin`.

---

## 6. Comandos npm

| Comando | Descrição |
|---------|-----------|
| `npm install` | Instala dependências |
| `npm run dev` | Servidor de desenvolvimento em `http://localhost:3000` |
| `npm run dev:clean` | **Recomendado** — apaga `.next` e inicia o dev (evita erros de cache) |
| `npm run clean` | Apenas remove a pasta `.next` |
| `npm run build` | Build de produção |
| `npm run build:clean` | Limpa cache + build |
| `npm run start` | Serve o build de produção (após `npm run build`) |
| `npm run lint` | ESLint |

### Desenvolvimento diário

```powershell
cd "C:\Users\Gabriel\Desktop\site vendas psi.luanasakovicz"
npm run dev:clean
```

Abra no navegador: **Chrome ou Edge** (`http://localhost:3000`). Evite o preview integrado do Cursor para testes — pode causar erros com React Server Components.

### Produção local

```powershell
npm run build:clean
npm run start
```

---

## 7. Variáveis de ambiente

Arquivo: `.env.local` (na raiz, gitignored)

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Sim | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim | Chave anon/public (JWT ou `sb_publishable_...`) |

**Onde obter:** Supabase Dashboard → **Settings → API → Project URL / anon public key**

Exemplo (`.env.local.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://lkgyfehlblarkwplldhb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
```

> **Nunca** commite `.env.local`. Não é necessária service role key no frontend.

---

## 8. Supabase — banco de dados

### Tabelas

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Perfil do usuário (nome, e-mail, CRP, role) |
| `products` | Materiais clínicos do catálogo |
| `purchases` | Compras (status: pending, approved, refunded) |
| `licenses` | Licenças geradas após compra aprovada |

### Colunas importantes em `products`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `slug` | TEXT | URL amigável (`/materiais/ebook-ansiedade-tcc`) |
| `delivery_files` | JSONB | Lista de arquivos entregues |
| `cover_image_url` | TEXT | URL pública da capa |
| `is_active` | BOOLEAN | `false` = oculto do catálogo |
| `contents` | JSONB | Seções do leitor na biblioteca |
| `details` | JSONB | Lista de itens inclusos |

### Formato de `delivery_files` (JSON)

```json
[
  {
    "type": "pdf",
    "label": "E-book completo",
    "storagePath": "ebook-ansiedade-tcc/1710000000000-arquivo.pdf"
  },
  {
    "type": "link",
    "label": "Vídeo complementar",
    "url": "https://..."
  }
]
```

**Tipos suportados:** `pdf`, `docx`, `link`, `audio`, `zip`, `other`

### Row Level Security (RLS)

- **products:** leitura pública de ativos; admin vê e edita todos
- **profiles:** usuário lê/edita o próprio; admin gerencia todos
- **purchases / licenses:** usuário vê os próprios; admin vê todos
- **Storage:** políticas por bucket (ver seção 9)

### Funções SQL

| Função | Descrição |
|--------|-----------|
| `is_admin()` | Retorna se o usuário logado é admin |
| `handle_new_user()` | Trigger: cria `profiles` ao cadastrar |
| `increment_product_sales(uuid)` | Incrementa contador de vendas do produto |
| `generate_license_code()` | Gera código `LUANA-YYYYMMDD-XXXXXXXX` |
| `get_public_stats()` | Estatísticas públicas para a home |

---

## 9. Supabase — Storage (arquivos)

### Buckets

| Bucket | Público? | Uso |
|--------|----------|-----|
| `product-covers` | **Sim** | Imagens de capa (JPG, PNG, WebP — máx. 5 MB) |
| `product-files` | **Não** | PDFs, Word, áudios, ZIP (máx. 50 MB) |

### Caminhos dos arquivos

- **Capa:** `{slug}-{timestamp}.{ext}` → URL pública
- **Entrega:** `{slug}/{timestamp}-{nome-arquivo}` → download via URL assinada

### Quem pode fazer o quê

| Ação | Admin | Cliente com compra |
|------|-------|-------------------|
| Upload capa | ✅ | ❌ |
| Upload PDF/Word | ✅ | ❌ |
| Ver capa (URL pública) | ✅ | ✅ |
| Baixar arquivo privado | ✅ | ✅ (compra aprovada) |

---

## 10. Supabase — autenticação e perfis

### Fluxos

| Fluxo | Rota | Arquivo principal |
|-------|------|-------------------|
| Cadastro | `/cadastro` | `RegisterForm.tsx` |
| Login | `/login` | `LoginForm.tsx` |
| Recuperar senha | botão no login | `AppContext.resetPassword` |
| Logout | header / perfil | `AppContext.logout` |
| Perfil | `/perfil` | `Profile.tsx` |

### Middleware (`src/middleware.ts`)

Rotas protegidas (exigem login):

- `/biblioteca/*`
- `/perfil`
- `/admin` *(também exige `role = admin`)*

Usuário não logado → redireciona para `/login?redirect=...`

### Configuração recomendada em desenvolvimento

Supabase Dashboard → **Authentication → Providers → Email**:

- Desativar **"Confirm email"** para cadastro instantâneo em dev
- Ou confirmar e-mail manualmente em **Authentication → Users**

### Erros de auth traduzidos

Arquivo: `src/lib/auth-errors.ts`

| Erro Supabase | Mensagem exibida |
|---------------|------------------|
| invalid_credentials | E-mail ou senha incorretos |
| email_not_confirmed | Confirme seu e-mail |
| over_email_send_rate_limit | Limite de envio de e-mails atingido |
| user already registered | E-mail já cadastrado |

---

## 11. Rotas da aplicação

| Rota | Acesso | Descrição |
|------|--------|-----------|
| `/` | Público | Home com hero, destaques, FAQ |
| `/materiais` | Público | Catálogo completo com filtros |
| `/materiais/[slug]` | Público | Detalhes e botão de compra |
| `/login` | Público | Login |
| `/cadastro` | Público | Cadastro |
| `/biblioteca` | Logado | Dashboard do cliente |
| `/biblioteca/[slug]` | Logado + comprou | Leitor + downloads |
| `/perfil` | Logado | Editar nome e CRP |
| `/admin` | Admin | Gestão de produtos e métricas |

---

## 12. API interna (Next.js)

### `GET /api/files/download`

Gera URL assinada temporária (120 segundos) para download de arquivo privado.

**Query params:**

| Param | Obrigatório | Descrição |
|-------|-------------|-----------|
| `productId` | Sim | UUID do produto |
| `path` | Sim | `storagePath` do arquivo no bucket `product-files` |

**Respostas:**

| Status | Corpo |
|--------|-------|
| 200 | `{ "url": "https://...signed..." }` |
| 401 | Não autenticado |
| 403 | Sem compra aprovada |
| 500 | Erro ao gerar URL |

**Arquivo:** `src/app/api/files/download/route.ts`

**Cliente:** `src/lib/protected-download.ts` → usado em `ProductDownloads.tsx`

---

## 13. Funcionalidades implementadas

### Catálogo e vitrine

- Listagem de produtos ativos do Supabase
- Cards com capa (imagem ou gradiente)
- Filtro por categoria: Crianças, Adolescentes, Adultos, Gestão Clínica
- Página de detalhes com descrição, itens inclusos, arquivos (sem download)

### Biblioteca do cliente

- Lista de materiais comprados
- Leitor por seções (`contents`)
- Download protegido de arquivos (`ProductDownloads`)
- Acesso a produtos inativos se já comprados

### Admin

- Criar produto com todos os campos
- **Editar** produto existente (botão lápis)
- Upload de capa e arquivos
- Ativar / desativar / excluir produtos
- Métricas reais: faturamento, vendas, clientes, média de estrelas

### Home

- Estatísticas reais (com fallback se SQL não rodou):
  - Terapeutas na plataforma
  - Materiais disponíveis
- Links reais no footer (Instagram, LinkedIn, WhatsApp, e-mail)

---

## 14. Painel administrativo

**Rota:** `/admin`

### Formulário — campos

| Campo | Descrição |
|-------|-----------|
| Título / Subtítulo | Nome do material |
| Preço / Categoria / Selo | Comercial |
| Foto de capa | Upload JPG/PNG/WebP |
| Páginas / Formato / Bônus | Metadados |
| Descrição | Texto longo |
| Detalhes inclusos | Um item por linha |
| Conteúdo do leitor | Seções separadas por linha em branco |
| Arquivos e links | Upload ou URL |

### Ações na lista de produtos

| Botão | Ação |
|-------|------|
| 👁 Livro | Ver no catálogo (só ativos) |
| ✏️ Lápis | Editar no formulário |
| ⚡ Verde | Ativar (se inativo) |
| ⚡ Âmbar | Desativar |
| 🗑 Vermelho | Excluir *(bloqueado se houver compras)* |

### Regras de exclusão

- **Com compras:** não exclui — use desativar
- **Sem compras:** exclui permanentemente do banco

---

## 15. Fluxo de compra (simulado)

> Pagamento real **não** está integrado. A compra é registrada diretamente como `approved`.

**Arquivo:** `src/lib/purchases.ts` → `simulatePurchase()`

**Passos ao clicar "Adquirir":**

1. Verifica se usuário está logado
2. Verifica se já possui o material
3. Insere registro em `purchases` (status `approved`)
4. Insere registro em `licenses` com código único
5. Chama `increment_product_sales(product_id)`
6. Redireciona para `/biblioteca`

---

## 16. Download protegido de arquivos

```
Cliente clica "Baixar"
        ↓
protected-download.ts chama /api/files/download
        ↓
API verifica sessão + compra aprovada (ou admin)
        ↓
Supabase Storage gera signed URL (120s)
        ↓
Navegador abre o arquivo
```

- **Links externos** (`type: link`): abrem direto, sem API
- **Arquivos no Storage** (`storagePath`): passam pela verificação

---

## 17. Estatísticas (home e admin)

### Home (`HeroSection`)

| Métrica | Fonte |
|---------|-------|
| 100% Embasamento Clínico | Texto fixo |
| Terapeutas na plataforma | `get_public_stats().activeTherapists` |
| Materiais disponíveis | `get_public_stats().activeMaterials` |

**Fallback** (se função SQL não existir): conta produtos ativos e soma `sales`.

**Arquivo:** `src/lib/public-stats.ts`

### Admin (`AdminPanel`)

| Card | Fonte |
|------|-------|
| Total Faturado | Soma de `purchases.amount` (approved) |
| Este mês | Compras do mês atual |
| Vendas Totais | Contagem de compras approved |
| Média de estrelas | Média ponderada por `products.sales` |
| Clientes Ativos | Usuários distintos com compra |

**Arquivo:** `src/lib/admin-stats.ts`

---

## 18. Contato e redes sociais

Centralizado em `src/lib/theme.ts`:

| Campo | Valor |
|-------|-------|
| E-mail | psi.luanasakovicz@gmail.com |
| Telefone | (41) 99136-9954 |
| CRP | CRP 08/48498 |
| Instagram | instagram.com/psi.luanasakovicz |
| LinkedIn | linkedin.com/in/luana-sakovicz-353b7111b |
| WhatsApp | wa.me/5541991369954 |

---

## 19. Arquivos SQL — ordem de execução

### Instalação inicial (projeto novo)

```
1. supabase/schema.sql
2. supabase/fix-grants.sql
3. supabase/seed.sql                    (opcional)
```

### Migrations incrementais (projeto já existente)

Execute no SQL Editor **se ainda não rodou**:

| Arquivo | O que faz |
|---------|-----------|
| `migrations/add-delivery-files.sql` | Coluna `delivery_files` |
| `migrations/add-cover-image.sql` | Coluna `cover_image_url` + bucket `product-covers` |
| `migrations/add-product-files-storage.sql` | Bucket `product-files` + políticas de download |
| `migrations/add-public-stats.sql` | Função `get_public_stats()` |

> `add-product-files-storage.sql` já inclui `get_public_stats`. Se rodou só parte dele, use `add-public-stats.sql` separadamente.

### Corrigir permissões

Se aparecer **"permission denied for table products"**:

```sql
-- Executar supabase/fix-grants.sql
```

---

## 20. Problemas conhecidos e soluções

### Erro: `__webpack_modules__[moduleId] is not a function`

**Causa:** cache corrompido da pasta `.next` (comum no Windows).

**Solução:**

```powershell
npm run dev:clean
```

Não rode `npm run build` e `npm run dev` ao mesmo tempo.

---

### Erro: `Cannot find module './611.js'` / `routes-manifest.json ENOENT`

**Causa:** mesma — cache `.next` inconsistente (HMR interrompido).

**Solução:**

```powershell
npm run dev:clean
```

Se persistir, pare todos os processos Node e apague `.next` manualmente.

---

### Erro: `get_public_stats without parameters in the schema cache`

**Causa:** função SQL não criada no Supabase.

**Solução:** execute `supabase/migrations/add-public-stats.sql`

O site funciona com fallback (materiais contados, terapeutas = 0 até rodar o SQL).

---

### Erro: `email rate limit exceeded`

**Causa:** muitas tentativas de cadastro/recuperação de senha no Supabase.

**Solução:** aguardar 15–60 min; desativar confirmação de e-mail em dev; confirmar usuário manualmente no dashboard.

---

### Erro 409 ao excluir produto

**Causa:** produto tem compras vinculadas (FK RESTRICT).

**Solução:** use **Desativar** em vez de excluir.

---

### Erro ao upload de capa/arquivo

**Causa:** bucket ou políticas não criados.

**Solução:** execute migrations de cover e product-files; confirme que o usuário é `admin` em `profiles`.

---

### Preview do Cursor vs navegador externo

Erros com `SegmentViewNode` / React Client Manifest vêm do inspetor do Cursor. **Use Chrome/Edge** para testes.

---

## 21. Próximas fases (não implementadas)

| Fase | Descrição |
|------|-----------|
| **Mercado Pago** | Pagamento real, webhook, status pending → approved |
| **Deploy Vercel** | Domínio customizado, variáveis de ambiente |
| **E-mail transacional** | Confirmação de compra, recibo |
| **Edição avançada** | Editor visual de `contents`, preview antes de publicar |
| **Analytics** | Google Analytics ou Plausible |
| **SEO** | metadata por produto, sitemap |

---

## 22. Referência rápida de arquivos importantes

| Arquivo | Responsabilidade |
|---------|------------------|
| `src/context/AppContext.tsx` | Auth, compras, CRUD admin |
| `src/components/AdminPanel.tsx` | UI do admin |
| `src/lib/purchases.ts` | Compra simulada |
| `src/lib/product-files.ts` | Upload PDF/Word |
| `src/lib/product-covers.ts` | Upload capa |
| `src/lib/product-form.ts` | Converter produto ↔ formulário |
| `src/lib/mappers/product.ts` | DB row ↔ Product |
| `src/lib/products-server.ts` | Fetch SSR (catálogo) |
| `src/lib/products-client.ts` | Fetch client (admin) |
| `src/lib/supabase/client.ts` | Cliente browser |
| `src/lib/supabase/server.ts` | Cliente server (cookies) |
| `src/lib/supabase/middleware.ts` | Sessão + proteção de rotas |
| `src/types/product.ts` | Tipos Product, DeliveryFile |
| `src/types/database.ts` | Tipos gerados do Supabase |
| `supabase/schema.sql` | Schema completo |
| `next.config.ts` | Cache webpack em dev |

---

## Contato técnico do projeto

- **Cliente:** Psic. Luana Sakovicz
- **E-mail:** psi.luanasakovicz@gmail.com
- **Repositório local:** `C:\Users\Gabriel\Desktop\site vendas psi.luanasakovicz`

---

*Documento gerado para consulta futura. Atualize este arquivo quando novas funcionalidades forem adicionadas (ex.: Mercado Pago, deploy).*
