// js/dados-cursos.js

const todosCursos = {
    "Front-End": {
        titulo: "QUIZ FRONT END",
        perguntas: [
            {
                pergunta: "Qual a função da tag <nav>?",
                opcoes: ["Criar tabelas de navegação", "Agrupar links de navegação principal", "Definir o rodapé da página", "Inserir imagens na página"],
                correta: 1
            },
            {
                pergunta: "O que significa SEO?",
                opcoes: ["Sistema de Edição Online", "Otimização para motores de busca", "Serviço de Email Operacional", "Software de Execução Online"],
                correta: 1
            },
            {
                pergunta: "Para que serve a tag <main>?",
                opcoes: ["Criar menus", "Definir o cabeçalho", "Identificar o conteúdo exclusivo e principal da página", "Agrupar imagens"],
                correta: 2
            },
            {
                pergunta: "Qual a tag para o rodapé?",
                opcoes: ["<bottom>", "<end>", "<footer>", "<base>"],
                correta: 2
            },
            {
                pergunta: "Como selecionar uma classe no CSS?",
                opcoes: ["Usando # antes do nome", "Usando . antes do nome", "Usando @ antes do nome", "Usando & antes do nome"],
                correta: 1
            }
        ]
    },
    "Back-End": {
        titulo: "QUIZ BACK END",
        perguntas: [
            {
                pergunta: "O que é o CLR no ecossistema .NET?",
                opcoes: ["Uma biblioteca de funções matemáticas", "O ambiente de execução que gerencia o código", "Um framework para front-end", "Um tipo de banco de dados"],
                correta: 1
            },
            {
                pergunta: "C# é uma linguagem de qual tipo?",
                opcoes: ["Funcional e fracamente tipada", "Orientada a objetos e fortemente tipada", "Scripts e dinamicamente tipada", "Procedural e sem tipagem"],
                correta: 1
            },
            {
                pergunta: "Qual tipo de dado armazena números inteiros?",
                opcoes: ["string", "bool", "float", "int"],
                correta: 3
            },
            {
                pergunta: "O que acontece ao atribuir texto a uma variável 'int'?",
                opcoes: ["O texto é convertido automaticamente", "Ocorre um erro de compilação", "O valor é ignorado", "O programa continua normalmente"],
                correta: 1
            },
            {
                pergunta: "Para que serve o SDK do .NET?",
                opcoes: ["Gerenciar banco de dados", "Criar interfaces visuais", "Ferramentas para desenvolver e rodar aplicações", "Configurar servidores web"],
                correta: 2
            }
        ]
    },
    "Banco-de-Dados": {
        titulo: "QUIZ BANCO DE DADOS",
        perguntas: [
            {
                pergunta: "O que é uma Chave Primária (PK)?",
                opcoes: ["Um campo opcional na tabela", "Um identificador exclusivo para cada registro", "Uma senha de acesso ao banco", "Um tipo de índice secundário"],
                correta: 1
            },
            {
                pergunta: "Qual comando SQL é usado para buscar dados?",
                opcoes: ["INSERT", "UPDATE", "SELECT", "DELETE"],
                correta: 2
            },
            {
                pergunta: "Para que serve o comando JOIN?",
                opcoes: ["Deletar registros duplicados", "Combinar dados de duas ou mais tabelas", "Criar novos campos na tabela", "Ordenar resultados"],
                correta: 1
            },
            {
                pergunta: "O que faz o comando WHERE?",
                opcoes: ["Ordena os resultados", "Agrupa os registros", "Filtra os resultados com base em uma condição", "Cria uma nova tabela"],
                correta: 2
            },
            {
                pergunta: "O que é Normalização?",
                opcoes: ["Processo de backup do banco", "Conversão de dados para texto", "Processo de organização para reduzir redundâncias", "Criação de índices automáticos"],
                correta: 2
            }
        ]
    },
    "Engenharia-de-Software": {
        titulo: "QUIZ ENGENHARIA DE SOFTWARE",
        perguntas: [
            {
                pergunta: "Duração comum de uma Sprint?",
                opcoes: ["De 1 a 2 dias", "De 1 a 4 semanas", "De 2 a 3 meses", "De 6 meses a 1 ano"],
                correta: 1
            },
            {
                pergunta: "Quem é o responsável por priorizar o Backlog?",
                opcoes: ["Scrum Master", "Desenvolvedor", "O Product Owner (PO)", "Tech Lead"],
                correta: 2
            },
            {
                pergunta: "Qual o objetivo da reunião Daily?",
                opcoes: ["Definir o orçamento do projeto", "Encerrar a Sprint atual", "Alinhamento diário e identificação de bloqueios", "Fazer testes no sistema"],
                correta: 2
            },
            {
                pergunta: "O que é o Sprint Backlog?",
                opcoes: ["Lista de clientes do projeto", "Conjunto de tarefas selecionadas para a Sprint atual", "Histórico de Sprints anteriores", "Documento com regras da empresa"],
                correta: 1
            },
            {
                pergunta: "Qual o papel do Scrum Master?",
                opcoes: ["Criar o código principal", "Aprovar pagamentos da equipe", "Definir sozinho todas as tarefas", "Facilitar o processo e remover obstáculos do time"],
                correta: 3
            }
        ]
    },
    "Soft-Skills": {
        titulo: "QUIZ SOFT SKILLS",
        perguntas: [
            {
                pergunta: "O que é comunicação assertiva?",
                opcoes: ["Falar muito alto para ser ouvido", "Expressar ideias com clareza e respeito", "Evitar conflitos a qualquer custo", "Comunicar apenas por escrito"],
                correta: 1
            },
            {
                pergunta: "O que envolve a liderança?",
                opcoes: ["Controlar e punir a equipe", "Inspirar e motivar equipes", "Fazer tudo sozinho", "Evitar tomar decisões"],
                correta: 1
            },
            {
                pergunta: "Para que serve a inteligência emocional?",
                opcoes: ["Memorizar informações técnicas", "Aumentar a velocidade de digitação", "Gerenciar conflitos e tomar decisões equilibradas", "Aprender novos idiomas"],
                correta: 2
            },
            {
                pergunta: "O que é gestão do tempo?",
                opcoes: ["Trabalhar mais horas por dia", "Organizar prioridades e aumentar a produtividade", "Fazer várias coisas ao mesmo tempo", "Delegar todas as tarefas"],
                correta: 1
            },
            {
                pergunta: "O que exige o trabalho em equipe?",
                opcoes: ["Competição entre membros", "Trabalho individual isolado", "Empatia, respeito e foco no objetivo comum", "Hierarquia rígida"],
                correta: 2
            }
        ]
    },
    "Acessibilidade-Libras": {
        titulo: "QUIZ LIBRAS",
        perguntas: [
            {
                pergunta: "O que é Libras?",
                opcoes: ["Língua Brasileira de Sinais", "Linguagem Básica de Redes e Sistemas", "Língua Baseada em Raízes e Sons", "Linguagem Brasileira de Símbolos"],
                correta: 0
            },
            {
                pergunta: "Libras é universal?",
                opcoes: ["Sim, é usada em todo o mundo", "Não, cada país tem sua própria língua de sinais", "Sim, foi padronizada pela ONU", "Não, mas é usada em toda América Latina"],
                correta: 1
            },
            {
                pergunta: "O que é Datilologia?",
                opcoes: ["Estudo dos dedos", "O uso do alfabeto manual para soletrar palavras", "Técnica de digitação rápida", "Leitura labial"],
                correta: 1
            },
            {
                pergunta: "Libras é mímica?",
                opcoes: ["Sim, é apenas gestos", "Não, é uma língua completa com regras gramaticais", "Sim, mas com regras", "Não, é um código morse visual"],
                correta: 1
            },
            {
                pergunta: "Expressão facial é importante em Libras?",
                opcoes: ["Não, apenas as mãos importam", "Sim, ela transmite entonação e sentido à frase", "Só em situações formais", "Apenas para iniciantes"],
                correta: 1
            }
        ]
    },
    "Inteligencia-Artificial": {
        titulo: "QUIZ INTELIGÊNCIA ARTIFICIAL",
        perguntas: [
            {
                pergunta: "O que é IA Generativa?",
                opcoes: ["IA que apenas analisa dados", "IA capaz de criar novos conteúdos como textos e imagens", "IA usada em robótica industrial", "IA que gerencia bancos de dados"],
                correta: 1
            },
            {
                pergunta: "O que caracteriza o Machine Learning?",
                opcoes: ["Programação manual de regras", "O aprendizado automático a partir de padrões em dados", "Criação de interfaces visuais", "Gerenciamento de redes"],
                correta: 1
            },
            {
                pergunta: "O que é Visão Computacional?",
                opcoes: ["Área da IA que ensina máquinas a interpretar imagens", "Sistema de monitoramento de redes", "Ferramenta de edição de vídeos", "Técnica de microcompressão de arquivos"],
                correta: 0
            },
            {
                pergunta: "O que é Viés na IA?",
                opcoes: ["Uma técnica de otimização", "Erros sistemáticos derivados de preconceitos nos dados", "Um tipo de algoritmo de busca", "Uma forma de criptografia"],
                correta: 1
            },
            {
                pergunta: "Exemplo de IA no dia a dia?",
                opcoes: ["Calculadoras científicas", "Planilhas eletrônicas", "Assistentes de voz e sistemas de recomendação", "Editores de texto"],
                correta: 2
            }
        ]
    }
};