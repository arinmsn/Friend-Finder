var path = require("path");

var friends = require("../data/friends");

module.exports = function(app) {
  //a GET route that displays JSON of all possible friends
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    // ==
    var totalDifference = 0;
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    var userData = req.body;
    var userName = userData.name;
    var userScores = userData.scores;

    var b = userScores.map(function(item) {
      return parseInt(item, 10);
    });

    userData = {
      name: req.body.name,
      photo: req.body.photo,
      score: b
    };
    console.log(`-----`);
    console.log(`Name:  ${userName}`);
    console.log(`User score:  ${userScores}`);
    console.log(`-----`);
    var sum = b.reduce((a, b) => a + b, 0);
    console.log(`User's sum of scores:  ${sum}`);
    console.log(`Best match friends difference: ${bestMatch.friendDifference}`);
    console.log(`-----`);

    // Loop through all friends
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      totalDifference = 0;
      console.log(`Total Difference: ${totalDifference}`);
      console.log(
        `Best match friends difference: ${bestMatch.friendDifference}`
      );

      var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
      console.log(`Total best friend score: ${bfriendScore}`);
      totalDifference += Math.abs(sum - bfriendScore);
      console.log(`-----${totalDifference}`);
    }

    // Determing best match
    if (totalDifference <= bestMatch.friendDifference) {
      bestMatch.name = friends[i].name;
      bestMatch.photo = friends[i].photo;
      bestMatch.friendDifference = totalDifference;
    }
    console.log(`Total difference: ${totalDifference}`);
    friends.push(userData);
    console.log("New user was added.");
    console.log(userData);
    res.json(bestMatch);
    // ==
    /*
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
  */
  });
};
