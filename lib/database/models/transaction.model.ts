import { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stripeId: {
    type: String,
    require: true,
    unique: true
  },
  amount: {
    type: Number,
    require: true
  },
  plan: {
    type: String
  },
  credits: {
    type: Number
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Transaction = models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
