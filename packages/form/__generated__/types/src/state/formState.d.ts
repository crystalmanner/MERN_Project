/// <reference types="node" />
export declare const formTypeDef = "\ntype Option {\n  label: String!\n  value: String!\n}\n\ntype Input {\n  id: String!\n  name: String!\n  inputType: String!\n  placeholder: String!\n  options: [Option]\n}\n";
export declare const GET_INPUTS: any;
export declare const CREATE_INPUT: any;
export declare const DELETE_INPUT: any;
declare const formState: {
    defaults: {
        inputs: {
            inputType: any;
            name: any;
            placeholder: any;
            id: any;
            label: any;
            options: any;
            __typename: string;
        }[];
    };
    resolvers: {
        Query: {
            input: (_: any, variables: {
                id: string;
            }, { cache }: {
                cache: any;
            }) => {
                id: {
                    toString: any;
                    charAt: any;
                    charCodeAt: any;
                    concat: any;
                    indexOf: any;
                    lastIndexOf: any;
                    localeCompare: any;
                    match: any;
                    replace: any;
                    search: any;
                    slice: any;
                    split: any;
                    substring: any;
                    toLowerCase: any;
                    toLocaleLowerCase: any;
                    toUpperCase: any;
                    toLocaleUpperCase: any;
                    trim: any;
                    readonly length: any;
                    substr: any;
                    valueOf: any;
                    codePointAt: any;
                    includes: any;
                    endsWith: any;
                    normalize: any;
                    repeat: any;
                    startsWith: any;
                    anchor: any;
                    big: any;
                    blink: any;
                    bold: any;
                    fixed: any;
                    fontcolor: any;
                    fontsize: any;
                    italics: any;
                    link: any;
                    small: any;
                    strike: any;
                    sub: any;
                    sup: any;
                    [Symbol.iterator]: any;
                    padStart: any;
                    padEnd: any;
                    trimLeft: any;
                    trimRight: any;
                };
            } | undefined;
        };
        Mutation: {
            createInput: (_: any, { input }: {
                input: any;
            }, { cache }: {
                cache: any;
            }) => any[] | undefined;
            deleteInput: (_: any, { name }: {
                name: any;
            }, { cache }: {
                cache: any;
            }) => any;
        };
    };
};
export default formState;
//# sourceMappingURL=formState.d.ts.map