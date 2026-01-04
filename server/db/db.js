import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected"); // 👈 MUST SEE THIS
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectToDatabase;
