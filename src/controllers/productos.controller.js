
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


module.exports = {

    AgregarProducto,
}