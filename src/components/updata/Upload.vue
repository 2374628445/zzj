<template>
   <div class='upload'>
      <div class="title">
         商品视频素材上传
      </div>
      <el-upload class="upload-demo" drag action="" multiple  :on-change="setFileAsBase64" :on-remove="resetResourceImg"
         list-type="picture-card" :auto-upload="false">
         <el-icon class="el-icon--upload"><upload-filled /></el-icon>
         <div class="el-upload__text">
            <p>请上传 5-10 条商品多角度拍摄的视频素材，每条视频不少于 20s</p>
            <p></p>
            <p>点击或拖拽视频至此处上传</p>
         </div>
      </el-upload>
      <div class="valueBox">
         <p class="shopNameTitle">
            商品信息输入
         </p>
         <div>
            <div class="shopName">
               <p class="shopName-title">
                  <span>
                     *
                  </span>
                  商品名称
               </p>
               <el-input v-model="shopName" placeholder="请输入商品名称或选择输入过的商品信息" />
            </div>
            <div class="titleBox">
               <p>
                  <span>
                     *
                  </span>
                  商品卖点
               </p>
               <p>
                  <el-input v-model="inputArr.input1" placeholder="请输入商品卖点，每一个输入栏输入一个买点，按优先级依次排序" />
                  <el-input v-model="inputArr.input2" placeholder="请输入商品卖点，每一个输入栏输入一个买点，按优先级依次排序" />
                  <el-input v-model="inputArr.input3" placeholder="请输入商品卖点，每一个输入栏输入一个买点，按优先级依次排序" />
                  <el-input v-model="inputArr.input4" placeholder="请输入商品卖点，每一个输入栏输入一个买点，按优先级依次排序" />
                  <el-input v-model="inputArr.input5" placeholder="请输入商品卖点，每一个输入栏输入一个买点，按优先级依次排序" />
               </p>
            </div>
         </div>
      </div>
      <div class="createBtn">
         <el-button @click="setUploadMes" circle>创建商品AI视频模型</el-button>
      </div>
      <div class="iconBox" >
     <el-icon @click="toTop" key="plain" ><ArrowLeftBold /></el-icon>
      </div>
   </div>
</template>
<script setup lang="ts">
import { UploadFile, ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import { reactive, ref } from 'vue';

import Api from '@/api';
const store= useStore();
const inputArr = reactive({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: ''
});
const shopName = ref('');
const imageBase64 = ref('');
const detailObj=ref({});

const resetResourceImg = () => {
    imageBase64.value = '';
};

const setFileAsBase64 = async (file: UploadFile) => {
    imageBase64.value = (await (async (): Promise<string> => new Promise((resolve, reject) => {
        if (!file.raw) {
            return reject();
        }
        const reader = new FileReader();
        let imgResult = '';

        reader.readAsDataURL(file.raw);
        reader.onload = function () {
            imgResult = reader.result as string;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(imgResult);

        };
    }))()).split(',')[1];
};

const upVideo = async (id:string) => {
    let result = await Api.Resource.upDataAi({ resourceId: id, video: imageBase64.value });
};

const toTop=()=>{
store.commit('comShow/upDataShow', 'Generate');
}
//用户上传ai资源
const setUploadMes = async () => {
    const arr = [];

    arr.push(inputArr);
    if (arr.length && shopName.value !== '') {

        // arr.push(inputArr.input1, inputArr.input2, inputArr.input3, inputArr.input4, inputArr.input5);
        let result = await Api.Resource.upLoadAi('video_product_sku', shopName.value, arr);

        detailObj.value=result.data;
        ElMessage({
            message: `${shopName.value}AI视频模型模型正在训练中,预计训练时间为两天`,
            type: 'success'
        });
    } else {
        ElMessage({
            message: '请完善商品信息',
            type: 'error'
        });
    }
    // console.log(detailObj.value)
    upVideo(detailObj.value?._id);

};

</script>
<style lang='less'>
.upload {
   span {
      color: red;
   }

   flex: 1;
   background: white;
   padding: 5vh 18vw 0 18vw ;

   .title {
      text-align: left;
      font-weight: bold;
      font-size: 20px;
      margin: 2vh 0;
   }

   .valueBox {
      .shopNameTitle {
         text-align: left;
         font-weight: bold;
         font-size: 20px;
         margin: 2vh 0;
      }

      .shopName {
         display: flex;
         margin: 2vh 0;

         P {
            flex: none;
            margin-right: 1vw;
            margin-top: .5vh;
         }
      }

      .titleBox {
         display: flex;

         P:nth-child(1) {
            flex: none;
            margin-right: 1vw;
            margin-top: .5vh;


         }

         p:nth-child(2) {
            .el-input {
               margin: .5vh 0;
            }
         }
      }
   }

   .createBtn {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-button.is-circle {
         width: 300px;
         border-radius: 30px;
         background: url(../../assets/image/loginBtn.png) no-repeat 56% 42%;

         span {
            color: #fff;
         }

      }

      .el-button {}
   }

   .upload-demo {
      .el-upload--picture-card {
         border: 0, !important;
      }

      .el-upload-list--picture-card {
         width: 100%;
         width: 100%;

         .el-upload.is-drag {
            width: 100%;
            height: 200px;

            .el-upload-dragger {
               // padding: 5px;
               height: 100%;
               background: 0;
               padding-top: 2vh;
            }
         }
      }

      .el-upload-list {
         display: flex;
         flex-wrap: nowrap;
         background: #F9F8FA;
         position: relative;

         .el-upload {

            // z-index: -1;
         }
      }
      .el-upload__text{
        line-height: 22px;
        p{
         height: 20px;
        }
      }
   }
   .iconBox{
      position: fixed;
      left: 11vw;
    top: 11vh;
   cursor: pointer;
.el-icon{
         font-size: 20px !important;
}
    span{
      i{
         color: #1b1919;
         font-size: 20px !important;
         
      }
    }
   }

}
</style>