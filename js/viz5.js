
// VIZ 5 — Faceted bar: Revenue × Regulation × Industry


let v5Rendered = false;

function renderV5() {
  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: { values: ALL_DATA },
    params: [{ name: 'regSel', select: { type: 'point', fields: ['Regulation Status'] }, bind: 'legend' }],
    mark: { type: 'bar', cornerRadiusTopLeft: 3, cornerRadiusTopRight: 3 },
    encoding: {
      x: {
        field: 'Regulation Status', type: 'nominal', sort: ['Lenient', 'Moderate', 'Strict'],
        axis: { labelAngle: 0, labelFontSize: 11, title: null }
      },
      y: {
        aggregate: 'mean', field: 'Revenue Increase Due to AI (%)',
        scale: { domain: [0, 65] }, title: 'Avg Revenue Increase (%)'
      },
      color: {
        field: 'Regulation Status', type: 'nominal',
        scale: { domain: ['Lenient', 'Moderate', 'Strict'], range: ['#10B981', '#F59E0B', '#EF4444'] },
        legend: { title: 'Click to isolate', orient: 'right' }
      },
      opacity: { condition: { param: 'regSel', value: 1 }, value: 0.2 },
      column: {
        field: 'Industry', type: 'nominal', sort: ['Gaming', 'Marketing', 'Media'],
        header: { title: null, labelFontSize: 15, labelFontWeight: 500, labelFont: 'Fraunces, serif', labelColor: '#1C1C1A', labelPadding: 14 }
      },
      tooltip: [
        { field: 'Industry', type: 'nominal' },
        { field: 'Regulation Status', type: 'nominal', title: 'Regulation' },
        { aggregate: 'mean', field: 'Revenue Increase Due to AI (%)', type: 'quantitative', title: 'Avg Revenue (%)', format: '.1f' },
        { aggregate: 'count', field: 'Industry', type: 'quantitative', title: 'n' }
      ]
    },
    width: 148, height: 280,
    config: { ...CHART_CONFIG, facet: { spacing: 20 } }
  };

  vegaEmbed('#chart-v5', spec, VEGAEMBED_OPTS);
  v5Rendered = true;
}
