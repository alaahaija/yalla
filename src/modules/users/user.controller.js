import orderModel from "../../../db/models/order.model.js";
import userModel from "../../../db/models/user.model.js";
import  hash  from "bcryptjs";
import  bcrypt  from "bcryptjs";

export const getStackholder = async(req,res,next)=>{
    const getStackholder= await userModel.find({role:"Stackholder"});
    return res.json({message:"success",getStackholder});
};
export const getDelivery = async(req,res,next)=>{
    const order = await orderModel.findById(req.params.orderId);
    const delivery = await userModel.find({address:order.address});
    return res.json({message:"success",delivery});
};
export const getUsers = async(req,res,next)=>{
    const users = await userModel.find({});
    const count = await userModel.countDocuments({});
    return res.json({message:"success",count,users});
};
export const userWithToken = async(req,res,next)=>{
    const users = await userModel.findOne({_id:req.user._id});
    return res.json({message:'success',users})
};
export const updateUserInfo = async(req,res,next)=>{
    const userId = req.user._id;
    const {currentPass} = req.body;
    const user = await userModel.findById(userId);
    const match = await bcrypt.compare(currentPass,user.password);
    if(!match){
        return next(new Error('invali currentPass'))
    }
    if(currentPass != req.body.password){
        req.body.password = await hash(password,parseInt(process.env.SALTROUND));
    }
    const newUser = await userModel.findByIdAndUpdate(userId,req.body,{new:true});

    return res.json({message:'success',user:newUser});
};