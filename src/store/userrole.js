// src/store/userrole.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    return {
      user: savedUser ? savedUser.phoneNumber : null,
      role: savedUser ? savedUser.role : null,
      username: savedUser ? savedUser.Name : '',
      
      // 存储 Token
      tokens: {
        admin: 'admin-permanent-token', // 替换为实际的 admin Token
        cdcStaff: 'cdcStaff-permanent-token', // 替换为实际的 cdcStaff Token
        nurse: 'nurse-permanent-token', // 替换为实际的 nurse Token
      },
      currentToken: savedUser ? savedUser.token : null,
    };
  },
  actions: {
    /**
     * 用户登录（在当前阶段用于设置角色和 Token）
     * @param {Object} payload - 登录信息
     * @param {string} payload.role - 用户角色 ('admin', 'cdcStaff', 'nurse')
     */
    setRole(payload) {
      this.role = payload.role;
      this.currentToken = this.tokens[payload.role];
      localStorage.setItem('user', JSON.stringify({
        phoneNumber: this.user,
        role: this.role,
        Name: this.username,
        token: this.currentToken,
      }));
    },
    /**
     * 用户登出
     */
    logout() {
      this.user = null;
      this.role = null;
      this.username = '';
      this.currentToken = null;
      localStorage.removeItem('user');
    },
    /**
     * 检查用户是否为护士
     * @returns {boolean}
     */
    isNurse() {
      return this.role === 'nurse';
    },
  }
});
