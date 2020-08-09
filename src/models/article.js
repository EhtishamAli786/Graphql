let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: String,
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    minRead: String,
    description: String,
    featuredImage: String,
    footerLinks: { type: [String], default: [] },
  },
  { timestamps: { updatedAt: "updated_at", createdAt: "created_at" } }
);

// the schema is useless so far
// we need to create a model using it
export const ArticleModel = mongoose.model("Article", articleSchema);

// make this available to our users in our Node applications
