import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://mohdshamsher:Mohd09@cluster0.i9alt.mongodb.net/food-delivery-app')
    .then(()=>{
        console.log("data base is connected")
    })
    .catch((err)=>{
        console.log(`database connection is showing an error ${err}`)
    })
}