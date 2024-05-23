import slugify from "slugify";
import categoryModel from "../../../db/models/category.model.js";
import restaurentModel from "../../../db/models/restaurent.model.js";
import cloudinary from "../../utls/cloudinary.js";
import productModel from "../../../db/models/product.model.js";


export const createPro = async (req,res,next)=>{
    const {name,price,discount,categoryId,restaurentId} = req.body;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return next(new Error("category not found"));
    }
    const restaurent = await restaurentModel.findById(restaurentId);
    if(!restaurent){
        return next(new Error('restaurent not found'));
    }
    req.body.finalPrice = (price - (price * (discount || 0) / 100)).toFixed(2);
    req.body.slug = slugify(name);
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.image[0].path,{folder:"product"});
    req.body.image ={secure_url,public_id};
    req.body.createdBy = req.user._id;
    req.body.updatedBy = req.user._id;
    const product = await productModel.create(req.body);
    if(!product){
        return next(new Error("error while creating product"));
    }
    return res.json({message:"success",product});
};
export const getByRestaurent = async (req,res,next)=>{
    const {restaurentId} = req.params;
    const products = await productModel.find({restaurentId,status:'Active'}).populate({
        path:"reviews",
        select:'comment rating -productId',
        populate:{
            path:"userId",
            select:'userName image'
        }
    });
    return res.json({message:"success",products});
};
export const getAll = async (req,res,next)=>{
    const {restaurentId} = req.params;
    const products = await productModel.find({restaurentId}).populate([
{
        path:'categoryId',
        select:'name',
    },{
        path:'restaurentId',
        select:'name',
    }
]);
    const count = await productModel.countDocuments({});
    return res.json({message:"success",count,products});
};
export const getProDetails = async(req,res,next)=>{
    const product = await productModel.findOne({_id:req.params.productId}).populate({
        path:"reviews",
        select:'comment rating -productId',
        populate:{
            path:"userId",
            select:'userName image'
        }
    });
    return res.json({message:"success",product});
};
export const updatePro = async (req,res,next)=>{
    const {productId} = req.params;
    const {name,price,discount,categoryId,restaurentId} = req.body;
    const product = await productModel.findById(productId);
    if (!product){
        return next(new Error('product is not found'))
    }
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return next(new Error("category not found"));
    }
    product.categoryId = categoryId;
    const restaurent = await restaurentModel.findById(restaurentId);
    if(!restaurent){
        return next(new Error('restaurent not found'));
    }
    product.restaurentId = restaurentId;
    
    product.name = name;/* */
    product.slug = slugify(name);/* */
    product.finalPrice = (price - (price * (discount || 0) / 100)).toFixed(2);

    if(req.files.image){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.image[0].path,{folder:'product'});
        await cloudinary.uploader.destroy(product.image.public_id);
        product.image = {secure_url,public_id};
    }
    
    product.updatedBy = req.user._id;
    await product.save();
    return res.json({message:"success",product});
};
