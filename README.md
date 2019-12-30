# holistics-js

> Holistics open-source javascript packages

## Contributing

### Prerequisites

* NodeJS
* Yarn

### Setting-up

* Clone this repo
* Bootstrap

```bash
cd path/to/repo/root
yarn lerna:bootstrap
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
# remember to change package's name, and set its version back to '0.0.0'
```

### Publishing

> For Holistics team members only

```bash
cd path/to/repo/root
yarn lerna:publish
```

Follow the instructions in your terminal :)
