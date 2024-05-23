import couponModel from "../../../db/models/coupon.model.js";

export const createCoupon = async (req,res,next)=>{
    const {name} = req.body;
    req.body.expireDate = new Date(req.body.expireDate);/** */
    if(await couponModel.findOne({name})){
        return next (new Error(`coupon name is already exists`));
    }
    req.body.createdBy = req.user._id;
    req.body.updatedBy = req.user._id;

    const coupon = await couponModel.create(req.body);
    return res.json({message:"success",coupon});
};
export const getCoupon = async(req,res,next)=>{
    const coupons = await couponModel.find();
    const count = await couponModel.countDocuments({});
    return res.json({message:"success",count,coupons});
};