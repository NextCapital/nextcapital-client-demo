## Documentation

This repository maintains structured documentation in `.github/docs/`. When making code changes that affect architecture, APIs, configuration, data flow, or component boundaries, update the corresponding `.github/docs/` content in the same PR. Follow the `documentation-upkeep` instruction.

### Documentation Routing

Read the relevant doc BEFORE exploring code -- it saves context window space and avoids redundant discovery. See the [documentation map](docs/README.md#documentation-map) for the full routing table.

## Code Conventions

- This is a **public repository**. Do not commit secrets, internal URLs, or sensitive information.
- Use JSX for React components. File extension is `.jsx` for all React files.
- ESLint flat config is in `eslint.config.cjs`. Run `npm run lint` before committing.
- Use `npm run` scripts from `package.json` for all build, lint, and test operations.
- Follow the existing demo page pattern when adding new demos. See `.github/docs/guides/adding-a-new-demo.md`.
