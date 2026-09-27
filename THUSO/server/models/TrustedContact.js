const mongoose=require('mongoose');
const schema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},name:{type:String,required:true,trim:true,maxlength:100},relationship:{type:String,required:true,trim:true,maxlength:60},phone:{type:String,required:true,trim:true},email:{type:String,required:true,lowercase:true,trim:true}},{timestamps:true});
schema.index({userId:1,createdAt:1}); module.exports=mongoose.model('TrustedContact',schema);
