// test-comprehensive.js
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class WasmTester {
  constructor(wasmPath) {
    this.wasmPath = wasmPath;
    this.exports = null;
  }

  async load() {
    const wasmBytes = await readFile(join(__dirname, this.wasmPath));
    const wasmModule = await WebAssembly.instantiate(wasmBytes);
    this.exports = wasmModule.instance.exports;
    return this.exports;
  }

  testMod(a, b, expected) {
    const result = this.exports.mod(a, b);
    const passed = result === expected;
    console.log(`mod(${a}, ${b}) = ${result} ${passed ? '✅' : '❌'}`);
    return passed;
  }

  runTests() {
    console.log('🧪 Running WASM tests...\n');

    let allPassed = true;

    // Test modulus
    allPassed &= this.testMod(10, 3, 1);
    allPassed &= this.testMod(15, 5, 0);
    allPassed &= this.testMod(-10, 3, -1);
    allPassed &= this.testMod(10, -3, 1);

    console.log('\n' + (allPassed ? '🎉 All tests passed!' : '💥 Some tests failed!'));
    return allPassed;
  }
}

// Run tests
async function runAllTests() {
  try {
    const tester = new WasmTester('mod.wasm');
    await tester.load();
    const allPassed = tester.runTests();

    if (!allPassed) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

runAllTests();
