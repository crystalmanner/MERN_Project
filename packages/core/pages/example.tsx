import React from 'react';
import withPageProps from 'src/hoc/withPageProps';
import Query from 'src/utils/Query';
import {
  GET_MODALS,
  GET_MODAL,
  ModalIDs,
} from 'src/state/apollo-link-state/modal/modalState';
import {
  SET_EXAMPLE,
  GET_EXAMPLE,
} from 'src/state/apollo-link-state/example/exampleState';
import { GET_INPUTS } from 'src/state/apollo-link-state/dynamic-form/dynamicFormState';
import { Mutation } from 'react-apollo';
import { Form } from '@codelab/form';
import { screenSizeFields } from 'src/modules/Builder/Radio--screenSizes';
import { map } from 'lodash';

const AllModals = () => (
  <Query query={GET_MODALS}>
    {({ modals }) => {
      console.log(modals);
      return (
        <ul>
          {modals.map(modal => {
            return <li key={modal.id}>{modal.id}</li>;
          })}
        </ul>
      );
    }}
  </Query>
);
const SingleModal = id => (
  <Query query={GET_MODALS}>
    {({ modals, refetch }) => {
      return (
        <Query query={GET_MODAL} variables={id}>
          {({ modal }) => {
            console.log(modal);
            return <li key={modal.id}>{modal.id}</li>;
          }}
        </Query>
      );
    }}
  </Query>
);

const Inputs = () => (
  <Query query={GET_INPUTS}>
    {({ inputs }, refetch) => {
      console.log(inputs);
      return (
        <>
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              refetch();
            }}
          >
            {' '}
            Refetch
          </a>
          {inputs.map((input: any, index: number) => {
            return <h2 key={index}>{input.name}</h2>;
          })}
        </>
      );
    }}
  </Query>
);

const ApolloWithForm = () => (
  <Mutation mutation={SET_EXAMPLE}>
    {setExample => {
      return (
        <Form
          fields={screenSizeFields}
          onSubmit={input => {
            return new Promise((resolve, reject) => {
              setExample({
                variables: { example: { ...input } },
              });
              resolve('good');
            });
          }}
          onComplete={() => {}}
        />
      );
    }}
  </Mutation>
);

const ApolloExample = () => (
  <Query query={GET_EXAMPLE}>
    {({ example }) => {
      console.log(example);
      return (
        <ul>
          {map(example, (val, key) => {
            return (
              <li key={key}>
                <b>{key}</b> : {val}
              </li>
            );
          })}
        </ul>
      );
    }}
  </Query>
);

const ExamplePage = props => {
  return (
    <section>
      <h2> Apollo With Form </h2>
      <ApolloWithForm />
      <ApolloExample />

      <h2> Link State Example </h2>
      <AllModals />
      <SingleModal id={ModalIDs.Register} />
      <Inputs />
    </section>
  );
};
export default withPageProps({ hasSidebar: true })(ExamplePage);
