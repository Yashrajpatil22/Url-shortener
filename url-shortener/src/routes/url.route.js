import {
  createShortCode,
  getClicks,
  deleteShortCode,
  updateOriginalUrl,
} from "../controllers/url.controller.js";
import express from "express";

const router = express.Router();

router.route("/shorten").post(createShortCode);
router.route("/getStats/:shortCode").get(getClicks);
router.route("/delete/:shortCode").delete(deleteShortCode);
router.route("/update/:shortCode").patch(updateOriginalUrl);

export default router;
