class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
  
    // add object to existing scene
    scene.add.existing(this);

    //Adding movement:
    this.points = pointValue;
    this.moveSpeed = 3;}

    updates(){
        //Move spaceship left
        this.x -= this.moveSpeed

        //Reset Position
        if (this.x <= 0-this.width){
            this.x = game.config.width;
        }

    }



}