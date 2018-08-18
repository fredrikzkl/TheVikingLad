class MainMenu extends Phaser.Scene {

    constructor(){
        super('MainMenu');
    }

    create(){
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;


        var titleText = this.make.text ({
            x: width / 2,
            y: 35,
            text: 'The Viking Lad - Demo',
            style: {
                font: '40px monospace',
                fill: '#ffffff'
            }
        });
        titleText.setOrigin(0.5, 0.5);


        var startBtn = this.make.text ({
            x: width / 2,
            y: height/2,
            text: 'Start Game',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        startBtn.setOrigin(0.5, 0.5);

        startBtn.inputEnabled = true;
        
        startBtn.events.onInputdown.add(down,this);

        
    }


    down(item){
        console.log("hey");
    }
    
}