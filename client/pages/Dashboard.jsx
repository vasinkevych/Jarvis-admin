import React, { useContext, useEffect, useState } from 'react';
import { select } from 'd3';
import '../styles/Chart.css';
import { parseCarsModels, generateChart } from '../services/Chart';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import NotificationContext from '../context/alert/notificationContext';
import { throttler } from '../utils/index';

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

  const { error, data, refetch } = useQuery(CARS_QUERY);
  const { notifyError } = useContext(NotificationContext);
  const refetchCars = throttler(async () => {
    notifyError('Cars fetch error');
    await refetch();
  }, 500);

  useEffect(() => {
    if (error) {
      refetchCars();
      return;
    }
    if (!data) return;
    setCars(parseCarsModels(data.cars));
  }, [error, data]);

  useEffect(() => {
    if (!cars.length) return;
    const svg = select('svg');
    generateChart({ svg, data: cars, title: 'Cars quantity stat' });
  }, [cars]);

  return (
    <div className={'svg-container'}>
      <svg className={'car-chart'} width="1000" height="750" />
    </div>
  );
};

export default Dashboard;
