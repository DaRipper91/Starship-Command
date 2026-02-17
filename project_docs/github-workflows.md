## GitHub Actions Workflows for Jules Scheduled Tasks
## Save each YAML block as a separate file in .github/workflows/

================================================================================
FILE 1: .github/workflows/jules-daily-security.yml
================================================================================

name: "Jules: Daily Security Scan"
on:
  schedule:
    - cron: "0 6 * * *"   # Every day at 6:00 AM UTC
  workflow_dispatch:        # Can also trigger manually

permissions:
  contents: write
  pull-requests: write

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: google-labs-code/jules-invoke@v1
        with:
          jules_api_key: ${{ secrets.JULES_API_KEY }}
          prompt: |
            You are a security agent for the Starship Theme Creator project.
            
            Run a comprehensive security audit and fix any issues found.
            
            TASKS:
            1. Run `npm audit` and capture the full output
            2. For any HIGH or CRITICAL severity vulnerabilities:
               a. Check if `npm audit fix` can resolve them automatically
               b. If yes, run `npm audit fix`
               c. If manual update is needed, update the specific package
            3. Run `npm audit fix --force` only if safe (no major breaking changes)
            4. Check for any hardcoded secrets, API keys, or passwords in:
               - All .ts and .tsx files
               - All .env files (should not be committed)
               - All config files
            5. Verify .gitignore includes: .env, .env.local, *.key, *.pem
            6. Run `npm run build` to confirm nothing is broken
            7. Run `npm test` to confirm no test regressions
            
            SUCCESS CRITERIA:
            - npm audit shows 0 HIGH or CRITICAL vulnerabilities
            - Build passes: `npm run build` exits with code 0
            - Tests pass: `npm test` exits with code 0
            
            If fixes were made, create a PR titled:
            "security: Fix npm vulnerabilities [YYYY-MM-DD]"
            
            If no issues found, do not create a PR. Just exit successfully.

================================================================================
FILE 2: .github/workflows/jules-daily-deps.yml
================================================================================

name: "Jules: Daily Dependency Check"
on:
  schedule:
    - cron: "0 8 * * *"   # Every day at 8:00 AM UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  dep-check:
    runs-on: ubuntu-latest
    steps:
      - uses: google-labs-code/jules-invoke@v1
        with:
          jules_api_key: ${{ secrets.JULES_API_KEY }}
          prompt: |
            You are a dependency maintenance agent for the Starship Theme Creator.
            
            TASKS:
            1. Run `npm outdated` and capture the output
            2. Categorize updates:
               - PATCH updates (1.2.3 → 1.2.4): Safe, update automatically
               - MINOR updates (1.2.3 → 1.3.0): Usually safe, update with caution
               - MAJOR updates (1.2.3 → 2.0.0): Potentially breaking, DO NOT auto-update
            3. For PATCH and MINOR updates that are safe:
               a. Update the package
               b. Run `npm run build` — if it fails, revert this package
               c. Run `npm test` — if tests fail, revert this package
               d. Only include the package in the PR if both pass
            4. For MAJOR updates:
               a. List them in the PR description as "Requires manual review"
               b. Do NOT update them
            
            KEY PACKAGES (extra caution on these):
            - xterm / xterm-addon-fit (terminal rendering)
            - @iarna/toml (TOML parsing)
            - zustand (state management)
            - react / react-dom (framework)
            
            SUCCESS CRITERIA:
            - `npm run build` passes after updates
            - `npm test` passes after updates
            
            If any safe updates were made, create a PR titled:
            "deps: Update patch/minor dependencies [YYYY-MM-DD]"
            Include a table showing: Package | Old Version | New Version | Type
            
            If nothing safe to update, exit without creating a PR.

================================================================================
FILE 3: .github/workflows/jules-weekly-quality.yml
================================================================================

name: "Jules: Weekly Code Quality Audit"
on:
  schedule:
    - cron: "0 3 * * 1"   # Every Monday at 3:00 AM UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  quality-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: google-labs-code/jules-invoke@v1
        with:
          jules_api_key: ${{ secrets.JULES_API_KEY }}
          prompt: |
            You are a code quality agent for the Starship Theme Creator.
            Perform a comprehensive weekly code quality audit and fix all issues.
            
            STEP 1 — Lint and format:
            1. Run `npm run lint` and fix ALL errors (not warnings, those are ok)
            2. Run `npm run format` to auto-format all files
            3. Run `npm run type-check` and fix ALL TypeScript errors
            
            STEP 2 — Dead code cleanup:
            1. Find and remove unused imports in all .ts and .tsx files
            2. Find functions or variables that are declared but never used
            3. Remove console.log, console.warn, console.error statements
              (EXCEPTION: keep them if they're inside catch blocks that aren't toast-handled)
            4. Find and remove commented-out code blocks (not JSDoc comments)
            5. Find TODO comments older than 30 days and either implement them or remove them
            
            STEP 3 — Code pattern improvements:
            1. Find async functions missing try/catch and add proper error handling
            2. Find components using alert() and replace with useToast()
            3. Find missing aria-label on icon-only buttons and add them
            4. Find useEffect hooks with missing dependencies and fix the dependency arrays
            5. Find expensive operations inside render that should be useMemo
            
            STEP 4 — Test coverage:
            1. Run `npm run coverage` and check the report
            2. Find any utility in src/lib/ with coverage below 60%
            3. Add tests for those utilities
            4. Run `npm test` to confirm all tests pass
            
            FINAL VERIFICATION:
            - `npm run build` must pass
            - `npm test` must pass
            - `npm run lint` must pass
            
            Create a PR titled: "chore: Weekly code quality improvements [Week of YYYY-MM-DD]"
            Include a summary of all changes made by category.

================================================================================
FILE 4: .github/workflows/jules-weekly-performance.yml
================================================================================

name: "Jules: Weekly Performance Audit"
on:
  schedule:
    - cron: "0 3 * * 3"   # Every Wednesday at 3:00 AM UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  perf-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: google-labs-code/jules-invoke@v1
        with:
          jules_api_key: ${{ secrets.JULES_API_KEY }}
          prompt: |
            You are a performance optimization agent for the Starship Theme Creator.
            
            STEP 1 — Bundle analysis:
            1. Run `npm run build` and capture the output showing chunk sizes
            2. Identify any chunk over 500KB that could be split
            3. Identify any component that could be lazy-loaded
            4. Check if ThemeGallery, WelcomeWizard, ComparisonView are lazy loaded
            
            STEP 2 — React optimization:
            1. Find components that re-render unnecessarily:
               - Components that receive stable props but aren't wrapped in React.memo
               - Event handlers inside components not wrapped in useCallback
               - Computed values not wrapped in useMemo
            2. Check TerminalPreview — it's the most expensive component.
               It should only re-render when currentTheme changes.
            3. Check ColorPicker — color updates should be debounced (300ms)
               before updating the store.
            4. Check ModuleBuilder — drag operations should be debounced.
            
            STEP 3 — Lazy loading:
            1. Add React.lazy() + Suspense for heavy components not needed on first load:
               - ThemeGallery (only opened from header)
               - WelcomeWizard (only for first-time users)
               - ComparisonView (optional feature)
               - IconBrowser (opened on demand)
            2. Add LoadingSpinner as the Suspense fallback
            
            STEP 4 — Image and asset optimization:
            1. Check if any images in public/ are unoptimized
            2. Confirm nerd-fonts are subset correctly (only needed characters)
            
            FINAL VERIFICATION:
            - `npm run build` must pass
            - `npm test` must pass
            - Report the before/after chunk sizes in the PR description
            
            Create PR titled: "perf: Weekly performance optimizations [Week of YYYY-MM-DD]"
            Include before/after metrics and description of what was optimized.

================================================================================
FILE 5: .github/workflows/jules-weekly-starship-sync.yml
================================================================================

name: "Jules: Weekly Starship Compatibility Sync"
on:
  schedule:
    - cron: "0 10 * * 0"  # Every Sunday at 10:00 AM UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  starship-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: google-labs-code/jules-invoke@v1
        with:
          jules_api_key: ${{ secrets.JULES_API_KEY }}
          prompt: |
            You are a Starship compatibility agent for the Starship Theme Creator.
            Ensure our app stays current with the latest Starship release.
            
            STEP 1 — Check latest Starship release:
            1. Fetch https://github.com/starship/starship/releases/latest
            2. Record the version number and release notes
            3. Check https://starship.rs/config/ for any new or changed modules
            
            STEP 2 — Update module definitions:
            1. Compare modules in src/lib/module-definitions.ts vs starship docs
            2. For any NEW module in Starship not in our list:
               a. Add it to module-definitions.ts with all required fields
               b. Add its TypeScript interface to starship.types.ts
               c. Add a default config to src/lib/toml-parser.ts getDefaultConfig()
               d. Add mock data to src/lib/mock-data.ts if it affects preview
            3. For any CHANGED module options:
               a. Update the TypeScript interface in starship.types.ts
               b. Update the config panel in src/components/ModuleConfigPanel/
               c. Update validation rules in src/lib/theme-validator.ts
            
            STEP 3 — Update documentation:
            1. Update AGENTS.md "All Supported Modules" section if modules changed
            2. Update .github/copilot-instructions.md cheat sheet if needed
            
            STEP 4 — Verification:
            - `npm run build` must pass with all new types
            - `npm test` must pass
            
            If changes were needed, create PR titled:
            "compat: Sync with Starship v[version] [YYYY-MM-DD]"
            List each new/changed module and what was updated.
            
            If no changes needed, exit without creating a PR.

================================================================================
FILE 6: .github/workflows/jules-on-issue.yml
================================================================================

name: "Jules: Implement GitHub Issue"
on:
  issues:
    types: [labeled]

permissions:
  contents: write
  pull-requests: write
  issues: write

jobs:
  implement-issue:
    # Only runs when 'jules' label is added AND user is trusted
    if: |
      github.event.label.name == 'jules' &&
      contains(fromJSON('["YOUR_GITHUB_USERNAME", "COLLABORATOR_USERNAME"]'),
               github.event.issue.user.login)
    runs-on: ubuntu-latest
    steps:
      - uses: google-labs-code/jules-invoke@v1
        with:
          jules_api_key: ${{ secrets.JULES_API_KEY }}
          prompt: |
            You are implementing a feature or bug fix for the Starship Theme Creator.
            
            GitHub Issue Title: ${{ github.event.issue.title }}
            GitHub Issue Body:
            ${{ github.event.issue.body }}
            
            BEFORE STARTING:
            1. Read AGENTS.md for project standards
            2. Read src/types/starship.types.ts for data types
            3. Read src/stores/theme-store.ts for state management
            4. Understand what checkpoint this relates to (check issue body)
            
            IMPLEMENTATION RULES:
            - Follow all coding standards in AGENTS.md
            - Use TypeScript types for everything
            - Use Tailwind CSS only (no inline styles)
            - Use useToast() for user feedback (not alert())
            - Add loading states for async operations
            - Write tests for any new utility functions
            - Handle errors gracefully
            
            AFTER IMPLEMENTATION:
            1. Run `npm run build` — must pass
            2. Run `npm test` — must pass
            3. Run `npm run lint` — must pass
            
            Create a PR that:
            - References the issue: "Closes #${{ github.event.issue.number }}"
            - Follows the PR template in AGENTS.md
            - Has a detailed description of what was implemented
            - Lists all files changed and why

================================================================================
FILE 7: .github/workflows/jules-monthly-cleanup.yml
================================================================================

name: "Jules: Monthly Deep Cleanup"
on:
  schedule:
    - cron: "0 2 1 * *"   # 1st of every month at 2:00 AM UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  monthly-cleanup:
    runs-on: ubuntu-latest
    steps:
      - uses: google-labs-code/jules-invoke@v1
        with:
          jules_api_key: ${{ secrets.JULES_API_KEY }}
          prompt: |
            You are performing a deep monthly cleanup of the Starship Theme Creator.
            
            STEP 1 — Dependency audit:
            1. Run `npm outdated` for a full picture
            2. Run `npm audit` for security issues
            3. Look for packages that have major updates available
            4. Create a summary (don't auto-update majors)
            
            STEP 2 — File organization:
            1. Check that every component in src/components/ has a test file
            2. Check that every utility in src/lib/ has a test file
            3. Check for any orphaned files not imported anywhere
            4. Verify folder structure matches AGENTS.md directory map
            
            STEP 3 — Type safety improvements:
            1. Run TypeScript in strict mode: `npx tsc --strict --noEmit`
            2. Fix any strict-mode errors
            3. Find places where types could be more specific (string → literal union)
            
            STEP 4 — Documentation refresh:
            1. Update README.md with any new features added this month
            2. Check that all JSDoc comments are accurate
            3. Verify AGENTS.md still reflects actual project structure
            4. Check .github/copilot-instructions.md is still accurate
            
            STEP 5 — Test health:
            1. Run `npm run coverage` and identify coverage below 50%
            2. Add missing tests for critical paths
            3. Remove any tests that are testing implementation details (fragile tests)
            
            FINAL:
            - `npm run build` must pass
            - `npm test` must pass
            
            Create PR titled: "chore: Monthly deep cleanup [Month YYYY]"
            Include a comprehensive monthly health report.

================================================================================
FILE 8: .github/workflows/ci.yml  (Main CI Pipeline)
================================================================================

name: "CI: Build, Lint, Test"
on:
  push:
    branches: [main, "checkpoint/**", "feature/**", "fix/**", "copilot/**"]
  pull_request:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: TypeScript check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm run test:run

      - name: Build
        run: npm run build

      - name: Check bundle size
        run: |
          BUILD_SIZE=$(du -sh dist | cut -f1)
          echo "Build size: $BUILD_SIZE"
          # Fail if over 5MB uncompressed
          BUILD_BYTES=$(du -sb dist | cut -f1)
          if [ "$BUILD_BYTES" -gt 5242880 ]; then
            echo "Bundle too large: $BUILD_SIZE (max 5MB)"
            exit 1
          fi
