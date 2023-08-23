<template>
  <div class='home'>
    <div class="videoBox">
      <video
      src="https://demo-product-image-1313090634.cos.ap-beijing.myqcloud.com/resource_test1/video/1692670333969.mp4"></video>
      <!-- <img  
        src="https://demo-product-image-1313090634.cos.ap-beijing.myqcloud.com/resource_test1/video/1692670333969.png"/> -->
    </div>
    <div class="guide">
      <dl>
        <dt>
          AI营销文案助手
        </dt>
        <dd>轻松生成爆款营销文案,抢占社交媒体流量</dd>
      </dl>
      <dl>
          <dt>
            AI商品拍摄助手
          </dt>
          <dd>一键拍摄商品大片和场景图，氛围感种草轻松拿捏</dd>
        </dl>
        <dl @click="toexcess">
          <dt>
            AI商品视频助手
          </dt>
          <dd>批量制作商品种草视频，商品推广更快更广</dd>
        </dl>
    </div>
  </div>
</template>
<script setup>
import {useRouter} from "vue-router"
import {useStore} from "vuex"
const store=useStore()
const router=useRouter()
const toexcess=()=>{
  store.commit('upDataShow','Excess')
  router.push('/excess')

}
</script>
<style lang='less'>
.home{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .videoBox{
    flex:1;
    video{
      width: 65vw;
      height: 50vh;
    }
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .guide{
    width: 100%;
    height: 25vh;
    display: flex;
    align-items: center;
    dl{
      margin: 1px;
      height: 100%;
      flex:1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      border: 1px solid #eee;
      align-items: center;
      line-height: 38px;
      dt{
        font-size: 22px;
        font-weight: bold;

      }
      dd{
        font-size: 14px;
      }
    }
    dl:hover{
      background: #eee;
    }
  }

}
</style>