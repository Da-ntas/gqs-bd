import bodyParser from "body-parser";
import express from "express";
import { createComment, getCommentById } from "./controllers/commentsController.js";

import { getAllLivros, getLivroById } from "./controllers/livrosController.js";
import loginControler from "./controllers/loginController.js"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.post('/login', loginControler);
app.get('/livros', getAllLivros);
app.get('/livros/:id', getLivroById);
app.get('/comments/:id', getCommentById);
app.post('/comments/:id', createComment);

app.listen(3000);