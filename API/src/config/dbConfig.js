import mongoose from "mongoose";

export const dbConnet = () => {
  try {
    // const MONGO_CLIENT = "mongodb://localhost/march_task_list";
    const conn = mongoose.connect(process.env.MONGO_CLIENT);
    conn && console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
