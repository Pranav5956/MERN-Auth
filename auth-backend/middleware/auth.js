import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ error: "No authentication token found, authorization denied" });
    }

    const verified = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ error: "Token verification failed, authorization denied" });
    }

    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default auth;
