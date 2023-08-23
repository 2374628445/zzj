<template>
     <div class="body">
            <div class="body-centerTEXT">
                仅需三步，即可发布大量商品视屏
            </div>
            <div class="body-item">
                <div class="body-item-box" v-for="(v, i) in threeText" :key="v.count">
                    <h1>{{ v.count }}</h1>
                    <div>占位符</div>
                    <div>
                        {{ v.title }}
                    </div>
                    <div v-for="(val, index) in v.gords" :key="index" class="body-item-box-title">
                            {{ val }}
                    </div>
                </div>
            </div>
            <div class="body-bottom-button">
                <el-button @click="updataShow">立即开始</el-button>
            </div>
        </div>
</template>
<script setup lang="ts">
import { ref, reactive, defineEmits } from 'vue';
import { useStore } from 'vuex';
const store=useStore();
const emit=defineEmits(['updataShow']);
const threeText = ref([
    {
        count: 1, title: '建立商品AI视频生成模型', gords:
            [
                '上传5-10条商品拍摄视频',
                '输入商品信息',
                '即可完成商品AI视频模型构建']
    },
    {
        count: 2, title: '生成大量商品视频', gords:
            [
                '选择视生成数量',
                '等待视频生成' ]
    },
    {
        count: 3, title: '生成平台发布文案', gords:
            [

                '点击生成视频，匹配发布文案',
                '实现一键发布']
    }
]);
const updataShow=()=>{
    emit('updataShow', 'Generate');
    // store.state.comShow.componentsShow = 'Generate';
    store.commit('comShow/upDataShow', 'Generate');
};

</script>
<style lang='less'>
 .body {
        flex: 1;
        &-centerTEXT {
            text-align: center;
            font-size: 30px;
            font-weight: bold;
            margin-top: 5.5vh;
            margin-bottom: 5.5vh;
        }

        &-item {
            display: flex;
            justify-content: space-between;
            padding: 0 9vw;
            &-box {
                width: 24vw;
                height: 55vh;
                background: rgba(255, 255, 255, 0.33);
                box-shadow: inset 0px 0px 50px 0px #FFFFFF;
                border-radius: 20px;
                border: 1px solid #FFFFFF;
                backdrop-filter: blur(6px);
                h1 {
                    width: 90px;
                    height:23vh;
                    font-size: 160px;
                    font-family: Alibaba-PuHuiTi-B, Alibaba-PuHuiTi;
                    font-weight: normal;
                    color: rgba(17, 29, 58, 0);
                    margin-left: 3vw;
                    line-height: 150px;
                    background: linear-gradient(180deg, #D4D4D4 0%, rgba(216, 216, 216, 0) 60%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                :nth-child(2) {
                    width: 19vw;
                    height: 21vh;
                    background: white;
                    margin: 0 auto;
                    border-radius: 10px;
                    margin-top:-100px ;
                }

                :nth-child(3) {
                    overflow-wrap: break-word;
                    color: rgba(17, 29, 58, 1);
                    font-size: 18px;
                    font-family: SourceHanSansSCVF-Medium;
                    font-weight: 500;
                    text-align: center;
                    white-space: nowrap;
                    line-height: 35px;
                    margin: 2.8vh 0;
                }
                &-title{
                    text-align: center;
                    color: rgba(1, 0, 0, 0.479);
                    line-height: 3.5vh;
                }
            }
        }
        &-bottom-button{
            width: 100vw;
            height: 9vh;
            display: flex;
            justify-content: center;
            button{
                width: 22vw;
                height: 5vh;
                border-radius:30px ;
                background: url(../../assets//image/loginBtn.png) 73% 17%;
                color: white;
                font-size: 16px;
                margin: 3vh 0;
            }
        }

    }
</style>
