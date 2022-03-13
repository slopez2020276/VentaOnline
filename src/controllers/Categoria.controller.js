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
    var categoria = req.parametros.idUsario;
    var parametros = req.body;

    
            Categoria.findByIdAndUpdate(categoria,parametros,(err,categoriaGuardad)=>{
                if(err) return res.status(500).send({message:'error en la peticion'});
                if(!categoriaGuardad) return res.status(500).send({message:'error añ editar Categoria'});
                 return res.status(200).send({message:categoriaGuardad});
                
        
            })

 }

 
 
function eliminarCategoria(req,res){
    const idCategoria = req.parametros.idCategoria;
    

    Categoria.findOne({_id : idCategoria}, (err, categoriaEncontrada)=>{
        if(err){
            return res.status(500).send({message: "error en la petion de categoria"});
        }else if(categoriaEncontrada){
            var productos = categoriaEncontrada.productos;
            Categoria.findOneAndUpdate({busqueda: "Default"},{$push:{productos: productos}}, {new: true},(err, categoriaActualizada)=>{
                if(err){
                    return res.status(500).send({message: "error al actualizar a Default"});
                }else if(categoriaActualizada){
                   
                    Categoria.findOne({_id : idCategoria},(err, categoriaEncontrada)=>{
                        if(err){
                            return res.status(500).send({message: "error en la peticion de la categoria "});
                        }else if(categoriaEncontrada){
                            Categoria.findByIdAndRemove(idCategoria,(err, categoriaEliminada)=>{
                                if(err){
                                    return res.status(500).send({message: "error al eliminar la categoria"});
                                }else if(categoriaEliminada){
                                    return res.send({categoria: categoriaEliminada});
                                }else{
                                    return res.status(404).send({message: "error al eliminar la categoria"});
                                }
                            })
                        }else{
                            return res.status(403).send({message: 'error la categoira no existe'});
                        }
                    })
                }else{
                    return res.status(404).send({message: "error al actualizar"});
                }
            })
        }else{
            return res.status(403).send({message: "error la categoria no existe"});
        }
    })
}


function ObtenerCategorias(req,res){
    Categoria.find({}).populate("productos").exec((err, categoriasEncontradas)=>{
        if(err) return res.status(500).send({message: "Error al obtener los datos"});
         if(categoriasEncontradas){
            return res.send({message: " Todas las categorias:", categoriasEncontradas});
        }else{
            return res.status(403).send({message: "no existe esa categoria"});
        }
    })
}

function buscarCategoria(req,res){
    var parametros = req.body;

    if(parametros.busqueda){
        Categoria.find({busqueda: parametros.busqueda},(err,categorioEncontrada)=>{
            if(err)return res.status(500).send({message: "Error en la peticion"});
            if(categorioEncontrada){
                if(!categorioEncontrada){
                    return res.status(404).send({message: "la categoria No existe"});
                }else{
                    return res.send({categoria:categorioEncontrada});

                    
                }
            }else{
                return res.status(404).send({message: "No se encontraron coincidencias"});
            }
        })
    }else if(parametros.busqueda == ""){
        Category.find({}).exec((err,categories)=>{
            if(err) return res.status(500).send({message: "Error al obtener los datos"});
            if(categories){
                return res.send({message: "Categorías:",categories});
            }else{
                return res.status(403).send({message: "No hay datos"});
            }
        })
    }else{
        return res.status(403).send({message: "Ingrese el dato de búsqueda (search)"});
    }
}




   

   





module.exports={
    CategoriaDefaul,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
    ObtenerCategorias,
    buscarCategoria,
    
}
