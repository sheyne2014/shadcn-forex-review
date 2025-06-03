import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using ESM pattern
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the files to modify
const brokersPageClientPath = path.join(__dirname, 'src/components/brokers/BrokersPageClient.tsx');

// Read the BrokersPageClient.tsx file
let brokersPageContent = fs.readFileSync(brokersPageClientPath, 'utf8');

// Remove the eToro USA entry
const etoroUsaPattern = /{\s*id:\s*['"]broker-52['"],\s*name:\s*["']eToro USA["'],[\s\S]*?supported_assets:[\s\S]*?\],\s*},/;
brokersPageContent = brokersPageContent.replace(etoroUsaPattern, '');

// Write the updated content back to the file
fs.writeFileSync(brokersPageClientPath, brokersPageContent);

console.log('✅ Successfully removed eToro USA entry from BrokersPageClient.tsx');
console.log('✅ Consolidation complete - main eToro entry now includes US availability'); 