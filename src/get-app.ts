import * as PIXI from "pixi.js";
import { GAME_WIDTH, GAME_HEIGHT, GAME_BACKGROUND_COLOR } from "./constants";

const S = { } as { app: PIXI.Application };

function onResize() {
    S.app && setSize();
}

function setSize() {
    S.app.renderer.resize(window.innerWidth, window.innerHeight);
    S.app.stage.scale.x = window.innerWidth / GAME_WIDTH;
    S.app.stage.scale.y = window.innerHeight / GAME_HEIGHT;
}

export function getApp() {
    if (!S.app) {
        S.app = new PIXI.Application({
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            backgroundColor: GAME_BACKGROUND_COLOR,
        });
        document.body.appendChild(S.app.view);
        window.addEventListener("resize", onResize);
        setSize();
    }
    return S.app;
}
