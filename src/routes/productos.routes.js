const express = require('express');
const controladorProducto = require('../controllers/productos.controller');


const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/registrarProducto/:idCategoria',[md_autenticacion.Auth,md_roles.verAdmin],controladorProducto.AgregarProducto);
api.put('/editarProducto/:idCategoria/:idPructos',[md_autenticacion.Auth,md_roles.verAdmin],controladorProducto.EditarProducto)
api.delete('/eliminarProducto/:idCategoria/:idPructos',[md_autenticacion.Auth,md_roles.verAdmin],controladorProducto.eliminarProducto)
module.exports = api;