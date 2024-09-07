# Aress Frontend Project

The monorepo is generated using [Nx](https://nx.dev). We're using [pnpm](https://pnpm.io/) as package manager, so try to stick to it.

## Folder structure

    - Apps      // contains applications we're going to develop on the FE side
    - Libs      // all FE libraries (mostly non-buildable) would live here

## Preparation

### Install nx (globally)

```bash
npm install -g nx
```

### Install pnpm (globally)

```bash
npm install -g pnpm
```

## Scripts (Commands)

To run the main app (built via NextJS), run the following command:

```bash
nx dev fe-app
```

To run the design-system in Storybook mode, run the following command:

```bash
nx storybook design-system
```

## Running unit tests

Run `nx test design-system` to execute the unit tests via [Vitest](https://vitest.dev/).
