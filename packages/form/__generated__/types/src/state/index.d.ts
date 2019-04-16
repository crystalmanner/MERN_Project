declare const stateLink: {
    writeDefaults(): void;
    request(operation: import("apollo-boost").Operation, forward?: import("apollo-boost").NextLink | undefined): import("apollo-boost").Observable<import("apollo-boost").FetchResult<Record<string, any>, Record<string, any>, Record<string, any>>>;
    split(test: (op: import("apollo-boost").Operation) => boolean, left: import("apollo-boost").ApolloLink | ((operation: import("apollo-boost").Operation, forward?: import("apollo-boost").NextLink | undefined) => import("apollo-boost").Observable<import("apollo-boost").FetchResult<Record<string, any>, Record<string, any>, Record<string, any>>>), right?: import("apollo-boost").ApolloLink | ((operation: import("apollo-boost").Operation, forward?: import("apollo-boost").NextLink | undefined) => import("apollo-boost").Observable<import("apollo-boost").FetchResult<Record<string, any>, Record<string, any>, Record<string, any>>>) | undefined): import("apollo-boost").ApolloLink;
    concat(next: import("apollo-boost").ApolloLink | ((operation: import("apollo-boost").Operation, forward?: import("apollo-boost").NextLink | undefined) => import("apollo-boost").Observable<import("apollo-boost").FetchResult<Record<string, any>, Record<string, any>, Record<string, any>>>)): import("apollo-boost").ApolloLink;
};
export default stateLink;
//# sourceMappingURL=index.d.ts.map