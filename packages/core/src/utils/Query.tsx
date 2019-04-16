import React from 'react';
import { Query as ApolloQuery } from 'react-apollo';

const Query = props => {
  return (
    <ApolloQuery query={props.query} variables={props.variables}>
      {({ loading, error, data, refetch }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return <>{props.children(data, refetch)}</>;
      }}
    </ApolloQuery>
  );
};

export default Query;
