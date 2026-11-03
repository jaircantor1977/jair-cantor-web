/**
 * Pricing tabs
 * Without JavaScript every panel stays visible; with it, one service line is shown at a time.
 * Links to #precios-<key> (for example from the AI or BLACKBOX Wolf sections) open that tab.
 */

const tabs = document.querySelectorAll("[data-pricing-tab]");
const panels = document.querySelectorAll("[data-pricing-panel]");

const activate = (key) => {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.pricingTab === key;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.pricingPanel !== key;
  });
};

const keyFromHash = (hash) => {
  const match = /^#precios-(\w+)$/.exec(hash || "");
  return match && document.querySelector(`[data-pricing-panel="${match[1]}"]`) ? match[1] : null;
};

if (tabs.length) {
  activate(keyFromHash(location.hash) || tabs[0].dataset.pricingTab);

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.pricingTab));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const step = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(index + step + tabs.length) % tabs.length];
      activate(next.dataset.pricingTab);
      next.focus();
    });
  });

  // Links like href="#precios-ia": open the tab, then scroll to the pricing section.
  document.querySelectorAll('a[href^="#precios-"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const key = keyFromHash(link.getAttribute("href"));
      if (!key) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      activate(key);
      document.getElementById("paquetes")?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#precios-${key}`);
    });
  });
}
