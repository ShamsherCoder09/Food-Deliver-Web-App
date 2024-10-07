import userModel from "../models/userModel.js";

// add cart to the user
const addToCart = async(req,res)=>{
   try {
     let userData = await userModel.findById({_id:req.body.userId});
     let cartData = userData.cartData;
     if(!cartData[req.body.itemId]){
         cartData[req.body.itemId] = 1;
     }else{
         cartData[req.body.itemId] +=1;
     }
    //  console.log("cartData", cartData);
     await userModel.findByIdAndUpdate(req.body.userId,{cartData});
     res.json({
         success:true,
         message:"Added To Cart"
     })
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error Cart not Added"});
   }
}

// remove from the cart user
const removeFromCart = async(req,res)=>{
    try {
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({
            success:true,
            message:"item removed successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"item removed not successfully"
        });
    }
}

// get cart
const getCart = async(req,res)=>{
    try {
        const userData = await userModel.findById({_id:req.body.userId});
        const cartData = userData.cartData;
        res.json({
            success:true,
            cartData,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"cartData item getting error"
        })
    }
}

export {addToCart,removeFromCart,getCart}