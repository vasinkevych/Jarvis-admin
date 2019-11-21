import React, { Fragment, useState } from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from '../components/Loader';
import DataTable from '../components/DataTable';
import ConfirmModal from '../components/ConfirmModal';
import { client } from '../client';

const DUMPS_QUERY = gql`
  {
    dumps {
      id
      name
      created
    }
  }
`;

const SEND_DUMP = gql`
  mutation restoreFromDumpMutation($name: String!) {
    restoreFromDump(name: $name)
  }
`;

const Dumps = () => {
  const [show, setShow] = useState(false);
  const [dump, setDump] = useState('');

  const modalAction = async metadata => {
    setShow(true);
    setDump(metadata.name);
  };

  const sendDump = async () => {
    const isDone = await client.mutate({
      variables: { name: dump },
      mutation: SEND_DUMP
    });
    alert(isDone + ' : response');
  };

  return (
    <Fragment>
      <Query query={DUMPS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error || !data) return <div>Error</div>;

          const dumps = (data && data.dumps) || [];

          return (
            <DataTable data={dumps} action={modalAction} className="mt-3" />
          );
        }}
      </Query>
      <ConfirmModal
        showModal={show}
        handleModal={setShow}
        bodyText={`Import database from ${dump} ?`}
        confirmModal={sendDump}
      />
    </Fragment>
  );
};

export default Dumps;
