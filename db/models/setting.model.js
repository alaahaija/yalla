import { Schema, model, Types } from "mongoose";

const settingSchema = new Schema({
    phone:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    logo:{
        type:Object
    },
},{
    timestamps:true,
});

const settingModel = model('Setting',settingSchema);
export default settingModel;