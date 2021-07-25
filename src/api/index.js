import axios from './config'

export const loginApi = (username, password) => axios.post('/users/login', {
    username,
    password
})

export const getCaptcha = () => axios.get('/users/getCaptcha')

export const verifyCaptcha = (captcha) => axios.get('/users/verifyCaptcha', {
    params: {
        captcha
    }
})

export const getScancode = () => axios.get('/users/getScancode')

export const WeChatLogin = (wechatCode) => axios.get('/users/wechatLogin', {
    params: {
        wechatCode
    }
})

export const getloginlog = (page = 1, count = 10) => axios.get('/getloginlog', {
    params: {
        page,
        count
    }
})

export const getMenuList = () => axios.get('/permission/getMenuList')