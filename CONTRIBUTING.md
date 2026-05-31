# Contributing to Starship Command

First off, thank you for considering contributing to Starship Command! It's people like you that make Starship Command such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title for the issue to identify the problem.
* Describe the exact steps which reproduce the problem in as many details as possible.
* Provide specific examples to demonstrate the steps.

### Suggesting Enhancements

* Use a clear and descriptive title for the issue to identify the suggestion.
* Provide a step-by-step description of the suggested enhancement in as many details as possible.
* Explain why this enhancement would be useful to most Starship Command users.

### Pull Requests

* Follow the Code Style and Linting Rules (see below).
* Run tests before submitting.
* Write a clear, descriptive commit message.

## Code Style & Linting Rules

This project strictly enforces code quality through ESLint and Prettier.

- **No `any` Types**: TypeScript strict mode is enabled. Do not use `any`. Use proper interfaces, types, or `unknown` where appropriate.
- **No `console.log`**: Console logs are strictly forbidden in production code and will cause ESLint to fail. Use `console.warn` or `console.error` sparingly if absolutely necessary, but prefer proper Error Boundaries or toast notifications for user-facing errors.
- **Unused Variables**: Unused variables are not allowed unless they are intentionally prefixed with an underscore (e.g., `_unusedVar`).
- **Import Ordering**: Imports must be consistently ordered and grouped. This is enforced by `eslint-plugin-simple-import-sort`.
- **Pre-commit Hooks**: We use `husky` and `lint-staged`. You cannot commit code that fails the linter or formatter.

### Useful Commands

* `npm run lint` - Run ESLint to check for violations.
* `npm run lint -- --fix` - Automatically fix fixable lint violations (like import sorting).
* `npm run format` - Run Prettier to format all files.
* `npm test` - Run the Vitest test suite.
* `npm run build` - Run type-checking (`tsc -b`) and build the project.
