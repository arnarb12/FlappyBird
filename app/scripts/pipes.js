window.Pipes = (function() {
	'use strict';

	var INITIAL_POSITION_X = 100;
	var INITIAL_POSITION_Y = 0;

	var Pipes = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Pipes.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Pipes.prototype.onFrame = function() {
		if(this.pos.x < 0) {
			this.reset();
			this.el.css('height(5em)');
		}
		else {
			this.pos.x -=  0.3;
		}

		//this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

				
		//37.6 is max height for a pipe
		/*var pipe1 = this.el.find('.Obstacle-pipe1');
		var pipe2 = this.el.find('.Obstacle-pipe2');
		var newHeightUp =(Math.random()*100) + 20;
		var newHeightLow = 200-newHeightUp;

		console.log(newHeightUp);
		pipe1.height(newHeightUp);
		pipe2.top(newHeightLow);*/
	};

	/*Pipes.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};*/

	return Pipes;

})();