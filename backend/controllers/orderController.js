import orderModle from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv'

dotenv.config();

// const STRIPE_SECRET_KEY="pk_test_51Q8w8HP9dGEptPxT74bif88w3jdQyHTUL7cxzFtNeLkTsuL6AGMHZt28plO593BwCysCldgBwCnOUK3dtmiH74BD00ai5yrdsE"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// console.log("stripe secret key" , stripe)

// placing order user for frontend
const placeOrder = async(req,res)=>{
    const frontend_url="http://localhost:5173"
    try {
        const newOrder = new orderModle({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        });
        console.log(req.body.userId , "it is userID");
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        console.log("user is updated")

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        });

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({
            success:true,
            session_url:session.url
        })
    } catch (error) {
        console.log("error In orderPlace", error);
        res.json({
            success:true,
            message:"Error"
        })
    }
}

const verifyOrder = async (req,res)=>{
    const {success,orderId} = req.body;
    try {
        if(success=="true"){
            await orderModle.findByIdAndUpdate(orderId,{payment:true})
            res.json({
                success:true,
                message:"Paid"
            })
        }
        else{
            await orderModle.findByIdAndUpdate(orderId);
            res.json({
                success:false,
                message:"Not Paid"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"error in verify order , in orderController.js"
        })
    }
}

// usre orders for frontend 
const userOrders = async(req,res)=>{
    try {
        const orders = await orderModle.find({userId:req.body.userId});
        res.json({
            success:true,
            data:orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:true,
            message:"error in fetching userOrders"
        })
    }
}

export {placeOrder,verifyOrder,userOrders};