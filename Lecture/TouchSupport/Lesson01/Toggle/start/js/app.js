/*
Write your code in the attachEventListeners() function defintion, which starts on line 89.
 */

(function() {
	/*
	The actual grey box your finger touches.
	 */
	var toggle = document.querySelector('#toggle');
	/*
	The line that the toggle slides over.
	 */
	var line = document.querySelector('#line');
	/**
	 * Keeps track of touches and determines where the toggle should be on the slider.
	 * @param {DOM node} toggle - The actual toggle that will be moving.
	 * @param {DOM node} line - The actual line that the toggle slides over.
	 */
	function ToggleTracker (toggle, line) {
		var toggleRect = toggle.getBoundingClientRect(),
				lineRect = line.getBoundingClientRect();

		this._max = lineRect.width - toggleRect.width;
		this._half = this._max / 2;
		this._touchOffset = 0;
	}

	ToggleTracker.prototype = {
		_touches: [],
		/**
		 * Call this to register a movement.
		 * @param {Number} posX - The current x-position of the finger/mouse.
		 */
		addMovement: function (posX) {
			this._touches[0] = this._touches[1] || posX;
			this._touches[1] = posX;
		},
		/*
		Call this to get the toggle's distance from the origin for
		the CSS property: transform: translateX()
		 */
		getTranslateX: function () {
			/*
			How far the finger actually moved
			 */
			var dx = this._touches[1] - this._touches[0];

			/*
			transform: translateX() works by translating from a starting point. The idea is to
			sum every dx to find the current distance from the origin.
			 */
			this._touchOffset = this._touchOffset + dx;

			/*
			I don't want to overwrite _touchOffset as it needs to stay constant between touches.
			 */
			var reportedValue = this._touchOffset;

			/*
			Make sure the toggle doesn't slide off the slider!
			 */
			if (reportedValue < 0) {
				reportedValue = 0;
			} else if (reportedValue > this._max) {
				reportedValue = this._max;
			}

			return reportedValue;
		}
	};

	/*
	You could create multiple ToggleTrackers for multiple toggles.
	 */
	var toggleTracker = new ToggleTracker(toggle, line);

	/*
	Meant to be called by requestAnimationFrame for silky smooth 60fps performance.
	#perfmatters - https://www.udacity.com/course/browser-rendering-optimization--ud860
	 */
	var frame;
	function slide(){
		var translateX = toggleTracker.getTranslateX();
		toggle.style.webkitTransform = "translateX(" + translateX + "px)";
		toggle.style.transform = "translateX(" + translateX + "px)";
	}

	function attachEventListeners() {
		 toggle.addEventListener('touchstart', function(e){
			 sliding = true;
			 toggleTracker.addMovement(e.touches[0].pageX);
		 });

		 window.addEventListener('touchmove', function(e){
			 if(sliding){
				 toggleTracker.addMovement(e.touches[0].pageX);
				 requestAnimationFrame(slide);
			 }
		 });

		 window.addEventListener('touchend', function(){
			 sliding = false;
		 });
	}

	/*
	Attaches all the event listeners when the page's content is ready.
	 */
	document.addEventListener("DOMContentLoaded", function(event) {
  	/*
		Flag to indicate whether the toggle is in the process of sliding.
		 */
		var sliding = false;
    attachEventListeners(sliding);
  });
})();
