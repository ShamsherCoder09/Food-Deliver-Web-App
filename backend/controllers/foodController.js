import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  const image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// get food lists
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({
      success: true,
      message: foods,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "showing error when i getting foodlist ",
    });
  }
};

// remove food item
const removeFoodItem = async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            message:"Food Remove"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error when I remove food items"
        })
    }
}
export { addFood, listFood,removeFoodItem };
