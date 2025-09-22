
import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  },
  pollOptions: [
    {
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
        match: /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      },
      endTime: {
        type: String,
        required: true,
        match: /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
  URL: {
    type: String,
    required: true,
  },
});

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
