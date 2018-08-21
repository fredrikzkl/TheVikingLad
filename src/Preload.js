
class Preload extends Phaser.Scene{

    constructor(){
        super('Preload');
    }

    preload(){
        //Player
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('axe', 'assets/axe.png');
       
        //Gameobjects
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');

        //World
        this.load.image('sky', 'assets/sky.png');
        this.load.image('tileset_forest', 'assets/world_tilesets/forest_tileset.png');
        this.load.tilemapTiledJSON('world_0101', 'levels/world_1/forest01.json');
 


        //Loading INFO
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value){
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('fileprogress', function(file){
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete',function(){
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    }

    create(){
        //this.add.image(400,400,'game_logo');
        this.scene.start('Level0_0');
    }
}
