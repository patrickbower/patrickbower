'use strict';

/**
* Get the breakpoint set on :before of <body> by CSS.
*
* @return {string} Breakpoint value.
*/
export function breakpoint(){

    let breakpoint = {};
    breakpoint.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');

    return breakpoint;
};
