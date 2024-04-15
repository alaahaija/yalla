import { Schema, Types, model } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:Object,
        required:true,
    },
    slug:{
        type:String,
    },
    createdBy:{
        type: Types.ObjectId,
        ref:'User',
    },
    updatedBy:{
        type: Types.ObjectId,
        ref:'User',
        required:true,
    },
},{
    timestamps:true,
});
const categoryModel = model('Category',categorySchema);
export default categoryModel;