<template>
    <div class="header">
        <div class="header-Left">
            <img @click="updataShow()" :src="require('../assets/image/logo2.png')" alt="">
            <p></p>
            <p @click="toTop">AI商品视频助手</p>
        </div>
        <div class="header-Right">
            <div class="header-Right-Box">
                <p> <span> 可生成视频:</span>
                    <font style="font-weight: bold;"> {{ balanceObj.video }} </font>条
                </p>


                <el-button @click="exchange = true">兑换码兑换更多</el-button>
            </div>
            <div class="header-Right-Border"></div>
            <div class="header-Right-User">
                <img :src="require('../assets/image/user.png')" alt="">
                    <el-icon @click="open">
                        <CaretBottom />
                    </el-icon>

            </div>
        </div>
    </div>
    <!-- 选择商品弹出框 -->
    <div class="exchangeBox">
        <el-dialog v-model="exchange">
            <h5>
                请输入兑换码，兑换商品视屏权益
            </h5>
            <div class="title">
                <p v-show="yesAlt"><el-icon><Select /></el-icon>兑换成功</p>
                <p v-show="noAlt">
                    <el-icon>
                        <CloseBold />
                    </el-icon>
                    兑换失败，请重新输入
                </p>
                 <p v-show="noInput">
                        <el-icon>
                            <CloseBold />
                        </el-icon>
                        请输入兑换码
                    </p>
            </div>
            <!-- <el-input  /> -->
            <input type="text" v-model="input" placeholder="请输入兑换码，兑换数字权益">
            <p class="dhtitle">每一个兑换码仅有一次使用机会</p>
            <div class="createBtn">
                <el-button @click="dhBtn" plain>兑换</el-button>
            </div>
        </el-dialog>
    </div>
    <div class='outbox'>
        <el-dialog top="8vh" :modal="false" :show-close="isShow" @click="outLoginFn" v-model="outLogin">
            退出
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import router from '@/router';
import { ref, defineEmits, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElMessageBox } from 'element-plus';
import Api from '@/api';
const store = useStore();
const emit = defineEmits(['updataShow']);
const exchange = ref(false);
const input = ref('');
const refsP = ref(null);
const yesAlt = ref(false);
const noAlt = ref(false);
const outLogin = ref(false);
const isShow = ref(false);
const noInput=ref(false);
let balanceObj = ref({});
const updataShow = () => {
    // sessionStorage.setItem('comShow', 'Excess');
    store.commit('comShow/upDataShow', 'Generate');
    emit('updataShow', 'Excess');
};
const toTop=()=>{
    store.commit('comShow/upDataShow', 'Excess');
}

onMounted(() => {
    // eslint-disable-next-line no-use-before-define
    getBalance();
});
//获取账户余额 视频数量
const getBalance = async () => {
    let result = await Api.Balance.getUserBalance();

    balanceObj.value = result.data;
};

//退出登陆
const outLoginFn = () => {
    // console.log(1)
    router.push('/');
};
const open = () => {
    outLogin.value = true;
};

//兑换按钮点击
const dhBtn = async () => {
    yesAlt.value = false;
    noAlt.value = false;
    if (!input.value) {
        noInput.value=true;
        setTimeout(() => {
            noInput.value = false;
        }, 2000);
        return false;
    }
    let result = await Api.Balance.exchangeNum(input.value);

    if (!result.error) {
        yesAlt.value = true;

        setTimeout(() => {
            yesAlt.value =false;

        }, 3000);
    } else {
        noAlt.value = true;

        setTimeout(() => {
            noAlt.value = false;
        }, 3000);
    }

};

</script>
<style lang='less'>
.header {
    position: relative;
    top: 0;
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5%;
    background: white;
    box-shadow: 0px 2px 32px 0px rgba(173, 177, 189, 0.5);

    &-Left {
        display: flex;
        align-items: center;

        p:nth-child(2) {
            width: 1px;
            height: 20px;
            background: #ccc;
            margin: 0 30px;

        }
p:nth-child(3):hover{
             cursor: pointer;
}
        p:nth-child(3) {
            font-size: 18px;
            font-weight: bold;
            flex: none;
        }
        img:hover{
             cursor: pointer;
        }

    }

    &-Right {
        display: flex;
        align-items: center;

        &-Box {
            font-size: 14px;
            // width: 25vw;
            display: flex;
            height: 6.3vh;
            background: #F1F0F5;
            align-items: center;
            justify-content: space-around;
            border-radius: 8px;
            padding: 0 18px;
            .el-button{
                    width: 48%;
    border-radius: 30px;
    font-size: 12px;
            }


            p {
                font-size: 12px;
                width: 48%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 3px;
                margin: 0 5px;

                span {
                    flex: none;

                }

                font {
                    color: red;
                    margin: 0 3px;
                }
            }

            P:nth-child(2) {
                height: 60%;
                background: white;
                border-radius: 30px;
                color: #9D72FF;
                flex: none;
                margin: 0 5px;
            }

        }

        &-Border {
            width: 1px;
            height: 20px;
            background: #ccc;
            margin: 0 25px;
        }

        &-User {
            padding-right: 1%;
            display: flex;
            align-items: center;

            i {
                color: #726e6e;
                font-size: 14px;
                margin-left: 22%;
cursor: pointer;
            }
            i:hover{

            }

            img {
                width: 3vw;
                height: 3vw;
            }
        }
    }


}

.exchangeBox {
    .el-dialog {
        border-radius: 10px !important;
        padding: 0 3vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 350px !important;
        top: 200px !important;
        height: 220px;

        &-item {
            width: 100%;
            height: 5vh;
            margin: 1vh 0;
            border-radius: 6px;
            border: 1px solid #DADADA;
            font-size: 12px;
            padding: 3px;
        }

        .el-dialog__body {
            padding: 10px !important;

            h5 {
                font-size: 14px;
                color: #000;
                text-align: center;

            }

            .title {
                // height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 1px 0;

                P:nth-child(1) {
                    i {
                        background: green;
                        border-radius: 50%;
                        padding: 2px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    padding: 2px 6px;
                    flex:none;
                    font-size: 12px;
                    // width: 40%;
                    // height: 100%;
                    background: #7b7979;
                    border-radius:30px;
                    color: #fff;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }

                P:nth-child(2) {
                    i {
                        background: red;
                        border-radius: 50%;
                        padding: 2px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    padding: 2px 6px;
                    flex:none;
                    font-size: 12px;
                    // width: 40%;
                    // height: 100%;
                    background: #7b7979;
                    border-radius:30px;
                    color: #fff;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }
                P:nth-child(3) {
                    i {
                        background: red;
                        border-radius: 50%;
                        padding: 2px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    padding: 2px 6px;
                    flex:none;
                    font-size: 12px;
                    // width: 40%;
                    // height: 100%;
                    background: #7b7979;
                    border-radius:30px;
                    color: #fff;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                }
            }

            input {
                width: 300px;
                height: 40px;
                border-radius: 30px;
                padding: 5px;
                font-size: 12px;
                border: 1px solid #ccc;
                text-align: center;
                margin: 4px 0;
            }

            .dhtitle {
                font-size: 12px;
                text-align: center;
            }

            .createBtn {
                text-align: center;

                button {
                    width: 130px;
                    border-radius: 30px;
                    background: url(../assets//image//loginBtn.png) 37% 49% no-repeat;
                    background-repeat: no-repeat;
                    color: white;
                    margin-top: 10px;
                    // background-size: 100% 130%;
                }
            }

        }

    }
}

.outbox {
    .el-dialog {
        --el-dialog-width: 150px !important;
        --el-dialog-padding-primary: 9px;
        display: flex;
        position: fixed;
        right: 0;

        header {
            display: none !important;
        }

        .el-dialog__body {
            width: 100px;
            text-align: center;
            height: 10px !important;
            display: flex;
            align-items: center;
            justify-content: center;

        }

    }
}
</style>