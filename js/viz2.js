
// VIZ 2 — Bar chart: Revenue by Industry


let v2Rendered = false;

function renderV2(year) {
  const data = filterData(null, year, null);

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 520, height: 320,
    padding: { top: 24, right: 16, bottom: 8, left: 8 },
    data: { values: data },
    layer: [
      {
        mark: { type: 'rule', strokeDash: [4,4], strokeWidth: 1, color: '#BFBAB0' },
        encoding: {
          y: { aggregate: 'mean', field: 'Revenue Increase Due to AI (%)', type: 'quantitative' }
        }
      },
      {
        params: [{ name: 'barSel', select: { type: 'point', on: 'mouseover', clear: 'mouseout' } }],
        mark: { type: 'bar', cornerRadiusTopLeft: 3, cornerRadiusTopRight: 3 },
        encoding: {
          x: {
            field: 'Industry', type: 'nominal', sort: '-y',
            axis: { labelAngle: 0, labelFontSize: 14, title: null, labelFont: 'Fraunces, serif', labelFontWeight: 500 }
          },
          y: {
            aggregate: 'mean', field: 'Revenue Increase Due to AI (%)',
            scale: { domain: [0, 65] }, title: 'Avg Revenue Increase (%)'
          },
          color:   { field: 'Industry', type: 'nominal', scale: COLORS, legend: null },
          opacity: { condition: { param: 'barSel', value: 1 }, value: 0.4 },
          tooltip: [
            { field: 'Industry', type: 'nominal' },
            { aggregate: 'mean', field: 'Revenue Increase Due to AI (%)', type: 'quantitative', title: 'Avg Revenue (%)', format: '.1f' },
            { aggregate: 'count', field: 'Industry', type: 'quantitative', title: 'n' }
          ]
        }
      },
      {
        mark: { type: 'text', dy: -12, fontSize: 16, fontWeight: 500, font: 'Fraunces, serif' },
        encoding: {
          x: { field: 'Industry', type: 'nominal', sort: '-y' },
          y: { aggregate: 'mean', field: 'Revenue Increase Due to AI (%)' },
          color: { field: 'Industry', type: 'nominal', scale: COLORS, legend: null },
          text: { aggregate: 'mean', field: 'Revenue Increase Due to AI (%)', type: 'quantitative', format: '.1f' }
        }
      }
    ],
    config: CHART_CONFIG
  };

  vegaEmbed('#chart-v2', spec, VEGAEMBED_OPTS).then(() => {
  animateV2Bars();
});
  v2Rendered = true;
}

function animateV2Bars() {
  const bars = document.querySelectorAll('#chart-v2 svg .mark-rect path, #chart-v2 svg .mark-rect rect');

  bars.forEach((bar, i) => {
    const height = bar.getBBox().height;

    const minDuration = 800;
    const maxDuration = 2800;
    const normalized = Math.min(height / 300, 1);
    const duration = maxDuration - normalized * (maxDuration - minDuration);

    bar.style.transformBox = 'fill-box';
    bar.style.transformOrigin = 'bottom';
    bar.style.transform = 'scaleY(0)';
    bar.style.transition = 'none';

    bar.getBoundingClientRect();

    setTimeout(() => {
      bar.style.transition = `transform ${duration}ms ease-out ${i * 120}ms`;
      bar.style.transform = 'scaleY(1)';
    }, 50);
  });
}

document.getElementById('v2-year').addEventListener('change', e => renderV2(e.target.value));
