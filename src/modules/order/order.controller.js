import cartModel from "../../../db/models/cart.model.js";
import couponModel from "../../../db/models/coupon.model.js";
import orderModel from "../../../db/models/order.model.js";
import productModel from "../../../db/models/product.model.js";
import restaurentModel from "../../../db/models/restaurent.model.js";
import userModel from "../../../db/models/user.model.js";

export const createOrder = async(req,res,next)=>{
    const {couponName} = req.body;
    const cart = await cartModel.findOne({userId:req.user._id});
    if(!cart){
        return next(new Error('cart is empty'));
    }
    req.body.products = cart.products;
    if(couponName){
        const coupon = await couponModel.findOne({name:couponName});
        if(!coupon){
            return next(new Error('coupon not found')); 
        }
        const currentDate = new Date();
        if(coupon.expireDate <= currentDate){
            return next (new Error('expired coupon'));
        }
        if(coupon.usedBy.includes(req.user._id)){
            return next (new Error('couopn already used'));
        }
        req.body.coupon = coupon;
    }
    let subTotal = 0;
    let finalProductList =[];
    for (let product of req.body.products){
        product = product.toObject();
        const checkProduct = await productModel.findById(product.productId);
        product.name = checkProduct.name;
        req.body.restaurentId = checkProduct.restaurentId;
        product.unitPrice = checkProduct.price;
        product.discount = checkProduct.discount;
        product.finalPrice = product.quantity * checkProduct.finalPrice;
        subTotal+=product.finalPrice;
        finalProductList.push(product);
    }
    const user = await userModel.findById(req.user._id);
    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phone){
        req.body.phone = user.phone;
    }
    const order = await orderModel.create({
        userId:req.user._id,
        products:finalProductList,
        finalOrderPrice:subTotal-(subTotal*(req.body.coupon?.amouunt ||0)/100),
        address:req.body.address,
        phone:req.body.phone,
        restaurentId:req.body.restaurentId,
    });
    if(req.body.coupon){
        order.couponId = req.body.couponId;
        await order.save();
        await couponModel.updateOne({_id:req.body.couponId},{
            $addToSet:{
                usedBy:req.user._id,
            }
        })
    }
    await cartModel.updateOne({userId:req.user._id},{
        products:[],
    })
    return res.json({message:"success",order});
};
export const getUserOrder = async(req,res,next)=>{
    const orders = await orderModel.find({userId:req.user._id}).populate({
        path:"userId",
        select:'userName',
    });
    return res.status(200).json({message:"success",orders});
};
export const getOrder = async(req,res,next)=>{
    const order = await orderModel.findById(req.params.id).populate({
        path:'userId',
        select:'userName'
    });
    return res.json({message:"success",order});
};
export const getStackholderOrder = async(req,res,next)=>{
    const {status} = req.body
    const restaurentId = await restaurentModel.findOne({userId:req.user._id});
    const order = await orderModel.find({

        restaurentId: restaurentId,
      
        $or: [
      
          { status: "pending" },
      
          { status: "confirmed" }
      
        ]
      
      }).populate({
        path:"userId",
        select:"userName",
      });    
      return res.json({message:"success",order,status});
};
export const changeStatus = async(req,res,next)=>{
    const {status} = req.body;
    const order = await orderModel.findById(req.params.id);
    if(!order){
        return next (new Error('order not found'));
    }
    if(status == "onWay"){
        if(!req.body.deliveryId){
            return next (new Error('plz select delivery'));
        }
        order.deliveryId= req.body.deliveryId;
    }
    await orderModel.findByIdAndUpdate(req.params.id,{status})
    return res.json({message:"success",order});
};
