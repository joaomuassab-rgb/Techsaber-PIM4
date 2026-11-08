using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using TechSaber.Api;
using TechSaber.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

// Libera o site (Go Live) a chamar a API
builder.Services.AddCors(opt => opt.AddDefaultPolicy(p => p
    .WithOrigins("http://127.0.0.1:5500", "http://localhost:5500")
    .AllowAnyHeader()
    .AllowAnyMethod()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();

// Armazenamento temporário (será trocado pelo banco de dados)
var usuarios = new List<Usuario>
{
    new Usuario { Id = 1, Nome = "Aluno Teste",     Email = "aluno@techsaber.com",     Perfil = "Aluno",         SenhaHash = GerarHashSenha("aluno123") },
    new Usuario { Id = 2, Nome = "Professor Teste", Email = "professor@techsaber.com", Perfil = "Professor",     SenhaHash = GerarHashSenha("prof123") },
    new Usuario { Id = 3, Nome = "Admin Teste",     Email = "admin@techsaber.com",     Perfil = "Administrador", SenhaHash = GerarHashSenha("admin123") }
};

// Cadastro de alunos
app.MapPost("/api/alunos/cadastro", (CadastroAlunoRequest dados) =>
{
    if (string.IsNullOrWhiteSpace(dados.Nome) ||
        string.IsNullOrWhiteSpace(dados.Email) ||
        string.IsNullOrWhiteSpace(dados.Senha))
    {
        return Results.BadRequest(new { mensagem = "Preencha nome, e-mail e senha." });
    }

    bool emailExiste = usuarios.Any(u =>
        u.Email.Equals(dados.Email.Trim(), StringComparison.OrdinalIgnoreCase));

    if (emailExiste)
    {
        return Results.Conflict(new { mensagem = "Este e-mail já está cadastrado." });
    }

    var novoAluno = new Usuario
    {
        Id = usuarios.Count + 1,
        Nome = dados.Nome.Trim(),
        Email = dados.Email.Trim(),
        Perfil = "Aluno",
        SenhaHash = GerarHashSenha(dados.Senha)
    };

    usuarios.Add(novoAluno);

    return Results.Created(
        $"/api/alunos/{novoAluno.Id}",
        new
        {
            novoAluno.Id,
            novoAluno.Nome,
            novoAluno.Email,
            novoAluno.Perfil,
            mensagem = "Aluno cadastrado com sucesso!"
        });
})
.WithName("CadastrarAluno");

// Login: confere e-mail e senha e devolve o perfil
app.MapPost("/api/auth/login", (LoginRequest dados) =>
{
    if (string.IsNullOrWhiteSpace(dados.Email) || string.IsNullOrWhiteSpace(dados.Senha))
    {
        return Results.BadRequest(new { mensagem = "Informe e-mail e senha." });
    }

    var usuario = usuarios.FirstOrDefault(u =>
        u.Email.Equals(dados.Email.Trim(), StringComparison.OrdinalIgnoreCase));

    if (usuario is null || !VerificarSenha(dados.Senha, usuario.SenhaHash))
    {
        return Results.Json(new { mensagem = "E-mail ou senha incorretos." }, statusCode: 401);
    }

    return Results.Ok(new
    {
        usuario.Id,
        usuario.Nome,
        usuario.Email,
        usuario.Perfil,
        mensagem = "Login realizado com sucesso!"
    });
})
.WithName("Login");

// Assistente de IA (definido em Assistente.cs)
app.MapAssistente();

app.Run();

// Gera o hash no formato: iterações.salt.hash
string GerarHashSenha(string senha)
{
    byte[] salt = RandomNumberGenerator.GetBytes(16);

    byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
        senha,
        salt,
        100000,
        HashAlgorithmName.SHA256,
        32
    );

    return $"100000.{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}";
}

// Confere a senha digitada com o hash guardado
bool VerificarSenha(string senha, string hashGuardado)
{
    var partes = hashGuardado.Split('.');
    if (partes.Length != 3) return false;

    int iteracoes = int.Parse(partes[0]);
    byte[] salt = Convert.FromBase64String(partes[1]);
    byte[] hashEsperado = Convert.FromBase64String(partes[2]);

    byte[] hashDigitado = Rfc2898DeriveBytes.Pbkdf2(
        senha,
        salt,
        iteracoes,
        HashAlgorithmName.SHA256,
        hashEsperado.Length
    );

    return CryptographicOperations.FixedTimeEquals(hashDigitado, hashEsperado);
}

record CadastroAlunoRequest(string Nome, string Email, string Senha);

record LoginRequest(string Email, string Senha);