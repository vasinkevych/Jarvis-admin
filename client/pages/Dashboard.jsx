import React, { useEffect, useState } from 'react';
import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  event
} from 'd3';
import '../styles/Chart.css';
import { fetchTableData } from '../services/System';
import { parseCarsModels } from '../services/Chart';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchTableData('select * from cars')
      .then(carsData => carsData.result)
      .then(carsData => setCars(parseCarsModels(carsData)));
  }, []);

  console.log(cars);

  useEffect(() => {
    csv('../utils/data.csv')
      .then(csvData =>
        csvData.map(item => ({ ...item, population: +item.population }))
      )
      .then(csvData => setData([...csvData]));
  }, []);

  useEffect(() => {
    if (!cars.length) return;
    const svg = select('svg');
    const svgWidth = +svg.attr('width');
    const svgHeight = +svg.attr('height');

    const xValue = d => d.quantity;
    const yValue = d => d.brand;

    const margin = {
      left: 120,
      top: 20,
      bottom: 40,
      right: 20
    };

    const innerWidth = svgWidth - (margin.left + margin.right);
    const innerHeight = svgHeight - (margin.bottom + margin.top);

    const xScale = scaleLinear()
      .domain([0, max(cars, xValue)])
      .range([0, innerWidth]);

    const yScale = scaleBand()
      .domain(cars.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    g.append('g').call(axisLeft(yScale));
    g.append('g')
      .call(axisBottom(xScale))
      .attr('transform', `translate(0, ${innerHeight})`);

    const tooltip = select('.svg-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden');

    g.selectAll('rect')
      .data(cars)
      .enter()
      .append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('width', d => xScale(xValue(d)))
      .attr('title', xValue)
      .on('mouseover', function() {
        return tooltip.style('visibility', 'visible');
      })
      .on('mousemove', function() {
        const { offsetX, offsetY } = event;
        const value = select(this).attr('title');
        console.log(offsetX, offsetY, value);

        select('.tooltip')
          .style('top', offsetY - 30 + 'px')
          .style('left', offsetX - 30 + 'px')
          .text(value);
      })
      .on('mouseout', function() {
        return tooltip.style('visibility', 'hidden');
      });
  }, [cars]);

  return (
    <div className={'svg-container'}>
      <svg className={'car-chart'} width="1000" height="700" />
    </div>
  );
};

export default Dashboard;
