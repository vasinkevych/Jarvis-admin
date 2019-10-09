import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import '../styles/Service.css';

const SearchForm = ({ searchVal, setSearchVal }) => (
  <Form>
    <Form.Control
      className={'search-field'}
      value={searchVal}
      onChange={setSearchVal}
      placeholder={'Search'}
    />
  </Form>
);

SearchForm.propTypes = {
  searchVal: PropTypes.string,
  setSearchVal: PropTypes.func
};

export default SearchForm;
