
import Poll from "../models/poll.model.js";
import jwt from "jsonwebtoken";

export const createPoll = async (req, res) => {
  const { title, description, pollOptions, URL } = req.body;

  try {
    // Authenticate the member
    const token = req.headers.authorization.split("=")[1];
    const memberId = jwt.verify(token, process.env.JWT_SECRET).id;

    const newPoll = await Poll.create({
      createdBy: memberId,
      title,
      description,
      pollOptions,
      URL,
    });

    res.status(201).json(newPoll);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create poll" });
  }
};

export const getPolls = async (req, res) => {
  try {
    // Authenticate the member
    const token = req.headers.authorization.split("=")[1];
    const memberId = jwt.verify(token, process.env.JWT_SECRET).id;

    const polls = await Poll.find({ createdBy: memberId });
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch polls" });
  }
};

export const getPollByUrl = async (req, res) => {
  const { pollUrl } = req.body;
  try {
    const poll = await Poll.findOne({ URL: pollUrl });
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch poll" });
  }
};

export const votePoll = async (req, res) => {
  const { optionId, pollUrl } = req.body;

  if (!optionId) {
    return res.status(400).json({ message: "Option ID is required" });
  }

  if (!pollUrl) {
    return res.status(400).json({ message: "pollUrl is required" });
  }

  try {
    const poll = await Poll.findOne({ URL: pollUrl });
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    const option = poll.pollOptions.find((opt) => opt._id.toString() === optionId);
    if (!option) {
      return res.status(400).json({ message: "Option not found" });
    }
    option.votes = option.votes + 1;
    await poll.save();
    res.status(200).json({ message: "Vote submitted successfully", poll });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to submit vote" });
  }
};
