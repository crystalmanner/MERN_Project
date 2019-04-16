import { compose, withHandlers, defaultProps } from 'recompose';
import { BehaviorSubject } from 'rxjs';
import Router from 'src/universal/Router';
import { withModelList, withModelCreate } from 'src/modules/Model/data/Model-container';


const ModelCreateContainer = compose(
  defaultProps({
    // When complete with mutation
    mutationSubscription: new BehaviorSubject(false),
  }),
  withHandlers({
    redirectTo: props => (route) => {
      console.log(props);
      console.log(route);
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
  withModelList,
  withModelCreate,
);

export default ModelCreateContainer;
