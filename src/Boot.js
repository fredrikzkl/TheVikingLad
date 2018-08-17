
//
// Setting game configurations and loading the assets for the loading screen
//

class Boot extends Phaser.Scene {
	constructor(){
		super('Boot');
	}
	//Loading the assets for the loading screen
	preload(){
		this.load.image('game_logo','assets/logo.png');
	}
	create(){
		this.scene.start('Preload');
	}	
}