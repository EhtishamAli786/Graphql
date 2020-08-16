const { ArticleModel, UserModel } = require("../models");

export const Queries = {
  article: async ({ _id }) => {
    try {
      const article = await ArticleModel.findById(_id);
      return article;
    } catch (err) {
      return { err: true, message: "article fetch error" };
    }
  },
  userArticles: async ({ userId }) => {
    try {
      const article = await ArticleModel.find({ userId });
      return article;
    } catch (err) {
      return { err: true, message: "article fetch error" };
    }
  },
  articles: async () => {
    try {
      const articleRes = await ArticleModel.find();
      return articleRes;
    } catch (err) {
      return { err: true, message: "articles fetch error" };
    }
  },
  allUsers: async () => {
    try {
      const users = await UserModel.find();
      return users;
    } catch (err) {
      return { err: true, message: "users fetch error" };
    }
  },
  userAllInfo: async ({ _id }) => {
    try {
      const user = await UserModel.findById(_id);
      if (user) {
        const article = await ArticleModel.find({ userId: _id });
        user.article = article;
      }
      return user;
    } catch (err) {
      return { err: true, message: "user fetch error" };
    }
  },
  user: async ({ _id }) => {
    try {
      const user = await UserModel.findById(_id);
      return user;
    } catch (err) {
      return { err: true, message: "users fetch error" };
    }
  },
};
