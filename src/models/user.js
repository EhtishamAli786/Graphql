let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["admin", "customer"],
    },
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

// the schema is useless so far
// we need to create a model using it
export const UserModel = mongoose.model("User", userSchema);

// make this available to our users in our Node applications
