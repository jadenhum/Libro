import express from 'express';

import { createAppointmentsFromBooking, createAppointment, getAppoinmentsFromBooking, findIfAppointmentsAtHourInBooking, getStudentAppointments, reserveBooking } from '../controllers/appointment.controller.js';
const router = express.Router();

router.post('/create', createAppointment);
router.post('/create/:bookingId', createAppointmentsFromBooking);
router.post('/get/:bookingId', getAppoinmentsFromBooking);
router.post('/get/:bookingId/:hour', findIfAppointmentsAtHourInBooking);
router.get('/student/:studentCode', getStudentAppointments);
router.post('/reserve/:appId', reserveBooking);

export default router; 