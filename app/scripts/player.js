window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 10; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var ISCLICKED;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		//this.Flappy = this.game.add.audio('Flappy');
	};

	/**
	 * Resets the state of the Player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function() {
		$('.GameCanvas').click(function() {
			ISCLICKED = true;
		});

		if(Controls.keys.space) {
			this.pos.y -= 0.1*SPEED;
			ISCLICKED = false;
		}
		else if(ISCLICKED) {
			this.pos.y -= 1*SPEED;
			ISCLICKED = false;
		}
		else {
			this.pos.y += 0.06*SPEED;
		}
		
		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		//this.load.audio(Controls.keys.right, 'Flappy.mp3');

	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
