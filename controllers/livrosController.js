import { livrosDatabase } from "../dataBase/livros.js";

import LivroSchema from "../models/Livros.js";

function validade (params) {
    const originalSchema = Object.keys(LivroSchema);
    const paramsItem = Object.keys(params);

    return paramsItem.every((e) => originalSchema.some((item) => e.includes(item)))
}

function responseLivros (params) {
    const keys = Object.keys(params);

    let items = []
    keys.map((item) => {
        const livro = livrosDatabase.filter(e => e[item] === params[item]);
        
        if(!items.find(e => e.id === item.id))
            items.push(livro)
    })

    return items;
}

export const getAllLivros = (req, res) => {
    const query = req.query;
    
    if(!query || Object.keys(query).length === 0)
        return res.status(200).send(livrosDatabase)

    if(!validade(query)){
        return res.status(400).json({
            error: `Parâmetro inválido.\n`,
            validos: {
                titulo: {
                    type: "String",
                },
                autor: {
                    type: "String",
                },
                assunto: {
                    type: "String",
                },
            }
        })
    }
    
    if(Object.keys(query).length > 1) 
        return res.status(501).send({message: "No momento só é permitido a filtragem através de um só parâmetro"});

    return res.status(200).json(responseLivros(query)[0])
}

export const getLivroById = (req, res) => {
    const id = req.params?.id;

    if(!id)
        return res.status(400).send({error: "O campo ID é obrigatório"});
    
    const livro = livrosDatabase.filter((e) => e.id === Number(id));

    return res.status(200).json(livro);
}