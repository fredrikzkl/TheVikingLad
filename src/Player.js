var lastDuration = 0;
class Player extends Phaser.GameObjects.Sprite{

    constructor(scene, x=0, y=0, texture = 'dude'){
        super(scene,x,y,texture);
        //Add the sprite to the scene - enable sweet phsyics
        scene.physics.world.enable(this);
        scene.add.existing(this);
        //Body settings
        this.body.setSize(this.width*0.6, this.height*0.7,100000,100000);
        this.body.updateBounds();
        this.facing = true;
        this.body.gravity.y = 900;
        //Constants
        this.jumpPower = 300;
        this.doubleJumpPower=400;
        this.movementSpeed = 160;
        this.jumpingTimerConstant = 300;
        this.jumpButtonTimer = 0;
        //Help variables Declaration
        this.doubleJumpReady = false;
        this.jumping = false;
        this.jumpTimer = this.jumpingTimerConstant;
        this.doubleJump;
        this.axe;
        this.currentMovementSpeed = this.movementSpeed;

    }

    create(){
    }

    update(time,delta, keys){
        let input = {
            jump : keys.jump.isDown
        }

        //Facing configurations
        if(this.facing){
            this.body.setVelocityX(this.currentMovementSpeed);
            this.anims.play('right', true);
            
        }else{
            this.body.setVelocityX(-this.currentMovementSpeed);
            this.anims.play('left', true);
        }
        //To reduce motion sickness, move camera offset only when landing from jump
        if(this.body.blocked.down){
            this.scene.cameras.main.followOffset.set((this.facing ? -cameraOffset : cameraOffset), 0);
        }
        this.jumpTimer -= delta;
        
        if(!input.jump) this.jumpButtonTimer = 0;
        //
        //Game controllers
        //INPUT
        
        if (input.jump){
            this.jump(delta);
            this.jumpButtonTimer += delta;
        }else if(!input.jump && this.body.blocked.down){
            // No longer in air
            this.jumping = false;
            //Resets the timer
            this.jumpTimer = -1;
            //Reset the double jump when hitting ground again
            this.doubleJump = true;
            //Resetting the double jump to prevent double jump in regular jump
            this.doubleJumpReady = false;
        }else if(!input.jump && this.jumping){
            //When releasing the button, this variable is set to true
            //Preveting double jump witin the first jump
            this.doubleJumpReady = true;
        }

        
        //Throwing Axe
        // if(Phaser.Input.Keyboard.JustDown(spacebar) && !player.body.blocked.right && !player.body.blocked.left){
        //     if(!axeAlive){
        //         this.throwAxe(this);
        //     }else{
        //         this.teleportToAxe();
        //     }
        // }

        // if(this.axe.alive){
        //     //this.axeLogic(this);
        // }
    
    }

    jump(delta, clickDuration){
        
        if (!this.body.blocked.down && !this.jumping) {
            return;
        }
        //Wall jump
        if((this.body.blocked.right || this.body.blocked.left) && !this.body.blocked.down && this.jumpButtonTimer < 1){
            try{
                //Offset is jused for either looking at the front tile + a little offset, or same backwards
                var offset = this.facing ? 0 : -1;
                //Tile size i 32x32, so have to devide på 32 to get the index in the matrice 
                var tile;
                if(this.facing){
                    tile = map.getTileAt(Math.ceil((this.body.x/32)+offset), Math.floor((this.body.y/32)));
                }else{
                    tile = map.getTileAt(Math.floor((this.body.x/32)+offset), Math.floor((this.body.y/32)));
                }
                if(tile.properties.walljump && !this.body.blocked.down){
                    //Turns the plyer
                    this.facing ? this.facing = false : this.facing = true;
                    //Regular jump after turned
                    this.body.setVelocityY(-this.doubleJumpPower);
                    return;
                }
            }catch(e){
                if(e instanceof TypeError){
                    console.log(e);
                    //Ignoring this error: Checking a tile that doesnt have property
                }
            }
        }
        
        //Regular Jump
        if(this.body.blocked.down || this.jumpTimer > 0){
            this.body.velocity.y = -this.jumpPower;  
        }
        //Double jump
        else if(this.doubleJumpReady && this.doubleJump){
            this.body.velocity.y = (-this.doubleJumpPower);
            this.doubleJump = false;
            this.doubleJumpReady = false;
        }

        

        if (!this.jumping) {
            //Resetting the jump timer
            this.jumpTimer = this.jumpingTimerConstant;
        }

        this.jumping = true;
        
    }

    teleportToAxe(){
        axeReturn = true; //Must be set in order for the axe to be destroyed
        player.x = axe.x;
        player.y = axe.y;
        this.destroyAxe();
    }

    destroyAxe(){
        if(axeReturn){
            axe.destroy();
            axeAlive = false;
            axe = null;
        }
    }


}