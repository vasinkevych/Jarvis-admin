import React, { Fragment, useContext, useState } from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from '../components/Loader';
import DataTable from '../components/DataTable';
import ConfirmModal from '../components/ConfirmModal';
import { client } from '../client';
import NotificationContext from '../context/alert/notificationContext';
import QueryBoundary from '../components/QueryBoundary';
import { dateToView } from '../utils';

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
  const { notifySuccess, notifyError } = useContext(NotificationContext);

  const modalAction = async metadata => {
    setShow(true);
    setDump(metadata.name);
  };

  const sendDump = async () => {
    const res = await client.mutate({
      variables: { name: dump },
      mutation: SEND_DUMP
    });
    res.data
      ? notifySuccess('Successfully restored')
      : notifyError('Restoring has been failed');
  };

  const prepareDumpsData = dumpsData =>
    dumpsData
      .sort(
        (a, b) => new Date(b.created).valueOf() - new Date(a.created).valueOf()
      )
      .map(({ id, name, created }) => ({
        id,
        name,
        created: dateToView(created)
      }));

  return (
    <Fragment>
      <QueryBoundary>
        <Query query={DUMPS_QUERY}>
          {({ loading, error, data, networkStatus }) => {
            if (networkStatus === 8) throw new Error('No network connection');

            if (loading) return <Loader />;
            if (error || !data) {
              notifyError(error.message);
              return <div>Error</div>;
            }

            const dumps = prepareDumpsData(data.dumps);

            return (
              <DataTable data={dumps} action={modalAction} className="mt-3" />
            );
          }}
        </Query>
      </QueryBoundary>
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
