
// VIZ 3 — Dual-line: Adoption vs Trust


let v3Rendered = false;

function renderV3(industry) {
  const data = filterData(null, null, industry);

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 660, height: 340,
    padding: { top: 16, right: 16, bottom: 8, left: 8 },
    data: { values: data },
    transform: [{ fold: ['AI Adoption Rate (%)', 'Consumer Trust in AI (%)'], as: ['Metric', 'Value'] }],
    layer: [
      {
        mark: { type: 'line', interpolate: 'monotone', strokeWidth: 2.5, strokeCap: 'round' },
        encoding: {
          x: { field: 'Year', type: 'ordinal', axis: { labelAngle: 0 } },
          y: { aggregate: 'mean', field: 'Value', type: 'quantitative', scale: { domain: [0, 100] }, title: 'Percentage (%)' },
          color: {
            field: 'Metric', type: 'nominal',
            scale: { domain: ['AI Adoption Rate (%)', 'Consumer Trust in AI (%)'], range: ['#3B82F6', '#F97316'] },
            legend: { title: 'Metric' }
          },
          strokeDash: {
            field: 'Metric', type: 'nominal',
            scale: { domain: ['AI Adoption Rate (%)', 'Consumer Trust in AI (%)'], range: [[0,0],[6,3]] },
            legend: null
          }
        }
      },
      {
        mark: { type: 'point', filled: true, stroke: '#F0EBE0', strokeWidth: 2, size: 65 },
        encoding: {
          x: { field: 'Year', type: 'ordinal' },
          y: { aggregate: 'mean', field: 'Value', type: 'quantitative' },
          color: {
            field: 'Metric', type: 'nominal',
            scale: { domain: ['AI Adoption Rate (%)', 'Consumer Trust in AI (%)'], range: ['#3B82F6', '#F97316'] },
            legend: null
          }
        }
      },
      {
        params: [{ name: 'hoverV3', select: { type: 'point', nearest: true, on: 'mouseover', clear: 'mouseout' } }],
        mark: { type: 'rule', color: '#D4CFC4', strokeWidth: 1 },
        transform: [{ filter: "datum.Metric === 'AI Adoption Rate (%)'" }],
        encoding: {
          x: { field: 'Year', type: 'ordinal' },
          opacity: { condition: { param: 'hoverV3', value: 0.8 }, value: 0 },
          tooltip: [
            { field: 'Year', type: 'ordinal' },
            { aggregate: 'mean', field: 'AI Adoption Rate (%)', type: 'quantitative', title: 'Adoption Rate (%)', format: '.1f' },
            { aggregate: 'mean', field: 'Consumer Trust in AI (%)', type: 'quantitative', title: 'Consumer Trust (%)', format: '.1f' }
          ]
        }
      }
    ],
    config: CHART_CONFIG
  };

  vegaEmbed('#chart-v3', spec, VEGAEMBED_OPTS);
  v3Rendered = true;
}

document.getElementById('v3-industry').addEventListener('change', e => renderV3(e.target.value));
