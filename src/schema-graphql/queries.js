const { ArticleModel, UserModel } = require("../models");

export const Queries = {
  article: async ({ _id, ...args }) => {
    try {
      const article = await ArticleModel.find({ _id });
      return article[0];
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
};
