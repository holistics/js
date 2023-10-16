# holistics-js

> Holistics open-source javascript packages

[![holistics](https://circleci.com/gh/holistics/js.svg?style=svg)](https://circleci.com/gh/holistics/js)

## Contributing

### Prerequisites

* NodeJS
* Yarn

### Setting-up

* Clone this repo
* Bootstrap

```bash
cd path/to/repo/root
yarn install
```

### Creating a new package

This is a monorepo containing many packages. To quickly create a new package:

* Copy `sample` package

```bash
cd path/to/repo/root
cp -R packages/sample packages/your-new-package
```

* Edit new package's `package.json`

```bash
vim packages/your-new-package/package.json
# remember to change package's 'name', 'main' and set its 'version' back to '0.0.0'
```

* Update new package's `webpack.config.js` if needed

### Publishing

> For Holistics team members only

1. Create a branch for the new version, e.g. `2.11.0`
2. Run `yarn lerna:version` at the repo **root**
  * It will automatically
    * Push a new commit which
      * Bumps version in `package.json`
      * Adds a Changelog entry for the new version
    * Build the new version `dist`
    * Push a new tag for the new version on the new commit
3. Create a PR and merge into `master`
4. Publish the new `dist` by
  1. `cd ./packages/your-package`
  2. `npm publish` to both public npm and Holistics internal packages. Hint: use `npmrc` to manage your profiles

TODO: automate this process into a single trigger.
