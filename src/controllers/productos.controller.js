
var Productos = require('../models/producto.models');
var Categoria = require('../models/categoria.models');


function AgregarProducto (req, res){

    var categoriaId = req.params.idCategoria;
    var parametros = req.body;
    var modelProductos = new Productos();
    

    if(parametros.nombre&& parametros.precio&& parametros.stock){
        Categoria.findById(categoriaId,(err,categoriaEncontrada)=>{

            if(err) return res.status(500).send({message:'error en la peticion'});
            if(categoriaEncontrada){
                Productos.findOne({nombre: parametros.nombre},(err, ProductoEncontrado)=>{

                    if(err) return res.status(500).send({message:'error en la peticion del producto'});
                    if(ProductoEncontrado){
                        return res.status(500).send({message:'este producto ya esta registrado'})
                        

                    }else{
                        modelProductos.nombre= parametros.nombre;
                        modelProductos.precio = parametros.precio;
                        modelProductos.stock = parametros.stock;
                        
                        modelProductos.save((err,productoGuardado)=>{
                        if(err) return res.status(500).send({message:'erro en la peticion'});
                        if(productoGuardado){
                            Categoria.findByIdAndUpdate(categoriaId,{$push:{producto:productoGuardado._id }},{new: true},(err,categoriaActializada)=>{
                              if(err) return res.status(500).send({message:'error al peticion'});
                              if(!productoGuardado)return res.status(500).send({message:'error al agregar a la categoria'});

                             



                            })
                        }
                        return res.status(200).send({producto:productoGuardado})
                        


                        })

                    }
                    
                })

                 
            }
        })

    }else{

        return res.status(500).send({message:'llene los campos obligatorios'})
    }

}


function EditarProducto(req, res){

    var categoriaId = req.params.idCategoria;
    var productosId = req.params.idPructos;
    var parametros = req.body;
    
    if(parametros.stock){
        Productos.findById(productosId,(err,productosEncontrados)=>{
           if(err) return res.status(500).send({message:'error en la peticion del producto'})
           if(productosEncontrados){
             Categoria.findOne({_id:categoriaId,productosId: productosId},(err,categoriaEncontrada)=>{
                 if(err) return res.status(500).send({message:'error en la peticion de categoria'});
                 if(categoriaEncontrada){
                     Productos.findByIdAndUpdate(productosId,parametros,{new: true},(err,productoActualizado)=>{
                        if(err) return res.status(500).send({message:''})
                        if(!productoActualizado){
                            return res.status(500).send({message:'el producto no se acualizo'});
                        }else{
                            return res.status(200).send({producto:productoActualizado})
                        }
                     })
                 }

             })
           }else{
               return res.status(500).send({message:'el producto no existe pa'})


           }
           
        })


    }else{
        return res.status(500).send({message:'debe de llenar los parametos obligatorios'});
    }
}
function eliminarProducto(req, res){
    var categoriaId = req.params.idCategoria;
    var productosId = req.params.idPructos;

    Categoria.findOneAndUpdate({_id:categoriaId,productos: productosId},{$pull:{productos:productosId}},{new: true},(err,categoriaActializada)=>{

     if(err) return res.status(500).send({message:'error en la peticion '})
       if(!categoriaActializada){
           Productos.findByIdAndRemove(productosId,(err,productoElinado)=>{
              if(err) return res.status(500).send({message:'erro al eliminar el producto'});
              if(!productoElinado){
                   return res.status(500).send({message:'no se elimino el producto'})
              }else{
                  return res.status(200).send({productos:productoElinado})
              }

           })

       }else{
           return res.status(500).send({message:'el producto no existe'})
       }
    })
}




module.exports = {

    AgregarProducto,
    EditarProducto,
    eliminarProducto
}