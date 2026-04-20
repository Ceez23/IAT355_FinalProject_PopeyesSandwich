

function avg(arr, field) {
  const vals = arr.map(d => d[field]).filter(v => v != null && !isNaN(v));
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}

function filterData(country, year, industry) {
  let d = [...ALL_DATA];
  if (country  && country  !== 'All') d = d.filter(r => r.Country  === country);
  if (year     && year     !== 'All') d = d.filter(r => r.Year     === +year);
  if (industry && industry !== 'All') d = d.filter(r => r.Industry === industry);
  return d;
}

const COLORS = {
  domain: ['Gaming', 'Marketing', 'Media'],
  range:  ['#3B82F6', '#F59E0B', '#EF4444']
};

const VEGAEMBED_OPTS = { actions: false, renderer: 'svg' };

// Chart config — matches the warm parchment surface (#F0EBE0 bg)
const CHART_CONFIG = {
  background: 'transparent',
  view: { stroke: null },
  axis: {
    domainColor: '#CEC8BA',
    tickColor:   '#CEC8BA',
    gridColor:   '#E4DFD3',
    labelColor:  '#3A3830',
    titleColor:  '#888077',
    labelFont:   'JetBrains Mono, monospace',
    titleFont:   'Inter, sans-serif',
    titleFontWeight: 400,
    titleFontSize: 11,
    labelFontSize: 11,
    titlePadding: 10
  },
  legend: {
    labelColor: '#3A3830',
    titleColor: '#888077',
    labelFont: 'Inter, sans-serif',
    titleFont: 'JetBrains Mono, monospace',
    titleFontSize: 10,
    titleFontWeight: 500,
    labelFontSize: 12,
    symbolSize: 100
  }
};
