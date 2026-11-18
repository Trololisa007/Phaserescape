
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
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
import {CreateCircle,b2CreateCircleShape, b2BodyDef, b2Body_SetType, b2Body_GetPosition, b2CreateBody, b2Circle, b2ShapeId, b2Vec2, b2ShapeDef, b2Filter, b2DefaultFilter, b2Body_SetUserData, CreateBoxPolygon, b2DefaultBodyDef, DYNAMIC, pxmVec2, AddSpriteToWorld, b2Body_GetAngularVelocity, b2Body_ApplyTorque, b2Body_GetLinearVelocity, b2Body_SetAngularDamping, b2Body_SetAngularVelocity} from "../../node_modules/phaser-box2d/dist/PhaserBox2D.js";
// import Phaser from "phaser";
/* END-USER-IMPORTS */

export default class Puffle extends Phaser.GameObjects.Image {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "ball", frame);

		/* START-USER-CTR-CODE */
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

		this.__colors = new Array("blue","green","pink","black","purple","red","yellow","white","orange","brown");

		this.__currentColorIndex = null; // int
		this.world = null;



		// // more constructor things
		// this.setColor("blue");
		// this.__animationManager = new AnimationStackManager(this.puffleAnimations);
		// this.__animationManager.enqueueAnimation(PuffleIdle);

		this.cursors = this.scene.input.keyboard.createCursorKeys()
		this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	get_instance() { //puffle instance
		if(this.__instance == null)
		{
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
			radius: 1

		})
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

	update(time, delta) {
		if (!this.__body) {
			console.warn("Puffle physics body not initialized");
			return;
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

			console.log("right: %s, left: %s", rightDown, leftDown)
		}

		const bodyId = this.__body.bodyId
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

	// private function updateAnimationState() : void
	// {
	// 	var _loc4_:b2Fixture = null;
	// 	var _loc1_:Number = getTimer();
	// 	var _loc2_:Boolean = false;
	// 	var _loc3_:b2ContactEdge = this.body.GetContactList();
	// 	while(_loc3_)
	// 	{
	// 		if(_loc3_.contact.GetFixtureA().GetBody() == this.body)
	// 		{
	// 		_loc4_ = _loc3_.contact.GetFixtureB();
	// 		}
	// 		if(_loc3_.contact.GetFixtureB().GetBody() == this.body)
	// 		{
	// 		_loc4_ = _loc3_.contact.GetFixtureA();
	// 		}
	// 		if(Boolean(_loc4_) && (Boolean(_loc4_.GetFilterData().categoryBits == Simulation.CATEGORY_STATIC || _loc4_.GetFilterData().categoryBits == Simulation.CATEGORY_DYNAMIC)) && !_loc4_.IsSensor())
	// 		{
	// 		_loc2_ = true;
	// 		}
	// 		_loc3_ = _loc3_.next;
	// 	}
	// 	if(_loc2_)
	// 	{
	// 		this.__airtimeStart = getTimer();
	// 		this.__animationManager.removeAnimation(PuffleAirIn);
	// 		this.__animationManager.removeAnimation(PuffleAir);
	// 		this.__inAir = false;
	// 	}
	// 	else if(_loc1_ - this.__airtimeStart > this.airtimeBeforeAnimation && !this.__inAir)
	// 	{
	// 		this.__animationManager.enqueueAnimation(PuffleAirOut);
	// 		this.__animationManager.enqueueAnimation(PuffleAir);
	// 		this.__animationManager.enqueueAnimation(PuffleAirIn);
	// 		this.__inAir = true;
	// 	}
	// 	this.__animationManager.playCurrentAnimation();
	// }

	// public function changeScale(param1:Number) : void
	// {
	// 	var _loc2_:b2CircleShape = b2CircleShape(this.__body.GetFixtureList().GetShape());
	// 	_loc2_.SetRadius(param1);
	// 	this.scaleX = param1;
	// 	this.scaleY = param1;
	// }

	// public function destroy() : void
	// {
	// 	__instance = null;
	// }

	// public function get forceArrow() : ForceArrow
	// {
	// 	return this.__forceArrow;
	// }

	// public function set forceArrow(param1:ForceArrow) : void
	// {
	// 	this.__forceArrow = param1;
	// }

	// public function get puffleRotationOffset() : Number
	// {
	// 	return this.__puffleRotationOffset;
	// }

	// public function set puffleRotationOffset(param1:Number) : void
	// {
	// 	this.__puffleRotationOffset = param1;
	// }

	// public function set animationManager(param1:AnimationStackManager) : void
	// {
	// 	this.__animationManager = param1;
	// }

	// public function get animationManager() : AnimationStackManager
	// {
	// 	return this.__animationManager;
	// }

	// public function getNextColor() : String
	// {
	// 	return this.__colors[++this.__currentColorIndex % 10];
	// }

	// public function get colors() : Array
	// {
	// 	return this.__colors;
	// }

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
