const mongoose = require('mongoose');
const app = require('./app');
const { RegistrarAdminDefault } = require('./src/controllers/usario.controller');
const {CategoriaDefaul} = require('./src/controllers/Categoria.controller');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/VentaOnline' , {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log("conectado a la base de datos");
    
    app.listen(3000,function(){

        console.log('corriendo en el puerto 3000');

    })


}).catch(err => console.log(err));

RegistrarAdminDefault();
CategoriaDefaul();