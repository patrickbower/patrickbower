# JS Techniques
Named paramtres
var params = { length, width = 5, height = 5, depth };

function hello({ length, width = 5, height = 5, depth })
{
 return length + width + height + depth;
}

hello({ length: 6, width: 10 });

hello();

properties - belong to something
parameters - var refreeces used to get arguments


function hello(/* parameters */ param1, param2) {

  /* properties */
  this.param1 = param1;
};

hello(/* arguments */ 5, 10);
