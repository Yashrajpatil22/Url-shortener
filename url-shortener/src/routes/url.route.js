import { createShortCode } from "../controllers/url.controller.js";
import express from "express";

const router = express.Router();

router.route("/shorten").post(createShortCode);


export default router;