# 블로그 프로젝트 기술 문서

---

## Part 1: Claude 개발 규칙 (AI 참조용)

### 프로젝트 구조
```
blog/
├── index.html          # 메인 (포스트 목록)
├── post.html           # 개별 포스트 뷰어
├── about.html          # 소개 페이지
├── contact.html        # 문의 폼
├── css/style.css       # 커스텀 스타일
├── js/main.js          # 모든 JavaScript
├── data/posts.json     # 포스트 데이터
└── assets/images/      # 이미지
```

### 코딩 컨벤션

#### HTML
- 시맨틱 태그 사용: `<nav>`, `<section>`, `<article>`, `<footer>`
- `id` 속성: JavaScript 조작 대상 (예: `id="navbar"`, `id="posts-container"`)
- `class` 속성: 스타일링 전용
- 접근성: `aria-label` 필수 (버튼, 링크)

#### TailwindCSS 패턴
```html
<!-- 다크모드: dark: 접두사 사용 -->
<div class="bg-white dark:bg-slate-800">

<!-- 반응형: md:, lg: 접두사 -->
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- 호버/포커스: hover:, focus: 접두사 -->
<button class="bg-primary hover:bg-primary-dark">

<!-- 커스텀 색상: tailwind.config에서 정의 -->
<span class="text-primary">  <!-- #3B82F6 -->
```

#### JavaScript 모듈 패턴
```javascript
// 객체 리터럴 패턴 사용
const ModuleName = {
    property: value,

    init() {
        this.bindEvents();
    },

    bindEvents() {
        // 이벤트 바인딩
    },

    methodName() {
        // 기능 구현
    }
};

// DOMContentLoaded에서 초기화
document.addEventListener('DOMContentLoaded', () => {
    ModuleName.init();
});
```

#### 다크모드 구현 규칙
```javascript
// 1. HTML <head>에서 깜빡임 방지 (인라인 스크립트)
if (localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

// 2. 토글 시 localStorage 저장
localStorage.theme = 'dark';  // 또는 'light'

// 3. <html> 태그에 'dark' 클래스 토글
document.documentElement.classList.toggle('dark');
```

### 색상 시스템
| 변수명 | 라이트 | 다크 | 용도 |
|--------|--------|------|------|
| primary | `#3B82F6` | `#60A5FA` | 강조, 버튼, 링크 |
| primary-dark | `#2563EB` | - | 호버 상태 |
| slate-50 | `#F8FAFC` | - | 배경 |
| slate-800 | - | `#1E293B` | 다크 배경 |
| slate-900 | - | `#0F172A` | 다크 진한 배경 |

### 애니메이션 규칙
```css
/* 페이드인: .fade-in 클래스 + .visible 토글 */
.fade-in { opacity: 0; transform: translateY(20px); }
.fade-in.visible { opacity: 1; transform: translateY(0); }

/* Intersection Observer로 .visible 추가 */
```

### 데이터 구조 (posts.json)
```javascript
{
    id: number,           // 고유 ID
    title: string,        // 제목
    excerpt: string,      // 요약 (카드에 표시)
    content: string,      // HTML 본문
    category: string,     // 카테고리명
    tags: string[],       // 태그 배열
    date: "YYYY-MM-DD",   // 날짜
    author: string,       // 작성자
    readTime: string      // "5분" 형식
}
```

---

## Part 2: 기술 스택 설명 (사람용)

### 사용된 기술

| 기술 | 버전/방식 | 역할 |
|------|-----------|------|
| **HTML5** | - | 시맨틱 마크업, 페이지 구조 |
| **CSS3** | 커스텀 | 애니메이션, 다크모드, 스크롤바 |
| **JavaScript** | ES6+ (바닐라) | 동적 기능, 상호작용 |
| **TailwindCSS** | CDN (v3) | 유틸리티 기반 스타일링 |
| **Pretendard** | CDN | 한글 최적화 폰트 |
| **JSON** | 정적 파일 | 포스트 데이터 저장 |

### 각 기술의 역할

#### TailwindCSS (CDN)
**왜 CDN을 선택했나?**
- 빌드 도구 없이 즉시 사용 가능
- 프로토타입/소규모 프로젝트에 적합
- 설정이 간단함

**장점:**
- 유틸리티 클래스로 빠른 개발
- 일관된 디자인 시스템
- 다크모드 `dark:` 접두사 지원
- 반응형 `md:`, `lg:` 쉽게 적용

**단점:**
- 프로덕션에서 파일 크기 큼 (PurgeCSS 없음)
- 런타임에 스타일 생성

#### 바닐라 JavaScript (ES6+)
**왜 프레임워크 없이?**
- 학습 목적에 적합
- 간단한 블로그에 충분
- 의존성 없음

**사용된 주요 기능:**
- `fetch()` API - 비동기 데이터 로딩
- `Intersection Observer` - 스크롤 애니메이션
- `localStorage` - 테마 설정 저장
- `URLSearchParams` - URL 파라미터 처리
- 객체 리터럴 패턴 - 모듈화

#### 커스텀 CSS
**TailwindCSS로 부족한 부분 보완:**
- 복잡한 애니메이션 (타이핑 커서, 그라데이션 시프트)
- 커스텀 스크롤바
- 포스트 본문 타이포그래피
- 토스트 메시지

### 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                      브라우저                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────────┐    ┌─────────────┐    ┌────────────┐ │
│   │  HTML 파일  │    │  CSS 파일   │    │  JS 파일   │ │
│   │ (4개 페이지) │    │ (style.css) │    │ (main.js)  │ │
│   └──────┬──────┘    └──────┬──────┘    └─────┬──────┘ │
│          │                  │                  │        │
│          └──────────────────┼──────────────────┘        │
│                             │                           │
│                    ┌────────▼────────┐                  │
│                    │  TailwindCSS    │                  │
│                    │  (CDN 로드)     │                  │
│                    └─────────────────┘                  │
│                                                         │
│   ┌─────────────────────────────────────────────────┐  │
│   │                   main.js                        │  │
│   │  ┌───────────┐ ┌───────────┐ ┌───────────────┐  │  │
│   │  │ThemeManager│ │PostManager│ │ScrollAnimation│  │  │
│   │  └───────────┘ └─────┬─────┘ └───────────────┘  │  │
│   │                      │                           │  │
│   │               fetch('data/posts.json')           │  │
│   └─────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Part 3: 구조 평가 및 개선점

### 현재 구조의 장점

1. **단순함**
   - 빌드 도구 없이 바로 실행 가능
   - 파일 구조가 직관적
   - 학습/프로토타입에 이상적

2. **모듈화된 JavaScript**
   - 기능별로 객체 분리 (ThemeManager, PostManager 등)
   - 초기화 패턴 일관됨
   - 유지보수 용이

3. **다크모드 구현**
   - FOUC(깜빡임) 방지 처리됨
   - 시스템 테마 감지
   - localStorage 영속성

4. **반응형 디자인**
   - 모바일 우선 접근
   - 햄버거 메뉴 구현
   - 그리드 레이아웃 적응

---

### 발견된 문제점 및 개선 제안

#### 1. 보안 취약점 - XSS 위험
```javascript
// 현재: HTML 직접 삽입 (위험)
container.innerHTML = post.content;

// 개선: DOMPurify 사용 또는 텍스트만 허용
import DOMPurify from 'dompurify';
container.innerHTML = DOMPurify.sanitize(post.content);
```
**심각도:** 높음
**이유:** posts.json의 content가 HTML로 직접 삽입되어 XSS 공격 가능

#### 2. 성능 - TailwindCSS CDN
```html
<!-- 현재: 전체 TailwindCSS 로드 (~3MB) -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- 개선: 프로덕션 빌드 사용 -->
<!-- npm install tailwindcss + purge 설정 -->
```
**심각도:** 중간
**이유:** 미사용 스타일까지 모두 로드

#### 3. 접근성 부족
```html
<!-- 현재: 일부 버튼에 aria-label 누락 -->
<button id="mobile-menu-btn">

<!-- 개선: -->
<button id="mobile-menu-btn" aria-label="메뉴 열기" aria-expanded="false">
```
**심각도:** 중간
**이유:** 스크린 리더 사용자 경험 저하

#### 4. SEO 최적화 부족
```html
<!-- 현재: post.html은 동적으로 콘텐츠 로드 -->
<!-- 검색 엔진이 본문을 인덱싱할 수 없음 -->

<!-- 개선 방안: -->
<!-- 1. 정적 사이트 생성기 사용 (11ty, Hugo) -->
<!-- 2. 서버사이드 렌더링 -->
<!-- 3. 각 포스트를 개별 HTML 파일로 생성 -->
```
**심각도:** 높음 (블로그의 핵심)
**이유:** 포스트 내용이 검색되지 않음

#### 5. 에러 처리 미흡
```javascript
// 현재: 기본적인 try-catch만
try {
    const response = await fetch('data/posts.json');
} catch (error) {
    console.error('실패:', error);
}

// 개선: 사용자 친화적 에러 UI
try {
    const response = await fetch('data/posts.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
} catch (error) {
    showErrorUI('데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
    logError(error);  // 에러 로깅 서비스
}
```
**심각도:** 낮음

#### 6. 코드 중복
```html
<!-- 문제: 네비게이션, 푸터가 4개 HTML에 복사됨 -->

<!-- 개선 방안: -->
<!-- 1. JavaScript로 공통 컴포넌트 로드 -->
<!-- 2. 템플릿 엔진 사용 (Handlebars, EJS) -->
<!-- 3. Web Components 활용 -->
```
**심각도:** 중간
**이유:** 수정 시 4개 파일 모두 변경 필요

---

### 개선 우선순위

| 순위 | 항목 | 난이도 | 영향도 |
|:----:|------|:------:|:------:|
| 1 | XSS 방지 (DOMPurify) | 쉬움 | 높음 |
| 2 | SEO 개선 (정적 생성) | 어려움 | 높음 |
| 3 | 공통 컴포넌트 분리 | 중간 | 중간 |
| 4 | 접근성 개선 | 쉬움 | 중간 |
| 5 | TailwindCSS 빌드 | 중간 | 중간 |
| 6 | 에러 처리 강화 | 쉬움 | 낮음 |

---

### 향후 확장 제안

1. **검색 기능**
   - 클라이언트 사이드: Fuse.js
   - 서버 필요 시: Algolia, Elasticsearch

2. **댓글 시스템**
   - Giscus (GitHub Discussions 기반)
   - Disqus

3. **뉴스레터 구독**
   - Buttondown, ConvertKit 연동

4. **Analytics**
   - Plausible (프라이버시 친화적)
   - Google Analytics

5. **PWA 변환**
   - Service Worker 추가
   - 오프라인 지원
