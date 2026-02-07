# ESTRATEGIA_INICIAL.md

## 1. Diagnóstico 🕵️‍♂️
**O Problema**: A performance do site está degradada, bloqueando a thread principal por **2.8s** (TBT excessivo) e apresentando instabilidade visual (CLS) devido a imagens sem dimensões definidas.

**Métricas Críticas**:
*   **TBT (Total Blocking Time)**: 2.8s (Meta: <200ms).
    *   *Culpados*: Script Evaluation (813ms) e Style & Layout (439ms). Indício de hidratação pesada ou animações síncronas no carregamento.
*   **CLS (Cumulative Layout Shift)**: Elementos de imagem sem `width`/`height`.

**Contexto Técnico**:
*   Stack: React + Vite + Tailwind + Framer Motion.
*   A biblioteca de animação (Framer Motion) é uma suspeita comum para TBT alto se não otimizada (ex: animações de layout pesadas no mount).

---

## 2. Squad de Agentes 🤖

| Skill / Agente | Função Prática | Justificativa |
| :--- | :--- | :--- |
| `debugging-strategies` | **Líder de Análise** | Necessário para usar ferramentas de profiling e identificar *quais* componentes exatos estão travando a thread. |
| `modern-javascript-patterns` | **Engenheiro de Performance** | Aplicar *Code Splitting*, *Lazy Loading* (`React.lazy`) e *Tree Shaking* para reduzir o payload inicial de JS. |
| `visual-design-foundations` | **Especialista de UI** | Corrigir o CLS definindo dimensões explícitas e aspect-ratios nas imagens, garantindo que o layout não "pule". |

---

## 3. Plano de Ação 🗺️

### Fase 1: Estancamento de Sangria (CLS) 🩸
*   **Ação**: Adicionar atributos `width` e `height` (ou classes de aspect-ratio) em todas as imagens citadas no relatório (Garrafas, Hero Images).
*   **Impacto**: Zerar o CLS causado por imagens e melhorar a percepção de estabilidade.

### Fase 2: Redução de Carga Inicial (TBT - JS) 📉
*   **Ação**: Implementar `React.lazy` e `Suspense` para seções que não estão na primeira dobra (ex: `Carousel3D`, `FAQ`, `ClinicalEvidence`).
*   **Ação**: Verificar importações de bibliotecas pesadas (ex: Lucide Icons importados inteiros vs tree-shaken).

### Fase 3: Otimização de Renderização (TBT - Style/Layout) 🎨
*   **Ação**: Auditar animações do `Framer Motion` na seção Hero. Substituir animações de layout pesadas (`layoutId`) por transformações simples (`opacity`, `translate`) onde possível.
*   **Ação**: Garantir `will-change` em elementos animados complexos.

---

## 4. Critérios de Sucesso 🏆
1.  **TBT**: Redução para **< 500ms** (Idealmente < 200ms).
2.  **CLS**: Score **0** para os elementos de imagem listados.
3.  **Lighthouse**: Score de Performance **> 95** (Mobile/Desktop).
