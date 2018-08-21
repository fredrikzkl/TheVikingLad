class Axe extends Phaser.GameObjects.Sprite {
    constructor(player,scene, x,y,texture='axe'){
        super(scene,x,y,texture);
        //Adds the axe to the scene 
        scene.physics.world.enable(this);
        scene.add.existing(this);
        //Properties
        this.body.setScale(0.2);
        this.body.allowGravity = false;
        //Variables
        this.alive = true;
        this.return = false;

        this.currentSpeed = player.facing ? axeThrowPower : -axeThrowPower;
        
        // game.physics.add.collider(axe,worldLayer);
        // game.physics.add.overlap(player, axe, this.destroyAxe, null, this);
        // game.physics.add.overlap(axe, coins, this.collectCoin, null, this);
    }

    update(){
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
}