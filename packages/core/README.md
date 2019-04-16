# Getting Started

- `yarn dev`

## Scaffold CRUD Containers

- `hygen uib-crud new --name Model`
- `amplify codegen` (generate CRUD for GraphQL)

## Issues

- https://github.com/Microsoft/vscode/issues/53233
- https://github.com/eslint/eslint/issues/6338
- https://stackoverflow.com/questions/52941791/yup-dynamic-validation-chain
- https://github.com/apollographql/react-apollo/issues/1980

## Amplify

1. `amplify init` use default profile
2. `amplify add api`
3. `amplify push`

- Update `aws-exports.js`
- Then `amplify status`

## Testing

http://blog.dideric.is/2018/03/18/Testing-apollo-containers/

### ts-node absolute import

- https://github.com/dividab/tsconfig-paths
- Allows `paths` in `tsconfig.json` to be used

### Cypress fetch() mocking

- https://github.com/cypress-io/cypress/issues/95

## Notes

- Added Next.js `with-jest`
