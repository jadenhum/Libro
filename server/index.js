import express from "express";
import dotenv from "dotenv";
import { connect_to_mongo } from "./config/connect.js";
import memberRoutes from "./routes/member.route.js";
import bookingRoutes from "./routes/booking.route.js";
import pollRoutes from "./routes/poll.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import cors from "cors";

dotenv.config(); // Load environment variables

// Environment variables loaded (secrets not logged for security)

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(
  cors({
    origin: ["https://libro.works", "http://localhost:3000"],
    credentials: true,
  })
);

// Use member routes
app.use("/api/members", memberRoutes);

// Use booking routes
app.use("/api/bookings", bookingRoutes);

// Use poll routes
app.use("/api/polls", pollRoutes);

// Use student appointment routes

app.use("/api/appointments", appointmentRoutes);

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "hello from server" });
  console.log("hello 123");
});

// Post request to check login credentials
app.post("/logincheck", (req, res) => {
  // Implement login check logic here
});

// Connect to MongoDB then run the server
connect_to_mongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
