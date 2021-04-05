import { ref } from 'vue'

interface User {
  name: string,
  email: string,
  password: string,
  password2: string,
  role: string

}
export const userRegist = ref<User>({
  name: "",
  email: "",
  password: "",
  password2: "",
  role: ""
})
interface RegisterRules {
  name: ({
    required: boolean;
    message: string;
    trigger: string;
  } | {
    min: number;
    max: number;
    message: string;
    trigger: string;
    required?: undefined;
  })[];
  email: ({
    required: boolean;
    message: string;
    trigger: string;
  })[];
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
  })[];
  password2: ({
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
  } | {
    validator: (rule: RegisterRules, value: string, callback: any) => void,
    trigger: string
  })[];

}
// 校验密码
const validatePass = (rule: RegisterRules, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== userRegist.value.password) {
    callback(new Error('两次密码不一样'));
  } else {
    callback();
  }
};
export const registRules = ref<RegisterRules>({
  name: [
    {
      required: true,
      message: "请输入正确用户名",
      trigger: "blur",
    },
    {
      min: 2,
      max: 10,
      message: "长度在2到30个字符之间",
      trigger: "blur",
    },
  ],
  email: [{
    required: true,
    message: "请输入正确邮箱名",
    trigger: "blur",
  },],
  password: [
    {
      required: true,
      message: "密码输入错误",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "密码长度错误",
      trigger: "blur",
    },
  ],
  password2: [
    {
      required: true,
      message: "密码输入错误",
      trigger: "blur",
    },
    {
      min: 6,
      max: 30,
      message: "密码长度错误",
      trigger: "blur",
    },
    { validator: validatePass, trigger: 'blur' }
  ],

})

