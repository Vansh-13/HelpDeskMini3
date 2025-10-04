// middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(roles = []) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: { code: "UNAUTHORIZED" } });
    
    const token = authHeader.split(' ')[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      
      // Check role
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ error: { code: "FORBIDDEN", message: "Access denied" } });
      }
      
      next();
    } catch {
      res.status(401).json({ error: { code: "UNAUTHORIZED" } });
    }
  }
};
