const express = require('express');

const controladorCategoria = require('../controllers/Categoria.controller');

//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/registrarCategoria',[md_autenticacion.Auth,md_roles.verAdmin],controladorCategoria.agregarCategoria);
api.put('/editarCategoria/:idUsario',[md_autenticacion.Auth,md_roles.verAdmin],controladorCategoria.editarCategoria);

module.exports = api;