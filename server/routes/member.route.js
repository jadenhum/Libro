import express from "express";
import {
  createMember,
  authenticateMember,
  authorizeUser,
} from "../controllers/member.controller.js";

const router = express.Router();

router.post("/", createMember);
router.post("/login", authenticateMember);
router.post("/authorization", authorizeUser);

export default router;
