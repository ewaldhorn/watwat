import { readFileSync } from "fs";

const run = async () => {
  const buffer = readFileSync("./theanswer.wasm");
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module);
  console.log(instance.exports.theAnswer());
};

run();
