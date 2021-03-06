const express = require('express');

const controladorUsario = require('../controllers/usario.controller');

//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/login',controladorUsario.Login);
api.post('/regristrarUsuario',controladorUsario.agregarUsario);
api.put('/editarUsuario/:idUsario',[md_autenticacion.Auth,md_roles.verCliente],controladorUsario.editaUsario);
api.delete('/eliminarUsuario/:idUsario',[md_autenticacion.Auth,md_roles.verCliente],controladorUsario.eliminarUsuario);

module.exports = api;

