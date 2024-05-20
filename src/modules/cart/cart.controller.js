import cartModel from "../../../db/models/cart.model.js";

export const createCart = async (req,res,next)=>{
    const {productId} = req.body;
    const cart = await cartModel.findOne({userId:req.user._id});
    if(!cart){
        const newCart = await cartModel.create({
            userId:req.user._id,
            products:{productId},
        });
        return res.json({message:'success',newCart});

    }
    for(let i=0;i<cart.products.length;i++){
        if(cart.products[i].productId==productId){
            return next(new Error('product already exists'));
        }
    }
    cart.products.push({productId});
    await cart.save();
    return res.json({message:'success',cart});
};
export const removeItem = async (req,res,next)=>{
    const {productId}=req.body;
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id,"products.productId":productId},{
        $pull:{
            products:{productId},
        }
    },{new:true});
    if(!cart){
        return next(new Error("product not found"));
    }
    return res.json({message:"success",cart});

};
export const clearCart = async (req,res,next)=>{
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id},
        {
            products:[],
        }
    ,{new:true});
    return res.json({message:"success",cart});
};
export const updateQuantity = async(req,res,next)=>{
    const {productId}=req.body;
    const {operation}=req.body;
    let inc = (operation == "+")?1:-1;
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id,"products.productId":productId},{
        $inc:{
            "products.$.quantity":inc
        }
    },{new:true});
    if(!cart){
        return next(new Error("product not found"));
    }
    const qty = cart.products.find(product =>{
        return product.productId == productId;
    });
    if(qty.quantity == 0){
        const index = cart.products.findIndex(product=> product.productId == productId);
        cart.products.splice(index,1);
        await cart.save();
    }    
    return res.json({message:"success",cart});
};
export const getCart = async(req,res,next)=>{
    const cart = await cartModel.findOne({userId:req.user._id});
    return res.json({message:"success",cart});
};