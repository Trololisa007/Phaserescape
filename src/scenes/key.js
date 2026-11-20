
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
import { b2World_GetSensorEvents } from "../box2d/PhaserBox2D.js";
import { b2Shape_GetUserData } from "../box2d/PhaserBox2D.js";
import { B2_ID_EQUALS } from "../box2d/PhaserBox2D.js";
/* END-USER-IMPORTS */

export default class key extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame, xargs) {
		super(scene, x ?? 0, y ?? 0, texture || "collectables", frame ?? "key0001.png");

		this.play({"key":"key","frameRate":90});

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
			isSensor: true, 
			filter: { 
				categoryBits: 8, 
				maskBits: 2, 
				groupIndex: 0
			}
		}, b2MakeBox(pxm(73), pxm(39)));

		/* START-USER-CTR-CODE */
		this.hasTriggered = false
		this.shape = shape
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		this.once(Phaser.GameObjects.Events.DESTROY, () => {
			this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	update() {
		const sensorEvents = b2World_GetSensorEvents(this.scene.worldId);

		for (const event of sensorEvents.beginEvents) {
			if (B2_ID_EQUALS(event.sensorShapeId, this.shape)) {
				const sprite = b2Shape_GetUserData(event.sensorShapeId);

				if (this && !this.hasTriggered) {
					this.hasTriggered = true;
					this.play({"key":"bling","frameRate":90,"repeat":0,"hideOnComplete":true})
				}
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
