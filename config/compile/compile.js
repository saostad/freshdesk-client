import { join, dirname } from "path";
import pkg from "pkg";
import safeColor from "colors/safe.js";
import { loadJsonFileSync } from "load-json-file";
import { fileURLToPath } from "url";

const { green } = safeColor;

const { version, name } = loadJsonFileSync(join(process.cwd(), "package.json"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFile = join(__dirname);

console.log(`source file: ${sourceFile}`);

const targetFile = join(__dirname, "..", "..", "release", `${name}-${version}`);
console.log(`target file: ${targetFile}`);
(async () => {
  await pkg.exec([
    sourceFile,
    "--output",
    targetFile,
    "--no-bytecode",
    "--options",
    "max_old_space_size=4096",
    "--public-packages",
    "*",
    "--targets",
    "host",
  ]);

  console.log(
    green(
      `file ${targetFile} has been created. please keep all files exist in that folder together.`,
    ),
  );
})();
