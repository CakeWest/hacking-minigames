const GameModel = require("../../models/ai/Game");
const AIGame = require("./AIGame");

function updateTimedOutGames() {
  let totalGamesTimedOut = 0;

  GameModel.find({ state: "playing" }).then(games => {
    console.log(`Found ${games.length} games in playing state.`);

    games.forEach(game => {
      if (AIGame.checkTimeout(game)) {
        GameModel.updateOne({ _id: game.id }, game);
        totalGamesTimedOut += 1;
      }
    });

    console.log(
      `Updated ${totalGamesTimedOut}/${games.length} timed out games.`
    );
  });
}

function updateOldGames() {
  let totalOldGames = 0;

  GameModel.find({ state: { $ne: "game-over" } }).then(games => {
    let now = Date.now();
    console.log(`Found ${games.length} games not in game-over state.`);

    games.forEach(function(game) {
      if (now - game.created >= 24 * 60 * 60 * 1000) {
        GameModel.updateOne({ _id: game.id }, { state: "game-over" });
        totalOldGames += 1;
      }
    });

    console.log(`Updated ${totalOldGames} old games.`);
  });
}

module.exports = { updateTimedOutGames, updateOldGames };
