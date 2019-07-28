// for (var i=1; i<=5; i++) {
//     (function(j) {
//         setTimeout( function timer() {
//             console.log(j);
//          }, j*1000 );
//     })(i)
//  }

// for (var i=1; i <= 5; i++) {
//     setTimeout( function timer(j) {
//         console.log(j);
//         }, i*1000, i);
//  }

// for (var i=1; i <= 5; i++) {
//     output(i)
//  }

//  function output(j) {
//     setTimeout( function timer() {
//         console.log(j);
//     }, j * 1000)
//  }

// function output(j) {
//     return new Promise((resolve) => {
//         setTimeout(function timer() {
//             console.log(j)
//             resolve(j+1)
//         }, 1000)
//     })
// }

// output(1)
// .then((item) => {
//     return output(item)
// })
// .then((item) => {
//     return output(item)
// })
// .then((item) => {
//     return output(item)
// })
// .then((item) => {
//     return output(item)
// })


function output(j) {
    return new Promise((resolve) => {
        setTimeout(function timer() {
            console.log(j)
            resolve(j)
        }, 1000)
    })
}
async function test () {
    for (let i = 1; i <= 5; i++) {
        await output(i)
    }
}
test()


