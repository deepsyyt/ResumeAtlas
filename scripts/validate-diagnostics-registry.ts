/**
 * CI: validate diagnostic primitive registry integrity.
 * Run: npx tsx scripts/validate-diagnostics-registry.ts
 */
import { validateRegistryIntegrity } from "../app/lib/diagnostics/primitiveRegistry";

const { ok, errors } = validateRegistryIntegrity();
if (!ok) {
  console.error("[diagnostics] Registry validation failed:");
  for (const e of errors) console.error("  -", e);
  process.exit(1);
}
console.log("[diagnostics] Registry OK");
