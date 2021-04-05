<template>
  <el-row :gutter="20">
    <el-col :span="6" :offset="8"
      ><div class="grid-content bg-purple">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="重置密码"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
              {
                type: 'password',
                message: '请输入正确格式密码',
                trigger: ['blur', 'change'],
              },
              {
                min: 6,
                max: 30,
                message: '请输入正确格式密码',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input
              v-model="password"
              show-password
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit-btn" @click="registPass()"
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
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "resetPassword",
  setup() {
    // 忽略类型检测
    // @ts-ignore
    const { ctx } = getCurrentInstance();
    // 获取路由中id route.params.id
    const route = useRoute();
    // 进行路由操作
    const router = useRouter();
    const password = ref<string>("");
    const registPass = async () => {
      const res = await ctx.$axios.put(
        "/apil/v1/auth/resetpassword/" + route.params.id,
        {
          password: password.value,
        }
      );
      if(res.data.success){
        router.push("/")
      }
    };
    return {
      registPass,
      password,
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