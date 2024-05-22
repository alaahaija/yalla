import userModel from "../../../db/models/user.model.js";

export const getStackholder = async(req,res,next)=>{
    const getStackholder= await userModel.find({role:"Stackholder"});
    return res.json({message:"success",getStackholder});
};