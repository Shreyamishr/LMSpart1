// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const genToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// export default genToken;

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const genToken = (id) => {
  // Sign a token with `userId` so `isAuth` can read `verifyToken.userId`
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default genToken;

