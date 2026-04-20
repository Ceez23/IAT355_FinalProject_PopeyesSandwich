
// VIZ 4 — Dumbbell: Job Loss vs Revenue Gain


let v4Rendered = false;

function makeDumbbell(data) {
  return ['Gaming', 'Marketing', 'Media'].map(ind => {
    const rows = data.filter(d => d.Industry === ind);
    if (!rows.length) return { Industry: ind, JL: 0, RG: 0, Gap: 0, GapLabel: '—' };
    const jl  = avg(rows, 'Job Loss Due to AI (%)');
    const rv  = avg(rows, 'Revenue Increase Due to AI (%)');
    const gap = rv - jl;
    return {
      Industry: ind,
      JL: +jl.toFixed(1),
      RG: +rv.toFixed(1),
      Gap: +gap.toFixed(1),
      GapLabel: (gap >= 0 ? '+' : '') + gap.toFixed(1) + '%'
    };
  });
}

function renderV4(year) {
  const base = filterData(null, year, null);
  const data = makeDumbbell(base);

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 620, height: 220,
    padding: { top: 16, right: 70, bottom: 8, left: 16 },
    data: { values: data },
    layer: [
      {
        mark: { type: 'rule', strokeWidth: 7, color: '#E8E4DC', strokeCap: 'round' },
        encoding: {
          y: { field: 'Industry', type: 'nominal', sort: ['Gaming', 'Marketing', 'Media'],
               axis: { labelFontSize: 15, labelAngle: 0, labelFont: 'Fraunces, serif', labelFontWeight: 500, title: null } },
          x: { field: 'JL', type: 'quantitative', scale: { domain: [0, 80] }, title: 'Percentage (%)' },
          x2: { field: 'RG', type: 'quantitative' }
        }
      },
      {
        params: [{ name: 'hoverV4', select: { type: 'point', fields: ['Industry'], on: 'mouseover', clear: 'mouseout' } }],
        mark: { type: 'point', filled: true, size: 280, stroke: '#F0EBE0', strokeWidth: 2.5 },
        encoding: {
          y: { field: 'Industry', type: 'nominal', sort: ['Gaming', 'Marketing', 'Media'] },
          x: { field: 'JL', type: 'quantitative' },
          color:   { value: '#EF4444' },
          opacity: { condition: { param: 'hoverV4', value: 1 }, value: 0.3 },
          tooltip: [
            { field: 'Industry', type: 'nominal' },
            { field: 'JL', type: 'quantitative', title: 'Avg Job Displacement (%)', format: '.1f' },
            { field: 'RG', type: 'quantitative', title: 'Avg Revenue Gain (%)', format: '.1f' },
            { field: 'GapLabel', type: 'nominal', title: 'Net Gap' }
          ]
        }
      },
      {
        mark: { type: 'point', filled: true, size: 280, stroke: '#F0EBE0', strokeWidth: 2.5 },
        encoding: {
          y: { field: 'Industry', type: 'nominal', sort: ['Gaming', 'Marketing', 'Media'] },
          x: { field: 'RG', type: 'quantitative' },
          color:   { value: '#10B981' },
          opacity: { condition: { param: 'hoverV4', value: 1 }, value: 0.3 },
          tooltip: [
            { field: 'Industry', type: 'nominal' },
            { field: 'JL', type: 'quantitative', title: 'Avg Job Displacement (%)', format: '.1f' },
            { field: 'RG', type: 'quantitative', title: 'Avg Revenue Gain (%)', format: '.1f' },
            { field: 'GapLabel', type: 'nominal', title: 'Net Gap' }
          ]
        }
      },
      {
        mark: { type: 'text', align: 'left', dx: 14, fontSize: 12, color: '#9A9A8E', fontStyle: 'italic', font: 'JetBrains Mono, monospace' },
        encoding: {
          y: { field: 'Industry', type: 'nominal', sort: ['Gaming', 'Marketing', 'Media'] },
          x: { field: 'RG', type: 'quantitative' },
          text: { field: 'GapLabel', type: 'nominal' }
        }
      }
    ],
    config: CHART_CONFIG
  };

  vegaEmbed('#chart-v4', spec, VEGAEMBED_OPTS);
  v4Rendered = true;
}

document.getElementById('v4-year').addEventListener('change', e => renderV4(e.target.value));
