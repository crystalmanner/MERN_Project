import React, { ReactNode } from 'react';
import { Auth } from 'aws-amplify';
import { ApolloConsumer, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { SET_USER, GET_USER } from 'src/state/apollo-link-state/user/userState';

interface UserProps {
  children: (any) => ReactNode;
  client: ApolloClient<NormalizedCacheObject>;
}

class UserService {
  static instance;

  private client;

  public static signOut() {
    console.log('sign out');
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  constructor(client) {
    if (!UserService.instance) {
      UserService.instance = this;
    }

    if (client) {
      this.client = client;
    }

    return UserService.instance;
  }

  static test() {
    console.log('test');
  }
  /**
   * Call Cognito to refresh local user data
   */
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
    if (cognitoUser) {
      const { username } = cognitoUser;

      /**
       * User from link state, will add this to props globally
       */
      await this.client.mutate({
        mutation: SET_USER,
        variables: {
          username,
        },
      });
    }

    const {
      data: { user },
    } = await this.client.query({
      query: GET_USER,
    });

    // console.log('refetch');
  }

  signIn({ username, password }, onSuccess, onError) {
    Auth.signIn(username, password)
      .then(user => {
        this.setUser(user.username);
        onSuccess(user);
      })
      .catch(err => {
        onError(err);
      });
  }

  signUp({ username, email, password }, onSuccess, onError) {
    Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        // phone_number // optional - E.164 number convention
        // other custom attributes
      },
      validationData: [], // optional
    })
      .then(data => onSuccess(data))
      .catch(err => onError(err));
  }

  confirmSignUp(username, code) {
    return Auth.confirmSignUp(username, code);
  }

  resendSignUp(username) {
    return Auth.resendSignUp(username);
  }
  forgotPassword({ username }) {
    return Auth.forgotPassword(username);
  }
  forgotPasswordSubmit({ username, code, new_password }) {
    return Auth.forgotPasswordSubmit(username, code, new_password);
  }

  setUser(username) {
    this.client.mutate({
      mutation: SET_USER,
      variables: {
        username,
      },
    });
  }
}

export default UserService;
