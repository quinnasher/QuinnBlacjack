"use strict"

import {createDeck, shuffle} from "../gameFunctions.mjs";

export const deck = createDeck();
export let shuffledDeck = shuffle(deck)

export function setShuffledDeck(newShuffledDeck) {
    if (typeof newShuffledDeck === "object") {
        shuffledDeck = newShuffledDeck
    }
}