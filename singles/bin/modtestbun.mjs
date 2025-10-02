// test.mjs
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple test function
function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    throw error;
  }
}

async function runTests() {
  const wasmBytes = await readFile(join(__dirname, 'mod.wasm'));
  const wasmModule = await WebAssembly.instantiate(wasmBytes);
  const { multiply, mod } = wasmModule.instance.exports;

  test('Modulus test', () => {
    if (mod(17, 5) !== 2) throw new Error('17 % 5 should equal 2');
  });

  console.log('All tests passed! 🎉');
}

runTests().catch(console.error);
