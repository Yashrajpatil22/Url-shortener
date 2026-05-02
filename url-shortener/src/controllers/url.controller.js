import { Url } from "../models/url.model.js";
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
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create short url" });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;
  //   if (!shortCode) {
  //     return res.status(404).json({ error: "Short code is required" });
  //   }
  try {
    const shortened = await Url.findOne({ shortCode });
    if (!shortened) {
      return res.status(404).json({ error: "Short code not found" });
    }
    shortened.clicks += 1;
    await shortened.save();
    res.redirect(shortened.originalUrl);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to redirect to original URL" });
  }
};

const getClicks = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ error: "Invalid short code" });
    }
    const click = url.clicks;
    return res.status(200).json({ clicks: click });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve stats" });
  }
};

export { createShortCode, redirectToOriginalUrl, getClicks };
