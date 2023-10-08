const mongoose = require("mongoose");

// MongoDB Atlas connection URI
const mongoURI =
  "mongodb+srv://chabhushan16:bhushan@cluster0.tazqkkg.mongodb.net/istafood?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const foodItemsData = await fetched_data.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection("food_category");
    const foodCategoryData = await foodCategory.find({}).toArray();

    // Assign the retrieved data to global variables
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    // console.log('food_items:', global.food_items);
    // console.log('foodCategory:', global.foodCategory);
  } 
  catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
