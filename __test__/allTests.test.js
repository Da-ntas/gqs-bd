import request from "supertest";
import app from "..";
import { livrosDatabase } from "../dataBase/livros.js";

describe("Funcionalidade 1: POST /login", () => {
    describe("\nTeste - Login (Sucesso)", () => {
        test("Deve tentar realizar o login com sucesso", async () => {
            const response = await request(app).post("/login").send({
                email: "beltrano@contoso.com",
                password: "zxcv"
            });
            expect(response.statusCode).toBe(200);
        })
    })

    describe("\nTeste - Login Erro (senha incorreta)", () => {
        test("Deve tentar realizar o login com erro", async () => {
            const response = await request(app).post("/login").send({
                email: "beltrano@contoso.com",
                password: "abcd"
            });
            expect(response.statusCode).toBe(400);
        })
    })

    describe("\nTeste - Login Erro (email incorreto)", () => {
        test("Deve tentar realizar o login com erro", async () => {
            const response = await request(app).post("/login").send({
                email: "naoexiste@naoexiste.com",
                password: "abcd"
            });
            expect(response.statusCode).toBe(400);
        })
    })

    describe("\nTeste - Propriedades faltando", () => {
        test("Deve tentar realizar o login com propriedades faltantes", async () => {
            const response = await request(app).post("/login").send({
                email: "beltrano@contoso.com"
            });
            expect(response.statusCode).toBe(422);
        })
    })
})


describe("\n\nFuncionalidade 2: GET /livros", () => {
    describe("\nTeste - Listar todos os livros", () => {
        test("Deve retornar todos os livros cadastrados no sistema", async () => {
            const response = await request(app).get("/livros");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(livrosDatabase.length);
        })
    })

    describe("\nTeste - Listar livros por filtros (Titulo, Autor ou assunto)", () => {
        test("Deve retornar os livros do Autor George Orwell", async () => {
            const response = await request(app).get("/livros?autor=George Orwell");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(livrosDatabase.filter(e => e.autor === "George Orwell").length);
        })
    })


    describe("\nTeste - Listar livros por filtros (Titulo, Autor ou assunto) por propriedade inexistente", () => {
        test("Deve retornar os livros com a propriedade Teste = 100 paginas", async () => {
            const response = await request(app).get("/livros?Teste=100 paginas");
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe(`Parâmetro inválido.`);
        })
    })
})


describe("\n\nFuncionalidade 3: GET /livros/:id", () => {
    describe("\nTeste - Listar livro por ID", () => {
        test("Deve retornar livro conforme ID passado", async () => {
            const response = await request(app).get("/livros/7");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe(7);
        })
    })
})