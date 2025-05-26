// Debug script to identify build issues
console.log('🔍 Debug Build Environment');
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);

// Check environment variables
console.log('\n📋 Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing');
console.log('BLOG_AUTOMATION_SECRET:', process.env.BLOG_AUTOMATION_SECRET ? 'Set' : 'Missing');

// Check if critical files exist
const fs = require('fs');
const path = require('path');

console.log('\n📁 Critical Files Check:');
const criticalFiles = [
  'package.json',
  'next.config.js',
  'src/app/layout.tsx',
  'src/lib/hooks/use-mobile.ts',
  'src/components/ScrollToTopButton.tsx',
  'src/components/PerformantImage.tsx',
  'src/components/ui/sidebar.tsx',
  'src/components/PerformanceMonitor.tsx'
];

criticalFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Check package.json type
console.log('\n📦 Package.json Analysis:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('Type:', packageJson.type || 'commonjs');
  console.log('Next.js version:', packageJson.dependencies?.next || 'Not found');
  console.log('React version:', packageJson.dependencies?.react || 'Not found');
} catch (error) {
  console.error('Error reading package.json:', error.message);
}

// Check next.config.js syntax
console.log('\n⚙️ Next.js Config Check:');
try {
  const configContent = fs.readFileSync('next.config.js', 'utf8');
  console.log('Config file size:', configContent.length, 'bytes');
  console.log('Uses export default:', configContent.includes('export default'));
  console.log('Uses module.exports:', configContent.includes('module.exports'));
  console.log('Uses import:', configContent.includes('import('));
  console.log('Uses require:', configContent.includes('require('));
} catch (error) {
  console.error('Error reading next.config.js:', error.message);
}

console.log('\n🎯 Debug Complete');
