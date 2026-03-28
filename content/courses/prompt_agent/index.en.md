---
title: "Prompt Engineering & AI Agent Design"
date: 2026-03-28
lastmod: 2026-03-28
version: 1
categories: ["ai-learning"]
tags: ["Prompt Engineering", "AI Agent", "LLM", "Open Source", "Ollama", "LiteLLM", "LangGraph", "Tool Use", "Multi-Agent"]
description: "From controlling LLMs to building systems with LLMs"
summary: "Learn the principles and core techniques of prompt engineering, along with AI agent architecture and design principles through live coding demos using open-source tools."
level: 2
hours: "2:00"
type: "special-lecture"
demo_device: "MacBook Pro M1 Pro 32GB RAM 2TB + RTX 3090 Remote Server"
---

## Course Overview

A special lecture that systematically covers the difference between "using LLMs well" and "just using LLMs."

The first half is prompt engineering — approaching it as interface design for controlling LLM behavior.  
The second half is AI agents — progressively building from while-loop agents to LangGraph and multi-agent collaboration.

All demos run on open-source tools (Ollama, LiteLLM, LangGraph).
Everything is reproducible without commercial services, and all code is shared via GitHub.

<!-- markdownlint-disable MD034 -->
{{< bookmark
    url="https://github.com/CodeCompose7/prompt_agent"
    title="prompt_agent"
    desc="Demo code for Prompt Engineering & AI Agent Design" >}}
<!-- markdownlint-enable MD034 -->

## What is Prompt Engineering?

**Prompt Engineering** is the discipline of designing and optimizing inputs to make LLMs produce desired outputs.

It's not just "asking better questions."
It's closer to programming LLM behavior by combining techniques like role assignment, example provision, reasoning guidance, and output format control.
In an era where natural language becomes the interface, it is a new software design skill.

## What is an AI Agent?

An **AI Agent** is an autonomous system that uses an LLM as its brain — reasoning, using tools, and acting to achieve goals on its own.

Typical LLM usage ends in a single turn: question in, answer out.  
Agents are different. They analyze goals, make plans, execute tools, evaluate results, and retry when needed.  
The LLM directly selects and uses external tools like web search, code execution, file manipulation, and API calls.

Prompt engineering is the means of programming this agent's brain.

## Learning Objectives

- Understand how LLMs process prompts, and develop a mindset for designing prompts based on that understanding
- Build the ability to select and combine core prompt engineering techniques for different situations
- Understand the 4 components of AI agents (LLM, Tool, Memory, Orchestration)
- Experience the complexity spectrum from while loops → LangGraph → multi-agent systems

## Target Audience

- Anyone with experience using LLMs
- Those who have used ChatGPT but haven't learned systematic techniques
- Those interested in AI agent concepts and architecture
- Those considering AI-related development or research

## Prerequisites

- Basic experience using LLM services like ChatGPT or Claude
- Understanding of basic Python syntax (to follow the agent demo code)
- No programming experience required, though it may affect comprehension of later code demos

## Demo Environment

| Item                          | Setup                                                        |
| ----------------------------- | ------------------------------------------------------------ |
| Hardware                      | MacBook Pro (local) + RTX 3090 server (remote, large models) |
| Local LLM                     | Ollama                                                       |
| Prompt demo model (Part 1–2)  | `llama3.1:8b` — lightweight and fast                         |
| Agent demo model (Part 3)     | `qwen3-coder:30b` — coding-focused, capable of HTML games    |
| LangGraph demo model (Part 4) | `qwen3.5:9b` — stable tool calling                           |
| LLM integration interface     | LiteLLM (Part 1–3), ChatOllama (Part 4)                      |
| Agent framework               | LangGraph (Part 4)                                           |
| Code execution                | Python 3.11+, Jupyter Notebook                               |
| Code sharing                  | GitHub repository                                            |

LLM calls use LiteLLM (Part 1–3) and LangChain/ChatOllama (Part 4).  
LiteLLM is an open-source library that switches between Ollama → OpenAI → Claude by changing a single `model` parameter.

## Open Source

Key open-source tools used in this lecture.

| Tool        | Purpose                       | Link                                        |
| ----------- | ----------------------------- | ------------------------------------------- |
| Ollama      | Local LLM execution           | <https://ollama.com>                        |
| LiteLLM     | 100+ LLM unified interface    | <https://github.com/BerriAI/litellm>        |
| LangGraph   | Agent workflow framework      | <https://github.com/langchain-ai/langgraph> |
| LangChain   | LLM application framework     | <https://github.com/langchain-ai/langchain> |
| python-pptx | Python PPT generation library | <https://github.com/scanny/python-pptx>     |
| matplotlib  | Data visualization library    | <https://github.com/matplotlib/matplotlib>  |
| pandas      | Data analysis library         | <https://github.com/pandas-dev/pandas>      |

## Lecture Structure

### Introduction — "Using LLMs" vs "Controlling LLMs"

- Present definitions of prompt engineering and AI agents
- Live demo comparing the same task with bad vs good prompts
- Naturally demonstrate that the demo model is a local open-source model
- Show provider switching by changing the `model` parameter via LiteLLM

**Prompt Basics Demo** (01_prompt_basics.ipynb)

- Bad prompt: `"Recommend something to watch on Netflix"` → vague results
- Good prompt: Role (film critic) + conditions (SF/thriller, IMDb 7.5+) + format (JSON) + constraint (JSON only) → structured results
- Provider switch: `model="ollama/llama3.1:8b"` → `model="openai/gpt-4o"` — one line change

### Part 1 — Prompt Engineering: Principles & Core Techniques

#### 1-1. How LLMs Process Prompts

- Tokenization: why the same words can have different token counts
- Context window: physical limits on prompt length
- Temperature / Top-p: probabilistic nature of output
- How the "next token prediction" mechanism shapes prompt design

**Demo:** Compare fantasy RPG character name generation at temp=0.0/0.5/1.0/1.5.  
At temp=0, three runs produce the same result; at temp=1.5, every run is different.

#### 1-2. Core Techniques (with Before/After Demos)

Each technique follows the flow: "why it's needed → before → after."

| Technique                        | Demo Scenario                                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| System Prompt / Role Assignment  | "Tell me about Harry Potter" → completely different analysis from film critic / literature professor / business analyst |
| Few-shot Prompting               | App store review sentiment analysis: 0 examples (zero-shot) vs 3 examples (few-shot) format/accuracy difference         |
| Chain-of-Thought (CoT)           | Logic puzzle (A/B/C truth/liar problem): direct answer vs step-by-step reasoning                                        |
| Structured Output                | Seoul restaurant recommendations: free text vs JSON schema → `json.loads()` parse success                               |
| Constraints / Negative Prompting | Web scraping code: verbose explanation vs "code only, under 10 lines, Korean comments"                                  |

### Part 2 — Prompt Design Patterns & Practical Application

#### 2-1. Role-Based Prompt Design

A demo analyzing the same code from 3 different roles.

```python
# Target: dangerous code that returns passwords directly from an API
def get_user_data(user_id):
    response = requests.get(f"https://api.example.com/users/{user_id}")
    data = response.json()
    password = data['password']
    return {'name': data['name'], 'email': data['email'], 'pw': password}
```

- Security expert: password exposure vulnerability analysis
- Performance engineer: bottleneck analysis at 10,000 calls/second
- Coding mentor: analogy-based explanation for beginners

#### 2-2. Prompt Iterative Improvement (Iteration)

A live demo iterating a YouTube channel analyzer prompt 4 times.

{{< mermaid >}}
flowchart LR
    v1["v1\nVague"] --> v2["v2\nJSON format added"]
    v2 --> v3["v3\nRole + analysis criteria"]
    v3 --> v4["v4\nEdge cases + CoT"]
{{< /mermaid >}}

Shows in real-time how v1's prose output transforms into v4's structured JSON with measurable action items.

### Part 3 — AI Agents: When a Single Prompt Isn't Enough

#### 3-1. Limits of a Single Prompt

When you ask an LLM to "make a snake game," it produces code — but can't verify execution or fix errors. This limitation is demonstrated live.

#### 3-2. Four Components of an Agent

- **LLM** (brain): reasoning and generation
- **Tool** (hands and feet): code execution, file manipulation, external API calls
- **Memory** (memory): retaining previous results and context
- **Orchestration** (judgment and loop): deciding next actions, controlling iteration

#### 3-3. Code Generation + Execution Agent — Live Demo

A while-loop agent built with pure Python + LiteLLM. Uses the coding-focused model (`qwen3-coder:30b`) to improve success rates.

**3 Demo Scenarios** (03_code_agent.ipynb):

| Demo               | Task                                                       | Key Point                                       |
| ------------------ | ---------------------------------------------------------- | ----------------------------------------------- |
| Snake Game         | Generate a playable HTML+JS Snake Game in the browser      | Visual impact, HTML workaround for headless env |
| Data Analysis      | Analyze student grades with pandas+tabulate                | Practical tool use, structured results          |
| Data Visualization | Generate a donut chart of language popularity (matplotlib) | File generation, verify in Jupyter              |

**Snake Game Demo Notes:**

- pygame/tkinter can't run in headless environments → generate HTML+JS instead
- The generated `/tmp/snake_game.html` can be played directly in Jupyter
- `llama3.1:8b` struggles with HTML generation; `qwen3-coder:30b` or above is needed

**System Prompt Core Rules:** No GUI libraries, generate games in HTML+JS, use list+join pattern for file writing (avoiding triple-quote escaping issues)

### Part 4 — Agent Design Principles & LangGraph

#### 4-1. Complexity Spectrum

{{< mermaid >}}
flowchart LR
    A["Single Prompt\n(simplest)"] --> B["Prompt Chaining"]
    B --> C["Router"]
    C --> D["ReAct"]
    D --> E["Full Agent"]
    E --> F["Multi-Agent\n(most complex)"]
{{< /mermaid >}}

The core principle is to always start with the simplest structure.

#### 4-2. Reimplementing the Agent with LangGraph

Reimplements the Part 3 while loop as a LangGraph graph to show the correspondence.

| while loop (Part 3)       | LangGraph (Part 4)      |
| ------------------------- | ----------------------- |
| `messages = [...]`        | State (state object)    |
| `response = completion()` | generate node           |
| `if tool_calls:`          | conditional edge        |
| `execute_tool()`          | ToolNode (auto-routing) |
| `else: break`             | END edge                |

Adds a `read_file` tool (not in Part 3) so the LLM can directly read and verify generated files.

**Demo (04_langgraph_intro.ipynb):**

- LangGraph graph visualization (Mermaid PNG)
- Auto-generate a startup dashboard: raw data → pandas analysis → CSV save → read_file verification → matplotlib 2x2 dashboard image

#### 4-3. Multi-Agent — Planner + Coder + Reviewer Collaboration

A system with 5 collaborating agents, implemented in LangGraph.

{{< mermaid >}}
flowchart LR
    A["Planner\n(planner)"] --> B["Coder\n(coder)"]
    B --> C["Reviewer\n(reviewer)"]
    C -->|"2 rounds"| B
    C --> D["PPT Generation\n(make_ppt)"]
{{< /mermaid >}}

**Demo:** Analyzes AI model benchmark data (GPT-4o, Claude 3.5 Sonnet, Gemini, etc.) and auto-generates an 8-slide PPT report.

- Planner: analyzes requirements and decomposes tasks
- Coder: writes and executes code (chart generation, data analysis)
- Reviewer: reviews code and results, suggests improvements
- After 2 rounds of iterative improvement, generates the final PPT (python-pptx)

**Part 3 vs Part 4 Comparison:**

|            | 03: while loop | 04: Single Agent       | 04: Multi-Agent      |
| ---------- | -------------- | ---------------------- | -------------------- |
| Agents     | 1              | 1                      | 5                    |
| Execution  | Sequential     | Sequential (auto-tool) | Parallel + iterative |
| Refinement | On error only  | On error only          | Review every round   |
| Output     | Code output    | File generation        | PPT report           |

### Part 5 — Why This Matters + Learning Roadmap

#### Prompt Engineering is a New Programming Interface

- A paradigm where natural language becomes the programming language
- The ability to "control LLMs" becomes as important as the ability to "write code"
- The essence of agents is the loop: while → graph → multi-agent — only the complexity differs

#### What You Can Do Starting Now

| Step | Activity                               | Tool                      |
| ---- | -------------------------------------- | ------------------------- |
| 1    | Run a local model with Ollama          | `ollama pull llama3.1:8b` |
| 2    | Clone and run the lecture GitHub code  | Jupyter Notebook          |
| 3    | Compare multiple models with LiteLLM   | `pip install litellm`     |
| 4    | Create your own prompt patterns        | Modify 01/02 notebooks    |
| 5    | Build a simple agent loop from scratch | Modify 03 notebook        |
| 6    | Build a LangGraph agent                | Modify 04 notebook        |

#### Recommended Resources

- **CrewAI:** <https://github.com/crewAIInc/crewAI> — multi-agent framework
- **Anthropic Prompt Engineering Guide:** <https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering>
- **MCP (Model Context Protocol):** <https://modelcontextprotocol.io> — standard protocol for tool connectivity

## Model Selection Guide

| Part                | Recommended Model | Reason                                                             |
| ------------------- | ----------------- | ------------------------------------------------------------------ |
| Part 1–2 (Prompts)  | `llama3.1:8b`     | Lightweight and fast, sufficient for prompt technique demos        |
| Part 3 (Code Agent) | `qwen3-coder:30b` | Coding-focused, high HTML game generation success rate (RTX 3090+) |
| Part 4 (LangGraph)  | `qwen3.5:9b`      | Stable tool calling, good LangGraph compatibility                  |

8B models can run basic agent loops, but HTML game generation and complex multi-agent tasks require larger models. An RTX 3090 remote server enables comfortable use of 30B-class models.

## Lecture Format

- **Format:** In-person lecture (2 hours)
- **Live coding demos:** Running real code in Jupyter Notebook and showing results
- **Code sharing:** All demo code published in a GitHub repository, URL shared with students before the lecture
- **Provider switch demo:** Switching from local → commercial API by changing LiteLLM's `model` parameter
- **No student hands-on:** Observation and understanding focused; students can self-practice with GitHub code after the lecture
- **Q&A:** Free questions during the lecture, dedicated Q&A time at the end

## Demo Preparation Checklist

- [ ] Create GitHub repository and push demo code
- [ ] Install Ollama on host or remote server and download models
  - `ollama pull llama3.1:8b` (Part 1–2)
  - `ollama pull qwen3-coder:30b` (Part 3, RTX 3090 server)
  - `ollama pull qwen3.5:9b` (Part 4)
- [ ] Test remote server connection (port forwarding / address verification)
- [ ] Pre-test full cycle of each notebook (both success and failure cases)
- [ ] Snake game HTML demo: verify playability in browser
- [ ] Part 4 multi-agent: verify PPT file generation
- [ ] Download Korean font (NanumGothic) and configure matplotlib
- [ ] (Optional) Prepare commercial API keys — for provider switch demo
- [ ] Verify font size / screen sharing settings
- [ ] Share GitHub repo URL with students in advance

## Key Messages Summary

| Part   | Key Message                                                                |
| ------ | -------------------------------------------------------------------------- |
| Intro  | Prompt quality is result quality                                           |
| Part 1 | Understanding LLM mechanics changes how you design prompts                 |
| Part 2 | Design prompts like code — iterate, version, and improve                   |
| Part 3 | An agent is an autonomous loop where the LLM writes, runs, and debugs code |
| Part 4 | while loop → LangGraph → multi-agent: same essence, different complexity   |
| Part 5 | The ability to control LLMs is a defining skill of this era                |

## Contact

For lecture scheduling and pricing inquiries, please reach out via email.
