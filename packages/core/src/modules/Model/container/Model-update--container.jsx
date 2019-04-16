import { compose, withHandlers, defaultProps } from 'recompose';
import { BehaviorSubject } from 'rxjs';
import { withModelDetail, withModelUpdate } from '../data/Model-container';
import Router from '../../../route/Router';

const ModelUpdateContainer = compose(
  defaultProps({
    // When complete with mutation
    mutationSubscription: new BehaviorSubject(false),
  }),
  withHandlers({
    redirectTo: props => (route) => {
      console.log(props);
      Router.pushRoute(route);
    },
  }),
  withHandlers({
    handleOk: props => (event) => {
      console.log('handleOk');
      props.redirectTo('model.index');
    },
    handleCancel: props => (event) => {
      console.log('handleCancel');
      props.redirectTo('model.index');
    },
    onComplete: props => () => {
      props.mutationSubscription.subscribe({
        next: (val) => {
          console.log(`received sub value of ${val}`);
          if (val) {
            props.redirectTo('model.index');
          }
        },
      });
    },
  }),
  withModelDetail,
  withModelUpdate,
);

export default ModelUpdateContainer;
