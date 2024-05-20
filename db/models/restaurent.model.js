import { Schema, Types, model } from "mongoose";
const restaurentSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
    },
    logo:{
        type:Object,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true,
    },
    typeId:{
        type: Types.ObjectId,
        ref:'Type',
        required:true,
    },
    slogan:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active',
    },
    userId:{
        type:Types.ObjectId,
        ref:'User'
    },
},{
    timestamps:true,
});
const restaurentModel = model('Restaurent',restaurentSchema);
export default restaurentModel;