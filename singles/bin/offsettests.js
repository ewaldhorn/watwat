// test-offsetFromCoordinate.js
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadWasm() {
  const wasmBuffer = await readFile(join(__dirname, "offset.wasm"));
  const wasmModule = await WebAssembly.instantiate(wasmBuffer);
  return wasmModule.instance.exports;
}

// Test the function
async function runTests() {
  const exports = await loadWasm();

  // Test cases with expected results
  const testCases = [
    { x: 0, y: 0, expected: 0 },
    { x: 49, y: 0, expected: 196 },
    { x: 10, y: 2, expected: 440 }, // ((y × 50) + x) × 4 = ((2 × 50) + 10) × 4 = (100 + 10) × 4 = 110 × 4 = 440
    { x: 1, y: 1, expected: 204 }, // (1 * 50 + 1) * 4 = 51 * 4 = 204
    { x: 2, y: 3, expected: 608 }, // (3 * 50 + 2) * 4 = 152 * 4 = 608
    { x: 5, y: 10, expected: 2020 }, // (10 * 50 + 5) * 4 = 505 * 4 = 2020
    { x: -1, y: 2, expected: 396 }, // (2 * 50 + (-1)) * 4 = 99 * 4 = 396
  ];

  console.log("Testing offsetFromCoordinate function...\n");

  let passed = 0;
  let failed = 0;

  for (const { x, y, expected } of testCases) {
    try {
      const result = exports.offsetFromCoordinate(x, y);
      const status = result === expected ? "✅ PASS" : "❌ FAIL";

      console.log(`${status} offsetFromCoordinate(${x}, ${y}) = ${result} (expected: ${expected})`);

      if (result === expected) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log(`❌ ERROR offsetFromCoordinate(${x}, ${y}): ${error.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed`);

  if (failed === 0) {
    console.log("🎉 All tests passed!");
  } else {
    console.log("⚠️  Some tests failed");
    process.exit(1);
  }
}

// Run the tests
runTests().catch(console.error);
