import { readFileSync } from "fs";

const run = async () => {
  const buffer = readFileSync("./callable.wasm");
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module);
  console.log(instance.exports.bytesRequired(10));
};

run();
