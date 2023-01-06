import mongoose from "mongoose";
import config from "config";

mongoose.set("strictQuery", false);

process.env.MONGODB_URI = `mongodb+srv://romaindepret91:${config.get(
  "mongoDBToken"
)}@cluster0.xijvfpu.mongodb.net/eShop?retryWrites=true&w=majority`;

export default function () {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(console.log("Connected to database..."))
    .catch((err) => console.log("DB ERROR => ", err));
}
