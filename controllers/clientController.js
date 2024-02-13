import validator from 'validator';
import bcryptjs from 'bcryptjs';
import { usersModel } from '../models/userModel.js';
import { log } from 'console';
import jwt from 'jsonwebtoken';
import SendEmail from '../env/SendEmail.js';

const SECRET = 'asded785685asd';
const TIMESTAMP = 60*60*24;

var salt = bcryptjs.genSaltSync(10);


const signUpAction = async function(req,res){

    console.log(req.body);
    

    var {emailid,password,confirmpass} = req.body;


    var users_instance = await usersModel.findOne({users_email:emailid});

    if(users_instance === null)
    {
        var password_encrypt = bcryptjs.hashSync(password, salt);

        console.log(password_encrypt);
        var dataToPost = {
            users_email:emailid,
            users_password:password_encrypt
        }
        var instance_users_insert = new usersModel(dataToPost);
        var inst_aft_users_ins = await instance_users_insert.save();
        console.log(inst_aft_users_ins);

        res.send({msg:"Sign-Up Successfully.",users:inst_aft_users_ins,status:true});
    }
    else
    {
        res.send({msg:"Email Already Exist.",status:false});
    }

};

const loginAction = async function(req,res){
    
    var {emailid,password} = req.body;

    var users_log_instance = await usersModel.find({users_email:emailid});
    
    if(users_log_instance === null)
    {
        res.send({msg:'This Email account is not exist.',status:false});
    }
    else
    {

        var ans_pass = bcryptjs.compareSync(req.body.password,users_log_instance[0]['users_password']);


        if(ans_pass)
        {
            var payload = {
                users_username:users_log_instance['users_username'],
            };

            console.log(payload);

            var tokenvalue = jwt.sign({
                data: payload,
            },SECRET,{expiresIn:60*60});

            console.log(tokenvalue);
            res.send({msg:"Proceed To Dashboard",status:true,token:tokenvalue});
        }
        else
        {
            res.send({msg:"Invalid Email and Password",status:false})
        }
    }       
};


const forgetPasswordAction = async function(req,res){

    var users_forgetpass_instance = await usersModel.find({users_email:req.body.users_email});

    if( users_forgetpass_instance === null)
    {
        res.send({msg:'Email dose not exist.'});
    }
    else
    {
        var val = Math.floor(1000 + Math.random() * 9000);

        SendEmail(users_forgetpass_instance[0]['users_email'],val);

        var otp_payload = {
            email_id:users_forgetpass_instance[0]['users_email'],
            otp:val
        };



        var otptokenvalue = jwt.sign({
            data: otp_payload,
        },SECRET,{expiresIn:60*60});

        console.log(otptokenvalue);
        res.send({msg:"OTP generated successfully.",status:true,token:otptokenvalue});

    }

    
};

const newPasswordAction = async function(req,res) {

    try
    {
        var{users_email,password,confirmpass} = req.body;

        var new_password_encrypt = bcryptjs.hashSync(password, salt);

        console.log(new_password_encrypt);

        var users_password_update_instance = await usersModel.updateOne({users_email:users_email},{$set:{users_password:new_password_encrypt}});
        console.log(users_password_update_instance);

        res.send({msg:"Password update successfully.", status:true,users:users_password_update_instance})

    }
    catch(err)
    {
        log(err);
    }

};

export {
    signUpAction,
    loginAction,
    forgetPasswordAction,
    newPasswordAction
}