import jwt from "jsonwebtoken";
const isLoggedIn = async (req, res, next) => {
  try {
    console.log(req.cookies);

    let token = req.cookies.token || "";

    console.log("Token Found: ", token ? "YES" : "NO");

    if (!token) {
      console.log("no token");

      res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    try {
      console.log("decoded = ", decoded);

      req.user = decoded;
      next();
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"JWT verify server error"
        })
    }
  } catch (error) {
    console.log("Auth middleware failed ");

    return res.status(500).json({
        success:false,
        message:"internal server error"
    })
    
  }
};

export { isLoggedIn };
