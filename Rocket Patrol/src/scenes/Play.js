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

        // Load a spritesheet 'explosion' and define each frame's dimensions and sequence within the larger image file.
        // Sheet is frames of images, and it read throught it.
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        console.log("Play scene activated");
        this.add.text(20, 20, "Rocket Patrol Play");

        //In Play.js's create() method, add the following code above the code that places the rectangular borders:
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        //Green UI - Starting Point (0, borderUISize + borderPadding), X Leng (Width), Y Height (borderUISize * 2) 
        //.setOrigin is Weird - (0,0) sets to topLeft
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        //White Borders: 
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); 
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        //game.config.width - borderUISize Make space for the border
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // Add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // Add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // Define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Add Animations - https://rexrainbow.github.io/phaser3-rex-notes/docs/site/animation/#add-animation
        this.anims.create({key:'explode', frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30})
        
    }

    update() {
        //When you adjust tilePositionX or tilePositionY, you're essentially sliding the texture 
        //around within the confines of the tile sprite's dimensions (which don't change). 
        //
        this.starfield.tilePositionX -= 4;

        this.p1Rocket.update(); //Runs rocket update

        this.ship01.update(); // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.ship03.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.ship02.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.ship01.reset();
        }
      }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } 
        
        else {
        return false;
        }
    }

    shipExplode(ship){
        // temporarily hide ship
        ship.alpha = 0;

        //Play animations
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0); // create explosion sprite at ship's position - Creates object
        boom.anims.play('explode');   // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes - event listener
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
          });       

    }

} 