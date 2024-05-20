import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
    },
    restaurentId:{
        type:Types.ObjectId,
        ref:"Restaurent",
    },
    deliveryId:{
        type:Types.ObjectId,
        ref:"User",
    },
    products:[{
        productId:{
            type:Types.ObjectId,
            ref:"Product",
            required:true,
        },
        quantity:{
            type:Number,
            default:1,
            required:true,
        },
        unitPrice:{ //price for one product
            type:Number,
            required:true,
        },
        finalPrice:{
            type:Number,
            required:true,
        },
    }],
    finalOrderPrice:{
        type:Number,
        required:true,
    },
    couponId:{
        type:Types.ObjectId,
        ref:"Coupon",
    },
    paymentType:{
        type:String,
        enum:['reditcard','cash'],
        default:"cash",
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"pending",
        enum:['pending','cancelled','confirmed','onWay','deliverd'],
    },
    note:String,
    reasonRejected:String,
    updatedBy:{
        type:Types.ObjectId,
        ref:"User",
    },
},{
    timestamps:true,
});

const orderModel = model('Order',orderSchema);
export default orderModel;