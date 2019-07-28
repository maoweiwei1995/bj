var fs = require('fs'); // 引入fs模块
 
// 写入文件内容（如果文件不存在会创建一个文件）
// 传递了追加参数 { 'flag': 'a' }
let data = createfft(2)
fs.writeFile('./fft.txt', data, function(err) {
    if (err) {
        throw err;
    }
    console.log('success');
 
    // 写入成功后读取测试
    fs.readFile('./fft.txt', 'utf-8', function(err, data) {
        if (err) {
            throw err;
        }
        console.log(data);
    });
});

function createfft(n, num = 512) {
    let result = ''
    for (let i = 1; i <= num; i++) {
        result += Math.sin(n * (2 * Math.PI) * (i / 512)).toFixed(4) + ' '
    }
    return result
}