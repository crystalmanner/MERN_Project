import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { merge } from 'lodash';
import userState from './user/userState';
import modalState from 'src/state/apollo-link-state/modal/modalState';
import exampleState from 'src/state/apollo-link-state/example/exampleState';
import dynamicFormState, {
  inputDef,
} from 'src/state/apollo-link-state/dynamic-form/dynamicFormState';
import configState from 'src/state/apollo-link-state/config/configState';

const cache = new InMemoryCache();

const mergedState = merge(
  userState,
  modalState,
  dynamicFormState,
  exampleState,
  configState,
);

const typeDefs = [inputDef];
const stateLink = withClientState({
  cache,
  ...mergedState,
  typeDefs,
});

export default stateLink;
