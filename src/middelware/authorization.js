//authorization
import jwt from 'jsonwebtoken';
import userModel from '../../db/models/user.model.js';
export const roles ={
    Admin:'Admin',
    User:'User',
    Stackholder:"Stackholder"
};
export const authorization = (accessRoles =[])=>{
    return async(req,res,next)=>{
        const {authorization} = req.headers;
        if(!authorization?.startsWith(process.env.BERAERKEY)){
            return next(new Error('invalid authorization'));
        }
        const token = authorization.split(process.env.BERAERKEY)[1];
        const decoded = jwt.verify(token,process.env.LOGINSIG);/** */
        if(!decoded){
            return next(new Error('invalid token'));
        }
        const user = await userModel.findById(decoded.id).select('userName role');
        if(!user){
            return next(new Error('not registered user'));
        }
        if(!accessRoles.includes(user.role)){
            return next (new Error('not authorization user'));
        }
        req.user = user;
        next();
    };
};