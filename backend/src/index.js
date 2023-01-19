import app from "./app.js";
import config from "./config/config";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongo)
  .then(() => console.log("Mongo connected successfully..."))
  .catch(() => console.log(`Error connecting to MongoDB ${config.mongo}!!!`));

app.listen(config.port, (err) => {
  if (err) return console.log(err);
  console.log(`Server started on port ${config.port}`);
});
