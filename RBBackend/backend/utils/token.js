// import jWT from "jsonwebtoken";

// const token = (userId) =>{
//     return jWT.sign({userId}, process.env.SECRET_KEY,{
//         expiresIn:"1h"
//     })
// }

// export default token

import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Token valid for 1 hour
  });
};

export default generateToken;
