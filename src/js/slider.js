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
		image	 	: 'slider__image',
		carriage 	: 'slider__carriage',
		pip 		: 'slider__pip-item',
		pipActive 	: 'slider__pip--active'
	};

	// var setting = {
	// 	persent : 94
	// };

	function Slider()
	{
		var slider = $('.' + selector.slider);
		slider.each(init);
	};

	function init()
	{
		var module = this;
		setUp(module);
		events(module);
	};

	function setUp(module)
	{
		var slide = $(module).find('.' + selector.slide);
		slide.each(addIndex.bind(this));

		var pip = $(module).find('.' + selector.pip);
		pip.each(addIndex.bind(this));
	};

	function addIndex(index, element){
		$(element).data({
			index : index
		})
	};

	function events(module)
	{
		var slide = $(module).find('.' + selector.slide);
		slide.on('click', getIndex);

		var pip = $(module).find('.' + selector.pip);
		pip.on('click', getIndex);
	};

	function getIndex()
	{
		var index = $(this).data('index');
		goTo(index);
	};

	function goTo(index)
	{
		console.log(index);
	};

	Slider();

}(jQuery, window.pb = window.pb || {}));
