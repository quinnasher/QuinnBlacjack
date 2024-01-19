import * as mainGameEls from "../functions/gamePage.mjs";
import * as welcome from "../functions/welcome.mjs";
import {gameInit} from "../functions/gameInit.mjs";
import {stakeInit} from "../functions/stakeInit.mjs";
import {mainGameInit} from "../functions/mainGameInit.mjs";

export function restartGame() {
    mainGameEls.restartEl.addEventListener("click", function () {
        // call the stakeInit function to set game initial values
        stakeInit()
        mainGameInit()

        // take the user to the first page
        mainGameEls.gameBodyEl.classList.toggle("hidden")
        welcome.welcomePageEl.classList.remove("hidden")
        welcome.welcomePageEl.classList.remove("transition-ease-out"); // remove transition

    })
}