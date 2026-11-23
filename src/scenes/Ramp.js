
// You can write more code here

/* START OF COMPILED CODE */

import MouseJointListener from "../components/MouseJointListener.js";
import { b2CreateBody } from "../box2d/PhaserBox2D.js";
import { b2DefaultBodyDef } from "../box2d/PhaserBox2D.js";
import { b2BodyType } from "../box2d/PhaserBox2D.js";
import { pxmVec2 } from "../box2d/PhaserBox2D.js";
import { AddSpriteToWorld } from "../box2d/PhaserBox2D.js";
import { b2CreatePolygonShape } from "../box2d/PhaserBox2D.js";
import { b2DefaultShapeDef } from "../box2d/PhaserBox2D.js";
import { b2Filter } from "../box2d/PhaserBox2D.js";
import { pxm } from "../box2d/PhaserBox2D.js";
import { b2MakeBox } from "../box2d/PhaserBox2D.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Ramp extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame, xargs) {
		super(scene, x ?? 0, y ?? 0, texture || "rampMid", frame);

		this.scaleX = 1.0749031453417137;
		this.scaleY = 1.0433343833098792;

		// body
		const body = b2CreateBody(this.scene.worldId, { 
			...b2DefaultBodyDef(), 
			type: b2BodyType.b2_dynamicBody, 
			position: pxmVec2(this.x, -this.y)
		});

		// add body to this
		AddSpriteToWorld(this.scene.worldId, this, { bodyId: body });

		// shape
		const shape = b2CreatePolygonShape(body, { 
			...b2DefaultShapeDef(), 
			customColor: 5811817, 
			filter: { 
				categoryBits: 4, 
				maskBits: 4294967295, 
				groupIndex: 0
			}
		}, b2MakeBox(pxm(75.16), pxm(8.04)));

		// this (components)
		new MouseJointListener(this);

		this.shape = shape;
		this.body = body;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @type {b2ShapeId} */
	shape;
	/** @type {b2BodyId} */
	body;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
