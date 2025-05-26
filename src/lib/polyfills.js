// Enhanced global polyfills for server-side rendering compatibility
// This file must be imported before any other modules that might use browser globals

if (typeof global !== 'undefined') {
  // Define browser globals for server-side rendering
  if (typeof global.self === 'undefined') {
    global.self = global;
  }

  if (typeof global.window === 'undefined') {
    global.window = {
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
      location: { href: '', origin: '', pathname: '/' },
      navigator: { userAgent: 'Node.js' },
      document: {},
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
      }
    };
  }

  if (typeof global.document === 'undefined') {
    global.document = {
      createElement: () => ({}),
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {},
      removeEventListener: () => {},
      readyState: 'complete',
      head: { appendChild: () => {} },
      body: { classList: { add: () => {}, remove: () => {} } }
    };
  }

  if (typeof global.navigator === 'undefined') {
    global.navigator = {
      userAgent: 'Node.js',
      language: 'en-US',
      languages: ['en-US'],
      platform: 'Node.js'
    };
  }

  if (typeof global.location === 'undefined') {
    global.location = {
      href: '',
      origin: '',
      pathname: '/',
      search: '',
      hash: ''
    };
  }

  // Polyfill for globalThis if not available
  if (typeof global.globalThis === 'undefined') {
    global.globalThis = global;
  }

  // Additional polyfills for common browser APIs
  if (typeof global.fetch === 'undefined') {
    global.fetch = async () => ({ ok: false, status: 500, json: async () => ({}) });
  }

  if (typeof global.Image === 'undefined') {
    global.Image = function() {
      return {
        onload: null,
        onerror: null,
        src: '',
        width: 0,
        height: 0
      };
    };
  }

  if (typeof global.IntersectionObserver === 'undefined') {
    global.IntersectionObserver = function() {
      return {
        observe: () => {},
        unobserve: () => {},
        disconnect: () => {}
      };
    };
  }
}

// Export empty object to make this a valid module
export {};
