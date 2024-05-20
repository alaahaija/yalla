import { Schema, model } from "mongoose";
const typeSchema = new Schema({
    name:{
        type:String,
        required:false,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active',
    },
},{
    timestamps:true,
});
const typeModel = model('Type',typeSchema);
export default typeModel;