const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema ({

    nombre: String,
    productos : [{type: Schema.ObjectId, ref:  'productos'}]

});

module.exports = mongoose.model('categorias',categoriaSchema);