<template>
    <div class='excess'>
        <Header @updataShow="updataShow"></Header>
        <Excess v-if="isShowName == 'Excess'" @updataShow="updataShow"></Excess>
        <Generate v-else-if="isShowName == 'Generate'"></Generate>
        <Upload v-else></Upload>
        <div class="excess-bottom-twoBtnBox">
            <el-button>
                <i class="iconfont icon-jiluwenben"></i>
                <span>创作版权说明 </span>
            </el-button>
            <el-button>
                <i class="iconfont icon-guanyu"></i>
                <span>关于CeMetaAI</span>
            </el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
//头部组建
import Header from '../components/Header.vue';
//引导页
import Excess from '../components/updata/Excess.vue';
//生成页面
import Generate from '../components/updata/Generate.vue';
//上传视频页面
import Upload from '../components/updata/Upload.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
const store=useStore();
const isShowName = computed(()=>{
    // console.log(store.state)
    return store.state.comShow.componentsShow;
});
const updataShow = (name:string) => {
    store.commit('comShow/upDataShow', name);
};

</script>
<style lang='less'>
.excess {
    width: 100vw;
    height: 100vh;
    background: url(../../src/assets/image/背景.jpeg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    &-bottom-twoBtnBox {
        position: fixed;
        bottom: 3vh;
        left: 2vw;
        i {
            font-size: 18px;
            margin-right: 3px;
        }
    }
}
</style>