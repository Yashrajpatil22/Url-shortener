import express from "express";
import connectDb from "./db/index.js";
const app = express();
const PORT = 3000;

app.get("/check", (req, res) => {
  res.send("Hello World");
  console.log("Check hit");
});

connectDb()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running of port ${PORT}`);
    }),
  )
  .catch((error) => {
    console.log("Mongo Db connection failed");
  });
