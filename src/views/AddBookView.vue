<template>
    <div>
      <h1>Add a New Book</h1>
      
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN (number only):</label>
          <input id="isbn" v-model="isbn" type="text" required />
        </div>
        <div>
          <label for="title">Title:</label>
          <input id="title" v-model="title" type="text" required />
        </div>
        <div>
          <label for="author">Author:</label>
          <input id="author" v-model="author" type="text" required />
        </div>
        <div>
          <label for="publishedDate">Published Date:</label>
          <input id="publishedDate" v-model="publishedDate" type="date" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
      
      <h2>Book List</h2>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.title }} by {{ book.author }}
          <button @click="editBook(book.id)">Edit</button>
          <button @click="deleteBook(book.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
  
  const db = getFirestore();
  
  const isbn = ref('');
  const title = ref('');
  const author = ref('');
  const publishedDate = ref('');
  const books = ref([]);
  
  const addBook = async () => {
    try {
      await addDoc(collection(db, 'books'), {
        isbn: isbn.value,
        title: title.value,
        author: author.value,
        publishedDate: publishedDate.value
      });
      isbn.value = '';
      title.value = '';
      author.value = '';
      publishedDate.value = '';
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };
  
  const fetchBooks = async () => {
    try {
      const q = query(collection(db, 'books'), orderBy('publishedDate', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  
  const editBook = async (id) => {
    const newTitle = prompt('Enter new title:');
    if (newTitle) {
      try {
        const bookRef = doc(db, 'books', id);
        await updateDoc(bookRef, { title: newTitle });
        fetchBooks(); // Refresh the book list
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }
  };
  
  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, 'books', id));
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };
  
  // Fetch books on component mount
  onMounted(fetchBooks);
  </script>
  
  <style scoped>
  /* Add any additional styling for the form and book list */
  </style>
  