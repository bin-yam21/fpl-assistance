import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  team: { type: Number, required: true },
  price: { type: Number, required: true },
  position: { type: Number, required: true },
  points: { type: Number, required: true },
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);
