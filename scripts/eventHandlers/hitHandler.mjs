"use strict";

import * as mainGameEls from "../gamePage.mjs";
import * as allFunctions from "../gameFunctions.mjs";
import {calculateScore} from "../gameFunctions.mjs";
import {playerHand} from "../functions/hand.mjs";
import {displayDealerFullHand} from "../functions/displayDealerFullHand.mjs";
import {playerScore, setPlayerScore} from "../functions/score.mjs";
import {gameOutcome} from "../functions/gameOutcome.mjs";
import {displayStakeSuggestionBtn} from "../uiFunctions.mjs";
import {balance} from "../functions/balance.mjs";
import {updateStakeSuggestionButtonTexts} from "../functions/stakeFunctions.mjs";
import {deck, setShuffledDeck, shuffledDeck} from "../functions/deck.mjs";
import {isEnded} from "../functions/gameBooleans.mjs";

export function hitBtn() {
    mainGameEls.hitBtnEl.addEventListener("click", function () {
        if (!isEnded) {
            if (shuffledDeck.length > 1) {
                setShuffledDeck(allFunctions.shuffle(deck));
            }

            const dealCard = allFunctions.dealCard(shuffledDeck);

            mainGameEls.dealCard.classList.add("deal-animation");
            mainGameEls.dealCard.classList.add("z-index-10");

            setTimeout(function () {
                let imageElement = document.createElement("img");
                imageElement.src = `assets/cards/${dealCard.rank}_of_${dealCard.suit}.png`;

                imageElement.classList.add("mr-2rem");
                mainGameEls.playerCardCtnEl.appendChild(imageElement);

                mainGameEls.dealCard.classList.remove("deal-animation"); // remove this class so that it can be added again
                mainGameEls.dealCard.classList.remove("z-index-10");

                // update player hand
                playerHand.push(dealCard);

                // update player's score
                setPlayerScore(calculateScore(playerHand));

                // console.log(playerHand)
                // console.log(playerScore)
                displayDealerFullHand();
                gameOutcome();
                updateStakeSuggestionButtonTexts(balance);
                displayStakeSuggestionBtn(balance);
            }, 1000);
        }
    });
}
