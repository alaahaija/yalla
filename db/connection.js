import mongoose from "mongoose";

const connectDb = ()=>{
    mongoose.connect(process.env.DB)
    .then(result=>{
        console.log("CONNECTED TO DB");
    }).catch(error=>{
        console.log(`ERROR TO CONNECT DB ${error}`);
    });
    ;
};
export default connectDb;