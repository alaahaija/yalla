import connectDb from "../db/connection.js";
import authRouter from './modules/auth/auth.router.js';
import categoryRouter from "./modules/category/category.router.js";
import typeRouter from './modules/type/type.router.js';
import restaurentRouter from "./modules/restaurent/restaurent.router.js";
import cors from 'cors';
import { globalErrorHandler } from "./utls/error.handling.js";
const initApp = (app,express)=>{
    connectDb();
    app.use(cors());
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/category',categoryRouter);
    app.use('/type',typeRouter);
    app.use('/restaurent',restaurentRouter);
    app.get('*',(req,res)=>{
        return res.json({message:"PAGE NOT FOUND"});
    });
    app.use(globalErrorHandler);    
};
export default initApp;