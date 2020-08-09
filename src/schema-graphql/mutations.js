import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils";

const { ArticleModel, UserModel } = require("../models");
export const Mutations = {
  //auth
  login: async (args) => {
    const { email, password } = args;
    console.log("email, password", email, password);
    const user = await UserModel.findOne({ email });
    console.log("user", user);
    try {
      if (!user) {
        return {
          code: 404,
          message: "User not found",
          token: "",
        };
      } else {
        try {
          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            const token = generateAccessToken(user._id);
            return {
              code: 200,
              message: "User Found",
              token,
            };
          }
          return {
            code: 201,
            message: "Failed to get single user",
            token: "",
          };
        } catch (e) {
          return {
            code: 201,
            message: "Error occured",
            token: "",
          };
        }
      }
    } catch (err) {
      if (!!err) {
        return {
          code: 201,
          message: "Error occured",
          token: "",
        };
      }
    }
  },
  addUser: (args) => {
    const { fullname, email, password } = args;
    return { fullname, email, password };
  },

  // article
  createArticle: async (args) => {
    const {
      userId,
      title,
      minRead,
      description,
      featuredImage,
      footerLinks,
    } = args.input;
    const newArticle = new ArticleModel({
      title,
      minRead,
      description,
      featuredImage,
      footerLinks: footerLinks || [],
      userId,
    });
    try {
      const result = await newArticle.save();
      return result;
    } catch (err) {
      return { err: true, err };
    }
  },
  updateArticle: async (args) => {
    const { _id: articleId, input } = args;
    if (!input) return { err: true };
    const { title, minRead, description, featuredImage, footerLinks } = input;
    const obj = {};
    if (title) obj.title = title;
    if (minRead) obj.minRead = minRead;
    if (description) obj.description = description;
    if (featuredImage) obj.featuredImage = featuredImage;
    if (footerLinks) obj.footerLinks = footerLinks;
    try {
      const result = await ArticleModel.findByIdAndUpdate(
        articleId,
        { ...obj },
        { new: true }
      );
      return result;
    } catch (err) {
      console.log("updateArticle resolve -> err", err);
      return { err: true };
    }
  },
  deleteArticle: async (args) => {
    const { _id: articleId } = args;
    try {
      await ArticleModel.findByIdAndDelete(articleId);
      return {
        err: false,
        delete: true,
      };
    } catch (err) {
      return { err: true, err, delete: false };
    }
  },
  deleteAllArticle: async (args) => {
    const { userId } = args;
    try {
      await ArticleModel.deleteMany({ userId });
      return {
        err: false,
        delete: true,
      };
    } catch (err) {
      return { err: true, err, delete: false };
    }
  },
};
