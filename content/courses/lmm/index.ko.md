---
title: "LMM - 대규모 멀티모달 모델의 이해와 적용"
date: 2026-03-30
lastmod: 2026-03-30
version: 1
categories: ["ai-learning"]
tags: ["LMM", "멀티모달", "LLM", "Transformer", "CLIP", "SigLIP", "BLIP-2", "Stable Diffusion", "비전 언어 모델", "Qwen2.5-VL"]
description: "대규모 멀티모달 모델(LMM)의 원리부터 최신 트렌드까지, 텍스트를 넘어 이미지·오디오·비디오를 통합하는 AI를 살펴봅니다"
summary: "LLM에서 LMM으로의 진화를 이해하고, Transformer 기반 멀티모달 아키텍처(CLIP, BLIP-2, Stable Diffusion)의 원리를 학습한 뒤, Native Multimodal·MoE·Autoregressive 이미지 생성 등 최신 트렌드를 살펴봅니다. RTX 3090에서 Qwen2.5-VL을 활용한 비디오 Grounding 시연을 포함합니다."
feature: "lmm*"
featureAlt: "LMM 강의 대표 이미지"
coverCaption: "LMM"
level: 2
hours: "1:30"
type: "special-lecture"
demo_device: "MacBook Pro M1 Pro 32GB RAM 2TB + RTX 3090 원격 서버"
---

## 강의 개요

텍스트만 처리하던 LLM에서 이미지·오디오·비디오까지 통합하는 LMM으로의 전환을 다루는 특강입니다.

{{< mermaid >}}
flowchart LR
    subgraph LLM
        T1["text"] --> M1["Model"] --> T2["text"]
    end
    subgraph LMM
        TI["text\nimage\naudio\n..."] --> M2["Model"] --> TO["text\nimage\naudio\n..."]
    end
    LLM -- "진화" --> LMM
{{< /mermaid >}}

## 강의 흐름

{{< mermaid >}}
flowchart TB
    subgraph 전반부["전반부 — 기초"]
        P1["Part 1\nLLM 개요"]
        P2["Part 2\nMultimodal"]
        P3["Part 3\nTransformer"]
    end
    subgraph 중반부["중반부 — 핵심 모델"]
        P4["Part 4\nCLIP → SigLIP 2"]
        P5["Part 5\nBLIP-2 → Native"]
        P6["Part 6\nStable Diffusion\n→ Autoregressive"]
    end
    subgraph 후반부["후반부 — 최신 트렌드"]
        P7["Part 7\nMoE · Omni-Modal"]
        P8["Part 8\n시연: 비디오\nGrounding"]
    end
    P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7 --> P8
{{< /mermaid >}}

## 아키텍처 진화

{{< mermaid >}}
timeline
    title 멀티모달 모델 진화
    2021 : CLIP — 이미지-텍스트 유사도
    2023 : BLIP-2 — Adapter 방식, 6%만 학습
    2024 : GPT-4o — Native Multimodal
    2025 : SigLIP 2 — CLIP 후속 표준
         : Llama 4 — MoE + Early Fusion
         : Qwen2.5-Omni — 텍스트+이미지+오디오+비디오
         : Autoregressive 이미지 생성
{{< /mermaid >}}

## 학습 목표

- LLM → LMM 진화 과정과 "Large", "Multimodal"의 의미 이해
- Transformer Self-Attention의 텍스트·이미지 적용 방식 파악
- CLIP, BLIP-2, Stable Diffusion 아키텍처 비교
- Adapter → Native Multimodal 전환 트렌드 이해
- MoE, Autoregressive 이미지 생성 등 최신 기술 원리 습득

## 수강 대상 · 선수 지식

| 수강 대상                                        | 선수 지식                                 |
| ------------------------------------------------ | ----------------------------------------- |
| AI·딥러닝에 관심 있는 대학생 (1~4학년)           | ChatGPT, Claude 등 LLM 사용 경험          |
| LLM 내부 구조·멀티모달을 깊이 이해하고 싶은 이들 | 딥러닝 기초 (뉴럴 네트워크, 레이어, 학습) |
| 컴퓨터 비전·AI 연구/개발 진로 고려               | Python 기초 문법 (코드 예시 이해용)       |

## 시연 환경

| 항목                       | 구성                                      |
| -------------------------- | ----------------------------------------- |
| 기기                       | MacBook Pro (로컬) + RTX 3090 서버 (원격) |
| 비디오 Grounding 시연 모델 | `Qwen2.5-VL-7B` (FP16 ~15GB)              |
| 로컬 LLM                   | Ollama                                    |
| 코드 실행                  | Python 3.11+, Jupyter Notebook            |

## 강의 구성

### Part 1 — Large Language Model

- LLM이란: 텍스트 입력 → 모델 → 텍스트 출력
- "Large"의 의미: 파라미터 수와 모델 크기의 관계
- Ollama 모델 살펴보기: gpt-oss 20b(14GB) vs 120b(65GB), llama3.1 8b/70b/405b
- Transformer 기반 모델들: BERT, GPT, T5, ViT, CLIP, ALBERT
- Local LLM: Ollama, LM Studio 등으로 로컬에서 추론 실행

### Part 2 — Multimodal Model

- LLM(텍스트 only)에서 LMM(텍스트+이미지+오디오+...)으로의 확장
- 멀티모달의 장점: 정보 통합, 정확성 향상, 응용 범위 확대
- 이미지+텍스트 멀티모달 예시: 같은 이미지도 질문에 따라 다른 분석
- VGG16+Dense 멀티모달 모델 코드 예시와 아키텍처
- 데이터 융합: Early Fusion / Late Fusion / Hybrid Fusion

### Part 3 — Transformer

- Transformer 아키텍처: Encoder-Decoder, Multi-Head Attention, QKV
- 텍스트에서의 Attention: 토큰화 → 임베딩 → QKV 가중치 학습
- 이미지에서의 Attention: 픽셀 간 관계, 256x256 이미지 → 약 42억 조합
- Dense vs Convolution vs Self-Attention 비교
- Convolution + Self-Attention 혼합 (Conformer 등)

### Part 4 — CLIP 모델

- CLIP: OpenAI, 이미지-텍스트 유사도 점수 출력
- Contrastive Learning: 관련 쌍은 높은 유사도, 비관련 쌍은 낮은 유사도
- COCO 데이터셋 시연 결과: 고양이/강아지/사람/피자 이미지 분류
- 약 1.5억 파라미터, Transformer + Attention 내부 구조
- **SigLIP 2 (2025):** CLIP의 후속 표준, sigmoid loss 기반

### Part 5 — BLIP-2 모델

- BLIP-2: Salesforce (2023), Q-Former를 통한 시각-언어 연결
- 2단계 학습: Vision-Language Representation → Vision-to-Language Generation
- Q-Former: 32개 학습 가능한 쿼리, Cross Attention + Self Attention
- 효율성: 전체 3.2B 중 190M(6%)만 학습
- **Native Multimodal 트렌드 (2025~):** Adapter → Early Fusion 전환

### Part 6 — Stable Diffusion과 이미지 생성

- Diffusion 모델 원리: Denoising, 노이즈에서 이미지 생성
- Stable Diffusion 아키텍처: VAE + U-Net + Text Encoder(CLIP)
- Latent Space에서 동작하여 효율적인 이미지 생성
- **Autoregressive 이미지 생성 (2025):** GPT-4o의 토큰 기반 이미지 생성
- Diffusion vs Autoregressive 비교

### Part 7 — 최신 트렌드와 미래 방향

- **MoE:** Llama 4 Maverick 17B active / ~400B total
- **Omni-Modal:** Qwen2.5-Omni Thinker-Talker 아키텍처
- **비디오 이해 + Grounding:** 영상에서 객체 추적, 좌표 출력
- 윤리와 저작권: 지브리풍 바이럴 사례 (72시간, 7억장)

### Part 8 — 시연: Qwen2.5-VL 비디오 Grounding

- Qwen2.5-VL-7B을 RTX 3090에서 실행
- 비디오에서 프레임 추출 → 객체 인식 + 바운딩박스 출력
- 텍스트 질문에 따라 다른 Grounding 결과 시연
- 멀티모달 모델이 "보고 이해하는" 과정을 실시간으로 확인

## 강의 방식

- **형태:** 오프라인 대면 강의 (1시간 30분)
- **시연:** RTX 3090 원격 서버에서 오픈소스 모델(Qwen2.5-VL-7B)로 진행
- **상용 서비스 미사용:** 모든 시연은 오픈소스 도구로 진행
- **코드 공유:** 시연 코드를 GitHub 레포지토리에 공개
- **질의응답:** 강의 중 자유 질문 허용, 마지막 10분 별도 Q&A

## 핵심 메시지 요약

| 파트     | 핵심 메시지                                                                            |
| -------- | -------------------------------------------------------------------------------------- |
| Part 1   | LLM의 "Large"는 Transformer 모델의 방대한 파라미터 수를 의미한다                       |
| Part 2   | 여러 형태의 데이터를 통합하면 더 풍부한 이해와 정확한 결과를 얻는다                    |
| Part 3   | Self-Attention은 텍스트뿐 아니라 이미지, 오디오 등 모든 관계 데이터에 적용 가능하다    |
| Part 4-5 | CLIP/BLIP-2는 멀티모달의 기초이며, 현재는 SigLIP 2와 Native Multimodal로 진화 중이다   |
| Part 6   | 이미지 생성이 Diffusion에서 Autoregressive로 전환되며 LLM과 통합되고 있다              |
| Part 7-8 | MoE·Omni-Modal·비디오 Grounding으로 멀티모달 AI는 더 효율적이고 범용적으로 발전 중이다 |

## 문의

강의 일정 및 비용 문의는 이메일로 연락 주세요.
