"""Small, dependency-free regression check for the public portfolio."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML = sorted(ROOT.glob("*.html"))
SUBSTANTIVE = {
    "index.html",
    "classic.html",
    "case-tabletopforge.html",
    "case-hacking-case.html",
    "case-vulnerability-scanner.html",
    "case-grc-risk-assessment.html",
    "writeup-ccdc-lessons.html",
    "writeup-grc-risk-lessons.html",
    "writeup-m365-entra-review.html",
}
ENTRY_ASSETS = [
    "index.html", "styles.css", "lab.css", "scene.js", "assets/fonts.css",
    "assets/fonts/barlow-400.woff2", "assets/fonts/barlow-600.woff2",
    "assets/fonts/ibm-plex-mono-400.woff2", "assets/workstation-poster.svg",
]
SCENE_ASSETS = [
    "scene.js", "scene-model.mjs", "assets/vendor/three.module.min.js",
    "assets/vendor/three.core.js",
]


def fail(message: str, failures: list[str]) -> None:
    failures.append(message)


def main() -> int:
    failures: list[str] = []
    incoming = {name: set() for name in SUBSTANTIVE}

    for page in HTML:
        source = page.read_text(encoding="utf-8")
        if page.name in SUBSTANTIVE:
            for required in ('rel="canonical"', 'property="og:title"', 'property="og:description"'):
                if required not in source:
                    fail(f"{page.name}: missing {required}", failures)

        for attr, value in re.findall(r'(href|src)=["\']([^"\']+)["\']', source):
            if attr == "src" and value.startswith(("http://", "https://")):
                fail(f"{page.name}: remote runtime image/script {value}", failures)
            if value.startswith(("http://", "https://", "mailto:", "tel:", "data:", "javascript:")):
                continue
            path_part, _, fragment = value.partition("#")
            path_part = path_part.split("?", 1)[0]
            target = (page.parent / path_part).resolve() if path_part else page.resolve()
            if path_part and not target.is_file():
                fail(f"{page.name}: missing local reference {value}", failures)
                continue
            if target.name in incoming:
                incoming[target.name].add(page.name)
            if fragment and target.suffix == ".html":
                target_source = target.read_text(encoding="utf-8")
                if not re.search(rf'id=["\']{re.escape(fragment)}["\']', target_source):
                    fail(f"{page.name}: missing anchor target {value}", failures)

    for name in sorted(SUBSTANTIVE - {"index.html"}):
        if not incoming[name]:
            fail(f"{name}: substantive page has no incoming HTML link", failures)

    index = (ROOT / "index.html").read_text(encoding="utf-8")
    if 'rel="modulepreload"' in index:
        fail("index.html: mobile entry must not modulepreload the 3D runtime", failures)

    entry_bytes = sum((ROOT / path).stat().st_size for path in ENTRY_ASSETS)
    scene_bytes = sum((ROOT / path).stat().st_size for path in SCENE_ASSETS)
    if entry_bytes > 250_000:
        fail(f"entry shell is {entry_bytes:,} bytes; budget is 250,000", failures)
    if scene_bytes > 1_000_000:
        fail(f"scene runtime is {scene_bytes:,} bytes; budget is 1,000,000", failures)

    if failures:
        print("Portfolio checks failed:")
        print("\n".join(f"- {item}" for item in failures))
        return 1

    print(f"Portfolio checks passed: {len(HTML)} pages, entry {entry_bytes:,} bytes, scene {scene_bytes:,} bytes.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
