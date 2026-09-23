const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const siteHeader = document.querySelector(".site-header");

const labEntry = document.querySelector("[data-lab-entry]");
const enterLab = document.querySelector("[data-enter-lab]");
if (labEntry && enterLab) {
  const openLab = () => {
    document.body.classList.add("lab-entered");
    enterLab.setAttribute("aria-pressed", "true");
    window.dispatchEvent(new CustomEvent("lab:entered"));
    document.querySelector('[data-inspect="projects"]')?.focus({ preventScroll: true });
  };
  enterLab.addEventListener("click", openLab);
}

if (menuToggle && primaryNav) {
  menuToggle.hidden = false;
  siteHeader?.classList.add("menu-ready");

  const closeMenu = ({ restoreFocus = false } = {}) => {
    menuToggle.setAttribute("aria-expanded", "false");
    primaryNav.classList.remove("open");
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    primaryNav.classList.toggle("open", willOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  window.matchMedia("(min-width: 1001px)").addEventListener("change", () => closeMenu());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu({ restoreFocus: true });
    }
  });
}

const commandDefinitions = [
  { command: "projects", detail: "TabletopForge and the NIST CFReDS investigation", href: "index.html#projects", keywords: "work cases portfolio forensics disk image" },
  { command: "experience", detail: "Cybersecurity internship at Pelycon Technologies", href: "index.html#internship", keywords: "internship m365 entra" },
  { command: "education", detail: "Digital Forensics & Cybersecurity at EKU", href: "index.html#education", keywords: "degree university resume courses" },
  { command: "ccdc", detail: "Competition defense and team leadership", href: "index.html#ccdc", keywords: "linux windows proxmox captain" },
  { command: "contact", detail: "Email, LinkedIn, and message form", href: "index.html#contact", keywords: "connect" },
];

function buildCommandPalette() {
  if (document.querySelector("#command-palette")) return document.querySelector("#command-palette");

  const dialog = document.createElement("dialog");
  dialog.className = "command-palette command-dialog";
  dialog.id = "command-palette";
  dialog.setAttribute("aria-labelledby", "command-title");

  const panel = document.createElement("div");
  panel.className = "command-panel";
  panel.innerHTML = `
    <div class="command-header">
      <div><p class="mono">NAVIGATION INDEX</p><h2 id="command-title">Go to a section</h2></div>
      <button class="command-close" type="button" aria-label="Close command palette">Esc</button>
    </div>
    <div class="command-search-wrap">
      <label class="command-search-label" for="command-search">Search commands</label>
      <input class="command-search" id="command-search" type="search" autocomplete="off" spellcheck="false" placeholder="Type a command…">
    </div>
    <nav class="command-results" aria-label="Commands"></nav>
    <p class="command-empty" hidden>No matching command. Try “projects” or “contact”.</p>
    <p class="command-help command-footer mono"><span>↑↓ Move</span><span>Enter Open</span><span>Esc Close</span></p>`;
  dialog.append(panel);

  const results = panel.querySelector(".command-results");
  commandDefinitions.forEach(({ command, detail, href, keywords }) => {
    const link = document.createElement("a");
    link.href = location.pathname.endsWith("/") || location.pathname.endsWith("index.html") ? href.replace("index.html", "") : href;
    link.dataset.search = `${command} ${detail} ${keywords}`.toLowerCase();
    link.innerHTML = `<span><strong>${command}</strong><span>${detail}</span></span><i aria-hidden="true">↗</i>`;
    results.append(link);
  });
  document.body.append(dialog);
  return dialog;
}

const commandDialog = buildCommandPalette();
const commandInput = commandDialog?.querySelector(".command-search");
const commandEmpty = commandDialog?.querySelector(".command-empty");
let commandReturnFocus = null;

function visibleCommands() {
  if (!commandDialog) return [];
  return [...commandDialog.querySelectorAll(".command-results a")].filter((link) => !link.hidden);
}

function filterCommands(value = "") {
  if (!commandDialog) return;
  const query = value.trim().toLowerCase();
  const links = [...commandDialog.querySelectorAll(".command-results a")];
  links.forEach((link) => {
    link.hidden = Boolean(query) && !link.dataset.search.includes(query);
  });
  if (commandEmpty) commandEmpty.hidden = visibleCommands().length > 0;
}

function openCommandPalette() {
  if (!commandDialog || commandDialog.open) return;
  commandReturnFocus = document.activeElement;
  filterCommands("");
  if (commandInput) commandInput.value = "";
  commandDialog.showModal();
  requestAnimationFrame(() => commandInput?.focus());
}

document.querySelectorAll(".command-trigger").forEach((trigger) => {
  trigger.hidden = false;
  trigger.addEventListener("click", openCommandPalette);
});

if (commandDialog) {
  commandDialog.querySelector(".command-close")?.addEventListener("click", () => commandDialog.close());
  commandInput?.addEventListener("input", () => filterCommands(commandInput.value));
  commandInput?.addEventListener("keydown", (event) => {
    const links = visibleCommands();
    if (event.key === "ArrowDown" && links.length) {
      event.preventDefault();
      links[0].focus();
    } else if (event.key === "Enter" && links.length) {
      event.preventDefault();
      links[0].click();
    }
  });
  commandDialog.querySelector(".command-results")?.addEventListener("keydown", (event) => {
    if (!event.target.matches("a") || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();
    const links = visibleCommands();
    const current = links.indexOf(event.target);
    const next = event.key === "ArrowDown" ? current + 1 : current - 1;
    if (next < 0) commandInput?.focus();
    else links[Math.min(next, links.length - 1)]?.focus();
  });
  commandDialog.querySelector(".command-results").addEventListener("click", (event) => {
    const anchor = event.target.closest("a");
    if (!anchor) return;
    // Dismissal restores the opener; navigation moves focus to its destination.
    commandReturnFocus = null;
    commandDialog.close();
    const destination = new URL(anchor.href);
    if (destination.pathname === location.pathname && destination.hash) {
      const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
      if (target) {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    }
  });
  commandDialog.addEventListener("click", (event) => {
    if (event.target === commandDialog) commandDialog.close();
  });
  commandDialog.addEventListener("close", () => {
    if (commandReturnFocus instanceof HTMLElement) commandReturnFocus.focus();
    commandReturnFocus = null;
  });
}

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const isTyping = target instanceof HTMLElement && (
    target.matches("input, textarea, select") || target.isContentEditable
  );
  if (isTyping) return;
  if (event.key === "/" || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")) {
    event.preventDefault();
    openCommandPalette();
  }
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
