var config = {
	type: Phaser.AUTO,
	width: 320,
	height: 320,
	parent: "game",
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	},
	render: {
		pixelArt: true
	},
	physics: {
        default: 'arcade',
        arcade: {
        	height:320,
        	width: 640,
            gravity: { y: 300 },
            debug: false
        }
    },
}


function init() {

}

function preload() {

	this.load.image("tiles", "./assets/tiles.png");
	this.load.spritesheet("player", "./assets/player.png", {
	frameWidth: 8,
    frameHeight: 8,
    margin: 1,
    spacing: 2
	});

	this.load.tilemapTiledJSON("map", "./assets/map.json");


}

function create() {

	let map = this.add.tilemap("map");
	let tiles = map.addTilesetImage("tiles");

	this.player = this.physics.add.sprite(50, 50, "player");
	this.player.setDepth(2)
	this.player.setScale(4)
	this.player.setCollideWorldBounds(true);
	this.player.name = "player";
	this.player.touchingGround = false;

	let bgLayer = map.createStaticLayer("bg", [tiles], 0, 0);
	bgLayer.setScale(4)
	let objectLayer = map.createStaticLayer("objects", [tiles], 0, 0);
	objectLayer.setScale(4)

	this.physics.add.collider(this.player, bgLayer, function(gb1, gb2){
		gb1.touchingGround = true
	})

	bgLayer.setCollisionByProperty({collides: true})

	this.cameras.main.setBounds(0, 0, 640, 320)

	this.cameras.main.startFollow(this.player);


	this.cursors = this.input.keyboard.createCursorKeys();

    
}

function update(){

	if (this.cursors.left.isDown)
	{
	    this.player.setVelocityX(-160);

	    this.player.setFrame(0);
	}
	else if (this.cursors.right.isDown)
	{
	    this.player.setVelocityX(160);

	    this.player.setFrame(2);
	}
	else
	{
	    this.player.setVelocityX(0);

	    this.player.setFrame(1);
	}

	if (this.cursors.up.isDown && this.player.touchingGround == true)
	{
		this.player.touchingGround = false;
	    this.player.setVelocityY(-200);
	}
}



var game = new Phaser.Game(config);