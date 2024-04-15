import { Schema, model } from "mongoose";
const typeSchema = new Schema({
    name:{
        type:String,
        required:false,
        unique:true,
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active',
    },
});
const typeModel = model('Type',typeSchema);
export default typeModel;