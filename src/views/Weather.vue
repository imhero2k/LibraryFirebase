<template>
    <div>
      <h1>Weather Check</h1>
      <!-- Input field for city name -->
      <input v-model="city" placeholder="Enter city name" />
      <!-- Button to search for weather data by city -->
      <button @click="searchByCity">Search</button>
      <!-- Button to get weather data for current location -->
      <button @click="getCurrentLocation">Use Current Location</button>
  
      <main>
        <!-- Display weather data if available -->
        <div v-if="weatherData">
          <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <div>
            <!-- Display the weather icon -->
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <!-- Display weather description -->
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  const apikey = "42506e8480b925c15edb913d8812c89c";
  
  export default {
    name: "WeatherView",
    data() {
      return {
        city: "", // Holds the name of the city input by the user
        weatherData: null, // Stores the weather data returned by the API
      };
    },
    computed: {
      // Computed property to convert temperature from Kelvin to Celsius
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273.15)
          : null;
      },
      // Computed property to generate the icon URL for the weather data
      iconUrl() {
        return this.weatherData
          ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    methods: {
      // Method to search weather by city
      async searchByCity() {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url); // Fetch weather data using the API
      },
      // Method to get weather data for the user's current location
      async getCurrentLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
              await this.fetchWeatherData(url);
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      },
      // Method to fetch weather data from the API
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data; // Store the response in weatherData
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add some basic styling */
  h1 {
    font-size: 2em;
    margin-bottom: 1rem;
  }
  
  input {
    padding: 0.5rem;
    font-size: 1em;
    margin-right: 0.5rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    font-size: 1em;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  main {
    margin-top: 2rem;
  }
  
  h2 {
    font-size: 1.5em;
  }
  
  p {
    font-size: 1.2em;
    margin: 0;
  }
  
  img {
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
  }
  </style>
  