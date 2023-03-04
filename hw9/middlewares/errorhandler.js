function errorHandler(err, req, res, next) {
  if (err.name === "ErrorNotFound") {
    res.status(404).json({ message: "Error Not Found" });
  } else if (err.name === "WrongPassword") {
    res.status(400).json({ message: "Wrong Password or Username" });
  } else if (err.name === "Unauthentication") {
    res.status(400).json({ message: "Unauthenticated" });
  } else if (err.name === "JWTError") {
    res.status(400).json({ message: "JWT ERROR" });
  } else if (err.name === "Unauthorization") {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = errorHandler;
