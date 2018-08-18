const config = {
    type: Phaser.AUTO,
    width: screen.width,
    height: screen.height,
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
