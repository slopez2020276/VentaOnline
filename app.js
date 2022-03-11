const express = require('express');
const cors = require('cors');
var app = express();


//importaciones
const usuarios = require('./src/routes/usario.routes');

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(cors());

app.use('/api',usuarios );


module.exports = app;
