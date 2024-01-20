"use strict"

import {setIsEnded} from "../functions/gameBooleans.mjs";
import {doubleBtnEl} from "../functions/gamePage.mjs";

export function doubleBtn() {
    doubleBtnEl.addEventListener("click", function () {
        setIsEnded(true)
    })
}