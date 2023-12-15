// import modules
const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  try {
    //* retrieve the Authorization header from the incoming request
    const authHeader = req.get("Authorization");

    //* authHeader is "Bearer" and " "(space) and token, like: "Bearer jkdhvkjdasvdslvniudsunvjbasdvbhvv"
    //* authHeader.split(" ") return an array like this:["Bearer","jkdhvkjdasvdslvniudsunvjbasdvbhvv"]
    //* and we use .split(" ")[1] to separate the index 1 from it.this will return token
    const token = authHeader.split(" ")[1];

    //* verify the token using the secret key and if invalid, block the request with a 401 unauthorized status
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    //* get the isAdmin value from the token and check if it is true, to allow the user to create, update, or delete data.
    if (decodedToken.isAdmin) {
      next(); //* if isAdmin was true, it allows the next function to run
    } else {
      //*if isAdmin was false return an error
      const err = new Error("You are not an admin");
      err.statusCode = 403; //*forbiden
      throw err;
    }
  } catch (error) {
    next(error);
  }
};
//*exports isAdmin
module.exports = isAdmin;
