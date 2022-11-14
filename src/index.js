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

function preload() {
    this.load.image('ball', '../assets / images/ball.png');
    this.load.image("paddle", "../assets/images/paddle.png");
}

function create() {
    ball = this.physics.add.sprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2,
      'ball'
    );

    ball.setCollideWorldBounds(true)
    ball.setBounce(1, 1)

    player1 = this.physics.add.sprite(
        this.physics.world.bounds.width - (ball.body.width / 2 + 1),
        this.physics.world.bounds.height / 2,
        "paddle"
    );

    player1.setImmovable(true)
    player1.setCollideWorldBounds(true);

    player2 = this.physics.add.sprite(
        ball.body.width / 2 + 1,
        this.physics.world.bounds.height / 2,
        "paddle"
    );

    player2.setImmovable(true);
    player2.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(ball, player1)
    this.physics.add.collider(ball, player2);

}

function update() {

    if (!gameStarted) {

    const viX = 100;
    const viY = 100;
    ball.setVelocityX(viX);
    ball.setVelocityY(viY);

    gameStarted = true;

    }


    player1.body.setVelocityY(0)
    if (cursors.up.isDown) {
        player1.body.setVelocityY(-paddleSpeed)
    }

    if (cursors.down.isDown) {
        player1.body.setVelocityY(paddleSpeed);
    }

    if (ball.body.velocity.y > paddleSpeed) {
        ball.body.setVelocityY(paddleSpeed)
    }

    if (ball.body.velocity.y < -paddleSpeed) {
        ball.body.setVelocityY(-paddleSpeed);
    }
}