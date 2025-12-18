import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password BEFORE saving user to the DB
// Used during user creating and when password is updated
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash the password if it has been modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash Password
    next();
  } catch (error) {
    next(error);
  }
});

// Compare entered password with the hashed password in the DB
// Used during login to verify user credentials
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare passwords
};

const User = mongoose.model("User", userSchema);

export default User;
