//import express from 'express'; //ES6 variation
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes.js');
const { setupWebSocket } = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://omnistack:123@cluster0-irjgr.mongodb.net/week10?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de Parâmetros:

// Query Params: req.query (Filtros, ordenação, paginação, ...) (Visíveis na URL após ?)
// Route Params: req.params || /users/:id (Identificar um recurso na alt ou remoção) (EX.: ID na URL, sem nome)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-Relacional)

server.listen(3333);