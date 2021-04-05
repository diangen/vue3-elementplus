<template>
  <el-form
    :model="userRegist"
    :rules="registRules"
    ref="registForm"
    label-width="80px"
    status-icon
    class="registerForm sign-up-form"
    hide-required-asterisk
    show-message
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="userRegist.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userRegist.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="userRegist.password"
        placeholder="请输入密码"
        show-password
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="password2">
      <el-input
        v-model="userRegist.password2"
        placeholder="请输入密码"
        show-password
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item label="选择身份">
      <el-select v-model="userRegist.role" placeholder="请选择身份">
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="用户" value="user"></el-option>
        <el-option label="游客" value="visitor"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        @click="handleRegister('registForm')"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "Regist",
  props: {
    userRegist: {
      type: Object,
      required: true,
    },
    registRules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    // 忽略类型检测
    // @ts-ignore
    const { ctx } = getCurrentInstance();
    // 触发登陆方法
    const router = useRouter(); // 获取路由的参数
    const handleRegister = (fromName: string) => {
      ctx.$refs[fromName].validate((valid: boolean) => {
        if (valid) {
          ctx.$axios
            .post("/api/v1/auth/register", props.userRegist)
            .then((res: any) => {
              ElMessage.success({
                message: "注册成功",
                type: "success",
              });
              router.push("./user");
            })
            .catch((err: any) => {
              ElMessage.error("注册失败");
            });
        } else {
          alert("error regist!!");
          return false;
        }
      });
    };
    return {
      handleRegister,
    };
  },
});
</script>
<style scoped>
/* form */
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
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