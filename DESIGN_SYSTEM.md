# DESIGN SYSTEM — TOKENS SEMÂNTICOS

## TAREFA

Este documento serve como a "Bíblia Visual" do projeto.

## 🚨 IMPORTANTE: FILOSOFIA DE ADAPTAÇÃO (LEIA ANTES)

Este sistema define a **ESTRUTURA** (os nomes das coisas), não a **ALMA** (a aparência final).

1.  **O "Camaleão":** Para cada novo projeto (ex: Manicure vs. Suplemento), você deve redefinir o que os tokens representam.
    *   *Ex:* Em um projeto sério, `radius-md` pode ser `4px`. Em um projeto divertido, pode ser `20px`.
2.  **Permissão para Surpreender (Licensed to Wow):**
    *   O Design System garante a consistência das páginas internas e fluxos padrão.
    *   **PARA SEÇÕES DE IMPACTO (Hero, Ofertas):** Você tem permissão total para quebrar as regras se o objetivo for criar uma experiência visual única ("Wow Factor"). Não deixe o sistema matar a criatividade.
3.  **Contexto é Rei:** A estética deve servir ao nicho. Não force um visual "clean/tech" em um produto "rústico/orgânico".

## INSTRUÇÕES DE USO

*   Use os tokens abaixo como base para comunicação e codificação.
*   **Mobile-First**: Comece pensando em telas pequenas e escale para desktop.

---

## 1. CORES (Colors)

### Texto
*   **text-primary**: Cor principal de títulos e texto importante (alto contraste).
*   **text-secondary**: Cor de texto de apoio, legendas, descrições.
*   **text-muted**: Cor de placeholders, dicas, texto desabilitado.
*   **text-on-dark**: Texto claro sobre fundos escuros.
*   **text-on-brand**: Texto sobre cor primária da marca (geralmente branco).

### Superfícies (Backgrounds)
*   **surface-page**: Fundo principal da página.
*   **surface-section**: Fundo de seções alternadas (para separar blocos de conteúdo).
*   **surface-card**: Fundo de cards e elementos contidos.
*   **surface-subtle**: Fundos sutis, áreas de destaque leve.
*   **surface-elevated**: Elementos elevados (modais, tooltips).

### Ações (Actions & Buttons)
*   **action-primary**: Botões principais, links de destaque.
*   **action-primary-hover**: Estado hover de `action-primary`.
*   **action-secondary**: Botões secundários (bordas ou fundo sutil).
*   **action-strong**: CTAs de alta conversão (geralmente cor de destaque forte/quente).
*   **action-strong-hover**: Estado hover de `action-strong`.

### Gradientes (Gradients)
*   **gradient-primary**: Gradiente da marca (uso em heros ou fundos).
*   **gradient-cta**: Gradiente de alta conversão para botões `action-strong`.

### Bordas (Borders)
*   **border-default**: Bordas padrão de separação.
*   **border-subtle**: Bordas muito sutis (divisores leves).
*   **border-focus**: Cor do anel de foco (acessibilidade).

### Status
*   **status-success**: Sucesso, confirmação, garantia.
*   **status-warning**: Alertas, escassez ("restam poucas unidades").
*   **status-error**: Erros, problemas.

---

## 2. ESPAÇAMENTO (Spacing)

Use estes valores para `margin`, `padding` e `gap`.

*   **space-1**: 4px (mínimo, ajuste fino)
*   **space-2**: 8px (ícones inline, gaps pequenos)
*   **space-3**: 12px (gaps internos de componentes)
*   **space-4**: 16px (padding padrão de containers)
*   **space-6**: 24px (padding de cards, separação de elementos médios)
*   **space-8**: 32px (gaps entre seções pequenas)
*   **space-12**: 48px (padding de seções intermédias)
*   **space-16**: 64px (padding vertical de seções grandes - Desktop)
*   **space-20**: 80px (seções Hero - Desktop)

---

## 3. TIPOGRAFIA (Typography)

### Tamanhos (Font Sizes)
*   **text-xs**: 12px (badges, labels pequenos)
*   **text-sm**: 14px (texto secundário, legendas)
*   **text-base**: 16px (corpo de texto padrão - leitura)
*   **text-lg**: 18px (texto de destaque, intro)
*   **text-xl**: 20px (subtítulos menores)
*   **text-2xl**: 24px (títulos de cards)
*   **text-3xl**: 30px (títulos de seção)
*   **text-4xl**: 36px (títulos principais - Mobile)
*   **text-5xl**: 48px (Headlines Hero - Desktop)

### Pesos (Font Weights)
*   **font-normal**: 400 (corpo de texto)
*   **font-medium**: 500 (ênfase leve, links)
*   **font-semibold**: 600 (subtítulos, botões)
*   **font-bold**: 700 (Headlines, CTAs)

---

## 4. EFEITOS (Effects)

### Bordas & Sombras (Radius & Shadows)
*   **radius-sm**: 4px (inputs, badges)
*   **radius-md**: 8px (botões padrão)
*   **radius-lg**: 12px (cards)
*   **radius-xl**: 16px (cards grandes/destaque)
*   **radius-full**: 9999px (pills, avatares, botões arredondados)

*   **shadow-sm**: Sombra sutil (inputs, estados inativos)
*   **shadow-md**: Sombra média (cards, dropdowns)
*   **shadow-lg**: Sombra forte (modais, elementos flutuantes)
*   **shadow-card**: Sombra específica para cards de conteúdo.
*   **shadow-card-hover**: Sombra elevada para hover em cards.
*   **shadow-cta**: Sombra brilhante/colorida para botões de venda.

### Animações (Transitions)
*   **transition-fast**: 150ms (efeitos de hover simples, cores)
*   **transition-normal**: 300ms (transformações de tamanho, posição)
*   **transition-slow**: 500ms (entrada de elementos, modais)

---

## 5. BREAKPOINTS (Responsividade)

*   **bp-mobile**: < 768px (Padrão inicial - Mobile First)
*   **bp-tablet**: >= 768px
*   **bp-desktop**: >= 1024px
*   **bp-wide**: >= 1280px

---

## 6. COMPONENTES PADRÃO (Blueprints)

### Botões
*   **Primary**: `bg-action-primary` + `text-on-brand` + `radius-md` + `shadow-sm`
*   **CTA (Venda)**: `bg-grad-cta` + `text-white` + `font-bold` + `shadow-cta` + `transform-hover-scale`
*   **Secondary**: `bg-transparent` + `border-default` + `text-primary`

### Cards
*   **Base**: `bg-surface-card` + `radius-lg` + `shadow-card` + `p-space-6`

### Inputs
*   **Base**: `bg-surface-card` + `border-default` + `radius-sm` + `text-base`
*   **Focus**: `border-focus` + `ring-2`
