
import mongoose from "mongoose";

export function connect_to_mongo() {
  const uri = process.env.MONGODB_URI;

  const db = mongoose
    .connect(uri, {})
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.error("error connecting to mongo:", error);
    });

  return db;
}
