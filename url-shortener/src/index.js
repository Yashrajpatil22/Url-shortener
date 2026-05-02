import express from "express";
import connectDb from "./db/index.js";
import urlRoutes from "./routes/url.route.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/urls", urlRoutes);

app.get("/check", (req, res) => {
  res.send("Hello World");
  console.log("Check hit");
});

connectDb()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }),
  )
  .catch((error) => {
    console.log("Mongo Db connection failed");
  });
