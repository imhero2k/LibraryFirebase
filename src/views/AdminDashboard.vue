<template>
    <div class="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. From here, you can manage users, monitor donations, and oversee system activities.</p>
      
      <div class="admin-actions">
        <h2>Manage Users</h2>
        <ul>
          <li v-for="user in users" :key="user.id">
            {{ user.name }} - {{ user.role }}
            <button @click="removeUser(user.id)">Remove</button>
          </li>
        </ul>
  
        <h2>Recent Donations</h2>
        <ul>
          <li v-for="donation in recentDonations" :key="donation.id">
            {{ donation.amount }} donated to {{ donation.charity }} by {{ donation.user }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const users = ref([
    { id: 1, name: 'John Doe', role: 'user' },
    { id: 2, name: 'Jane Smith', role: 'moderator' }
  ]);
  
  const recentDonations = ref([
    { id: 1, user: 'John Doe', charity: 'Charity A', amount: '$50' },
    { id: 2, user: 'Jane Smith', charity: 'Charity B', amount: '$30' }
  ]);
  
  const removeUser = (userId) => {
    console.log(`Removing user with ID: ${userId}`);
    // Add logic to remove user from the system
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    padding: 20px;
  }
  .admin-actions {
    margin-top: 20px;
  }
  button {
    margin-left: 10px;
  }
  </style>
  