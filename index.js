// const express = require('express');
// const bodyParser = require('body-parser');
// const loginControler = require('./controllers/loginController');

import bodyParser from "body-parser";
import express from "express";

import loginControler from "./controllers/loginController.js"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.post('/login', loginControler);

app.listen(3000);