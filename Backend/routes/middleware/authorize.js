// role-based authorization middleware
module.exports = function authorize(allowedRoles = []) {
  // allow a single role string to be passed
  if (typeof allowedRoles === "string") allowedRoles = [allowedRoles];

  return (req, res, next) => {
    try {
      const user = req.user;
      if (!user || !user.role) {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
      }

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        const err = new Error("Forbidden: insufficient role");
        err.status = 403;
        throw err;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
