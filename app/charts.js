// Canvas charts for Indonesia in Numbers. No libraries, no network:
// every chart is drawn by hand from the figures in data.js.
const INK = "#1a2b3c";
const MUTED = "#5b6b7a";
const TEAL = "#0e6e6a";
const AMBER = "#d98e04";
const GRID = "#dde3e8";

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.height = height + "px";
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = "12px system-ui, sans-serif";
  return { ctx, width, height };
}

function axes(ctx, x0, y0, x1, y1, min, max, unit) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.lineWidth = 1;
  const steps = 4;
  ctx.textAlign = "right";
  for (let i = 0; i <= steps; i++) {
    const v = min + ((max - min) * i) / steps;
    const y = y1 - ((y1 - y0) * i) / steps;
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
    ctx.fillText(v.toFixed(1) + unit, x0 - 8, y + 4);
  }
}

// Line chart over a {year, value} series. Draws points and year labels.
export function drawLine(canvas, series, unit) {
  const { ctx, width, height } = setup(canvas, 220);
  const padL = 52, padR = 16, padT = 14, padB = 28;
  const values = series.map((p) => p.value);
  let min = Math.min(...values), max = Math.max(...values);
  const span = Math.max(max - min, 1);
  min -= span * 0.15;
  max += span * 0.15;
  const x0 = padL, x1 = width - padR, y0 = padT, y1 = height - padB;
  axes(ctx, x0, y0, x1, y1, min, max, unit);
  const px = (i) => x0 + ((x1 - x0) * i) / (series.length - 1);
  const py = (v) => y1 - ((y1 - y0) * (v - min)) / (max - min);
  ctx.strokeStyle = TEAL;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  series.forEach((p, i) => (i === 0 ? ctx.moveTo(px(i), py(p.value)) : ctx.lineTo(px(i), py(p.value))));
  ctx.stroke();
  ctx.fillStyle = TEAL;
  series.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(px(i), py(p.value), 4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  series.forEach((p, i) => {
    ctx.fillText(String(p.year), px(i), height - 8);
    ctx.fillText(p.value.toFixed(1) + unit, px(i), py(p.value) - 10);
  });
}

// Horizontal bar chart over {name, value} items. `unit` is appended to values.
export function drawBars(canvas, items, unit) {
  const rowH = 34;
  const { ctx, width, height } = setup(canvas, items.length * rowH + 16);
  const max = Math.max(...items.map((d) => d.value));
  const labelW = 150, padR = 56;
  ctx.textAlign = "left";
  items.forEach((d, i) => {
    const y = 8 + i * rowH;
    ctx.fillStyle = INK;
    ctx.fillText(d.name, 0, y + 15);
    const barX = labelW;
    const barW = ((width - labelW - padR) * d.value) / max;
    ctx.fillStyle = i === 0 ? AMBER : TEAL;
    ctx.fillRect(barX, y, barW, 20);
    ctx.fillStyle = INK;
    ctx.fillText(d.value.toFixed(1) + unit, barX + barW + 8, y + 15);
  });
}
