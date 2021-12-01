import axios from "axios";

export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })
    //1)请求拦截
    instance.interceptors.request.use(suc => {
        // console.log(suc);
        return suc
    }, err => {
        // console.log(err);
    })
    //2)响应拦截
    instance.interceptors.response.use(suc => {
        // console.log(suc);
        return suc.data
    },err => {
        // console.log(err);
    })
    return instance(config)

}
