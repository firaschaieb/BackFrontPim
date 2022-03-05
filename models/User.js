const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String },


    email: { type: String },
  
    password: { type: String },
 
    profilePicture: { type: String },
    isVerified: { type: Boolean },
   
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);
module.exports = mongoose.model("User", UserSchema);
