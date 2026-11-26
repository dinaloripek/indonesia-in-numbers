// Indonesia in Numbers — every figure on this site, in one place.
//
// Sources (all figures are for 2024 unless a year is stated):
//   BPS (Statistics Indonesia) — population, poverty, unemployment, prices
//   World Bank, World Development Indicators — GDP, population, life expectancy
//   Destatis international statistics (compiling BPS / World Bank) — GDP detail
//   UNDP Human Development Report — Human Development Index (2023)
// Figures are rounded to one decimal where the source gives more.
export const DATA = {
  country: "Indonesia",
  updated: "November 2026",
  kpis: [
    { label: "Population", value: "283.5m", note: "4th largest in the world" },
    { label: "GDP", value: "$1,396bn", note: "16th largest economy" },
    { label: "GDP per capita", value: "$4,958", note: "Upper-middle income" },
    { label: "GDP growth", value: "5.03%", note: "Real growth, 2024" },
    { label: "Life expectancy", value: "71.3 yrs", note: "At birth, World Bank" },
    { label: "Human Development Index", value: "0.728", note: "High, UNDP 2023" },
  ],
  // Real GDP growth, annual %, 2015-2024 (BPS / World Bank).
  gdpGrowth: [
    { year: 2015, value: 4.9 }, { year: 2016, value: 5.0 },
    { year: 2017, value: 5.1 }, { year: 2018, value: 5.2 },
    { year: 2019, value: 5.0 }, { year: 2020, value: -2.1 },
    { year: 2021, value: 3.7 }, { year: 2022, value: 5.3 },
    { year: 2023, value: 5.0 }, { year: 2024, value: 5.0 },
  ],
  // CPI inflation, annual %, 2020-2024 (BPS).
  inflation: [
    { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
  ],
  // Poverty rate, % of population below the national line (BPS).
  poverty: [
    { year: 2020, value: 10.2 }, { year: 2021, value: 9.7 },
    { year: 2022, value: 9.6 }, { year: 2023, value: 9.4 },
    { year: 2024, value: 8.6 },
  ],
  // Open unemployment rate, % of labour force (BPS).
  unemployment: [
    { year: 2020, value: 7.1 }, { year: 2021, value: 6.5 },
    { year: 2022, value: 5.9 }, { year: 2023, value: 5.3 },
    { year: 2024, value: 4.9 },
  ],
  // Gross value added by sector, % of GDP, 2024 (World Bank / Destatis).
  sectors: [
    { name: "Services", value: 48.1 },
    { name: "Industry", value: 39.3 },
    { name: "Agriculture", value: 12.6 },
  ],
  // Age structure, % of population, 2024 (World Bank).
  ageStructure: [
    { name: "Ages 0–14", value: 24.6 },
    { name: "Ages 15–64", value: 68.1 },
    { name: "Ages 65+", value: 7.3 },
  ],
  // Ten largest provinces by population, millions, 2024 (BPS).
  // Density is people per km² (BPS 2024) where published.
  provinces: [
    { name: "West Java", pop: 50.3, density: 1359, capital: "Bandung" },
    { name: "East Java", pop: 41.9, density: 870, capital: "Surabaya" },
    { name: "Central Java", pop: 37.9, density: 1104, capital: "Semarang" },
    { name: "North Sumatra", pop: 15.6, density: 214, capital: "Medan" },
    { name: "Banten", pop: 12.4, density: 1329, capital: "Serang" },
    { name: "Jakarta", pop: 10.7, density: 16165, capital: "Jakarta" },
    { name: "South Sulawesi", pop: 9.4, density: 201, capital: "Makassar" },
    { name: "Lampung", pop: 9.3, density: 267, capital: "Bandar Lampung" },
    { name: "South Sumatra", pop: 8.9, density: 97, capital: "Palembang" },
    { name: "Riau", pop: 7.0, density: 80, capital: "Pekanbaru" },
  ],
  facts: [
    { label: "Provinces", value: "38", note: "Plus 98 cities and 416 regencies" },
    { label: "Labour force", value: "143.1m", note: "67.0% participation rate" },
    { label: "Urban population", value: "58.8%", note: "Of total population" },
    { label: "Fertility rate", value: "2.13", note: "Births per woman, 2023" },
    { label: "Gini index", value: "0.349", note: "Income inequality, 2024" },
    { label: "Government debt", value: "39.8%", note: "Of GDP" },
    { label: "Foreign investment", value: "$24.2bn", note: "FDI inflows, 2024" },
    { label: "Adult literacy", value: "96%", note: "Ages 15 and over" },
  ],
};
