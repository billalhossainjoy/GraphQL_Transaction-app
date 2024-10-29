import mongoose from "mongoose";
import { MONGO_URI } from "./config/env";

const connectMongo = async () => {
  try {
    const con = await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected on", con.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongo;
