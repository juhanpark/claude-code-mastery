# 블로그 프로젝트 요약

## 한눈에 보는 기술 스택

```
┌──────────────────────────────────────────────────────┐
│  HTML5  │  TailwindCSS(CDN)  │  JavaScript(ES6+)    │
│         │  + 커스텀 CSS       │  바닐라, 프레임워크X  │
└──────────────────────────────────────────────────────┘
          │                     │
          ▼                     ▼
    Pretendard 폰트       posts.json (데이터)
```

---

## 파일 구조

```
blog/
├── index.html      ← 메인 (포스트 목록)
├── post.html       ← 개별 포스트
├── about.html      ← 소개
├── contact.html    ← 문의 폼
├── css/style.css   ← 애니메이션, 다크모드
├── js/main.js      ← 모든 기능
└── data/posts.json ← 포스트 데이터
```

---

## 핵심 기능 5가지

| 기능 | 구현 방식 |
|------|-----------|
| **다크모드** | `localStorage` + `dark:` 클래스 |
| **타이핑 효과** | `setTimeout` 재귀 호출 |
| **스크롤 애니메이션** | `Intersection Observer` |
| **폼 검증** | 실시간 `blur`/`input` 이벤트 |
| **포스트 로딩** | `fetch()` + URL 파라미터 |

---

## 색상 팔레트 (복사용)

```
Primary:     #3B82F6 (파랑)
Primary-Dark:#2563EB (진한 파랑)
Background:  #F8FAFC (밝은 회색)
Dark-BG:     #0F172A (진한 남색)
Text:        #334155 (회색)
```

---

## 자주 쓰는 TailwindCSS 패턴

```html
<!-- 다크모드 -->
<div class="bg-white dark:bg-slate-800">

<!-- 반응형 -->
<div class="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- 호버 -->
<button class="bg-primary hover:bg-primary-dark">

<!-- 숨김/표시 (모바일) -->
<div class="hidden md:flex">
<div class="md:hidden">
```

---

## JavaScript 모듈 패턴

```javascript
const 모듈명 = {
    init() { this.bindEvents(); },
    bindEvents() { /* 이벤트 */ },
    메서드() { /* 기능 */ }
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    모듈명.init();
});
```

---

## 개선 필요 사항 (우선순위)

| # | 문제 | 해결책 |
|---|------|--------|
| 1 | **XSS 취약점** | DOMPurify로 HTML 정화 |
| 2 | **SEO 문제** | 정적 사이트 생성기 도입 |
| 3 | **코드 중복** | 공통 컴포넌트 분리 |
| 4 | **접근성** | aria-label 추가 |
| 5 | **CDN 용량** | TailwindCSS 빌드 |

---

## 실행 방법

```bash
cd blog
python -m http.server 8000
# 또는
npx serve .
```

브라우저에서 `http://localhost:8000` 접속

---

## posts.json 구조

```javascript
{
  id: 1,                    // 고유 ID
  title: "제목",
  excerpt: "요약",          // 카드에 표시
  content: "<p>HTML</p>",   // 본문
  category: "JavaScript",
  tags: ["태그1", "태그2"],
  date: "2024-01-15",
  author: "작성자",
  readTime: "5분"
}
```

---

## 빠른 참조 링크

- [상세 문서 (BLOG.MD)](./BLOG.MD)
- [TailwindCSS 문서](https://tailwindcss.com/docs)
- [Heroicons](https://heroicons.com/)
