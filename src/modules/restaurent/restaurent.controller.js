import slugify from "slugify";
import cloudinary from "../../utls/cloudinary.js";
import restaurentModel from "../../../db/models/restaurent.model.js";

export const createRestaurent = async (req,res,next)=>{
    const {name} = req.body;
    req.body.slug = slugify(name);
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:"restaurent"});
    req.body.logo = {secure_url,public_id};
    const restaurent = await restaurentModel.create(req.body);
    if (!restaurent){
        return next(new Error('ERROR WHILE CREATING RESTAURENT'));
    }
    return res.json({message:"success",restaurent});
};
export const getAllRestaurent = async (req,res,next)=>{
    const restaurent = await restaurentModel.find({});
    const count = await restaurentModel.countDocuments({});
    return res.json({message:"success",count,restaurent});
};
export const getActive = async (req,res,next)=>{
    const restaurent = await restaurentModel.find({status:'Active'}).populate('categories').exec();
    const count = await restaurentModel.countDocuments({});
    return res.json({message:"success",count,restaurent});
};
export const updateRestaurent = async (req,res,next)=>{
    const {restaurentId} = req.params;
    const restaurent = await restaurentModel.findById(restaurentId);
    if(!restaurent){
        return next(new Error("restaurent not found"));
    }
    const {name} = req.body;
    req.body.slug = slugify(name);
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:'restaurent'});
        await cloudinary.uploader.destroy(restaurent.logo.public_id);
        req.body.logo = {secure_url,public_id};
    }
    const newRestaurent = await restaurentModel.findByIdAndUpdate(restaurentId,req.body,{new:true});
    return res.json({message:"success",newRestaurent});
};
export const getRandomRest = async(req,res,next)=>{
    const restaurents = await restaurentModel.aggregate([
        {$sample:{size:3}}
    ]);
    return res.json({message:"success",restaurents});
};