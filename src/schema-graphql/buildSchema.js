var { buildSchema } = require("graphql");
export const buildSchema = buildSchema(`type Query {
  articles: [Article]
  article(_id: ID): Article
  # allUsers: [User]
}
# type Mutation {
#   login(email: String!, password: String!): User
# }
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
  footerLinks: String
}
type User {
  fullname: String
  email: String
  password: String
  _id: String
}
`);
