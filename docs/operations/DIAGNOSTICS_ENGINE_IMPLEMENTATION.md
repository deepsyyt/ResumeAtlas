# Posting-fit diagnosis engine — production implementation spec

**North star:** ResumeAtlas = **posting-fit diagnosis engine** (not a generic ATS content site).

**Code artifacts:**

- `app/lib/diagnostics/primitiveRegistry.ts` — primitive registry, API/UI contracts, versioning
- `app/lib/diagnostics/contentContract.ts` — page-level contracts + validators
- `app/lib/diagnostics/diagnosticAnalyticsEvents.ts` — GA4 event constants + payload types
- `app/lib/diagnostics/index.ts` — barrel export

---

## 1. Primitive registry (summary)

### TypeScript (implemented)

- `DiagnosticGate`: `"A" | "B" | "C" | "D"`
- `DiagnosticPrimitiveId`: closed union (8 primitives)
- `DiagnosticPrimitive`: `id`, `publicSlug`, `label`, `shortDefinition`, `gate`, `analyzerResponseKeys`, `relatedPrimitiveIds`, `glossaryOrder`
- `DIAGNOSTIC_REGISTRY_VERSION`: semver string; **bump** when any primitive or gate changes
- `DiagnosticDimensionScore`: API additive shape `{ primitive_id, score, detail_keys? }`
- `PostingFitAnalyzeResponseV1`: `{ diagnostic_registry_version, dimensions[] }` additive to analyze

### Naming conventions

| Layer | Convention | Example |
|-------|------------|---------|
| Registry id | `snake_case` | `required_skill_debt` |
| URL slug | `kebab-case` | `required-skill-debt` |
| API JSON keys | `snake_case` | `primitive_id` |
| GA4 param keys | `snake_case` | `primitive_ids` |
| React components | `PascalCase` | `PrimitiveRibbon` |

### Relationship model

- Each **primitive** belongs to exactly **one gate** (A–D).
- **API** maps legacy analyze fields → `primitive_id` via `analyzerResponseKeys` (may be many-to-one during migration).
- **Glossary** = one route per `publicSlug` under `/diagnostics/[slug]` (to be implemented).
- **UI** never hardcodes labels; always `getPrimitiveById(id).label`.

### Versioning rules

1. **Patch** (`1.0.x`): copy-only glossary tweaks.
2. **Minor** (`1.x.0`): new `detail_keys`, new FAQ, new related links—no ID changes.
3. **Major** (`x.0.0`): rename/remove primitive IDs, gate moves—requires API migration + redirect map for glossary URLs.

Run `validateRegistryIntegrity()` in CI (import from `primitiveRegistry.ts`).

---

## 2. Content contract system

### MDX frontmatter (required)

All indexable SEO/utility shells:

```yaml
---
engine: posting_fit_diagnosis
diagnostic_registry_version: "1.0.0"
kind: utility | role_hub | methodology | problem | glossary | demo
title: "…"
description: "…"
h1: "…"  # optional if layout sets H1
primitives:
  - required_skill_debt
  - posting_vocabulary_coverage
content_contract_version: "1"
# kind-specific:
primary_cta_path: /check-resume-against-job-description
min_static_word_count: 900
proof_fixture_ids:
  - se-saas-pm-v1
  - da-enterprise-v1
faq_max_items: 10
---
```

### Validation (implemented)

- `validateUtilityContract`, `validateRoleHubContract`, `validateProblemContract` in `contentContract.ts`
- **CI:** `npx tsx scripts/validate-content-contracts.ts` (add script: glob MDX, parse frontmatter, run validators) — **implement in Phase 1**

### Uniqueness / anti-duplicate (enforced in CI script — spec)

| Check | Threshold | Failure |
|-------|-----------|---------|
| Title exact duplicate | 0 collisions across indexable URLs | **block** |
| H2 slug sequence hash | Same hash on >2 pages | **block** |
| Bigram Jaccard vs sibling role | >0.55 | **warn**; >0.65 | **block** |
| Role-specific sentence count | `<12` for `role_hub` | **block** |
| FAQ count | `>12` | **block** |
| Static word count (utility) | `<900` SSR text | **block** |
| Proof fixtures | `<2` ids | **block** |

---

## 3. SEO QA automation (CI)

**Script location (add):** `scripts/seo-qa/`

| Check | Tool | Threshold | Severity |
|-------|------|-----------|----------|
| Title length | script | 45–61 chars | warn |
| Title duplication | script | any duplicate | **block** |
| Meta description | script | 140–165 chars | warn |
| H1 count per page | script | exactly 1 | **block** |
| H2 order fingerprint | script | >2 pages same fingerprint | **block** |
| Internal link to Tier S | script | `/check-resume-against-job-description` missing on role/problem/utility | **block** |
| Canonical self-reference | script | `<link rel="canonical">` must match deployed path, no unexpected query | **block** |
| Schema JSON-LD | script | FAQ >12 items | **block**; aggregateRating present | **block** |
| Thin content | script | indexable route `< 600` words visible text | **block** |
| Semantic drift | script | banned phrases: `today's competitive job market`, `in this digital age` | **block** |
| Registry integrity | `validateRegistryIntegrity()` | errors | **block** |
| `/seo/` indexable | script | any `robots: { index: true }` under `app/seo` | **block** |

**npm script:** `"seo:qa": "npx tsx scripts/seo-qa/run.ts"`

---

## 4. React / Next component architecture

### Folder structure (target)

```
app/
  lib/diagnostics/           # registry, contracts, analytics (done)
  components/diagnostics/
    DiagnosticsUtilityLayout.tsx   # SSR shell
    SeoCriticalRegion.tsx
    GateModelExplainer.tsx        # reads primitiveRegistry + MDX/static
    PrimitiveRibbon.tsx
    PrimitiveCard.tsx
    CrawlFAQ.tsx
    FixtureReportTeaser.tsx
    JsonLdInjector.tsx
  (routes)
  check-resume-against-job-description/page.tsx
  ats-resume-checker/page.tsx
  diagnostics/[slug]/page.tsx
  methodology/page.tsx
  demos/posting-fit/[fixtureId]/page.tsx
```

### Component tree

```
DiagnosticsUtilityLayout
├── JsonLdInjector (server)
├── SeoCriticalRegion (server; no Suspense above)
│   ├── h1 + intro paragraph (server)
│   ├── GateModelExplainer (server: MDX or static)
│   ├── PrimitiveRibbon (server: maps DIAGNOSTIC_PRIMITIVES)
│   ├── CrawlFAQ (server: FAQ from registry + page overrides)
├── ProofStrip (server)
│   ├── FixtureReportTeaser → links /demos/posting-fit/*
├── ToolRegion (client boundary `'use client'`)
│   ├── PastePanels
│   ├── ResultsPanels (binds analyzer keys → primitive_id)
├── StaticAppendix (server MDX)
├── RelatedDiagnosticsLinks (server: from linkGraph constant — add linkGraph.ts)
```

### SSR / client boundaries

- **Server:** `SeoCriticalRegion`, `ProofStrip`, `JsonLdInjector`, static appendix.
- **Client:** `ToolRegion` only.
- **Streaming:** `Suspense` **only inside** `ToolRegion`; never wrap `SeoCriticalRegion`.
- **Hydration:** Analyzer results fetch client-side; primitives labels from registry imported in both server + client (same module).

### Caching

- `demos/posting-fit/[fixtureId]`: **SSG** `revalidate: false` or ISR 7d on fixture bump.
- `diagnostics/[slug]`: **SSG** + ISR on registry minor bump.
- Utility shells: **SSR** with `fetch` cache for static MDX fragments via `import` (build-time) not remote.

### Schema injection

- Single component `JsonLdInjector` receives `allowedSchemas: ('FAQPage'|'BreadcrumbList'|'SoftwareApplication')[]` per route allowlist map `SCHEMA_ALLOWLIST[pathname]`.

---

## 5. Page generation pipeline

| Stage | Actor | Output |
|-------|-------|--------|
| 1. New role hub | PM picks role | Frontmatter YAML from template |
| 2. Primitive injection | Script `inject-primitives.ts` | Inserts `PrimitiveRibbon` + related glossary links from `relatedPrimitiveIds` |
| 3. Glossary | Auto from registry | One page per `publicSlug` |
| 4. Demos | Human writes fixture JSON | `public/fixtures/posting-fit/{id}.json` + SSG page |
| 5. FAQ | Script drafts from `primitive.seoFAQ` (optional field to add) or hand | Max 8–12 |
| 6. Links | `linkGraph.ts` | Tier S + 2 diagnostics + 1 demo |
| Human review | Staff | Sign-off checklist PR |
| CI | GitHub | `seo:qa` + `validateRegistryIntegrity` |

**Anti-pSEO:** No new indexable URL without passing `validateUtilityContract` / role / problem validators.

---

## 6. Rewrite specifications (exact)

### 6.1 `/check-resume-against-job-description`

| Field | Value |
|-------|--------|
| **H1** | Posting fit diagnosis: compare your resume to this job description |
| **Section order** | (1) `SeoCriticalRegion`: intro 120 words naming Gates A–D (2) `PrimitiveRibbon` all 8 (3) `GateModelExplainer` (4) `CrawlFAQ` 10 Q max (5) embed `ToolClusterLanding` **below** fold OR split: static region then existing tool (6) `FixtureReportTeaser` 3 links (7) internal: `/methodology`, `/diagnostics/required-skill-debt`, `/ats-resume-checker` |
| **Components** | New wrapper `PostingFitWorkbenchPage` composing `DiagnosticsUtilityLayout` + existing `ToolClusterLanding` |
| **Primitives** | Full set in ribbon; emphasize `required_skill_debt`, `posting_vocabulary_coverage`, `semantic_fit_gap` in FAQ |
| **CTAs** | Primary in-hero: scroll to `#tool` ; sticky mobile: “Run posting fit diagnosis” |
| **Schema** | `FAQPage`, `BreadcrumbList`, `SoftwareApplication` (feature list = primitive labels) |
| **SSR blocks** | ≥900 words static before `#tool` |

### 6.2 `/ats-resume-checker`

| **H1** | Parse hygiene scan: will ATS read your resume text correctly? |
| **Order** | Intro tying to **Gate A** only → `PrimitiveRibbon` subset (`parse_hygiene`, `skim_friction`) → FAQ → existing checker UI |
| **Primitives** | `parse_hygiene`, `skim_friction` |
| **CTAs** | “Run full posting fit diagnosis” → `/check-resume-against-job-description` |
| **Schema** | `FAQPage`, `SoftwareApplication` |
| **SSR** | 700+ words Gate A doctrine |

### 6.3 One role hub (e.g. `/{role}-resume-guide` → software engineer)

| **H1** | Software engineer resume: posting fit, required skill debt, and evidence |
| **Order** | Knockout model (role) → bullets patterns → link demos → FAQ → CTA |
| **Primitives** | `required_skill_debt`, `evidence_density`, `posting_vocabulary_coverage` |
| **CTAs** | Mid + end → `/check-resume-against-job-description` |
| **Internal** | `/diagnostics/required-skill-debt`, `/demos/posting-fit/se-saas-ic-v1`, `/methodology` |
| **Schema** | `BreadcrumbList`, `FAQPage` (max 10) |

### 6.4 One problem page (`/problems/resume-not-getting-interviews`)

| **H1** | Not getting interviews? Run posting fit diagnosis before rewriting again |
| **Order** | Empathy ≤80 words → Gate checklist A–D → CTA → FAQ |
| **Primitives** | ribbon subset + glossary links |
| **CTA** | Primary only `/check-resume-against-job-description` |
| **Schema** | `FAQPage` |

### 6.5 Methodology (`/methodology` — new route)

| **H1** | How ResumeAtlas diagnoses posting fit (and what we will not claim) |
| **Order** | Gates A–D table → primitive table from registry → limitations → changelog link to registry version |
| **Primitives** | all 8 definitions inlined from registry `label` + `shortDefinition` |
| **CTA** | `/check-resume-against-job-description` |
| **Schema** | `FAQPage`, `WebPage` |

---

## 7. Analytics instrumentation

Wire `gtagEvent` from `diagnosticAnalyticsEvents.ts` (extend `gtagClient` if params need objects—GA4 prefers flat strings).

| Event | When | Payload |
|-------|------|---------|
| `posting_fit_surface_viewed` | route mount | `surface`, `path`, `primitive_ids` (comma list) |
| `posting_fit_demo_opened` | click fixture | `fixture_id` |
| `posting_fit_paste_started` | first input | `field`: jd \| resume |
| `posting_fit_diagnostic_completed` | analyze success | `primitive_ids`, `registry_version`, `had_jd` |
| `posting_fit_primitive_expanded` | accordion | `primitive_id` |
| `posting_fit_workbench_cta_clicked` | CTA from satellite | `source_path` |
| `posting_fit_parse_hygiene_cta_clicked` | from parse pages | `source_path` |

**Funnels:** surface_viewed → paste_started → diagnostic_completed → (existing) optimization_clicked_*.

**Leading indicator:** `posting_fit_diagnostic_completed` / `posting_fit_surface_viewed` on `/check-...` rising.

---

## 8. Migration plan

### Order

1. Fix `next.config.mjs` `/seo/:role-resume-...` destination if wrong (`/:role-resume-resume-guide` → verify `/:role}-resume-guide` pattern).
2. Ship registry + methodology + 3 demos SSG.
3. Wrap `/check-resume-against-job-description` with SSR doctrine.
4. Align `/ats-resume-checker` copy to Gate A.
5. Role hub sequential (DA, SE, PM).

### Redirects / canonical

- Keep existing JD consolidations.
- `/resume-keyword-scanner`: **decision** — either `301` → `/check-resume-against-job-description` or `noindex` + unique copy; document in CHANGELOG.

### Sitemap

- Add `/methodology`, `/diagnostics/*`, `/demos/posting-fit/*` to `sitemapEntries.ts`.
- Remove any stale high-priority duplicates.

### Rollback

- Feature flag `NEXT_PUBLIC_POSTING_FIT_SHELL=0` to hide SSR region (env).

### Monitoring

- GSC: filter path `/check-resume-against-job-description` queries containing `job description`, `posting`, `tailor`.
- GA4: explore funnel posting_fit_*.

---

## 9. Production readiness checklist

- [ ] **SEO:** Tier S SSR word count met; canonical clean; noindex on share/optimize
- [ ] **Rendering:** H1 in first HTML chunk; no Suspense above critical region
- [ ] **Semantic:** `DIAGNOSTIC_REGISTRY_VERSION` matches content frontmatter
- [ ] **Schema:** allowlist only; no Review schema
- [ ] **Content:** contracts validated in CI
- [ ] **Utility:** tool still functional post-wrap
- [ ] **Crawl:** sitemap updated; GSC inspect live URL
- [ ] **Analytics:** new events in layout or page once QA’d in debug view

---

## 10. Quality rater differentiation (elements to ship)

They conclude **diagnostic product** if they see:

1. **Frozen primitive table** with API field mapping and honest limits.
2. **Fixture demos** with reproducible output tied to same labels as product UI.
3. **Gate A–D** narrative repeated consistently—not keyword-stuffing advice.
4. **Single dominant CTA** to posting-fit workbench from every satellite page.

They conclude **AI SEO** if:

- H2 skeletons repeat across roles with swapped nouns only.
- No demos, no mapping, generic “tips.”

---

## Immediate engineering tasks (ordered)

1. Add `scripts/validate-registry.mjs` calling `validateRegistryIntegrity` via dynamic import or duplicate check in tsx.
2. Implement `app/methodology/page.tsx` + `app/diagnostics/[slug]/page.tsx` + `app/demos/posting-fit/[fixtureId]/page.tsx`.
3. Refactor `check-resume-against-job-description/page.tsx` to compose `DiagnosticsUtilityLayout` + `ToolClusterLanding`.
4. Wire GA4 events in client tool regions.
5. Fix `next.config.mjs` SEO redirect destination line if confirmed broken in prod.
