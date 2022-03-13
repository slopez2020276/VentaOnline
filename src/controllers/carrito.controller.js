


var Cart = require("../models/carrito.models");
var Product = require("../models/producto.models");

function agregarCarrito(req,res){
    var productId = req.params.productoId;
    var params = req.body;
    var userId = req.user.sub;

    if(params.stock){
        Product.findById(productId,(err,productFind)=>{
            if(err){
                return res.status(500).send({message: "Error al agregar un producto al carrito"});
            }else if(productFind){
                if(params.stock > productFind.stock){
                    return res.status(403).send({message: "La cantidad a llevar es mayor a la cantidad del producto"});
                }else{
                    Cart.findOneAndUpdate({usario: userId},{$push:{productos:productFind._id,stock:params.stock}},{new:true},(err,cartUpdated)=>{
                        if(err){
                            return res.status(500).send({message: "Error al agregar producto al carrito"});
                        }else if(cartUpdated){
                            return res.send({message: "Producto agregado al carrito exitosamente"});
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