export const stakeCtnEl = document.querySelector(".stake-page-ctn");
export const stakeInputEl = document.getElementById("stakeInput");
export const clearStakeBtn = document.getElementById("clearStakeBtn");


// stake default buttons
export const stakeBtn0El = document.querySelector(".stake-btn-0");
export const stakeBtn1El = document.querySelector(".stake-btn-1");
export const stakeBtn2El = document.querySelector(".stake-btn-2");
export const stakeBtn3El = document.querySelector(".stake-btn-3");
export const stakeBtn4El = document.querySelector(".stake-btn-4");
export const stakeAllBtnEl = document.querySelectorAll(".stake-btn")
export const playBtnEl = document.getElementById("playBtn");
export const balanceEl = document.querySelectorAll(".balance");

// Pop up elements
export const popUpEl = document.getElementById("popUP");
export const popUpContentEl = document.getElementById("popUpContent");
export const clearPopUp = document.getElementById("clearPopUp");


export function stakeInputMinMaxValue(minMax) {
    stakeInputEl.max = minMax.maxBet;
    stakeInputEl.min = minMax.minBet;
}

