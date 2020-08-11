const { ArticleModel, UserModel } = require("../models");

export const Queries = {
  article: async ({ _id, ...args }) => {
    try {
      const article = await ArticleModel.findById(_id);
      return article;
    } catch (err) {
      return { err: true, message: "article fetch error" };
    }
  },
  userArticles: async ({ userId }) => {
    console.log("userArticles userId", userId);
    try {
      const article = await ArticleModel.find({ userId });
      return article;
    } catch (err) {
      return { err: true, message: "article fetch error" };
    }
  },
  articles: async (args) => {
    try {
      const articleRes = await ArticleModel.find();
      return articleRes;
    } catch (err) {
      return { err: true, message: "articles fetch error" };
    }
  },
  allUsers: async (args) => {
    try {
      const users = await UserModel.find();
      return users;
    } catch (err) {
      return { err: true, message: "users fetch error" };
    }
  },
  userAllInfo: async ({ userId }) => {
    console.log("userId", userId);
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (err) {
      return { err: true, message: "users fetch error" };
    }
  },
};
