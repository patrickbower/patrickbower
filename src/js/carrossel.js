/**
* @name parallax scroll
* @author pb
*
*
*
*/

(function ($, pb) {
	'use strict';

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
