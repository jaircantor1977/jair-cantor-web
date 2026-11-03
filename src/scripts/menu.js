/**
 * Mobile menu
 * Opens and closes the navigation panel on small screens; closes after choosing a link or pressing Escape.
 */

const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const setOpen = (open) => {
  header?.classList.toggle("menu-open", open);
  toggle?.setAttribute("aria-expanded", String(open));
};

toggle?.addEventListener("click", () => {
  setOpen(toggle.getAttribute("aria-expanded") !== "true");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") {
    setOpen(false);
    toggle.focus();
  }
});
