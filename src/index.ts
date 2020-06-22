import * as PIXI from "pixi.js";
import { getApp } from "./get-app";
import { GAME_WIDTH, GAME_HEIGHT } from "./constants";
import rabbitImage from "./assets/rabbit.png";

let app: PIXI.Application;
let stage: PIXI.Container;
const loader = PIXI.Loader.shared;

window.onload = () => {
    app = getApp();
    stage = app.stage;
    startLoadingAssets();
    loader.onComplete.once(() => onAssetsLoaded());
};

function startLoadingAssets() {
    loader.add("rabbit", rabbitImage);
    loader.add("spriteExample", "./assets/spriteSheets/spritesData.json"); // example of loading spriteSheet
    loader.load();
}

function onAssetsLoaded() {
    const bunny = getBunny();
    bunny.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);

    const birdFromSprite = getBird();
    birdFromSprite.anchor.set(0.5, 0.5);
    birdFromSprite.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2 + bunny.height);

    stage.addChild(bunny);
    stage.addChild(birdFromSprite);

    app.ticker.add(() => {
        bunny.rotation += 0.05;
    });
}

function getBunny(): PIXI.Sprite {
    const bunnyRotationPoint = {
        x: 0.5,
        y: 0.5,
    };

    const bunny = new PIXI.Sprite(PIXI.Texture.from("rabbit"));
    bunny.anchor.set(bunnyRotationPoint.x, bunnyRotationPoint.y);
    bunny.scale.set(2, 2);

    return bunny;
}

function getBird(): PIXI.AnimatedSprite {
    const bird = new PIXI.AnimatedSprite([
        PIXI.Texture.from("birdUp.png"),
        PIXI.Texture.from("birdMiddle.png"),
        PIXI.Texture.from("birdDown.png"),
    ]);
    bird.loop = true;
    bird.animationSpeed = 0.1;
    bird.play();
    bird.scale.set(3);

    return bird;
}
