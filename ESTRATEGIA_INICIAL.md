# ESTRATEGIA_INICIAL.md: Resgate & Polimento do "Advanced Bio"

## 1. Diagnóstico Clínico
O paciente (`projetoantigo`) apresenta um quadro clássico de "Desalinhamento de Identidade" e "Obstrução Estrutural".

*   **Sintomas Visuais:** O design atual usa "Glassmorphism" (efeito de vidro/blur), fontes genéricas e gradientes modernos. Isso gera baixa legibilidade e desconfiança no público 60+ (idosos), que precisa de contraste alto, solidez e clareza "jornalística/médica".
*   **Patologia Estrutural:** O arquivo `App.tsx` é um monólito de 460+ linhas (Spaghetti Code).
*   **Comprometimento de Performance:** CLS (Layout Shift) visível e vestígios de código não utilizado.

## 2. Squad de Agentes (Skills Selecionadas)

| Skill | Função Prática | Justificativa |
| :--- | :--- | :--- |
| **`accessibility-compliance`** | **Auditor Sênior** | O avatar (60+) exige contraste AAA e fontes grandes. |
| **`visual-design-foundations`** | **Designer Chefe** | Implementar o "Clinical Light Theme" (Slate/Blue, Papel Sólido/Trust). |
| **`react-modernization`** | **Arquiteto de Software** | Desmembrar o `App.tsx` em componentes atômicos. |
| **`verification-before-completion`** | **Corregedor Implacável** | Garante que NENHUMA tarefa seja dada como "pronta" sem prova (Iron Law). |

## 3. Plano de Ação Cirúrgico usando `writing-plans` e `subagent-driven-development`


### Fase 1: Saneamento & Fundação (Limpeza)
1.  **Expurgo:** Eliminar código morto e arquivos temporários.
2.  **Configuração do Design System:** Atualizar `tailwind.config.js` com a paleta "Clinical" (Slate 800/600, Blue 900) e tipografia (Playfair/Inter) sólida.
3.  **Auditoria Inicial:** Rodar script de verificação de acessibilidade.

### Fase 2: Reconstrução Estrutural (Refactor)
4.  **Desmontagem do Monólito:** Extrair seções do `App.tsx` para componentes organizados.

### Fase 3: Polimento Visual (Harmonia)
5.  **Aplicação do Tema:** Implementar o design validado (Cards sólidos, tipografia legível).
6.  **Ajuste Fino Mobile:** Foco total na experiência em telas pequenas (tráfego pago mobile).

### Fase 4: Auditoria Final (The Iron Law)
7.  **Protocolo de Verificação:** Build limpo, Lighthouse >90 (Mobile), Acessibilidade aprovada.

## 4. Critérios de Sucesso
*   **Embasamento:** Escolhas visuais baseadas em contraste AAA e diretrizes de usabilidade sênior.
*   **Identidade:** "Authority Site" (confiável, legível, científico).
*   **Performance:** Zero Layout Shift, carregamento instantâneo.
