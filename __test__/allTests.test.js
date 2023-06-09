import request from "supertest";
import app from "..";
import { commentDatabase } from "../dataBase/comments";
import { livrosDatabase } from "../dataBase/livros.js";

describe("Chamada: POST /login", () => {
    describe("\nFuncionalidade 1 - Login (Sucesso)", () => {
        test("Deve tentar realizar o login com sucesso", async () => {
            const response = await request(app).post("/login").send({
                email: "beltrano@contoso.com",
                password: "zxcv"
            });
            expect(response.statusCode).toBe(200);
        })
    })

    describe("\nFuncionalidade 1 - Login Erro (senha incorreta)", () => {
        test("Deve tentar realizar o login com erro", async () => {
            const response = await request(app).post("/login").send({
                email: "beltrano@contoso.com",
                password: "abcd"
            });
            expect(response.statusCode).toBe(400);
        })
    })

    describe("\nFuncionalidade 1 - Login Erro (email incorreto)", () => {
        test("Deve tentar realizar o login com erro", async () => {
            const response = await request(app).post("/login").send({
                email: "naoexiste@naoexiste.com",
                password: "abcd"
            });
            expect(response.statusCode).toBe(400);
        })
    })

    describe("\nFuncionalidade 1 - Propriedades faltando", () => {
        test("Deve tentar realizar o login com propriedades faltantes", async () => {
            const response = await request(app).post("/login").send({
                email: "beltrano@contoso.com"
            });
            expect(response.statusCode).toBe(422);
        })
    })
})


describe("\n\nChamada: GET /livros", () => {
    describe("\nFuncionalidade 2 - Listar todos os livros", () => {
        test("Deve retornar todos os livros cadastrados no sistema", async () => {
            const response = await request(app).get("/livros");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(livrosDatabase.length);
        })
    })

    describe("\nFuncionalidade 2 - Listar livros por filtros (Titulo, Autor ou assunto)", () => {
        test("Deve retornar os livros do Autor George Orwell", async () => {
            const response = await request(app).get("/livros?autor=George Orwell");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(livrosDatabase.filter(e => e.autor === "George Orwell").length);
        })
    })


    describe("\nFuncionalidade 2 - Listar livros por filtros (Titulo, Autor ou assunto) por propriedade inexistente", () => {
        test("Deve retornar os livros com a propriedade Teste = 100 paginas", async () => {
            const response = await request(app).get("/livros?Teste=100 paginas");
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toBe(`Parâmetro inválido.`);
        })
    })
})


describe("\n\nChamada: GET /livros/:id", () => {
    describe("\nFuncionalidade 3 - Listar livro por ID", () => {
        test("Deve retornar livro conforme ID passado", async () => {
            const response = await request(app).get("/livros/7");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(1);
            expect(response.body[0].id).toBe(7);
        })
    })
})


describe("\n\nChamada: GET /comments", () => {
    describe("\nFuncionalidade 4 - Listar todos os comentários", () => {
        test("Deve retornar todos os comentários feitos no sistema separados por livros", async () => {
            const response = await request(app).get("/comments");
            expect(response.statusCode).toBe(200);
            expect(Object.keys(response.body).length).toBe(16);
        })
    })

    describe("\nFuncionalidade 4 - Listar todos os comentários de um livro em especifico", () => {
        test("Deve retornar todos os comentários feitos referente ao livro ID informado", async () => {
            const response = await request(app).get("/comments?id=5");
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(commentDatabase[5].length);
        })
    })
})

describe("\n\nChamada: POST /comments/:id", () => {
    describe("\nFuncionalidade 5 - Criar um novo comentário", () => {
        test("Deve cadastrar um novo comentário com sucesso", async () => {
            const response = await request(app).post("/comments/16").send(  {
                "usuario": "teste2",
                "avaliacao": 4,
                "comentario": "teste2"
            });
            expect(response.statusCode).toBe(200);
        })
    })

    describe("\nFuncionalidade 5 - Criar novo comentário com propriedades obrigatórias ausentes", () => {
        test("Deve ocorrer um erro ao cadastrar novo comentário.", async () => {
            const response = await request(app).post("/comments/16").send(  {
                "usuario": "teste2",
                "avaliacao": 4
            });
            expect(response.statusCode).toBe(400);
        })
    })

    describe("\nFuncionalidade 6 - Criar mais de um comentário", () => {
        test("Deve cadastrar mais de um comentário com sucesso", async () => {
            const response = await request(app).post("/comments/16").send([
                {
                  "usuario": "teste",
                  "avaliacao": 2,
                  "comentario": "teste"
                },
                {
                  "usuario": "teste2",
                  "avaliacao": 4,
                  "comentario": "teste2"
                }
            ]);
            expect(response.statusCode).toBe(200);
        })
    })
})