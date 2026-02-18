# AI Assistant Guide — Starship Theme Creator

# Jules vs GitHub Copilot: What Each Does, How to Use Them, and How They Work Together

---

## 🤖 The Two AI Assistants Working on This Project

This project uses **two different AI coding agents**, each with distinct strengths
and different instruction files. Understanding what each one does makes the whole
system more powerful.

```
┌─────────────────────────────────────────────────────────────────────┐
│                    YOUR DEVELOPMENT WORKFLOW                         │
│                                                                     │
│  YOU plan → checkpoint-guide.md → copy prompt → Jules builds it   │
│                              ↓                                      │
│         Jules creates a PR → GitHub Copilot reviews it            │
│                              ↓                                      │
│         You merge → GitHub Actions runs Jules overnight            │
│                              ↓                                      │
│         Jules cleans up code → Copilot suggests improvements       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🟦 JULES — The Autonomous Builder

**What it is:** Google's asynchronous AI coding agent powered by Gemini 3 Pro.
It works fully autonomously — you hand it a task, it goes away, codes in a cloud
VM, runs tests, and comes back with a pull request. You don't have to watch it.

**Instructions file:** `AGENTS.md` in the root of your repository.

### What Jules Can Do

| Capability                   | Details                                          |
| ---------------------------- | ------------------------------------------------ |
| **Build features**           | Full component implementation from a description |
| **Fix bugs**                 | Root-cause analysis across multiple files        |
| **Write tests**              | Unit, integration, component tests               |
| **Refactor code**            | Safely restructure while keeping functionality   |
| **Update dependencies**      | With verification via npm audit + build          |
| **Create pull requests**     | Detailed PRs with before/after description       |
| **Run shell commands**       | npm install, npm test, npm run build             |
| **Read the whole codebase**  | Not just one file — entire project context       |
| **Search the web**           | Can look up docs, Starship changelogs, etc.      |
| **Generate audio summaries** | MP3 changelogs of recent commits                 |
| **Scheduled automation**     | Runs daily/weekly via GitHub Actions             |
| **Issue automation**         | Add 'jules' label → Jules implements it          |
| **CLI control**              | `jules remote new`, `jules remote list`          |

### How to Send Tasks to Jules

**Method 1 — Web UI (Easiest)**

```
1. Go to https://jules.google
2. Select your repository and branch
3. Paste your task prompt (from checkpoint-guide.md)
4. Click "Give me a plan"
5. Review Jules' plan
6. Click "Approve plan"
7. Jules codes, creates PR, you review
```

**Method 2 — GitHub Issue with 'jules' label**

```
1. Create a GitHub Issue
2. Write a clear description of the task
3. Add the 'jules' label to the issue
4. Jules automatically picks it up and implements it
5. Jules creates a PR linking back to the issue
```

**Method 3 — Jules CLI**

```bash
# Install Jules Tools
npm install -g jules-tools

# Create a task from terminal
jules remote new --repo . --session "Add image palette component"

# Check status
jules remote list

# Pipe GitHub issues to Jules
gh issue list --label "enhancement" --limit 1 --json title \
  | jq -r '.[0].title' \
  | jules remote new --repo .
```

**Method 4 — Our Custom Script**

```bash
bash scripts/jules.sh checkpoint 6 2
```

### Jules Scheduled Tasks (Run Automatically)

Jules runs automatically every night and week via GitHub Actions.
These are configured in `.github/workflows/jules-*.yml`.

```
📅 DAILY SCHEDULE (UTC):

  06:00 AM  →  Security Scan
              Runs: npm audit
              Fixes: HIGH/CRITICAL vulnerabilities
              Creates PR if fixes needed

  08:00 AM  →  Dependency Update Check
              Runs: npm outdated
              Updates: PATCH and MINOR versions only
              Verifies: build + tests still pass
              Creates PR if updates applied

📅 WEEKLY SCHEDULE (UTC):

  Monday    →  Code Quality Audit (3:00 AM)
  03:00 AM      Fixes: lint errors, TypeScript issues
                Removes: dead code, console.logs, unused imports
                Adds: missing error handling
                Creates PR with full quality report

  Wednesday →  Performance Audit (3:00 AM)
  03:00 AM      Analyzes: bundle sizes, render performance
                Fixes: missing React.memo, useCallback, useMemo
                Adds: lazy loading for heavy components
                Creates PR with before/after metrics

  Sunday    →  Starship Compatibility Sync (10:00 AM)
  10:00 AM      Checks: latest Starship release
                Adds: new modules to our app
                Updates: changed module types
                Creates PR if Starship added new modules

📅 MONTHLY SCHEDULE (UTC):

  1st of    →  Deep Cleanup (2:00 AM)
  Month         Full: deps, types, docs, tests, structure
                Creates PR with monthly health report
```

### Tips for Writing Good Jules Prompts

**Be specific and measurable:**

```
✅ GOOD:
"Add a ModuleConfigPanel component in src/components/ModuleConfigPanel/index.tsx
that accepts moduleName: string and config: ModuleConfig props.
Run npm run build to verify no TypeScript errors.
Run npm test to verify no regressions."

❌ BAD:
"Add module configuration"
```

**Include success criteria Jules can verify:**

```
✅ GOOD:
"The component is complete when:
1. npm run build exits with code 0
2. npm test exits with code 0
3. The component renders without errors when moduleName='directory'
4. Changing a value in the form updates the store"

❌ BAD:
"Make sure it works"
```

**Reference AGENTS.md standards:**

```
✅ GOOD:
"Follow the coding standards in AGENTS.md:
- TypeScript types for all props
- Tailwind CSS only (no inline styles)
- useToast() for user feedback
- Loading states for async operations"
```

---

## ⬛ GITHUB COPILOT — The Interactive Collaborator

**What it is:** GitHub's AI coding assistant that works interactively in VS Code,
on GitHub.com, and as an autonomous coding agent for background tasks.

**Instructions file:** `.github/copilot-instructions.md`

### The Three Ways Copilot Helps

#### 1. VS Code Chat & Inline Suggestions

Real-time help as you code:

- Type a comment → Copilot completes the code
- Ask a question in chat → Copilot explains
- Select code → Ask Copilot to refactor/fix/explain it
- Use `@workspace` → Copilot understands your whole project

#### 2. VS Code Agent Mode (Interactive)

For multi-step tasks while you're actively working:

```
1. Open Copilot Chat (Ctrl+Alt+I)
2. Switch to "Agent" mode in dropdown
3. Type: "Create a color picker component with Nord preset support"
4. Copilot reads the workspace, proposes files to edit
5. Executes changes, runs terminal commands
6. Fixes any errors it encounters
7. You stay in control and can guide it
```

Best for:

- Complex refactors while watching progress
- Debugging sessions where you need to iterate fast
- Exploring how to implement something new
- When you want to see and guide each step

#### 3. Copilot Coding Agent (Background/Autonomous)

For delegated tasks that run in background without your attention:

```
Method A — Assign GitHub Issue:
  1. Create issue on GitHub.com
  2. Set Assignee → "Copilot"
  3. Copilot creates branch (copilot/issue-XX-...)
  4. Copilot opens draft PR with commits
  5. Copilot requests your review
  6. Leave PR comments → Copilot iterates
  7. Merge when satisfied

Method B — VS Code Delegate:
  1. Have a chat conversation about the task
  2. Click "Delegate to coding agent"
  3. Chat context automatically sent to agent
  4. Agent works in background
  5. PR created for review

Method C — @copilot mention in PR:
  Add comment to any PR:
  "@copilot Can you add error handling for the image upload?"
  Copilot will respond with code changes to the PR
```

### What Copilot Can Do

| Capability                  | Details                                              |
| --------------------------- | ---------------------------------------------------- |
| **Inline code completion**  | Context-aware suggestions as you type                |
| **Chat Q&A**                | Answer questions about code, docs, architecture      |
| **Agent mode (VS Code)**    | Interactive multi-file edits with terminal           |
| **Coding agent (GitHub)**   | Autonomous background task → PR workflow             |
| **PR review**               | Automated code review with line-by-line comments     |
| **PR summaries**            | AI-generated summary of what a PR changes            |
| **Security scanning**       | Checks code it writes for vulnerabilities            |
| **@copilot in PR comments** | Ask Copilot to fix specific things in a PR           |
| **MCP integration**         | Connect to external tools via Model Context Protocol |
| **Multi-model support**     | GPT-4o, Claude 3.5, Gemini — switch models           |
| **Issue-to-PR workflow**    | Assign issue → Copilot implements → PR ready         |

### Copilot Scheduled/Automated Capabilities

Unlike Jules, Copilot doesn't have a traditional cron scheduler, but you can
trigger it automatically through GitHub events:

```yaml
# Example: Auto-assign new "good first issue" bugs to Copilot
# .github/workflows/copilot-auto-assign.yml

name: Auto-Assign to Copilot
on:
  issues:
    types: [labeled]

jobs:
  assign:
    if: github.event.label.name == 'copilot-fix'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.addAssignees({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              assignees: ['copilot']
            })
```

**Copilot Automation Triggers:**

```
On new issue labeled 'copilot-fix'    → Auto-assign to Copilot
On PR opened                          → Auto code review
On PR merged                          → Auto-summarize changes
On @copilot mention in PR comment     → Copilot responds with changes
On 'Delegate to agent' in VS Code     → Background implementation
```

### Copilot Workflow for This Project

**Daily Development Pattern:**

```
1. Open VS Code
2. Run: bash scripts/dev.sh
3. Use Copilot inline suggestions as you write code
4. For complex features: use Agent Mode in VS Code
5. For backlog tasks: assign to Copilot Coding Agent
6. Review Copilot's PRs on GitHub
```

**Issue Management Pattern:**

```
For SIMPLE bugs:
  → Assign to @copilot directly in GitHub issue
  → Copilot creates branch, fixes, opens PR
  → Review and merge

For COMPLEX features:
  → Use Jules (better at large multi-file features)
  → Or delegate from VS Code Chat with full context

For QUICK fixes while in VS Code:
  → Use Agent Mode
  → Stay in VS Code, see changes in real time
```

---

## 🤝 HOW JULES AND COPILOT WORK TOGETHER

They're complementary, not competing:

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   JULES is better at:              COPILOT is better at:           │
│   ─────────────────────            ─────────────────────           │
│   • Scheduled automation           • Real-time suggestions         │
│   • Long overnight tasks           • Interactive exploration        │
│   • Full feature builds            • Quick inline completions       │
│   • Dependency maintenance         • PR reviews as you work        │
│   • Deep codebase refactors        • Same-session iterations       │
│   • Starship compatibility         • VS Code agent mode            │
│   • Weekly quality audits          • Auto-assign backlog bugs      │
│   • Batch issue processing         • PR summaries and reviews      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Recommended Division of Labor

```
Use JULES for:                        Use COPILOT for:

Checkpoint tasks                      Quick bug fixes
  bash scripts/checkpoint.sh 6 2        Assign issue to @copilot

Weekly maintenance                    Code as you write
  Runs automatically                     VS Code inline suggestions

Multi-file features                   Interactive debugging
  Long builds → run at night             Agent Mode in VS Code

Starship sync                         PR review
  Keeps app up to date                   @copilot on PR

Batch processing                      Explain code
  gh issue list | jules remote new       Ask in chat
```

### The Ideal Workflow Loop

```
Monday morning: Jules ran quality audit over weekend
  → Review Jules' PR
  → Merge if looks good

During day: You work on a checkpoint
  1. bash scripts/checkpoint.sh 6 2
  2. Open checkpoint-guide.md
  3. Copy Jules prompt
  4. Send to Jules (or use Copilot Agent Mode if you want to watch)
  5. Jules/Copilot creates PR
  6. Review PR
  7. bash scripts/verify.sh
  8. Merge

Backlog bugs: Assign to @copilot
  → Copilot implements fix
  → Review PR
  → Merge

Overnight: Jules runs security + dep checks
  → Wake up to a clean, updated codebase
```

---

## 📁 FILE STRUCTURE FOR AI INSTRUCTIONS

```
project-root/
├── AGENTS.md                              ← Jules reads this (in root)
│   └── Contains: project context, standards, data types,
│                 coding rules, PR template, scheduled tasks
│
├── .github/
│   ├── copilot-instructions.md            ← Copilot reads this
│   │   └── Contains: project overview, standards, templates,
│   │                 what Copilot can do, issue templates
│   │
│   └── workflows/
│       ├── ci.yml                         ← Runs on every PR
│       ├── jules-daily-security.yml       ← Jules: 6 AM daily
│       ├── jules-daily-deps.yml           ← Jules: 8 AM daily
│       ├── jules-weekly-quality.yml       ← Jules: Monday 3 AM
│       ├── jules-weekly-performance.yml   ← Jules: Wednesday 3 AM
│       ├── jules-weekly-starship.yml      ← Jules: Sunday 10 AM
│       ├── jules-monthly-cleanup.yml      ← Jules: 1st of month
│       ├── jules-on-issue.yml             ← Jules: on 'jules' label
│       └── copilot-auto-assign.yml        ← Copilot: on 'copilot-fix'
```

---

## 🔐 REQUIRED SECRETS

In your GitHub repository, go to Settings → Secrets and add:

```
Secret Name:     JULES_API_KEY
What it is:      Your Jules API key
Where to get it: jules.google → Settings → API Keys

No secret needed for Copilot — it uses your GitHub Copilot subscription
```

---

## 🚀 GETTING EVERYTHING SET UP

### Step 1: Connect Jules to Your Repo

```
1. Go to https://jules.google
2. Sign in with Google account
3. Click "Connect to GitHub account"
4. Grant access to your starship-theme-creator repo
5. Jules can now access your codebase
```

### Step 2: Add Jules API Key to GitHub

```
1. In Jules web app → Settings → API Keys → Create new key
2. In GitHub repo → Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: JULES_API_KEY | Value: [your API key]
5. Save
```

### Step 3: Enable GitHub Copilot Coding Agent

```
1. Ensure you have Copilot Pro, Pro+, Business, or Enterprise
2. For Business/Enterprise: Admin must enable in Policies settings
3. In your repo, check that Copilot coding agent is enabled
4. You can now assign issues to @copilot
```

### Step 4: Set Up Workflows

```
1. Copy workflow files from github-workflows.md
2. Create each as a separate file in .github/workflows/
3. Update trusted username list in jules-on-issue.yml
4. Commit and push to main
5. Workflows activate automatically
```

### Step 5: Verify Everything Works

```
1. In GitHub → Actions tab → manually trigger jules-daily-deps.yml
2. Watch Jules run the task
3. Check if a PR is created (if deps were outdated)
4. Assign a simple test issue to @copilot
5. Watch Copilot create a branch and PR
```

---

## 💡 PRO TIPS

**Write better Jules prompts:**

- Always end with: "Run `npm run build && npm test` before creating the PR"
- Include file paths explicitly: "in src/components/ColorPicker/index.tsx"
- Give success criteria Jules can test: "The component renders without errors"

**Get better Copilot suggestions:**

- Keep `.github/copilot-instructions.md` updated as the project evolves
- Use `@workspace` in chat for full codebase context
- Reference specific files with `#file:src/lib/color-utils.ts`

**Avoid conflicts between the two:**

- Don't have Jules and Copilot working on the same file simultaneously
- Jules owns scheduled automation — don't override with Copilot
- Use branch naming to signal who's working: `checkpoint/` = Jules, `copilot/` = Copilot

**Monitor what they're doing:**

- Jules: Check https://jules.google dashboard
- Copilot: Check draft PRs in your GitHub repo
- Both: Review the Actions tab in GitHub for workflow runs

---

_Jules instructions: AGENTS.md_
_Copilot instructions: .github/copilot-instructions.md_
_Workflow files: .github/workflows/jules-_.yml\*
