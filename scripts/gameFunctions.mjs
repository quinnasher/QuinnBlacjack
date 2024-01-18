"use strict";

/**
 * Creates a new standard deck of 52 playing cards, represented as an array of objects.
 *
 * @returns {Array<Object>} An array containing 52 objects, each representing a card with the following properties:
 *   - suit: {String} The suit of the card ('Spades', 'Hearts', 'Diamonds', or 'Clubs').
 *   - rank: {String} The rank of the card ('Ace', 2-10, 'Jack', 'Queen', or 'King').
 *   - value: {Number} The numerical value of the card (11 for Ace, 2-10 for numbered cards, 10 for face cards).
 */
export function createDeck() {
    const suits = ["spades", "hearts", "diamonds", "clubs"];
    const ranks = [
        "ace",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "jack",
        "queen",
        "king",
    ];

    const values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

    let deck = [];

    // for (const suit of suits) {
    //   let cards = ranks.map((rank, index) => {
    //     let obj = { rank: rank, value: values[index] };
    //     return Object.assign({ suit: suit }, obj);
    //   });
    //   // deck.push(cards);
    //   console.log(cards);
    // }

    for (const suit of suits) {
        for (let i = 0; i < ranks.length; i++) {
            deck.push({suit: suit, rank: ranks[i], value: values[i]});
        }
    }

    return deck;
}

/**
 * Randomly shuffles the elements of an array and returns a new shuffled array.   *
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} The same array, now shuffled in a random order.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * shuffle(numbers);
 * console.log(numbers); // Output: [4, 2, 5, 1, 3] (or any other randomly shuffled order)
 */
export function shuffle(array) {
    let copy = [...array];
    for (let i = 0; i < copy.length; i++) {
        let randomIndex;
        randomIndex = Math.floor(Math.random() * copy.length);
        let temp = copy[i];

        copy[i] = copy[randomIndex];
        copy[randomIndex] = temp;
    }

    return copy;
}

/**
 * Deals a single card from the top of the shuffled deck.
 *
 * @param {Array} shuffledDeck - An array representing a deck of cards in a shuffled order.
 * @returns {Object} The card that was dealt, representing a single card.
 *
 *
 * @example
 * const card = dealCard(shuffledDeck);
 * console.log(card); // Output: "Ace of Spades" (or similar card representation)
 */
export function dealCard(shuffledDeck) {
    return shuffledDeck.pop();
}

/**
 * Calculates the total value of a hand of cards in a card game, considering the flexible value of Aces.
 *
 * @param {Array<Object>} hand - An array of card objects, each with a `value` property representing its numerical value.
 * @returns {hasAce: boolean, scoreWithAceFlexibility: number, initialScore: number, dealerFirstCardValue: number}} The total value of the hand, taking into account the optimal value of Aces to avoid busting.
 *
 * @example
 * const hand = [{ rank: "Ace", value: 11 }, { rank: "2", value: 2 }, { rank: "10", value: 10 }];
 * const handValue = calculateHand(hand); // Output: 13 (Ace counts as 1 to avoid exceeding 21)
 */
export function calculateScore(hand) {
    let sum = 0;

    for (let card of hand) {
        sum += card.value;
    }

    let temp = sum
    let aceScore = temp -= hand.filter((card) => card.rank === "ace").length * 10;

    console.log(sum)
    // // Return scores based on player or dealer
    return {
        initialScore: sum, // Initial score without considering ace adjustments
        scoreWithAceFlexibility: sum > 21 ? aceScore : sum, // Initial score without considering ace adjustments
        hasAce: hand.filter(card => card.rank === "ace").length > 0,
        dealerFirstCardValue: hand[0].value, // Dealer's initial visible card
    };
}


/**
 * Clears all cards from a hand in a card game, effectively resetting it to an empty hand.
 *
 * @param {Array<Object>} hand - The array of card objects representing the hand to be cleared.
 * @returns {void}
 */
export function clearHand(hand) {
    hand.length = 0;
}

/**
 * Checks the status of a hand in a card game based on its total value.
 *
 * @param {Number} handScore - The total value of the hand, typically calculated using a function like `calculateHand`.
 * @returns {Boolean|null}
 *   - `true` if the hand is a blackjack (exactly 21).
 *   - `false` if the hand is bust (exceeds 21).
 *   - `null` if the hand is still in play (less than 21).
 */
export function checkHand(handScore) {
    if (handScore === 21) return true;
    if (handScore > 21) return false;
    if (handScore < 21) return null;
}

export function revealHand(hand, isDealer = false, isEnded = false) {
    if (isEnded && isDealer) {
        return [hand[0]];
    }

    let cardList = [];
    for (const card of hand) {
        cardList.push(card);
    }

    return cardList;
}

// export const allFunctions = {
//     createDeck: createDeck,
//     shuffle: shuffle,
//     dealCard: dealCard,
//     calculateScore: calculateScore,
//     checkHand: checkHand,
//     clearHand: clearHand,
//     revealHand: revealHand,
// };

export function nFormatter(num, digits) {
    const lookup = [
        {value: 1, symbol: ""},
        {value: 1e3, symbol: "K"},
        {value: 1e6, symbol: "M"},
        {value: 1e9, symbol: "B"},
        {value: 1e12, symbol: "T"},
        {value: 1e15, symbol: "P"},
        {value: 1e18, symbol: "E"}
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast(item => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
}


/**
 * Formats a number with thousands separators and optional abbreviations for thousands, millions, and billions.
 *
 * @param {Number} number - The number to be formatted.
 * @returns {String} The formatted number with appropriate separators and abbreviations.
 *
 * @example
 * const formatted1 = formatNumber(123456); // Output: "123k"
 * const formatted2 = formatNumber(789000000); // Output: "789m"
 * const formatted3 = formatNumber(1234567890); // Output: "1.2b"
 */
export function formatNumber(number) {
    const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    let formatted = formatter.format(number);

    // Apply custom abbreviations in the correct order
    formatted = formatted.replace(/,000,000,000,000/g, "T"); // Billions first
    formatted = formatted.replace(/,000,000,000/g, "B"); // Billions first
    formatted = formatted.replace(/,000,000/g, "M"); // Millions next
    formatted = formatted.replace(/,000/g, "K"); // Thousands last

    return formatted;
}

export function betMinMax(balance) {
    let minBet = (0.05 * balance).toFixed(0);
    let maxBet = (0.5 * balance).toFixed(0);

    return {minBet: Number(minBet), maxBet: Number(maxBet)};
}
