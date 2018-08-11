var screen = {
	width : 800,
	height : 600
};


//Spawn
var playerSpawn= {
	x : 100,
	y : 450
}

//Player var
var movementSpeed = 160;
var graityVal = 500;

var jumpPower = 300;
var doubleJumpPower=300;
var collisionBoxConstant = 0.6;

//Axe
var axeThrowPower = 10;
var axeAcceleration = 0.2;
//AxeMovement Help variables
var axeCurrentSpeed;

var axeReturn;