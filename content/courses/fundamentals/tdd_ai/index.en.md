---
title: "Part 2: TDD and Development Thinking in the AI Era"
date: 2026-01-02 01:00:00
lastmod: 2026-01-02 01:00:00
version: 1
categories: ["fundamentals"]
tags: ["TDD", "Testing", "AI Development", "Code Quality", "Development Habits"]
description: "A course that reframes testing not as a tedious procedure, but as a safety net for developing with AI"
summary: "In an era where AI generates code, understand why relying on autocomplete without testing is dangerous, and develop habits that ensure maximum safety with minimum testing effort."
level: 2
hours: "3:00"
weight: "2601-02"
---

## Course Overview

This course addresses why testing has become even more important in an era where AI coding tools are ubiquitous.

We approach TDD not as a formal methodology, but as a practical tool for validating and safely using AI-generated code.

## Learning Objectives

- Understand why AI-generated code can be more dangerous
- Shift perspective on testing from "verification tool" to "design tool"
- Learn testing strategies that maximize effectiveness with minimal effort
- Achieve both development speed and safety through AI + testing combination

## Course Structure

### Part 1: Why AI Code Becomes More Dangerous

- How AI coding tools work and their limitations
- Examples of "plausible but incorrect code"
- Cumulative risks of copy-paste development
- Why "it works, so it's fine" is dangerous

### Part 2: Limitations of Autocomplete Without Testing

- The relationship between when bugs are found and the cost of fixing them
- Hidden assumptions in AI-generated code
- Analysis of real project failure cases
- Why "I'll write tests later" fails

### Part 3: The Core of TDD — Tests Drive Design

- Understanding the Red-Green-Refactor cycle
- What changes when you write tests first
- The habit of thinking in small units
- Communicating requirements to AI through test cases

### Part 4: Minimum Testing Strategy

- You don't need to test everything
- Testing the Happy Path and boundary conditions
- Basic pytest usage
- Test coverage: Don't obsess over numbers

### Part 5: Accelerating Development with AI + Testing

- Generating test code with AI
- Requesting code from AI with test passage as the goal
- The confidence tests provide during refactoring
- Practice: Experience the TDD cycle with AI

## Course Format

- **Online/Offline**: Zoom or in-person sessions
- **Hands-on focused**: Failure case analysis + writing tests yourself

## Target Audience

- Undergraduates who can write code but have never done testing
- Developers starting team projects
- New lab members beginning to work with code
- Those using AI coding tools but feeling uneasy

## Prerequisites

- Basic Python syntax (variables, functions, conditionals, loops)
- Experience writing simple programs

### Key Practice Examples

- Analyzing AI-generated code with hidden bugs
- Writing your first test with pytest
- Experiencing the cycle: failing test → passing code
- Practice test-driven development with AI

## Core Concepts Summary

| Concept       | Traditional View          | AI Era View                              |
| ------------- | ------------------------- | ---------------------------------------- |
| Test Purpose  | Bug detection             | Code validation + design tool            |
| When to Write | After writing code        | Before/during writing code               |
| Target        | Code I wrote              | Code I wrote + AI-generated code         |
| Role          | Quality assurance         | Safety net + AI communication tool       |

## Next Steps After This Course

After completing this course, you can continue with the [**GitFlow + AI Collaboration Practice** course]({{< relref "courses/fundamentals/gitflow_collab" >}}), where you'll learn how to transition from individual development to team development.

## Contact

For inquiries about course schedules and pricing, please reach out via email.

