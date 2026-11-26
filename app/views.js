// Page views for Indonesia in Numbers. Each view is a hash route that
// renders into #view; charts are drawn right after the HTML lands.
import { DATA } from "./data.js";
import { drawBars, drawLine } from "./charts.js";

function kpiCards(kpis) {
  return `<div class="kpis">` + kpis.map((k) =>
    `<div class="kpi"><div class="kpi-value">${k.value}</div>` +
    `<div class="kpi-label">${k.label}</div><div class="kpi-note">${k.note}</div></div>`
  ).join("") + `</div>`;
}

function section(title, inner, note) {
  return `<section class="card"><h2>${title}</h2>${inner}` +
    (note ? `<p class="source">${note}</p>` : ``) + `</section>`;
}

function overview() {
  const top5 = DATA.provinces.slice(0, 5).map((p) =>
    `<tr><td>${p.name}</td><td class="num">${p.pop.toFixed(1)}m</td>` +
    `<td class="num col-density">${p.density.toLocaleString("en-US")}</td></tr>`).join("");
  return `
  <p class="lede">Indonesia at a glance: the people, the economy and the regions of the
  world's fourth most populous country — every figure from BPS, the World Bank and UNDP.</p>
  ${kpiCards(DATA.kpis)}
  ${section("Growth after the pandemic",
    `<canvas id="chart-growth" aria-label="Real GDP growth 2015 to 2024"></canvas>`,
    "Real GDP growth, annual %. Source: BPS / World Bank. The 2020 dip is the COVID-19 recession; growth has held near 5% since 2022.")}
  <div class="grid2">
  ${section("Who lives where",
    `<table><thead><tr><th>Province</th><th class="num">People</th><th class="num col-density">Per km²</th></tr></thead><tbody>${top5}</tbody></table>
     <p><a href="#/provinces">See all ten largest provinces →</a></p>`,
    "Population, millions, 2024. Source: BPS.")}
  ${section("What the economy makes",
    `<canvas id="chart-sectors" aria-label="Gross value added by sector"></canvas>`,
    "Share of GDP, 2024. Source: World Bank / Destatis.")}
  </div>`;
}

function population() {
  return `
  <p class="lede">283.5 million people on more than 17,000 islands — most of them on Java,
  which holds 55.9% of the population on 7% of the land.</p>
  ${kpiCards([
    { label: "Population", value: "283.5m", note: "2024, World Bank" },
    { label: "Growth", value: "0.8%", note: "Per year, 2024" },
    { label: "Median age", value: "31 yrs", note: "Half the country is younger" },
    { label: "Urban share", value: "58.8%", note: "Living in cities" },
  ])}
  ${section("Age structure",
    `<canvas id="chart-age" aria-label="Population by age group"></canvas>`,
    "Share of population, 2024. Source: World Bank.")}
  ${section("People by province",
    `<div class="controls"><label>Sort by
      <select id="pop-sort"><option value="pop">Largest first</option>
      <option value="name">Name A–Z</option><option value="density">Densest first</option></select>
    </label></div>
    <canvas id="chart-provinces" aria-label="Population of the ten largest provinces"></canvas>`,
    "Population, millions, 2024. Source: BPS.")}
  ${section("The facts",
    `<p>Java's six provinces hold about 158 million people. The least populous province,
    South Papua, has about 0.5 million. Fertility has fallen to 2.13 births per woman,
    and life expectancy is 71.3 years — 69.0 for men, 73.3 for women.</p>`,
    "Sources: BPS, World Bank, 2023–2024.")}`;
}

function economy() {
  return `
  <p class="lede">A $1,396 billion economy that has grown near 5% a year since 2022 —
  driven by household spending, manufacturing and commodities.</p>
  ${kpiCards([
    { label: "GDP", value: "$1,396bn", note: "Nominal, 2024" },
    { label: "GDP per capita", value: "$4,958", note: "Nominal, 2024" },
    { label: "GDP (PPP)", value: "$4,102bn", note: "2024" },
    { label: "Exports", value: "22.2%", note: "Of GDP, goods and services" },
  ])}
  ${section("Pick an indicator",
    `<div class="controls"><label>Indicator
      <select id="econ-metric">
        <option value="gdpGrowth">GDP growth (%)</option>
        <option value="inflation">Inflation (%)</option>
        <option value="poverty">Poverty rate (%)</option>
        <option value="unemployment">Unemployment (%)</option>
      </select></label>
      <span id="econ-note" class="hint"></span></div>
    <canvas id="chart-econ" aria-label="Selected economic indicator over time"></canvas>`,
    "Annual figures, 2020–2024 (GDP growth 2015–2024). Source: BPS / World Bank.")}
  ${section("What the economy makes",
    `<canvas id="chart-sectors2" aria-label="Gross value added by sector"></canvas>`,
    "Share of GDP, 2024. Source: World Bank / Destatis.")}
  ${section("The facts",
    `<p>Foreign investment reached $24.2 billion in 2024. Government debt is 39.8% of GDP.
    Manufacturing is the largest single industry; coal, palm oil and nickel are the
    biggest commodity exports.</p>`,
    "Sources: World Bank, BPS, 2024.")}`;
}

function prices() {
  return `
  <p class="lede">Prices, poverty and work: inflation is back near 2% after the 2022 spike,
  poverty is at its lowest in years, and unemployment keeps falling.</p>
  ${kpiCards([
    { label: "Inflation", value: "1.57%", note: "CPI, 2024" },
    { label: "Poverty rate", value: "8.6%", note: "National line, 2024" },
    { label: "Unemployment", value: "4.9%", note: "Open rate, 2024" },
    { label: "Labour force", value: "143.1m", note: "67.0% participate" },
  ])}
  ${section("Inflation, year by year",
    `<canvas id="chart-inflation" aria-label="CPI inflation 2020 to 2024"></canvas>`,
    "CPI inflation, annual %. Source: BPS.")}
  <div class="grid2">
  ${section("Poverty is falling",
    `<canvas id="chart-poverty" aria-label="Poverty rate 2020 to 2024"></canvas>`,
    "Share of population below the national poverty line. Source: BPS.")}
  ${section("Unemployment is falling",
    `<canvas id="chart-unemployment" aria-label="Unemployment rate 2020 to 2024"></canvas>`,
    "Open unemployment, % of labour force. Source: BPS.")}
  </div>
  ${section("The facts",
    `<p>Youth unemployment (ages 15–24) is 13.1% — the one labour figure that has barely
    moved. The Gini index of income inequality is 0.349. About 54% of workers are
    self-employed or in informal work.</p>`,
    "Sources: BPS, World Bank, 2023–2024.")}`;
}

function provinces() {
  return `
  <p class="lede">All ten largest provinces, searchable and sortable. Java's three giants
  alone hold about 46% of the country.</p>
  ${section("Find a province",
    `<div class="controls"><label>Search
      <input id="prov-search" type="search" placeholder="Type a province name…" aria-label="Search provinces">
    </label><label>Sort by
      <select id="prov-sort"><option value="pop">Largest first</option>
      <option value="name">Name A–Z</option><option value="density">Densest first</option></select>
    </label></div>
    <table id="prov-table"><thead><tr><th>Province</th><th>Capital</th>
    <th class="num">People</th><th class="num col-density">Per km²</th></tr></thead>
    <tbody id="prov-body"></tbody></table>
    <p id="prov-count" class="hint"></p>`,
    "Population, millions, 2024. Density is people per km². Source: BPS.")}
  ${section("Where the people are",
    `<canvas id="chart-provbars" aria-label="Population of the ten largest provinces"></canvas>`,
    "Population, millions, 2024. Source: BPS.")}`;
}

function about() {
  return `
  <p class="lede">About this site — what it is, where the numbers come from, and what it does not do.</p>
  ${section("What this is",
    `<p><strong>Indonesia in Numbers</strong> is an independent statistics explorer built
    for the make.fun "best national statistics site" bounty. It is not affiliated with
    BPS, the World Bank or the Government of Indonesia, and it copies no other site's
    brand, text or images. Every page, chart and table on it is original work.</p>`)}
  ${section("Sources",
    `<ul>
      <li>BPS — Statistics Indonesia: population by province, poverty, unemployment, inflation.</li>
      <li>World Bank, World Development Indicators: GDP, population, life expectancy, age structure.</li>
      <li>Destatis international statistics (compiling BPS and World Bank): GDP detail by sector.</li>
      <li>UNDP Human Development Report: Human Development Index, 2023.</li>
    </ul>
    <p>All figures are for 2024 unless a year is stated next to them. Figures are rounded;
    shares may not sum to exactly 100%.</p>`)}
  ${section("How it works",
    `<p>The whole site is static files — no server, no network requests, no tracking.
    Charts are drawn in your browser from the figures in <code>data.js</code>. It works
    on a desktop and on a phone.</p>`)}`;
}

export const VIEWS = { overview, population, economy, prices, provinces, about };

export function drawFor(route) {
  if (route === "overview") {
    drawLine(document.getElementById("chart-growth"), DATA.gdpGrowth, "%");
    drawBars(document.getElementById("chart-sectors"),
      DATA.sectors.map((s) => ({ name: s.name, value: s.value })), "%");
  }
  if (route === "population") {
    drawBars(document.getElementById("chart-age"),
      DATA.ageStructure.map((s) => ({ name: s.name, value: s.value })), "%");
    drawProvinceChart("pop");
    const sort = document.getElementById("pop-sort");
    sort.addEventListener("change", () => drawProvinceChart(sort.value));
  }
  if (route === "economy") {
    const metric = document.getElementById("econ-metric");
    const notes = {
      gdpGrowth: "Real GDP growth, annual %. Source: BPS / World Bank.",
      inflation: "CPI inflation, annual %. Source: BPS.",
      poverty: "Share below the national poverty line. Source: BPS.",
      unemployment: "Open unemployment, % of labour force. Source: BPS.",
    };
    const draw = () => {
      drawLine(document.getElementById("chart-econ"), DATA[metric.value], "%");
      document.getElementById("econ-note").textContent = notes[metric.value];
    };
    metric.addEventListener("change", draw);
    draw();
    drawBars(document.getElementById("chart-sectors2"),
      DATA.sectors.map((s) => ({ name: s.name, value: s.value })), "%");
  }
  if (route === "prices") {
    drawLine(document.getElementById("chart-inflation"), DATA.inflation, "%");
    drawLine(document.getElementById("chart-poverty"), DATA.poverty, "%");
    drawLine(document.getElementById("chart-unemployment"), DATA.unemployment, "%");
  }
  if (route === "provinces") {
    renderProvinceTable();
    drawBars(document.getElementById("chart-provbars"),
      DATA.provinces.map((p) => ({ name: p.name, value: p.pop })), "m");
    const search = document.getElementById("prov-search");
    const sort = document.getElementById("prov-sort");
    search.addEventListener("input", renderProvinceTable);
    sort.addEventListener("change", renderProvinceTable);
  }
}

function drawProvinceChart(by) {
  const rows = [...DATA.provinces].sort((a, b) =>
    by === "name" ? a.name.localeCompare(b.name)
      : by === "density" ? b.density - a.density : b.pop - a.pop);
  drawBars(document.getElementById("chart-provinces"),
    rows.map((p) => ({ name: p.name, value: p.pop })), "m");
}

function renderProvinceTable() {
  const q = document.getElementById("prov-search").value.trim().toLowerCase();
  const by = document.getElementById("prov-sort").value;
  let rows = DATA.provinces.filter((p) => p.name.toLowerCase().includes(q));
  rows = [...rows].sort((a, b) =>
    by === "name" ? a.name.localeCompare(b.name)
      : by === "density" ? b.density - a.density : b.pop - a.pop);
  document.getElementById("prov-body").innerHTML = rows.map((p) =>
    `<tr><td>${p.name}</td><td>${p.capital}</td>` +
    `<td class="num">${p.pop.toFixed(1)}m</td>` +
    `<td class="num col-density">${p.density.toLocaleString("en-US")}</td></tr>`).join("") ||
    `<tr><td colspan="4">No province matches “${q}”.</td></tr>`;
  document.getElementById("prov-count").textContent =
    rows.length + " of " + DATA.provinces.length + " provinces shown.";
}
