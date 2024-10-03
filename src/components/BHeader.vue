<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Week 5)</router-link>
        </li>

        <li class="nav-item" v-if="isAuthenticated && userRole === 'user'">
          <router-link to="/user-dashboard" class="nav-link" active-class="active">User Dashboard</router-link>
        </li>

        <li class="nav-item" v-if="isAuthenticated && userRole === 'admin'">
          <router-link to="/admin-dashboard" class="nav-link" active-class="active">Admin Dashboard</router-link>
        </li>


        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/Firelogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">CountBookAPI</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/BookCount" class="nav-link" active-class="active">Get Book Count</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Weather" class="nav-link" active-class="active">Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>

        <li class="nav-item" v-if="isAuthenticated">
          <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase auth functions
import { useRouter } from 'vue-router';

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
const userRole = ref(localStorage.getItem('userRole')); // Fetch the user role from localStorage
const auth = getAuth();
const router = useRouter();

const logout = async () => {
  try {
    await signOut(auth); // Sign out from Firebase
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole'); // Remove the stored user role
    isAuthenticated.value = false;
    userRole.value = null;
    router.push('/'); // Redirect to the home page or login page
  } catch (error) {
    console.error("Sign out error:", error);
  }
};
</script>

<style scoped>
/* Add any additional styling for the navigation */
</style>
