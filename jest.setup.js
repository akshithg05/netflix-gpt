import '@testing-library/jest-dom';

// Mock import.meta.env for Vite compatibility in Jest
if (!globalThis.importMetaEnvPatched) {
  Object.defineProperty(globalThis, 'import.meta', {
    value: { env: {} },
    configurable: true,
  });
  globalThis.importMetaEnvPatched = true;
}

// Polyfill fetch for Jest
import 'whatwg-fetch';

// Polyfill TextEncoder for Jest
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
