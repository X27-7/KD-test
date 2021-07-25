import axios from 'axios'
import router from "router";
import el from 'element-ui';

let http = axios.create({
    baseURL: '/api',
    // timeout: 1000 * 10,
    withCredentials: true
})

// axios请求拦截器  给请求头添加authorization属性
http.interceptors.request.use(config => {
    // console.log(config);
    let DX = localStorage.getItem('DX')
    let list = ['/users/login', '/users/getCaptcha', '/users/getScancode']

    let result = list.some(it => it == config.url)
    if (!result) {
        config.headers.authorization = DX
    }

    return config
})

// axios请求回来的数据判断其状态进行处理
http.interceptors.response.use(config => {
    // console.log(config);
    if (config.data.code === '1004' || config.data.code === '10022') {
        router.push('/login')
        el.Message.error('登录信息过期，请重新登录')
        localStorage.removeItem('DX')
    }

    return config
})






export default http