const { verify } = require("jsonwebtoken");

exports.checktoken = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        verify(token, "qwerty123", (err, decodedToken) => {
          if (err) {
            res.status(400).json({
              success: false,
              message: "Invalid Token",
            });
          } else {
            // console.log(decodedToken);
            // console.log(decodedToken.result.user_id);
            req.decodedToken = decodedToken;
            next();
          }
        });
      }
    }
    // console.log(token);
    if (!token) {
      res.status(401).json({
        status: "0",
        message: "You are not authorized to access this",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
