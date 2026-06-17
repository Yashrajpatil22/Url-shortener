import {
  createShortCode,
  getClicks,
  deleteShortCode,
  updateOriginalUrl,
  getAllUrls,
  getOriginalUrlfromShortCode
} from "../controllers/url.controller.js";
import express from "express";

const router = express.Router();

router.route("/").get(getAllUrls);
router.route("/shorten").post(createShortCode);
router.route("/getStats/:shortCode").get(getClicks);
router.route("/delete/:shortCode").delete(deleteShortCode);
router.route("/update/:shortCode").patch(updateOriginalUrl);
router.route("/originalUrl/:shortCode").get(getOriginalUrlfromShortCode);

export default router;
