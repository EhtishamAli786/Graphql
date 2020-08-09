import { Queries } from "./queries";
import { Mutations } from "./mutations";

//old schema method
export * from "./buildSchema";
export const RootQuery = {
  //queries
  ...Queries,
  //mutations
  ...Mutations,
};
