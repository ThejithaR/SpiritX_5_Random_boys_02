import mongoose from "mongoose";

//Create a schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, //username should be unique
  },

  email: {
    type: String,
    required: true,
    unique: true, //email should be unique
  },

  password: {
    type: String,
    required: true,
  },

  verifyOtp: {
    type: String,
    default: "",
  },

  verifyOtpExpiresAt: {
    type: Number,
    default: 0,
  },

  isAccountVerified: {
    type: Boolean,
    default: false,
  },

  resetOtp: {
    type: String,
    default: "",
  },

  resetOtpExpiresAt: {
    type: Number,
    default: 0,
  },
});

//userModel will only be created if it is not already created
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;