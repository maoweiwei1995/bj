/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise((resolve)=> {
        setTimeout(()=> resolve(n+200), n)
    })
}
function step1(n) {
    console.log(`step1 takes ${n}s`)
    return takeLongTime(n)
}
function step2(m, n) {
    console.log(`step2 takes ${m} and ${n}s`)
    return takeLongTime(m + n)
}
function step3(k, m, n) {
    console.log(`step3 takes ${k} and ${m} and${n}s`)
    return takeLongTime(k + m + n)
}

// function doIt() {
//     console.time("doIt");
//     const time1 = 300;
//     step1(time1)
//         .then(time2 => step2(time2))
//         .then(time3 => step3(time3))
//         .then(result => {
//             console.log(`result is ${result}`);
//             console.timeEnd("doIt");
//         });
// }
// doIt();
// async function doIt() {
//     console.time('doIt')
//     const time1 = 300
//     const time2 = await step1(time1)
//     const time3 = await step2(time2)
//     const result = await step3(time3)
//     console.log('result:', result)
//     console.timeEnd('doIt')
// }
// doIt()

// async function doIt() {
//     console.time('doIt')
//     const time1 = 300
//     const time2 = await step1(time1)
//     const time3 = await step2(time1, time2)
//     const result = await step3(time1, time2, time3)
//     console.log('result:', result)
//     console.timeEnd('doIt')
// }
// doIt()
function doIt() {
    console.time('doIt')
    const time1 = 300
    step1(time1)
    .then(time2 => {
        return step2(time1, time2)
        .then(time3 => [time1, time2, time3])
    })
    .then(times=> {
        const [time1, time2, time3] = times
        return step3(time1, time2, time3)
    })
    .then(result => {
        console.log(`result is ${result}`)
        console.timeEnd('doIt')
    })
}
doIt()