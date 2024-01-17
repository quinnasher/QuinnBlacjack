import * as allFunctions from "./gameFunctions.mjs";
import { formatNumber, nFormatter } from "./gameFunctions.mjs";
import { deckCardsEl } from "./gamePage.mjs";

// Game logic
/**
 * Calculates the minimum and maximum allowed bet amounts based on a given player's balance.
 *
 * @param {Number} balance - The player's current balance.
 * @returns {Object} An object containing two properties:
 *   - minBet: {Number} The minimum allowed bet amount.
 *   - maxBet: {Number} The maximum allowed bet amount.
 */

/**
 * Calculates suggested stake amounts based on a given balance and updates corresponding button texts with formatted values.
 *
 * @returns {Object} An object containing key-value pairs of stake percentages (as keys) and their corresponding calculated amounts.
 */
export function displayStakeSuggestionBtns(balance) {
  function betSuggestion(percent) {
    return (percent * balance).toFixed(0);
  }

  const suggestions = [
    betSuggestion(0.05),
    betSuggestion(0.1),
    betSuggestion(0.3),
    betSuggestion(0.4),
    betSuggestion(0.5),
  ];

  suggestions.forEach((suggestion, index) => {
    const formattedSuggestion = suggestion; // Use the reusable function

    const btnEl = document.querySelector(`.stake-btn-${index}`);
    btnEl.textContent = formattedSuggestion;
  });
}

// populate deck visually
export function populateDeckWithImages() {
  // for (let i = 0; i < shuffledDeck.length; i++) { // Iterate up to length - 1
  //     const card = shuffledDeck[i];
  //
  //     const cardImage = document.createElement("img");
  //     cardImage.src = `../assets/cards/${card.value}_of_${card.suit}.png`;
  //     cardImage.classList.add("deck-img");
  //
  //     mainGameEls.deckCardsEl.appendChild(cardImage);
  // }

  for (let i = 0; i < 10; i++) {
    // Create and append the cover image after all deck cards
    const cover = document.createElement("img");
    cover.src = `../assets/cards/card-back.png`;
    cover.classList.add("deck-img");
    cover.classList.add("remove-shadow");

    deckCardsEl.appendChild(cover);
  }
}
