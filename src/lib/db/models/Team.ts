import mongoose from "mongoose";
const PlayerSchema=new mongoose.Schema({fullName:{type:String,required:true},jerseyNumber:{type:Number,required:true},position:{type:String,required:true},jerseySize:{type:String,required:true},phone:{type:String,required:true}});
const TeamSchema=new mongoose.Schema({teamNumber:{type:Number,index:true},companyName:{type:String,required:true},email:{type:String,required:true},managerName:String,phone:String,captainName:String,captainPhone:String,players:{type:[PlayerSchema],default:[]},createdAt:{type:Date,default:Date.now}},{timestamps:true});
export default mongoose.models.Team||mongoose.model('Team',TeamSchema);
