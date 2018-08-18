//Player
var player;
var playerFacing; //True = Right, False = left
var currentMovementSpeed = movementSpeed;
var doubleJump;
var doubleJumpTimer;

//Axe
var axe;
var axeAlive;

//Collectibles
var coins;

//Input
var cursors;
var spacebar;
var upkey;

//word
var worldLayer;
var wallJumpLayer;
var map;
var tileset;

//GUI
var score = 0;
var gameOver = false;
var scoreText;

class Level0_0 extends Phaser.Scene{
    constructor(){
        super('Level0_0')
    }

    create(){
        //  Set the world (global) gravity
        map = this.add.tilemap('world_0101');
        //VIKTIG! Første argument må ha samme navn som tilesettet i TILED filen ellers er det gg
        var tileset = map.addTilesetImage('forest_tileset','tileset_forest'); 


        
        worldLayer = map.createStaticLayer('worldLayer',tileset,0,0);
        worldLayer.setCollisionByProperty({ collides: true });

        var debugGraphics = this.add.graphics();
        map.renderDebug(debugGraphics);
        debugGraphics.visible = true;

        // The player and its settings
        player = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, 'dude');
        player.body.setSize(player.width*0.6, player.height*0.7,100000,100000);
        player.body.updateBounds();
        playerFacing = true;

        //  Player physics properties.
        player.body.gravity.y = graityVal;

        //Initates Player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        // Collectibles

        coins = this.physics.add.group();  
        //136 = GID in json file
        map.createFromObjects('coins', 136, {key: 'star'}).forEach(function(c) {coins.add(c);});
        coins.children.iterate(function (child) {
            child.body.allowGravity = false;

        });

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        upkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        //Camera    
        this.cameras.main.startFollow(player,false,cameraLockSpeed,cameraLockSpeed);
        this.cameras.main.followOffset.set(-cameraOffset, 0);

        this.cameras.main.setBounds(0, 0, 3200, screen.height);
        this.cameras.main.fadeIn(cameraFadeIn);

        //  Collide the player  
        this.physics.add.collider(player, worldLayer);
        this.physics.add.overlap(player, coins, this.collectCoin, null, this);
    }

    update(){
        if (gameOver)
        {
            return;
        }
    
        //Facing configurations
        if(playerFacing){
            player.setVelocityX(currentMovementSpeed);
            player.anims.play('right', true);
            
        }else{
            player.setVelocityX(-currentMovementSpeed);
            player.anims.play('left', true);
        }
        //To reduce motion sickness, move camera offset only when landing from jump
        if(player.body.blocked.down){
            this.cameras.main.followOffset.set((playerFacing ? -cameraOffset : cameraOffset), 0);
    
        }
        
    
        //Game controllers
        if(player.body.blocked.down) doubleJump = true;
        if (Phaser.Input.Keyboard.JustDown(upkey))
        {
    
            //Wall jump
            if(player.body.blocked.right || player.body.blocked.left){
                try{
                //Offset is jused for either looking at the front tile + a little offset, or same backwards
                var offset = playerFacing ? 0 : -1;
                //Tile size i 32x32, so have to devide på 32 to get the index in the matrice 
                var tile;
                if(playerFacing){
                    tile = map.getTileAt(Math.ceil((player.x/32)+offset), Math.floor((player.y/32)));
                }else{
                    tile = map.getTileAt(Math.floor((player.x/32)+offset), Math.floor((player.y/32)));
                }
    
                if(tile.properties.walljump && !player.body.blocked.down){
                    //Turns the plyer
                    playerFacing ? playerFacing = false : playerFacing = true;
                    //Regular jump after turned
                    player.setVelocityY(-jumpPower);
                    return;
                }
                }catch(e){
                    if(e instanceof TypeError){
                        //Ignoring this error: Checking a tile that doesnt have property
                    }
                }
            }
            
            //Regular Jump
            if(player.body.blocked.down){
                player.setVelocityY(-jumpPower);  
    
            //Walljump
            }
            //Double jump
            else if(doubleJump){
                player.setVelocityY(-doubleJumpPower);
                doubleJump = false;
            }
        }
        //Throwing Axe
        if(Phaser.Input.Keyboard.JustDown(spacebar) && !player.body.blocked.right && !player.body.blocked.left){
            if(!axeAlive){
                this.throwAxe(this);
            }else{
                this.teleportToAxe();
            }
        }
    
        if(axeAlive){
            this.axeLogic(this);
        }
    
    
        //World conditions
        //Checks if the player falls down
        if(player.y >= (screen.height + player.height)){
            this.playerDead(this);
        }

       
    }

    throwAxe(game){
        axe = game.physics.add.sprite(player.x, player.y, 'axe').setScale(0.2);


        game.physics.add.collider(axe,worldLayer);
        game.physics.add.overlap(player, axe, this.destroyAxe, null, this);
        game.physics.add.overlap(axe, coins, this.collectCoin, null, this);
    
    
    
        axeCurrentSpeed = playerFacing ? axeThrowPower : -axeThrowPower;
    
        axeAlive = true;
        axeReturn = false;
    
        axe.body.allowGravity = false;
    }

    axeLogic(){
        if((axe.x < player.x && playerFacing) || (axe.x > player.x && !playerFacing)){
          axeReturn = true;
          this.destroyAxe();
          return;  
        } 
        //Rotate
        axe.angle += playerFacing ? axeRotationSpeed : -axeRotationSpeed;
        //Move
        if(playerFacing){
            if(axeCurrentSpeed <= 0) axeReturn = true;      
        }else{
            if(axeCurrentSpeed >= 0) axeReturn = true;      
        }
        
    
        if(axe.body.blocked.right || axe.body.blocked.left){
            axeCurrentSpeed = 0;
        }
    
        axe.setVelocityX(axeCurrentSpeed);
        axeCurrentSpeed -= playerFacing ? axeAcceleration : -axeAcceleration;
    
        if(axeReturn){
            if(player.y > axe.y) axe.setVelocityY(playerFacing ? -axeCurrentSpeed : axeCurrentSpeed);
            if(player.y < axe.y) axe.setVelocityY(playerFacing ? axeCurrentSpeed : -axeCurrentSpeed);
        }
    }

    teleportToAxe(){
        axeReturn = true; //Must be set in order for the axe to be destroyed
        player.x = axe.x;
        player.y = axe.y;
        destroyAxe();
    }

    destroyAxe(){
        if(axeReturn){
            axe.destroy();
            axeAlive = false;
            axe = null;
        }
    }

    collectCoin(player,coin){
        coin.destroy();    
    }  

    playerDead(game){
        game.physics.pause();
        //game.scene.stop();
    }

}