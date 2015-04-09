
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		var xpipe = 100;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe1 = new window.Pipes(this.el.find('.Obstacle1'), this, xpipe, 0);
		this.pipe2 = new window.Pipes(this.el.find('.Obstacle2'), this, xpipe+35, 0);
		this.pipe3 = new window.Pipes(this.el.find('.Obstacle3'), this, xpipe+70, 0);
		this.score = 0;
		this.isPlaying = false;

		//scale
		var fontSize = Math.min(
			window.innerWidth / Game.prototype.WORLD_WIDTH,
			window.innerHeight / Game.prototype.WORLD_HEIGHT
		);
		el.css('fontSize', fontSize + 'px');

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	
		/*Game.prototype.preload = function(){
			Game.load.audio('jump', 'assets/Flappy.mp3');
		};*/
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
		this.score = 0;
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		$('.Scoreboard-score').html(this.score);
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


