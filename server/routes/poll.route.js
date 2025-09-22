
import express from "express";
import { createPoll, getPolls, getPollByUrl, votePoll } from "../controllers/poll.controller.js";

const router = express.Router();

router.post("/create", createPoll);
router.get("/", getPolls);
router.post("/:pollUrl", getPollByUrl);
router.post("/:pollUrl/vote", votePoll);

export default router;
