
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { CreateBoxPolygon } from "../box2d/PhaserBox2D.js";
import { STATIC } from "../box2d/PhaserBox2D.js";
import { b2DefaultBodyDef } from "../box2d/PhaserBox2D.js";
import { pxmVec2 } from "../box2d/PhaserBox2D.js";
import { b2Vec2 } from "../box2d/PhaserBox2D.js";
import { b2Rot } from "../box2d/PhaserBox2D.js";
import { GetWorldScale } from "../box2d/PhaserBox2D.js";
// import { GetWorldScale } from "../box2d/physics.js";
/* END-USER-IMPORTS */

export default class Ground extends Phaser.GameObjects.Rectangle {

	constructor(scene, x, y, width, height) {
		super(scene, x ?? 0, y ?? 0, width ?? 128, height ?? 128);

		this.isFilled = true;
		this.fillColor = 16479348;
		this.isStroked = true;
		this.strokeColor = 15794176;
		this.lineWidth = 5;

		/* START-USER-CTR-CODE */

		this.scene.events.once("scene-awake", () => {this.createBody()});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	createBody() {
		const worldId = this.scene.worldId
		const scale = GetWorldScale()
		var body = b2DefaultBodyDef()
		body.rotation = new b2Rot(Math.cos(-this.rotation), Math.sin(-this.rotation))
		const pos = new pxmVec2(this.x, -this.y)
		const size = new b2Vec2(this.width/scale/2, this.height/scale/2)
		var poly = CreateBoxPolygon({ worldId, type: STATIC, bodyDef: body, position: pos, size: size, friction: 0.8, restitution: -1});
		this.setAlpha(0)

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
