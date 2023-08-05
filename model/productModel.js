const {Schema}= require('mongoose')
const mongoose= require('mongoose')

const productSchema=new mongoose.Schema({
    title:{
    type: String,
    required: true,
    },
    description:{
        type: String,
      required: true,
    },
    price:{
        type: String,
       required: true,
    },
    discountPercentage:{
        type: String,
    required: true,
        
    },
    rating:{
        type: String,
    required: true,
       
    },
    stock:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
    required: true,
    },
    category:{
        type: String,
    required: true,
        
    },
    thumbnail:{
        type: String,
    required: true,
        
    },
    images:{
        type:[],
    }

})

const Product=mongoose.model("Product",productSchema)

module.exports=Product;






















