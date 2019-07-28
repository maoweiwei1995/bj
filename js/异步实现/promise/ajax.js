// 一个promise结合ajax的例子
function getJson(url) {
    return new Promise(function(resolve, reject) {
        let xhr = window.XMLHttpRequest? new XMLHttpRequest(): new ActiveXObject('Microsoft.XMLHTTP')
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300)| xhr.status == 304) {
                    resolve(xhr.responseText)
                } else {
                    reject(new Error(xhr.statusText))
                }
            } else {
                return 
            }
        }
        xhr.open('get', url, true)
        xhr.send(null)
    })
}
let p = getJson('www.baidu.com')
p.then(function(text){
    return JSON.parse(text)
})
.then(function(obj){
    console.log(obj.value)
})
.catch(function(err){
    console.log(err.message)
})