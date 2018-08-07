var config = {
    type: Phaser.AUTO,
    width: screen.width,
    height: screen.height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};


var game = new Phaser.Game(config);

function preload ()
{   
    //World
    this.load.image('sky', 'assets/sky.png');
    this.load.image('gameTiles', 'assets/platformer_32_full.png');
    this.load.tilemapTiledJSON('world1', '/forest1.json');

    //Player
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('axe', 'assets/axe.png');


    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
}

//Player
var player;
var currentMovementSpeed = movementSpeed;
var doubleJump;
var doubleJumpTimer;
var axe;
var axeAlive;

//Input
var cursors;
var spacebar;
var upkey;

//word
var worldLayer;
var map;
var tileset;

//GUI
var score = 0;
var gameOver = false;
var scoreText;



function create ()
{
   	//Background for the scene
   	// vthis.add.image(400,300,'sky');

   	platforms = this.physics.add.staticGroup();

   	//  Set the world (global) gravity


   	//Creates platform ground group
    map = this.add.tilemap('world1');
    var tileset = map.addTilesetImage('tileset1','gameTiles');

    worldLayer = map.createStaticLayer('worldLayer',tileset,0,0);
    worldLayer.setCollisionByProperty({ collides: true });

   	// The player and its settings
    player = this.physics.add.sprite(playerSpawn.x, playerSpawn.y, 'dude');
    player.body.setSize(player.width*0.6, player.height*0.7,100000,100000);
    player.body.updateBounds();

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

    //Gameobjects
    //Axe
     var axeConfig = {
        key: 'axe',
        x: 400,
        y: 300,
        scale: { x: { randFloat: [ 0.2, 2 ] }, y: { randFloat: [ 1.5, 3 ] } }
    };


    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    upkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);


    //Camera    
    this.cameras.main.startFollow(player);
 
    this.cameras.main.setBounds(0, 0, 3200, screen.height);
    this.cameras.main.fadeIn(500);
    

    //  Collide the player 
    this.physics.add.collider(player, worldLayer);


}

function update ()
{

	player.setVelocityX(currentMovementSpeed);

    player.anims.play('right', true);

    if (gameOver)
    {
        return;
    }

    //Game controllers
    if(player.body.blocked.down) doubleJump = true;
    if (Phaser.Input.Keyboard.JustDown(upkey))
    {
        //Regular Jump
        if(player.body.blocked.down){
            player.setVelocityY(-jumpPower);  
         
        }
        //Double jump
        else if(doubleJump){
            player.setVelocityY(-doubleJumpPower);
            doubleJump = false;
            console.log("DD");
        }
    }
    //Throwing Axe
    if(Phaser.Input.Keyboard.JustDown(spacebar)){
        throwAxe();
    }
    if(axeAlive){
        //axe.angle += ;
    }


    //World conditions
    //Checks if the player falls down
    if(player.y >= screen.height){playerDead();}
}

function throwAxe(){
    axe = this.make.sprite(axeConfig);
    axe.x = player.x;
    axe.y = player.y;
    axe.setVelocityX(axeThrowPower);

    axeAlive = true;
}

function playerDead(){
    this.physics.pause();

}

function render(){
	this.debug.cameraInfo(this.cameras.main, 32, 32);
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });    

}





function initiatePlayerAnimations(ref){
	 //  Our player animations, turning, walking left and walking right.
   
}