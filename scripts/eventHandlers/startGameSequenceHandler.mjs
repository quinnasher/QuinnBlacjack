"use strict";

import * as welcome from "../welcome.mjs";
import * as stakePage from "../stake.mjs";

/**
 * Initiates the game sequence by setting up event listeners and transitions for starting the game.
 */
export function initiateGameStartSequence() {
  welcome.playNowBtnEl.addEventListener("click", function () {
    // Transition welcome page out with visual smoothing
    welcome.welcomePageEl.classList.add("transition-ease-out");

    // Hide welcome page and reveal stake page after a slight delay
    setTimeout(() => {
      welcome.welcomePageEl.classList.add("hidden");
      stakePage.stakeCtnEl.classList.remove("hidden");
    }, 1500);
  });
}
