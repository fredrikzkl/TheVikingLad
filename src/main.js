const cameraLockSpeed = 0.02;
const cameraOffset = 250;
const cameraFadeIn = 500;


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene:[
        Boot,
        Preload,
        MainMenu,

        //Levels
        Level0_0
    ]
};



const TheVikingLad = new Phaser.Game(config);
TheVikingLad.scene.start('boot');
