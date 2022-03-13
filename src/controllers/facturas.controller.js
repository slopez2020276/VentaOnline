

var Factura = require('../models/factura.models');

var Usuario = require('../models/usarios.models');

var Carrito = require('../models/carrito.models');

var Producto = require('../models/producto.models');

function agregarFactura(req,res){

    var usuariiId = req.user.sub;

    Carrito.findOne({usario: usuariiId},(err,carritoEncontrado)=>{
        if(err) return res.status(500).send({message:'error al buscar su carrito'});
        if(carritoEncontrado){
            if(carritoEncontrado.producto !=''){
                var catidad = carritoEncontrado.stock;
                let producto = carritoEncontrado.productos;
                let i= 0;
                let j= 0;

                producto.forEach(element=>{
                    Producto.findOne({_id:element},(err,ProductoEncontrado)=>{
                        if(err) return res.status(500).send({message:'error en la peticion'});
                        if(ProductoEncontrado){

                            var stokP = ProductoEncontrado.stock;

                            if(stokP<catidad[i]){
                                i++
                                return res.status(500).send({message:'error '});
                                

                            }else{
                                i++;
                            }

                        }else{
                            return res.status(500).send({message:'error al buscar el Producto'});

                        }

                    })
                })

                producto.forEach(element=>{
                    Producto.findOne({_id:element},(err,ProductoEncontrado)=>{

                        if(err) return res.status(500).send({message:'error en la peticion'});
                        if(!ProductoEncontrado){
                            return res.status(500).send({message:'error al obtener el producto'});

                        }else{
                            let stockP = ProductoEncontrado.stock;
                            let stockT = stockP - catidad[j];
                            j++
                            Producto.findByIdAndUpdate(element,{stock:stockT},{new: true},(err,stockActizado)=>{
                                if(err) return res.status(500).send({message:'error en la peticion'})
                                if(!stockActizado){
                                    return res.status(500).send({message:'error al actualizar el stock'})
                                }else{
                                    return res.status(200).send({message:'el stock se actualizo'})
                                }
                            })

                        }

                       
                    })

                })
                var facturaModel = new Factura();
                       facturaModel.nombre = req.user.nombre;
                       facturaModel.productos = producto;
                       facturaModel.save((err,facturaGuardada)=>{
                           if(err) return res.status(500).send({message:'error en la peticion'});
                           if(facturaGuardada){

                            Usuario.findByIdAndUpdate(usuariiId,{$push:{factura:facturaGuardada._id}},{new: true},(err,usuarioActualizado)=>{
                                if(err) return res.status(500).send({message:'error en la peticion'})
                                if(usuarioActualizado){
                                        Carrito.findOneAndRemove({usuario: usuariiId},(err,carritoEliminada)=>{
                                            if(err) return res.status(500).send({message:'error en la peticion'});
                                            if(carritoEliminada){
                                                var carritoModel = new Carrito();
                                                carritoModel.usario = req.user.sub;
                                                carrito.save((err,carritoGuardado)=>{
                                                    if(err) return res.status(500).send({message:'error en la peticion'});
                                                    if(carritoGuardado){


                                                    }
                                                    return res.status(500).send({message:'error al guardar el carrito'})

                                                })
                                                
                                            }return res.status(500).send({message:'error al eliminar el carrito'})
                                        })
                                }return res.status(500).send({message:'error el actializar el usuario'})
                            })
                           }return res.status(500).send({message:'error al guardar la factura'})
                       })


            }
            
        }

    })

}


module.exports = {
    agregarFactura
}