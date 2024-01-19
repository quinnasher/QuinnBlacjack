"use strict"

import {stakeInit} from "./stakeInit.mjs";
import {mainGameInit} from "./mainGameInit.mjs";
import {populateDeckWithImages} from "../uiFunctions.mjs";

export function gameInit() {
    stakeInit()
    mainGameInit()
    populateDeckWithImages()

}