module.exports = (req, res, next) => {
  if (req.user == "admin") {
    next();
  } else {
    res.status(403).json({ error: "You are not allowed to access this" });
  }
};
