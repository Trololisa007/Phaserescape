
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
<<<<<<< HEAD
import { b2Body_GetAngularVelocity } from "../box2d/PhaserBox2D.js";
import { b2Body_GetLinearVelocity } from "../box2d/PhaserBox2D.js";
import { b2Body_ApplyTorque } from "../box2d/PhaserBox2D.js";
import { b2Body_SetAngularVelocity } from "../box2d/PhaserBox2D.js";
import { b2Shape_GetCircle } from "../box2d/PhaserBox2D.js";
import { b2Shape_SetCircle } from "../box2d/PhaserBox2D.js";
import { GetWorldScale } from "../box2d/PhaserBox2D.js";
=======
// import Box2D.Collision.Shapes.b2CircleShape;
// import Box2D.Dynamics.Contacts.b2ContactEdge; 
// import Box2D.Dynamics.b2Body;
// import Box2D.Dynamics.b2BodyDef;
// import Box2D.Dynamics.b2FilterData;
// import Box2D.Dynamics.b2Fixture;
// import com.clubpenguin.games.collisioncourse.animation.AnimationStackManager;
// import com.clubpenguin.games.collisioncourse.animation.PuffleAir;
// import com.clubpenguin.games.collisioncourse.animation.PuffleAirIn;
// import com.clubpenguin.games.collisioncourse.animation.PuffleAirOut;
// import com.clubpenguin.games.collisioncourse.animation.PuffleIdle;
// import com.clubpenguin.games.collisioncourse.hud.IVisibleForceBody;
// import com.clubpenguin.games.collisioncourse.physics.ForceArrow;
// import com.clubpenguin.games.collisioncourse.physics.Simulation;
// import com.clubpenguin.games.collisioncourse.util.KeyStates;
// import flash.display.MovieClip;
// import flash.ui.Keyboard;
// import flash.utils.getTimer;
import { CreateCircle, b2CreateCircleShape, b2BodyDef, b2Body_SetType, b2Body_GetPosition, b2CreateBody, b2Circle, b2ShapeId, b2Vec2, b2ShapeDef, b2Filter, b2DefaultFilter, b2Body_SetUserData, CreateBoxPolygon, b2DefaultBodyDef, DYNAMIC, pxmVec2, AddSpriteToWorld, b2Body_GetAngularVelocity, b2Body_ApplyTorque, b2Body_GetLinearVelocity, b2Body_SetAngularDamping, b2Body_SetAngularVelocity, b2Body_SetSleepThreshold, b2Joint_WakeBodies, b2Body_SetAwake } from "../../node_modules/phaser-box2d/dist/PhaserBox2D.js";
// import { CreateCircle, b2CreateCircleShape, b2BodyDef, b2Body_SetType, b2Body_GetPosition, b2CreateBody, b2Circle, b2ShapeId, b2Vec2, b2ShapeDef, b2Filter, b2DefaultFilter, b2Body_SetUserData, CreateBoxPolygon, b2DefaultBodyDef, DYNAMIC, pxmVec2, AddSpriteToWorld, b2Body_GetAngularVelocity, b2Body_ApplyTorque, b2Body_GetLinearVelocity, b2Body_SetAngularDamping, b2Body_SetAngularVelocity, b2Body_SetSleepThreshold, b2Joint_WakeBodies, b2Body_SetAwake } from "phaser-box2d/dist/PhaserBox2D.js";
// import Phaser from "phaser";
// import { b } from "phaser-box2d";
>>>>>>> 9978d0ca186a0587d12365fe1ae9e2682580b420
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
<<<<<<< HEAD
		this.radius = b2Shape_GetCircle(ball).radius
=======
		this.x = x
		this.y = y

		this.__instance = null; //puffle instance

		this.VELOCITY_FLIP_AMOUNT = 1;

		this.SCALE = 0.8;

		this.MAX_ANGULAR_VELOCITY = 16;

		this.MAX_MOUSE_SCALE_DISTANCE = 100;

		this.TORQUE_PER_UPDATE = 160;

		this.__body = null; //b2Body

		this.ball_clip = null; //movie clip

		this.puffleColors = null; //movieclip

		this.puffleAnimations = null; //movieclip

		this.isActivelyRolling = false;

		this.airtimeBeforeAnimation = 50;

		this.__inAir = null; // bool

		this.__animationManager = null; //animation stack manager

		this.__forceArrow = null; //forcearrow;

		this.__puffleRotationOffset = 0;

		this.__airtimeStart = 0;

		this.__colors = new Array("blue", "green", "pink", "black", "purple", "red", "yellow", "white", "orange", "brown");

		this.__currentColorIndex = null; // int
		this.world = null;



		// // more constructor things
		// this.setColor("blue");
		// this.__animationManager = new AnimationStackManager(this.puffleAnimations);
		// this.__animationManager.enqueueAnimation(PuffleIdle);

>>>>>>> 9978d0ca186a0587d12365fe1ae9e2682580b420
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
<<<<<<< HEAD

	updateScale(scale = this.scale) {
		this.SCALE = scale
		const circle = new b2Circle(new b2Vec2(0,0), this.radius*this.SCALE)
		b2Shape_SetCircle(this.ball, circle)
		this.setScale(this.SCALE, this.SCALE)
	}

=======
	get_instance() { //puffle instance
		if (this.__instance == null) {
			this.__instance = new Puffle();
		}
		return this.__instance;
	}

	get_body() {
		return this.__body;
	}

	init(world_id) {
		// const ball = this.add.image(this.x, this.y, "ball");
		// this.ball = ball
		this.world = world_id
		// var body = new b2BodyDef();
		// body.position = new b2Vec2(-1,-1);
		// this.#__body = b2CreateBody(this.#world, body) // type bodyId
		// var fixture = this.#__body.CreateFixture2(new b2CircleShape(SCALE),3);
		// var circle = new b2Circle(new b2Vec2(0,0), this.SCALE) // create circle with radius SCALE, type b2Circle
		// var shape = new b2ShapeDef() // type shapeDef
		// shape.restitution = 0.2;
		// shape.friction = 1.5;
		// var fixture = b2CreateCircleShape(this.#__body,shape, circle)
		// var filterdata = b2DefaultFilter()
		// var circle = SpriteToCircle(this.#world, this.ball, {
		// 	restitution: 0.2,
		// 	friction: 1.5
		// })

		var ball = CreateCircle({
			worldId: this.world,
			bodyDef: new b2DefaultBodyDef(),
			type: DYNAMIC,
			position: new pxmVec2(this.x, -this.y),
			restitution: 0.2,
			friction: 1.5,
			density: 3,
			radius: 1,

		})

		b2Body_SetSleepThreshold(ball.bodyId, -1)
		this.__body = ball
		AddSpriteToWorld(this.world, this, ball)
		// filterdata.categoryBits = this.
		// filterdata.categoryBits = Simulation.CATEGORY_DYNAMIC;
		// fixture.SetFilterData(filterdata);
		// this.__body.SetUserData(this);
		// b2Body_SetUserData(this.__body, this)
		this.scaleX = this.SCALE;
		this.scaleY = this.SCALE;

	}

	// public function setColor(param1:String) : void
	// {
	// 	this.puffleColors.gotoAndStop(param1);
	// 	this.puffleAnimations = this.puffleColors.puffleAnimations;
	// 	if(this.__animationManager)
	// 	{
	// 		this.__animationManager.setTarget(this.puffleAnimations);
	// 	}
	// }

>>>>>>> 9978d0ca186a0587d12365fe1ae9e2682580b420
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
<<<<<<< HEAD
		if(keyDown){
			console.log("right: %s, left: %s", rightDown, leftDown, time)
=======
		if (keyDown) {
>>>>>>> 9978d0ca186a0587d12365fe1ae9e2682580b420

		}

<<<<<<< HEAD
		const bodyId = this.ball;
		if(keyDown)
		{
=======
		const bodyId = this.__body.bodyId
		if (keyDown) {
>>>>>>> 9978d0ca186a0587d12365fe1ae9e2682580b420
			this.isActivelyRolling = true;
			if (leftDown && b2Body_GetAngularVelocity(bodyId) < this.MAX_ANGULAR_VELOCITY) {
				b2Body_ApplyTorque(bodyId, this.TORQUE_PER_UPDATE);
				// this.puffleColors.scaleX = 1;
				// this.ball.scaleX = 1;
			}
			if (rightDown && b2Body_GetAngularVelocity(bodyId) > -this.MAX_ANGULAR_VELOCITY) {
				b2Body_ApplyTorque(bodyId, -this.TORQUE_PER_UPDATE);
				// this.puffleColors.scaleX = -1;
				// this.ball.scaleX = -1;
			}
			// this.puffleColors.rotation = this.__body.GetAngularVelocity() * 2 + this.__puffleRotationOffset;
		}
		else {
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
			vel = Math.max(0.5, Math.min(1, Math.min(Math.abs(b2Body_GetAngularVelocity(bodyId)), Math.abs(Math.hypot(linear.x, linear.y)))));
			b2Body_SetAngularVelocity(bodyId, b2Body_GetAngularVelocity(bodyId) * vel)
			// _loc4_ = Math.max(0.5,Math.min(1,Math.min(Math.abs(this.__body.GetAngularVelocity()),Math.abs(this.__body.GetLinearVelocity().Length()))));
<<<<<<< HEAD
            // this.__body.SetAngularVelocity(this.__body.GetAngularVelocity() * _loc4_);
=======
			// this.__body.SetAngularVelocity(this.__body.GetAngularVelocity() * _loc4_);
>>>>>>> 9978d0ca186a0587d12365fe1ae9e2682580b420

		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
