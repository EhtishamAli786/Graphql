import { Queries } from "./queries";
import { Mutations } from "./mutations";

//old schema method
export * from "./buildSchema";
export * from "./context";
export const RootQuery = {
  //queries
  ...Queries,
  //mutations
  ...Mutations,
};
