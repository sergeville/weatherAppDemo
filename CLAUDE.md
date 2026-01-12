# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a weather application demo repository. The project structure and technology stack will be determined as development progresses.

Based on the .gitignore configuration, this repository is set up to support:
- Node.js/npm projects
- React or Next.js applications
- Environment-based configuration
- Modern JavaScript/TypeScript development

## Getting Started

This repository was created using the `mkproject` command, which automatically initializes git repositories.

### The `mkproject` Workflow

The system has a custom `mkproject` shell function that automates project setup. When creating new projects, it:

1. **Automatically runs `git init`** - Git initialization is built into the command
2. Creates a comprehensive `.gitignore` file suitable for Node.js/React/Next.js/Python projects
3. Offers 6 project types:
   - Plain (git + .gitignore only)
   - Node.js (npm init)
   - React (Create React App)
   - Next.js (create-next-app with TypeScript)
   - TypeScript Node (npm init + TypeScript setup)
   - Python (venv + VS Code configuration)
4. Automatically opens the project in VS Code if available

**Usage**: `mkproject <project-name>`

**Note**: This repository was created with the Plain option. To add a framework, use the appropriate initialization command:
- React: `npx create-react-app .` (in current directory)
- Next.js: `npx create-next-app@latest .`
- Node.js: `npm init -y`

## Common Commands (to be updated)

Once the project is initialized, update this section with:
- Development server command
- Build command
- Test command
- Lint command

## Architecture (to be documented)

Document the architecture here once the codebase is established, including:
- Component structure
- State management approach
- API integration patterns
- Data flow
