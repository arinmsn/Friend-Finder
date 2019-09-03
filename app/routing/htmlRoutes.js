// Dependencies
var path = require("path");

// Exporting HTML routes
module.exports = function(app) {
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });

  app.get("/survey", function(req, res) {
    //app.get
    res.sendFile(path.join(__dirname + "/../public/survey.html"));
  });
};
