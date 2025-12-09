import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
description:{
    type:String
},
email:{
    type:String,
    require:true,
    unique:true
},
password:{
    type:String
},
role:{
    type:String,
    enum:["student","educator"],
    require:true
},
photourl:{
    type:String,
    default:""
},
enrolledCourses:[{
    type:mongoose.Schema.Types.ObjectId,
    Ref:"Course"
}]
},
    {timestamps:true})
    const User =mongoose.model("User",userSchema)
    export default (User)


