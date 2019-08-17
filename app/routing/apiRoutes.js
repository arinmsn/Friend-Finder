var path = require("path");

var friends = require("../data/friends");

module.exports = function(app) {
  //a GET route that displays JSON of all possible friends
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body);
    var userResponses = req.body.score;

    var matchName = "";
    var matchIamge = "";
    var totalDifference = 40;

    for (var i = 0; i < friends.length; i++) {
      // Iterate over *all* friends
      var diff = 0;

      for (var j = 0; j < userResponses.length; j++) {
        // Iterate over *scores* of all friends
        diff += Math.abs(friends[i].scores[j] - userResponses[j]);
        console.log(diff);
      }

      if (diff < totalDifference) {
        totalDifference = diff;
        matchName = friends[i].name;
        matchImage = friends[i].photo;
      }
    }

    friends.push(req.body);
    res.json({ status: "OK", matchName: matchName, matchImage: matchImage });
  });
  //----------------------------------------------------------------------------------
};
