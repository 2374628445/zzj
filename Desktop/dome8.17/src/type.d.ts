declare interface HttpArgument {
    params?: Record<string, any>;// eslint-disable-line @typescript-eslint/no-explicit-any
    data?: Record<string, unknown>;
    headers?: Record<string, string | string[] | undefined>;
}

declare interface ExceptionInstance {
    info: string;
    [key: string]: unknown;
}

declare interface HttpException {
    code: string
    httpInfo: string
    message: string
    reason: Record<string, string>
    status: number;
    source: Array<string>
}

declare interface ApiResult {
    data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    error?: HttpException;
}

declare interface ResourceModel {
    _id: string
    /** 资源的链接 */
    data: string
    appId: string
    userId: string | null
    companyId: string | null
    status: 'active' | 'disabled'
    review: boolean
    type: string
    detailType: string
    attribute: {
        /** 型号 */
        mark: string
        /** 名称 */
        name: string
    }
    createdAt: Date
    updatedAt: Date
    /** 前端界面使用 */
    _status: string
}
