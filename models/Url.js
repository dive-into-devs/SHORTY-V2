import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
});

export default mongoose.models.Url || mongoose.model("Url", UrlSchema);
