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
    let sum = b.reduce((a, b) => a + b, 0);

    // Loop through all friends
    for (let i = 0; i < friends.length; i++) {
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
  });
};
