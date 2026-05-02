/**
 * Config-driven content
 * Loads frequently changing site content from /config/*.json.
 */

const getConfigUrl = () => {
  const language = document.documentElement.lang === "en" ? "en" : "es";
  return `config/site.${language}.json`;
};

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) {
    element.textContent = value;
  }
};

const setHtml = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) {
    element.innerHTML = value;
  }
};

const clearAndAppend = (selector, nodes) => {
  const element = document.querySelector(selector);
  if (!element) return;
  element.replaceChildren(...nodes);
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const renderServices = (services) => {
  if (!services) return;

  setText("#servicios .section-intro .eyebrow", services.eyebrow);
  setText("#servicios .section-intro h2", services.title);
  setText("#servicios .section-intro p:not(.eyebrow)", services.description);

  const cards = (services.items || []).map((service, index) => {
    const article = createElement("article", "service-card");
    const number = String(index + 1).padStart(2, "0");
    article.append(
      createElement("span", "service-icon", number),
      createElement("h3", "", service.title),
      createElement("p", "", service.description)
    );
    return article;
  });

  clearAndAppend("#servicios .service-grid", cards);
};

const renderPackages = (packages) => {
  if (!packages) return;

  setText("#paquetes .section-intro .eyebrow", packages.eyebrow);
  setText("#paquetes .section-intro h2", packages.title);
  setText("#paquetes .section-intro p:not(.eyebrow)", packages.description);

  const cards = (packages.items || []).map((plan) => {
    const classes = ["price-card", plan.style].filter(Boolean).join(" ");
    const article = createElement("article", classes);

    if (plan.badge) {
      article.append(createElement("div", "badge", plan.badge));
    }

    const featureList = document.createElement("ul");
    (plan.features || []).forEach((feature) => {
      featureList.append(createElement("li", "", feature));
    });

    article.append(
      createElement("p", "", plan.name),
      createElement("h3", "", plan.price),
      createElement("span", "", plan.delivery),
      featureList
    );

    return article;
  });

  clearAndAppend("#paquetes .pricing-grid", cards);
};

const renderAdditionalServices = (additionalServices) => {
  if (!additionalServices) return;

  const extras = document.querySelector("#paquetes .extras");
  if (!extras) return;

  const header = createElement("div", "extras-header");
  const intro = createElement("div", "extras-copy");
  intro.append(
    createElement("h3", "", additionalServices.title),
    createElement("p", "", additionalServices.description)
  );
  header.append(
    intro,
    createElement("span", "extras-label", additionalServices.label)
  );

  const grid = createElement("div", "extras-grid");
  (additionalServices.items || []).forEach((item, index) => {
    const article = createElement("article", "extra-card");
    const detailsId = `extra-details-${index + 1}`;
    const button = createElement("button", "extra-card-toggle");
    button.type = "button";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", detailsId);

    const number = createElement("span", "extra-card-number", String(index + 1).padStart(2, "0"));
    const content = createElement("span", "extra-card-content");
    content.append(
      createElement("strong", "", item.name),
      createElement("small", "", item.description)
    );
    const price = createElement("b", "extra-card-price", item.price);
    const icon = createElement("span", "extra-card-icon", "+");
    icon.setAttribute("aria-hidden", "true");

    button.append(number, content, price, icon);

    const details = createElement("div", "extra-card-details");
    details.id = detailsId;
    details.hidden = true;

    const list = document.createElement("ul");
    (item.details || []).forEach((detail) => {
      list.append(createElement("li", "", detail));
    });
    details.append(list);

    article.append(button, details);
    grid.append(article);
  });

  extras.replaceChildren(header, grid);
  setupAdditionalServiceToggles(extras);
};

const setupAdditionalServiceToggles = (extras) => {
  extras.querySelectorAll(".extra-card-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".extra-card");
      const details = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";

      button.setAttribute("aria-expanded", String(!isOpen));
      card.classList.toggle("is-open", !isOpen);
      if (details) details.hidden = isOpen;
    });
  });
};

const renderContact = (contact) => {
  if (!contact) return;

  setHtml(".final-cta .eyebrow", contact.availability);
  setText(".final-cta h2", contact.title);
  setText(".final-cta p:not(.eyebrow)", contact.description);

  const cta = document.querySelector(".final-cta .button");
  if (cta) {
    cta.textContent = contact.buttonLabel;
    cta.href = contact.url;
  }

  const footerWorkana = document.querySelector("footer .footer-content p:nth-child(2)");
  if (footerWorkana) {
    footerWorkana.innerHTML = `${contact.footerAvailability} <a href="${contact.url}" target="_blank" rel="noopener noreferrer">Workana</a> - ${contact.footerLocation}`;
  }
};

const initConfigContent = async () => {
  try {
    const response = await fetch(getConfigUrl(), { cache: "no-cache" });
    if (!response.ok) throw new Error(`Config request failed: ${response.status}`);

    const config = await response.json();
    renderServices(config.services);
    renderPackages(config.packages);
    renderAdditionalServices(config.additionalServices);
    renderContact(config.contact);
    document.dispatchEvent(new CustomEvent("site-content-rendered"));
  } catch (error) {
    console.warn("Using static HTML fallback. Config content could not be loaded.", error);
  }
};

initConfigContent();
