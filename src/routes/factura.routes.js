
var express = require('express');

var controladorFactura = require('../controllers/facturas.controller');

var api = express.Router();

//middlewares

var md_autenticacion = require('../middlewares/autenticacion');

var md_roles = require('../middlewares/roles');

api.post('/agregarFactura',[md_autenticacion.Auth,md_roles.verCliente],controladorFactura.agregarFactura);


module.exports = api;