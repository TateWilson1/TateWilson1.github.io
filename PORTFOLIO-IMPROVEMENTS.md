# Portfolio improvement backlog

Reviewed 2026-09-25 against the current local portfolio source and rendered desktop/mobile previews. Implementation completed and verified locally on 2026-09-25. This remains the reference record for the pass; the site was not deployed.

## Completion record

- [x] Identity-led desktop entry names Tate and his field before the interface concept.
- [x] Supporting scanner, GRC assessment, and GRC lessons pages are linked from both portfolio routes.
- [x] Failed-JavaScript/WebGL states promote the complete portfolio overview instead of leaving a dead primary action.
- [x] The overview uses the shared compact, keyboard-operable mobile menu.
- [x] Every selected case provides inspectable evidence or a plain disclosure explaining why source artifacts cannot be published.
- [x] The 3D room includes an eight-destination workspace map with named controls.
- [x] The alternate route is framed as a first-class Portfolio Overview, with the résumé as its primary action.
- [x] The desktop overview introduction includes selected evidence, current focus, education timing, and profile-review context.
- [x] The mobile entry no longer preloads the 3D runtime; documented raw-byte budgets are enforced by `scripts/check-portfolio.py`.
- [x] Time-sensitive education and certification language is visibly dated and distinguishes earned credentials from SC-300 in progress.
- [x] Canonical, Open Graph, Twitter, JSON-LD, social-preview, robots, and sitemap support are present.
- [x] Linked header brands meet the 48px mobile target contract.
- [x] Selected, supporting, and compatibility content tiers—and the incoming-link rule—are documented in `DESIGN.md`.

One source limitation is intentionally visible rather than hidden: the scanner-output image formerly hosted in its source repository returns 404, so the case now labels the artifact unavailable and does not substitute fabricated evidence.

## Current assessment

The portfolio already has a strong, recognizable direction. The desktop cyber-lab is memorable and specific to Tate; the classic and case-study pages use a coherent type, color, spacing, and diagram system; and the writing generally distinguishes real work, educational work, and conceptual explanation. The next pass should improve clarity, discovery, proof, and resilience rather than replace the visual identity.

No broken local file references, broken local anchors, horizontal overflow at the tested 390px viewport, or browser console warnings/errors were found. Direct dossier links such as `index.html#projects` worked. The representative case study rendered cleanly on desktop and mobile.

## Priority 1 — highest visitor impact

### 1. Make Tate—not the interface—the first message

- **Observed:** The desktop entry headline is “Enter the lab.” Tate’s name and field appear in a small kicker and the upper-left brand, while the largest text describes the interface.
- **Impact:** A recruiter or general visitor can understand the concept immediately but has to work harder than necessary to answer “Who is this, and what does he do?”
- **Smallest useful correction:** Keep the lab concept, but make the entry copy explicitly identify Tate and his focus. For example, retain “Enter the lab” as the action while giving the hero a short identity-led headline or a stronger role line.
- **Acceptance check:** At a glance and without entering the room, a new visitor can state Tate’s name, field, and the primary next step.

### 2. Add a visible route to the work that is currently orphaned

- **Observed:** `case-vulnerability-scanner.html` and `writeup-grc-risk-lessons.html` have no incoming HTML links. `case-grc-risk-assessment.html` is linked only from the orphaned scanner case. The classic portfolio promotes only TabletopForge and the NIST CFReDS case.
- **Impact:** Existing proof of breadth is invisible to normal visitors and search crawlers following site navigation.
- **Smallest useful correction:** Add a compact “More work” or “Archive” section to the classic portfolio and a matching destination in the projects dossier. Link the scanner, GRC assessment, and GRC lessons without turning them into equal-weight feature cards.
- **Acceptance check:** Every substantive case study/report is reachable from the homepage or classic portfolio within two deliberate clicks.

### 3. Make the primary entry resilient when WebGL or JavaScript fails

- **Observed:** The entry provides a poster and classic link, but the primary “Enter workspace” button is wired only inside the successful Three.js initialization path. The catch path and no-JavaScript path can leave that primary button inert.
- **Impact:** On unsupported, blocked, or failed WebGL sessions, the most prominent action appears available but does nothing.
- **Smallest useful correction:** In fallback mode, hide/disable the dead control and promote “Open classic portfolio,” with a short plain-language status message. Add a `noscript` equivalent.
- **Acceptance check:** With JavaScript disabled and with forced WebGL initialization failure, no visible primary control is inert and the complete portfolio remains one clear action away.

### 4. Reduce the classic mobile header’s cost

- **Observed:** At 390×844, the classic header is about 281px tall because all seven navigation links are expanded before the hero.
- **Impact:** The visitor spends roughly a third of the first screen on navigation instead of identity and evidence.
- **Smallest useful correction:** Give `classic.html` the same compact mobile menu pattern used on case pages, or reduce it to the four highest-value destinations with the rest in a menu.
- **Acceptance check:** At 390px wide, Tate’s name and role appear in the initial viewport with a compact, keyboard-operable navigation control.

### 5. Strengthen proof in the forensic and security cases

- **Observed:** TabletopForge includes two local product screenshots. The NIST CFReDS case, GRC assessment, CCDC report, and internship report rely mainly on prose and authored diagrams. The scanner has one real output image, but it is loaded from a remote GitHub raw URL.
- **Impact:** The site explains process well, but some of the most credible technical claims have less inspectable evidence than the flagship project.
- **Smallest useful correction:** Add carefully redacted, truthful artifacts where available: investigation timeline fragments, evidence tables, report excerpts, sanitized screenshots, or repository/document links. Label actual output versus conceptual diagrams. Store the scanner screenshot locally.
- **Acceptance check:** Each selected case contains at least one clearly labeled, inspectable artifact or explains why the underlying evidence cannot be shown.

## Priority 2 — meaningful refinement

### 6. Improve visual discovery inside the 3D room

- **Observed:** The room is visually rich, but destinations are represented by 40×40 number-only dots and equipment highlights. The visible instruction says to select equipment; destination names mainly appear on hover/focus or in accessible labels.
- **Impact:** Exploration is engaging, but a time-constrained visitor may not know which object leads to projects, experience, education, or contact.
- **Smallest useful correction:** Add an optional compact workspace map/legend, or reveal destination names during the first settled overview and then collapse them. Keep the authored room and number markers.
- **Acceptance check:** A first-time visitor can intentionally open Projects, Experience, Résumé, and Contact without trial-and-error clicking.

### 7. Reframe the classic route as a first-class portfolio, not a fallback

- **Observed:** The page labels itself “CLASSIC / ACCESSIBLE VIEW” and its main CTA sends visitors back to the interactive lab.
- **Impact:** “Accessible view” can imply that accessibility belongs only to the alternate page, while “classic” may sound secondary even though this is the fastest complete reading path.
- **Smallest useful correction:** Rename it to “Portfolio overview,” “Document view,” or similarly neutral language. Keep the 3D lab as an optional experience rather than the dominant CTA on this page.
- **Acceptance check:** Both routes feel intentional and complete; neither suggests that accessibility is a separate edition.

### 8. Tighten the classic desktop introduction

- **Observed:** The desktop classic hero is visually clean but leaves a large unused region below and to the right of a relatively narrow biography block.
- **Impact:** The first screen feels quieter than the evidence-rich case pages and delays proof of work.
- **Smallest useful correction:** Pull one compact evidence summary, selected-work preview, or current-focus record into the open area. Avoid a generic statistics row.
- **Acceptance check:** The first desktop viewport contains identity, role, one proof signal, and a clear path to selected work without becoming dashboard-like.

### 9. Establish a measurable performance budget for the 3D entry

- **Observed:** The authored runtime includes roughly 956KB of uncompressed Three.js/scene JavaScript before fonts and imagery (`three.module.min.js`, `three.core.js`, `scene.js`, and `scene-model.mjs`). A low-quality mode and loading guard already exist.
- **Impact:** The design is GPU- and JavaScript-dependent, so slow devices and cold mobile/desktop connections are the main experience risk even when the code is correct.
- **Smallest useful correction:** Record cold-load LCP/interaction readiness, scene boot time, transferred bytes, and long tasks on a mid-range device profile. Use those measurements to decide whether more code splitting, deferred scene setup, or asset reduction is warranted.
- **Acceptance check:** Define and meet a documented budget for the entry poster, usable classic link, and interactive workspace readiness; confirm `?quality=low` preserves all destinations.

### 10. Verify time-sensitive claims and add useful dates

- **Observed:** Education timing, certifications, internship duration, leadership status, and competition placement are strong trust signals but can become stale. The source currently presents Security+ and ISC2 CC as earned and SC-300 as in progress.
- **Impact:** Accurate chronology makes the portfolio easier to evaluate and protects credibility.
- **Smallest useful correction:** Reconfirm each claim before the next public update. Add dates or verification links where they help, while keeping “in progress” visibly distinct from earned credentials.
- **Acceptance check:** Every time-sensitive claim is current, dated where appropriate, and consistent across the site and résumé.

## Priority 3 — discoverability and polish

### 11. Add share/search metadata

- **Observed:** Pages have titles and descriptions, but no Open Graph/Twitter card metadata or structured person/project data was found. No sitemap or robots file was present.
- **Impact:** Shared links and search results may undersell the visual quality and content depth.
- **Smallest useful correction:** Add canonical URLs, a deliberate social preview image, Open Graph/Twitter metadata, and a simple sitemap. Add JSON-LD only for claims that can be maintained accurately.
- **Acceptance check:** Homepage and case-study links produce intentional previews and all public pages are represented in the sitemap.

### 12. Standardize touch-target treatment for linked brand marks

- **Observed:** At 390px, the brand links on the classic and representative case pages measured about 32px high, while primary controls met larger target sizes.
- **Impact:** The links remain usable but are less forgiving than the rest of the mobile control system.
- **Smallest useful correction:** Extend the clickable area with padding without visually enlarging the logo.
- **Acceptance check:** Interactive header targets meet the project’s 48px mobile target contract without changing the visual scale.

### 13. Document the intended content hierarchy

- **Observed:** The repository contains two selected cases, additional archived cases, three reports, redirect routes, and two primary homepage modes. The visual system is consistent, but the editorial tiers are not obvious from filenames alone.
- **Impact:** Future updates could accidentally create more orphan pages or promote everything to equal weight.
- **Smallest useful correction:** Record three tiers in `DESIGN.md`: selected work, supporting/archive work, and redirect/compatibility routes. Add a simple rule that every new substantive page must receive an incoming navigation link.
- **Acceptance check:** A future contributor can identify where a new case belongs and how it becomes discoverable without reverse-engineering the link graph.

## Suggested implementation order

1. Identity-led entry copy.
2. More-work/archive links and orphan-page repair.
3. WebGL/no-JavaScript fallback behavior.
4. Compact classic mobile navigation.
5. Evidence additions and local scanner asset.
6. Workspace discovery aid.
7. Performance measurement and optimization only where measurements justify it.
8. Metadata, touch-target, and documentation polish.

## Preserve during future work

- The dark, authored cyber-lab identity and restrained warm/cool palette.
- Barlow plus IBM Plex Mono typography and the current compact shape language.
- Honest labeling of actual output, conceptual diagrams, educational projects, and professional work.
- The complete classic/mobile path, stable dossier hashes, keyboard focus handling, and reduced-motion behavior.
- The case-study layout’s strong hierarchy and responsive reflow.
- Existing working résumé, GitHub, LinkedIn, and email destinations.

## Verification notes

- Rendered at the default desktop viewport, 1440×900, and 390×844.
- Opened the desktop entry, settled room overview, Projects dossier, direct `#projects` deep link, classic portfolio, and TabletopForge case study.
- Checked local file references and local anchors across root HTML pages.
- Measured the classic mobile header and representative interactive target sizes.
- Did not submit contact actions, deploy the site, run a full screen-reader audit, or benchmark a throttled production network/GPU profile.
