
// You can write more code here

/* START OF COMPILED CODE */

import { CreateWorld } from "../box2d/PhaserBox2D.js";
import { SetWorldScale } from "../box2d/PhaserBox2D.js";
import { b2DefaultWorldDef } from "../box2d/PhaserBox2D.js";
import Ground from "./Ground.js";
import Ramp from "./Ramp.js";
import Gate from "./Gate.js";
import Puffle from "./Puffle.js";
import oberrySingular from "./oberrySingular.js";
import key from "./key.js";
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
			contactHertz: 60, 
			contactDampingRatio: 0, 
			enableSleep: false
		}});
		this.worldId = world.worldId;

		// level1
		this.add.image(752, 496, "Level1");

		// layer_1
		const layer_1 = this.add.layer();
		layer_1.visible = false;

		// ground
		const ground = new Ground(this, 592, 308, 1232, 80);
		layer_1.add(ground);

		// ground_1
		const ground_1 = new Ground(this, 825, 276, 368, 64);
		ground_1.angle = -11;
		layer_1.add(ground_1);

		// ground_2
		const ground_2 = new Ground(this, 1104, 275, 240, 64);
		ground_2.angle = 17;
		layer_1.add(ground_2);

		// ground_3
		const ground_3 = new Ground(this, -32, 388, 1696, 64);
		ground_3.angle = -90;
		layer_1.add(ground_3);

		// ground_4
		const ground_4 = new Ground(this, 1552, 420, 1696, 64);
		ground_4.angle = -90;
		layer_1.add(ground_4);

		// ground_5
		const ground_5 = new Ground(this, 1152, 561, 816, 64);
		layer_1.add(ground_5);

		// ground_6
		const ground_6 = new Ground(this, 864, 516, 192, 16);
		ground_6.angle = -24;
		layer_1.add(ground_6);

		// ground_7
		const ground_7 = new Ground(this, 1056, 516, 208, 16);
		ground_7.angle = 22;
		layer_1.add(ground_7);

		// ground_8
		const ground_8 = new Ground(this, 624, 897, 1072, 64);
		layer_1.add(ground_8);

		// ground_9
		const ground_9 = new Ground(this, 1168, 897, 1072, 64);
		ground_9.angle = -6;
		layer_1.add(ground_9);

		// ground_10
		const ground_10 = new Ground(this, 192, 884, 592, 64);
		layer_1.add(ground_10);

		// ground_11
		const ground_11 = new Ground(this, 409, 855, 150, 16);
		ground_11.angle = -32.00000000000006;
		layer_1.add(ground_11);

		// ground_13
		const ground_13 = new Ground(this, 560, 852, 176, 64);
		layer_1.add(ground_13);

		// ground_14
		const ground_14 = new Ground(this, 48, 625, 176, 64);
		layer_1.add(ground_14);

		// ground_15
		const ground_15 = new Ground(this, 1246, 305, 192, 64);
		ground_15.angle = 3;
		layer_1.add(ground_15);

		// ground_12
		const ground_12 = new Ground(this, 714, 853, 176, 14);
		ground_12.angle = 30;
		layer_1.add(ground_12);

		// RampExample
		const rampExample = this.add.sprite(331, 672, "RampExample", "Symbol 15840001.png");
		rampExample.scaleX = 0.6201078482376692;
		rampExample.scaleY = 0.6201078482376692;
		rampExample.angle = 8;
		rampExample.play({"key":"Symbol","frameRate":90,"repeatDelay":1500});

		// sprite_1
		const sprite_1 = this.add.sprite(529, 145, "2");
		sprite_1.scaleX = 0.45999045763456825;
		sprite_1.scaleY = 0.45999045763456825;
		sprite_1.play({"key":"inputExample","frameRate":2});

		// level1Ground
		const level1Ground = this.add.image(754, 500, "Level1Ground");
		level1Ground.visible = false;

		// rampMid_1
		const rampMid_1 = this.add.image(441, 842, "rampMid");
		rampMid_1.angle = -34;

		// rampMid
		const rampMid = new Ramp(this, 558, 809);
		this.add.existing(rampMid);

		// symbol_3
		const symbol_3 = this.add.image(686, 842, "Symbol 3");
		symbol_3.scaleX = 0.65;
		symbol_3.scaleY = 0.65;
		symbol_3.angle = 30;

		// gate
		const gate = new Gate(this, 1344, 773);
		this.add.existing(gate);

		// puffle
		const puffle = new Puffle(this, 112, 174);
		this.add.existing(puffle);

		// oberry1
		const oberry1 = new oberrySingular(this, 1292, 225);
		this.add.existing(oberry1);

		// exitOver
		const exitOver = this.add.image(1396, 706, "exitOver");
		exitOver.scaleX = 0.9548678780088681;
		exitOver.scaleY = 0.9548678780088681;

		// _1foreground
		this.add.image(751, 496, "1foreground");

		// sprite_2
		const sprite_2 = new key(this, 82, 793);
		this.add.existing(sprite_2);

		// oberry2
		const oberry2 = new oberrySingular(this, 64, 526);
		this.add.existing(oberry2);

		// ground_3 (prefab fields)
		ground_3.material = "wall";

		// ground_4 (prefab fields)
		ground_4.material = "wall";

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
