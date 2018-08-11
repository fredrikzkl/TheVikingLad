var config = {
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
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};
