const callbackCode = require("./CallbackCode");

// Handles game logic, often with side effects
class AIGame {
  constructor(id) {
    this.id = id;
    this.state = "tuning";
    this.score = 0;
    this.failCount = 0;
    this.countdownStart = 0;
    this.countdownDuration = 10;
    this.callbackIndex = 0;
    this.roundIndex = 0;
    this.targetFrequency = 0;
    this.rounds = [];

    // Build first round's menu & sequence
    let menuOptions = callbackCode.buildMenuOptions();
    let callbackSequence = callbackCode.buildSequence(menuOptions);
    this.rounds.push({ menuOptions, callbackSequence });
  }

  static setState(game, state) {
    game.state = state;

    switch (state) {
      case "playing":
        AIGame.newTargetFrequency(game);
        AIGame.startCountdown(game);
        break;
    }
  }

  static startCountdown(game) {
    game.countdownStart = Date.now();
  }

  static newTargetFrequency(game) {
    game.targetFrequency = Math.floor(Math.random() * 360 + 1);
  }

  static submit(game, menuIndex) {
    let submission = game.rounds[game.rounds.length - 1].menuOptions[menuIndex];
    let correct =
      game.rounds[game.rounds.length - 1].callbackSequence[game.callbackIndex];

    if (submission === correct) {
      AIGame.pass(game);
    } else {
      AIGame.fail(game);
    }
  }

  static pass(game) {
    game.score += 1;
    game.callbackIndex += 1;

    if (
      game.callbackIndex >=
      game.rounds[game.rounds.length - 1].callbackSequence.length
    ) {
      AIGame.newRound(game);
    }
  }

  static fail(game) {
    game.failCount += 1;
    AIGame.newTargetFrequency(game);

    if (game.failCount >= 3) {
      game.state = "game-over";
    } else {
      game.state = "tuning";
    }
  }

  static newRound(game) {
    let menuOptions = callbackCode.buildMenuOptions();
    let callbackSequence = callbackCode.buildSequence(menuOptions);
    game.roundIndex += 1;
    game.callbackIndex = 0;

    // Decrease time for difficulty
    if (game.roundIndex > 5 && game.allottedTime > 5) {
      game.allottedTime = 5;
    }

    game.rounds.push({ menuOptions, callbackSequence });
    AIGame.startCountdown(game);
  }

  static checkTimeout(game) {
    let secondsPassed = (Date.now() - game.countDownStart) / 1000;
    if (secondsPassed >= game.countDownDuration) {
      AIGame.setState(game, "game-over");
      return true;
    } else {
      return false;
    }
  }
}

module.exports = AIGame;
