<template>
    <div>
      <h1>Book Count API</h1>
      <!-- Display JSON data in a formatted way -->
      <pre v-if="bookCountData">{{ bookCountData }}</pre>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CountBookAPI',
    data() {
      return {
        bookCountData: null, // Variable to store the JSON data
      };
    },
    methods: {
      async getBookCountAPI() {
        try {
          const response = await axios.get('https://countbooks-5l7fdaf76a-uc.a.run.app');
          this.bookCountData = response.data; // Store the fetched data
        } catch (error) {
          console.error('Error fetching book count data:', error);
        }
      },
    },
    mounted() {
      // Automatically call the API when the page loads
      this.getBookCountAPI();
    },
  };
  </script>
  
  <style scoped>
  /* Add some basic styling */
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  pre {
    background-color: #f4f4f4;
    padding: 15px;
    border-radius: 5px;
  }
  </style>
  