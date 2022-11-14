
// Game config files
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 640,
    // scale: {
    //     mode: Phaser.Scale.RESIZE,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    scene: {
        preload,
        create,
        update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false
        }
    }
}

const game = new Phaser.Game(config)

let ball;
let player1;
let player2;
let gameStarted = false
let cursors;
const paddleSpeed = 350

let keys = {};
let p1win;
let p2win;




// Preloads assets (images)
function preload() {
    this.load.image('ball', '../assets / images/ball.png');
    this.load.image("paddle", "../assets/images/paddle.png");
}

function create() {

// Starting position for Ball
  ball = this.physics.add.sprite(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    "ball"
  );

  // Ball collides with wrold bounds
  // Ball bounces on collision
  ball.setCollideWorldBounds(true);
  ball.setBounce(1, 1);

  // Creates player 1 with initial conditions
  player1 = this.physics.add.sprite(
    this.physics.world.bounds.width - (ball.body.width / 2 + 1),
    this.physics.world.bounds.height / 2,
    "paddle"
  );

  // Player 1 collides with world bounds
  player1.setImmovable(true);
  player1.setCollideWorldBounds(true);

  // Creates player 2 with initial conditions
  player2 = this.physics.add.sprite(
    ball.body.width / 2 + 1,
    this.physics.world.bounds.height / 2,
    "paddle"
  );

  // Player 2 collides with world bounds
  player2.setImmovable(true);
  player2.setCollideWorldBounds(true);

  // Inputs for the game to read
  cursors = this.input.keyboard.createCursorKeys();
  keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

  // Rule for ball and players to collide
  this.physics.add.collider(ball, player1);
  this.physics.add.collider(ball, player2);

  // Text when winning
  p1win = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'Player 1 Wins!'
  )
  p1win.setVisible(false)

    p2win = this.add.text(
        this.physics.world.bounds.width / 2,
        this.physics.world.bounds.height / 2,
        "Player 2 Wins!"
    );
    p2win.setVisible(false);
}

function update() {

    // Checks if game started and adds initial conditions
    if (!gameStarted) {
     // Initial Velocities
    const viX = (Math.random() * 100) + 100;
    const viY = (Math.random() * 150) + 100;
    ball.setVelocityX(viX);
    ball.setVelocityY(viY);

    gameStarted = true;

    }

    // Checks to see if ball is past player 1 or 2
    // Sets winning conditions

    if (ball.body.x > player1.body.x){
        p2win.setVisible(true)
        ball.setVelocityX(0)
        ball.setVelocityY(0)
    }


  if (ball.body.x < player2.body.x) {
    p1win.setVisible(true);
        ball.setVelocityX(0);
        ball.setVelocityY(0);
  }



    // Player 1 Movement
    player1.body.setVelocityY(0)
    if (cursors.up.isDown) {
        player1.body.setVelocityY(-paddleSpeed)
    }

    if (cursors.down.isDown) {
        player1.body.setVelocityY(paddleSpeed);
    }


    // Player 2 Movement
    player2.body.setVelocityY(0);

    if (keys.w.isDown) {
      player2.body.setVelocityY(-paddleSpeed);
    }

    if (keys.s.isDown) {
      player2.body.setVelocityY(paddleSpeed);
    }


    // Ball Max Speed
    if (ball.body.velocity.y > paddleSpeed) {
        ball.body.setVelocityY(paddleSpeed);
    }

    if (ball.body.velocity.y < -paddleSpeed) {
        ball.body.setVelocityY(-paddleSpeed);
    }

}