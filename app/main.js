// Router for Indonesia in Numbers: hash routes, one page per section.
// Routes: #/ (Overview), #/population, #/economy, #/prices, #/provinces, #/about
import { VIEWS, drawFor } from "./views.js";

const ROUTES = {
  "": { title: "Overview", view: "overview" },
  population: { title: "Population", view: "population" },
  economy: { title: "Economy", view: "economy" },
  prices: { title: "Prices & Work", view: "prices" },
  provinces: { title: "Provinces", view: "provinces" },
  about: { title: "About", view: "about" },
};

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, "").split("/")[0];
  return ROUTES[hash] ? hash : "";
}

function render() {
  const route = currentRoute();
  const def = ROUTES[route];
  document.getElementById("page-title").textContent = def.title;
  document.getElementById("view").innerHTML = VIEWS[def.view]();
  drawFor(def.view);
  document.querySelectorAll("nav a").forEach((a) => {
    a.setAttribute("aria-current", a.dataset.route === route ? "page" : "false");
  });
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
