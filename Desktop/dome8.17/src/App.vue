<template>
  <div id="app">
    <div v-show="!isShow" class="customer">
      <div class="iconDiv">
        <el-button link @click="updatashow">
          <el-icon>
            <ChatDotSquare />
          </el-icon>
          <p>
            联系客服
          </p>
        </el-button>
      </div>

    </div>
    <div class="propsDialog" v-show="isShow">
      <div class="header">
        <span>CeMeTa</span>
        <span>客户服务顾问</span>
      </div>
      <div class="body">
        <p>有任何商务需求和意见反馈，</p>
        <p>欢迎联系我们</p>
        <img src="./assets/image/erwm.jpg" alt="">
      </div>
    </div>
    <router-view />
    <div v-show="isShow" class="iconBoxApp">
      <el-icon @click="isShow=false"><Close /></el-icon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const isShow = ref(false);

const updatashow = () => {
    isShow.value=true;
};

</script>
<style lang="less">
::-webkit-scrollbar {
  display: none;
}

#app {
  box-sizing: border-box;

  .customer {
    position: fixed;
    bottom: 5vh;
    right: 5vh;

    button {
      background: 0;

      span {
        display: flex;
        flex-direction: column;

        i {
          font-size: 30px;
          background: rgb(66, 70, 67);
          border-radius: 50%;
          padding: 7px;
          margin-bottom: 10px;
          color: #eee;
        }
      }
    }

  }

  .propsDialog {
    position: fixed;
    width: 210px;
    // height: 240px;
    bottom: 20px;
    right: 1vw;
    z-index: 10;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background: #eeeff1;
    .header {
      width: 100%;
      height: 44px;
      background: #7f8493;
      color: white;
      border-radius: 10px 0 0 0;
      font-size: 14px;
      font-weight: 700;
      justify-content: space-evenly;
    }

    .body {
      flex: 1;
      // background: rgb(174, 170, 170);
      font-size: 12px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      border-radius: 0 0 10px 0;
      line-height: 26px;
      padding: 10px;

      img {
        margin-top: 5px;
        width:100px;
        height: 100px;
      }

    }
  }
  .iconBoxApp{
    position: fixed;
    bottom: 237px;
    right: 1vw;
    i{
      font-size: 25px;
      cursor: pointer;
    }

  }

}
@media (max-width: 1200px) {
  html {
    font-size: 14px; /* 在窗口宽度小于等于1200px时设定根元素字体大小为14px */
  }
}

@media (min-width: 1201px) and (max-width: 1600px) {
  html {
    font-size: 16px; /* 在窗口宽度介于1201px到1600px之间时设定根元素字体大小为16px */
  }
}

@media (min-width: 1601px) {
  html {
    font-size: 18px; /* 在窗口宽度大于等于1601px时设定根元素字体大小为18px */
  }
}
</style>
