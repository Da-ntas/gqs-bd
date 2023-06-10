import CommentSchema from "../models/Comments.js";

import { commentDatabase } from "../dataBase/comments.js";

const validateKeys = (i) => {
    const originalSchema = Object.keys(CommentSchema).filter(key => CommentSchema[key].required);
    const objKeys = Object.keys(i);
  
    const missingKeys = originalSchema.filter(key => !objKeys.includes(key));
    if (missingKeys.length > 0) {
        return `\nPropriedades obrigatórias não estão no body: ${missingKeys.join(', ')}`;
    }
}

function validateBody(body) {
    let errorMessage = '';
  
    if (Array.isArray(body)) {
      body.forEach(i => {
        const text = validateKeys(i);
        if(text)
            errorMessage += text;
      });
    }
    else {
        const text = validateKeys(body);
        if(text)
            errorMessage += text;
    }
  
    return errorMessage;
}

function getLastId() {
    let lastId = 0;

    Object.values(commentDatabase).forEach(commentArray => {
        commentArray.forEach(comment => {
        if (comment.id > lastId) {
            lastId = comment.id;
        }
        });
    });
    
    return lastId+1;
}
  

export const getCommentById = (req, res) => {
    const id = req.params?.id;

    if(!id)
        return res.status(400).send({error: "O campo ID é obrigatório"});

    return res.status(200).json(commentDatabase[id] ?? []);
}

export const createComment = (req, res) => {
    const body = req.body;
    const id = req.params?.id;

    if(!body)
        return res.status(400).send({error: "Body é necessário para realizar a criação"});

    if(!id)
        return res.status(400).send({error: "Parâmetro ID é obrigatório"});

    
    const errorMessage = validateBody(body);

    if(errorMessage)
        return res.status(400).send({error: errorMessage});
    
    const lastId = getLastId();    
  
    if (Array.isArray(body)) {
        body.forEach((e, index) => {
            commentDatabase[id].push({id: lastId+index, ...e})
        })

        return res.status(200).json(commentDatabase[id])
    }
    else{
        commentDatabase[id].push({id: lastId, ...body})
        return res.status(200).json(commentDatabase[id])
    }
    
}