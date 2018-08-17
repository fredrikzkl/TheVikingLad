const screen = {
	width : 800,
	height : 600
};


//Spawn
const playerSpawn= {
	x : 100,
	y : 450
}

//Camera
const cameraLockSpeed = 0.02;
const cameraOffset = 250;
const cameraFadeIn = 500;


//Player var
const movementSpeed = 160;
const graityVal = 500;
const jumpPower = 300;
const doubleJumpPower=300;
const collisionBoxConstant = 0.6;

//Axe
const axeRotationSpeed = 5;
const axeThrowPower = 800;
const axeAcceleration = 20;

//AxeMovement Help variables
var axeCurrentSpeed;

var axeReturn;