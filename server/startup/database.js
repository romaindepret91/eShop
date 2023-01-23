import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "config";

mongoose.set("strictQuery", false);
dotenv.config(); // Reads environment variables in env file

process.env.MONGODB_URI = `mongodb+srv://romaindepret91:${
  process.env.MONGODB_TOKEN
}@cluster0.xijvfpu.mongodb.net/${config.get(
  "mongoDB_name"
)}?retryWrites=true&w=majority`;

export default function () {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(console.log(`Connected to database ${config.get("mongoDB_name")}...`))
    .catch((err) => console.log("DB ERROR => ", err));
}
