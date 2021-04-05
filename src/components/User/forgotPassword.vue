<template>
  <el-row :gutter="20">
    <el-col :span="6" :offset="8"
      ><div class="grid-content bg-purple">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="用户邮箱"
            :rules="[
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input v-model="email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit-btn" @click="forgetPass()"
              >找回密码</el-button
            >
          </el-form-item>
        </el-form>
      </div></el-col
    >
  </el-row>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "forgotPassword",
  setup() {
    // 忽略类型检测
    // @ts-ignore
    const { ctx } = getCurrentInstance();
    const email = ref<string>("");
    const forgetPass = async () => {
      await ctx.$axios
        .post("/api/v1/auth/forgotpassword", {
          email: email.value,
        })
        .then((res: any) => {
          ElMessage.success({
            message: "短信发送成功，请注意查收",
            type: "success",
          });
        })
        .catch((err: any) => {
          ElMessage.error("发送失败");
        });
    };
    return {
      forgetPass,
      email,
    };
  },
});
</script>
<style  scoped>
.el-row {
  margin-top: 220px;
}
.el-col {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.submit-btn {
  width: 100%;
}
</style>