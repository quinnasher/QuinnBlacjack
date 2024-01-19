"use strict";

// Importing functions and event handlers
import {gameInit} from "./functions/gameInit.mjs";
import {initiateGameStartSequence} from "./eventHandlers/startGameSequenceHandler.mjs";
import {clearStakeButtonClick, playBtn, removePopup, showPopup} from "./eventHandlers/stakeHandler.mjs";
import {hitBtn} from "./eventHandlers/hitHandler.mjs";
import {restartGame} from "./eventHandlers/restartHandler.mjs";
import {newGame} from "./eventHandlers/newGameHandler.js";
import {standBtn} from "./eventHandlers/standHanler.mjs";
import {balance} from "./functions/balance.mjs";
import {betMinMax} from "./functions/gameFunctions.mjs";

// Constants for stake percentages
export const percent = [0.05, 0.1, 0.3, 0.4, 0.5];

// Initialize the game
gameInit();

// Start the game sequence
initiateGameStartSequence();

// Restart the game
restartGame();

// Play button event listener
playBtn();

// New game event listener
newGame();

// Clear stake button click event
clearStakeButtonClick();

// Remove popup event
removePopup();

// Show popup if balance is insufficient
if (balance < betMinMax(balance).minBet) {
    showPopup("You are out of credits.");
    removePopup();
}

// Hit button event listener
hitBtn();

// Stand button event listener
standBtn();

doubleBtn()