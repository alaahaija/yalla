import deliveryModel from "../../../db/models/delivery.model.js";
import orderModel from "../../../db/models/order.model.js";

export const deliveryCreate = async(req,res,next)=>{
    req.body.finalPrice = req.body.price - req.body.price*((req.body.discount || 0)/100);
    const delivery = await deliveryModel.create(req.body);
    return res.json({message:"success",delivery});
};
export const getDelivery = async(req,res,next)=>{
    const delivery = await deliveryModel.findOne();
    return res.json({message:"success",delivery});
};
export const updateDelivery = async(req,res,next)=>{
    req.body.finalPrice = req.body.price - req.body.price*((req.body.discount || 0)/100);
    const delivery = await deliveryModel.updateMany(req.body);
    return res.json({message:"success",delivery});
};
export const deliveryOrder = async(req,res,next)=>{
    const order = await orderModel.find({deliveryId:req.user._id});
    return res.json({message:"success",order});
};