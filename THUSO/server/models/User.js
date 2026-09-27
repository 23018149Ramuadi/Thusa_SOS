const mongoose=require('mongoose');
const schema=new mongoose.Schema({fullName:{type:String,required:true,trim:true,maxlength:100},email:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},phone:{type:String,required:true,trim:true},passwordHash:{type:String,required:true,select:false}},{timestamps:true});
schema.set('toJSON',{transform:(_,ret)=>{delete ret.passwordHash;delete ret.__v;return ret;}});
module.exports=mongoose.model('User',schema);
