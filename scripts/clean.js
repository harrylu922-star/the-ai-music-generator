#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

for (const directory of [".next", "out"]) {
  fs.rmSync(path.join(process.cwd(), directory), {
    recursive: true,
    force: true,
  });
}
