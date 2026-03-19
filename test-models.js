const fs = require('fs');
const path = require('path');

// Extract GEMINI_API_KEY from .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const match = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : '';

if (!apiKey) {
  console.error('No API key found in .env.local');
  process.exit(1);
}

async function run() {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey);
    const data = await response.json();
    if (data.models) {
      const models = data.models.map(m => m.name).filter(n => n.includes('gemini'));
      console.log('Available Gemini Models:');
      console.log(JSON.stringify(models, null, 2));
    } else {
      console.error('Error fetching models:', data);
    }
  } catch (e) {
    console.error(e);
  }
}
run();
