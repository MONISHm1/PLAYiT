import mongoose, { Mongoose } from "mongoose";
const { Schema, model } = mongoose;
const subcriptionSchema = new Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
  },
  {
    timestamps: true,
  }
);

const Subcription = model("Subcription", subcriptionSchema);
export { Subcription };
