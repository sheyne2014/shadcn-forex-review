// Global polyfills for server-side rendering compatibility
// This file must be imported before any other modules that might use browser globals

if (typeof global !== 'undefined') {
  // Define browser globals for server-side rendering
  if (typeof global.self === 'undefined') {
    global.self = global;
  }
  
  if (typeof global.window === 'undefined') {
    global.window = {};
  }
  
  if (typeof global.document === 'undefined') {
    global.document = {};
  }
  
  if (typeof global.navigator === 'undefined') {
    global.navigator = {};
  }
  
  if (typeof global.location === 'undefined') {
    global.location = {};
  }
}

// Export empty object to make this a valid module
export {};
