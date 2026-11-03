const dashboardsByLanguage = {
  es: {
    finance: {
      kicker: "Rentabilidad y flujo",
      title: "Dashboard financiero ejecutivo",
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      bars: [58, 46, 64, 72, 88, 93],
      kpis: [
        ["Ingresos", "$20.8M"],
        ["EBITDA", "$4.2M"],
        ["Margen neto", "14%"]
      ],
      donut: 68,
      donutLabel: "Avance del objetivo",
      insight: "Automatización diaria del reporte financiero con variaciones por producto y periodo."
    },
    sales: {
      kicker: "Ventas & CRM",
      title: "Pipeline comercial y conversión",
      labels: ["Leads", "MQL", "SQL", "Demo", "Oferta", "Cierre"],
      bars: [92, 78, 61, 48, 36, 28],
      kpis: [
        ["Pipeline", "$1.4M"],
        ["Conversión", "31%"],
        ["Ticket prom.", "$8.7K"]
      ],
      donut: 74,
      donutLabel: "Meta de ventas",
      insight: "Seguimiento del embudo por vendedor, fuente, etapa y probabilidad de cierre."
    },
    marketing: {
      kicker: "Marketing & crecimiento",
      title: "ROI de campañas y adquisición",
      labels: ["SEO", "Ads", "Email", "Social", "Events", "Ref."],
      bars: [64, 83, 58, 49, 34, 72],
      kpis: [
        ["Leads", "4.8K"],
        ["CAC", "$18"],
        ["ROI", "3.6x"]
      ],
      donut: 81,
      donutLabel: "ROAS objetivo",
      insight: "Comparación de canales por costo, conversión, calidad de lead y retorno de inversión."
    },
    ops: {
      kicker: "Operaciones & logística",
      title: "Cumplimiento operativo en tiempo real",
      labels: ["Picking", "Packing", "Desp.", "Ent.", "Inc.", "SLA"],
      bars: [76, 82, 69, 88, 32, 91],
      kpis: [
        ["Órdenes", "12.4K"],
        ["SLA", "91%"],
        ["Incidencias", "-18%"]
      ],
      donut: 91,
      donutLabel: "Cumplimiento SLA",
      insight: "Monitoreo de inventario, entregas, cuellos de botella, productividad y alertas operativas."
    }
  },
  en: {
    finance: {
      kicker: "Profitability and cash flow",
      title: "Executive financial dashboard",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      bars: [58, 46, 64, 72, 88, 93],
      kpis: [
        ["Revenue", "$20.8M"],
        ["EBITDA", "$4.2M"],
        ["Net margin", "14%"]
      ],
      donut: 68,
      donutLabel: "Goal progress",
      insight: "Daily financial report automation with variances by product and period."
    },
    sales: {
      kicker: "Sales & CRM",
      title: "Sales pipeline and conversion",
      labels: ["Leads", "MQL", "SQL", "Demo", "Offer", "Won"],
      bars: [92, 78, 61, 48, 36, 28],
      kpis: [
        ["Pipeline", "$1.4M"],
        ["Conversion", "31%"],
        ["Avg. ticket", "$8.7K"]
      ],
      donut: 74,
      donutLabel: "Sales target",
      insight: "Funnel tracking by rep, source, stage, and close probability."
    },
    marketing: {
      kicker: "Marketing & growth",
      title: "Campaign ROI and acquisition",
      labels: ["SEO", "Ads", "Email", "Social", "Events", "Ref."],
      bars: [64, 83, 58, 49, 34, 72],
      kpis: [
        ["Leads", "4.8K"],
        ["CAC", "$18"],
        ["ROI", "3.6x"]
      ],
      donut: 81,
      donutLabel: "Target ROAS",
      insight: "Channel comparison by cost, conversion, lead quality, and return on investment."
    },
    ops: {
      kicker: "Operations & logistics",
      title: "Real-time operational performance",
      labels: ["Picking", "Packing", "Ship.", "Deliv.", "Issues", "SLA"],
      bars: [76, 82, 69, 88, 32, 91],
      kpis: [
        ["Orders", "12.4K"],
        ["SLA", "91%"],
        ["Incidents", "-18%"]
      ],
      donut: 91,
      donutLabel: "SLA compliance",
      insight: "Monitoring of inventory, deliveries, bottlenecks, productivity, and operational alerts."
    }
  }
};

const dashboards = dashboardsByLanguage[document.documentElement.lang === "en" ? "en" : "es"];

const tabs = document.querySelectorAll("[data-dashboard]");
const bars = document.querySelector("[data-live-bars]");
const range = document.querySelector("[data-period-range]");

const els = {
  kicker: document.querySelector("[data-live-kicker]"),
  title: document.querySelector("[data-live-title]"),
  kpiOneLabel: document.querySelector("[data-kpi-one-label]"),
  kpiOne: document.querySelector("[data-kpi-one]"),
  kpiTwoLabel: document.querySelector("[data-kpi-two-label]"),
  kpiTwo: document.querySelector("[data-kpi-two]"),
  kpiThreeLabel: document.querySelector("[data-kpi-three-label]"),
  kpiThree: document.querySelector("[data-kpi-three]"),
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
  els.kpiOneLabel.textContent = data.kpis[0][0];
  els.kpiOne.textContent = data.kpis[0][1];
  els.kpiTwoLabel.textContent = data.kpis[1][0];
  els.kpiTwo.textContent = data.kpis[1][1];
  els.kpiThreeLabel.textContent = data.kpis[2][0];
  els.kpiThree.textContent = data.kpis[2][1];
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

renderDashboard(active);
