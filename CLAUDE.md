# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요

개발자 웹 이력서 프로젝트 - HTML, CSS, JavaScript, TailwindCSS를 활용한 반응형 웹 이력서

## 기술 스택

| 기술 | 용도 |
|------|------|
| HTML5 | 시맨틱 마크업 |
| CSS3 | 커스텀 스타일링 |
| JavaScript | 인터랙션 및 동적 기능 |
| TailwindCSS (CDN) | 유틸리티 기반 스타일링 |

## 개발 명령어

```bash
# 로컬 개발 서버 실행 (Live Server 또는 VS Code Live Server 확장 사용)
# VS Code에서 index.html 우클릭 → "Open with Live Server"

# 또는 Python으로 간단한 서버 실행
python -m http.server 8000

# 또는 Node.js npx serve 사용
npx serve .
```

## 프로젝트 구조

```
developer-resume/
├── index.html          # 메인 HTML
├── css/
│   └── style.css       # 커스텀 CSS
├── js/
│   └── main.js         # JavaScript
└── assets/
    └── images/         # 이미지 파일
```

## 디자인 가이드

### 색상 팔레트
- Primary: `#3B82F6` (Blue)
- Secondary: `#1E293B` (Dark Slate)
- Accent: `#10B981` (Emerald)
- Background: `#F8FAFC` (Light Gray)
- Text: `#334155` (Slate)

### 폰트
- Pretendard 폰트 사용
- CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`

### 반응형 브레이크포인트
- 모바일: < 640px
- 태블릿: 640px ~ 1024px
- 데스크톱: > 1024px

## 참고 자료

- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
- [Heroicons (아이콘)](https://heroicons.com/)
- [ROADMAP.MD](./ROADMAP.MD) - 상세 개발 단계 및 샘플 컨텐츠 참조
