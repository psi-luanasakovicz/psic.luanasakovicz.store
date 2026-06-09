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
15. [Liberação manual de acesso (sem compra)](#15-liberação-manual-de-acesso-sem-compra)
16. [Baralho terapêutico digital](#16-baralho-terapêutico-digital)
17. [Fluxo de compra](#17-fluxo-de-compra)
18. [Download protegido de arquivos](#18-download-protegido-de-arquivos)
19. [Estatísticas (home e admin)](#19-estatísticas-home-e-admin)
20. [Contato e redes sociais](#20-contato-e-redes-sociais)
21. [Deploy (Vercel)](#21-deploy-vercel)
22. [Arquivos SQL — ordem de execução](#22-arquivos-sql--ordem-de-execução)
23. [Problemas conhecidos e soluções](#23-problemas-conhecidos-e-soluções)
24. [Próximas fases (não implementadas)](#24-próximas-fases-não-implementadas)
25. [Referência rápida de arquivos importantes](#25-referência-rápida-de-arquivos-importantes)

---

## 1. Visão geral

Plataforma web para **venda e entrega de materiais clínicos** (PDFs, Word, apps interativos etc.) da Psic. Luana Sakovicz.

**O que o sistema faz hoje:**

- Catálogo público de materiais com filtros por categoria
- Cadastro, login e recuperação de senha
- **Produção:** botão WhatsApp para compra (sem pagamento online ainda)
- **Desenvolvimento:** compra simulada opcional
- Biblioteca do cliente com leitor de conteúdo, download protegido e **baralho interativo**
- Painel admin: CRUD de produtos, métricas, importação do catálogo inicial e **liberação manual de acesso**
- Upload de capa e arquivos para Supabase Storage
- Métricas reais no admin e estatísticas públicas na home
- **Baralho terapêutico** protegido por token (só quem tem acesso na plataforma consegue usar)

**URLs de produção:**

| Serviço | URL |
|---------|-----|
| Loja | https://psic-luanasakovicz-store.vercel.app |
| Repositório (loja) | https://github.com/psi-luanasakovicz/psic.luanasakovicz.store |
| Baralho interativo | https://baralho-terapeutico.vercel.app |
| Repositório (baralho) | https://github.com/psi-luanasakovicz/baralho-terapeutico |

**Origem do código:** o protótipo monolítico original está em `_legacy/plataforma_de_materiais_luana_sakovicz.tsx`. Foi migrado para **Next.js 15 + App Router + TypeScript + Tailwind + Supabase**.

---

## 2. Plataformas e serviços utilizados

| Plataforma | Uso no projeto |
|------------|----------------|
| **Next.js 15** | Framework React com App Router, SSR, API Routes |
| **Supabase** | PostgreSQL, Auth, Storage, RLS, funções SQL |
| **Vercel** | Hospedagem da loja e do baralho interativo |
| **Mercado Pago** | Pagamento real — **não integrado ainda** |
| **GitHub** | Controle de versão e deploy automático na Vercel |

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
| Next.js | ^15.1.0 | Framework |
| React | ^19.0.0 | UI |
| TypeScript | ^5 | Tipagem |
| Tailwind CSS | ^3.4.0 | Estilos |
| @supabase/supabase-js | ^2.108.0 | Cliente Supabase |
| @supabase/ssr | ^0.12.0 | Auth com cookies (SSR/middleware) |
| lucide-react | ^0.468.0 | Ícones |

**Fontes (Google Fonts via `next/font`):**

- Playfair Display — títulos (`font-serif-brand`)
- Plus Jakarta Sans — corpo (`font-sans-brand`)

**Paleta de cores** (`src/lib/theme.ts` — derivada da logomarca):

| Token | Cor | Uso |
|-------|-----|-----|
| Primária | `#88B7A5` | Botões, destaques |
| Primária hover | `#72A190` | Hover |
| Accent (rosa) | `#E8A8B8` | Detalhes, badges |
| Texto | `#527A6B` | Corpo |
| Fundo | `#F8FAF9` | Página |
| Superfície | `#EEF5F2` | Cards |
| Superfície rosa | `#FBF0F3` | Destaques suaves |
| Borda | `#C8DDD4` | Contornos |

**Logo:** `public/logo-horizontal.png` (header).

---

## 4. Estrutura de pastas

```
site vendas psi.luanasakovicz/
├── DOCUMENTACAO.md          ← este arquivo
├── package.json
├── vercel.json              ← preset Next.js na Vercel
├── next.config.ts
├── .env.local               ← credenciais (NÃO commitar)
├── .env.local.example
├── public/
│   ├── logo-horizontal.png
│   └── favicon.ico
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
│   │   │   └── [slug]/app/  ← redireciona ao baralho com token
│   │   ├── perfil/
│   │   ├── admin/
│   │   └── api/
│   │       ├── files/download/
│   │       └── interactive-app/verify/
│   ├── components/
│   │   ├── AdminPanel.tsx
│   │   ├── AdminAccessGrant.tsx   ← liberação manual
│   │   ├── InteractiveAppLauncher.tsx
│   │   └── ...
│   ├── context/
│   │   └── AppContext.tsx   ← estado global (auth, compras, admin)
│   ├── lib/
│   │   ├── interactive-apps.ts
│   │   ├── interactive-app-token.ts
│   │   ├── grant-product-access.ts
│   │   ├── admin-users.ts
│   │   ├── product-access.ts
│   │   ├── checkout-config.ts
│   │   └── ...
│   ├── types/
│   ├── data/
│   └── middleware.ts
└── _legacy/                 ← código original TSX
```

**Projeto separado (baralho):** `C:\Users\Gabriel\Desktop\baralho-terapeutico` — app Vite com validação de token via API da loja.

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

Copie `.env.local.example` para `.env.local` e preencha as chaves.

### Banco de dados (primeira vez)

No **SQL Editor** do Supabase, execute **nesta ordem**:

1. `supabase/schema.sql`
2. `supabase/fix-grants.sql`
3. `supabase/seed.sql` *(opcional — produtos de exemplo)*
4. Todas as migrations em `supabase/migrations/` *(ver seção 22)*

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

Abra no navegador: **Chrome ou Edge** (`http://localhost:3000`).

---

## 7. Variáveis de ambiente

Arquivo: `.env.local` (na raiz, gitignored)

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Sim | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim | Chave anon/public |
| `INTERACTIVE_APP_SECRET` | Sim (baralho) | Chave secreta para assinar tokens de acesso ao baralho |
| `NEXT_PUBLIC_ENABLE_SIMULATED_CHECKOUT` | Não | `true` / `false` — compra simulada em produção |

**Onde obter Supabase:** Dashboard → **Settings → API**

**Gerar `INTERACTIVE_APP_SECRET` (PowerShell):**

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Use o **mesmo valor** em `.env.local` e na Vercel (Settings → Environment Variables).

Exemplo (`.env.local.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://lkgyfehlblarkwplldhb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
INTERACTIVE_APP_SECRET=defina-uma-chave-secreta-longa-aqui
# NEXT_PUBLIC_ENABLE_SIMULATED_CHECKOUT=true
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
| `slug` | TEXT | URL amigável (`/materiais/baralho-emocoes-criancas`) |
| `delivery_files` | JSONB | Lista de arquivos entregues |
| `cover_image_url` | TEXT | URL pública da capa |
| `is_active` | BOOLEAN | `false` = oculto do catálogo |
| `contents` | JSONB | Seções do leitor na biblioteca |
| `details` | JSONB | Lista de itens inclusos |

### Funções SQL

| Função | Descrição |
|--------|-----------|
| `is_admin()` | Retorna se o usuário logado é admin |
| `handle_new_user()` | Trigger: cria `profiles` ao cadastrar |
| `increment_product_sales(uuid)` | Incrementa contador de vendas |
| `generate_license_code()` | Gera código `LUANA-YYYYMMDD-XXXXXXXX` |
| `get_public_stats()` | Estatísticas públicas para a home |
| `verify_interactive_app_access(uuid, text)` | Valida compra para token do baralho |
| `admin_grant_product_access(uuid, uuid, numeric)` | Admin libera material sem compra do cliente |

---

## 9. Supabase — Storage (arquivos)

### Buckets

| Bucket | Público? | Uso |
|--------|----------|-----|
| `product-covers` | **Sim** | Imagens de capa (JPG, PNG, WebP — máx. 5 MB) |
| `product-files` | **Não** | PDFs, Word, áudios, ZIP (máx. 50 MB) |

### Quem pode fazer o quê

| Ação | Admin | Cliente com compra |
|------|-------|-------------------|
| Upload capa | ✅ | ❌ |
| Upload PDF/Word | ✅ | ❌ |
| Ver capa (URL pública) | ✅ | ✅ |
| Baixar arquivo privado | ✅ | ✅ (compra aprovada) |

---

## 10. Supabase — autenticação e perfis

### Middleware (`src/middleware.ts`)

Rotas protegidas (exigem login):

- `/biblioteca/*`
- `/perfil`
- `/admin` *(também exige `role = admin`)*

Usuário não logado → redireciona para `/login?redirect=...`

### Visibilidade do link admin

- **Header:** link "Painel Admin" só para `user.isAdmin`
- **Footer:** link "Painel Administrativo" só para admin logado

---

## 11. Rotas da aplicação

| Rota | Acesso | Descrição |
|------|--------|-----------|
| `/` | Público | Home (hero, destaques, diferenciais, FAQ) |
| `/materiais` | Público | Catálogo com filtros |
| `/materiais/[slug]` | Público | Detalhes; WhatsApp ou compra simulada (dev) |
| `/login` | Público | Login |
| `/cadastro` | Público | Cadastro |
| `/biblioteca` | Logado | Dashboard do cliente |
| `/biblioteca/[slug]` | Logado + comprou | Leitor, downloads e botão do baralho |
| `/biblioteca/[slug]/app` | Logado + comprou | **Redireciona** ao baralho com token |
| `/perfil` | Logado | Editar nome e CRP |
| `/admin` | Admin | Gestão de produtos, métricas e liberação manual |

---

## 12. API interna (Next.js)

### `GET /api/files/download`

Gera URL assinada temporária (120 segundos) para download de arquivo privado.

**Query params:** `productId`, `path` (storagePath)

**Arquivo:** `src/app/api/files/download/route.ts`

---

### `GET /api/interactive-app/verify`

Valida token HMAC do baralho interativo e confirma compra aprovada no banco.

**Query param:** `token`

**Respostas:**

| Status | Significado |
|--------|-------------|
| 200 | `{ "valid": true, "slug": "..." }` |
| 401 | Token inválido ou expirado |
| 403 | Compra não encontrada |
| 400 | Token ausente |

**CORS:** permite origem `https://baralho-terapeutico.vercel.app` (e localhost do baralho em dev).

**Arquivo:** `src/app/api/interactive-app/verify/route.ts`

---

## 13. Funcionalidades implementadas

### Catálogo e vitrine

- Produtos ativos do Supabase
- Cards com capa (imagem ou gradiente)
- Filtro por categoria
- Página de detalhes com **lightbox** na capa (clique para ampliar)
- Nota informativa quando o material inclui app interativo (sem link público)

### Biblioteca do cliente

- Materiais comprados ou liberados manualmente
- Leitor por seções (`contents`)
- Download protegido (`ProductDownloads`)
- **Baralho interativo:** botão abre o app direto (nova aba via redirect com token)
- Acesso a produtos inativos se já possui compra/liberação

### Home (ajustes recentes)

- Removido bloco promocional do app interativo
- Removido card de "Feedback recente" na seção de diferenciais
- Hero: apenas botão "Explorar Materiais" (sem "Conhecer Proposta")

### Admin

- Lista de produtos como tela padrão; formulário só ao **Adicionar** ou **Editar**
- Importar 4 materiais iniciais (catálogo vazio)
- **Liberação manual de acesso** (sem compra) — ver seção 15
- Métricas reais de faturamento e vendas

---

## 14. Painel administrativo

**Rota:** `/admin`

### Gestão de produtos

| Ação | Descrição |
|------|-----------|
| Adicionar material | Botão abre formulário full-width |
| Editar (lápis) | Formulário full-width; lista oculta |
| Ativar / Desativar | Controla visibilidade no catálogo |
| Excluir | Só se não houver compras |
| Importar 4 materiais | Seed via `seed-products.ts` |

### Campos do formulário

Título, subtítulo, preço, categoria, capa, páginas, formato, bônus, descrição, detalhes (linhas), conteúdo do leitor, arquivos de entrega.

> Campos vazios (ex.: bônus) são salvos como vazio — não voltam ao valor anterior.

---

## 15. Liberação manual de acesso (sem compra)

Permite conceder material a uma conta **sem o cliente passar pelo checkout** — cortesia, brinde, teste, etc.

### Onde fica

Painel Admin → seção **"Liberar Acesso Manual (sem compra)"**

### Passo a passo

1. Cliente cria conta no site (cadastro)
2. Admin busca o **e-mail** da conta
3. Seleciona a conta nos resultados
4. Marca um ou mais materiais
5. Clica em **"Conceder acesso (sem compra)"**

O material aparece imediatamente na **Área do Cliente** do cliente.

### O que acontece no banco

A função `admin_grant_product_access` (SECURITY DEFINER):

1. Verifica se quem chama é admin
2. Cria `purchases` com status `approved`
3. Cria `licenses` com código único
4. Incrementa contador de vendas do produto

### Pré-requisito SQL

Execute `supabase/migrations/add-admin-grant-access.sql` no Supabase.

### Arquivos

| Arquivo | Função |
|---------|--------|
| `src/components/AdminAccessGrant.tsx` | UI de busca e liberação |
| `src/lib/admin-users.ts` | Busca perfis por e-mail |
| `src/lib/grant-product-access.ts` | Chama RPC no Supabase |

### Diferença: liberação manual vs pagamento futuro

| Situação | Quem libera |
|----------|-------------|
| Pagamento online (Mercado Pago — futuro) | Automático após confirmação |
| Cortesia / brinde / teste | Admin, manualmente, nesta seção |

---

## 16. Baralho terapêutico digital

App externo integrado ao material `baralho-emocoes-criancas`.

### Fluxo de acesso

```
Cliente com compra/liberação
        ↓
Biblioteca → "Abrir baralho interativo"
        ↓
/biblioteca/baralho-emocoes-criancas/app (servidor valida compra)
        ↓
Gera token HMAC (validade: 2 horas)
        ↓
Redirect para baralho-terapeutico.vercel.app/?token=...
        ↓
Baralho chama /api/interactive-app/verify
        ↓
Se válido → app carrega | Se não → tela "Acesso restrito"
```

### Proteção

| Acesso | Resultado |
|--------|-----------|
| URL direta do baralho (sem token) | **Bloqueado** |
| `/biblioteca/.../app` sem login | Redireciona para login |
| Logado sem compra/liberação | 404 |
| Logado com acesso | Baralho abre com token |

### Configuração

1. `INTERACTIVE_APP_SECRET` na loja (local + Vercel)
2. SQL `add-interactive-app-access-rpc.sql` no Supabase
3. Deploy da loja e do baralho (baralho valida token via API)

### Arquivos (loja)

| Arquivo | Função |
|---------|--------|
| `src/lib/interactive-apps.ts` | Config do app (slug, URL, badge) |
| `src/lib/interactive-app-token.ts` | Cria e valida tokens |
| `src/lib/product-access.ts` | Exige compra nas rotas protegidas |
| `src/app/biblioteca/[slug]/app/page.tsx` | Redirect com token |
| `src/components/InteractiveAppLauncher.tsx` | Botão na biblioteca |

### Arquivos (baralho — projeto separado)

| Arquivo | Função |
|---------|--------|
| `src/access-gate.js` | Bloqueia sem token; chama API da loja |
| `src/main.js` | Só carrega o jogo após validação |

### Limitação

Se alguém **copiar o link com token** logo após abrir, ainda pode usar por até **2 horas**. Depois expira.

---

## 17. Fluxo de compra

### Produção (padrão)

- Botão **"Falar no WhatsApp"** na página do produto
- Checkout simulado **desligado** (`checkout-config.ts`)
- Após pagamento manual: admin usa **liberação manual** (seção 15) ou, no futuro, webhook do Mercado Pago

### Desenvolvimento / testes

Compra simulada ativa quando:

- `NODE_ENV=development`, ou
- `NEXT_PUBLIC_ENABLE_SIMULATED_CHECKOUT=true`

**Arquivo:** `src/lib/purchases.ts` → `simulatePurchase()`

**Passos ao clicar "Adquirir":**

1. Verifica login
2. Verifica se já possui o material
3. Insere `purchases` (approved) + `licenses`
4. Incrementa vendas
5. Redireciona para `/biblioteca`

---

## 18. Download protegido de arquivos

```
Cliente clica "Baixar"
        ↓
protected-download.ts → /api/files/download
        ↓
Verifica sessão + compra aprovada (ou admin)
        ↓
Signed URL (120s) do Supabase Storage
        ↓
Navegador baixa o arquivo
```

- **Links externos** (`type: link`): abrem direto
- **Arquivos no Storage**: passam pela verificação

---

## 19. Estatísticas (home e admin)

### Home (`HeroSection`)

- Terapeutas na plataforma → `get_public_stats().activeTherapists`
- Materiais disponíveis → `get_public_stats().activeMaterials`

**Arquivo:** `src/lib/public-stats.ts`

### Admin

Total faturado, vendas do mês, vendas totais, clientes ativos com compra.

**Arquivo:** `src/lib/admin-stats.ts`

---

## 20. Contato e redes sociais

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

## 21. Deploy (Vercel)

### Loja

1. Repositório conectado: `psi-luanasakovicz/psic.luanasakovicz.store`
2. **Framework Preset:** Next.js (não usar Output Directory `public`)
3. Variáveis obrigatórias:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `INTERACTIVE_APP_SECRET`
4. Push na branch `main` → deploy automático

### Baralho

1. Repositório: `psi-luanasakovicz/baralho-terapeutico`
2. Deploy automático na Vercel ao push em `main`

### Supabase Auth (produção)

Em **Authentication → URL Configuration**, incluir:

- Site URL: `https://psic-luanasakovicz-store.vercel.app`
- Redirect URLs: mesma URL + `/login`, `/cadastro`

---

## 22. Arquivos SQL — ordem de execução

### Instalação inicial

```
1. supabase/schema.sql
2. supabase/fix-grants.sql
3. supabase/seed.sql                    (opcional)
```

### Migrations incrementais

Execute no SQL Editor **se ainda não rodou**:

| Arquivo | O que faz |
|---------|-----------|
| `add-delivery-files.sql` | Coluna `delivery_files` |
| `add-cover-image.sql` | Coluna `cover_image_url` + bucket capas |
| `add-product-files-storage.sql` | Bucket `product-files` + políticas |
| `add-public-stats.sql` | Função `get_public_stats()` |
| `add-interactive-app-access-rpc.sql` | Valida compra para token do baralho |
| `add-admin-grant-access.sql` | Admin libera material sem compra |

### Corrigir permissões

Se aparecer **"permission denied for table products"**:

```sql
-- Executar supabase/fix-grants.sql
```

---

## 23. Problemas conhecidos e soluções

### Cache `.next` corrompido

```powershell
npm run dev:clean
```

### Função SQL não encontrada (`admin_grant_product_access`, `verify_interactive_app_access`)

Execute as migrations correspondentes na seção 22.

### Baralho abre para todo mundo (sem "Acesso restrito")

- Confirme deploy do **baralho** com `access-gate.js`
- Teste em aba anônima com hard refresh

### Baralho não abre nem para quem comprou

- `INTERACTIVE_APP_SECRET` configurado na Vercel?
- Redeploy após adicionar a variável
- Migration `add-interactive-app-access-rpc.sql` rodada?

### Checkout simulado em produção

Por padrão está **desligado**. Só ative com `NEXT_PUBLIC_ENABLE_SIMULATED_CHECKOUT=true` para testes.

### Erro 409 ao excluir produto

Produto tem compras — use **Desativar**.

### Preview do Cursor

Use **Chrome/Edge** para testes; o inspetor do Cursor pode causar erros com RSC.

---

## 24. Próximas fases (não implementadas)

| Fase | Descrição |
|------|-----------|
| **Mercado Pago** | Pagamento real, webhook, `pending` → `approved` automático |
| **Domínio customizado** | `psic.luanasakovicz.store` |
| **E-mail transacional** | Confirmação de compra, recibo |
| **Revogar acesso** | Admin remover liberação/compra |
| **Analytics / SEO** | Métricas e metadata por produto |

---

## 25. Referência rápida de arquivos importantes

| Arquivo | Responsabilidade |
|---------|------------------|
| `src/context/AppContext.tsx` | Auth, compras, CRUD admin |
| `src/components/AdminPanel.tsx` | UI do admin |
| `src/components/AdminAccessGrant.tsx` | Liberação manual de acesso |
| `src/lib/purchases.ts` | Compra simulada |
| `src/lib/grant-product-access.ts` | RPC liberação admin |
| `src/lib/interactive-app-token.ts` | Tokens do baralho |
| `src/lib/interactive-apps.ts` | Config apps interativos |
| `src/lib/product-access.ts` | Guard de rotas da biblioteca |
| `src/lib/checkout-config.ts` | Proteção checkout em produção |
| `src/lib/product-files.ts` | Upload PDF/Word |
| `src/lib/product-covers.ts` | Upload capa |
| `src/lib/seed-products.ts` | Importação catálogo inicial |
| `src/lib/supabase/middleware.ts` | Sessão + proteção de rotas |
| `src/types/database.ts` | Tipos Supabase |
| `supabase/schema.sql` | Schema completo |
| `vercel.json` | Config deploy Vercel |

---

## Contato técnico do projeto

- **Cliente:** Psic. Luana Sakovicz
- **E-mail:** psi.luanasakovicz@gmail.com
- **Repositório local (loja):** `C:\Users\Gabriel\Desktop\site vendas psi.luanasakovicz`
- **Repositório local (baralho):** `C:\Users\Gabriel\Desktop\baralho-terapeutico`

---

*Atualize este arquivo quando novas funcionalidades forem adicionadas (ex.: Mercado Pago, domínio customizado).*
