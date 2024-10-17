<template>
  <div class="login-wrapper">
    <div class="container">
      <div class="login-container">
        <div class="login-title">登录</div>
        <form @submit.prevent="handleSubmit">
          <div class="input-group">
            <label for="phoneNumber">用户名</label>
            <input
              v-model="phoneNumber"
              type="text"
              id="phoneNumber"
              placeholder="手机号"
              maxlength="11"
              @input="validateAndFormatphoneNumber"
            />
            <span v-if="phoneNumberError" class="error-message">{{
              phoneNumberError
            }}</span>
          </div>
          <div class="input-group">
            <label for="password">密码</label>
            <div class="password-wrapper">
              <input
                :type="passwordFieldType"
                v-model="password"
                id="password"
                placeholder="默认为身份证后六位"
                maxlength="8"
                @input="validateAndFormatPassword"
              />
              <span class="eye-icon" @click="togglePasswordVisibility">
                <img
                  :src="
                    passwordFieldType === 'password'
                      ? passwordClose
                      : passwordOpen
                  "
                />
              </span>
            </div>
            <span v-if="passwordError" class="error-message">{{
              passwordError
            }}</span>
          </div>
          <button
            @click="handleSubmit"
            type="button"
          >
            提交
          </button>
          <a href="#" @click.prevent="resetPassword">重置密码</a>
        </form>
      </div>
      <div class="title">
        <div>--- 川藏铁路突发传染病自主判别和现场调查管理系统 ---</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userrole"; // 引入用户角色 store
import { ElMessage } from 'element-plus'; 
import passwordOpen from "../../assets/password_close.png";
import passwordClose from "../../assets/password_open.png";
import { useTagsStore } from "@/store/tags.js";
export default {
  setup() {
    const router = useRouter();
    const userStore = useUserStore(); 
    const phoneNumber = ref("");
    const password = ref("");
    const passwordFieldType = ref("password");
    const phoneNumberError = ref("");
    const passwordError = ref("");
    const tagStore = useTagsStore();

    const togglePasswordVisibility = () => {
      passwordFieldType.value =
        passwordFieldType.value === "password" ? "text" : "password";
    };

    // 用户数组
    const users = {
      19357907217: { name:"张三", password: "123456", role: "admin" },
      13330656624: { name:"李四", password: "123456", role: "nurse" },
      19508191094: { name:"王五", password: "123456", role: "cdc" }
    };

const handleSubmit = () => {
  const user = users[phoneNumber.value];
  if (
    user &&
    user.password === password.value &&
    phoneNumber.value &&
    password.value &&
    !phoneNumberError.value &&
    !passwordError.value
  ) {
    const userData = {
      phoneNumber: phoneNumber.value,
      role: user.role,
      name: user.name, 
    };
    userStore.login(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // 保存到 localStorage
    tagStore.removeAllTag (); // 避免不同登录时出现其他角色的tags
    router.push("/user/password");
    ElMessage.success("登录成功");
  
  } else {
     ElMessage.error("账号或密码错误");
  }
};

    const resetPassword = () => {
      password.value = phoneNumber.value.slice(-6);
      alert("密码已重置为身份证后六位");
    };

    const validateAndFormatphoneNumber = () => {
      const phonePattern = /^[1-9]\d{0,10}$/; // 允许最多11位字符
      if (!phonePattern.test(phoneNumber.value)) {
        phoneNumber.value = phoneNumber.value.slice(0, -1); // 删除最后一个无效字符
      }
      phoneNumberError.value =
        phoneNumber.value.length === 11 && phonePattern.test(phoneNumber.value)
          ? ""
          : "请输入正确的用户名";
    };

    const validateAndFormatPassword = () => {
      const passwordPattern = /^\d{0,8}?$/; // 允许前五位是数字，最后一位是X或数字
      if (!passwordPattern.test(password.value)) {
        password.value = password.value.slice(0, -1); // 删除最后一个无效字符
      }
      passwordError.value =
        password.value.length === 16 && passwordPattern.test(password.value)
          ? ""
          : "";
    };

    return {
      phoneNumber,
      password,
      passwordFieldType,
      passwordOpen,
      passwordClose,
      phoneNumberError,
      passwordError,
      togglePasswordVisibility,
      handleSubmit,
      resetPassword,
      validateAndFormatphoneNumber,
      validateAndFormatPassword,
    };
  },
};

</script>

<style scoped>

.login-wrapper {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../images/background_login.jpg");
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.login-wrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
}

.title {
  margin-top: 40px;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-left: -35px;
}

.login-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  height: 400px;
  text-align: center;
  position: relative;
  left: 16%;
}

.login-title {
  color: #333333;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 30px;
  text-align: left;
}

label {
  color: #333333;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 10px;
  border: 1px solid #fafafa;
  border-radius: 4px;
  background-color: #fafafa;
  color: #333333;
  box-sizing: border-box;
  outline: none;
  transition: box-shadow 0.2s ease-in-out;
}

input::-webkit-input-placeholder {
  color: #a6a6a6;
  font-size: 14px;
}

input:focus {
  outline: none;
  border: 1px solid #285ac8;
  /* box-shadow: 1px 10px 20px rgba(56,56,56,0.05); */
}

.password-wrapper {
  position: relative;
}

.eye-icon {
  transform: scale(0.5) translateY(-50%);
  position: absolute;
  right: 10px;
  top: 35%;
  cursor: pointer;
}

button {
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: #285ac8;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0.8px 0.8px 24px 0.8px rgba(40, 90, 200, 0.3);
}

button:hover {
  background-color: #1d45a5;
}

a {
  display: block;
  margin-top: 15px;
  color: #285ac8;
  text-decoration: none;
  font-size: 14px;
}

a:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

</style>
