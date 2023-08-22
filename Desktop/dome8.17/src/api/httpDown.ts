
import axios from "axios";
import store from '../store';

const request = axios.create({
    responseType: 'arraybuffer'
});
// 添加请求拦截器

request.interceptors.request.use(function (config) {
    config.headers['x-app'] = '1168443';
    const user = store.state;

    if (user.user.user?.id) {
        config.headers['x-user'] = user.user.user.id;
        // config.headers['x-user'] = '64cb7938f8f168bfcbf4b9c7';
    }
    if (user.user.token) {
        config.headers['x-auth'] = user.user.token;
        // config.headers['x-auth'] = 'dfsNohmgFGdCSWwwOuJxyaEQAp2nTpd';
    }

    if (sessionStorage.getItem('companyId')) {
        config.headers['x-company'] = window.sessionStorage.getItem('companyId');
        // config.headers['x-company'] = '64d5b6138de767bf701e4b35';
        // config.headers['x-company'] = '64d5de4a5fcf9a05cd1fa919';
    }

    // config.headers['x-user'] = '64dddbf6d6ec9238b84af377';
    // config.headers['x-auth'] = 'RUfiGuc34CC5UdrZ3w7sqyDlAoU-wY6SsvgGeIcbi70';
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default request;