
# Estratégia Inicial: Auditoria & Mapeamento de Estrutura do Site

## 1. Diagnóstico
O objetivo é auditar e mapear a estrutura atual da Landing Page (App.tsx e componentes) para entender o fluxo de persuasão e a hierarquia de conteúdo. O usuário solicitou um output específico em formato de tabela Markdown, detalhando "Etapa/Bloco", "Descrição", e "Função".

**Análise Preliminar (baseada no App.tsx):**
A estrutura atual parece seguir um fluxo clássico de VSL/Sales Page:
1.  **Header**: Navegação/Logo.
2.  **Hero**: Apresentação principal, headline, imagem do produto ("Gigante" e rotacionada), CTA.
3.  **Intro Text**: "Bridge" textual focada no problema ("Old Age" vs "Anabolic Resistance").
4.  **ReviewTicker**: Prova social imediata.
5.  **TheProblem**: Aprofundamento na dor (Anabolic Resistance).
6.  **Stories (Carousel3D)**: Prova social mais visual/profunda.
7.  **ClinicalEvidence**: Dados científicos e respaldo.
8.  **ScienceTimeline**: Explicação do mecanismo de ação/tempo.
9.  **The Expert (DoctorSection)**: Autoridade (Dr. Shallenberger).
10. **Results**: Casos de sucesso/Depoimentos em cards.
11. **Why This Matters**: Reforço da importância (Consequências da inação).
12. **FAQ**: Quebra de objeções.
13. **Offer Section (PricingOptions)**: O fechamento/venda.
14. **Footer**: Legal e Copyright.

## 2. Squad de Agentes (Sugestão de Skills)

Abaixo, defino as skills ("Superpoderes") ideais para conduzir esta auditoria e as etapas futuras de otimização, conforme solicitado pelo "Protocolo Maestro".

| Skill / Agente | Função Prática | Justificativa |
| :--- | :--- | :--- |
| **`visual-design-foundations`** | **Auditor de UI/UX** | Essencial para avaliar se a hierarquia visual (Hero, Typography, Spacing) está suportando a persuasão. Usa princípios de design para sugerir melhorias estéticas. |
| **`interaction-design`** | **Especialista em Engajamento** | Para analisar as micro-interações (como o "Floating" do Hero, o Carousel3D) e garantir que não distraiam, mas convertam. |
| **`responsive-design`** | **Auditor Mobile** | Crucial, pois vimos problemas recentes com o tamanho da imagem no mobile. Garante que a auditoria contemple a experiência em telas pequenas. |
| **`react-modernization`** | **Arquiteto de Código** | Para mapear a estrutura técnica (App.tsx, Lazy Loading, Componentização) e sugerir refatorações se os blocos estiverem muito acoplados. |
| **`writing-clearly-and-concisely`** | **Auditor de Copy** | Para avaliar se os textos (Headlines, CTAs) estão claros e persuasivos. |

**Agente Principal para esta tarefa (Auditoria):** Eu atuarei como o **Orquestrador**, utilizando os princípios de `visual-design-foundations` e `react-modernization` para gerar o mapa.

## 3. Plano de Ação

1.  **Mapeamento Detalhado**:
    *   Analisar `App.tsx` linha a linha (já realizado na fase de inteligência).
    *   Extrair cada seção, identificar seu componente correspondente e seu propósito.
2.  **Estruturação da Tabela**:
    *   Criar a tabela Markdown com as colunas: "Bloco/Seção", "Componente Técnico", "Descrição/Conteúdo", "Objetivo Persuasivo".
3.  **Entrega**:
    *   Apresentar a tabela ao usuário.
    *   Sugestão de próximos passos baseados na auditoria (ex: onde melhorar a copy, onde ajustar o design).

## 4. Critérios de Sucesso
*   Tabela Markdown entregue.
*   Todas as seções do `App.tsx` listadas na ordem correta.
*   Descrição clara do propósito de cada bloco.
