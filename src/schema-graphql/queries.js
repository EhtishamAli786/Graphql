import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils";
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

export const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    // login: {
    //   type: LoginType,
    //   args: {
    //     email: { type: new GraphQLNonNull(GraphQLString) },
    //     password: { type: new GraphQLNonNull(GraphQLString) },
    //   },
    //   async resolve(parent, args) {
    //     const { email, password } = args;
    //     const user = await UserModel.findOne({ email });
    //     try {
    //       if (!user) {
    //         return {
    //           code: 404,
    //           message: "User not found",
    //           token: null,
    //         };
    //       } else {
    //         try {
    //           const isMatch = await bcrypt.compare(password, user.password);

    //           if (isMatch) {
    //             const token = generateAccessToken(user._id);
    //             return {
    //               code: 200,
    //               message: "User Found",
    //               token,
    //             };
    //           }
    //           return {
    //             code: 201,
    //             message: "Failed to get single user",
    //             token: null,
    //           };
    //         } catch (e) {
    //           return {
    //             code: 201,
    //             message: "Error occured",
    //             token: null,
    //           };
    //         }
    //       }
    //     } catch (err) {
    //       if (!!err) {
    //         return {
    //           code: 201,
    //           message: "Error occured",
    //           token: null,
    //         };
    //       }
    //     }
    //   },
    // },
    // allUsers: {
    //   type: new GraphQLList(UserType),
    //   async resolve(parent, args) {
    //     try {
    //       const users = await UserModel.find();
    //       return users;
    //     } catch (err) {
    //       return { err: true, message: "users fetch error" };
    //     }
    //   },
    // },

    article: {
      type: ArticleType,
      args: { _id: { type: GraphQLID } },
      async resolve(args) {
        console.log("resolve -> args", args);
        try {
          const article = await ArticleModel.find({ _id: args._id });
          return article[0];
        } catch (err) {
          return { err: true, message: "article fetch error" };
        }
      },
    },
    articles: {
      type: new GraphQLList(ArticleType),
      async resolve(parent, args) {
        try {
          const articleRes = await ArticleModel.find();
          return articleRes;
        } catch (err) {
          return { err: true, message: "articles fetch error" };
        }
      },
    },
  },
});
