import slugify from "slugify";
import categoryModel from "../../../db/models/category.model.js";
import cloudinary from "../../utls/cloudinary.js";
import restaurentModel from "../../../db/models/restaurent.model.js";
export const createCat = async (req,res,next)=>{
    const {name} = req.body;
    const {restaurentId} = req.params;
    const restaurent = await restaurentModel.findById(restaurentId);
    if(!restaurent){
        return next(new Error("restaurent not found"));
    }
    const slug = slugify(name);
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:'category'});
    const category = await categoryModel.create({name,slug,restaurentId,image:{secure_url,public_id},createdBy:req.user._id,updatedBy:req.user._id});

    return res.json({message:'success',category});
};
export const updateCat = async (req,res,next)=>{
    const {categoryId} = req.params;
    const category = await categoryModel.findById(categoryId);
    if (!category){
        return next(new Error('category is not found'))
    }
    category.name = req.body.name;
    category.slug = slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:'category'});
        await cloudinary.uploader.destroy(category.image.public_id);
        category.image = {secure_url,public_id};
    }
    category.updatedBy = req.user._id;
    await category.save();
    return res.json({message:"success",category});
};
export const getAllCat =  async (req,res,next)=>{
    const categories = await categoryModel.find({});
    const count = await categoryModel.countDocuments({});
    return res.json({message:"success",count,categories});
};
export const getCat = async(req,res,next)=>{
    const {categoryId} = req.params;
    const category = await categoryModel.findById(categoryId);
    return res.json({message:"success",category});
};