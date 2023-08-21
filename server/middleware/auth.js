import jwt from "jsonwebtoken";
/*  one optional parameter called next 
this next will allow us to have the function continue  
from the request from the frontend we are grabing the authorization header and thats where token wil be set in the frontend 
the frontend will set this and we are grabing it in the backend through this key
-if the token start with bearer string 
*/
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};