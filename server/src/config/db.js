import mongoose from "mongoose"; // Connects the app to MongoDB using Mongoose

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is missing. Please check your .env file.");
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected!");
}

export default connectDB;
