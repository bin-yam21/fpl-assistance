import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true, index: true },
  code: { type: Number, required: true }, // FPL Player Code (used for images)
  name: { type: String, required: true },
  team: { type: Number, required: true, index: true },
  price: { type: Number, required: true, index: true },
  position: { type: Number, required: true, index: true },
  imageUrl: { type: String, required: true },
  points: { type: Number, required: true },
  active: { type: Boolean, required: true, default: true }, // Add active status
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);
