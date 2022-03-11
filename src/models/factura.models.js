const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturaSchema = new Schema ({

    nombre: String,
    productos: [{ type: Schema.ObjectId, ref:  'productos'}]
})

module.exports = mongoose.model('facturas',facturaSchema);