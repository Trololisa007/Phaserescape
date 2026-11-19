
// You can write more code here

/* START OF COMPILED CODE */

import { b2CreateBody } from "../box2d/PhaserBox2D.js";
import { b2DefaultBodyDef } from "../box2d/PhaserBox2D.js";
import { b2BodyType } from "../box2d/PhaserBox2D.js";
import { pxmVec2 } from "../box2d/PhaserBox2D.js";
import { AddSpriteToWorld } from "../box2d/PhaserBox2D.js";
import { b2CreateCircleShape } from "../box2d/PhaserBox2D.js";
import { b2DefaultShapeDef } from "../box2d/PhaserBox2D.js";
import { b2Circle } from "../box2d/PhaserBox2D.js";
import { pxm } from "../box2d/PhaserBox2D.js";
import { b2Vec2 } from "../box2d/PhaserBox2D.js";
/* START-USER-IMPORTS */
import { b2Body_GetAngularVelocity } from "../box2d/PhaserBox2D.js";
import { b2Body_GetLinearVelocity } from "../box2d/PhaserBox2D.js";
import { b2Body_ApplyTorque } from "../box2d/PhaserBox2D.js";
import { b2Body_SetAngularVelocity } from "../box2d/PhaserBox2D.js";
import { b2Shape_GetCircle } from "../box2d/PhaserBox2D.js";
import { b2Shape_SetCircle } from "../box2d/PhaserBox2D.js";
import { GetWorldScale } from "../box2d/PhaserBox2D.js";
/* END-USER-IMPORTS */

export default class Puffle extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame, xargs) {
		super(scene, x ?? 0, y ?? 0, texture || "ball", frame);

		// ball
		const ball = b2CreateBody(this.scene.worldId, { 
			...b2DefaultBodyDef(), 
			type: b2BodyType.b2_dynamicBody, 
			position: pxmVec2(this.x, -this.y), 
			sleepThreshold: -1, 
			isAwake: true
		});

		// add ball to this
		AddSpriteToWorld(this.scene.worldId, this, { bodyId: ball });

		// shape
		const shape = b2CreateCircleShape(ball, { 
			...b2DefaultShapeDef(), 
			friction: 1.5, 
			restitution: 0.2, 
			density: 3
		}, new b2Circle(new b2Vec2(pxm(0), pxm(0)), pxm(64.5)));

		this.ball = ball;

		/* START-USER-CTR-CODE */
		this.radius = b2Shape_GetCircle(ball).radius
		this.cursors = this.scene.input.keyboard.createCursorKeys()
		this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.MAX_ANGULAR_VELOCITY = 16 //* b2GetLengthUnitsPerMeter()
		this.TORQUE_PER_UPDATE = 160  //* (b2GetLengthUnitsPerMeter() **2)
		this.isActivelyRolling = false

		this.SCALE = 0.8
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		this.once(Phaser.GameObjects.Events.DESTROY, () => {
			this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
		});
		this.updateScale()

		/* END-USER-CTR-CODE */
	}

	/** @type {b2BodyId} */
	ball;
	/** @type {number} */
	scale = 0.8;

	/* START-USER-CODE */

	updateScale(scale = this.scale) {
		this.SCALE = scale
		const circle = new b2Circle(new b2Vec2(0,0), this.radius*this.SCALE)
		b2Shape_SetCircle(this.ball, circle)
		this.setScale(this.SCALE, this.SCALE)
	}

	update(time, delta) {
		// console.log(time)
		if (!this.ball) {
			return
		}
		var vel = NaN;
		// this.updateAnimationState();
		// x = this.__body.GetPosition().x * Simulation.WORLD_RATIO;
		// y = this.__body.GetPosition().y * Simulation.WORLD_RATIO;
		// this.ball.rotation = this.__body.GetAngle() / (Math.PI * 2) * 360;
		// this.ball.rotation %= 360;
		var leftDown = this.cursors.left.isDown || this.keyA.isDown;
		var rightDown = this.cursors.right.isDown || this.keyD.isDown;
		var keyDown = leftDown || rightDown;
		if(keyDown){
			console.log("right: %s, left: %s", rightDown, leftDown, time)

		}

		const bodyId = this.ball;
		if(keyDown)
		{
			this.isActivelyRolling = true;
			if(leftDown && b2Body_GetAngularVelocity(bodyId) < this.MAX_ANGULAR_VELOCITY)
			{
			b2Body_ApplyTorque(bodyId,this.TORQUE_PER_UPDATE);
			// this.puffleColors.scaleX = 1;
			// this.ball.scaleX = 1;
			}
			if(rightDown && b2Body_GetAngularVelocity(bodyId) > -this.MAX_ANGULAR_VELOCITY)
			{
			b2Body_ApplyTorque(bodyId,-this.TORQUE_PER_UPDATE);
			// this.puffleColors.scaleX = -1;
			// this.ball.scaleX = -1;
			}
			// this.puffleColors.rotation = this.__body.GetAngularVelocity() * 2 + this.__puffleRotationOffset;
		}
		else
		{
			this.isActivelyRolling = false;
			// if(this.puffleColors.rotation > this.__puffleRotationOffset)
			// {
			// this.puffleColors.rotation -= 2;
			// }
			// if(this.puffleColors.rotation < this.__puffleRotationOffset)
			// {
			// this.puffleColors.rotation += 2;
			// }
			const linear = b2Body_GetLinearVelocity(bodyId)
			vel = Math.max(0.5,Math.min(1,Math.min(Math.abs(b2Body_GetAngularVelocity(bodyId)),Math.abs(Math.hypot(linear.x, linear.y)))));
			b2Body_SetAngularVelocity(bodyId, b2Body_GetAngularVelocity(bodyId) * vel)
			// _loc4_ = Math.max(0.5,Math.min(1,Math.min(Math.abs(this.__body.GetAngularVelocity()),Math.abs(this.__body.GetLinearVelocity().Length()))));
            // this.__body.SetAngularVelocity(this.__body.GetAngularVelocity() * _loc4_);

		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
