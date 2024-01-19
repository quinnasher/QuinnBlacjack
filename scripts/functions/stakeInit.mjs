import * as stakePage from "../stake.mjs";
import {balance, setBalance} from "./balance.mjs";
import {betMinMax, nFormatter} from "../gameFunctions.mjs";
import {displayStakeSuggestionBtn} from "../uiFunctions.mjs";
import {
    stakeBtnEventLister,
    updateStakeSuggestionButtonTexts,
} from "./stakeFunctions.mjs";

let minMax = betMinMax(balance);

export function stakeInit() {
    setBalance(1000000)
    updateStakeSuggestionButtonTexts(balance);
    stakeBtnEventLister();

    stakePage.stakeInputEl.placeholder = `₦${nFormatter(
        minMax.minBet,
    )} - ₦${nFormatter(minMax.maxBet)}`;
    stakePage.stakeInputMinMaxValue(minMax);
    stakePage.balanceEl.forEach((element) => {
        element.textContent = `Bal : ₦${nFormatter(balance)}`;
    });
}
