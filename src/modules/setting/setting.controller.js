import settingModel from "../../../db/models/setting.model.js";
import cloudinary from "../../utls/cloudinary.js";

export const create = async(req,res,next)=>{
    const {phone,email,logo} = req.body 
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`yalla/logo`});
    req.body.image = {secure_url,public_id};
    const setting = await settingModel.create({
        phone,
        email,
        logo,
    })
    return res.json({message:"success",setting});
};
export const get = async(req,res,next)=>{
    const setting = await settingModel.findOne();
    return res.json({message:"success",setting});
};