import typeModel from "../../../db/models/type.model.js";

export const createType = async (req,res,next)=>{
    const type = await typeModel.create(req.body); 
    if(!type){
        return next (new Error('ERROR WHILE CREATING TYPE'));
    }
    return res.json({message:'success',type});
};
export const getAllTypes = async (req,res,next)=>{
    const types = await typeModel.find({});
    const count = await typeModel.countDocuments({});
    return res.json({message:"success",count,types});
};
export const getActive = async (req,res,next)=>{
    const types = await typeModel.find({status:"Active"});
    const count = await typeModel.countDocuments();
    return res.json({message:"ok",count,types});
};
export const getType = async (req,res,next)=>{
    const {typeId} = req.params;
    const type = await typeModel.findById(typeId);
    return res.json({message:"success",type});
};
export const updateType = async (req,res,next)=>{
    const {typeId} = req.params;
    const types = await typeModel.findByIdAndUpdate(typeId,req.body,{new:true});
    if(!types){
        return next (new Error('ERROR WHILE CREATING TYPE'));
    }
    return res.json({message:"success",types});
};
