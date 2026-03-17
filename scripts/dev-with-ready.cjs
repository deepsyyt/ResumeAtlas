/**
 * Runs `next dev` and ensures a clear "Ready" line is shown.
 * Next.js sometimes buffers output; this forwards stdout and prints a ready line when Next does.
 */
const { spawn } = require("child_process");

const child = spawn("npx", ["next", "dev"], {
  stdio: ["inherit", "pipe", "inherit"],
  shell: true,
  env: { ...process.env, FORCE_COLOR: "1" },
});

let readyShown = false;
child.stdout.setEncoding("utf8");
child.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);
  if (!readyShown && /Ready in \d+ms/i.test(chunk)) {
    readyShown = true;
    process.stdout.write("\n✓ Ready. Open http://localhost:3000\n\n");
  }
});

// If Next.js doesn't print Ready within 4s (e.g. buffering), show a fallback
setTimeout(() => {
  if (!readyShown) {
    readyShown = true;
    process.stdout.write("\n✓ Ready. Open http://localhost:3000\n\n");
  }
}, 4000);

child.on("close", (code) => process.exit(code ?? 0));
