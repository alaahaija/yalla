import orderModel from "../../../db/models/order.model.js";
import userModel from "../../../db/models/user.model.js";

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
    //const {token} = req.body;
    const users = await userModel.findOne({_id:req.user._id});
    return res.json({message:'success',users})
};