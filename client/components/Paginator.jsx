import React, { useState, Fragment, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Paginator = ({ data, step, children }) => {
  const [active, setActive] = useState(1);

  const handlePagination = val => {
    setActive(val);
  };

  let paginationLength = Math.ceil(data.length / step);

  useEffect(() => {
    if (paginationLength < active) {
      setActive(1);
    }
  }, [data]);

  let items = [];
  for (let number = 1; number <= paginationLength; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={handlePagination.bind(null, number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  let paginatedData = data.filter((item, index) => {
    return index < step * active && index >= step * (active - 1);
  });

  return (
    <Fragment>
      {children(paginatedData)}
      <Pagination className={'justify-content-center'}>{items}</Pagination>
    </Fragment>
  );
};

Paginator.propTypes = {
  data: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  children: PropTypes.any
};

export default Paginator;
