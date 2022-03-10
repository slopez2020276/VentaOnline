const express = require('express');

const controladorUsario = require('../controllers/usario.controller');

//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

