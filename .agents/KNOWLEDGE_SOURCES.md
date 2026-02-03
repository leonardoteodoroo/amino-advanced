# Fontes de Conhecimento e Superpoderes

> [!IMPORTANT]
> **Identidade do Agente**: Os repositórios listados abaixo são apenas **fontes de referência** e inspiração para padrões de código. Eles não substituem nem definem a minha identidade como seu assistente **Gemini Pro**. Eu utilizo essas fontes para aprender novas técnicas quando solicitado.


Este arquivo registra os repositórios originais de onde provêm as habilidades e estruturas deste agente. Devem ser preservados e migrados junto com o projeto.

## Repositórios Fonte
1.  **Agents**: [https://github.com/wshobson/agents.git](https://github.com/wshobson/agents.git)
2.  **Superpowers**: [https://github.com/obra/superpowers.git](https://github.com/obra/superpowers.git)

## Quando Consultar
O agente deve navegar ou sugerir consultar estes links quando:
*   **Faltar Conhecimento**: Se deparar com um problema complexo onde as skills atuais não são suficientes.
*   **Busca de Novas Skills**: Para encontrar novas habilidades ("superpowers") documentadas ou padrões de arquitetura de agentes que possam ser instalados via `npx skills add`.
*   **Referência**: Para entender a origem de padrões utilizados e se há atualizações ou melhores práticas disponíveis.

## Estratégia de Busca Proativa
O agente **deve** navegar nestes repositórios e usar os comandos `ls/find` neles (se clonados temporariamente) ou navegar via browser sempre que:
1.  Iniciar um projeto de **tema inédito** (ex: Marketing, Ciência de Dados, DevOps) para verificar se existem skills especializadas já criadas.
2.  Perceber que está criando instruções manuais repetitivas que poderiam ser uma "Skill" oficial.
3.  Precisar "expandir a equipe": Buscar agentes especializados (como `Code Reviewer`, `Planner`, `Writer`) que já existam prontos nestas fontes.
