var screen = {
	width : 800,
	height : 600
};


//Spawn
var playerSpawn= {
	x : 100,
	y : 450
}

//Camera
var cameraLockSpeed = 0.05;
var cameraOffset = 300;
var cameraFadeIn = 500;


//Player var
var movementSpeed = 160;
var graityVal = 500;
var jumpPower = 300;
var doubleJumpPower=300;
var collisionBoxConstant = 0.6;

//Axe
var axeThrowPower = 800;
var axeAcceleration = 20;

//AxeMovement Help variables
var axeCurrentSpeed;

var axeReturn;