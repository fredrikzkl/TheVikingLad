class Axe extends Phaser.GameObjects.Sprite {
    constructor(player,scene, x,y,texture='axe'){
        super(scene,x,y,texture);
        //Adds the axe to the scene 
        scene.physics.world.enable(this);
        scene.add.existing(this);
        //Properties
        this.setScale(0.2);
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
        if((this.x < this.player.x && this.player.facing) || (this.x > this.player.x && !this.player.facing)){
            this.return = true;
            this.destroy();
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

    destroy(){
        if(this.return){
            this.alive = false;
            this.player.axe = null;
            this.destroy();
        }
    }
}