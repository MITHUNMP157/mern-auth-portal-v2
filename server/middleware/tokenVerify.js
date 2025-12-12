import jwt from "jsonwebtoken";

export const tokenVerify = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
      return res.status(400).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(404).json({ error: "Unauthorized: invalid token" });
      }
      req.user = decoded;
    });
    next();
  } catch (error) {
    console.log("Error from tokenVerify middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
