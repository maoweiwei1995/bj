function request(obj) {
    //创建iframe
    let iframe = document.createElement('iframe')
    iframe.name = 'jsonIframe'
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    iframe.addEventListner('load', function(){
        console.log('success')
    })


    // 1创建form
    let form = document.createElement('form')
    // 2
    form.target = iframe.name
    //3
    form.method = 'post'
    //4
    form.url = obj.url
    //5
    form.style.display = 'none'
    //6 参数
    const data = obj.data
    let node = document.createElement('input')
    for (let key in data) {
        node.name = key
        node.value = data[key]
        form.appendChild(node.cloneNode())
    }
    // 7挂载
    document.body.appendChild(form)
    // 8请求
    form.submit()
    // 9卸载
    document.body.removeChild(form)

}

request({
    url: 'www.baidu.com',
    data:{
        msg: 'hello world'
    }
})