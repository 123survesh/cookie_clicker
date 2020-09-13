var config = {
	type: Phaser.AUTO,
	width: 500,
	height: 500,
	parent: "game",
	scene: {
		init: init,
		preload: preload,
		create: create
	}
}


function init() {

}

function preload() {

	this.load.image("cookie", "./assets/cookie.png");

	this.load.image("coin_rotate_1" , "./assets/coin_rotate_1.png");
	this.load.image("coin_rotate_2" , "./assets/coin_rotate_2.png");
	this.load.image("coin_rotate_3" , "./assets/coin_rotate_3.png");
	this.load.image("coin_rotate_4" , "./assets/coin_rotate_4.png");
	this.load.image("coin_rotate_5" , "./assets/coin_rotate_5.png");
	this.load.image("coin_rotate_6" , "./assets/coin_rotate_6.png");

	this.load.audio("coin_audio", "./assets/coin.wav");
    
}

function create() {

	var score = 0;

	var clicks = 0;

	var mouseDown = false;

	var cookie = this.add.image(250, 250, "cookie");
	cookie.setScale(0.3);


	var coin = this.add.sprite(250, 50, "coin_rotate_1");
	coin.setScale(0.2);

	var text = this.add.text(300, 50, '0', {fontSize: 30 });
	text.setOrigin(0.5, 0.5);

	var audio = this.sound.add("coin_audio", {
	    volume: 1,
	    seek: 0,
	});

    this.anims.create({
        key: 'coin_rotate',
        frames: [
            { key: 'coin_rotate_1' },
            { key: 'coin_rotate_2' },
            { key: 'coin_rotate_3' },
            { key: 'coin_rotate_4' },
            { key: 'coin_rotate_5' },
            { key: 'coin_rotate_6' }
        ],
        frameRate: 30,
        repeat: 3
    });

	cookie.setInteractive();

	cookie.on('pointerdown', function (pointer) {
		if(mouseDown == false) {
        	this.setScale(0.45);
        	mouseDown = true;
		}


    });

    cookie.on('pointerup', function (pointer) {
    	if(mouseDown) {
	        this.setScale(0.3);
	        clicks++;
	        if(clicks % 10 == 0) {
	        	coin.play("coin_rotate");
	        	score++;
	        	text.setText(score+"");
	        	audio.play({seek: 0});
	        }
	        mouseDown = false;
    	}
    });


    
}


var game = new Phaser.Game(config);