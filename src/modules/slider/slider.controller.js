import slidermodel from "../../../db/models/slider.model.js";
import cloudinary from "../../utls/cloudinary.js";

export const create = async(req,res,next)=>{
    const {link} = req.body;
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:'yalla/slider'});
    req.body.image = {secure_url,public_id};
    const slider = await slidermodel.create(req.body);
    return res.json({message:"success",slider});
};
export const getSliders = async(req,res,next)=>{
    const sliders = await slidermodel.find({});
    const count = await slidermodel.countDocuments({});
    return res.json({message:"success",count,sliders});
};
export const getActiveSliders = async(req,res,next)=>{
    const sliders = await slidermodel.find({status:'Active'});
    return res.json({message:"success",sliders});
};
export const getDetails = async(req,res,next)=>{
    const {sliderId} = req.params;
    const slider = await slidermodel.findById(sliderId);
    return res.json({message:"success",slider});
};