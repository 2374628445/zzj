<template>
    <div class='generate'>
        <div class="generate-left">
            <h3>
                <p></p>
                <p>请选择本次推广的商品</p>
            </h3>
            <div class="generate-left-listBox" @click="selectTitle()">
                <p v-if="shop.nameArr?.name">{{ shop.nameArr.name }}</p>
                <p v-else>选择已有商品AI视频生成模型</p><i class="iconfont icon-youjiantou"></i>
            </div>
            <div class="generate-left-imgBox" @click="updataShow()">
                <i class="iconfont icon-tianjia"></i>
                <p>创建商品AI视频模型</p>
            </div>
            <h3>
                <p></p>
                <p>请选择视频生成数量</p>
            </h3>
            <div class="generate-left-numBtn">
                <div class="btnbox">
                    <el-button @click="setCount(v)" plain v-for="(v, i) in shop.numBtn" :key="i">
                        {{ v }}
                    </el-button>

                </div>
                <div class="customBtn">
                    <p>自定义生成数量：</p>
                    <el-input @blur="setInputCount()" v-model="input1" class="w-50 m-2" size="large" placeholder="请输入..." />

                </div>
            </div>
            <div class="generate-left-btn">
                <el-button @click="createvideo">立即生成</el-button>
            </div>
        </div>
        <div class="generate-right">
            <h3>
                <p></p>
                <p>AI商品视频生成</p>
            </h3>
            <div class="generate-right-img" v-show="!animationShow">
                <dl v-show="bigImgShow">
                    <dt>
                        <img :src="require('../../assets/image/generateRight.png')" alt="">
                    </dt>
                    <dd>
                        商品介绍商品介绍商品介绍商品介绍商品介绍
                    </dd>
                </dl>
                <div class="videoBo" v-show='shop.videoArr.length'>
                    <div class="videoBoItem" v-for="(v, i) in shop.videoArr" :key="i">
                        <!-- v-show="checkboxAll" -->
                        <el-checkbox v-show="!checkboxAll" @change="upDataCheck(i)" size="large" />
                        <video id="video1" @click="checkboxAll ? showVideoFn(v) : null" :src="v.result.video">
                        </video>
                    </div>
                </div>
            </div>
            <AnimatonBox v-show="animationShow"></AnimatonBox>
        </div>
        <!-- 选择商品弹出框 -->
        <div class="selectShop">
            <el-dialog v-model="dialogTableVisible" @close="seleceShopNo">
                <h5>
                    选择已有商品AI视频模型
                </h5>
                <div class="mt-4">
                    <el-input @focus="inputIn" @input="inputValue" @blur="inputOut" v-model="input3" :placeholder="inputMsg"
                        class="">
                        <template #append>
                            <el-button @click="searchFn" type="info" plain><el-icon>
                                    <Search />
                                </el-icon></el-button>
                        </template>
                    </el-input>
                    <div class="item-bigBox">
                        <template v-if="!shop.shopName.length">暂无商品资源</template>
                        <div v-else class="el-dialog-item" v-for="(v, i)
                    in shop.shopName" :key="i">
                            <el-button @click="v.active ? selectShop(v) : ''" :disabled="v.active ? false : true">
                                <p v-show="inputShow !== i">
                                    {{ v.name }}
                                </p>
                                <el-input :ref="setInputRef" v-show="inputShow === i" @blur="updataValueBlur"
                                    v-model.stop="v.name" />
                                <!-- <input :ref="setInputRef" type="text"> -->

                                <font v-show="!v.active">训练中...</font>
                                <p class="iconThreeDiv">
                                    <el-icon @click.stop="deleteShopName(v.id)">
                                        <Delete />
                                    </el-icon>
                                    <el-icon @click.stop="toTop(i, v.id)">
                                        <Upload />
                                    </el-icon>
                                    <el-icon @click.stop="updataDetail(v.id, i)">
                                        <Edit />
                                    </el-icon>
                                </p>
                            </el-button>

                        </div>
                    </div>

                </div>
                <div class="createBtn">
                    <el-button @click="updataShow()" plain><i class="iconfont icon-tianjia"></i> 创建商品AI视频模型</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="videoShow">
            <exportVideo :exchange="exchange" :detail="shop.detail" ref="exports" @upProps="upProps"></exportVideo>
        </div>
        <div class="ExportBox" v-show="shop.videoArr.length">
            <el-button v-show="checkboxAll" plain @click="exportAll"><i class="iconfont icon-daochu"></i>批量导出</el-button>
            <div v-show="!checkboxAll">
                <el-button plain @click="noExporyAll">取消</el-button>
                <el-button plain @click="yesExporyAll">确认</el-button>
            </div>
        </div>
        <div class="exporyAllBox">
            <el-dialog v-model="isChecked" @close="onCloseProp">
                <p>
                    当前选中{{ checkAll?.length }}条视频，是否确认导出？
                </p>
                <div class="btnBox">
                    <el-button @click="directExport">直接导出</el-button>
                    <el-button @click="mateExport">匹配文案导出</el-button>
                    <el-button @click="noExport">再想想</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import Api from '@/api';
import exportVideo from '../../components/video/ExportVideo.vue';
import AnimatonBox from '../../components/video/Animation.vue';
import { ElMessage } from 'element-plus';
import { ResponseType } from 'axios';
import request from '@/api/httpDown';

const dialogTableVisible = ref(false);

const exchange = ref();
const store = useStore();
const input1 = ref('');
const input3 = ref('');
const checkboxAll = ref(true);
const animationShow = ref(false);
const bigImgShow = ref(true);
const isChecked = ref(false);
const checkAll = ref([]);
const exportAllId = ref([]);//批量导出数组id
const valueName = ref('');
const inputMsg = ref('输入商品名称,搜索已创建的商品AI商品模型');
const shop = reactive({
    shopName: [],
    shopNameTwo: [],
    nameArr: [],
    numBtn: ['1', '3', '5'],
    count: '',
    videoArr: [],
    detail: {}
});
const inputShow = ref();
const updataId = ref('');
const inputRefs = ref<HTMLElement[]>([]);
// const showArr = ref([])
//鼠标进入
const inputIn = () => {
    inputMsg.value = '输入商品名称';
};
//鼠标移出
const inputOut = () => {
    inputMsg.value = '输入商品名称,搜索已创建的商品AI商品模型';
};

//输入框输入事件模糊查询
const inputValue = (e: string) => {
    // eslint-disable-next-line no-use-before-define
    searchFn(e);
};

//模糊查询
const searchFn = (e: string) => {
    // input3.value=e
    let showArr: never[] = [];

    if (e) {
        shop.shopNameTwo.forEach(v => {
            let index = v.name.indexOf(e);

            if (index !== -1) {
                showArr.push(v);
            }
        });
    } else {
        shop.shopNameTwo.forEach(v => {
            let index = v.name.indexOf(input3.value);

            if (index !== -1) {
                showArr.push(v);
            }
        });
    }

    shop.shopName = showArr;
    // input3.value = '';
};

//删除商品
const deleteShopName = async (id) => {
    // let result=await Api.Resource.deleteAi({ resourceId: id});
    let result = await Api.Resource.deleteAi(id);

    getListFn();
};
//向上一级
const toTop = async (index: string, id: string) => {

    // let temp = shop.shopName[index];

    // shop.shopName[1] = shop.shopName[index]

    // shop.shopName[index] = temp;

    // arr[index2] = temp;
    // console.log(shop.shopName[index])
    let obj = shop.shopName.filter((v, i) => i == index)[0];//shop。nameShop是原数据
    let detailIndex = shop.shopName.splice(index, 1);//detaiIndex[0]是当前点击的数据
    shop.shopName.unshift(detailIndex[0]);

    let result = await Api.Resource.upDataAi({
        sort: shop.shopName.map((a, i) => ({ resourceId: a.id, sort: i }))
    });
};


//修改商品
const updataDetail = (id: string, index: string) => {
    store.commit('comShow/upDataShow','Upload')
    // sessionStorage.setItem('resourceId', id);
    // updataId.value = id;//修改商品的id
    // inputShow.value = index;
    // valueName.value = shop.shopName[index].name;
    // inputRefs.value[index].focus();
};
const setInputRef = (el: HTMLElement) => {
    if (el) {
        inputRefs.value.push(el);
    }
};

//input失焦修改
const updataValueBlur = async (e: string) => {
    let val = e.target.value;
    let result = shop.shopNameTwo.findIndex(v => {
        return v.name === valueName.value;
    });

    if (result === -1) {
        //没有重复的名字  可以修改
        let result = await Api.Resource.upDataAi({ resourceId: updataId.value, productName: val });

        ElMessage({
            message: '修改成功',
            type: 'success'
        });
        getListFn();
    } else {
        ElMessage({
            message: '已有该输入商品模型，请更换命名',
            type: 'error'
        });
    }
    inputShow.value = '';
};

//确认导出点击事件
const yesExporyAll = () => {
    if (exportAllId.value.length === 0) {
        ElMessage({
            message: '需要选中视频',
            type: 'warning'
        });
        return false
    }
    checkboxAll.value = false;
    isChecked.value = true;

};

//取消导出点击事件
const noExporyAll = () => {
    isChecked.value = false;
    checkboxAll.value = true;

};

//批量导出
const exportAll = () => {
    checkboxAll.value = false;
};
//点击关闭弹框
const onCloseProp = () => {
    checkboxAll.value = true;
};
//直接导出
const directExport = () => {
    isChecked.value = false;
    checkboxAll.value = true;
    request.get('/api/cemeta/aimanager/v1/video/result/download', { params: { videoId: exportAllId.value, type: 'video_assistant_download_video' } })
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
        })
        .catch(error => {
            // 处理错误
        });


};


//匹配文案导出
const mateExport = () => {
    checkboxAll.value = true;
    checkboxAll.value = true;

};
//再想想
const noExport = () => {
    isChecked.value = false;
    checkboxAll.value = true;
};

//点击复选框
const upDataCheck = (index: string) => {
    // isChecked.value=true;
    let result = checkAll.value.findIndex(v => {
        return v === index;
    });

    if (result === -1) {
        checkAll.value.push(index);
        // console.log(shop.videoArr[index]);
        exportAllId.value.push(shop.videoArr[index]._id);
    } else {
        checkAll.value.splice(result, 1);
        exportAllId.value.splice(result, 1);

    }
};

//获取ai资源
const getListFn = async () => {
    const result = await Api.Video.lookAilist('product_video');

    shop.shopName = result.data;

};
const getListFn1 = async () => {
    const result = await Api.Video.lookAilist('product_video');

    shop.shopNameTwo = result.data;
};
const exports = ref();
const showVideoFn = (v) => {
    exchange.value = true;
    shop.detail = v;
};

onMounted(() => {
    getListFn();
    getListFn1();
});

const upProps = (boolean: boolean) => {
    exchange.value = boolean;
};

//查询视频
const searchVideo = async () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    let result = await Api.Video.getVideo({ resourceId: shop.nameArr.id, type: 'video_assistant', count: (shop.count) * 1, deadline: formattedDate });

    if (result.data) {
        animationShow.value = false;
    }
    shop.videoArr = result.data;
};


//视频生成结果下载
// const videoDown = async () => {
//     let result = await Api.Video.videoDown(shop.videoArr, 'video_assistant_download_video_with_article', 'arraybuffer');
// };

//立即生成视频
const createvideo = async () => {
    if (shop.nameArr?.id) {
        bigImgShow.value = false;

        animationShow.value = true;

        let result = await Api.Video.createVideo(shop.nameArr.id, (shop.count) * 1);

        // videoDown();
        searchVideo();
    }

    // if (shop.nameArr?.id && shop.count) {
    //     bigImgShow.value = false;

    //     animationShow.value = true;

    //     let result = await Api.Video.createVideo(shop.nameArr.id, (shop.count)*1);

    //     // videoDown();
    //     searchVideo();
    // } else {
    //     ElMessage({
    //         type: 'error',
    //         message: '请选择商品视频和数量'
    //     });
    // }

};


const updataShow = () => {
    // store.state.comShow = 'Upload';
    store.commit('comShow/upDataShow', 'Upload');

};
//点击数量按钮
const setCount = (v: string) => {
    shop.count = v;
    input1.value = '';

};
//输入框修改数量
const setInputCount = () => {
    shop.count = input1.value;
};

const selectTitle = () => {

    dialogTableVisible.value = true;

};
//进入页面直接获取商品ai

getListFn();

//选择商品
const selectShop = (item: any, event: Event) => {
    // event.preventDefault();
    shop.nameArr = item;
    dialogTableVisible.value = false;
    getListFn();
    input3.value = '';

};
//商品选择框关闭事件
const seleceShopNo = () => {
    getListFn();
    input3.value = '';
}

</script>
<style lang='less'>
.generate {
    box-sizing: border-box;
    flex: 1;
    display: flex;

    &-left {
        width: 40vw;
        height: 100%;
        background: white;
        padding: 0 6vw;

        h3 {
            display: flex;
            align-items: center;
            margin: 3vh 0 2vh 0;
            font-size: 16px;

            :nth-child(1) {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: black;
                margin: 0 3px;
            }
        }

        &-listBox {
            width: 100%;
            height: 13vh;
            border: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            color: #6a6d73;
        }
         &-listBox:hover{
             cursor: pointer;
         } 
&-imgBox{
    cursor: pointer;
}
        &-imgBox {
            width: 100%;
            margin-top: 1.5vh;
            height: 13vh;
            border: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;


            i {
                text-align: center;
                line-height: 15px;
                width: 15px;
                height: 15px;
                background: linear-gradient(to bottom, rgb(155, 33, 171), pink);
                border-radius: 50%;
                color: white;
                font-size: 5px;
                margin: 0 5px;
            }
        }

        &-numBtn {
            .btnbox {
                display: flex;
                justify-content: space-between;

                button {
                    width: 33%;
                }
            }

            .customBtn {
                margin-top: 1.5vh;
                display: flex;
                align-items: center;

                p {
                    flex: none;
                    font-size: 14px;
                }

                .el-input__inner {
                    text-align: center;
                }


            }

        }

        &-btn {
            width: 100%;
            height: 9vh;
            display: flex;
            justify-content: center;
            margin: 3vh 0;

            button {
                width: 22vw;
                height: 5vh;
                border-radius: 30px;
                background: url(../../assets//image/loginBtn.png) 73% 17%;
                color: white;
                font-size: 16px;
                margin: 3vh 0;
            }
        }

    }

    &-right {
        width: 60vw;
        height: 100%;
        background: #F2F2F9;
        padding: 2.5vh 4vw;
        display: flex;
        flex-direction: column;

        h3 {
            display: flex;
            align-items: center;

            p:nth-child(1) {
                width: 5px;
                height: 5px;
                background: black;
                border-radius: 50%;
                margin-right: 5px;
            }
        }

        &-img {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 18vw;
                height: 25vh;
                margin-left: 20px;
                margin-top: 20px;

                dl {
                    dt {}
                }
            }

            .videoBo {
                width: 100%;
                height: 700px;
                overflow: auto;

                //页面小雨1060px的时候
                @media only screen and (min-width:1060px) {
                    .videoBoItem {
                        position: relative;
                        width: 24%;
                        height: 25vh;
                        float: left;
                        margin-bottom: 6px;
                        margin-right: 1%;
                        // display: none;
                    }
                }

                @media only screen and (max-width:1060px)and(min-width:750px) {
                    .videoBoItem {
                        position: relative;
                        width: 32%;
                        height: 25vh;
                        float: left;
                        margin-bottom: 6px;
                        margin-right: 1%;
                        // display: none;
                    }
                }

                @media only screen and (max-width:750px) {
                    .videoBoItem {
                        width: 49%;
                        position: relative;
                        height: 25vh;
                        float: left;
                        margin-bottom: 6px;
                        margin-right: 1%;
                        // display: none;
                    }
                }

                @media only screen and (max-width:420px) {
                    .videoBoItem {
                        width: 100%;
                        position: relative;
                        height: 25vh;
                        float: left;
                        margin-bottom: 6px;
                        // margin-right: 11px;
                        // display: none;
                    }
                }

                .el-checkbox {
                    position: absolute;
                    top: 0;
                    left: 20px;

                    .el-checkbox__input.is-checked .el-checkbox__inner {
                        background: linear-gradient(to bottom, rgb(186, 98, 173), rgba(230, 195, 227, 0.645));
                    }

                }

                video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius:5px ;
                    cursor: pointer;
                }


                // justify-content: space-between;

                //  @media only screen and (max-width:1060px) {
                //     video {
                //     width: 100%;

                // }
                //  }

            }
        }
    }

    .selectShop {
        .el-dialog__body {
            padding: 1vw !important;
        }

        h5 {
            font-size: 20px;
            margin-bottom: 1vh;
            display: flex;
            align-items: safe;

            .el-input__inner {
                font-size: 12px;
            }
        }

        .item-bigBox {
            height: 30vh;
            overflow: auto;

            .el-input {
                width: 100px;
            }

            .el-button {
                padding: 0;

            }
        }

        .el-dialog {
            border-radius: 10px !important;
            padding: 0 3vw;
            height: 50%;
            padding-bottom: 5%;

            .item-bigBox {
                height: 30vh;
                overflow: auto;
            }

            &-item {
                width: 100%;
                height: 5vh;
                // margin: 1vh 0;
                // border-radius: 6px;
                // border: 1px solid #DADADA;
                font-size: 12px;
                // padding: 3px;
                display: flex;
                align-items: center;
                justify-content: center;

                button {
                    width: 100%;
                    justify-content: normal !important;

                    span {
                        display: inline-block;
                        display: flex;
                        width: 100%;
                        height: 100%;
                        justify-content: space-between;
                        padding: 0 0 0 10px;

                        p:nth-child(1) {
                            width: 50px;
                            display: flex;
                            align-items: start;
                        }

                        font {
                            font-size: 12px;
                            margin-left: 2vw;
                        }

                        .iconThreeDiv {
                            .el-icon {
                                // font-size: 22px;
                                margin: 0 6px;
                                // color: #000;
                            }
                        }
                    }

                }
            }

            .createBtn {
                width: 100%;

                button {
                    width: 100%;

                    i {
                        text-align: center;
                        line-height: 15px;
                        width: 15px;
                        height: 15px;
                        background: linear-gradient(to bottom, rgb(155, 33, 171), pink);
                        border-radius: 50%;
                        color: white;
                        font-size: 5px;
                        margin: 0 5px;
                    }
                }
            }

            .el-input__wrapper:hover {
                input::placeholder {

                    color: #000;

                }

            }
        }
    }

    .exportBox {
        .el-dialog {
            width: 30%;

            .videoBox {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                video {
                    width: 30vw;
                    height: 30vh;
                    // background:linear-gradient(to bottom,rgb(180, 178, 178),rgba(34, 33, 33, 0.5));
                }
            }


            .Topp {
                padding: 5px 0 0 0;
                display: flex;
                justify-content: space-around;
                margin-top: 3vh;


            }

            .valueText {
                height: 15vh;
                display: flex;
                flex-direction: column;
                // align-items: flex-end;
                .butValue{
                    display: flex;
                 flex-direction: column;
                //  align-items: flex-end;
                    border: 1px solid #ccc;
                    height: 100%;
                    padding: 2px;

                //   p {
                //     flex: 1;
                //     width: 100%;
                //     margin-top: 2px;
                // }
                 .titleValue {
                    text-indent: 2em;
                    // flex: 1;
                    // height: 41px;;
                    overflow: auto;
                    display: flex;
                }
                }
            .resBtn {
                // display: block;
                    width: 100%;
                    flex: none;
                    border: 0;
                    background: 0;
                    margin: 4px;
                    display: flex;
                    justify-content: flex-end;
                    padding-right: 20px;

                }
            }
        }
    }

    .ExportBox {
        position: fixed;
        right: 120px;
        bottom: 50px;

        button {
            border-radius: 30px;

            span {
                i {
                    margin: 0 5px;
                }
            }
        }
    }

    .exporyAllBox {
        .el-dialog {
            width: 40% !important;
            margin-top: 30%;
            text-align: center;
            line-height: 30px;
            padding-bottom: 20px;
border-radius:10px;
            .el-dialog__body {
                padding: 5px;
            }

            p {
                margin: 10px 0;
                font-weight: 800;
                font-size: 16px;
            }
        }
    }
}</style>