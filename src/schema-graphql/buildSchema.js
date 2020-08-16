const { buildSchema } = require("graphql");
export const schema = buildSchema(`
  type Query {
    articles: [Article]
    article(_id: ID): Article
    user(_id:ID): User
    userAllInfo(_id:ID): User
    allUsers: [User] 
  }
  type Mutation {
    login(email: String!, password: String!): LoginType
    signUp(email: String!, password: String!, fullname:String!): LoginType
    addUser(input: AddUserInput!): AddUser
    createArticle(input: CreateArticleInput!): Article
    updateArticle(_id: ID!, input: CreateArticleInput): Article
    deleteArticle(_id: ID!): DeleteRes
    deleteAllArticle(userId: ID!): DeleteRes
  }
  type LoginType {
    message: String
    token: String
    code: Int
  }
  type Article {
    _id: ID
    title: String
    created_at: String
    updated_at: String
    userId: String
    minRead: String
    description: String
    featuredImage: String
    footerLinks: [String]
  }
  type User {
    fullname: String
    email: String
    password: String
    _id: String
    article: [Article]
  }  
  input AddUserInput {
    fullname: String
    email: String
    password: String
  }
  type AddUser {
    fullname: String
    email: String
    password: String
  }
  input CreateArticleInput {
    title: String 
    minRead: String
    description: String
    featuredImage: String
    footerLinks: [String]
  }
  type DeleteRes {
    err: Boolean
    delete: Boolean
  }
`);
