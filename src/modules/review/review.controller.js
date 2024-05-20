import orderModel from "../../../db/models/order.model.js";
import reviewModel from "../../../db/models/review.model.js";

export const createReview = async(req,res,next)=>{
    const {comment,rating}=req.body;
    const {productId} = req.params;
    const order = await orderModel.findOne({
        userId:req.user._id,
        status:"deliverd",
        "products.productId":productId,
    });
    if(!order){
        return next(new Error('can not review this order'));
    }
    const checkReview = await reviewModel.findOne({
        userId:req.user._id,
        productId:productId,
    });
    if(checkReview){
        return next(new Error('you already reivewed this product'));
    }
    const review = await reviewModel.create({
        comment,rating,
        userId:req.user._id,
        productId:productId,
        orderId:order._id
    });
    return res.json({message:"success",review});
};
export const getAllReviews = async(req,res,next)=>{
    const review = await reviewModel.find({productId:req.params.productId}).populate(
        {path:'userId',
            select:'userName image'
        }
    );
    return res.json({message:"success",review});
};