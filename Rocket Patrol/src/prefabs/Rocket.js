// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
    // add object to existing scene
    scene.add.existing(this);

    //Adding movement:
    this.isFiring = false;
    this.moveSpeed = 2;}

    update() {
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {  // If Press and in borders - Move Left/Right
                this.x -= this.moveSpeed;  // add a semicolon here if adhering strictly to style
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {  // corrected the logical operator
                this.x += this.moveSpeed;  // and here
            }
        }
        //Fire Button
        if (Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
        }

        //If fired move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }
        
        //Rewset on Miss
        if (this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }


}