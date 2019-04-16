import { ActionQueryProps } from 'src/utils/routeHelpers';

export const mockedQueryProps = ({ param, action }: ActionQueryProps) => {
  return {
    router: {
      query: {
        [param]: action,
      },
    },
  };
};
