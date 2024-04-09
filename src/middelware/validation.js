
import joi from "joi";
export const generalFeilds ={
    id :joi.string().min(24).max(24),
    email:joi.string().email().required(),
    password : joi.string().min(8).required(),
    file:joi.object({
        fieldname:joi.string().required(),
        dest:joi.string(),
        encoding:joi.string().required(),
        mimetype:joi.string().required(),
        destination:joi.string().required(),
        filename:joi.string().required(),
        path:joi.string().required(),
        size:joi.number().positive().required(),
        originalname:joi.string().required(),
    }),
}
export const validation = (schema)=>{
    return(req,res,next)=>{
        const inputsData ={...req.body,...req.params,...req.query};
        if(req.file || req.files){
            inputsData.file = req.file || req.files;
        }
        const validationResult = schema.validate(inputsData,{abortEarly:false});
        if(validationResult.error){
            return res.json({message:"validation error",errors:validationResult.error.details});
        }
        
        next();
    };
};