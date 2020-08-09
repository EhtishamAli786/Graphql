import { RootQuery as Query } from "./queries";
import { Mutation } from "./mutations";
const graphql = require("graphql");
const { GraphQLSchema } = graphql;

//old schema method
export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
