# WatWat

Just WATting around.

I'm curious to learn more about wasm, wat and such things. So here we go.

## You need wabt

Check out [WABT](https://github.com/WebAssembly/wabt) for the tools required to build wasm files.

## Example JS Test Runner

Assumes a `wasm` file named `theanswer.wasm` that exports a function called `theAnswer`.

``` javascript
import { readFileSync } from "fs";

const run = async () => {
  const buffer = readFileSync("./theanswer.wasm");
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module);
  console.log(instance.exports.theAnswer());
};

run();
```

Run it with something like [Bun](https://bun.com/): `bun run index.js`
