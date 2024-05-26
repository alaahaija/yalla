import connectDb from "../db/connection.js";
import authRouter from './modules/auth/auth.router.js';
import userRouter from "./modules/users/user.router.js";
import categoryRouter from "./modules/category/category.router.js";
import typeRouter from './modules/type/type.router.js';
import restaurentRouter from "./modules/restaurent/restaurent.router.js";
import productRouter from "./modules/product/product.router.js";
import couponRouter from "./modules/coupon/coupon.router.js"
import cartRouter from "./modules/cart/cart.router.js";
import orderRouter from "./modules/order/order.router.js"
import deliveryRouter from "./modules/delivery/delivery.router.js";
import settingRouter from "./modules/setting/setting.router.js";
import sliderRouter from "./modules/slider/slider.router.js";
import cors from 'cors';
import { globalErrorHandler } from "./utls/error.handling.js";
const initApp = (app,express)=>{
    connectDb();
    app.use(cors());
    app.use(express.json());
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use('/category',categoryRouter);
    app.use('/type',typeRouter);
    app.use('/restaurent',restaurentRouter);
    app.use('/product',productRouter);
    app.use('/coupon',couponRouter);
    app.use('/cart',cartRouter);
    app.use('/order',orderRouter);
    app.use('/delivery',deliveryRouter);
    app.use('/setting',settingRouter);
    app.use('/slider',sliderRouter);
    app.get('*',(req,res)=>{
        return res.json({message:"PAGE NOT FOUND"});
    });
    app.use(globalErrorHandler);    
};
export default initApp;