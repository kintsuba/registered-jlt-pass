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

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] This is a Nuxt project, so run Nuxt scripts via `vp run <script>`; use `vp run dev`, `vp run build`, and `vp run generate` instead of standalone `vp dev` or `vp build`.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
