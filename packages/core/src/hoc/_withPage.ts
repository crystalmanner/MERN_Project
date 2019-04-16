import { compose } from 'recompose';
import withLayout from 'src/hoc/_withLayout';
import withLoader from 'src/hoc/_withData';
import withRouter from './_withRoute';
import withStyle from 'src/hoc/_withStyle';
import withApollo from 'src/hoc/_withApollo';

export const withData = compose(
  /**
   * Allow us to pass in page props to be used by other HOC
   */
  // withPageProps,
  /**
   * Binds Apollo to context
   */
  withApollo,
  /**
   * Binds Router
   */
  withRouter,
  /**
   * Attaches global loader for data fetching
   */
  // withLoader,
);

const withPresentation = compose(
  /**
   * Attaches our CSS styles
   */
  withStyle,
  /**
   * Attaches the layout
   */
  withLayout,
);

const withPage = compose(
  withData,
  withPresentation,
);

export default withPage;
