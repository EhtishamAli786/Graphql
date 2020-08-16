import bcrypt from "bcryptjs";
import { generateAccessToken, LogErrors, SALT_ROUNDS } from "../utils";

const { ArticleModel, UserModel } = require("../models");
export const Mutations = {
  //auth
  login: async (args) => {
    const { email, password } = args;
    const user = await UserModel.findOne({ email });
    try {
      if (!user) {
        return {
          code: 404,
          message: "User not found",
          token: "",
        };
      } else {
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
  signUp: async (args) => {
    const { email, password, fullname } = args;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return {
          code: 201,
          message: "User email exists",
          token: "",
        };
      } else {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
          email,
          fullname,
          password: hashedPassword,
        });
        const result = await newUser.save();
        const token = generateAccessToken(result._id);
        return {
          code: 200,
          message: "User Found",
          token,
        };
      }
    } catch (err) {
      LogErrors({
        code: 201,
        message: err,
        token: "",
      });
    }
  },
  addUser: async (args, context) => {
    const { userId } = await context();
    if (!userId) {
      throw new Error("User not logged in");
    }
    const { fullname, email, password } = args;
    return { fullname, email, password };
  },

  // article
  createArticle: async (args, context) => {
    const {
      title,
      minRead,
      description,
      featuredImage,
      footerLinks,
    } = args.input;
    const { userId } = await context();
    if (!userId) {
      throw new Error("User not logged in");
    }
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
  updateArticle: async (args, context) => {
    const { userId } = await context();
    if (!userId) {
      throw new Error("User not logged in");
    }
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
  deleteArticle: async (args, context) => {
    const { userId } = await context();
    if (!userId) {
      throw new Error("User not logged in");
    }
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
  deleteAllArticle: async (args, context) => {
    const { userId } = await context();
    if (!userId) {
      throw new Error("User not logged in");
    }
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
