<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup() {
      const username = ref('')
      const password = ref('')
      const error = ref('')
  
      const login = () => {
        if (username.value === 'admin' && password.value === 'password') {
          localStorage.setItem('isAuthenticated', 'true')
          error.value = ''
          this.$router.push('/')
        } else {
          error.value = 'Invalid username or password'
        }
      }
  
      return { username, password, error, login }
    }
  }
  </script>
  