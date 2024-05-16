import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: "2024-01-15T00:00:00.000+00:00",
    },
    brand: String,
    weight: Number,
    price: Number,
    createdBy:{
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const PurchaseModel = mongoose.model("Purchase", PurchaseSchema);

export default PurchaseModel;