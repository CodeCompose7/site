---
title: "Part 3: GitFlow + AI Development Tool-Based Collaboration Practice"
date: 2026-01-02 02:00:00
lastmod: 2026-01-02 02:00:00
version: 1
categories: ["fundamentals"]
tags: ["Git", "GitFlow", "Collaboration", "Pull Request", "Code Review", "AI Tools"]
description: "The first gateway from solo coding to team development"
summary: "Understand Git not as a simple version control tool but as a mental model for team collaboration, and practice efficient collaboration workflows using AI tools."
level: 3
hours: "3:00"
weight: "2601-03"
---

## Course Overview

This course covers Git collaboration workflows needed when transitioning from individual to team projects.

We start not by listing GitFlow rules, but by understanding why such a structure is necessary.

In particular, we emphasize that in an era where AI coding tools have become ubiquitous, Git goes beyond simple version control to serve as a "safety net for AI-generated code."

## Learning Objectives

- Fundamentally understand why branch strategies are necessary
- Grasp each GitFlow branch's role and flow
- Learn how Pull Requests and code reviews actually work
- Learn how to leverage AI tools for commit messages and review assistance
- Internalize the development cycle connecting AI + testing + GitFlow

## Course Structure

### Part 1: Why Branch Strategies Are Necessary

- Problems created by "pushing directly to main"
- Differences between solo development and team development
- Branches = work isolation + merge control
- Real conflict cases from actual team projects

### Part 2: Understanding GitFlow as a Mental Model

- Roles of main, develop, feature, release, and hotfix
- What each branch "protects"
- GitFlow vs GitHub Flow vs Trunk-based: When to use what
- Simplified GitFlow suitable for labs and undergraduate teams

### Part 3: The AI Era Development Cycle — AI + Testing + Git

In an era where AI coding tools generate code, Git is not just a version control tool. It serves as a "checkpoint" that allows you to safely revert when AI-generated code doesn't work as expected.

{{< mermaid >}}
flowchart TD
    A[Create feature branch<br/><br/>git checkout -b feature/new-function]
    B[Request code from AI<br/><br/>'Write a function to validate user input']
    A --> B
    
    C[Run tests<br/><br/>pytest tests/]
    B --> C

    C --> D{Test results}
    
    E[commit<br/><br/>Proceed to next task]
    D -->|Pass| E

    F[git checkout -- .<br/><br/>Re-request from AI with error message]
    D -->|Fail| F
    F --> B
{{< /mermaid >}}

**Why This Cycle Matters**

AI-generated code often "looks plausible but is wrong." Accumulating AI code without testing makes it difficult to trace where problems started. Combining Git's version control with testing enables:

- **Failure isolation**: Revert only the failing changes when tests fail
- **Safe experimentation**: Try AI code freely on branches, discard if it doesn't work
- **Incremental integration**: Merge only validated code in small units to develop

**Practice: Experience the AI + Testing + Git Cycle**

- Request function implementation from AI
- Validate with pre-written tests
- On failure, revert with `git checkout` and retry
- On success, record with meaningful commit message

### Part 4: Pull Requests and Code Review

- Why PRs are more than just merge requests
- Components of a good PR: title, description, scope of changes
- What to look for and what not to look for in code review
- Communication tips for both reviewers and authors
- Special considerations when reviewing AI-generated code

### Part 5: AI-Based Collaboration Tools

- Auto-generating commit messages with AI
- Using AI to draft PR descriptions
- Introduction to AI code review assistance tools
- Limitations of AI tools and the role of humans

### Part 6: Real Team Project Simulation

- Conduct a virtual project in teams of 3-4
- Create feature branch → Write code with AI → Test → PR → Review → Merge
- Practice resolving conflicts
- Retrospective: What went well and what was difficult

## Course Format

- **Online/Offline**: Zoom or in-person sessions
- **Hands-on focused**: Team collaboration simulation in actual GitHub repositories

## Target Audience

- Undergraduates starting their first team project
- Teams preparing graduation projects or capstone projects
- New lab members working with shared codebases
- Developers who have only used Git solo without collaboration experience

## Prerequisites

- Basic Git commands (add, commit, push, pull)
- GitHub account and basic usage experience
- Ability to write simple code in Python or another language
- Basic pytest usage (TDD course completion recommended)

## Key Practice Examples

- Creating feature branches and working on them
- AI-generated code → test → commit/rollback cycle experience
- Writing PRs and exchanging reviews
- Resolving merge conflicts
- Generating commit messages with AI tools

## AI Era Development Cycle Summary

| Step      | Action                  | Tool               |
| --------- | ----------------------- | ------------------ |
| 1. Isolate | Create feature branch   | Git                |
| 2. Generate | Request code from AI   | Copilot, Claude, etc. |
| 3. Validate | Run tests              | pytest             |
| 4a. Success | Commit and next task   | Git                |
| 4b. Failure | Revert and re-request  | Git + AI           |
| 5. Integrate | Create PR and review  | GitHub             |
| 6. Merge   | Merge to develop        | Git                |

## GitFlow Branch Roles Summary

| Branch    | Purpose                        | Created When       | Merges To     |
| --------- | ------------------------------ | ------------------ | ------------- |
| main      | Stable, deployable version     | Always exists      | -             |
| develop   | Next release integration       | Always exists      | main          |
| feature/* | Individual feature development | When feature starts | develop       |
| release/* | Release preparation and QA     | Before release     | main, develop |
| hotfix/*  | Emergency bug fixes            | When bug found     | main, develop |

## Good Commit Message Structure

```text
<type>: <subject>

<body>

<footer>
```

- **type**: feat, fix, docs, style, refactor, test, chore
- **subject**: Under 50 characters, written in imperative mood
- **body**: Explain why this change is needed
- **footer**: Link issue numbers (e.g., Closes #123)

## Next Steps After This Course

After completing this course, you can continue with the **DevOps / MLOps Minimum Set** course, where you'll learn how to scale team-level collaboration to organization-level stable operations.

## Contact

For inquiries about course schedules and pricing, please reach out via email.

