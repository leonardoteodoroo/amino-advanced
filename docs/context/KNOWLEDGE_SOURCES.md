# Fontes de Conhecimento e Superpoderes

Este arquivo registra os repositórios originais de onde provêm as habilidades e estruturas deste agente. Devem ser preservados e migrados junto com o projeto.

## Repositórios Fonte

### 1. Agents
> **Orquestração e Especialistas**
> [https://github.com/wshobson/agents.git](https://github.com/wshobson/agents.git)

**Descrição**: Um sistema abrangente para automação inteligente e orquestração multi-agente. Fornece uma vasta coleção de **plugins granulares**, **agentes especializados** (como Arquitetos de Backend, Desenvolvedores Frontend, Especialistas em QA) e skills modulares para expandir as capacidades do agente em diversas áreas técnicas e de negócios.

### 2. Superpowers
> **Fluxo de Desenvolvimento "Sênior"**
> [https://github.com/obra/superpowers.git](https://github.com/obra/superpowers.git)

**Descrição**: Focado em transformar assistentes de código em "desenvolvedores seniores autônomos". Implementa fluxos de trabalho estruturados para **TDD (Test-Driven Development)**, planejamento de implementação detalhado (brainstorming, design) e revisão de código, ensinando ao agente práticas como YAGNI e DRY.

### 3. Stitch Skills
> **Prototipagem e Design-to-Code**
> [https://github.com/google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills)

**Descrição**: Biblioteca de habilidades projetada para integração com a plataforma **Google Stitch**. Especializada em transformar ideias de design e prompts em código funcional, documentar Design Systems automaticamente e gerar protótipos de UI interativos, facilitando o ciclo entre design e implementação.

---

## Quando Consultar

O agente deve navegar ou sugerir consultar estes links quando:

*   **Faltar Conhecimento**: Se deparar com um problema complexo onde as skills atuais não são suficientes.
*   **Busca de Novas Skills**: Para encontrar novas habilidades ("superpowers") documentadas ou padrões de arquitetura de agentes que possam ser instalados via `npx skills add`.
*   **Referência**: Para entender a origem de padrões utilizados e se há atualizações ou melhores práticas disponíveis.

## Estratégia de Consulta (Sob Demanda)

O agente deve consultar estes links **APENAS SE**:

1.  **Solicitado explicitamente** pelo usuário.
2.  Identificar uma lacuna técnica crítica que bloqueie o projeto e não possa ser resolvida com as skills atuais.
