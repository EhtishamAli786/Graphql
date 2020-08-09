const jwt = require("jsonwebtoken");

export const generateAccessToken = (userId) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(userId.toString(), process.env.TOKEN_SECRET);
};
export const authenticateToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const tokenRetrieved = authHeader && authHeader.split(" ")[1];
  if (tokenRetrieved == null) return res.sendStatus(401); // if there isn't any tokenRetrieved

  jwt.verify(tokenRetrieved, process.env.TOKEN_SECRET, (err, userId) => {
    console.log("from token", userId);
    if (err) return res.sendStatus(403);
    req.userId = userId;
    next(); // pass the execution off to whatever request the client intended
  });
};
