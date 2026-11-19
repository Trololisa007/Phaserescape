
// You can write more code here

/* START OF COMPILED CODE */

import { CreateWorld } from "../box2d/PhaserBox2D.js";
import { SetWorldScale } from "../box2d/PhaserBox2D.js";
import { b2DefaultWorldDef } from "../box2d/PhaserBox2D.js";
import Puffle from "./Puffle.js";
import Ground from "./Ground.js";
import { WorldStep } from "../box2d/PhaserBox2D.js";
import { UpdateWorldSprites } from "../box2d/PhaserBox2D.js";
import { b2WorldId } from "../box2d/PhaserBox2D.js";
/* START-USER-IMPORTS */
// import { b2DefaultWorldDef } from "../box2d/PhaserBox2D.js";
import { GetWorldScale } from "../box2d/PhaserBox2D.js";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {
		// Box2D world creation
		SetWorldScale(65);
		const world = CreateWorld({ worldDef: { 
			...b2DefaultWorldDef(), 
			enableSleep: false
		}});
		this.worldId = world.worldId;

		// level1
		this.add.image(752, 496, "Level1");

		// puffle
		const puffle = new Puffle(this, 144, 160);
		this.add.existing(puffle);

		// level1Ground
		const level1Ground = this.add.image(754, 497, "Level1Ground");
		level1Ground.visible = false;

		// layer_1
		const layer_1 = this.add.layer();

		// ground
		const ground = new Ground(this, 592, 304, 1232, 80);
		layer_1.add(ground);

		// ground_1
		const ground_1 = new Ground(this, 816, 272, 368, 64);
		ground_1.angle = -11;
		layer_1.add(ground_1);

		// ground_2
		const ground_2 = new Ground(this, 1104, 272, 240, 64);
		ground_2.angle = 17;
		layer_1.add(ground_2);

		// ground_3
		const ground_3 = new Ground(this, -32, 384, 1696, 64);
		ground_3.angle = -90;
		layer_1.add(ground_3);

		// ground_4
		const ground_4 = new Ground(this, 1552, 416, 1696, 64);
		ground_4.angle = -90;
		layer_1.add(ground_4);

		// ground_5
		const ground_5 = new Ground(this, 1152, 557, 816, 64);
		layer_1.add(ground_5);

		// ground_6
		const ground_6 = new Ground(this, 864, 512, 192, 16);
		ground_6.angle = -24;
		layer_1.add(ground_6);

		// ground_7
		const ground_7 = new Ground(this, 1056, 512, 208, 16);
		ground_7.angle = 22;
		layer_1.add(ground_7);

		// ground_8
		const ground_8 = new Ground(this, 624, 893, 1072, 64);
		layer_1.add(ground_8);

		// ground_9
		const ground_9 = new Ground(this, 1168, 893, 1072, 64);
		ground_9.angle = -6;
		layer_1.add(ground_9);

		// ground_10
		const ground_10 = new Ground(this, 192, 880, 592, 64);
		layer_1.add(ground_10);

		// ground_11
		const ground_11 = new Ground(this, 384, 864, 208, 16);
		ground_11.angle = -32.00000000000006;
		layer_1.add(ground_11);

		// ground_13
		const ground_13 = new Ground(this, 560, 848, 176, 64);
		layer_1.add(ground_13);

		// ground_14
		const ground_14 = new Ground(this, 48, 621, 176, 64);
		layer_1.add(ground_14);

		// ground_15
		const ground_15 = new Ground(this, 1246, 301, 192, 64);
		ground_15.angle = 3;
		layer_1.add(ground_15);

		// ground_12
		const ground_12 = new Ground(this, 701, 870, 176, 64);
		ground_12.angle = 31;
		layer_1.add(ground_12);

		// puffle (prefab fields)
		puffle.scale = 0.8;

		this.events.emit("scene-awake");
	}

	update(time, delta) {

		WorldStep({ worldId: this.worldId, deltaTime: delta });
		UpdateWorldSprites(this.worldId);
	}

	/** @type {b2WorldId} */
	worldId;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		// this.world = CreateWorld({ worldDef: b2DefaultWorldDef() });
		// this.worldId = this.world.worldId;
		this.editorCreate();
		this.WORLDSCALE = GetWorldScale()
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
