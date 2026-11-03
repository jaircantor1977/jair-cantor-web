/**
 * Conversion tracking
 * Sends a Vercel Web Analytics custom event for every element with data-track
 * (contact links, WhatsApp, CTAs). Without the analytics script it does nothing.
 */

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-track]");
  if (!target) return;

  const name = target.dataset.track;
  const lang = document.documentElement.lang;
  window.va?.("event", { name, data: { lang } });
});
