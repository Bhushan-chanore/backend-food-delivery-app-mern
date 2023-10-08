const mongoose = require("mongoose");

const {Schema} = mongoose;
// we create here the schema for storing the cart data in atlas
const orderSchema  = new Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }
}) 

module.exports = mongoose.model("order" , orderSchema)