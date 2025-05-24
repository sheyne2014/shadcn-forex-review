require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const { MCP } = require('@modelcontextprotocol/sdk');
const https = require('https');
const http = require('http');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize MCP client for Puppeteer
const puppeteerMCP = new MCP('puppeteer');

// Directory to save logos
const logoDir = path.join(process.cwd(), 'public', 'images', 'brokers');

// Ensure the directory exists
if (!fs.existsSync(logoDir)) {
  fs.mkdirSync(logoDir, { recursive: true });
}

// Function to fetch all brokers from the database
async function getAllBrokers() {
  try {
    const { data, error } = await supabase
      .from('brokers')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching brokers:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error in getAllBrokers:', error);
    return [];
  }
}

// Function to check if a broker has a valid logo
function hasValidLogo(broker) {
  // Check if the broker has a logo_url that's not null or empty
  if (!broker.logo_url) return false;
  
  // Check if the logo_url is a placeholder or fallback
  if (broker.logo_url.includes('placehold.co') || 
      broker.logo_url.includes('ui-avatars.com') ||
      broker.logo_url.includes('fallback')) {
    return false;
  }
  
  return true;
}

// Function to download a file from a URL
function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filePath);
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
        
        file.on('error', (err) => {
          fs.unlink(filePath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        downloadFile(response.headers.location, filePath)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download file: ${response.statusCode}`));
      }
    });
    
    request.on('error', (err) => {
      reject(err);
    });
  });
}

// Function to try Clearbit API for logo
async function tryGetLogoFromClearbit(broker) {
  try {
    // Format broker name for domain lookup
    const brokerName = broker.name.toLowerCase().replace(/\s+/g, '').replace(/\.com$/i, '');
    
    // Try different domain variations
    const domainVariations = [
      `${brokerName}.com`,
      `${brokerName}.co`,
      `${brokerName}.io`,
      `${brokerName}.net`,
      `${brokerName}.org`,
      `${brokerName}.broker`,
      `${brokerName}broker.com`,
      `${brokerName}-broker.com`
    ];
    
    for (const domain of domainVariations) {
      const clearbitUrl = `https://logo.clearbit.com/${domain}`;
      
      try {
        // Generate a filename for the logo
        const brokerId = broker.id || broker.name.toLowerCase().replace(/\s+/g, '-');
        const filename = `${brokerId}_clearbit.png`;
        const filePath = path.join(logoDir, filename);
        
        // Try to download the logo
        await downloadFile(clearbitUrl, filePath);
        
        // If we get here, the download was successful
        return `/images/brokers/${filename}`;
      } catch (error) {
        // If this domain variation failed, try the next one
        continue;
      }
    }
    
    // If all domain variations failed, return null
    return null;
  } catch (error) {
    console.error(`Error getting logo from Clearbit for ${broker.name}:`, error);
    return null;
  }
}

// Function to find logo on broker's website
async function findLogoOnBrokerWebsite(broker) {
  try {
    // Format broker name for domain lookup
    const brokerName = broker.name.toLowerCase().replace(/\s+/g, '').replace(/\.com$/i, '');
    
    // Try different domain variations
    const domainVariations = [
      `https://${brokerName}.com`,
      `https://www.${brokerName}.com`,
      `https://${brokerName}.co`,
      `https://www.${brokerName}.co`,
      `https://${brokerName}.io`,
      `https://www.${brokerName}.io`
    ];
    
    for (const domain of domainVariations) {
      try {
        // Navigate to the broker's website
        await puppeteerMCP.tool.navigate({ url: domain });
        await puppeteerMCP.tool.wait({ time: 3 });
        
        // Take a screenshot for debugging
        await puppeteerMCP.tool.take_screenshot();
        
        // Get all image elements
        const snapshot = await puppeteerMCP.tool.snapshot();
        
        // Find image elements that might be logos
        const imgElements = snapshot.nodes.filter(node => 
          node.role === 'img' && 
          node.url && 
          (node.name?.toLowerCase().includes('logo') || 
           node.description?.toLowerCase().includes('logo') ||
           node.url.toLowerCase().includes('logo') ||
           (node.boundingRect && 
            node.boundingRect.width > 30 && 
            node.boundingRect.width < 300 && 
            node.boundingRect.height > 20 && 
            node.boundingRect.height < 150))
        );
        
        if (imgElements.length > 0) {
          // Find the most likely logo image
          const logoElement = imgElements[0];
          const logoUrl = logoElement.url;
          
          if (logoUrl) {
            // Generate a filename for the logo
            const brokerId = broker.id || broker.name.toLowerCase().replace(/\s+/g, '-');
            const filename = `${brokerId}_website.png`;
            const filePath = path.join(logoDir, filename);
            
            // Download the image
            await puppeteerMCP.tool.download_file({ url: logoUrl, path: filePath });
            
            // Return the local path to the logo
            return `/images/brokers/${filename}`;
          }
        }
      } catch (error) {
        // If this domain variation failed, try the next one
        continue;
      }
    }
    
    // If all domain variations failed, return null
    return null;
  } catch (error) {
    console.error(`Error finding logo on website for ${broker.name}:`, error);
    return null;
  }
}

// Function to find and download a logo for a broker using Google Images
async function findLogoWithGoogleImages(broker) {
  try {
    // Format broker name for search
    const searchQuery = `${broker.name} broker official logo`;
    
    // Navigate to Google Images
    await puppeteerMCP.tool.navigate({ url: 'https://www.google.com/imghp' });
    
    // Search for the broker logo
    await puppeteerMCP.tool.type({ selector: 'input[name="q"]', text: searchQuery });
    await puppeteerMCP.tool.press({ key: 'Enter' });
    await puppeteerMCP.tool.wait({ time: 3 });
    
    // Take a screenshot for debugging
    await puppeteerMCP.tool.take_screenshot();
    
    // Get all image elements
    const snapshot = await puppeteerMCP.tool.snapshot();
    
    // Find image elements that might be logos
    const imgElements = snapshot.nodes.filter(node => 
      node.role === 'img' && 
      node.url && 
      !node.url.includes('google.com') &&
      (node.name?.toLowerCase().includes(broker.name.toLowerCase()) || 
       node.description?.toLowerCase().includes(broker.name.toLowerCase()) ||
       node.name?.toLowerCase().includes('logo') || 
       node.description?.toLowerCase().includes('logo'))
    );
    
    if (imgElements.length > 0) {
      // Find the most likely logo image (usually the first one)
      const logoElement = imgElements[0];
      const logoUrl = logoElement.url;
      
      if (logoUrl) {
        // Generate a filename for the logo
        const brokerId = broker.id || broker.name.toLowerCase().replace(/\s+/g, '-');
        const filename = `${brokerId}_google.png`;
        const filePath = path.join(logoDir, filename);
        
        // Download the image
        await puppeteerMCP.tool.download_file({ url: logoUrl, path: filePath });
        
        // Return the local path to the logo
        return `/images/brokers/${filename}`;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error finding logo with Google Images for ${broker.name}:`, error);
    return null;
  }
}

// Function to update broker logo in the database
async function updateBrokerLogo(brokerId, logoUrl) {
  try {
    const { error } = await supabase
      .from('brokers')
      .update({ logo_url: logoUrl })
      .eq('id', brokerId);
    
    if (error) {
      console.error(`Error updating logo for broker ${brokerId}:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error in updateBrokerLogo for broker ${brokerId}:`, error);
    return false;
  }
}

// Main function
async function main() {
  try {
    // Connect to the Puppeteer MCP
    await puppeteerMCP.connect();
    
    // Get all brokers
    const brokers = await getAllBrokers();
    console.log(`Found ${brokers.length} brokers in total.`);
    
    // Filter brokers without valid logos
    const brokersWithoutLogos = brokers.filter(broker => !hasValidLogo(broker));
    console.log(`Found ${brokersWithoutLogos.length} brokers without valid logos.`);
    
    // Create a results array to track progress
    const results = [];
    
    // Process each broker without a logo
    for (const broker of brokersWithoutLogos) {
      console.log(`Processing ${broker.name}...`);
      
      // Try different methods to find a logo
      let logoUrl = null;
      let source = null;
      
      // Method 1: Try Clearbit API
      console.log(`Trying Clearbit API for ${broker.name}...`);
      logoUrl = await tryGetLogoFromClearbit(broker);
      if (logoUrl) {
        source = 'clearbit';
        console.log(`✅ Found logo for ${broker.name} using Clearbit API`);
      } else {
        // Method 2: Try broker's website
        console.log(`Trying broker website for ${broker.name}...`);
        logoUrl = await findLogoOnBrokerWebsite(broker);
        if (logoUrl) {
          source = 'website';
          console.log(`✅ Found logo for ${broker.name} on broker's website`);
        } else {
          // Method 3: Try Google Images
          console.log(`Trying Google Images for ${broker.name}...`);
          logoUrl = await findLogoWithGoogleImages(broker);
          if (logoUrl) {
            source = 'google';
            console.log(`✅ Found logo for ${broker.name} using Google Images`);
          }
        }
      }
      
      if (logoUrl) {
        // Update the broker in the database
        const updated = await updateBrokerLogo(broker.id, logoUrl);
        
        results.push({
          broker: broker.name,
          brokerId: broker.id,
          status: updated ? 'success' : 'error',
          message: updated ? `Found and updated logo (source: ${source})` : 'Found logo but failed to update database',
          logoUrl,
          source
        });
        
        console.log(`✅ Updated logo for ${broker.name}`);
      } else {
        results.push({
          broker: broker.name,
          brokerId: broker.id,
          status: 'error',
          message: 'Could not find a suitable logo'
        });
        
        console.log(`❌ Could not find logo for ${broker.name}`);
      }
    }
    
    // Save the results to a file
    const resultsPath = path.join(process.cwd(), 'broker-logos', 'logo-results-advanced.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    
    console.log(`Completed processing ${brokersWithoutLogos.length} brokers.`);
    console.log(`Results saved to ${resultsPath}`);
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    // Disconnect from the Puppeteer MCP
    await puppeteerMCP.disconnect();
  }
}

// Run the main function
main().catch(console.error);
