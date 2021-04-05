<template>
  <el-form
    :model="userLogin"
    :rules="rules"
    ref="loginForm"
    label-width="80px"
    status-icon
    class="loginForm sign-in-form"
    hide-required-asterisk
    show-message
  >
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userLogin.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="userLogin.password"
        placeholder="请输入密码"
        show-password
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="submitForm('loginForm')"
        >登录</el-button
      >
    </el-form-item>
    <div class="tiparea">
      <p>
        忘记密码
      <router-link to="./forgotPassword">找回密码</router-link>
      </p>
    </div>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "loginForm",
  props: {
    userLogin: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    // 忽略类型检测
    // @ts-ignore
    const { ctx } = getCurrentInstance();
    // 触发登陆方法
    const router = useRouter();
    const submitForm = (fromName: string) => {
      ctx.$refs[fromName].validate((valid: boolean) => {
        if (valid) {
          console.log(props.userLogin)
          ctx.$axios
            .post("/api/v1/auth/login", props.userLogin)
            .then((res: any) => {
              const { toKen } = res.data;
              localStorage.setItem("msToken", toKen);
              ElMessage.success({
                message: "登陆成功",
                type: "success",
              });
              router.push("/");
            })
            .catch((err: any) => {
              ElMessage.error("请确保邮箱和密码正确");
            });
        } else {
          return false;
        }
      });
    };
    return {
      submitForm,
    };
  },
});
</script>
<style scoped>
/* form */
.loginForm {
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  position: relative;
  top: 300px;
}

.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>