import mongoose from "mongoose"
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
})
// const Product = model('Product',ProductSchema)

module.exports = mongoose.models.Product ||  mongoose.model('Product',ProductSchema)



