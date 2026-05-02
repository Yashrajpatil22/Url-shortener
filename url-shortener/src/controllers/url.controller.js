import {Url} from "../models/url.model.js";
import mongoose from "mongoose";

const generateShortCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortCode = "";
  for (let i = 0; i < 6; i++) {
    let num = Math.floor(Math.random() * characters.length);
    shortCode += characters.charAt(num);
  }
  return shortCode;
};

const createShortCode = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    if (!originalUrl || originalUrl.trim() === "") {
      return res.status(400).json({ error: "Original URL is required" });
      
    }
    let shortCode = generateShortCode();
    while (await Url.findOne({ shortCode })) {
      shortCode = generateShortCode();
    }
    const newShortCode = await Url.create({ originalUrl, shortCode });
    if (!newShortCode) {
      return res.status(500).json({ error: "Failed to create short URL" });
    }
    res.status(201).json({
        message: "Short URL created successfully",
        originalUrl,
        shortCode,
        shortUrl: `http://localhost:3000/${shortCode}`,
    })
  } catch (error) {
    return res.status(500).json({ error: "Failed to create short url" });
  }
};
export { createShortCode };