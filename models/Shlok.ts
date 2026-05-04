import mongoose from "mongoose";

const ShlokSchema = new mongoose.Schema({
  chapter: Number,
  shlokNumber: Number,
  sanskrit: String,
  english: String,
  hindi: String,
  audio: String,
  video:String
});

export default mongoose.models.Shlok ||
  mongoose.model("Shlok", ShlokSchema);