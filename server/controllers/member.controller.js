
import Member from "../models/member.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createMember = async (req, res) => {
  const member = req.body;
  if (!member.email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const salt = await bcrypt.genSalt(10);
  member.password = await bcrypt.hash(member.password, salt);

  const newMember = new Member(member);
  try {
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const authenticateMember = async (req, res) => {
  const { email, password } = req.body;

  try {
    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: member._id }, process.env.JWT_SECRET);

    res.status(200).json({ token: token, id: member._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authorizeUser = async (req, res) => {
  const token = req.body;

  if (!token) {
    res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token.token, process.env.JWT_SECRET);
    res.status(200).json({ message: token.token });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
