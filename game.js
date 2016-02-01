(function() {
	var Game = function(canvasId) {
		var canvas = document.getElementById(canvasId);
		//var screen = canvas.getContext('2d');
		var gameSize = { x: canvas.width, y: canvas.height };
		this.gl = initWebGL(canvas);

		this.bodies = [new Player(this, gameSize)];

		var self = this;
		var tick = function() {
			self.update();
			self.draw(screen, gameSize);
			requestAnimationFrame(tick);
		};

		tick();
	};

	Game.prototype = {
		update: function() {
			for (var i = 0; i < this.bodies.length; i++) {
				this.bodies[i].update();
			}
		},

		draw: function(screen, gameSize) {
			//screen.fillRect(30, 30, 40, 40);
			//screen.clearRect(0, 0, gameSize.x, gameSize.y);
			//for (var i = 0; i < this.bodies.length; i++) {
			//	drawRect(screen, this.bodies[i]);
			//}
			this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
			this.gl.enable(this.gl.DEPTH_TEST);
			this.gl.depthFunc(this.gl.LEQUAL);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		},

		addBody: function(body) {
			this.bodies.push(body);
		}
	};

	var Player = function(game, gameSize) {
		this.game = game;
		this.size = { x: 15, y: 15 };
		this.center = { x: gameSize.x /2, y: gameSize.y - this.size.x };
		this.keyboader = new Keyboarder();
	};

	Player.prototype = {
		update: function() {
			if (this.keyboader.isDown(this.keyboader.KEYS.LEFT)) {
				this.center.x -= 2;
			} else if (this.keyboader.isDown(this.keyboader.KEYS.RIGHT)) {
				this.center.x += 2;
			}

			if (this.keyboader.isDown(this.keyboader.KEYS.SPACE)) {
				var bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.x / 2})
			}
		}
	};

	var Bullet = function(game, gameSize) {
		this.game = game;
		this.size = { x: 15, y: 15 };
		this.center = { x: gameSize.x /2, y: gameSize.y - this.size.x };
		this.keyboader = new Keyboarder();
	};

	Player.prototype = {
		update: function() {
			if (this.keyboader.isDown(this.keyboader.KEYS.LEFT)) {
				this.center.x -= 2;
			} else if (this.keyboader.isDown(this.keyboader.KEYS.RIGHT)) {
				this.center.x += 2;
			}

			if (this.keyboader.isDown(this.keyboader.KEYS.SPACE)) {
				var bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.x / 2})
			}
		}
	};

	var drawRect = function(screen, body) {
		screen.fillRect(body.center.x - body.size.x / 2,
						body.center.y - body.size.y / 2,
						body.size.x, body.size.y)
	};

	var Keyboarder = function() {
		var keyState = {};

		window.onkeydown = function(e) {
			keyState[e.keyCode] = true;
		};

		window.onkeyup = function(e) {
			keyState[e.keyCode] = false;
		};

		this.isDown = function(keyCode) {
			return keyState[keyCode];
		}

		this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
	};

	var initWebGL = function(canvas) {
		var gl = null;
		try {
			gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		} catch(e) {
			console.log(e);
		}

		if (!gl) {
			console.log("No WebGL context!");
		}

		return gl;
	};

	window.onload = function() {
		new Game("screen");
	};
})();
