let LightText;
let DarkText;
let LightBackground;
let DarkBackground;
let LatestText;
let LatestBackground;

let fallingSnow = [];
let NotFallingSnow = [];

let thisBoard;
let nextNumberButton;
let newGameButton;
let ShakeButton;




function setup() {
  DarkText = color(255, 160 + 20, 50 + 20)
  LightText = color(255 - 5, 160 - 5, 50 - 5);
  LatestText = color(255, 160 + 20, 50 + 20) 
  DarkBackground = color(115, 37, 33);
  LightBackground = color(41 - 5, 88 - 5, 73 - 5)
  LatestBackground =color(115, 37, 33);
  

  createCanvas(windowWidth, windowHeight);

  for (i = 0; i < 100; i++) {
    fallingSnow.push(new flake(true));
  }
  
  // create board
  thisBoard = new Board();
  nextNumberButton = new NextNumber()
  newGameButton = new NewGame()
  ShakeButton = new Shake()
}

function draw() {
  h = windowHeight;
  w = windowWidth;
  background(LightBackground);

  // display and update falling snow
  for (i = fallingSnow.length - 1; i >= 0; i--) {
    fallingSnow[i].update();
    fallingSnow[i].display();
    // pop the sucker if its not falling
    if (!fallingSnow[i].moving) {
      NotFallingSnow.push(fallingSnow[i]);
      fallingSnow.splice(i, 1);
      fallingSnow.push(new flake())
    }
  }

  // Display and update not falling snow
  for (j = 0; j < NotFallingSnow.length; j++) {

    NotFallingSnow[j].display();
    NotFallingSnow[j].update();

    // pop the sucker if not showing
    if (NotFallingSnow[j].opacity < 0) {
      NotFallingSnow.splice(j, 1);
    }
  }
  
  
  let shake = ShakeButton.display()
  translate(shake)
  thisBoard.display()
  nextNumberButton.display()
  newGameButton.display()
  
  textFont("Roboto Condensed")
  textSize(h * 0.018);
  text('Made by: Simon Rask', w / 2, h * (1 - 0.027));
  textAlign(CENTER, CENTER);
  fill(255);
}

function windowResized() {
  // Set global height and width
  h = windowHeight;
  w = windowWidth;
  
  resizeCanvas(windowWidth, windowHeight);
  thisBoard.resize();
  
  newGameButton.resize();
  nextNumberButton.resize();
  ShakeButton.resize();
  
  NotFallingSnow = []

}

function mousePressed() {
  nextNumberButton.clicked(mouseX, mouseY, thisBoard);
  newGameButton.clicked(mouseX, mouseY, thisBoard);
  ShakeButton.clicked(mouseX, mouseY)
}
