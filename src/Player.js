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
        this.body.gravity.y = graityVal;
        //Help variables Declaration
        this.doubleJump;
        this.axe;
    }

    create(){
    }

    update(keys){
        let input = {
            jump : keys.jump.isDown
        }
        //Facing configurations
        if(this.facing){
            this.body.setVelocityX(currentMovementSpeed);
            this.anims.play('right', true);
            
        }else{
            this.body.setVelocityX(-currentMovementSpeed);
            this.anims.play('left', true);
        }
        //To reduce motion sickness, move camera offset only when landing from jump
        if(this.body.blocked.down){
            this.scene.cameras.main.followOffset.set((this.facing ? -cameraOffset : cameraOffset), 0);
        }
        //When touching the ground, the double jump resets
        if(this.body.blocked.down) this.doubleJump = true;

        //
        //Game controllers
        //INPUT
        if (input.jump)
        {
    
            //Wall jump
            if(this.body.blocked.right || this.body.blocked.left){
                try{f
                //Offset is jused for either looking at the front tile + a little offset, or same backwards
                var offset = facing ? 0 : -1;
                //Tile size i 32x32, so have to devide på 32 to get the index in the matrice 
                var tile;
                if(facing){
                    tile = scene.map.getTileAt(Math.ceil((player.x/32)+offset), Math.floor((player.y/32)));
                }else{
                    tile = scene.map.getTileAt(Math.floor((player.x/32)+offset), Math.floor((player.y/32)));
                }
    
                if(scene.tile.properties.walljump && !this.body.blocked.down){
                    //Turns the plyer
                    facing ? facing = false : facing = true;
                    //Regular jump after turned
                    this.body.setVelocityY(-jumpPower);
                    return;
                }
                }catch(e){
                    if(e instanceof TypeError){
                        //Ignoring this error: Checking a tile that doesnt have property
                    }
                }
            }
            
            //Regular Jump
            if(this.body.blocked.down){
                this.body.setVelocityY(-jumpPower);  
    
            //Walljump
            }
            //Double jump
            else if(this.doubleJump){
                this.body.setVelocityY(-doubleJumpPower);
                this.doubleJump = false;
            }
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