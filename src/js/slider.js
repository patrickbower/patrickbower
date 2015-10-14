/**
* @name slider
* @author pb
*
*
*
*/

(function ($, pb) {
	'use strict';

	var selector = {
		slider 		: 'slider',
		rail 		: 'slider__rail',
		slide	 	: 'slider__slide',
		pip 		: 'slider__pip-item',
		pipActive 	: 'slider__pip--active'
	};

	function Slider(module)
	{
		this.module = module;
		setUp.call(this);
		events.call(this);
	};

	function setUp()
	{
		this.slide = $(this.module).find('.' + selector.slide).map(function(){
			return this;
		});

		// console.log(this.slide);

		this.pip = $(this.module).find('.' + selector.pip).map(function(){
			return this;
		});
	};

	function events()
	{
		// click slide
		$('.' + selector.slide).on('click', function(){
			// goTo.call(this);
			console.log(this);
		});
	};

	function goTo()
	{
		// console.log(this);
	};

	var module = $('.' + selector.slider);
	var slider = new Slider(module);

	// pb.slider = {
	// 	slider : slider
	// };

}(jQuery, window.pb = window.pb || {}));
