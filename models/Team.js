import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  captain: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  viceCaptain: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
  bench: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  budgetUsed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
