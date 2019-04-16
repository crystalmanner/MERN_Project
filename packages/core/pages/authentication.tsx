import React from 'react';
import { Form } from '@codelab/form';
import withPageProps from 'src/hoc/withPageProps';
import Router from '../src/route/Router';
import { redirectTo } from '../src/utils/routeHelpers';
const ON_SUBMIT = input => {
  console.log(input);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('good');
      redirectTo('/account');
    }, 1200);
  });
};

const ON_COMPLETE = () => {
  console.log('login>>>>>>>>');

  // return <Redirect to='/account'/>
  // this.props.history.push('/account');
  // return <Redirect to="/account" />;
};

const fields = [
  {
    name: 'user_email',
    inputType: 'text',
    value: '',
    type: 'string',
    placeholder: 'Email:',
    valueFrom: 'email',
    validation: [
      { required: true, msg: 'Required!!' },
      { min: 7, msg: 'Too Short!' },
    ],
  },
  {
    name: 'user_password',
    inputType: 'password',
    value: '',
    type: 'string',
    validation: [
      { required: true, msg: 'Required!!' },
      { min: 6, msg: 'Too Short!' },
    ],
  },
];

const Home = props => {
  return (
    <section>
      <Form fields={fields} onSubmit={ON_SUBMIT} onComplete={ON_COMPLETE} />
    </section>
  );
};

export default withPageProps()(Home);
