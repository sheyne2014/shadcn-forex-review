// Global polyfill that must run before any other code
// This prevents 'self is not defined' errors in server-side rendering

(function() {
  'use strict';
  
  // Check if we're in a server environment
  const isServer = typeof window === 'undefined';
  
  if (isServer) {
    // Define self as global to prevent errors
    if (typeof global !== 'undefined' && typeof global.self === 'undefined') {
      global.self = global;
    }
    
    // Define globalThis if not available
    if (typeof global !== 'undefined' && typeof global.globalThis === 'undefined') {
      global.globalThis = global;
    }
    
    // Define other browser globals that might be referenced
    const browserGlobals = {
      window: {},
      document: {
        createElement: () => ({}),
        getElementById: () => null,
        querySelector: () => null,
        querySelectorAll: () => [],
        addEventListener: () => {},
        removeEventListener: () => {},
        readyState: 'complete',
        head: { appendChild: () => {} },
        body: { classList: { add: () => {}, remove: () => {} } }
      },
      navigator: {
        userAgent: 'Node.js',
        language: 'en-US',
        languages: ['en-US'],
        platform: 'Node.js'
      },
      location: {
        href: '',
        origin: '',
        pathname: '/',
        search: '',
        hash: ''
      },
      localStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {}
      },
      sessionStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {}
      },
      fetch: async () => ({ ok: false, status: 500, json: async () => ({}) }),
      Image: function() {
        return {
          onload: null,
          onerror: null,
          src: '',
          width: 0,
          height: 0
        };
      },
      IntersectionObserver: function() {
        return {
          observe: () => {},
          unobserve: () => {},
          disconnect: () => {}
        };
      }
    };
    
    // Assign globals if they don't exist
    if (typeof global !== 'undefined') {
      Object.keys(browserGlobals).forEach(key => {
        if (typeof global[key] === 'undefined') {
          global[key] = browserGlobals[key];
        }
      });
    }
  }
})();

// Make this a valid ES module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {};
} else if (typeof exports !== 'undefined') {
  // Empty export for ES modules
}
