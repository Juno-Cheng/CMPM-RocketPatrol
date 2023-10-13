//The console.log() function allows us to “print” messages to the JavaScript Console, a browser tool provided to developers 
//to help debug their code. The Console is essential to web programming, and you’ll use it extensively while building web games.

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

