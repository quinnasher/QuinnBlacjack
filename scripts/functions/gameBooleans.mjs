"use strict"

export let isEnded = false;
export let stand = false
export let hit = false


export function setIsEnded(bool) {
    if (typeof bool === "boolean") {
        isEnded = bool
    } else throw new Error("TypeException: setIsEnded function expects a boolean argument.");
}

export function setStand(bool) {
    if (typeof bool === "boolean") {
        stand = bool
    } else throw new Error("TypeException: setStand function expects a boolean argument.");
}

export function setHit(bool) {
    if (typeof bool === "boolean") {
        hit = bool
    } else throw new Error("TypeException: setHit function expects a boolean argument.");
}