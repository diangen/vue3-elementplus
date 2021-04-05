import { ref } from 'vue'

interface User {
  account: string,
  password: string
}
export const userLogin = ref<User>({
  account: "",
  password: ""
})
interface Rules {
  email: {
    type: string;
    message: string;
    required: boolean;
    trigger: string;
  }[];
  password: ({
    required: boolean;
    message: string;
    trigger: string;
    min?: undefined;
    max?: undefined;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
    required?: undefined;
  })[];
}
export const rules = ref<Rules>({
  email: [
    {
      type: "string",
      message: "邮箱输入错误",
      required: true,
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码输入错误",
      trigger: "blur",
    },
    {
      min: 6,
      max: 10,
      message: "请正确输入密码",
      trigger: "blur",
    },
  ],
})