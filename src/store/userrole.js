import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return {
      user: savedUser ? savedUser.phoneNumber : null,
      role: savedUser ? savedUser.role : null,
      username: savedUser ? savedUser.Name : '', // 改为 Name
    };
  },
  actions: {
    login({ username, role, Name }) {
      this.user = username;
      this.role = role;
      this.username = Name;
    },
    logout() {
      this.user = null;
      this.role = null;
      this.username = '';
      localStorage.removeItem('user');
    },
    isNurse() {
      return this.role === 'nurse'; 
    },
  }  
});
