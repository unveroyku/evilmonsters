let charX = 150;
let charY = 460;
let charWidth = 20;
let charHeight = 20;
let jumpingRn = false;
let isCrouching = false;

// Movement states
let moveRightPressed = false;
let moveLeftPressed = false;

// Jump and movement velocities
let yVelocity = 0;
let gravity = 0.6;
let jumpStrength = -12;
let xSpeed = 5;

let level = 1;
let currentBackground;

let background1;
let background2;
let evilX = 550;
let evilY;
let evilSpeed = 5;
let evilDirection = -1;

let lostSound;
let wonSound; 

function preload() {
  background1 = loadImage("house.png");
  background2 = loadImage("house2.png");
  background3 = loadImage("house3.png");
  background4 = loadImage("gameover.png");
  
  lostSound = loadSound("lost.mp3");
  wonSound = loadSound("won.mp3");
}

function setup() {
  createCanvas(800, 800);
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

function draw() {
  background(255); // Ensure the background is cleared each frame

  // Change the background based on the level
  if (level == 1) {
    currentBackground = background1;
  } else if (level == 2) {
    currentBackground = background2;
  } else if (level == 3) {
    currentBackground = background3;
  } else if (level == 4) {
    currentBackground = background4;
  }
  image(currentBackground, 0, 0);

  // Draw the character
  noStroke();
  fill(0, 0, 0);
  if (isCrouching) {
    rect(charX, charY + 15, charWidth, charHeight);
  } else {
    rect(charX, charY, charWidth, charHeight);
  }
  
    
  if (level === 1){
    evilY = 452;
     // Bounce the enemy off the canvas edges
  if (evilX <= 150 || evilX >= 570) {
    evilDirection *= -1;
  }

  } else if (level === 2){
    evilY = 500;
    if (evilX <= 70 || evilX >= 700) {
    evilDirection *= -1;
  }
  } else if (level === 3){
    evilY = 300;
    if (evilX <= 70 || evilX >= 700) {
    evilDirection *= -1;
  }
  }


// Constrain movement based on the current level
if (level === 1) {
  if (charX < 150) {
    charX = 150;
  } else if (charX > 570) {
    charX = 570;
  }
} else if (level === 2 || level === 3) {
  if (charX < 70) {
    charX = 70;
  } else if (charX > 700) {
    charX = 700;
  }
}


  // Draw the evil enemy
  noStroke();
  fill(200, 200, 100);
  ellipse(evilX, evilY, 20, 20);

  // Move the evil enemy
  evilX += evilSpeed * evilDirection;


  // Apply horizontal movement
  if (moveRightPressed) {
    charX += xSpeed;
  }
  if (moveLeftPressed) {
    charX -= xSpeed;
  }

  // Apply vertical movement (jumping and gravity)
  charY += yVelocity;
  yVelocity += gravity;

  // // Prevent the character from falling below the ground
  // if (charY >= 460) {
  //   charY = 460;
  //   yVelocity = 0;
  //   jumpingRn = false;
  // }

  // Check for color collision
  checkColorCollision();

  // Level up conditions based on position
  let currentColRight = get(charX + charWidth, charY);
  let currentColLeft = get(charX - 1, charY);

  let rightR = red(currentColRight);
  let rightG = green(currentColRight);
  let rightB = blue(currentColRight);

  let leftR = red(currentColLeft);
  let leftG = green(currentColLeft);
  let leftB = blue(currentColLeft);
}

// Keydown event handler
function handleKeyDown(e) {
  if (e.key === "ArrowUp" && !jumpingRn) {
    startJump();
  } else if (e.key === "ArrowDown") {
    isCrouching = true;
    charHeight = 5;
  } else if (e.key === "ArrowRight") {
    moveRightPressed = true;
  } else if (e.key === "ArrowLeft") {
    moveLeftPressed = true;
  }
}

// Keyup event handler
function handleKeyUp(e) {
  if (e.key === "ArrowDown") {
    charHeight = 20;
    isCrouching = false;
  } else if (e.key === "ArrowRight") {
    moveRightPressed = false;
  } else if (e.key === "ArrowLeft") {
    moveLeftPressed = false;
  }
}

// Move right function
function moveRight() {
  charX += xSpeed;
}

// Move left function
function moveLeft() {
  charX -= xSpeed;
}

// Start jump function
function startJump() {
  jumpingRn = true;
  yVelocity = jumpStrength;
}

// Function to check color collisions and teleport accordingly
function checkColorCollision() {
  let currentColRight = get(charX + charWidth, charY);
  let currentColLeft = get(charX - 1, charY);

  let rightR = red(currentColRight);
  let rightG = green(currentColRight);
  let rightB = blue(currentColRight);

  let leftR = red(currentColLeft);
  let leftG = green(currentColLeft);
  let leftB = blue(currentColLeft);
  
  if (level === 1){
    checkCol(255, 0, 0, 150, 460);   // Red color -> Reset to starting position
    checkCol(0, 255, 0, 150, 700);  // Green color -> Move to lower position
    checkCol(255, 255, 0, 100, 350); // Yellow color -> Move to higher level
    checkCol(200, 200, 100, 150, 400); // Evil color -> restart
  } else if (level === 2){
    
    checkCol(255, 0, 0, 100, 350);   // Red color -> Reset to starting position
    checkCol(0, 255, 0, 100, 550);  // Green color -> Move to next position
     checkCol(0, 0, 255, 100, 720); // Blue color -> Move to higher position
    checkCol(255, 0, 255, 200, 350); // Pink color -> Move to next level
    
    
    checkCol(200, 200, 100, 150, 400); 
    
  } else if (level === 3){
    
    checkCol(255, 0, 0, 100, 350);   // Red color -> Reset to starting position
    checkCol(0, 255, 0, 100, 550);  // Green color -> Move to next position
     checkCol(0, 0, 255, 100, 720); // Blue color -> Move to higher position
    checkCol(0, 255, 255, 0, 0); // Turquoise color -> Move to next level
    
    
    checkCol(200, 200, 100, 150, 400); 
    
  }
  }


// Helper function to handle teleportation based on color
function checkCol(r, g, b, newX, newY) {
  
  let yOffset = isCrouching ? 15 : 0; 
  
  let currentColRight = get(charX + charWidth, charY + yOffset);
  let currentColLeft = get(charX - 1, charY + yOffset);

  let rightR = red(currentColRight);
  let rightG = green(currentColRight);
  let rightB = blue(currentColRight);

  let leftR = red(currentColLeft);
  let leftG = green(currentColLeft);
  let leftB = blue(currentColLeft);
  
  // Prevent the character from falling below the ground
if (level === 1) {
  if (charY >= 460 && charY < 550) {
    charY = 460;
    yVelocity = 0;
    jumpingRn = false;
  } else if (charY >= 700) {
    charY = 700;
    yVelocity = 0;
    jumpingRn = false;
  }
} else if (level === 2) {
  if (charY >= 335 && charY < 400) {
    charY = 335;
    yVelocity = 0;
    jumpingRn = false;
  } else if (charY >= 550 && charY < 580) {
    charY = 550;
    yVelocity = 0;
    jumpingRn = false;
  } else if (charY >= 720) {
    charY = 720;
    yVelocity = 0;
    jumpingRn = false;
  } 
} else if (level === 3) {
  if (charY >= 335 && charY < 400) {
    charY = 335;
    yVelocity = 0;
    jumpingRn = false;
  } else if (charY >= 550 && charY < 580) {
    charY = 550;
    yVelocity = 0;
    jumpingRn = false;
  } else if (charY >= 720) {
    charY = 720;
    yVelocity = 0;
    jumpingRn = false;
  } 
}

if (level === 1) {  

  if ((rightR === r && rightG === g && rightB === b) || (leftR === r && leftG === g && leftB === b)) {
    charX = newX;
    charY = newY;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    console.log(`Teleported to (${newX}, ${newY})`);
  }
  
    // Check if touching yellow for level up
  if ((rightR == 255 && rightG == 255 && rightB == 0) || (leftR == 255 && leftG == 255 && leftB == 0)) {
    charX = newX;
    charY = 100;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    level = 2;
    console.log("Level up!");
  }
  
 if (!isCrouching) {
  if ((rightR == 200 && rightG == 200 && rightB == 100) || (leftR == 200 && leftG == 200 && leftB == 100)) {
    charX = newX;
    charY = 350;
    level = 1;
    console.log("Restart!");
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
  
  }
}
} else if (level === 2){
  if ((rightR === r && rightG === g && rightB === b) || (leftR === r && leftG === g && leftB === b)) {
    charX = newX;
    charY = newY;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    console.log(`Teleported to (${newX}, ${newY})`);
  }
  
   if ((rightR == 0 && rightG == 255 && rightB == 0) || (leftR == 0 && leftG == 255 && leftB == 0)) {
    charX = newX;
    charY = 550;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    console.log("Next floor!");
  }
  
  if ((rightR == 0 && rightG == 0 && rightB == 255) || (leftR == 0 && leftG == 0 && leftB == 255)) {
    charX = newX;
    charY = 720;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    console.log("Next floor!");
  }
  
   // Check if touching pink for level up
  if ((rightR == 255 && rightG == 0 && rightB == 255) || (leftR == 255 && leftG == 0 && leftB == 255)) {
    charX = newX;
    charY = 100;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    level = 3;
    console.log("Level up!");
  }
  
} else if (level === 3){
  if ((rightR === r && rightG === g && rightB === b) || (leftR === r && leftG === g && leftB === b)) {
    charX = newX;
    charY = newY;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    console.log(`Teleported to (${newX}, ${newY})`);
    
  }
  
   if ((rightR == 0 && rightG == 255 && rightB == 0) || (leftR == 0 && leftG == 255 && leftB == 0)) {
    charX = newX;
    charY = 550;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    console.log("Next floor!");
  }
  
  if ((rightR == 0 && rightG == 0 && rightB == 255) || (leftR == 0 && leftG == 0 && leftB == 255)) {
    charX = newX;
    charY = 720;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    console.log("Next floor!");
  }
  
   // Check if touching pink for level up
  if ((rightR == 0 && rightG == 255 && rightB == 255) || (leftR == 0 && leftG == 255 && leftB == 255)) {
    charX = 0;
    charY = 0;
    yVelocity = 0; // Stop any vertical movement after teleport
    jumpingRn = false;
    level = 4;
    console.log("Done!");
    wonSound.play();
  }
  
} 
  
}
