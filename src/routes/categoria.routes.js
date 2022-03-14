const express = require('express');

const controladorCategoria = require('../controllers/Categoria.controller');

//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/registrarCategoria',[md_autenticacion.Auth,md_roles.verAdmin],controladorCategoria.agregarCategoria);
api.put('/editarCategoria/:idCategoria',[md_autenticacion.Auth,md_roles.verAdmin],controladorCategoria.editarCategoria);
api.delete('/eliminarCategoria/:idCategoria',[md_autenticacion.Auth,md_roles.verAdmin],controladorCategoria.eliminarCategoria);
api.get('/obtenerCategorias',[md_autenticacion.Auth,md_roles.verAdmin],controladorCategoria.ObtenerCategorias);
api.get('/buscarCategoria',[md_autenticacion.Auth,md_roles.verAdmin],controladorCategoria.buscarCategoria)
module.exports = api;