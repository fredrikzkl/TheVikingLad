class Axe extends Phaser.GameObjects.Sprite {
    constructor(player,scene,texture='axe'){
        super(scene,player.x,player.y,texture);
        //Adds the axe to the scene 
        scene.physics.world.enable(this);
        scene.add.existing(this);
        //
        this.player = player;
        //Properties
        this.setScale(0.2);
        this.body.allowGravity = false;
        //Variables
        this.alive = true;
        this.return = false;
        //Constants
        this.throwPower = 800;
        this.rotationSpeed = 5;
        this.acceleration = 20;

        //Determines which direction the the throw is - based on which way the player is facing
        this.currentSpeed = player.facing ? this.throwPower : -this.throwPower;
        
        scene.physics.add.collider(this,worldLayer);
        scene.physics.add.overlap(player, this, this.catchAxe, null, this);
        scene.physics.add.overlap(this, coins, scene.collectCoin, null, this);
    }

    update(){
        var p = this.player.body;
        var a = this.body;
        
        //Makes sure the axe doesn't fly away - removes if bypasses player
        if((a.x < (p.x-p.width) && this.player.facing) || (a.x > (p.x+p.width) && !this.player.facing)){
            this.return = true;
            this.catchAxe();
            return;  
        } 
     
        //Rotate
        this.angle += this.player.facing ? this.rotationSpeed : -this.rotationSpeed;
        //Move
        if(this.player.facing){
            if(this.currentSpeed <= 0) this.return = true;      
        }else{
            if(this.currentSpeed >= 0) this.return = true;      
        }
        
        //Stops when hitting the wall, duh
        if(a.blocked.right || a.blocked.left){
            this.currentSpeed = 0;
        }
        
        //Setting the speed
        a.setVelocityX(this.currentSpeed);
        //Deaccelerates, comes back
        this.currentSpeed -= this.player.facing ? this.acceleration : -this.acceleration;
        
        // //Projectiles back to player - depening on facing
        if(this.return){
            if(p.y > a.y) a.setVelocityY(this.player.facing ? -this.currentSpeed : this.currentSpeed);
            if(p.y < a.y) a.setVelocityY(this.player.facing ? this.currentSpeed : -this.currentSpeed);
        }
    }

    catchAxe(){
        if(this.return){
            this.alive = false;
            this.player.axe = null;
            this.destroy();
        }
    }
}