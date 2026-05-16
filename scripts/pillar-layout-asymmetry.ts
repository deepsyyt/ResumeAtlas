/**
 * Guardrail: SWE semantic pillars must not share identical layout signatures
 * (reduces “scaled semantic sameness” risk). Run: npx --yes tsx scripts/pillar-layout-asymmetry.ts
 */
import {
  DEFAULT_PILLAR_SEMANTIC_LAYOUT,
  getSemanticLayout,
  SEMANTIC_PLANS_BY_ROLE,
  type PillarAnchorId,
} from "../app/lib/pillarSemanticPlans";

const SWE_ANCHORS: PillarAnchorId[] = [
  "skills",
  "summary",
  "projects",
  "bullet-points",
];

function main() {
  const swe = SEMANTIC_PLANS_BY_ROLE["software-engineer"];
  if (!swe) {
    console.error("Missing software-engineer semantic plans");
    process.exit(1);
  }
  const signatures = new Map<string, PillarAnchorId[]>();
  for (const id of SWE_ANCHORS) {
    const section = swe[id];
    if (!section) {
      console.error(`Missing SWE section: ${id}`);
      process.exit(1);
    }
    const layout = getSemanticLayout(section).join("→");
    const list = signatures.get(layout) ?? [];
    list.push(id);
    signatures.set(layout, list);
  }
  if (signatures.size < SWE_ANCHORS.length) {
    console.error("Duplicate layout signatures across SWE anchors:");
    for (const [sig, ids] of Array.from(signatures.entries())) {
      if (ids.length > 1) console.error(`  [${ids.join(", ")}]: ${sig}`);
    }
    process.exit(1);
  }
  console.log("OK: each SWE pillar uses a distinct layout signature.");
  console.log(
    SWE_ANCHORS.map((id) => {
      const s = swe[id]!;
      return `  ${id}: ${getSemanticLayout(s).join(" → ")}`;
    }).join("\n")
  );
}

main();
