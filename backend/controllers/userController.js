import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login 
const userLoging = async(req,res)=>{
    const{email , password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User doesn't exists"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.json({
                success:false,
                message:"password or email is incorrect"
            });
        }

        const token = createToken(user._id);
        res.json({
            success:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"user doesn't find "
        })
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

// user register
const userRegister = async(req,res)=>{
    const {name,password,email} = req.body;
    try {
        // Is email already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({
                success:false,
                message:"User is already exists"
            });
        }
        // validated email format and strong password;
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"Email format is not correct"
            });
        }
        if(password.length<8){
            return res.json({
                success:false,
                message:"Password is not strong"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success:true,
            token
        })

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"User doesn't register"
        })
        
    }
}

export {userLoging,userRegister} ;