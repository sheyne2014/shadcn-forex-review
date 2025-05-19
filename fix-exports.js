const fs = require('fs');
const path = require('path');

// Directory where the broker pages are located
const basePath = path.join(__dirname, 'src', 'app', 'best-brokers');

// Get all subdirectories
const dirs = fs.readdirSync(basePath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Process each subdirectory
let fixedFiles = 0;
dirs.forEach(dir => {
  const pagePath = path.join(basePath, dir, 'page.tsx');
  
  // Check if page.tsx exists
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Check for export const topBrokers
    if (content.includes('export const topBrokers')) {
      // Replace with non-exported version
      content = content.replace('export const topBrokers', 'const topBrokers');
      fs.writeFileSync(pagePath, content);
      console.log(`Fixed export in ${dir}/page.tsx`);
      fixedFiles++;
    } else {
      console.log(`No export found in ${dir}/page.tsx`);
    }
  } else {
    console.log(`No page.tsx found in ${dir}`);
  }
});

console.log(`\nFixed exports in ${fixedFiles} files.`); 