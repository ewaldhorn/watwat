// test.js
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testWasmModule() {
  // Read your WASM file
  const wasmBytes = await readFile(join(__dirname, 'mod.wasm'));

  // Instantiate the module
  const wasmModule = await WebAssembly.instantiate(wasmBytes);
  const exports = wasmModule.instance.exports;

  // Test your functions
  console.log('Testing modulus...');
  const modResult = exports.mod(10, 3);
  console.log(`10 % 3 = ${modResult}`); // Should be 1

  // Add assertions
  if (modResult === 1) {
    console.log('✅ Modulus test passed');
  } else {
    console.log('❌ Modulus test failed');
  }
}

testWasmModule().catch(console.error);
