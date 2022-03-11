const Usuario = require('../models/usarios.models');
const Carrito = require('../models/carrito.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ username: parametros.username }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (usuarioEncontrado) {
            bcrypt.compare(parametros.password, usuarioEncontrado.password,
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        if (parametros.obtenerToken === 'true') {
                            usuarioEncontrado.password = undefined;
                            return res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        } else {

                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        }
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide' });
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.' })
        }
    })
}



function RegistrarAdminDefault(){
    var usuarioModel =  new Usuario();
    usuarioModel.nombre = 'ADMIN';
    usuarioModel.apellido = 'ADMIN';
    usuarioModel.email = 'ADMIN';
    usuarioModel.username = 'ADMIN';
    usuarioModel.password = '123456';
    usuarioModel.rol= 'ADMIN';

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
            return console.log('el admin ya esta registrado uwu');
        }

    })




}

function agregarUsario(req,res){
   var usuarioModel =  new Usuario();
   var parametros = req.body;

  //if(parametros.nombre && parametros.email && parametros.username){

        usuarioModel.nombre = parametros.nombre;
        usuarioModel.apellido = parametros.apellido;
        usuarioModel.username = parametros.username;
        usuarioModel.email = parametros.email;
        usuarioModel.rol = 'ROL_CLIENTE';
    

    Usuario.find({username : parametros.username},(err,usuarioEncontrado)=>{
        if(err) return res.status(500).send({message:'error en la peticion'})
        if(usuarioEncontrado.length == 0){

            bcrypt.hash(parametros.password,null,null,(err,passwordEncriptada)=>{

                usuarioModel.password = passwordEncriptada;

                usuarioModel.save((err,usuarioGuadado)=>{
                    if(err) return res.status(500).send({message:'error en la peticion'});

                    if(!usuarioEncontrado) return res.status(500).send({message:'error al agregar el Usuario'});

                    return res.status(200).send({usuario: usuarioGuadado});


                })

            })
        }else{
            return res.status(500).send({message:'El nombre de usuario ya esta en uso '})
        }


    })


 // }return res.status(500).send({message:'debe de llenar los parametos obligatorios'})
      






}




function editaUsario(req, res) {
    var idUser = req.params.idUsario;
    var parametros = req.body;

    if (idUser !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No puede editar otros usuarios' }),console.log(idUser+'   '+req.user.sub);

    Usuario.findByIdAndUpdate(req.user.sub, parametros, { new: true },
        (err, usuarioActualizado) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if (!usuarioActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el Usuario' });
            return res.status(200).send({ usuario: usuarioActualizado })
        })
}

function eliminarUsuario (req, res){
  var idUser = req.params.idUsario;
  

  Usuario.findOne({iduser: idUser},(err, usuarioEncontrado)=>{

    if(err) return res.status(500).send({message:'error en la peticion'});
    if(idUser !== req.user.sub){
        return res.status(500)
        .send({message:'no pudede eliminar este usario'});
  }else{
    Usuario.findByIdAndDelete(req.user.sub,
        (err, usuarioEliminado) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if (!usuarioEliminado) return res.status(500)
                .send({ mensaje: 'Error al eliminar el Usuario' });
            return res.status(200).send({ usuario: usuarioEliminado })
        })
  }

    
    
  })





}




module.exports = {
   Login,
   RegistrarAdminDefault,
   agregarUsario,
   editaUsario,
   eliminarUsuario,
}
