# Tate Wilson — current workspace

Canonical visual specification, 2026-09-20. The source is this permanent Portfolio Website folder. DESIGN-BRIEF.md records previous intent; this document defines the implemented system. The current user brief supersedes historical palette/setup restrictions.

## Purpose and voice

Make Tate, his digital-forensics focus, and inspectable work clear in the first screen. A recruiter can scan the projects and résumé; an engineer can read implementation, scope, evidence, and reflection. Speak as a technically curious student with real systems experience. Existing source supports the claims; do not infer new certifications, tools, dates, metrics, client outcomes, or investigative experience.

Direction: Tate's current workspace, presented as a full-viewport digital-forensics lab rather than a webpage with a Three.js backdrop. The desk, forensic workstation, internship laptop, field notebook, evidence equipment, CCDC rack, credential frame, repository terminal, and contact phone connect real portfolio paths to a believable student and early-career security environment. A visible back wall, two side walls, rear corner posts, ceiling rails, panoramic city window, student lounge, technical library, planted aquarium, forensic bench, and communications shelf make the camera feel physically inside the room. Authored cyan DFIR tubing and a pink verification-shield fixture replace generic framed wall graphics and act as practical lights. Graphite, warm ash, restrained instrument color, and isolated practical warm/cool light carry the identity. No decorative command prompts, fake hashes, scanner simulation, Matrix effects, generic wall art, or stock security imagery. A brief skippable entry establishes the place on desktop; the classic document portfolio is a separate route.

## Typography

Keep Barlow 400/500/600/700 for headings and prose; IBM Plex Mono 400/500 for actual identifiers, diagram annotations, and metadata. Both have explicit fallbacks. No third font. Fonts are self-hosted when available, with swap rendering.

| Role | Desktop | Mobile | Weight / leading |
| --- | --- | --- | --- |
| Hero statement | fluid 64–96px | fluid 48–64px | 500 / 0.98 |
| Tate's identity | 22px | 20px | 600 / 1.3 |
| Section title | fluid 32–48px | 32–38px | 500 / 1.08 |
| Project title | 32–44px | 30–36px | 600 / 1.12 |
| Prose | 18px | 17px | 400 / 1.6 |
| Metadata | 14px | 14px | 400 / 1.5 |

Keep headings in one visual voice. Prose measure 45–68ch; smaller summary columns can be shorter. Sentence case for headings; uppercase reserved for short file identifiers. Never break a project name arbitrarily to force it into a narrow column.

## Tokens and contrast

Tokens live in styles.css. Case-page aliases refer to these tokens rather than carrying a second palette.

| Token | Value | Role |
| --- | --- | --- |
| --bg | #101416 | graphite canvas |
| --surface | #161c20 | diagram / secondary region |
| --panel | #1c2429 | selected inspection area |
| --panel-raised | #253139 | hover feedback |
| --ink | #eef1ee | primary prose and headings |
| --muted | #b4c0c5 | readable secondary prose |
| --subtle | #9baab1 | metadata |
| --blue | #b6d7e4 | links / focus / selected nodes |
| --cobalt | #b6d7e4 | inherited primary-action token; dark text on pale blue |
| --orange | #edb38b | selected evidence identifier, used sparingly |
| --bone | #e9e7e1 | diagram document stock |
| --line | #354047 | decorative separation |
| --control-line | #788b96 | meaningful input/button boundary |

Require 4.5:1 normal text, 3:1 qualifying large text and necessary control boundaries; aim for 7:1 dark-theme prose. Color never carries selection alone: use a border, explicit selected description, and aria-pressed. One intentional dark theme; no inverted second palette.

## Grid and rhythm

Content maximum 1320px. Outer gutter clamp(20px, 4.5vw, 72px). Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Major regions use 80–112px desktop and 56–72px phone spacing; within a text group use 8–24px. Hero uses unequal text/map columns; projects use a continuous document flow, never scroll hijacking. Align project copy, figure captions, archive rows, and footer to the same page edges.

## Surfaces and components

- Square document regions; 3px controls and up to 4px dialog corners. No pill badges. Hairlines separate case files, notes, and experience. No cards inside cards.
- No decorative shadow. Native navigation dialog alone receives a neutral shadow and opaque backdrop.
- One pale-blue primary action with dark text; secondary actions use an underlined text link or outlined button. 48px target height. Hover changes color/border at 160ms; do not lift every control.
- Link styling is consistent and descriptive. Arrows are decorative, not standalone accessible names.
- Navigation uses the name/monogram, Projects, Internship, Education, CCDC, Contact, and résumé. No duplicate fixed navigation rail. Mobile has a full-width menu below the header with Escape dismissal and focus return.
- TabletopForge and the NIST CFReDS Hacking Case receive full visual emphasis. A native disclosure carries supporting work without conflating portfolio entries with Tate's GitHub repository count. The Windows scanner, GRC assessment, and GRC lessons are supporting records: visible from the overview and Projects dossier, but intentionally subordinate to the two selected cases.
- Professional experience is a distinct bordered record with visible responsibilities, not another row in the education and activity list. The Kentucky CCDC result belongs in its detailed record and the 3D rack inspection, not as a detached hero statistic.
- Case pages use a document header: identity above a title and metadata record, side by side on wide screens and stacked on small screens. Reading contents are sticky only when width allows. Figures retain their own information structure rather than becoming identical project cards.
- Tags/badges are plain metadata when needed; no invented status labels. Icons are simple arrows and diagram geometry with consistent thin strokes.
- Actual output is labeled as such only while its source artifact is locally available. Missing or private artifacts receive an explicit availability note; schematic diagrams are labeled conceptual or explanatory. Preserve honest distinctions between educational tools, simulated assessments, professional work, and planned features.

## Content hierarchy and discoverability

1. **Selected work:** TabletopForge and the NIST CFReDS Hacking Case receive full visual emphasis.
2. **Supporting work:** the Windows scanner, GRC assessment, and GRC lessons remain reachable through the portfolio overview and Projects dossier without competing for equal visual weight.
3. **Compatibility routes:** `projects.html` and `resume.html` only preserve old destinations and redirect to stable workspace hashes.

Every new substantive HTML page must receive at least one incoming link from the portfolio overview, a dossier, or another clearly labeled index. `python scripts/check-portfolio.py` enforces this rule along with local references and anchors.

## Performance budget

- The identity, poster, overview link, and résumé link must remain usable before WebGL initializes.
- Mobile/coarse-pointer entry must not preload the Three.js runtime or authored scene model.
- Static entry-shell assets are capped at 250 KB uncompressed; the complete desktop scene runtime is capped at 1 MB uncompressed. These are regression budgets, not claims about production transfer time.
- The existing four-second startup guard must promote the portfolio overview and explain the recovery path instead of leaving an inert workspace action.
- Browser QA records observed `data-scene-boot-ms`; `?quality=low` must retain all eight destinations.

## Signature interaction: the environment is the interface

On desktop the Three.js room is the entire application viewport; the document has no portfolio sections beneath it and the body cannot scroll. Eight actual scene groups form the portfolio navigation: center workstation/projects, left forensic bench/evidence, right rack/infrastructure and leadership, desk laptop/Pelycon experience, left-side notebook/education, a back-wall Security+ credential and résumé, left repository terminal/GitHub, and right communications shelf/contact. Each destination carries both a small cyan in-world locator and a real HTML control projected from the same 3D anchor. Projected controls remain compact number-only dots, retain descriptive accessible names, and disappear while the camera moves so text and controls do not jitter over the scene. The locator, projected control, and physical object share the same destination. Hovering physical equipment changes its emission and shows a contextual pointer label. Selection disables orbit input, moves a perspective camera to a deliberate framing, strengthens object response, and opens a modal factual HTML dossier while the room remains visible. The HUD and scene destinations become inert until Escape or the dossier close control returns the camera and keyboard focus to the visitor's prior bounded orbit view. Entry, overview, and all eight dossiers are explicit named workspace states. Dossier URLs use stable hashes (`#projects`, `#forensics`, `#ccdc`, `#internship`, `#education`, `#resume`, `#github`, and `#contact`), so classic navigation and shared links open the matching camera state; browser Back returns to the overview without leaving duplicate overview entries. The room uses authored geometry with shared buffers and materials: layered furniture, contoured upholstery, inset equipment screens, a freestanding open rack, evidence hardware, a 14.4-unit rear wall, side walls at ±7.12 units, rear corner posts, and wall-mounted story rails. The credential is an original procedural Security+ document with no copied certificate artwork or invented ID/date. The main workstation uses a real screenshot captured from Tate's locally running TabletopForge project; its dossier and case study include the real generator view. Procedural wood and fabric maps add restrained surface variation. The exported GLB is recovery/editing material, not a runtime download; browser-loaded screenshots, generated screen and certificate artwork, and procedural maps are not baked into it.

Dragging uses grab-style orbit direction and updates the camera directly at up to 60 fps within designed theta/phi limits that keep the viewer inside the room; the wheel uses a short eased dolly between bounded radii and prevents document scrolling. Idle ambient rendering remains capped at 30 fps. Network activity, server LEDs, rack fans, the desk fan, three curved aquarium fish, rising bubbles, restrained RGB strips, locator pulses, practical-light variation, and a slow Roomba floor route animate only while the entered scene is visible. The fish follow separate bounded paths, reverse their modeled bodies with travel direction, and flex independent tail fins; reduced motion freezes them with the rest of the ambient scene. The furniture forms an inward-facing room rather than a front-facing stage: the sofa sits against the far-left wall facing the desk with its small table at the forward end, while the aquarium sits against the far-right wall and turns toward the workstation. The overview camera rests farther back so both corner zones remain visible. RGB is architectural rather than ambient decoration: the desk edge, forensic bench, two back-wall baseboard sections, library shelves, communications shelf, neon wall fixtures, five-part aquarium frame/cabinet treatment, and the Roomba's small segmented status ring carry intentional emissive accents. The lighting follows the benchmark's technical behavior without copying its content: a 47° perspective camera, ACES Filmic tone mapping at 1.07 exposure, near-black fog from 13–29 units, .095 cool ambient fill, a 48-intensity warm desk spotlight, cyan screen spill, high-output cyan and pink neon pools, an internal aquarium pool, and separate high-falloff pools for the left evidence bench, credential wall, rack, lounge, communications shelf, and technical library. The room material carries only .035 emission and the side-wall fills remain below .25 intensity, so the shell begins black and motivated practicals reveal it. A one-third-resolution thresholded bloom chain isolates bright screens, bulbs, tubing, and architectural strips instead of hazing the full frame. Contract checks keep the rack/library, aquarium/rack/contact shelf, forensic bench/cart, lounge/side-table, and window/credential bounds from intersecting. The loose floor Ethernet cable is removed. The floor is a repeating low-cost tile material rather than hundreds of tile meshes. Reduced motion makes camera focus immediate and disables locator, equipment, lighting, aquarium, and Roomba motion. Work lights provide a user-controlled brighter exposure at 1.16 with .17 ambient fill; the physical task-lamp, library, aquarium LED, and monitor controls change their real lights and emissive materials and have matching keyboard-accessible controls. There is no device-orientation permission. Full rendering caps pixel ratio at 1.25 and uses 1024px primary shadow maps. The automatic reduced profile, also addressable with `?quality=low`, caps pixel ratio at 1, uses 512px primary shadow maps, shrinks bloom buffers, and lowers active/idle frame cadence while preserving the complete room. Static shadow maps warm for four frames and then stop updating, repeated geometry shares GPU buffers, and hidden/off-screen states pause rendering. The entry and poster remain usable while WebGL initializes; a four-second startup guard removes the loader even when module or GPU initialization stalls. If WebGL fails, the authored poster and separate classic portfolio remain available.

The contact station sits in the clear gap beside the aquarium, with its phone, locator, focus camera, and dedicated light aligned to the same position. The roaming lab cat uses four separately pivoted legs in a diagonal walking gait; reduced motion freezes the cat with the other ambient scene activity.

## Motion and state

160ms ease-out for hover and control feedback; 320–950ms for the dossier and object-focus camera transition. Entry starts close to the forensic monitor and uses a 2.2-second cubic ease-out pullback to establish the room. Numbered destination dots appear only after camera motion settles; their names remain available through accessible labels and the physical-object hover label. Camera orbit is damped and selection framing uses cubic ease-out; reduced motion removes the entry gate, disables ambient movement, and applies camera states immediately. No scroll-triggered reveals, document scrolling, horizontal scroll sequence, or autoplay tour. The dossier alone may scroll when its selected content exceeds the viewport.

## Responsive and accessibility contract

- Above 760px with a fine pointer: fixed 100vw × 100vh perspective lab, raycast interaction, bounded orbit/dolly controls, and a right-side internally scrolling dossier. There is no desktop portfolio scroll. At 760px and below, or on coarse-pointer tablets, the WebGL application yields to an intentional poster-led mobile index with direct destinations. `classic.html` is the complete document-order alternative for accessibility, preference, and low-capability devices.
- Below 620px: project and contact columns become one; archive metadata reduces visually while descriptions and destinations remain; figures wrap, never clip. Tables may scroll within a named keyboard-focusable region.
- Test 375, 430, 768, 1024, 1440, 1920px and 320px reflow. At 200% zoom content must remain accessible.
- Semantic headings, landmarks, real links/buttons, 48px touch controls, visible 2px focus outlines, skip link, form labels, alt text, and no color-only meaning. No essential content depends on graphics, fonts, or script loading.

## Maintenance and review

Priority: user request → this system and product goals → frontend-craft → scoped Taste audit / Impeccable polish → reference catalogs → components / graphics. Use the local project skill's upstream guidance only within this hierarchy. Do not import a second art director, a framework, or a CLI to change a few HTML pages.

Research classification and exclusions: DESIGN-RESEARCH.md. Browser observations and measured checks: DESIGN-QA.md. Reusable local preview: `python scripts/preview-portfolio.py`, which serves allowlisted public files directly from this permanent source. No temporary copy sync required. Never run a generic server over the mixed Python workspace.
