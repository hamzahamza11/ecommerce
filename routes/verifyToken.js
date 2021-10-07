const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  let token = req.header("auth-token");
  
  if (!token) return res.send("access denied!!");

  try {
    let verified = jwt.verify(token, process.env.TOKEN_SECRET);

    if(verified){
      // req.user = verified;
    console.log(verified.id);

    next();

    }
    
  } catch (error) {
    res.status(400).res.send("Invalid Token!");
  }
};