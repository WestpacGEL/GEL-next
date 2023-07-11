# Create Package template

## PLEASE UPDATE THIS README FILE!

### Use the below content as template. The README file should:

- Describe what the package does.
- How to install it.
- How to run it.
- Provide examples.

### The below is an template and must be updated to meet the description of the new package:

This project is a simple demo project to show how a `package` can consume other packages within this monorepo.

> This project is simulating an internal project on this monorepo, exactly as it is.

Observe that this project uses the following pachages:

- @westpac-x/eslint-config
- @westpac-x/ts-config

All of them have their versions handled by the `"workspace:~` protocol in the`package.json` file.

Example:

```
"@westpac-x/eslint-config": "workspace:~"
```

pnpm can replace that protocol by the expected version. For more, please see [publishing workspace packages](https://pnpm.io/workspaces#publishing-workspace-packages)
