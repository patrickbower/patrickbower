/**
* @name parallax scroll
* @author pb
*
*
*
*/

(function ($, pb) {
	'use strict';

	$(document).click(function(event){
		console.log(event.target);
	});

	var selectors = {
		carrossel : 'carrossel'
	};

	function Carrossel(module)
	{
        console.log(module);
	};

	function SetUp()
	{

	};

	function Events()
	{

	};

	var carrossel = $('.' + selectors.carrossel);
	var parallaxLine = new Carrossel(carrossel);

	// pb.carrossel = {
	// 	Carrossel : Carrossel
	// };

}(jQuery, window.pb = window.pb || {}));
