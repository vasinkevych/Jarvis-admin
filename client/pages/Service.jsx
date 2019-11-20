import React, { useState } from 'react';
import { fetchTableData } from '../services/System';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import DataTable from '../components/DataTable';
import Form from 'react-bootstrap/Form';
import '../styles/Service.css';
import ConfirmModal from '../components/ConfirmModal';
import user from '../services/User';

const Service = () => {
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);

  const setQueryData = e => setQuery(e.target.value);

  const submitQueryForm = async e => {
    e.preventDefault();
    setShow(true);
  };

  const createTable = async () => {
    let temp = await fetchTableData(query);
    setTableData(temp.result);
    setQuery('');
  };

  return (
    <Container>
      <Form onSubmit={submitQueryForm}>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder={'enter sql query'}
            onChange={setQueryData}
            value={query}
            className={'query-field'}
          />
          <Button
            type={'submit'}
            variant="primary"
            className={'query-submit-btn'}
          >
            Send
          </Button>
        </Form.Group>
      </Form>
      <Button onClick={user.parseUsers}>Refetch</Button>
      <ConfirmModal
        showModal={show}
        handleModal={setShow}
        bodyText={query}
        confirmModal={createTable}
      />
      {tableData.length > 0 && <DataTable data={tableData} />}
    </Container>
  );
};

export default Service;
