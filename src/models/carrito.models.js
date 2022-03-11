const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = new Schema ({

    compra: Boolean,
    usario : {  type: Schema.ObjectId, ref:  'usuarios'},
    productos: [{ type: Schema.ObjectId, ref:  'productos'}],
    stock :[Number]


})

module.exports = mongoose.model('carritos',carritoSchema);