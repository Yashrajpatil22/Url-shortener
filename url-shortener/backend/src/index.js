import express from "express";
import connectDb from "./db/index.js";
import urlRoutes from "./routes/url.route.js";
import { redirectToOriginalUrl } from "./controllers/url.controller.js";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/urls", urlRoutes);
app.get("/:shortCode", redirectToOriginalUrl);
app.use(cors(
  {
    origin: "http://localhost:5173",
  }
));

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
