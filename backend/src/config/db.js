import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `mongodb connected successfully on host: ${conn.connection.host}`,
    );
  } catch (error) {
    console.log("mongodb connection error:", error);
  }
};

export { connectDB };
