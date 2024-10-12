import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import "dotenv/config"

// app confing
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// connection DB 
connectDB();

// api endpoint
app.use("/api/food" , foodRouter);
app.use('/images',express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter);

app.get("/",(req,res)=>{
    res.send("Api is working now ");
})

app.listen(port,()=>{
    console.log(`our server is running on port no. ${port}`)
})