"use strict";

import { gameBodyEl, newGameEl } from "../functions/gamePage.mjs";
import { stakeCtnEl } from "../functions/stake.mjs";
import { balance, setBalance } from "../functions/balance.mjs";
import { mainGameInit } from "../functions/mainGameInit.mjs";
import {
  stakeBtnEventLister,
  updateStakeSuggestionButtonTexts,
} from "../functions/stakeFunctions.mjs";

export function newGame() {
  newGameEl.addEventListener("click", function () {
    mainGameInit();
    updateStakeSuggestionButtonTexts(balance);
    stakeBtnEventLister();

    gameBodyEl.classList.toggle("hidden");
    stakeCtnEl.classList.remove("hidden");
  });
}
