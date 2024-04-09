import userModel from "../../../db/models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid , customAlphabet } from "nanoid";
import { sendEmail } from "../../utls/email.js";
export const register = async(req,res,next)=>{
    const {userName,email,password,gender,phone,address} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        return next(new Error("email already exists"));
    }
    const token = jwt.sign({email},process.env.CONFIRMEMAILSIG);
    const html = `
    <h1>Hello</h1>
    <p>plz confirm your email</p>
    <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">confirm email</a>
    `;
    await sendEmail(email,`confirmEmail`,html);
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    const newUser = await userModel.create({userName,email,password:hashedPassword,gender,phone,address});
    return res.json({message:'ok',newUser});
};
export const confirmEmail = async(req,res,next)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token,process.env.CONFIRMEMAILSIG);
    const email = decoded.email;
    const user = await userModel.findOneAndUpdate({email},{confirmEmail:true});
    if(!user){
        return next(new Error('email not found'));
    }
    return res.redirect(process.env.REDIRECTAFTERCONFIRM);
};
export const login = async (req,res,next)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('userName role status confirmEmail password');
    if(!user){
        return next(new Error("invalid data"));
    }
    if(!user.confirmEmail == true){
        return next(new Error('PLZ CONFIRM YOUR EMAIL'));
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        return next (new Error('invalid data'));
    }
    const token = jwt.sign({id:user._id,userName:user.userName,role:user.role,status:user.status}, process.env.LOGINSIG);
    return res.json({message:'success',token});
};
export const sendCode = async (req,res,next)=>{
    const {email} = req.body;
    let code = customAlphabet("123456asdfghj456eWSDFYHNM",8)();
    const user = await userModel.findOneAndUpdate({email,confirmEmail:true},{sendCode:code},{new:true});
    const html = `<h2>CODE IS : ${code}</h2>`;
    await sendEmail(email,"Forget Password",html);
    if(!user){
        return next(new Error('invalid data'));
    }
    return res.json({message:"success",user})
};
export const forgetPassword = async (req,res,next)=>{
    const {email,password,code} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return next(new Error('invalid data'));
    }
    if(user.sendCode != code){
        return next (new Error('invalid data'));
    }
    let match = await bcrypt.compare(password,user.password);
    if(match){
        return next(new Error('same password'));
    }
    user.password = await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    user.sendCode = null;
    await user.save();
    return res.json({message:'success'});
};