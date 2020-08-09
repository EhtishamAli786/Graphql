const graphql = require("graphql");
const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = graphql;
const { ArticleModel, UserModel } = require("../models");
const { ArticleType, LoginType, UserType } = require("./queryTypes");
export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        fullname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { fullname, email, password } = args;
        return { fullname, email, password };
      },
    },

    createArticle: {
      type: ArticleType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        minRead: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        featuredImage: { type: new GraphQLNonNull(GraphQLString) },
        footerLinks: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args) {
        const {
          userId,
          title,
          minRead,
          description,
          featuredImage,
          footerLinks,
        } = args;
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
    },
    updateArticle: {
      type: ArticleType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        minRead: { type: GraphQLString },
        description: { type: GraphQLString },
        featuredImage: { type: GraphQLString },
        footerLinks: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const {
          _id: articleId,
          title,
          minRead,
          description,
          featuredImage,
          footerLinks,
        } = args;
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
          throw new Error("Error Error");
          return result;
        } catch (err) {
          console.log("updateArticle resolve -> err", err);
          return { err: true };
        }
      },
    },
    deleteArticle: {
      type: ArticleType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const { _id: articleId } = args;
        try {
          const result = await ArticleModel.findByIdAndDelete(articleId);
          return result;
        } catch (err) {
          return { err: true, err };
        }
      },
    },
    deleteAllArticle: {
      type: ArticleType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const { userId } = args;
        try {
          await ArticleModel.deleteMany({ userId });
          return {
            err: false,
          };
        } catch (err) {
          return { err: true, err };
        }
      },
    },
  },
});
