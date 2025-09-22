
import express from "express";

import {
  createBooking,
  getBookingsByMember,
  updateBooking,
  deleteBooking,
  getBookingById,
  altBookingRequest,
  getBookingByUrl,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/member", getBookingsByMember);
router.patch("/:bookingId", updateBooking);
router.delete("/:bookingId", deleteBooking);
router.get("/:bookingId", getBookingById);
router.post("/request", altBookingRequest);
router.post("/url/:url", getBookingByUrl);
export default router;
