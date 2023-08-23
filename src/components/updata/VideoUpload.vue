<!-- <template>
<div class='Video upload'>
  </div>
</template>
<script setup>
</script>
<style lang='scss'></style> -->


<!-- <template>
  <div class='codeCheck'>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="" prop="account">
        <el-input v-model="ruleForm.account" placeholder="请输入手机号">
          <template #prepend>手机号</template>
        </el-input>
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


      <button class="submitBtn" @click="submitForm(ruleFormRef)">
        登陆/注册
      </button>
    </el-form>
  </div>
</template> -->
<!-- <script lang="ts">
import { reactive, ref, defineComponent } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import Api from "@/api";
import { RootState } from '@/store/stateModel';
import { useStore, Store } from 'vuex';

export default defineComponent({
  name: "loginComponent",
  setup() {
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      account: '',
      code: '',
      companyId: ""
    });
    const isDisabled = ref(false);
    const timer = ref();
    const getCodeText = ref('获取验证码');

    return {
      ruleFormRef,
      ruleForm,
      isDisabled,
      timer,
      getCodeText

    }

  },
  methods: {
    //获取登陆方式
    async getlogin() {
      let account = '19526787486'
      const result = await Api.Application.getLoginList(account)
    },
    validatePass1(rule: any, value: string, callback: any) {
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
    }
  },
  mounted() {
    this.getlogin()
  }

})
// eslint-disable-next-line quotes

//获取登陆方式
// const getlogin = async () => {
//     let account = '19526787486'
//     const result = await Api.Application.getLoginList(account)
//     // console.log(result)
// }
// getlogin()
// const ruleFormRef = ref<FormInstance>();
//表单 数据定义
// const ruleForm = reactive({
//     account: '',
//     code: '',
//     companyId: ""
// });
// const isDisabled = ref(false);
// const timer = ref();
// const getCodeText = ref('获取验证码');

//验证码输入事件
// const validatePass1 = (rule: any, value: string, callback: any) => {
//     if (value === '') {
//         callback(new Error('验证码不能为空'));
//     } else {
//         if (ruleForm.code !== '') {
//             if (!ruleFormRef.value) {
//                 return;
//             }
//             ruleFormRef.value.validateField('checkPass', () => null);
//         }
//         callback();
//     }
// };

//手机号输入事件
const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('手机号不能为空'));
  } else if (!/^\d{11}$/.test(value)) {
    callback(new Error('请输入正确的手机号码'));
  } else {
    isDisabled.value = true;
    callback();
  }
};
let count = 60;
//获取验证码
const getCode = async () => {
  if (!isDisabled.value) {
    return;
  }
  ruleForm.code = '';
  isDisabled.value = true;
  let result = await Api.Application.getmessCode(ruleForm.account, 'login-phone-code')
  // console.log(result)
  isDisabled.value = false;
  timer.value = setInterval(() => {
    if (count > 0) {
      count--;
      getCodeText.value = `倒计时${count}s`;
      return;
    } else {
      getCodeText.value = '获取验证码';
      timer.value = null;
    }
  }, 1000);
}

const store: Store<RootState> = useStore();
store.state.user.token = ('123')
// console.log(store)

//正则事件
const rules = reactive<FormRules<typeof ruleForm>>({
  account: [{ validator: validatePass, trigger: ['change', 'blur'] }],
  code: [{ validator: validatePass1, trigger: ['change', 'blur'] }]
});



//登陆事件
// const login = async () => {

//     store.dispatch('user/login', { type: 'code', phone: ruleForm.account, code: ruleForm.code });

// }

const loginByCode = async (account: string, code: string, companyId: string): Promise<void> => {
  store.dispatch('user/login', { type: 'code', phone: account, code: code, companyId: companyId });
};
// 提交按钮点击事件
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.validate((valid) => {
    if (!valid) {
      // return;
      // login().then(res => {
      // console.log(res)
      //     if (!res.error) {
      //         store.state.user.company = res.data.company
      //     }
      // })
      await loginByCode(ruleForm.account, ruleForm.code, ruleForm.companyId)
    } else {
      return false
    }


  });

};



</script> -->

<!-- <style lang='less'>
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
    font-size: 14px;
    font-weight: bold;
    color: #000;
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

}

.el-form-item.is-error .el-input__wrapper {
  box-shadow: none;
}

.submitBtn {
  margin-top: 10%;
  display: flex;
  align-items: center;
  display: block;
  width: 100%;
  height: 5vh;
  background: url(../../assets/image/loginBtn.png);
  background-repeat: no-repeat;
  background-size: 100% 130%;

  border: 0;
  color: white;
  font-size: 14px;
}
</style> -->