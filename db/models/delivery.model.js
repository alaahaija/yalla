import { Schema, Types, model } from "mongoose";

const deliverySchema = new Schema({
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        default:0,
    },
    finalPrice:{
        type:Number,
        required:true,
    },
},
{
    timestamps:true,
});
const deliveryModel = model('Delivery',deliverySchema);
export default deliveryModel;