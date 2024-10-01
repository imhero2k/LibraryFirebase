<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    
    <!-- Role selection -->
    <p>
      <label for="role">Select Role:</label>
      <select v-model="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </p>
    
    <p><button @click="register">Register</button></p>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  import { db } from '../firebase/init'; // Adjust the path to your init file
  import { doc, setDoc } from 'firebase/firestore';
  
  const email = ref('');
  const password = ref('');
  const role = ref('user'); // Default role is 'user'
  const router = useRouter();
  const auth = getAuth();
  
  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
  
      // Save user data with role in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role.value,
      });
  
      console.log('Firebase registration successful!');
      router.push('/FireLogin');
    } catch (error) {
      console.error('Error during registration:', error.code);
    }
  };
  </script>
  