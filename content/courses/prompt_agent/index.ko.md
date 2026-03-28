---
title: "프롬프트 엔지니어링과 AI 에이전트 설계"
date: 2026-03-28
lastmod: 2026-03-28
version: 1
categories: ["ai-learning"]
tags: ["프롬프트 엔지니어링", "AI 에이전트", "LLM", "오픈소스", "Ollama", "LiteLLM", "LangGraph", "Tool Use", "멀티 에이전트"]
description: "LLM을 제어하는 기술에서 LLM으로 시스템을 만드는 기술까지"
summary: "프롬프트 엔지니어링의 원리와 핵심 테크닉을 이해하고, AI 에이전트의 구조와 설계 원칙을 오픈소스 도구 기반 라이브 코딩 데모와 함께 학습합니다."
feature: "prompt_agent_main*"
featureAlt: "프롬프트 엔지니어링 강의 대표 이미지"
coverCaption: "프롬프트 엔지니어링과 AI 에이전트 설계"
level: 2
hours: "2:00"
type: "special-lecture"
demo_device: "MacBook Pro M1 Pro 32GB RAM 2TB + RTX 3090 원격 서버"
---

## 강의 개요

LLM을 "잘 쓰는 것"과 "그냥 쓰는 것"의 차이를 체계적으로 다루는 특강입니다.

전반부는 프롬프트 엔지니어링입니다. LLM의 행동을 제어하는 인터페이스 설계로 접근합니다.  
후반부는 AI 에이전트입니다. while 루프 기반 에이전트부터 LangGraph, 멀티 에이전트 협업까지 단계적으로 구현합니다.

모든 데모는 오픈소스 도구(Ollama, LiteLLM, LangGraph)로 진행합니다.  
상용 서비스 없이 재현 가능하며, 코드는 GitHub으로 공유합니다.

<!-- markdownlint-disable MD034 -->
{{< bookmark
    url="https://github.com/CodeCompose7/prompt_agent"
    title="prompt_agent"
    desc="프롬프트 엔지니어링과 AI 에이전트 설계 시연 코드" >}}
<!-- markdownlint-enable MD034 -->

## 프롬프트 엔지니어링이란

**프롬프트 엔지니어링(Prompt Engineering)** 은 LLM이 원하는 결과를 생성하도록 입력을 설계하고 최적화하는 기술입니다.

단순히 "질문을 잘 하는 법"이 아닙니다.  
역할 지정, 예시 제공, 추론 유도, 출력 형식 제어 등의 테크닉을 조합하여 LLM의 행동을 프로그래밍하는 것에 가깝습니다.  
자연어가 곧 인터페이스가 되는 시대의, 새로운 소프트웨어 설계 역량입니다.

## AI 에이전트란

**AI 에이전트(AI Agent)** 는 LLM을 두뇌로 삼아, 스스로 판단하고 도구를 사용하며 목표를 달성하는 자율적 시스템입니다.

일반적인 LLM 사용은 "질문 → 답변"의 단일 턴으로 끝납니다.  
에이전트는 다릅니다. 목표를 분석하고, 계획을 세우고, 도구를 실행하고, 결과를 평가하고, 필요하면 재시도합니다.  
웹 검색, 코드 실행, 파일 조작, API 호출 같은 외부 도구를 LLM이 직접 선택하고 사용합니다.

프롬프트 엔지니어링은 이 에이전트의 두뇌를 프로그래밍하는 수단입니다.

## 학습 목표

- LLM의 프롬프트 처리 원리를 이해하고, 이를 바탕으로 프롬프트를 설계하는 사고방식 습득
- 핵심 프롬프트 엔지니어링 테크닉을 상황에 맞게 선택·조합하는 능력 배양
- AI 에이전트의 4가지 구성요소(LLM, Tool, Memory, Orchestration) 이해
- while 루프 → LangGraph → 멀티 에이전트까지 복잡도가 올라가는 스펙트럼 체험

## 수강 대상

- LLM을 사용해 본 경험이 있는 이들
- ChatGPT 등을 써봤지만 체계적인 활용법을 배우지 않은 이들
- AI 에이전트의 개념과 구조에 관심이 있는 이들
- AI 관련 개발/연구를 고려하는 이들

## 선수 지식

- ChatGPT, Claude 등 LLM 서비스 기본 사용 경험
- Python 기초 문법 이해 (에이전트 파트의 코드 데모를 읽기 위함)
- 프로그래밍 경험이 없어도 수강 가능하나, 후반부 코드 데모의 이해도가 달라질 수 있음

## 데모 환경

| 항목                          | 구성                                                   |
| ----------------------------- | ------------------------------------------------------ |
| 기기                          | MacBook Pro (로컬) + RTX 3090 서버 (원격, 대형 모델용) |
| 로컬 LLM                      | Ollama                                                 |
| 프롬프트 데모 모델 (Part 1~2) | `llama3.1:8b` — 가볍고 빠름                            |
| 에이전트 데모 모델 (Part 3)   | `qwen3-coder:30b` — 코딩 특화, HTML 게임 생성 가능     |
| LangGraph 데모 모델 (Part 4)  | `qwen3.5:9b` — tool calling 안정적                     |
| LLM 통합 인터페이스           | LiteLLM (Part 1~3), ChatOllama (Part 4)                |
| 에이전트 프레임워크           | LangGraph (Part 4)                                     |
| 코드 실행                     | Python 3.11+, Jupyter Notebook                         |
| 코드 공유                     | GitHub 레포지토리                                      |

LLM 호출에는 LiteLLM(Part 1~3)과 LangChain/ChatOllama(Part 4)를 사용합니다.
LiteLLM은 `model` 파라미터 하나만 변경하면 Ollama → OpenAI → Claude 등으로 전환할 수 있는 오픈소스 라이브러리입니다.

## 오픈소스

이 강의에서 사용하는 주요 오픈소스 도구입니다.

| 도구        | 용도                           | 링크                                        |
| ----------- | ------------------------------ | ------------------------------------------- |
| Ollama      | 로컬 LLM 실행                  | <https://ollama.com>                        |
| LiteLLM     | 100+ LLM 통합 인터페이스       | <https://github.com/BerriAI/litellm>        |
| LangGraph   | 에이전트 워크플로우 프레임워크 | <https://github.com/langchain-ai/langgraph> |
| LangChain   | LLM 애플리케이션 프레임워크    | <https://github.com/langchain-ai/langchain> |
| python-pptx | Python PPT 생성 라이브러리     | <https://github.com/scanny/python-pptx>     |
| matplotlib  | 데이터 시각화 라이브러리       | <https://github.com/matplotlib/matplotlib>  |
| pandas      | 데이터 분석 라이브러리         | <https://github.com/pandas-dev/pandas>      |

## 강의 구성

### 도입 — "LLM을 쓴다" vs "LLM을 제어한다"

- 프롬프트 엔지니어링과 AI 에이전트의 정의 제시
- 같은 과제를 나쁜 프롬프트 / 좋은 프롬프트로 비교하는 라이브 데모
- 데모 모델이 로컬 오픈소스 모델임을 자연스럽게 인식시킴
- LiteLLM으로 `model` 파라미터만 바꿔 provider를 전환하는 시연

**프롬프트 기본 데모** (01_prompt_basics.ipynb)

- 나쁜 프롬프트 : `"넷플릭스에서 뭐 볼지 추천해줘"` → 모호한 결과
- 좋은 프롬프트 : 역할(영화 평론가) + 조건(SF/스릴러, IMDb 7.5+) + 형식(JSON) + 제약(JSON만 출력) → 구조화된 결과
- Provider 전환 : `model="ollama/llama3.1:8b"` → `model="openai/gpt-4o"` 한 줄 변경

### Part 1 — 프롬프트 엔지니어링: 원리와 핵심 테크닉

#### 1-1. LLM은 프롬프트를 어떻게 처리하는가

- 토큰화(Tokenization): 같은 말도 토큰 수가 다른 이유
- 컨텍스트 윈도우: 프롬프트 길이의 물리적 한계
- Temperature / Top-p: 출력의 확률적 특성
- "다음 토큰 예측"이라는 근본 메커니즘이 프롬프트 설계에 주는 시사점

**데모:** 판타지 RPG 캐릭터 이름 생성을 temp=0.0/0.5/1.0/1.5로 비교합니다.  
temp=0에서는 3번 실행해도 같은 결과, temp=1.5에서는 매번 다른 결과가 나옵니다.

#### 1-2. 핵심 테크닉 (Before/After 데모 포함)

각 테크닉을 "왜 필요한가 → 적용 전 → 적용 후" 흐름으로 진행합니다.

| 테크닉                        | 데모 시나리오                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| System Prompt / 역할 지정     | "해리포터에 대해 알려줘" → 영화 평론가 / 문학 교수 / 비즈니스 분석가 3가지 역할로 완전히 다른 분석 |
| Few-shot Prompting            | 앱 스토어 리뷰 감성 분석: 예시 0개(Zero-shot) vs 3개(Few-shot)의 형식/정확도 차이                  |
| Chain-of-Thought (CoT)        | 논리 퍼즐(A/B/C 진실/거짓말 문제): 바로 답 vs 단계별 추론 유도                                     |
| 구조화된 출력 요청            | 서울 맛집 추천: 자유 텍스트 vs JSON 스키마 지정 → `json.loads()` 파싱 성공 확인                    |
| 제약 조건 / 네거티브 프롬프팅 | 웹 스크래핑 코드: 장황한 설명 vs "코드만, 10줄 이내, 주석 한국어" 제약                             |

### Part 2 — 프롬프트 설계 패턴과 실전 적용

#### 2-1. 역할 기반 프롬프트 설계

같은 코드를 3가지 역할에게 분석시키는 데모입니다.

```python
# 분석 대상: API에서 패스워드를 그대로 반환하는 위험한 코드
def get_user_data(user_id):
    response = requests.get(f"https://api.example.com/users/{user_id}")
    data = response.json()
    password = data['password']
    return {'name': data['name'], 'email': data['email'], 'pw': password}
```

- 보안 전문가: 비밀번호 노출 취약점 분석
- 성능 엔지니어: 초당 10,000 호출 시 병목 분석
- 코딩 멘토: 초보자를 위한 비유 중심 설명

#### 2-2. 프롬프트 반복 개선 (Iteration)

유튜브 채널 분석기 프롬프트를 4번 반복 개선하는 라이브 시연입니다.

{{< mermaid >}}
flowchart LR
    v1["v1\n모호"] --> v2["v2\nJSON 형식 추가"]
    v2 --> v3["v3\n역할 + 분석 기준"]
    v3 --> v4["v4\n에지 케이스 + CoT"]
{{< /mermaid >}}

v1의 산문 형태 결과가 v4에서 측정 가능한 액션 아이템을 포함한 구조화된 JSON으로 바뀌는 과정을 실시간으로 보여줍니다.

### Part 3 — AI 에이전트: 프롬프트 하나로는 부족할 때

#### 3-1. 단일 프롬프트의 한계

LLM에게 "뱀 게임 만들어줘"라고 하면 코드는 나오지만, 실행 확인이나 에러 수정은 못합니다. 이 한계를 시연합니다.

#### 3-2. 에이전트의 4가지 구성요소

- **LLM** (두뇌): 판단과 생성
- **Tool** (손과 발): 코드 실행, 파일 조작, 외부 API 호출
- **Memory** (기억): 이전 결과와 컨텍스트 유지
- **Orchestration** (판단과 루프): 다음 행동 결정, 반복 제어

#### 3-3. 코드 생성 + 실행 에이전트 — 라이브 데모

순수 Python + LiteLLM으로 while 루프 기반 에이전트를 구현합니다. 코딩 특화 모델(`qwen3-coder:30b`)을 사용하여 성공률을 높입니다.

**데모 시나리오 3가지** (03_code_agent.ipynb):

| 데모          | 과제                                                 | 핵심 포인트                                  |
| ------------- | ---------------------------------------------------- | -------------------------------------------- |
| 뱀 게임       | HTML+JS로 브라우저에서 플레이 가능한 Snake Game 생성 | 시각적 임팩트, GUI 없는 환경에서 HTML로 우회 |
| 데이터 분석   | 학생 성적 데이터를 pandas+tabulate로 분석·표 출력    | 실용적 도구 활용, 구조화된 결과              |
| 데이터 시각화 | 프로그래밍 언어 인기도 도넛 차트 생성 (matplotlib)   | 파일 생성 후 Jupyter에서 확인                |

**뱀 게임 데모 특이사항:**

- pygame/tkinter는 디스플레이 없는 환경에서 사용 불가 → HTML+JS로 우회
- 생성된 `/tmp/snake_game.html`을 Jupyter에서 열어 실제 플레이 가능
- `llama3.1:8b`로는 HTML 생성이 어렵고, `qwen3-coder:30b` 이상이 필요

**시스템 프롬프트 핵심 규칙:** GUI 라이브러리 사용 금지, HTML+JS로 게임 생성, 리스트+join 패턴으로 파일 작성 (삼중 따옴표 이스케이프 문제 회피)

### Part 4 — 에이전트 설계 원칙과 LangGraph

#### 4-1. 복잡도 스펙트럼

{{< mermaid >}}
flowchart LR
    A["단일 프롬프트\n(가장 단순)"] --> B["프롬프트 체이닝"]
    B --> C["라우터"]
    C --> D["ReAct"]
    D --> E["풀 에이전트"]
    E --> F["멀티 에이전트\n(가장 복잡)"]
{{< /mermaid >}}

핵심 원칙은 항상 가장 단순한 구조에서 시작하는 것입니다.

#### 4-2. LangGraph로 에이전트 재구현

Part 3의 while 루프를 LangGraph 그래프로 재구현하여 대응 관계를 보여줍니다.

| while 루프 (Part 3)       | LangGraph (Part 4)     |
| ------------------------- | ---------------------- |
| `messages = [...]`        | State (상태 객체)      |
| `response = completion()` | generate 노드          |
| `if tool_calls:`          | conditional edge       |
| `execute_tool()`          | ToolNode (자동 라우팅) |
| `else: break`             | END edge               |

Part 3에 없었던 `read_file` 도구를 추가하여, LLM이 생성된 파일을 직접 읽고 검증하는 흐름을 보여줍니다.

**데모 (04_langgraph_intro.ipynb):**

- LangGraph 그래프 시각화 (Mermaid PNG)
- 스타트업 경영 대시보드 자동 생성: 원시 데이터 → pandas 분석 → CSV 저장 → read_file 검증 → matplotlib 2x2 한글 대시보드 이미지 생성

#### 4-3. 멀티 에이전트 — 기획자 + 코더 + 리뷰어 협업

5개 에이전트가 협업하는 시스템을 LangGraph로 구현합니다.

{{< mermaid >}}
flowchart LR
    A["기획자\n(planner)"] --> B["코더\n(coder)"]
    B --> C["리뷰어\n(reviewer)"]
    C -->|"반복 2라운드"| B
    C --> D["PPT 생성\n(make_ppt)"]
{{< /mermaid >}}

**데모:** AI 모델 벤치마크 데이터(GPT-4o, Claude 3.5 Sonnet, Gemini 등)를 분석하여 8장짜리 PPT 보고서를 자동 생성합니다.

- 기획자: 요구사항 분석 및 태스크 분해
- 코더: 코드 작성·실행 (차트 생성, 데이터 분석)
- 리뷰어: 코드와 결과를 검토하고 개선점 제시
- 2라운드 반복 개선 후 최종 PPT 생성 (python-pptx)

**03 vs 04 비교:**

|           | 03: while 루프 | 04: 단일 에이전트 | 04: 멀티 에이전트   |
| --------- | -------------- | ----------------- | ------------------- |
| 에이전트  | 1개            | 1개               | 5개                 |
| 실행 방식 | 순차           | 순차 (도구 자동)  | 병렬 + 반복         |
| 반복 개선 | 에러 시만      | 에러 시만         | 매 라운드 리뷰 반영 |
| 결과물    | 코드 출력      | 파일 생성         | PPT 보고서          |

### Part 5 — 이 기술이 왜 중요한가 + 학습 로드맵

#### 프롬프트 엔지니어링은 새로운 프로그래밍 인터페이스다

- 자연어가 곧 프로그래밍 언어가 되는 패러다임
- "코드를 짜는 능력"만큼 "LLM을 제어하는 능력"이 중요해지는 시대
- 에이전트의 본질은 루프: while → 그래프 → 멀티 에이전트로 복잡도만 다를 뿐

#### 지금부터 할 수 있는 것들

| 단계  | 활동                                 | 도구                      |
| ----- | ------------------------------------ | ------------------------- |
| 1단계 | Ollama로 로컬 모델 띄워보기          | `ollama pull llama3.1:8b` |
| 2단계 | 강의 GitHub 코드 clone해서 돌려보기  | Jupyter Notebook          |
| 3단계 | LiteLLM으로 여러 모델 비교해보기     | `pip install litellm`     |
| 4단계 | 자기만의 프롬프트 패턴 만들어보기    | 01/02 노트북 변형         |
| 5단계 | 간단한 에이전트 루프 직접 구현해보기 | 03 노트북 변형            |
| 6단계 | LangGraph 에이전트 만들어보기        | 04 노트북 변형            |

#### 추천 리소스

- **CrewAI:** <https://github.com/crewAIInc/crewAI> — 멀티 에이전트 프레임워크
- **Anthropic Prompt Engineering Guide:** <https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering>
- **MCP (Model Context Protocol):** <https://modelcontextprotocol.io> — 도구 연결 표준 프로토콜

## 모델 선택 가이드

| 파트                   | 권장 모델         | 이유                                                  |
| ---------------------- | ----------------- | ----------------------------------------------------- |
| Part 1~2 (프롬프트)    | `llama3.1:8b`     | 가볍고 빠름, 프롬프트 테크닉 시연에 충분              |
| Part 3 (코드 에이전트) | `qwen3-coder:30b` | 코딩 특화, HTML 게임 생성 성공률 높음 (RTX 3090 이상) |
| Part 4 (LangGraph)     | `qwen3.5:9b`      | tool calling 안정적, LangGraph 호환 좋음              |

8B 모델로도 기본적인 에이전트 루프는 동작하지만, HTML 게임 생성이나 복잡한 멀티 에이전트 작업에는 더 큰 모델이 필요합니다. RTX 3090 원격 서버를 활용하면 30B급 모델도 쾌적하게 사용할 수 있습니다.

## 강의 방식

- **형태:** 오프라인 대면 강의 (2시간)
- **라이브 코딩 데모:** Jupyter Notebook에서 실제 코드를 실행하며 결과를 보여줌
- **코드 공유:** 모든 데모 코드를 GitHub 레포지토리에 공개하고, 강의 전 학생들에게 URL 공유
- **Provider 전환 시연:** LiteLLM의 `model` 파라미터를 바꿔서 로컬 → 상용 API 전환
- **학생 실습 없음:** 관찰 및 이해 중심으로, 강의 후 GitHub 코드로 스스로 실습 가능
- **질의응답:** 강의 중 자유 질문 허용, 마지막 10분 별도 Q&A 시간

## 데모 사전 준비 체크리스트

- [ ] GitHub 레포지토리 생성 및 데모 코드 push
- [ ] 호스트 또는 원격 서버에 Ollama 설치 및 모델 다운로드
  - `ollama pull llama3.1:8b` (Part 1~2)
  - `ollama pull qwen3-coder:30b` (Part 3, RTX 3090 서버)
  - `ollama pull qwen3.5:9b` (Part 4)
- [ ] 원격 서버 연결 테스트 (포트포워딩/주소 확인)
- [ ] 각 노트북 전체 사이클 사전 테스트 (성공/실패 케이스 모두)
- [ ] 뱀 게임 HTML 생성 데모: 브라우저에서 실제 플레이 가능한지 확인
- [ ] 04 멀티 에이전트: PPT 파일 생성 확인
- [ ] 한글 폰트(NanumGothic) 다운로드 및 matplotlib 설정 확인
- [ ] (선택) 상용 API 키 준비 — provider 전환 데모용
- [ ] 폰트 크기 / 화면 공유 설정 확인
- [ ] 학생에게 GitHub 레포 URL 사전 공유

## 핵심 메시지 요약

| 파트   | 핵심 메시지                                                             |
| ------ | ----------------------------------------------------------------------- |
| 도입   | 프롬프트의 품질이 곧 결과의 품질이다                                    |
| Part 1 | LLM의 동작 원리를 알면 프롬프트 설계가 달라진다                         |
| Part 2 | 프롬프트도 코드처럼 설계하고, 반복 개선하고, 버전 관리한다              |
| Part 3 | 에이전트는 LLM이 코드를 짜고, 실행하고, 스스로 디버깅하는 자율적 루프다 |
| Part 4 | while 루프 → LangGraph → 멀티 에이전트: 본질은 같고 복잡도만 다르다     |
| Part 5 | LLM을 제어하는 능력은 이 시대의 새로운 핵심 역량이다                    |

## 문의

강의 일정 및 비용 문의는 이메일로 연락 주세요.
