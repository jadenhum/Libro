import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@(mcgill\.ca|mail\.mcgill\.ca)$/,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
