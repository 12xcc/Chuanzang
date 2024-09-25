import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return {
      user: savedUser ? savedUser.phoneNumber : null,
      role: savedUser ? savedUser.role : null,
      username: savedUser ? savedUser.username : '', // 恢复用户名
    };
  },
  actions: {
    login({ phoneNumber, role, username }) {
      this.user = phoneNumber;
      this.role = role;
      this.username = username;
    },
    logout() {
      this.user = null;
      this.role = null;
      this.username = '';
      localStorage.removeItem('user'); // 清除 localStorage
    },
  },
});
