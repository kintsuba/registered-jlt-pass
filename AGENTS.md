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

## UI Verification

- After completing any UI or layout changes, always invoke the `browser` subagent to navigate to the modified page (e.g., `http://localhost:3000`) and capture a screenshot of the layout.
- Verify that the layout looks correct.
- If the browser subagent encounters a system error (e.g., server capacity issues), it is acceptable to skip the check, but it should always be attempted first as part of the standard workflow.
- **CRITICAL**: When reviewing screenshots, actively look for obvious visual bugs or broken layouts (squished text, overlapping elements, unintended obscuring of content). Even if the issue wasn't explicitly pointed out by the user, you MUST fix any obvious problems before reporting back to the user.
- **CRITICAL**: After successfully verifying the UI with the browser subagent, you MUST include the `[ui-verified]` tag in your commit message (e.g., `feat(ui): [ui-verified] update layout`). If you fail to do this, the git hook will block your commit.

## Command Execution

- **CRITICAL**: Do NOT execute commands starting with `&` (e.g., `& "C:\path\to\script.ps1"; command`). Bulk or dot-sourced script executions are difficult for the user to review and approve. Always invoke executables or scripts directly.
<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] This is a Nuxt project, so run Nuxt scripts via `vp run <script>`; use `vp run dev`, `vp run build`, and `vp run generate` instead of standalone `vp dev` or `vp build`.
- [ ] Before concluding any task that modifies frontend or server setup, always run the E2E boot test (`npx vitest run`) to ensure the app boots and the main layout renders without SSR errors.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
