
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { b2Body_Disable, b2Body_Enable, b2Body_GetPosition, b2Body_GetShapeCount, b2Body_GetShapes, b2Body_GetTransform, b2Body_SetAwake, b2Body_SetTransform, b2BodyId, b2MakeBox, b2Shape_GetFilter, b2Shape_SetFilter, b2ShapeId, b2World_SetCustomFilterCallback, WorldStep, b2Vec2 } from "../box2d/PhaserBox2D.js";

/* END-USER-IMPORTS */

export default class MouseJointListener {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__MouseJointListener"] = this;
        
		/* START-USER-CTR-CODE */
		this.gameObject.scene.events.once("scene-awake", this.createListeners, this);
		this.storedFilterData = null
        this.ignoredPairs = new Set();
        
		/* END-USER-CTR-CODE */
	}

	/** @returns {MouseJointListener} */
	static getComponent(gameObject) {
        return gameObject["__MouseJointListener"];
	}
    
    
	/* START-USER-CODE */
	createListeners() {
        this.gameObject.scene.input.on("pointerdown", this.createMouseListener, this.gameObject)
        
        
	}

	createMouseListener() {

        this.storedFilterData = b2Shape_GetFilter(this.shape)
        this.storedBodyCoords = b2Body_GetTransform(this.body)
        console.log(b2Shape_GetFilter(this.shape))
        
        
        var newfilter = this.storedFilterData
        newfilter.maskBits -= 2 // xor with puffle collision category 4294967295 4294967293
        b2Shape_SetFilter(this.shape, newfilter)
        // b2Body_SetTransform(this.body, new b2Vec2(0,0), this.storedBodyCoords.q)
        WorldStep({ worldId: this.scene.worldId, deltaTime: 1/600 });
        b2Body_SetTransform(this.body, this.storedBodyCoords.p, this.storedBodyCoords.q)
        // WorldStep({ worldId: this.scene.worldId, deltaTime: 1/60 });
		// b2Body_Enable(this.body)
        // this.scene.events.once(Phaser.Scenes.Events.PRE_UPDATE, () => {
        //     // b2Body_SetAwake(this.body, false)
        //     // b2Body_SetAwake(this.body, true)
        //     // b2Body_Disable(this.body)    
        //     // b2Body_Enable(this.body)
        //     // newfilter.groupIndex = -
        //     // b2Body_SetTransform(this.body, this.storedBodyCoords.p, this.storedBodyCoords.q)
        //     console.log(b2Body_GetShapeCount(this.body))
        //     // b2Shape_SetFilter(this.shape, newfilter)
        //     // console.log(b2Shape_GetFilter(this.shape))
        //     const pufId = this.scene.puffle.shape
        //     b2World_SetCustomFilterCallback(
        //         this.scene.worldId,
        //         (shapeA, shapeB) => {
        //             return !((shapeA.index1 == pufId.index1 && shapeB.index1 == this.shape.index1) || (shapeB.index1 == pufId.index1 && shapeA.index1 == this.shape.index1)) 
        //             // return !ignoredPairs.has(getPairKey(shapeA, shapeB));
        //         },
        //         null
        //     );

            
        //     // newfilter.maskBits -= 0x0002 // xor with puffle collision category
        // });

        // _loc2_ = new b2FilterData();
		// _loc2_.maskBits = ~Simulation.CATEGORY_DYNAMIC;
		// _loc2_.categoryBits = this.__storedFilterData.categoryBits;
		// this.__targetFixture.SetFilterData(_loc2_);
		// // this.__targetFixture.GetBody().SetActive(true);
		console.log("mouse down")
	}


    getPairKey(a, b) {
        return [a.index1, b.index1].sort().join("_");
    }

	// Write your code here.
 
	// private function createMouseJointListener(param1:MouseEvent) : void
    //   {
    //      var _loc2_:b2FilterData = null;
    //      var _loc3_:b2Vec2 = null;
    //      var _loc4_:b2MouseJointDef = null;
    //      var _loc5_:b2JointEdge = null;
    //      Main.instance.stage.focus = Main.instance.stage;
    //      this.destroyMouseJointListener(null);
    //      this.GetBodyAtMouse();
    //      if(this.__targetFixture)
    //      {
    //         if(Boolean(this.__storedTimedFixture) && this.__targetFixture != this.__storedTimedFixture)
    //         {
    //            this.__storedTimedFixture.GetBody().SetLinearDamping(0);
    //            this.__storedTimedFixture.GetBody().SetAngularDamping(0);
    //            Skin(this.__storedTimedFixture.GetBody().GetUserData()).selected = false;
    //            if(HUD.instance.visible)
    //            {
    //               Skin(this.__storedTimedFixture.GetBody().GetUserData()).glowOn(0.5);
    //            }
    //            else
    //            {
    //               Skin(this.__storedTimedFixture.GetBody().GetUserData()).glowOff();
    //            }
    //            Skin(this.__storedTimedFixture.GetBody().GetUserData()).alpha = 1;
    //         }
    //         this.__releaseTimer.stop();
    //         this.__targetFixture.GetBody().SetActive(false);
    //         this.__storedFilterData = this.__targetFixture.GetFilterData();
    //         _loc2_ = new b2FilterData();
    //         _loc2_.maskBits = ~Simulation.CATEGORY_DYNAMIC;
    //         _loc2_.categoryBits = this.__storedFilterData.categoryBits;
    //         this.__targetFixture.SetFilterData(_loc2_);
    //         this.__targetFixture.GetBody().SetActive(true);
    //         _loc3_ = new b2Vec2(Math.abs(Main.instance.mouseX / Simulation.WORLD_RATIO - this.__targetFixture.GetBody().GetWorldCenter().x),Math.abs(Main.instance.mouseY / Simulation.WORLD_RATIO - this.__targetFixture.GetBody().GetWorldCenter().y));
    //         _loc3_.x /= (this.__targetFixture.GetAABB().GetExtents().x + this.__targetFixture.GetAABB().GetExtents().y) / 2;
    //         _loc3_.y /= (this.__targetFixture.GetAABB().GetExtents().x + this.__targetFixture.GetAABB().GetExtents().y) / 2;
    //         this.__targetFixture.GetBody().SetLinearDamping(_loc3_.LengthSquared() * 100);
    //         this.__targetFixture.GetBody().SetAngularDamping(100 - _loc3_.Length() * 2);
    //         _loc4_ = new b2MouseJointDef();
    //         _loc4_.bodyA = Simulation.instance.world.GetGroundBody();
    //         _loc4_.bodyB = this.__targetFixture.GetBody();
    //         _loc4_.target.Set(Main.instance.mouseX / Simulation.WORLD_RATIO,Main.instance.mouseY / Simulation.WORLD_RATIO);
    //         _loc4_.maxForce = BASE_MOUSE_FORCE;
    //         _loc4_.frequencyHz = 100;
    //         this.__mouseJoint = Simulation.instance.world.CreateJoint(_loc4_) as b2MouseJoint;
    //         this.__mouseJoint.SetUserData(new JointUserData(false));
    //         _loc5_ = this.__targetFixture.GetBody().GetJointList();
    //         while(_loc5_)
    //         {
    //            if(JointUserData(_loc5_.joint.GetUserData()).isBreakable)
    //            {
    //               if(Skin(this.__targetFixture.GetBody().GetUserData()).forceArrow == null)
    //               {
    //                  HUD.instance.addForceArrow(this.__targetFixture.GetBody());
    //               }
    //            }
    //            _loc5_ = _loc5_.next;
    //         }
    //         Skin(this.__targetFixture.GetBody().GetUserData()).selected = true;
    //         Skin(this.__targetFixture.GetBody().GetUserData()).glowOn();
    //         Skin(this.__targetFixture.GetBody().GetUserData()).alpha = 0.5;
    //      }
    //   }

    //   private function destroyMouseJointListener(param1:MouseEvent) : void
    //   {
    //      if(this.__targetFixture)
    //      {
    //         this.__targetFixture.GetBody().SetActive(false);
    //         this.__targetFixture.SetFilterData(this.__storedFilterData);
    //         this.__targetFixture.GetBody().SetActive(true);
    //         Skin(this.__targetFixture.GetBody().GetUserData()).alpha = 1;
    //         if(this.__targetFixture.GetBody().GetLinearVelocity().Length() < 8)
    //         {
    //            this.__targetFixture.GetBody().SetLinearDamping(20);
    //            this.__targetFixture.GetBody().SetAngularDamping(20);
    //            this.__storedTimedFixture = this.__targetFixture;
    //            this.__releaseTimer.reset();
    //            this.__releaseTimer.start();
    //         }
    //         else
    //         {
    //            this.__targetFixture.GetBody().SetAngularDamping(0);
    //            this.__targetFixture.GetBody().SetLinearDamping(0);
    //            Skin(this.__targetFixture.GetBody().GetUserData()).selected = false;
    //            if(HUD.instance.visible)
    //            {
    //               Skin(this.__targetFixture.GetBody().GetUserData()).glowOn(0.5);
    //            }
    //            else
    //            {
    //               Skin(this.__targetFixture.GetBody().GetUserData()).glowOff();
    //            }
    //         }
    //      }
    //      this.__targetFixture = null;
    //      if(this.__mouseJoint)
    //      {
    //         Simulation.instance.world.DestroyJoint(this.__mouseJoint);
    //         this.__mouseJoint = null;
    //      }
    //   }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
