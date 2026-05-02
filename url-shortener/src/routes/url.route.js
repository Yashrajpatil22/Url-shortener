import { createShortCode, redirectToOriginalUrl } from "../controllers/url.controller.js";
import express from "express";

const router = express.Router();

router.route("/shorten").post(createShortCode);
router.route("/:shortCode").get(redirectToOriginalUrl);

export default router;