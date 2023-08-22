import { ElMessage, ElMessageBox, ElLoading, ElNotification, ElMessageBoxOptions, MessageBoxData, LoadingOptions, NotificationParams } from 'element-plus';

class UITool {
    private allNoticing: Set<() => void>;

    constructor() {
        this.allNoticing = new Set();
    }

    public success(message: string): void {
        ElMessage({
            showClose: true,
            message: message,
            type: 'success'
        });
    }

    public error(message: string): void {
        ElMessage({
            showClose: true,
            message: message,
            type: 'error'
        });
    }
    public warn(message: string): void {
        ElMessage({
            showClose: true,
            message: message,
            type: 'warning'
        });
    }

    public async alert(message: string, title?: string, option?: ElMessageBoxOptions): Promise<true> {
        return await ElMessageBox.alert(message, title || '', {
            ...option,
            confirmButtonText: option?.confirmButtonText || 'yes',
            type: option?.type || 'info',
            showClose: false,
            showCancelButton: false,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            showInput: false
        }).then(() => true);
    }

    public async confirm(message: string, title?: string, option?: ElMessageBoxOptions): Promise<boolean> {
        return await ElMessageBox.alert(message, title || '', {
            ...option,
            confirmButtonText: option?.confirmButtonText || 'yes',
            cancelButtonText: option?.cancelButtonText || 'cancel',
            type: option?.type || 'info',
            showClose: false,
            showCancelButton: true,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            showInput: false
        }).then(() => true).catch(() => false);
    }

    public async prompt(message: string, title: string, option?: ElMessageBoxOptions): Promise<string | false> {
        return await ElMessageBox.alert(message, title, {
            ...option,
            confirmButtonText: option?.confirmButtonText || 'yes',
            cancelButtonText: option?.cancelButtonText || 'cancel',
            type: 'info',
            showClose: false,
            showCancelButton: true,
            closeOnClickModal: false,
            closeOnPressEscape: false,
            showInput: true,
            inputErrorMessage: option?.inputErrorMessage || 'it_is_illegal'
        }).then((data: MessageBoxData) => {
            if (data.action === 'cancel' || data.action === 'close' || data.action === 'confirm') {
                return false;
            } else {
                return data.value;
            }
        }).catch(() => false);
    }

    public loading(option?: LoadingOptions, text?: string) {
        return ElLoading.service({
            ...option,
            text: text || ''
        });
    }

    public noticing(title: string, message: string, option?: NotificationParams) {
        const noticing = ElNotification({
            ...option as Record<string, unknown>,
            title,
            message
        });

        this.allNoticing.add(noticing.close);
        return noticing;
    }

    public noticed(title: string, message: string, option?: NotificationParams) {
        const noticed = ElNotification({
            ...option as Record<string, unknown>,
            title,
            message
        });

        this.allNoticing.add(noticed.close);
        return noticed;
    }

    public closeAllNotice(): void {
        this.allNoticing.forEach(a => a());
    }
}

export default new UITool();
