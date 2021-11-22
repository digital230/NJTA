module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in to view this resource");
    res.redirect("/users/login");
    return next();
  },

  ensureAdminAuthentication: function (req, res, next) {
    if (req.isAuthenticated() && req.user.code.includes("CAN") || req.isAuthenticated() && req.user.code.includes("CANEVAL")) {
      return next();
    }

    req.flash("error_msg", "Please log in as admin to view this resource");
    res.redirect("/users/login");
    return next();
  },

  checkLogedIn: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      next();
    }
  },
};
