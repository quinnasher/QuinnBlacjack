"use strict";

import {dealerCardCtnEl} from "./gamePage.mjs";
import {isEnded} from "./gameBooleans.mjs";
import {dealerHand} from "./hand.mjs";

export function displayDealerFullHand() {
    if (isEnded) {
        // console.log(`is ended is ${isEnded}`)
        dealerCardCtnEl.innerHTML = "";

        for (let i = 0; i < dealerHand.length; i++) {
            const image = document.createElement("img");
            image.src = `assets/cards/${dealerHand[i].rank}_of_${dealerHand[i].suit}.png`;
            image.classList.add("mr-2rem");

            dealerCardCtnEl.appendChild(image);
        }
    }
}
