import { createShortCode, getClicks } from "../controllers/url.controller.js";
import express from "express";

const router = express.Router();

router.route("/shorten").post(createShortCode);
router.route("/getStats/:shortCode").get(getClicks);

export default router;
