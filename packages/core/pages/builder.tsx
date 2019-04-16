import React from 'react';
import withPageProps from 'src/hoc/withPageProps';
import gql from 'graphql-tag';
import Query from 'src/utils/Query';
import JSONPretty from 'react-json-pretty';
const JSONPrettyMon = require('react-json-pretty/dist/monikai');

export const GET_CSS_TEMPLATES = gql`
  query cssTemplates {
    cssTemplates {
      name
      property {
        value
      }
      options {
        value
      }
    }
  }
`;

export const GET_CSS_INSTANCES = gql`
  query cssInstances {
    cssInstances {
      name
      property {
        value
      }
      option {
        value
      }
    }
  }
`;

/**
 * Provides CSS rules with options to select from
 */
const CSSTemplates = () => (
  <Query query={GET_CSS_TEMPLATES}>
    {data => {
      return <JSONPretty data={data} theme={JSONPrettyMon} />;
    }}
  </Query>
);

/**
 * A CSS Rule, basically a CSSTemplate with a chosen value
 */
const CSSInstance = () => (
  <Query query={GET_CSS_INSTANCES}>
    {data => {
      return <JSONPretty data={data} theme={JSONPrettyMon} />;
    }}
  </Query>
);

const Builder = () => {
  return (
    <section>
      <CSSTemplates />
      <CSSInstance />
    </section>
  );
};

export default withPageProps()(Builder);
