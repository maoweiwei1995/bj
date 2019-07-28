function request(obj) {
    return new Promise(function(resolve, reject){
        const url = obj.url
        const data = obj.data
        // 把参数处理成 A=B&C=D形式
        const handleDate = (data) => {
            const keys = Object.keys(data)
            const len = keys.length
            const result = keys.reduce((pre, cur, index) => {
                const value = data[cur]
                const flag = len - 1 == index ? '': '&'
                return `${pre}${cur}=${value}${flag}`
            })
        }
        // 核心语句
        let script = document.createElement('script')
        script.src = `${url}?${handleData(data)}cb=jsoncb`
        document.appendChild(script)

        window.jsoncb = function(res) {
            // 卸载标签
            document.body.removeChild(script)
            // 卸载回调函数
            delete window.jsoncb
            resolve(res)
        }
    })
}




request({
    url: 'www.baidu.com:9900',
    data: {
        msg: 'hello world'
    }
}).then(function(msg){
    console.log(msg)
})