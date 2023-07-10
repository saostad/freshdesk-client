const { promisify } = require("util");
const { exec } = require("child_process");
const { join } = require("path");

const execPromise = promisify(exec);

async function runShellCmd(command) {
  try {
    const { stdout, stderr } = await execPromise(command);
    console.log(stdout);
    console.log(stderr);
  } catch (err) {
    console.error(err);
  }
}

const { version } = require(join(process.cwd(), "package.json"));

async function tag() {
  await runShellCmd(`git config --global core.editor "code --wait"`);
  await runShellCmd(`git add .`);
  await runShellCmd(`git commit`);
  await runShellCmd(`git tag v${version}`);
}
tag();
