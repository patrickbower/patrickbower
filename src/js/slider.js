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
		pipList 	: 'slider__pip-list',
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
		layoutSlides.call(module, slide);
		slide.each(addIndex.bind(this));

		layoutPips.call(module);
		var pip = $(module).find('.' + selector.pip);
		pip.each(addIndex.bind(this));
	};

	function layoutSlides(slide)
	{
		var module = $(this);

		var rail = module.find('.' + selector.rail)
		rail.css('width', 100 * slide.length + '%');

		var carriage = module.find('.' + selector.carriage);
		carriage.css('width', 100 / slide.length + '%');

		module.data('slideCount', slide.length);
	};

	function layoutPips()
	{
		var module = $(this);
		var pip = module.find('.' + selector.pip);
		var slideCount = module.data('slideCount');

		for (var pipCount = 0 ; pipCount < slideCount ; pipCount++ )
		{
			pip
				.clone()
				.insertBefore(pip)
				.find('.accessability')
				.text((pipCount + 1) + ' of ' + slideCount)
		}

		pip.last().remove();
	};

	function addIndex(index, element)
	{
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
