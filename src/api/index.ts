import { HTTP } from './http';
import { ResponseType } from 'axios';
class Base {
    public errorHandle(error: HttpException): Promise<ApiResult> {
        return Promise.resolve({ error });
    }

    public successHandle(data: unknown): Promise<ApiResult> {
        return Promise.resolve({ data });
    }
}


class Balance extends Base {
    constructor() {
        super();
    }
    //+获取用户应用余额
    public async getUserBalance() {
        return HTTP.send('/api/cemeta/balancemanager/v1/balance', 'get').then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //+使用兑换码
    public async exchangeNum(code: string) {
        return HTTP.send('/api/cemeta/balancemanager/v1/ticket/exchange', 'post', { data: { code } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
}

class File extends Base {
    constructor() {
        super();
    }
    //+文件下载
    public async downLoad(type: string, url: string) {
        return HTTP.send('/api/cemeta/aimanager/v1/file/download', 'get', { params: { type, url } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //+文件导出
    public async exporyFile(content: string, title: string) {
        return HTTP.send('/api/cemeta/aimanager/v1/file/export/word', 'get', { params: { content, title } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
}

class Resources extends Base {
    constructor() {
        super();
    }
    //+用户上传ai资源
    public async upLoadAi(type: string, productName: string, sellingpoint: any) {
        return HTTP.send('/api/cemeta/aimanager/v1/resource', 'post', { data: { type, productName, sellingpoint } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    // //+修改ai资源
    public async upDataAi(data: { resourceId?: string, productName?: string, sellingpoint?: Array<string>, video?: Array<string>, sort?:any} ) {
        return HTTP.send('/api/cemeta/aimanager/v1/resource', 'put', { data: data }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    // //+删除ai资源
    public async deleteAi(resourceId: string ) {
        return HTTP.send(`/api/cemeta/aimanager/v1/resource/${resourceId}`, 'delete' ).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
}

class Article extends Base {
    constructor() {
        super();
    }
    //+ 保存生成文案的参数
    public async generateparams(type: string, params: object, id?: string) {
        return HTTP.send('/api/cemeta/aimanager/v1/article/generateparams', 'post', { data: { id, type, params } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //+ 删除生成文案的参数
    public async deleteparams(id: string) {
        return HTTP.send('/api/cemeta/aimanager/v1/article/generateparams', 'delete', { data: { id } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }

    // //+ 获取生成文案的参数
    // public async getTextValue(askId: string) {
    //     return HTTP.send(`/api/cemeta/aimanager/v1/article/${askId}/answer`, 'get').then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    // }

    //+ 获取文案生成结果
    public async getTextValue(askId: string) {
        return HTTP.send(`/api/cemeta/aimanager/v1/article/${askId}/answer`, 'get').then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }

    //+生成文案ask
    public async upLoadAi(
        type: string,
        videoId: string
    ) {
        return HTTP.send('/api/cemeta/aimanager/v1/article/ask', 'post', {
            data: {
                type,
                payload: { videoId }
            }
        }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
}
//!video
class Video extends Base {
    constructor() {
        super();
    }
    //+查询视频
    public async getVideo(params: { resourceId: number, type: string, deadline?: string, count?: number }) {
        return HTTP.send('/api/cemeta/aimanager/v1/video', 'get', { params}).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //+生成视频
    public async createVideo(resourceId: string, count: number) {
        // return HTTP.send('/api/cemeta/aimanager/v1/video/generate', 'post', { data: { resourceId, count } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
        return HTTP.send('/api/cemeta/aimanager/v1/video/generate', 'post', { data: { resourceId, count } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }

    // //+视频生成结果下载
    // public async videoDown(videoId: Array<object>, type: string) {

    //     return HTTP.send('/api/cemeta/aimanager/v1/video/result/download', 'get', { params: { videoId, type } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    // }
    // //+视频生成结果下载
    // public async videoDown(videoId: Array<string>, type: string, responseType: ResponseType) {

    //     return HTTP.send('/api/cemeta/aimanager/v1/video/result/download', 'get',
    //         { params: { videoId, type, responseType } }).then(
    //         r => {

    //             this.successHandle(r);
    //             const contentDisposition = r.headers['content-disposition'];
    //             const filenameMatch = contentDisposition.match(/filename="(.+)"/);
    //             let filename = 'downloaded-file';

    //             if (filenameMatch && filenameMatch.length > 1) {
    //                 filename = filenameMatch[1];
    //             }
    //             return filename;
    //         }

    //     ).catch(e => this.errorHandle(e));
    // }

    //+用户查看ai资源
    public async lookAilist(type: string, resourceId?: string, senceId?: string) {
        return HTTP.send('/api/cemeta/aimanager/v1/resource', 'get', { params: { type, resourceId, senceId } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }

}

class Applications extends Base {
    constructor() {
        super();
    }
    //获取应用是否可用
    public async getList() {
        return HTTP.send('/api/cemetapub/application/v1/app',
            'get').then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //获取登陆方式
    public async getLoginList(phone: string) {
        return HTTP.send(
            '/api/cemetapub/usermanager/v1/account/login',
            'get', { params: { account: phone } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //登陆接口
    public async login(type: 'code' | 'resume', payload: { phone?: string, code?: string, companyId?: string, }) {
        return HTTP.send('/api/cemetapub/usermanager/v1/account/login',
            'post', { data: { type, payload } })
            .then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }

    //发送短信验证码
    public async getmessCode(phone: string, type: string) {
        return HTTP.send(`/api/cemetapub/message/v1/phone/${phone}/code?type=${type}`, 'get').then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //查询应用列表adm
    public async getShopList() {
        return HTTP.send('/api/cemetaadm/application/v1/app', 'get').then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //查询应用是否可用
    public async searchAppIsok() {
        return HTTP.send('/api/cemetapub/application/v1/app', 'get').then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //查询应用是否可用mrg
    public async searchAppIsokmrg(appId: string) {
        return HTTP.send('/api/cemetamgr/application/v1/app/status', 'get', { params: { appId: appId } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }
    //获取应用列表
    public async getUserList(appId: string, payload: { skip?: string, limit?: string, hasAuth?: string }) {
        return HTTP.send('/api/cemetamgr/application/v1/app/status', 'get', { params: { appId, payload } }).then(r => this.successHandle(r)).catch(e => this.errorHandle(e));
    }

}

export default {
    Resource: new Resources(),
    Application: new Applications(),
    Video: new Video(),
    Article: new Article(),
    File: new File(),
    Balance: new Balance()
};
