const mongoose=require('mongoose')

const schema=mongoose.Schema
const userschema=new schema({
    email:String,
    password:String
})

module.exports=mongoose.model('user',userschema,'users')
/*
user==>modelName
userschema==>schemaName
users==>collectionName  
 */