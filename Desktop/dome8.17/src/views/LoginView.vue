<!-- eslint-disable @typescript-eslint/no-empty-function -->
<template>
  <div class="loginView">
    <div class="loginBigBox">

    <img class="logoImg" referrerpolicy="no-referrer"
      src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngf9701fefa7aae43841ef442fc4671d530c5dbc2d2a950e9cec48531d20660202" />
    <div class="formBox">
      <div class="helolText">欢迎登陆</div>
      <el-tabs v-model="activeName" stretch="true" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="验证码" name="code">
          <codeCheck></codeCheck>

        </el-tab-pane>
        <el-tab-pane label="密码" name="password"> 密码 </el-tab-pane>
      </el-tabs>
    </div>
      <!-- 表单 -->
  </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import type {TabsPaneContext } from 'element-plus';
import codeCheck from '../components/loginCom/codeCheck.vue';
import Api from '@/api';

//获取应用是否可用
const getListFn = async () => {
    const result = await Api.Application.getList();
};

getListFn();

const activeName = ref('code');
const handleClick = (tab: TabsPaneContext, event: Event) => { };
const checked1 =ref(false);


</script>
<style lang='less'>
.loginView{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url(../../src/assets/image/背景.jpeg);
}
.loginBigBox {

  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 155px;

  .logoImg {
    //logo图片
    width: 220px;
    height: 40px;
    margin-top: 10.8%;
    margin-bottom: 4.25%;
  }

  .formBox {
    //表单组建
    // width: 35%;
    // height: 62%;
    background: rgba(255, 255, 255, .3);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, .5);
padding-bottom: 30px;
    // margin-top: 256px;
    .demo-tabs {
      //tabs组建
      margin: 0 60px;
    }

    .helolText {
      //欢迎登陆文字
      font-size: 3%;
      text-align: center;
      font-weight: bold;
      color: #111d3a;
      margin-bottom: 4.6%;
      margin-top: 4.5%;
    }
    .text{
      display: flex;
      align-items: center;
      .el-checkbox__input.is-checked .el-checkbox__inner{
       background-image: url(../assets/image/checked.png);
       background-size:cover ;
      }
      p{
        flex:none;
        font-size: 12px;
        span{
          color: #5B7FFF ;
        }
      }
    }
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }

  .el-tabs__active-bar {
    background-color: #ffffff;
  }

  .el-tabs__item:hover {
    color: #999999;
  }

  .el-tabs__item {
    border-bottom: 2px solid #ECECEC;
    color: #999999;
  }

  .el-tabs__nav {
    border-bottom: 2px solid #ECECEC;
    border-bottom: none;
    z-index: 0 !important;
  }

  .is-active {
    color: #111D3A !important;
    border-bottom: 2px solid #9D72FF;
    z-index: 100;
  }
}
</style>