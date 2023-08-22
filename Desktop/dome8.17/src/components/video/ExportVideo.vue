<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="exportBox">
        <el-dialog v-model="props.exchange" @close="closeFn">
            <div class="videoBox">
                <video class="videoP" controls :src="videoUser.result?.video">
                </video>
            </div>
            <div v-show="textShowBtn" class="valueText">
                <div class="butValue">
                    <el-button :disabled="isDisabled" @click="updataTitle()" class="resBtn">重新生成 <i class='iconfont icon-shuaxin '></i>
                    </el-button>
                    <p v-if="Copywriting !== ''" class="titleValue">
                        {{ Copywriting }}
                    </p>
                </div>
                <!-- <p v-else>
                    正在生成文案。。。
                </p> -->
            </div>
            <p class="Topp" v-if="!textShowBtn">
                <el-button @click="textBtn" type="primary">生成发布文案</el-button>
                <el-button @click="downVideText" type="primary">下载视频</el-button>
            </p>
            <p v-else class="Topp">
                <!-- <el-button @click="updataTitle()" type="primary">刷新文案</el-button> -->
            <div type="button">
                <el-button @click="touchCopy" type="primary">复制文案</el-button>
            </div>
            <el-button @click="downVideText" type="primary">下载视频</el-button>
            <el-button type="primary">一键发布</el-button>
            <!-- eslint-disable-next-line vue/no-parsing-error -->
            </p>

        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import useClipboard from 'vue-clipboard3';
import { ref, watch, defineProps, defineEmits, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import request from '@/api/httpDown';

import Api from '@/api';
const props = defineProps({
    exchange: {
        type: Boolean,
        default: false
    },
    detail: {
        type: Object,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: {}
    }
});


const emit = defineEmits(['upProps']);
const textShowBtn = ref(false);
const ask = ref('');
const Copywriting = ref('');
const timer = ref(null);
const setTimer = ref(null);
const closeFn = () => {
    emit('upProps', false);
    // Copywriting.value='正在'
    textShowBtn.value = false;
    clearInterval(setTimer.value);
    setTimer.value = null;
};
const isDisabled=ref(true);
const arr = ref([]);
const videoUser = ref({});


watchEffect(() => {
    if (!props.exchange) {
        Copywriting.value = '';

    }
});
watch(() => props.detail, (newValue) => {


    videoUser.value = newValue;
    arr.value = [];
    arr.value.push(newValue._id);
    // console.log(newValue._id)
});


// 使用插件
const { toClipboard } = useClipboard();
const copy = async (msg: string) => {
    timer.value = null;
    try {
        // 复制
        await toClipboard(msg);
        // 复制成功
        ElMessage({
            message: '复制成功',
            type: 'success'
        });
    } catch (e) {
        // 复制失败
        ElMessage({
            message: '复制失败',
            type: 'error'
        });

    }
};
// 点击复制

function touchCopy() {
    // timer.value = null;

    // 调用
    copy(Copywriting.value);
}

const textBtn = async () => {
    Copywriting.value = '';
    //点击发布文案
    textShowBtn.value = true;
    let result = await Api.Article.upLoadAi('ai_product_video_assistant_xiaohongshu', props.detail._id);

    ask.value = result.data.id;

    setTimer.value = setInterval(() => {
        // eslint-disable-next-line no-use-before-define
        getTextValue();
    }, 500);
};


//获取文案
const getTextValue = async () => {

    let result = await Api.Article.getTextValue(ask.value);
    // console.log(result.data.isFinish);

    if (result.data) {
        if (!result.data.isFinish) {
            Copywriting.value = result.data.content;
        } else {
            isDisabled.value=false;
            clearInterval(setTimer.value);
            setTimer.value = null;
        }

        // let result.
        //   Copywriting.value = result.data.content;

    };
    // else {
    //     Copywriting.value = '';
    // }

};
const updataTitle = () => {


    textBtn();
};

//视频生成结果下载
const downVideText = async () => {
    request.get('/api/cemeta/aimanager/v1/video/result/download', {
        params:
            { videoId: arr.value, type: 'video_assistant_download_video' }
    })
        .then(response => {
            // 从响应头中获取文件名
            const contentDisposition = response.headers['content-disposition'];
            // const filenameMatch = contentDisposition.match(/filename="(.+)"/);
            let filename = contentDisposition.split('=')[1];
            // 创建一个兼容不同浏览器的 URL 对象
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // 创建一个<a>标签，并设置其下载属性和链接
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', filename);

            // 在DOM中模拟点击下载链接
            document.body.appendChild(link);
            link.click();

            // 清理URL对象
            window.URL.revokeObjectURL(url);
        });

};

</script>

<style lang="less">
.exportBox {
    display: "none";

    video {
        object-fit: scale-down;
        padding: 30px;

    }
}</style>
