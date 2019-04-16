import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser {
    user @client {
      username
      authenticated
    }
  }
`;

export const IS_AUTHENTICATED = gql`
  query authenticated {
    authenticated @client
  }
`;

export const SET_USER = gql`
  mutation setUser($username: string) {
    setUser(username: $username) @client
  }
`;

const userState = {
  defaults: {
    user: {
      __typename: 'User',
      username: null,
      authenticated: false,
    },
  },
  resolvers: {
    Query: {
      authenticated: (_, variables, { cache }) => {
        const {
          user: { authenticated },
        } = cache.readQuery({ query: GET_USER });
        return authenticated;
      },
    },
    Mutation: {
      setUser: (_, { username }, { cache }) => {
        const data = {
          user: {
            username,
            __typename: 'User',
            authenticated: username !== null,
          },
        };
        cache.writeData({ data });
        return cache.readQuery({ query: GET_USER });
      },
    },
  },
};

export default userState;
