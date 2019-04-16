import React from "react";
import PropTypes from "prop-types";
declare const _default: (apolloConfig: any) => (ComposedComponent: any) => {
    new (props: any): {
        apollo: any;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<any>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    displayName: string;
    propTypes: {
        serverState: PropTypes.Validator<object>;
    };
    getInitialProps(ctx: any): Promise<{
        serverState: any;
    }>;
    contextType?: React.Context<any> | undefined;
};
export default _default;
//# sourceMappingURL=withData.d.ts.map