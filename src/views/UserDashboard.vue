<template>
    <div class="user-dashboard">
      <h1>Welcome to your Dashboard, {{ userDisplayName }}</h1>
      <p>This is your personal dashboard. Here you can see your recent activities, donations, and updates.</p>
      
      <div class="user-actions">
        <h2>Your Recent Donations</h2>
        <ul>
          <li v-for="donation in donations" :key="donation.id">
            {{ donation.amount }} donated to {{ donation.charity }} on {{ donation.date }}
          </li>
        </ul>
        
        <h2>Updates</h2>
        <p>You have {{ notifications.length }} new notifications.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const userDisplayName = ref("John Doe"); // Mock data - can be dynamically set based on user login info
  const donations = ref([
    { id: 1, charity: 'Charity A', amount: '$50', date: '2024-09-01' },
    { id: 2, charity: 'Charity B', amount: '$30', date: '2024-08-25' }
  ]);
  
  const notifications = ref([
    { id: 1, message: 'Your donation has been successfully processed.' },
    { id: 2, message: 'New personalized report available.' }
  ]);
  </script>
  
  <style scoped>
  .user-dashboard {
    padding: 20px;
  }
  .user-actions {
    margin-top: 20px;
  }
  </style>
  