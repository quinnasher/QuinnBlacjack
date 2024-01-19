"use strict";

import { gameBodyEl, newGameEl } from "../gamePage.mjs";
import { stakeCtnEl } from "../stake.mjs";
import { gameInit } from "../functions/gameInit.mjs";
import { balance, setBalance } from "../functions/balance.mjs";
import { mainGameInit } from "../functions/mainGameInit.mjs";
import {
  stakeBtnEventLister,
  updateStakeSuggestionButtonTexts,
} from "../functions/stakeFunctions.mjs";

export function newGame() {
  newGameEl.addEventListener("click", function () {
    updateStakeSuggestionButtonTexts(balance);
    stakeBtnEventLister();
    mainGameInit();

    gameBodyEl.classList.toggle("hidden");
    stakeCtnEl.classList.remove("hidden");
  });
}
