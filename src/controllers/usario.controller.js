const Usuario = require('../models/usarios.models');
const Carrito = require('../models/carrito.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function Login (req, res){

var parametros = req.body;

Usuario.findOne({username: parametros.username},(err, usuarioEncontrado)=>{
    if(err) return res.status(500).send({message:'error en la peticion'});
    if(!usuarioEncontrado) return res.status(500).send({message:'error al obtener el usuario'});

    if(usuarioEncontrado){
        bcrypt.compare(parametros.password , usuarioEncontrado.password,(err, 
            verificacionPassword)=>{

                    if(verificacionPassword){

                        if(parametros.obtenerToken === 'true'){
                            return res.status(200).send({token : jwt.crearToken(usuarioEncontrado)})
                        }else{
                            usuarioEncontrado.password = undefined;
                            return res.status(200).send({usario : usuarioEncontrado})
                        }


                    }else{
                        return res.status(500).send({message:'las contraseñas no coinciden'});

                    }

            })

    }else{
        return res.status(500).send({message:'error el correo no esta registrado'})
    }
})
}

function RegistrarAdminDefault(){
    var usuarioModel =  new Usuario();
    usuarioModel.nombre = 'ADMIN';
    usuarioModel.apellido = 'ADMIN';
    usuarioModel.email = 'ADMIN';
    usuarioModel.username = 'ADMIN';
    usuarioModel.password = 'ADMIN';
    usuarioModel.rol= '123456';

    Usuario.find({username:'ADMIN'},(err,usuarioEncontrado)=>{
        if(usuarioEncontrado.length==0){
            bcrypt.hash('123456',null,null,(err,passwordEncriptada)=>{
                usuarioModel.password = passwordEncriptada;
                usuarioModel.save((err, usuarioGuardado)=>{

                    if(err) return console.log('error en la peticion')
                    if(!usuarioEncontrado) return console.log('error al agregar el admin')
                    return console.log('admin defaul'+' '+ usuarioEncontrado);
                });


            })

        }else{
            return console.log('ya esta registrado uwu');
        }

    })




}
