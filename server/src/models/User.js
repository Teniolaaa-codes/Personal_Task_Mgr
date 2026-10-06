import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";

// User schema: identity for authentication
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
  },
  { timestamps: true },
);

// Hash password before inserting/updating a user document
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hash(this.password, 10);
});

// Compare a plain password with the stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return compare(enteredPassword, this.password);
};

export default model("User", userSchema);
