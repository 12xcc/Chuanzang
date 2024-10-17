import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return {
      phoneNumber: savedUser ? savedUser.phoneNumber : null,
      role: savedUser ? savedUser.role : null,
      name: savedUser ? savedUser.name : '', 
    };
  },
  actions: {
    login({ phoneNumber, role, name }) {
      this.phoneNumber = phoneNumber;
      this.role = role;
      this.name = name;
    },
    logout() {
      this.phoneNumber = null;
      this.role = null;
      this.name = '';
      localStorage.removeItem('phoneNumber');
    },
    isNurse() {
      return this.role === 'nurse'; 
    },
  }  
});
