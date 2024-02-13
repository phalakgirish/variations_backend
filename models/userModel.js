import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    users_email:String,
    users_password:String,
});

const usersModel = mongoose.model('users',usersSchema);

export {usersModel};