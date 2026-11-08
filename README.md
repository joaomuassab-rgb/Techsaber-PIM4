# TechSaber+

Plataforma digital de aprendizado em tecnologia, desenvolvida como trabalho acadêmico (PIM IV) no curso de **Análise e Desenvolvimento de Sistemas**, UNIP, 2026.

---

## Sobre

O TechSaber+ é uma plataforma web gamificada para aprender tecnologia. O aluno escolhe um curso, avança por artigos e quizzes em uma trilha, ganha conquistas e mantém uma sequência diária de estudos (ofensiva).

Áreas disponíveis: Front-End, Back-End, Banco de Dados, Engenharia de Software, Soft Skills, Acessibilidade (Libras) e Inteligência Artificial.

---

## Funcionalidades

- Cadastro de aluno, com validação de campos, e-mail único e senha protegida por hash
- Login com três perfis: Aluno, Professor e Administrador
- Biblioteca de cursos organizada em categorias, com busca
- Trilha de cada curso: 2 artigos, 2 quizzes e uma avaliação final
- Quizzes com correção imediata (é preciso acertar 3 de 5)
- Avaliação final (é preciso acertar 7 de 10 para concluir o módulo)
- Ofensiva diária e perfil com estatísticas
- Painel do professor para criar, editar e remover atividades
- Painel do administrador com visão geral, gerenciamento de professores e alunos e edição de perfil
- Plus AI, assistente que responde dúvidas sobre a plataforma
- Layout responsivo, funcionando em computador e celular

---

## Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Front-end | HTML5, CSS3 e JavaScript puro |
| Back-end | C# com .NET 10 (ASP.NET Core) |
| Segurança | Senhas com PBKDF2 (SHA-256, 100.000 iterações) |
| Banco de dados | SQL relacional (em desenvolvimento) |
| Gerenciamento | Scrum |

---

## Camada front-end

As páginas são HTML, CSS e JavaScript, sem frameworks:

- `index.html`: página inicial, com a apresentação e o assistente
- `login.html` e `cadastro.html`: acesso e criação de conta
- `dashboard-aluno.html`, `dashboard-professor.html` e `dashboard-admin.html`: painéis de cada perfil
- `biblioteca.html`, `curso.html` e `trilhas.html`: navegação pelos cursos
- `artigo.html`, `quiz-modulo.html` e `avaliacao.html`: conteúdo, quizzes e avaliação
- `perfil.html`: dados e estatísticas do aluno

**Estado atual:** o login e o cadastro funcionam no navegador com dados simulados. A integração com a API está em andamento.

---

## Back-end (API)

A API está em `backend/TechSaber.Api` e expõe:

- `POST /api/alunos/cadastro`: cadastra um aluno
- `POST /api/auth/login`: valida e-mail e senha
- `POST /api/assistente`: envia a pergunta ao assistente

**Estado atual:** os usuários ficam na memória e são perdidos ao reiniciar a API. A persistência em banco de dados será feita na próxima etapa.

---

## Como rodar localmente

### Front-end

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

### API

Requisito: [.NET 10 SDK](https://dotnet.microsoft.com/download).

```bash
cd backend/TechSaber.Api
dotnet run
```

A API roda em `http://localhost:5133`.

### Assistente com IA (opcional)

O Plus AI responde as perguntas prontas sem precisar de chave. Para ativar a IA, guarde a chave da Anthropic dentro da pasta da API:

```bash
dotnet user-secrets set "Anthropic:ApiKey" "sua-chave"
```

---

## Estrutura de pastas

```
TechSaber/
├── backend/
│   └── TechSaber.Api/
│       ├── Models/
│       ├── Program.cs
│       ├── Assistente.cs
│       └── TechSaber.Api.csproj
├── css/
├── js/
├── index.html
├── login.html
├── cadastro.html
├── dashboard-aluno.html
├── dashboard-professor.html
├── dashboard-admin.html
├── biblioteca.html
├── curso.html
├── trilhas.html
├── artigo.html
├── quiz-modulo.html
├── avaliacao.html
├── perfil.html
└── README.md
```

---

## Equipe

| Nome | R.A. |
|------|------|
| Fernanda da Rocha Gomes | F365166 |
| Anna Beatriz Froes da Silva | H712CG3 |
| João Lucas Lemes Muassab | H77GCH3 |
| Lucas Renato Ribeiro Sant'Ana | R802EB9 |

---

## Licença

Projeto acadêmico desenvolvido para fins educacionais. Uso sujeito à autorização da equipe.