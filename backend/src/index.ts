import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 3000;
mongoose
  .connect("mongodb://mongo:mongo@localhost:27017", {
    dbName: "noteApp",
  })
  .then((res) => console.log("db connection successful"))
  .catch((err) => console.log(err));

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
