
// You can write more code here

/* START OF COMPILED CODE */

import Puffle from "./Puffle.js";
/* START-USER-IMPORTS */
// import {CreateWorld, b2DefaultWorldDef, CreateBoxPolygon, SpriteToBox, AddSpriteToWorld, STATIC, b2DefaultBodyDef, pxmVec2, b2Vec2, WorldStep, UpdateWorldSprites} from '../physics.js';
// import {CreateWorld, b2DefaultWorldDef, CreateBoxPolygon, SpriteToBox, AddSpriteToWorld, STATIC, b2DefaultBodyDef, pxmVec2, b2Vec2, WorldStep, UpdateWorldSprites} from '../PhaserBox2D.js';
// import * as Box from '../PhaserBox2D.js'
import {CreateCircle,DYNAMIC, CreateWorld, b2DefaultWorldDef, CreateBoxPolygon, SpriteToBox, AddSpriteToWorld, STATIC, b2DefaultBodyDef, pxmVec2, b2Vec2, WorldStep, UpdateWorldSprites } from '../../node_modules/phaser-box2d/dist/PhaserBox2D.js';
// import {CreateCircle,DYNAMIC, CreateWorld, b2DefaultWorldDef, CreateBoxPolygon, SpriteToBox, AddSpriteToWorld, STATIC, b2DefaultBodyDef, pxmVec2, b2Vec2, WorldStep, UpdateWorldSprites } from 'phaser-box2d/dist/PhaserBox2D.js';
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// dino
		const dino = this.add.image(640, 288, "dino");

		// welcome
		const welcome = this.add.text(640, 478, "", {});
		welcome.setOrigin(0.5, 0.5);
		welcome.text = "Phaser 3 + Phaser Editor v4";
		welcome.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });

		// puffle
		const puffle = new Puffle(this, 188, 141);
		this.add.existing(puffle);

		this.dino = dino;
		this.welcome = welcome;
		this.puffle = puffle;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	dino;
	/** @type {Phaser.GameObjects.Text} */
	welcome;
	/** @type {Puffle} */
	puffle;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.world = CreateWorld({ worldDef: b2DefaultWorldDef() });
		const worldId = this.world.worldId;

		this.editorCreate();
		this.puffle.init(worldId)


		this.dino.on("pointerdown", () => {

			this.welcome.text = "Hello, World!";
		});



        const box = SpriteToBox(worldId, this.dino, {
            restitution: 1.0,
            friction: 0.01
        });

        AddSpriteToWorld(worldId, this.dino, box);
		this.__body = b2DefaultBodyDef()

		// const ball = CreateCircle({
		// 	worldId: worldId,
		// 	bodyDef: new b2DefaultBodyDef(),
		// 	type: DYNAMIC,
		// 	position: new pxmVec2(this.ball.x, this.ball.y),
		// 	restitution: 0.2,
		// 	friction: 1.5,
		// 	// density: 3,
		// 	radius: 

		// })

		// AddSpriteToWorld(worldId, this.ball, ball)

		// create floor
        CreateBoxPolygon({ worldId, type: STATIC, bodyDef: b2DefaultBodyDef(), position: pxmVec2(640, -740), size: new b2Vec2(20, 1), friction: 0.5 });


	}

	update (time, delta) {
        const worldId = this.world.worldId;
		this.puffle.update(time, delta)

        WorldStep({ worldId, deltaTime: delta });

        UpdateWorldSprites(worldId);
    }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
