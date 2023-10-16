//If you’re new to JavaScript, you might’ve noticed that odd keyword this while typing the above code. 
//this is a confusing concept in JS, but the basic idea is that it’s a special keyword bound to the current 
//object context. In the example above, this references the Scene object.

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        //this class, load image, name, location
        //The load.image() method expects two parameters: a string with the key name of the graphic 
        //you’re going to use (so you can reference it later in your program) and the URL for where your graphic is located.

        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
    }

    create() {
        console.log("Play scene activated");
        this.add.text(20, 20, "Rocket Patrol Play");
        //Green UI - Starting Point (0, borderUISize + borderPadding), X Leng (Width), Y Height (borderUISize * 2) 
        //.setOrigin is Weird - (0,0) sets to topLeft
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        //In Play.js's create() method, add the following code above the code that places the rectangular borders:
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //White Borders: 
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); 
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //game.config.width - borderUISize Make space for the border
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    }

    update() {
        //When you adjust tilePositionX or tilePositionY, 
        //you're essentially sliding the texture around within the confines of the tile sprite's dimensions (which don't change). 
        this.starfield.tilePositionX -= 4;
      }
} 