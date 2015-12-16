'use strict';

// use body for onload context
var context = $('body');
// run onload
init(context);

function init(context)
{
    // loop over context, for each data-init
    $('[data-init]', context).each(function(index){

        // get script (module) name
        var script = $(this).data('init');
        // set conetext
        var context = $(this);
        // run init for script (module)
        pb[script].init(context);
    });
};
