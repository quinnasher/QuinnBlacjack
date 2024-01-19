"use strict";

import * as stakePage from "../stake.mjs";
import {stakeAllBtnEl} from "../stake.mjs";
import {percent} from "../main.mjs";
import {balance} from "./balance.mjs";
import {nFormatter} from "../gameFunctions.mjs";

/**
 * Attaches click event listeners to stake buttons, updating the stake input field with calculated amounts based on button values and the player's balance.
 */
export function stakeBtnEventLister() {
    for (let i = 0; i < stakePage.stakeAllBtnEl.length; i++) {
        const button = stakePage.stakeAllBtnEl[i];
        button.addEventListener("click", function () {
            stakePage.stakeInputEl.value = calculateStakeSuggestion(percent[i]);
        });
    }
}

/**
 * Updates the text content of stake suggestion buttons to display calculated amounts based on the player's balance and predefined percentages.
 *
 * @param {Number} balance - The player's current balance.
 */
export function updateStakeSuggestionButtonTexts(balance) {
    // Update text content of each stake suggestion button
    for (let i = 0; i < stakeAllBtnEl.length; i++) {
        stakeAllBtnEl[i].textContent = calculateStakeSuggestion(percent[i]);
    }
}

function calculateStakeSuggestion(percent) {
    return (percent * balance).toFixed(0);
}
