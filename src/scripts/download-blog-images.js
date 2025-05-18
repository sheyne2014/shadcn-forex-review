import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define image paths and URLs
const images = [
  {
    path: 'public/images/blog/forex-trading-goals.jpg',
    url: 'https://picsum.photos/1200/800'
  },
  {
    path: 'public/images/blog/forex-trading-goals-chart.jpg',
    url: 'https://picsum.photos/1200/600'
  },
  {
    path: 'public/images/blog/process-vs-outcome-goals.jpg',
    url: 'https://picsum.photos/1200/700'
  },
  {
    path: 'public/images/blog/weekly-goals-review.jpg',
    url: 'https://picsum.photos/1000/600'
  },
  {
    path: 'public/images/blog/trading-metrics-dashboard.jpg',
    url: 'https://picsum.photos/1100/700'
  }
];

// Function to download an image
async function downloadImage(url, outputPath) {
  try {
    console.log(`Downloading ${url} to ${outputPath}...`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const buffer = await response.buffer();
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Successfully downloaded ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error downloading ${outputPath}:`, error.message);
  }
}

// Main function to download all images
async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  const promises = images.map(image => {
    // Ensure directory exists
    const dir = path.dirname(image.path);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    return downloadImage(image.url, image.path);
  });
  
  await Promise.all(promises);
  console.log('All image downloads completed!');
}

// Run the script
downloadAllImages().catch(error => {
  console.error('Error in script execution:', error);
  process.exit(1);
}); 