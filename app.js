const express = require('express');
const cors = require('cors');
var app = express();


//importaciones
const usuarios = require('./src/routes/usario.routes');
const categoria = require('./src/routes/categoria.routes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(cors());

app.use('/api',usuarios,categoria );


module.exports = app;
