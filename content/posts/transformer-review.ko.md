---
title: "Transformer 논문 리뷰: Attention is All You Need"
date: 2024-11-26
categories: ["blog"]
tags: ["논문리뷰", "NLP", "딥러닝", "Transformer", "Attention"]
description: "NLP의 패러다임을 바꾼 Transformer 아키텍처 분석"
---

## 들어가며

2017년 Google이 발표한 "Attention is All You Need" 논문은 NLP 분야에 혁명을 일으켰습니다. 이 글에서는 Transformer의 핵심 아이디어와 구조를 분석합니다.

## 기존 방식의 한계

### RNN/LSTM의 문제점

- **순차 처리**: 병렬화 불가능
- **장거리 의존성**: Gradient vanishing 문제
- **학습 속도**: 긴 시퀀스에서 매우 느림

## Transformer의 핵심 아이디어

### Self-Attention 메커니즘

```python
def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    Q: Query matrix
    K: Key matrix
    V: Value matrix
    """
    d_k = K.shape[-1]
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
    
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    
    attention_weights = F.softmax(scores, dim=-1)
    output = torch.matmul(attention_weights, V)
    
    return output, attention_weights
```

### Multi-Head Attention

여러 개의 attention head를 병렬로 사용하여 다양한 관점에서 정보를 추출합니다.

## 아키텍처 구조

1. **Encoder**: 입력 시퀀스를 처리
2. **Decoder**: 출력 시퀀스를 생성
3. **Positional Encoding**: 위치 정보 추가

## 왜 혁명적인가?

- **병렬 처리**: GPU 효율 극대화
- **장거리 의존성**: 직접적인 연결
- **확장성**: BERT, GPT 등의 기반

## 실전 적용 팁

### 메모리 최적화

대규모 모델 학습 시 attention의 메모리 사용량이 시퀀스 길이의 제곱에 비례합니다. Gradient checkpointing과 mixed precision을 활용하세요.

### 학습 안정화

Warm-up learning rate schedule과 layer normalization이 필수입니다.

## 결론

Transformer는 단순히 새로운 아키텍처가 아니라, NLP를 넘어 컴퓨터 비전(ViT), 멀티모달(CLIP) 등 다양한 분야의 기반이 되었습니다.

## 참고 자료

- [원논문](https://arxiv.org/abs/1706.03762)
- [The Illustrated Transformer](http://jalammar.github.io/illustrated-transformer/)
