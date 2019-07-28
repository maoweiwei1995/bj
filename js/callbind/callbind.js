var fnc = function(a, b, c){
    console.log(a, b, c);
}
fnc.call(null,'a');
var fn = fnc.bind(null,'A');
fn('B','C');