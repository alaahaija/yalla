import { Schema,model } from "mongoose";

const sliderSchema = new Schema({
    image:{
        type:Object,
        required:true,
    },
    link:{
        type:String,
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        default:'Active'
    },
},{
    timestamps:true
});
const slidermodel = model("Slider",sliderSchema);
export default slidermodel;