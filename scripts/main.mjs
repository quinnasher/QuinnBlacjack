"use strict";

import {gameInit} from "./functions/gameInit.mjs";
import {initiateGameStartSequence} from "./eventHandlers/startGameSequenceHandler.mjs";
import {clearStakeButtonClick, playBtn, removePopup} from "./eventHandlers/stakeHandler.mjs";
import {hitBtn} from "./eventHandlers/hitHandler.mjs";
import {restartGame} from "./eventHandlers/restartHandler.mjs";
import {populateDeckWithImages} from "./uiFunctions.mjs";
import {newGame} from "./eventHandlers/newGameHandler.js";
import {standBtn} from "./eventHandlers/standHanler.mjs";


export const percent = [0.05, 0.1, 0.3, 0.4, 0.5];

// initialize the game
gameInit()

initiateGameStartSequence();


restartGame()

// Play event listener
playBtn()

newGame()

clearStakeButtonClick()

removePopup()

// hit btn event listener
hitBtn()

standBtn()

