# Git Hooks

## Pre-commit Hook

Runs automatically before each commit:
- `bun run lint` - ESLint checks
- `bun run format` - Prettier formatting

## Pre-push Hook

Currently displays a message. Will run tests when they are added in later phases.

## Location

Hooks are located in the main repository:
- `/c/Users/Ray.Shen/WebProjects/Aether/.git/hooks/pre-commit`
- `/c/Users/Ray.Shen/WebProjects/Aether/.git/hooks/pre-push`

These hooks apply to all worktrees.
