export const asyncHandler = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{
            return next(new Error(err.stack));
        });
    };
};
export const globalErrorHandler = (err,req,res,next)=>{
    return res.json({message:err.message || "invalid format"});
};