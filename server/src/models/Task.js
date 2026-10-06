import { Schema, model } from "mongoose";

const CATEGORIES = ["Work", "Personal", "Urgent", "Important"];

// Task schema: matches the client task shape, plus owner reference
const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    dueDate: {
      type: String, // ISO date string YYYY-MM-DD (same as client)
      required: [true, "Due date is required"],
    },
    category: {
      type: String,
      enum: {
        values: CATEGORIES,
        message: `Category must be one of: ${CATEGORIES.join(", ")}`,
      },
      required: [true, "Category is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default model("Task", taskSchema);
export { CATEGORIES };
