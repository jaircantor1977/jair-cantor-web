// Dashboard data is rendered into the page from src/content/<lang>.json.
const dataElement = document.querySelector("[data-dashboard-data]");
const dashboards = dataElement ? JSON.parse(dataElement.textContent) : {};

const tabs = document.querySelectorAll("[data-dashboard]");
const bars = document.querySelector("[data-live-bars]");
const range = document.querySelector("[data-period-range]");

const els = {
  kicker: document.querySelector("[data-live-kicker]"),
  title: document.querySelector("[data-live-title]"),
  kpiLabels: document.querySelectorAll("[data-kpi-label]"),
  kpiValues: document.querySelectorAll("[data-kpi-value]"),
  donut: document.querySelector("[data-donut]"),
  donutValue: document.querySelector("[data-donut-value]"),
  donutLabel: document.querySelector("[data-donut-label]"),
  insight: document.querySelector("[data-live-insight]")
};

let active = "finance";

function renderBars(data) {
  const period = Number(range?.value ?? data.bars.length - 1);
  const visibleBars = data.bars.map((value, index) => {
    const isPastPeriod = index <= period;
    const height = isPastPeriod ? value : Math.max(14, value * 0.35);
    const pixelHeight = Math.round(height * 2);
    return `
      <div class="live-bar">
        <i style="--bar-height: ${pixelHeight}px"></i>
        <b>${data.labels[index]}</b>
        <span>${isPastPeriod ? value : Math.round(height)}%</span>
      </div>
    `;
  });

  bars.innerHTML = visibleBars.join("");
}

function renderDashboard(key) {
  const data = dashboards[key];
  if (!data || !bars) return;

  els.kicker.textContent = data.kicker;
  els.title.textContent = data.title;
  data.kpis.forEach(([label, value], index) => {
    if (els.kpiLabels[index]) els.kpiLabels[index].textContent = label;
    if (els.kpiValues[index]) els.kpiValues[index].textContent = value;
  });
  els.donut.style.setProperty("--value", `${data.donut}%`);
  els.donutValue.textContent = `${data.donut}%`;
  els.donutLabel.textContent = data.donutLabel;
  els.insight.textContent = data.insight;
  renderBars(data);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    active = tab.dataset.dashboard;
    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    renderDashboard(active);
  });
});

range?.addEventListener("input", () => renderBars(dashboards[active]));
