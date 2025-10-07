// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user; // bu yerda .user bor, chunki payload ichida { user: { id } }
//     next();
//   } catch (err) {
//     return res.status(401).json({ msg: "Token is not valid" });
//   }
// };

// module.exports = auth;

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Token yo‘q!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token yaroqsiz yoki muddati tugagan" });
  }
};
