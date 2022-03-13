


var Cart = require("../models/carrito.models");
var Product = require("../models/producto.models");

function agregarCarrito(req,res){
    var productId = req.params.productoId;
    var parametros = req.body;
    var usuario = req.user.sub;

    if(parametros.stock){
        Product.findById(productId,(err,productFind)=>{
            if(err) return res.status(500).send({message: "Error al agregar al carrito"});
                if(productFind){
                if(parametros.stock > productFind.stock){
                    return res.status(403).send({message: "La cantidad solucitada supera los productos en stock"});
                }else{
                    Cart.findOneAndUpdate({usario: usuario},{$push:{productos:productFind._id,stock:parametros.stock}},{new:true},(err,carritoActualizado)=>{
                        if(err){
                            return res.status(500).send({message: "Error al agregar producto al carrito"});
                        }else if(carritoActualizado){
                            return res.send({message: "carrito agregado"});
                        }else{
                            return res.status(404).send({message: "No se agregó al carrito (No se encontró su carrito)"});
                        }
                    })
                }
            }else{
                return res.status(403).send({message: "Producto inexistente"});
            }
        })
    }else{
        return res.status(403).send({message: "Ingrese la cantidad de productos a llevar"});
    }
}


module.exports ={
    agregarCarrito
}