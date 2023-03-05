const requireLogin = require("../middlewares/requireLogin")

module.export = (app) => {
  app.post("/api/surveys", requireLogin, (req, res) => {

  });
};
