
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe1 = new window.Pipes(this.el.find('.Obstacle1'), this);
		this.pipe2 = new window.Pipes(this.el.find('.Obstacle2'), this);
		this.pipe3 = new window.Pipes(this.el.find('.Obstacle3'), this);
		this.isPlaying = false;

		//scale
		var fontSize = Math.min(
			window.innerWidth / Game.prototype.WORLD_WIDTH,
			window.innerHeight / Game.prototype.WORLD_HEIGHT
		);
		el.css('fontSize', fontSize + 'px');

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	

		Game.prototype.preload = function(){
		Game.load.audio('jump', 'assets/Flappy.mp3');

	};

	};


	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe1.onFrame();
		this.pipe2.onFrame();
		this.pipe3.onFrame();

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);

		/*var cloud = this.el.find('.Cloud');
		cloud.style.top = -(window.pageOffset / 4)+'px';*/

		//Code that changes the height of the pipes with random numbers
		//need to change the top and height(not finished) of the lower pipe
		//Need to call this each time the pipes go through the canvas

		/*var pipes1 = this.el.find('.Obstacle-pipes1');
		var pipe1Low = this.el.find('.Obstacle-pipe1Low');

		var newHeightUp =(Math.random()*100) + 20;
		var num = 100-newHeightUp;
		var newHeightLow  = num.toString();
		
		pipes1.height(newHeightUp);
		document.getElementById('Obstacle-pipe1Low').style.top = (newHeightLow + 'em');
		*/
		
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe1.reset();
		this.pipe2.reset();
		this.pipe3.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


