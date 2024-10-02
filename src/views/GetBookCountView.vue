<template>
    <div>
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
  
      <div v-if="count !== null">
        <p>Total number of books: {{ count }}</p>
      </div>
      <div v-else>
        <p>Error: Could not fetch the book count.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        count: null,
        error: false
      };
    },
    methods: {
      async getBookCount() {
        try {
          const response = await axios.get('https://countbooks-5l7fdaf76a-uc.a.run.app'); // Replace 'YOUR_URL_HERE' with the actual URL
          this.count = response.data.count;
          this.error = false;
        } catch (error) {
          this.count = null;
          this.error = true;
          console.error('Error fetching book count:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  button {
    margin-top: 20px;
  }
  </style>
  