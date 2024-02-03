import mongoose from "mongoose";

export const dbConnect = async () => {
  const mongoDbUrl = "mongodb+srv://<username>:<password>@cluster.t5k9eal.mongodb.net/test";
  try {
    await mongoose.connect(mongoDbUrl);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("DB connection failed");
    console.error(error);
    process.exit(1);
  }
};
