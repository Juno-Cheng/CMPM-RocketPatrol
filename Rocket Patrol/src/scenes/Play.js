//If you’re new to JavaScript, you might’ve noticed that odd keyword this while typing the above code. 
//this is a confusing concept in JS, but the basic idea is that it’s a special keyword bound to the current 
//object context. In the example above, this references the Scene object.

class Menu extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    create() {
      this.add.text(20, 20, "Rocket Patrol Menu");
    }
} 