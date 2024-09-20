<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-title">修改密码</div>
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="username">原密码</label>
          <input
            v-model="username"
            type="text"
            id="username"
            placeholder="······"
            maxlength="11"
            @input="validateAndFormatUsername"
            disabled
          />
          <span v-if="usernameError" class="error-message">{{ usernameError }}</span>
        </div>

        <div class="input-group">
          <label for="password">新密码</label>
          <div class="password-wrapper">
            <input
              :type="passwordFieldType"
              v-model="password"
              id="password"
              placeholder="输入新密码"
              maxlength="8"
              @input="validateAndFormatPassword"
            />
            <span class="eye-icon" @click="togglePasswordVisibility('password')">
              <img :src="passwordFieldType === 'password' ? passwordClose : passwordOpen">
            </span>
            <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
          </div>
        </div> 
        
        <div class="input-group">
          <label for="confirm-password">确认密码</label>
          <div class="password-wrapper">
            <input
              :type="confirmPasswordFieldType"
              v-model="confirmPassword"
              id="confirm-password"
              placeholder="再次输入新密码"
              maxlength="8"
              @input="validateAndFormatConfirmPassword"
            />
            <span class="eye-icon" @click="togglePasswordVisibility('confirm')">
              <img :src="confirmPasswordFieldType === 'password' ? passwordClose : passwordOpen">
            </span>
            <span v-if="confirmPasswordError" class="error-message">{{ confirmPasswordError }}</span>
          </div>
        </div>

        <button type="button" @click="handleSubmit">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import passwordOpen from '@/assets/password_close.png';
import passwordClose from '@/assets/password_open.png';

export default {
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const passwordFieldType = ref('password'); 
    const confirmPasswordFieldType = ref('password'); 
    const usernameError = ref('');
    const passwordError = ref('');
    const confirmPasswordError = ref('');

    const togglePasswordVisibility = (type) => {
      if (type === 'password') {
        passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
      } else if (type === 'confirm') {
        confirmPasswordFieldType.value = confirmPasswordFieldType.value === 'password' ? 'text' : 'password';
      }
    };

    const handleSubmit = () => {
      console.log("called");
      if (password.value === confirmPassword.value) {
        if (validatePassword(password.value)) {
          ElMessage.success('修改密码成功');

        } else {
          ElMessage.error('密码不符合要求');
        }
      } else {
        confirmPasswordError.value = '两次密码输入不一致';
      }
    };

    const validatePassword = (password) => {
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
      return passwordPattern.test(password);
    };

    const validateAndFormatUsername = () => {
      const phonePattern = /^[1-9]\d{0,10}$/;
      if (!phonePattern.test(username.value)) {
        username.value = username.value.slice(0, -1);
      }
      usernameError.value = username.value.length === 11 && phonePattern.test(username.value)
        ? ''
        : '请输入正确的用户名';
    };

    const validateAndFormatPassword = () => {
      passwordError.value = validatePassword(password.value)
        ? ''
        : '密码必须包含8位字符，包括大小写字母、数字和特殊符号';
    };

    const validateAndFormatConfirmPassword = () => {
      confirmPasswordError.value = confirmPassword.value === password.value
        ? ''
        : '两次密码输入不一致';
    };

    const isSubmitDisabled = ref(true);
    const checkFormValidity = () => {
      isSubmitDisabled.value = !username.value || !password.value || !confirmPassword.value || usernameError.value || passwordError.value || confirmPasswordError.value;
    };

    return {
      username,
      password,
      confirmPassword,
      passwordFieldType,
      confirmPasswordFieldType,
      passwordOpen,
      passwordClose,
      usernameError,
      passwordError,
      confirmPasswordError,
      togglePasswordVisibility,
      handleSubmit,
      validateAndFormatUsername,
      validateAndFormatPassword,
      validateAndFormatConfirmPassword,
      isSubmitDisabled,
      checkFormValidity,
    };
  }
};
</script>

<style scoped>
.login-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%;
}

.login-container {
  /* background-color: #FFFFFF; */
  padding: 50px;
  border-radius: 8px;
  width: 500px;
  height: auto;
  text-align: center;
  position: relative;
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
#username{
  background-color: #F4F4F4 !important;
  color: #A6A6A6;
  font-size: 16px;
  border: 2px solid #F4F4F4;
}
label {
  color: #333333;
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

input[type="text"], input[type="password"] {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 10px;
  border: 1px solid #FFFFFF;
  border-radius: 4px;
  background-color: #FFFFFF;
  color: #333333;
  box-sizing: border-box;
  outline: none;
  transition: box-shadow 0.2s ease-in-out;
}

input::-webkit-input-placeholder {
        color: #A6A6A6;
        font-size: 14px;
}

input:focus {
  outline: none; 
  border: 1px solid #285AC8; 
  /* box-shadow: 1px 10px 20px rgba(56,56,56,0.05); */
}

.password-wrapper {
  position: relative;
}

.eye-icon {
  transform: scale(0.5) translateY(-50%);
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
}


button {
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: #285AC8;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow:0.8px 0.8px 24px 0.8px rgba(40,90,200,0.3);
}

button:hover {
  background-color: #1d45a5;
}

a {
  display: block;
  margin-top: 15px;
  color: #285AC8;
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
