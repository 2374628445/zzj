/* eslint-disable no-constant-condition */
import axios, { AxiosResponse, AxiosError, Method, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
// import Agent require 'agentkeepalive';
import Agent from 'agentkeepalive';

import store from '../store';
class Exception extends Error {
    public code: string;
    public httpInfo: string;
    public reason: Record<string, string>;
    private status: number;
    constructor(error: HttpException) {
        super(error.message);
        this.code = error.code;
        this.httpInfo = error.httpInfo;
        this.status = error.status;
        this.reason = error.reason;
    }
}

class Request {
    private service: AxiosInstance;
    constructor() {
        this.service = this.getService();
    }
    private getService() {
        const service = axios.create({
            timeout: 10000,
            httpAgent: new Agent({
                keepAlive: true,
                timeout: 60000, // active socket keepalive for 60 seconds
                freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
                socketActiveTTL: 100
            })
        });

        // 请求拦截器
        service.interceptors.request.use(config => this.beforeSendToServer(config), this.beforeSendToServerButError);
        // 响应拦截器
        service.interceptors.response.use(this.receiveSuccessResponse, this.receiveResponseNotSuccess);
        return service;
    }

    private beforeSendToServer(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        config.headers['x-app'] = '1168443';
        const user = store.state;

        config.headers['x-user'] = '64dddbf6d6ec9238b84af377';
        config.headers['x-auth'] = 'RUfiGuc34CC5UdrZ3w7sqyDlAoU-wY6SsvgGeIcbi70';

        if (user.user.user?.id) {
            config.headers['x-user'] = user.user.user.id;
            // config.headers['x-user'] = '64cb7938f8f168bfcbf4b9c7';
        }
        if (user.user.token) {
            config.headers['x-auth'] = user.user.token;
            // config.headers['x-auth'] = 'dfsNohmgFGdCSWwwOuJxyaEQAp2nTpd';
        }

        if (sessionStorage.getItem('companyId')){
            // eslint-disable-next-line no-undef
            config.headers['x-company'] = window.sessionStorage.getItem('companyId');
        // config.headers['x-company'] = '64d5b6138de767bf701e4b35';
        // config.headers['x-company'] = '64d5de4a5fcf9a05cd1fa919';
        }

        // if (user.user.company) {
        //     // config.headers['x-auth'] = user.user.token;
        //     config.headers['x-company'] = user.user.company;
        //     // config.headers['x-auth'] = 'dfsNohmgFGdCSWwwOuJxyaEQAp2nTpd';
        // }

        // if (user.user?.company) {
        //     config.headers['x-company'] = user.user.company;
        // }

        return config;
    }

    private async beforeSendToServerButError(error: unknown): Promise<HttpException> {
        return Promise.reject(
            new Exception({
                code: '',
                httpInfo: `${error}`,
                message: 'error, request is not sent',
                reason: {},
                status: 0,
                source: []
            })
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async receiveSuccessResponse(response: AxiosResponse): Promise<any> {
        // 这里只处理 response.status >= 200 && response.status <= 207 的情况
        const { data /*, config, headers, request, status, statusText*/ } = response;

        return Promise.resolve(data);
    }

    private async receiveResponseNotSuccess(error: AxiosError): Promise<HttpException> {
        // const { message, name, description, number, fileName, lineNumber, columnNumber, stack, code } = error.toJSON();
        const { response, config, request: { responseURL } } = error;
        // const { url, baseURL, method } = config;

        let errorResult: HttpException = {
            code: 'INTERNAL_SERVER_ERROR',
            status: 500,
            httpInfo: ` 访问 ${config ? config.baseURL : responseURL} 失败`,
            message: '',
            reason: {},
            source: []
        };

        if (response) {
            const { status, statusText, data } = response;

            errorResult = {
                status,
                httpInfo: statusText,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ...typeof data === 'string' ? { message: data } : data
            };
        }

        return Promise.reject(new Exception(errorResult));
    }

    public async send(url: string, method: Method, options?: HttpArgument): Promise<AxiosResponse> {
        return await this.service.request({
            url,
            method,
            // baseURL: ['development', undefined].includes(process?.env?.NODE_ENV) ? undefined : 'https://xxx.xxx.cxx',
            headers: options?.headers || {},
            params: { ...options?.params },
            data: typeof options?.data === 'object' && !Array.isArray(options.data) ? { ...options.data } : options?.data
        });
    }
}

export const HTTP = new Request();
