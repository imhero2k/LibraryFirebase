<template>
    <div>
      <h1>Sign in</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p> <!-- Fix: "password" typo -->
      <p><button @click="signin">Sign In</button></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore imports
  
  const email = ref("");
  const password = ref("" );
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore(); // Initialize Firestore
  
  const signin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
  
      console.log("Firebase login successful!");
      console.log("Signed-in user:", user.email);
  
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userRole = userDoc.exists() ? userDoc.data().role : null;
  
      console.log("User role:", userRole);
  
      // Redirect based on user role
      if (userRole === "admin") {
        router.push("/admin-dashboard");
      } else if (userRole === "moderator") {
        router.push("/moderator-dashboard");
      } else {
        router.push("/user-dashboard");
      }
  
    } catch (error) {
      console.log("Error code:", error.code);
    }
  };
  </script>
  