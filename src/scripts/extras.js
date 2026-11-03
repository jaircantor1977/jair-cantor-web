/**
 * Additional services
 * Expands and collapses the details of each add-on card.
 */

document.querySelectorAll(".extra-card-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".extra-card");
    const details = document.getElementById(button.getAttribute("aria-controls"));
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    card.classList.toggle("is-open", !isOpen);
    if (details) details.hidden = isOpen;
  });
});
