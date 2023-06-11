import request from "supertest";
import app from "..";

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