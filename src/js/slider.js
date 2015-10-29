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
		slider 			: 'slider',
		rail 			: 'slider__rail',
		slide	 		: 'slider__slide',
		carriage 		: 'slider__carriage',
		carriageActive 	: 'slider__carriage--active',
		pipList 		: 'slider__pip-list',
		pip 			: 'slider__pip-item',
		pipActive 		: 'slider__pip-item--active'
	};

	var setting = {
		percent : 94,
		optimised : 3
	};

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

		goToSlide.call(module, 0);
		goToPip.call(module, 0);
	};

	function setUp(module)
	{
		var slide = $(module).find('.' + selector.slide);
		$(module).data('slideCount', slide.length);

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
		rail.css('width', (100 * slide.length) + '%');

		var carriage = module.find('.' + selector.carriage);
		carriage.css('width', (100 / slide.length) + '%');

		var carriageCalc = (3 / module.data('slideCount')) * -1 ;
		carriage.css('margin', '0% ' + (carriageCalc + '%'));
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
				.text((pipCount + 1) + ' of ' + slideCount);
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
		var module = $(module);

		var slide = module.find('.' + selector.slide);
		var pip = module.find('.' + selector.pip);

		var eventHandler = $.merge(slide, pip);

		eventHandler.on('click', function(){
			var index = $(this).data('index');
			slideSlider(module, index);
		});

	};

	function slideSlider(module, index)
	{
		goToSlide.call(module, index);
		goToPip.call(module, index);
	};

	function goToSlide(index)
	{
		var module = $(this);

		var calc = (setting.percent * index) * -1;
		var rail = module.find('.' + selector.rail);

		rail.css('margin-left', calc + '%');

		var carriage = module.find('.' + selector.carriage);
		carriage.removeClass(selector.carriageActive);
		carriage.eq(index).addClass(selector.carriageActive);
	};

	function goToPip(index)
	{
		var module = $(this);

		var pip = module.find('.' + selector.pip);
		pip.removeClass(selector.pipActive);
		pip.eq(index).addClass(selector.pipActive);
	};

	Slider();

}(jQuery, window.pb = window.pb || {}));
