const graphql = require("graphql");
const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
} = graphql;
const { ArticleModel } = require("../models");

//auth

export const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    code: { type: GraphQLInt },
    message: { type: GraphQLString },
    token: { type: GraphQLString },
  }),
});
export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    _id: { type: GraphQLID },
  }),
});

//articles
export const ArticleType = new GraphQLObjectType({
  name: "Article",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    userId: {
      type: GraphQLID,
      required: true,
    },
    minRead: { type: GraphQLString },
    description: { type: GraphQLString },
    featuredImage: {
      type: GraphQLString,
    },
    footerLinks: { type: new GraphQLList(GraphQLString) },
  }),
});
