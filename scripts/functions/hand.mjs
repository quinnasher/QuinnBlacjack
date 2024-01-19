"use strict";

export let playerHand = [];
export let dealerHand = [];

export function setPlayerHand(newHand) {
  if (Array.isArray(newHand)) {
    playerHand = newHand;
  } else
    throw new Error(
      "TypeException: setPlayerHand function expects an array argument.",
    );
}

export function setDealerHand(newHand) {
  if (Array.isArray(newHand)) {
    dealerHand = newHand;
  } else
    throw new Error(
      "TypeException: setDealerHand function expects an array argument.",
    );
}
