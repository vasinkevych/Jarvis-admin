import React, { useContext, useEffect, useState } from 'react';
import { select } from 'd3';
import '../styles/Chart.css';
import { parseCarsModels, generateChart } from '../services/Chart';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import NotificationContext from '../context/alert/notificationContext';

const CARS_QUERY = gql`
  query getCars {
    cars {
      id
      number
      brand
    }
  }
`;

const Dashboard = () => {
  const [cars, setCars] = useState([]);

  const { error, data } = useQuery(CARS_QUERY);
  const { notifyError } = useContext(NotificationContext);

  useEffect(() => {
    if (error) {
      notifyError('Cars fetch error');
      return;
    }
    if (!data) return;
    setCars(parseCarsModels(data.cars));
  }, [error, data]);

  useEffect(() => {
    if (!cars.length) return;
    const svg = select('svg');
    generateChart(svg, cars);
  }, [cars]);

  return (
    <div className={'svg-container'}>
      <svg className={'car-chart'} width="1000" height="700" />
    </div>
  );
};

export default Dashboard;
