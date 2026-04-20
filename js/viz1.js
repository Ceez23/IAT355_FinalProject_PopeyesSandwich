
// VIZ 1 — Line chart: AI Adoption Over Time


let v1Rendered = false;

function renderV1(country) {
  const data  = filterData(country, null, null);
  const years = [2020, 2021, 2022, 2023, 2024, 2025];

  const aggData = years.map(y => {
    const yRows = data.filter(d => d.Year === y);
    const g   = yRows.filter(d => d.Industry === 'Gaming');
    const m   = yRows.filter(d => d.Industry === 'Marketing');
    const med = yRows.filter(d => d.Industry === 'Media');
    return {
      Year: String(y),
      Gaming:    g.length   ? +(avg(g,   'AI Adoption Rate (%)')).toFixed(1) : null,
      Marketing: m.length   ? +(avg(m,   'AI Adoption Rate (%)')).toFixed(1) : null,
      Media:     med.length ? +(avg(med, 'AI Adoption Rate (%)')).toFixed(1) : null
    };
  });

  const longData = [];
  aggData.forEach(row => {
    ['Gaming', 'Marketing', 'Media'].forEach(ind => {
      if (row[ind] !== null) longData.push({ Year: row.Year, Industry: ind, Value: row[ind] });
    });
  });

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    width: 660, height: 340,
    padding: { top: 16, right: 16, bottom: 8, left: 8 },
    layer: [
      {
        data: { values: [{ Year: '2022' }] },
        mark: { type: 'rule', strokeDash: [5,4], strokeWidth: 1, color: '#9A9A8E' },
        encoding: { x: { field: 'Year', type: 'ordinal' } }
      },
      {
        data: { values: [{ Year: '2024' }] },
        mark: { type: 'rule', strokeDash: [5,4], strokeWidth: 1, color: '#FBB4B4' },
        encoding: { x: { field: 'Year', type: 'ordinal' } }
      },
      {
        data: { values: longData },
        params: [{ name: 'indSel', select: { type: 'point', fields: ['Industry'] }, bind: 'legend' }],
        mark: { type: 'line', interpolate: 'monotone', strokeCap: 'round' },
        encoding: {
          x: { field: 'Year', type: 'ordinal', axis: { labelAngle: 0 } },
          y: { field: 'Value', type: 'quantitative', scale: { domain: [0, 100] }, title: 'Avg AI Adoption Rate (%)' },
          color: { field: 'Industry', type: 'nominal', scale: COLORS, legend: { title: 'Click to isolate' } },
          opacity:     { condition: { param: 'indSel', value: 1 }, value: 0.15 },
          strokeWidth: { condition: { param: 'indSel', value: 3 }, value: 1.75 }
        }
      },
      {
        data: { values: longData },
        mark: { type: 'point', filled: true, stroke: '#F0EBE0', strokeWidth: 2 },
        encoding: {
          x: { field: 'Year', type: 'ordinal' },
          y: { field: 'Value', type: 'quantitative' },
          color:   { field: 'Industry', type: 'nominal', scale: COLORS, legend: null },
          opacity: { condition: { param: 'indSel', value: 1 }, value: 0.15 },
          size:    { condition: { param: 'hoverV1', value: 200 }, value: 65 }
        }
      },
      {
        data: { values: aggData },
        params: [{ name: 'hoverV1', select: { type: 'point', nearest: true, on: 'mouseover', clear: 'mouseout' } }],
        mark: { type: 'rule', strokeWidth: 1 },
        encoding: {
          x: { field: 'Year', type: 'ordinal' },
          color:   { value: '#D4CFC4' },
          opacity: { condition: { param: 'hoverV1', value: 0.8 }, value: 0 },
          tooltip: [
            { field: 'Year',      type: 'ordinal',      title: 'Year' },
            { field: 'Gaming',    type: 'quantitative', title: 'Gaming (%)',    format: '.1f' },
            { field: 'Marketing', type: 'quantitative', title: 'Marketing (%)', format: '.1f' },
            { field: 'Media',     type: 'quantitative', title: 'Media (%)',     format: '.1f' }
          ]
        }
      }
    ],
    config: CHART_CONFIG
  };

  vegaEmbed('#chart-v1', spec, VEGAEMBED_OPTS);
  v1Rendered = true;
}

document.getElementById('v1-country').addEventListener('change', e => renderV1(e.target.value));
