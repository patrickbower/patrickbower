'use strict';

// use body for initial context
var context = $('body');
// run onload
init(context);

function init(context)
{
    // loop over context looking for data-init attributes
    $('[data-init]', context).each(function(index){

        // get script name from data attribute
        var script = $(this).data('init');
        // set context
        var module = $(this);
        // run init for script passing in the context
        pb[script].init(module);
    });
};
