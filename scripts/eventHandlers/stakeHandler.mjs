"use strict";
import {betMinMax, nFormatter} from "../functions/gameFunctions.mjs";
import {balance, setBalance} from "../functions/balance.mjs";
import {
    balanceEl, clearPopUp,
    clearStakeBtn,
    playBtnEl,
    popUpContentEl,
    popUpEl,
    stakeAllBtnEl,
    stakeCtnEl,
    stakeInputEl,
    stakeInputMinMaxValue,
} from "../functions/stake.mjs";
import {gameBodyEl, stakeDisplayEl} from "../functions/gamePage.mjs";
import {updateStakeSuggestionButtonTexts} from "../functions/stakeFunctions.mjs";
import {percent} from "../main.mjs";
import {displayStakeSuggestionBtn} from "../functions/uiFunctions.mjs";

/**
 * Handles the "Play" button click on the stake page, validating the stake input, updating the game state, and transitioning to the main game page.
 */
export function playBtn() {
    playBtnEl.addEventListener("click", function () {
        const stake = Number(stakeInputEl.value);
        const minMax = betMinMax(balance);
        updateStakeSuggestionButtonTexts(balance);
        let validStake = [];

        if (!stake) {
            showPopup("invalid bet");
        } else if (minMax.minBet > stake) {
            showPopup("bet is too low");
        } else if (minMax.maxBet < stake) {
            showPopup("bet is too high");
        } else {
            stakeAllBtnEl.forEach((btn) => {
                validStake.push(Number(btn.textContent));
            });

            if (validStake.includes(stake)) {
                setBalance(balance - stake);

                // hide the stake page and go to the main game page
                stakeCtnEl.classList.toggle("hidden");
                // TODO: un hide the main game page
                gameBodyEl.classList.remove("hidden");
                // update the ui balance
                balanceEl.forEach((element) => {
                    element.textContent = `Bal : ₦${nFormatter(balance)}`;
                });

                // update the input placeholder minMax values and minMax values
                stakeInputMinMaxValue(minMax);

                stakeInputEl.placeholder = `₦${nFormatter(
                    minMax.minBet,
                )} - ₦${nFormatter(minMax.maxBet)}`;

                // update the stake value in the main game section
                stakeDisplayEl.textContent = `Stake : ₦${nFormatter(stake)}`;
            } else {
                showPopup("In valid bet. Choose from the provide buttons");
            }
        }

        // console.log(validStake)
        displayStakeSuggestionBtn(balance)
        stakeInputMinMaxValue(minMax);

    });


}

export function showPopup(message) {
    popUpEl.classList.toggle("hidden");
    popUpContentEl.textContent = message;
}

export function removePopup() {
    clearPopUp.addEventListener("click", function () {
        popUpEl.classList.toggle("hidden");
    });
}

/**
 * Handles the "Clear Stake" button click, resetting the stake input field, updating bet limits, and refreshing the displayed stake value.
 */
export function clearStakeButtonClick() {
    clearStakeBtn.addEventListener("click", function () {
        const minMax = betMinMax(balance);

        // Update UI elements reflecting bet limits
        stakeInputMinMaxValue(minMax);

        // Clear stake input field
        stakeInputEl.value = "";

        // Set placeholder text to indicate allowed bet range
        stakeInputEl.placeholder = `₦${nFormatter(minMax.minBet)} - ₦${nFormatter(
            minMax.maxBet,
        )}`;

        // Reset displayed stake value
        stakeDisplayEl.textContent = `Stake : ₦${0}`;

        console.log(`MinMax is: ${minMax}`)
    });
}
