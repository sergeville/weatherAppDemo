#!/usr/bin/env node

/**
 * OpenWeatherMap API Connection Test
 *
 * This script tests if your API key is working correctly.
 * Run: node test-api.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local file
function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');

  if (!fs.existsSync(envPath)) {
    console.error('❌ Error: .env.local file not found!');
    console.log('📝 Create a .env.local file with your API key first.');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');

  const env = {};
  lines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      env[key.trim()] = value;
    }
  });

  return env;
}

// Test API connection
async function testWeatherAPI() {
  console.log('\n🌤️  OpenWeatherMap API Connection Test\n');
  console.log('━'.repeat(50));

  // Load environment variables
  const env = loadEnv();
  const apiKey = env.VITE_WEATHER_API_KEY;

  // Check if API key exists
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.log('\n❌ No API key found!');
    console.log('\n📋 Steps to fix:');
    console.log('   1. Get a free API key from https://openweathermap.org/api');
    console.log('   2. Add it to .env.local:');
    console.log('      VITE_WEATHER_API_KEY=your_actual_key_here');
    console.log('   3. Run this test again\n');
    process.exit(1);
  }

  console.log(`\n🔑 API Key found: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`);

  // Test location: Notre-Dame-du-Laus, QC
  const lat = 46.0833;
  const lon = -75.6333;

  console.log(`\n📍 Testing location: Notre-Dame-du-Laus, QC`);
  console.log(`   Coordinates: ${lat}, ${lon}`);

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  console.log('\n⏳ Connecting to OpenWeatherMap API...\n');

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();

      console.log('❌ API Request Failed!\n');
      console.log(`Status: ${response.status} ${response.statusText}`);
      console.log(`Error: ${errorData.message}`);

      if (response.status === 401) {
        console.log('\n💡 Common causes:');
        console.log('   • API key is invalid');
        console.log('   • API key not activated yet (wait 10-15 minutes)');
        console.log('   • Extra spaces in the API key');
      }

      console.log('\n📝 Double-check your API key at:');
      console.log('   https://home.openweathermap.org/api_keys\n');
      process.exit(1);
    }

    const data = await response.json();

    console.log('✅ API Connection Successful!\n');
    console.log('━'.repeat(50));
    console.log('\n📊 Current Weather Data:\n');
    console.log(`   Location: ${data.name}, ${data.sys.country}`);
    console.log(`   Weather: ${data.weather[0].main} - ${data.weather[0].description}`);
    console.log(`   Temperature: ${data.main.temp}°C (feels like ${data.main.feels_like}°C)`);
    console.log(`   Humidity: ${data.main.humidity}%`);
    console.log(`   Wind Speed: ${data.wind.speed} m/s`);
    console.log(`   Pressure: ${data.main.pressure} hPa`);

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    console.log(`   Sunrise: ${sunrise}`);
    console.log(`   Sunset: ${sunset}`);

    console.log('\n━'.repeat(50));
    console.log('\n🎉 Success! Your API key is working perfectly!');
    console.log('   You can now use the weather app with live data.\n');
    console.log('💡 To start the app: npm run dev\n');

  } catch (error) {
    console.log('❌ Connection Error!\n');
    console.log(`Error: ${error.message}`);
    console.log('\n💡 Possible issues:');
    console.log('   • No internet connection');
    console.log('   • Firewall blocking the request');
    console.log('   • Network timeout\n');
    process.exit(1);
  }
}

// Run the test
testWeatherAPI().catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});
