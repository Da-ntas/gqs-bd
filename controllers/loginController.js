import express from "express";

import User from "../models/User.js";

import { userDatabase } from '../dataBase/users.js';

const loginControler = (req, res) => {
    const body = req.body;

    if(!body.email || !body.password){
        return res.status(400).send({
            authed: false,
            error: 'O campo "email" e "password" são obrigatórios.'
        });
    }

    const findUser = userDatabase.filter((i) => i.email === body.email)

    if(!findUser || findUser.length === 0)
        return res.status(400).send({
            authed: false,
            error: 'Usuário não encontrado'
        });
    
    if(findUser[0].password !== body.password)
        return res.status(400).send({
            authed: false,
            error: 'Senhas não conferem'
        });

    return res.status(200).send({
        authed: true,
        email: findUser[0].email
    })
};

export default loginControler;