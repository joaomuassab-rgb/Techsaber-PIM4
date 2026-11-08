using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace TechSaber.Api;

public record PerguntaDto(string Mensagem);

public static class AssistenteEndpoints
{
    private static readonly HttpClient Http = new() { Timeout = TimeSpan.FromSeconds(60) };

    public static void MapAssistente(this WebApplication app)
    {
        app.MapPost("/api/assistente", async (PerguntaDto pergunta, IConfiguration config) =>
        {
            var chave = config["Anthropic:ApiKey"];
            if (string.IsNullOrWhiteSpace(chave))
                return Results.Problem("Chave da IA não configurada.", statusCode: 500);

            if (string.IsNullOrWhiteSpace(pergunta.Mensagem) || pergunta.Mensagem.Length > 1000)
                return Results.BadRequest("Mensagem inválida.");

            var corpo = new
            {
                model = "claude-haiku-5-5",
                max_tokens = 600,
                system = "Você é o Plus AI, o assistente virtual da TechSaber+. " +
         "A TechSaber+ é uma plataforma de estudos focada em tecnologia, que ajuda o aluno a aprender " +
         "e desenvolver habilidades em Front-End, Back-End, Banco de Dados, Engenharia de Software, " +
         "Soft Skills, Libras e Inteligência Artificial. O aluno avança por artigos, trilhas, quizzes " +
         "e avaliações finais, ganha conquistas e mantém uma sequência diária de estudos (ofensiva). " +
         "Responda a qualquer mensagem de forma natural e simpática. Se for uma saudação ou conversa informal, " +
         "responda com cordialidade e ofereça ajuda com a plataforma. " +
         "Se perguntarem sobre a plataforma ou como usá-la, explique de forma simples e passo a passo. " +
         "Não responda perguntas de quizzes ou avaliações e não entregue respostas prontas de atividades: " +
         "explique conceitos, mas deixe o aluno pensar. Responda em português, de forma clara e objetiva.",
                messages = new[] { new { role = "user", content = pergunta.Mensagem } }
            };

            using var req = new HttpRequestMessage(HttpMethod.Post, "https://api.anthropic.com/v1/messages");
            req.Headers.Add("x-api-key", chave);
            req.Headers.Add("anthropic-version", "2023-06-01");
            req.Content = new StringContent(JsonSerializer.Serialize(corpo), Encoding.UTF8, "application/json");

            using var resp = await Http.SendAsync(req);
            var json = await resp.Content.ReadAsStringAsync();

            if (!resp.IsSuccessStatusCode)
                return Results.Problem("A IA não respondeu agora. Tente de novo.", statusCode: 502);

            using var doc = JsonDocument.Parse(json);
            var texto = doc.RootElement.GetProperty("content")[0].GetProperty("text").GetString();

            return Results.Ok(new { resposta = texto });
        });
    }
}