<template>
    <div class='codeCheck'>
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
            <el-form-item label="" prop="account">
                <el-input v-model="ruleForm.account" placeholder="请输入手机号">
                    <template #prepend>手机号</template>
                </el-input>
            </el-form-item>

            <el-form-item label="企业" v-if="iShowSelect">
                <el-select v-model="ruleForm.value" placeholder="请选择企业">
                    <el-option v-for="(v, i) in options?.company" :key="i" :label="v.name" :value="v.name"
                        @click="selectEnterprise(v.id)" />
                </el-select>
            </el-form-item>
            <el-form-item label="" prop="code">
                <el-input v-model="ruleForm.code" placeholder="请输入验证码">
                    <template #prepend>验证码</template>
                    <template #append>
                        <el-button @click="getCode" class="getCodeBtn" :aria-disabled="!isDisabled">
                            <font :style="isDisabled ? 'color:#000' : 'color:#ccc'">{{ getCodeText }}</font>
                        </el-button>
                    </template></el-input>
            </el-form-item>
            <el-button class="submitBtn" @click="submitForm(ruleFormRef)">
                登陆/注册

            </el-button>
            <div class="text">
                <el-checkbox v-model="isCheckBox" size="large" />
                <p>登录代表您已阅读并同意 <span>《隐私条款》</span> 和<span>《用户协议》</span></p>
            </div>

        </el-form>
    </div>
</template>
<script setup lang="ts">

// eslint-disable-next-line quotes
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import Api from '@/api';
import { debounce } from '../../utils/debounce.js';
import { RootState } from '@/store/stateModel';
import { useStore, Store } from 'vuex';

const ruleFormRef = ref<FormInstance>();
//表单 数据定义
const ruleForm = reactive({
    account: '',
    code: '',
    companyId: '',
    value: ''
});
import { ElMessage } from 'element-plus';
const options = ref([]);
const isDisabled = ref(false);
const timer = ref();
const getCodeText = ref('获取验证码');
const iShowSelect = ref(false);
const isCheckBox = ref(false);
//获取登陆方式
const getlogin = async () => {
    let account = ruleForm.account;
    const result = await Api.Application.getLoginList(account);

    options.value = result.data;
};


//验证码输入事件
const validatePass1 = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('验证码不能为空'));
    } else {
        if (ruleForm.code !== '') {
            if (!ruleFormRef.value) {
                return;
            }
            ruleFormRef.value.validateField('checkPass', () => null);
        }
        callback();
    }
};

//选择企业登陆
const selectEnterprise = (id: string) => {
    ruleForm.companyId = id;

    sessionStorage.setItem('companyId', id);
};

//手机号输入事件
const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
        callback(new Error('手机号不能为空'));
    } else if (!/^\d{11}$/.test(value)) {
        callback(new Error('请输入正确的手机号码'));
    } else {
        getlogin();
        isDisabled.value = true;
        callback();
        iShowSelect.value = true;
    }
};

let count = 60;
//获取验证码
const getCode = async () => {
    if (!isDisabled.value) {
        return;
    }
    ruleForm.code = '';
    isDisabled.value = false;
    let result = await Api.Application.getmessCode(ruleForm.account, 'login-phone-code');

    isDisabled.value = false;
    timer.value = setInterval(() => {
        if (count > 0) {
            count--;
            getCodeText.value = `倒计时${count}s`;
            return;
        } else {
            getCodeText.value = '获a取验证码';
            timer.value = null;
            isDisabled.value = true;

        }
    }, 1000);
};

const store: Store<RootState> = useStore();
//正则事件
const rules = reactive<FormRules<typeof ruleForm>>({
    account: [{ validator: validatePass, trigger: ['change', 'blur'] }],
    code: [{ validator: validatePass1, trigger: ['change', 'blur'] }]
});

// login()
const loginByCode = async (account: string, code: string, companyId: string): Promise<void> => {
    store.dispatch('user/login', { type: 'code', phone: account, code: code, companyId: companyId });
};
// 提交按钮点击事件
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) {
        return;
    }
    formEl.validate((valid) => {
        if (valid) {
            if (!isCheckBox.value) {
                ElMessage({
                    message: '请先同意《隐私协议》与《用户协议》',
                    type: 'warning'
                });
                return;
            }
            loginByCode(ruleForm.account, ruleForm.code, ruleForm.companyId);

        } else {
            return false;
        }
    });
};

</script>

<style lang='less'>
.codeCheck {
    .el-input-group {
        border: 1px solid #eee;
        border-radius: 30px;
        // padding: 3px 5px;
    }

    .demo-ruleForm {
        border: none;
        border-radius: 30px;
    }

    .el-input__wrapper {
        box-shadow: none;
    }

    //输入框 清除按钮 x
    .el-input__suffix-inner {
        display: none;
    }

    .el-input-group__prepend {
        background: #fff !important;
        padding: 0 13px;
        font-size: 12px;
        // font-weight: bold;
        color: #4a4444;
        box-shadow: none;
    }

    .el-form-item__content:nth-child(1) {
        margin-left: 0 !important;
    }

    .el-input-group__append {
        box-shadow: none;
    }

    .getCodeBtn span {
        border-left: 1px solid #ccc;
        padding-left: 20px;
        color: #ccc;
    }

    .el-input__inner {
        font-size: 12px !important;
    }

    .el-input__inner::placeholder:hover {
        color: #000 !important;
    }

    .getCodeBtn {
        background: #fff !important;
        border: none;
        font-family: SourceHanSansSCVF-Medium, SourceHanSansSCVF;
        font-weight: 500;
        color: #111D3A;
        font-size: 12px !important;
    }


    .el-input__wrapper.is-focus {
        box-shadow: none !important;
    }

    .el-input__wrapper:hover {
        box-shadow: none !important;

    }

    .el-form-item.is-error .el-input__wrapper {
        box-shadow: none;
    }

    .submitBtn {
        margin-top: 4%;
        display: flex;
        align-items: center;
        display: block;
        width: 100%;
        height: 5vh;
        background: url(../../assets/image/loginBtn.png);
        background-repeat: no-repeat;
        background-size: 100% 145%;
        border: 0;
        color: white;
        font-size: 14px;
    }

    .el-form-item__label {
        background: white;
        text-align: center;
        width: 68px !important;
        height: 32px;
        justify-content: flex-start !important;
        padding: 0 13px;
        font-size: 14px;
        font-weight: bold;
        color: #000;
        box-shadow: none
    }

    .el-form-item__content {
        .el-select {
            flex: 1;

        }

    }

}
</style>