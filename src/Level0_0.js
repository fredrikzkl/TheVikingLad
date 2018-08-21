
//Player
var player;

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
        super({
            key: 'Level0_0'
        })
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


        //Creating the player.
        player = new Player(this, playerSpawn.x, playerSpawn.y);
        //Generate Animations for the scene. Function from /Animations.js
        makeAnimations(this);
        //Defining the controllsers. Stores in variable 'keys'
        this.defineController();

        // Collectibles
        coins = this.physics.add.group();  
        //136 = GID in json file
        map.createFromObjects('coins', 136, {key: 'star'}).forEach(function(c) {coins.add(c);});
        coins.children.iterate(function (child) {
            child.body.allowGravity = false;

        });

        //Camera    
        this.cameras.main.startFollow(player,false,cameraLockSpeed,cameraLockSpeed);
        this.cameras.main.followOffset.set(-cameraOffset, 0);

        this.cameras.main.setBounds(0, 0, 3200, screen.height);
        this.cameras.main.fadeIn(cameraFadeIn);

        //  Collide the player  
        this.physics.add.collider(player, worldLayer);
        this.physics.add.overlap(player, coins, this.collectCoin, null, this);
    }

    update(time,delta){
        if (gameOver)
        {
            return;
        }

        player.update(time, delta,this.keys);
    
        //World conditions
        //Checks if the player falls down
        if(player.y >= (screen.height + player.height)){
            this.playerDead(this);
        }
       
    }


    collectCoin(player,coin){
        coin.destroy();    
    }  

    playerDead(game){
        game.physics.pause();
        //game.scene.stop();
    }

    defineController(){
        this.keys = {
            jump : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            axe  : this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        }
    }


}

