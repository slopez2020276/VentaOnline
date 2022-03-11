exports.verAdmin = function(req, res, next){
    if (req.user.rol !== 'ADMIN') return res.status(403).send({mensaje:'La accion a realizar solo la puede hacer un administrador jijija'})
    next();
} 

exports.verCliente = function(req, res, next){
    if(req.user.rol !=='ROL_CLIENTE') return res.status(403).send({mensaje:'la accion a realizar solo la puede hacer una empresa'})

    next();

}