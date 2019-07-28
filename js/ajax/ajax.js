// // 1.创建一个xhr 对象
// let xhr = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject('Microsoft.XMLHTTP')
// // 2.为状态改变事件绑定handler
// xhr.onreadystatechange = function(){
//     if (xhr.readyState == 4){
//         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//             console.log(xhr.responseText)
//         } else {
//             console.log('not successful', xhr.status)
//         }
//     }
// }
// xhr.open('get', 'e.php?a1=a&a1=b', true)
// xhr.setRequestHeader('MyHeader', 'myvalue')
// xhr.send(null)

// 封装一个ajax
//opt.data = {key:value,key:value}
//opt.url = 'www.baidu.com'
//opt.type = 'get'
//opt.success = function(data){
//opt.error = function(data){}

let $.ajax = function (opts) {
    //1.创建xhr对象
    let xhr = window.XMLHttpRequest? new window.XMLHttpRequest(): new ActiveXObject('Microsoft.XMLHttp')
    //2.绑定状态变更事件
    xhr.onreadystatechange = function () {
        if (xhr.readyStatus == 4) {
            if ((xhr.status >=200 && xhr.status < 300) || xhr.status == 304) {
                opts.success(JSON.parse(xhr.responseText))
            } else {
                opts.error()
            }
        }
    }
    //3.获取 url 和参数
    let url = opts.url
    let params = getParams(opts.data)
    //4.根据请求方式不同，发送请求
    if (opts.method.toLowerCase() === 'get') {
        xhr.open('get', url+'?'+params, true)
        xhr.send(null)
    } else {
        xhr.open('post', url, true)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.send(params)
    }
}
function getParams(data) {
    if (data.length == 0) {
        return ""
    }
    let arr = []
    for (let i of data) {
        arr.push(i+'='+data[i])
    }
    return arr.join('&')
}

