
// You can write more code here

/* START OF COMPILED CODE */

import { b2CreateBody } from "../box2d/PhaserBox2D.js";
import { b2DefaultBodyDef } from "../box2d/PhaserBox2D.js";
import { pxmVec2 } from "../box2d/PhaserBox2D.js";
import { AddSpriteToWorld } from "../box2d/PhaserBox2D.js";
import { b2CreatePolygonShape } from "../box2d/PhaserBox2D.js";
import { b2DefaultShapeDef } from "../box2d/PhaserBox2D.js";
import { b2Filter } from "../box2d/PhaserBox2D.js";
import { pxm } from "../box2d/PhaserBox2D.js";
import { b2MakeBox } from "../box2d/PhaserBox2D.js";
/* START-USER-IMPORTS */
import { b2Shape_SetFilter } from "../box2d/PhaserBox2D.js";
import { b2DestroyBody } from "../box2d/PhaserBox2D.js";

/* END-USER-IMPORTS */

export default class Gate extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame, xargs) {
		super(scene, x ?? 0, y ?? 0, texture || "gate", frame ?? "Symbol 340001.png");

		this.scaleX = 0.9088408228352384;
		this.scaleY = 0.9088408228352384;

		// body
		const body = b2CreateBody(this.scene.worldId, { 
			...b2DefaultBodyDef(), 
			position: pxmVec2(this.x, -this.y)
		});

		// add body to this
		AddSpriteToWorld(this.scene.worldId, this, { bodyId: body });

		// shape
		const shape = b2CreatePolygonShape(body, { 
			...b2DefaultShapeDef(), 
			customColor: 15728640, 
			filter: { 
				categoryBits: 1, 
				maskBits: 6, 
				groupIndex: 0
			}
		}, b2MakeBox(pxm(8.71), pxm(129.9642376654391)));

		this.body = body;

		/* START-USER-CTR-CODE */
		this.scene.events.on("open-door",this.openDoor,this)
		/* END-USER-CTR-CODE */
	}

	/** @type {b2BodyId} */
	body;

	/* START-USER-CODE */

	openDoor() {
		this.play({"key":"gate","frameRate":90,"repeat":0})
		// set collision mask to 4
		b2Shape_SetFilter(this.body, {maskBits: 4})

		// play bling above all foreground sprites
		const bling = this.scene.add.sprite(this.x, this.y)
		bling.setDepth(9999)
		bling.play({"key":"bling","frameRate":90,"repeat":0,"hideOnComplete":true});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
