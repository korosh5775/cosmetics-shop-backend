// Import modules
const jwt = require("jsonwebtoken");

const authenticated = (req, res, next) => {
  try {
    //* retrieve the Authorization header from the incoming request
    const authHeader = req.get("Authorization");
    //* if Authorization header is missing, block the request and return a 403 forbidden status
    if (!authHeader) {
      const err = new Error("You are not allowed");
      err.statusCode = 403; //*forbiden
      throw err; //*throw error to catch
    }
    //* authHeader is "Bearer" and " "(space) and token, like: "Bearer jkdhvkjdasvdslvniudsunvjbasdvbhvv"
    //* authHeader.split(" ") return an array like this:["Bearer","jkdhvkjdasvdslvniudsunvjbasdvbhvv"]
    //* and we use .split(" ")[1] to separate the index 1 from it.this will return token
    const token = authHeader.split(" ")[1];

    //* verify the token using the secret key and if invalid, block the request with a 401 unauthorized status
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      const err = new Error("You are not allowed");
      err.statusCode = 401; //*unauthorized
      throw err; //*throw error to catch
    }

    //* attach the user ID from the decoded token to the request object for use in subsequent middleware/routes
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    next(err);
  }
};
//export authHandler
module.exports = authenticated;
