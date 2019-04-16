import React, { ReactNode } from 'react';
import { Auth } from 'aws-amplify';
import { withApollo, WithApolloClient } from 'react-apollo';
import { GET_USER, SET_USER } from 'src/state/apollo-link-state/user/userState';
import { alert } from 'src/components/Alert';

interface P {
  children: (any) => ReactNode;
}

class User extends React.Component<WithApolloClient<P>, any> {
  logout() {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  register({ username, email, password }) {
    return Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        // phone_number // optional - E.164 number convention
        // other custom attributes
      },
      validationData: [], // optional
    })
      .then(data => console.log(data))
      .catch(alert);
  }

  async refetchUser() {
    /**
     * Load from Cognito
     */
    const cognitoUser = await Auth.currentAuthenticatedUser({
      bypassCache: false,
    })
      .then(user => user)
      .catch(err => false);

    /**
     * If user exists
     */
    let username = null;

    if (cognitoUser) {
      username = cognitoUser.username;
    }

    /**
     * User from link state, will add this to props globally
     */
    await this.props.client.mutate({
      mutation: SET_USER,
      variables: {
        username,
      },
    });
  }

  render() {
    return <>{this.props.children(this)}</>;
  }
}

export default withApollo(User);
