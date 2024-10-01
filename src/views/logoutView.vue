<template>
    <div>
      <h1>Logout</h1>
      <p>You have been logged out. Redirecting to the home page...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getAuth, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const auth = getAuth();
  
  onMounted(async () => {
    try {
      const user = auth.currentUser;
      console.log('Current user before sign out:', user.email);
      await signOut(auth);
      console.log('User signed out successfully');
  
      // Check if there is a current user after sign out

  
      // Redirect to home page
    } catch (error) {
      console.error('Sign out error:', error);
    }
  });
  </script>
  