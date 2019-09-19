const express = require("express");
const router = express.Router();

const GameModel = require("../../../models/ai/Game");
const AIGame = require("../../../util/AI/AIGame");

router.post("/new", (req, res) => {
  let newGame = new AIGame();
  let newGameModel = new GameModel(newGame);

  newGameModel
    .save()
    .then(game => res.json(game))
    .catch(error => {
      res.send(error);
    });
});

router.get("/:id", (req, res) => {
  GameModel.findById(req.params.id)
    .then(game => {
      if (game.state === "game-over") {
        res.json({ error: "That game is over" });
      } else if (AIGame.checkTimeout(game)) {
        GameModel.findOneAndUpdate({ _id: req.params.id }, game, {
          new: true,
          lean: true
        }).then(game => {
          game.error = "Timed out";
          res.json(game);
        });
      } else {
        res.json(game);
      }
    })
    .catch(error => res.status(404).json(error));
});

router.put("/:id/pass-tuning/:targetFrequency", (req, res) => {
  GameModel.findById(req.params.id)
    .then(game => {
      if (game.state !== "tuning") {
        res.send({ error: "Not in tuning state" });
      } else if (req.params.targetFrequency != game.targetFrequency) {
        res.send({ error: "Frequency doesn't match" });
      } else {
        AIGame.setState(game, "playing");
        GameModel.findByIdAndUpdate(req.params.id, game, {
          new: true,
          lean: true
        }).then(game => {
          res.json(game);
        });
      }
    })
    .catch(error => res.status(404).json(error));
});

router.put("/:id/submit/:menuIndex", (req, res) => {
  GameModel.findById(req.params.id)
    .then(game => {
      if (game.state !== "playing") {
        res.json({ error: "Not in playing state" });
      } else if (AIGame.checkTimeout(game)) {
        GameModel.findOneAndUpdate({ _id: req.params.id }, game, {
          new: true,
          lean: true
        })
          .then(game => {
            game.error = "Timed out";
            res.json(game);
          })
          .catch(error => res.send(error));
      } else {
        AIGame.submit(game, req.params.menuIndex);
        GameModel.findOneAndUpdate({ _id: req.params.id }, game, {
          new: true,
          lean: true
        })
          .then(game => res.json(game))
          .catch(error => res.send(error));
      }
    })
    .catch(error => res.status(404).json(error));
});

module.exports = router;
