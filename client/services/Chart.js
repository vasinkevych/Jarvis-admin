import {
  axisBottom,
  axisLeft,
  event,
  max,
  scaleBand,
  scaleLinear,
  select,
  selectAll
} from 'd3';

export const parseCarsModels = carsData => {
  return carsData
    .reduce((acc, car) => {
      let brand = car.brand.split(' ')[0].toLowerCase();

      if (brand === 'vw' || brand === 'wolksvagen' || brand === 'wv')
        brand = 'volkswagen';

      if (brand === 'ваз') brand = 'vaz';

      if (brand === 'hyundaii30' || brand === 'tucson' || brand === 'hyndai')
        brand = 'hyundai';

      if (brand === 'qashkai') brand = 'nissan';

      if (brand === 'mitsubitshi') brand = 'mitsubishi';

      const existingBrand = acc.find(item => item.brand === brand);
      if (existingBrand) {
        existingBrand.quantity += 1;
      } else {
        acc.push({
          brand,
          quantity: 1
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.quantity - a.quantity);
};

export const generateChart = ({ svg, data, title = 'Chart title' }) => {
  const svgWidth = +svg.attr('width');
  const svgHeight = +svg.attr('height');

  const xValue = d => d.quantity;
  const yValue = d => d.brand;

  const margin = {
    left: 140,
    top: 70,
    bottom: 40,
    right: 20
  };

  const innerWidth = svgWidth - (margin.left + margin.right);
  const innerHeight = svgHeight - (margin.bottom + margin.top);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.1);

  const g = svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const titleText = svg
    .append('text')
    // .attr('x', `${innerWidth / 2}`)
    .attr('y', 50)
    .attr('class', 'chart-title')
    .attr('fill', 'black')
    .text(title);

  const titlePosition = titleText.node().getBBox();

  titleText.attr(
    'transform',
    `translate(${innerWidth / 2 - titlePosition.width / 2 + margin.left})`
  );

  const xAxis = axisBottom(xScale).tickSize(-innerHeight);

  g.append('g').call(axisLeft(yScale));

  g.selectAll('.tick')
    .data(data)
    .attr('data-brand', d => d.brand);

  g.append('g')
    .attr('class', 'chart-body')
    .call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`);

  const container = select('.svg-container');
  const tooltip = container
    .append('div')
    .attr('class', 'chart-tooltip')
    .style('visibility', 'hidden');

  selectAll('.chart-body .tick text').attr('transform', 'translate(0, 12)');

  g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', d => yScale(yValue(d)))
    .attr('height', yScale.bandwidth())
    .attr('width', d => xScale(xValue(d)))
    .attr('fill', 'steelblue')
    .attr('title', xValue)
    .attr('data-car', d => d.brand)
    .on('mouseover', function() {
      const el = select(this);
      select(`[data-brand="${el.attr('data-car')}"]`).attr(
        'class',
        'tick tick-active'
      );
      el.attr('fill', 'yellow');
      const value = el.attr('title');
      tooltip.style('visibility', 'visible').text(value);
    })
    .on('mousemove', function() {
      const { offsetX, offsetY } = event;
      tooltip.style('top', offsetY + 'px').style('left', offsetX + 'px');
    })
    .on('mouseout', function() {
      const el = select(this);
      el.attr('fill', 'steelblue');
      select(`[data-brand="${el.attr('data-car')}"]`).attr(
        'class',
        'tick'
      );
      tooltip.style('visibility', 'hidden');
    });
};
