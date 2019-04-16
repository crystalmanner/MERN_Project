import React from 'react';
import { Button } from 'antd';
import withPageProps from 'src/hoc/withPageProps';
import { Form } from '@codelab/form';
import { Layout, Grid } from '@codelab/layout';
import RadioScreenSizes, {
  screenSizeFields,
} from 'src/modules/Builder/Radio--screenSizes';
import {
  GET_CONFIG,
  SET_CONFIG,
} from 'src/state/apollo-link-state/config/configState';
import Query from 'src/utils/Query';
import { Mutation, withApollo } from 'react-apollo';
import { forOwn, map } from 'lodash';

const ON_SUBMIT = input => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('good');
    }, 1200);
  });
};

const ON_COMPLETE = () => {
  console.log('complete');
};

const ScreenSize = () => (
  <Query query={GET_CONFIG}>
    {data => {
      return <p>config</p>;
    }}
  </Query>
);

class LayoutPage extends React.PureComponent {
  private layout: Layout;

  constructor(props) {
    super(props);
    this.layout = new Layout();
  }

  addGrid(input) {
    const { gridName, gridCount } = input;
    return new Promise((resolve, reject) => {
      const grid: Grid = new Grid(gridName);

      setTimeout(() => {
        resolve('good');
      }, 1200);
    });
  }

  render() {
    return (
      <section>
        <Query query={GET_CONFIG}>
          {({ config }) => {
            return (
              <ul>
                {map(config, (val, key) => {
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
        <hr />
        <Mutation mutation={SET_CONFIG}>
          {setConfig => {
            return (
              <Form
                fields={screenSizeFields}
                onSubmit={input => {
                  return new Promise((resolve, reject) => {
                    setConfig({
                      variables: { config: { ...input } },
                    });
                    resolve('good');
                  });
                }}
                onComplete={() => {}}
                submitOnChange={true}
              />
            );
          }}
        </Mutation>
        <hr />
        <Form
          fields={[]}
          onSubmit={this.addGrid.bind(this)}
          onComplete={ON_COMPLETE}
        />
        {/* <Button onClick={this.addGrid.bind(this)}>Add Grid</Button> */}
      </section>
    );
  }
}

// const MyComponent = withApollo(({ client }) => {
//   console.log(client);

//   client.query({
//     query: GET_CONFIG,
//   });

//   return <p>hi</p>;
// });

export default withPageProps({ hasSidebar: true })(LayoutPage);
