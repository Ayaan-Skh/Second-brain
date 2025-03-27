import mongoose, { Schema, model } from "mongoose";

mongoose.connect("mongodb+srv://ayaanskh23:05zrvIDuc6C32auT@ayaan23.evzyq.mongodb.net/")
    .then(()=>{console.log("MongoDB connected")})
    .catch(()=>{console.log("Error in connecting database")})
const userSchema = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})

export const UserModel = model("User", userSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true },
})
const LinkSchema = new Schema({
    hash:String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true , unique:true},
})
export const LinkModel=model("Link",LinkSchema)

export const ContentModel = model("Content", ContentSchema)