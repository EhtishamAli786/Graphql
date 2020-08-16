import { verifyToken } from "../utils";

export const context = async (req) => {
  const authHeader = req.headers["authorization"];
  const tokenRetrieved = authHeader && authHeader.split(" ")[1];
  if (tokenRetrieved == null) return { userId: null };
  const userId = verifyToken(tokenRetrieved);
  if (!userId) return { userId: null };

  return { userId };
};
