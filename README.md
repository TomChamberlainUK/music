[![CI](https://github.com/TomChamberlainUK/music/actions/workflows/ci.yml/badge.svg)](https://github.com/TomChamberlainUK/music/actions/workflows/ci.yml)
[![CD](https://github.com/TomChamberlainUK/music/actions/workflows/cd.yml/badge.svg)](https://github.com/TomChamberlainUK/music/actions/workflows/cd.yml)

# Music

[A simple music app](tomchamberlainuk.github.io/music/)


## Contents

1. [Description](#description)
1. [Get Started](#get-started)
    1. [Install](#install)
    1. [Scripts](#scripts)
1. [CI/CD Pipeline](#cicd-pipeline)
    1. [CI](#ci)
    1. [CD](#cd)

## Description

A simple app to aid musicians with the visualisation of scales.

## Get Started

### Install

> Ensure the correct version of Node specified in `.nvmrc` is being used
> <br />
> `nvm` users can run the command `nvm use`


> Package management is handled via `pnpm` — [follow their guide for installation](https://github.com/pnpm/pnpm?tab=readme-ov-file#getting-started)

First download, clone, or fork this repository.

Then navigate to the root directory and install any dependencies by running:

```sh
pnpm install
```

### Development

To run the application in development mode, run the command:

```sh
pnpm run dev
```

This will serve the application locally and update with any changes.

### Production

To build the application in production mode, run the command:

```sh
pnpm run build
```

This will compile all the source code into a distributable directory `./dist`

To preview the build locally, run the command:

```sh
pnpm run preview
```

This will serve the production version of the application locally. This should not be used for standard production.

### Scripts

Script | Description
--- | ---
dev | Runs the application in development mode
build | Builds a production version of the application
preview | Locally preview the production build of the application
check | Typecheck the code
lint | Lint the code
test | Test the application in watch mode
test:coverage | Test the application and build a coverage report
test:single | Runs a single test run

## CI/CD Pipeline

CI/CD is set up for this application via Github actions.

### CI

CI is run against any open pull requests or commits to the `main` branch.

The CI pipeline includes the following steps:

- Lint
- Typecheck
- Test
- Build

### CD

CD is run against any commits to the `main` branch.

The CD pipeline automates deployments to Github pages.