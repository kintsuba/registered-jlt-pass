# Repository Guidelines

## Commits

Use Conventional Commits for all commit messages.

Format:

```text
<type>(optional-scope): <description>
```

Common types:

- `feat`: user-facing feature or capability
- `fix`: bug fix
- `docs`: documentation-only change
- `chore`: repository maintenance or tooling
- `refactor`: code restructuring without behavior change
- `test`: test additions or changes

Examples:

```text
docs: add MVP specification
docs: add site name to MVP spec
chore: initialize repository guidelines
```

Before committing, check the staged diff and choose the narrowest accurate type.
