const Categoria = require('../models/categoria.models');

const Carrito = require('../models/carrito.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');


function CategoriaDefaul(){
    var categoriamodel = new Categoria();
    var nombre = 'Default'
    

    Categoria.findOne({nombre: nombre},(err,categoriaEncontrada)=>{

            if(err) return res.status(500).send({message:'error en la peticion'})
            if(!categoriaEncontrada){
                categoriamodel.nombre ='Default';
                categoriamodel.save((err,categoriaGuardad)=>{
                    if(err) return console.log('error en la peticion');
                    if(!categoriaGuardad) return console.log('error al crear la categoria por defecto')

                        return console.log('sea creado una categoria por defecto ')
                })
            }else{

                return console.log('ya existe una categoria por defecto UwU');
            }
    })

}

function agregarCategoria (req,res){
    var parametros = req.body;
    var categoriaModel = new Categoria();
    
   

    Categoria.findOne({nombre: parametros.nombre},(err,CategoriaEncontrada)=>{
        if(err) return res.status(500).send({message:'error en la peticion'});
        if(!CategoriaEncontrada){

            categoriaModel.nombre= parametros.nombre;
            categoriaModel.save((err,categoriaGuardad)=>{
                if(err)return res.status(500).send({message:'error en la peticion'});
                if(!categoriaGuardad) return res.status(500).send({message:'error al guardar la caegoria '});
                return res.status(200).send({ categoria :categoriaGuardad});

            })
        }else{

            return  res.status(500).send({message:'la categoria ya se encuentra creada'})
            
        }

    })

}

function editarCategoria (req,res){
    var categoria = req.params.idUsario;
    var parametros = req.body;

    
            Categoria.findByIdAndUpdate(categoria,parametros,(err,categoriaGuardad)=>{
                if(err) return res.status(500).send({message:'error en la peticion'});
                if(!categoriaGuardad) return res.status(500).send({message:'error añ editar Categoria'});
                 return res.status(200).send({message:categoriaGuardad});
                
        
            })

 }

 function eliminarCategoria(req,res){
        var idCategoria = req.params.idCategoria;

        Categoria.findOne({id:idCategoria},(err, categoriaEncontrada)=>{
            if(err) return res.status(500).send({message:'error en la peticion'});
            if(categoriaEncontrada){

                

            }

        })

 }
 




   

   





module.exports={
    CategoriaDefaul,
    agregarCategoria,
    editarCategoria,
}
