# 개발자 웹 이력서 프로젝트 로드맵

## 프로젝트 개요
HTML, CSS, JavaScript, TailwindCSS를 활용한 반응형 개발자 웹 이력서

## 기술 스택
| 기술 | 용도 |
|------|------|
| HTML5 | 시맨틱 마크업 |
| CSS3 | 커스텀 스타일링 |
| JavaScript | 인터랙션 및 동적 기능 |
| TailwindCSS (CDN) | 유틸리티 기반 스타일링 |

---

## 개발 단계

### Phase 1: 프로젝트 초기 설정
- [ ] 폴더 구조 생성
- [ ] index.html 기본 템플릿 작성
- [ ] TailwindCSS CDN 연결
- [ ] 커스텀 CSS 파일 생성
- [ ] JavaScript 파일 생성

### Phase 2: 헤더 & 네비게이션
- [ ] 상단 네비게이션 바 구현
- [ ] 로고 또는 이름 배치
- [ ] 메뉴 링크 (각 섹션으로 이동)
- [ ] 모바일 햄버거 메뉴

### Phase 3: 히어로 섹션 (프로필)
- [ ] 프로필 사진 영역
- [ ] 이름 및 직함 표시
- [ ] 간단한 소개 문구
- [ ] CTA 버튼 (이력서 다운로드, 연락하기)

### Phase 4: About Me 섹션
- [ ] 자기소개 텍스트
- [ ] 연락처 정보 아이콘 + 텍스트
- [ ] 소셜 링크 (GitHub, LinkedIn, Blog)

### Phase 5: Skills 섹션
- [ ] 기술 카테고리별 분류
- [ ] 스킬 아이콘 또는 뱃지
- [ ] 숙련도 프로그레스 바 (선택)

### Phase 6: Experience 섹션
- [ ] 타임라인 레이아웃
- [ ] 회사 정보 카드
- [ ] 주요 업무 및 성과 리스트

### Phase 7: Projects 섹션
- [ ] 프로젝트 카드 그리드
- [ ] 프로젝트 이미지/썸네일
- [ ] 기술 태그
- [ ] GitHub / 데모 링크 버튼

### Phase 8: Education 섹션
- [ ] 학력 정보
- [ ] 자격증 및 수료 과정

### Phase 9: Footer
- [ ] 소셜 미디어 아이콘
- [ ] 저작권 표시
- [ ] 맨 위로 이동 버튼

### Phase 10: 인터랙션 & 애니메이션
- [ ] 스크롤 시 페이드인 애니메이션
- [ ] 부드러운 스크롤 (Smooth Scroll)
- [ ] 호버 효과
- [ ] 다크모드 토글 (선택)

### Phase 11: 반응형 디자인
- [ ] 모바일 (< 640px)
- [ ] 태블릿 (640px ~ 1024px)
- [ ] 데스크톱 (> 1024px)

### Phase 12: 최적화 & 배포
- [ ] 이미지 최적화
- [ ] SEO 메타태그 추가
- [ ] Open Graph 태그
- [ ] GitHub Pages 배포

---

## 파일 구조

```
developer-resume/
├── index.html              # 메인 HTML
├── css/
│   └── style.css           # 커스텀 CSS
├── js/
│   └── main.js             # JavaScript
├── assets/
│   └── images/
│       ├── profile.jpg     # 프로필 사진
│       └── projects/       # 프로젝트 이미지
└── README.md
```

---

## 페이지 구조

```
┌─────────────────────────────────────┐
│           Navigation                │
├─────────────────────────────────────┤
│                                     │
│         Hero / Profile              │
│         (사진, 이름, 직함)           │
│                                     │
├─────────────────────────────────────┤
│           About Me                  │
│         (자기소개, 연락처)           │
├─────────────────────────────────────┤
│            Skills                   │
│      (기술 스택 아이콘/뱃지)         │
├─────────────────────────────────────┤
│          Experience                 │
│         (경력 타임라인)              │
├─────────────────────────────────────┤
│           Projects                  │
│        (프로젝트 카드들)             │
├─────────────────────────────────────┤
│          Education                  │
│          (학력, 자격증)              │
├─────────────────────────────────────┤
│            Footer                   │
│       (소셜 링크, 저작권)            │
└─────────────────────────────────────┘
```

---

## 샘플 컨텐츠

### 기본 정보
| 항목 | 내용 |
|------|------|
| 이름 | 홍길동 |
| 직함 | Frontend Developer |
| 이메일 | hong@example.com |
| 전화번호 | 010-1234-5678 |
| GitHub | github.com/honggildong |
| LinkedIn | linkedin.com/in/honggildong |

### 자기소개
> 안녕하세요! 사용자 경험을 중시하는 프론트엔드 개발자 홍길동입니다.
> 깔끔한 코드와 직관적인 UI/UX를 만드는 것을 좋아하며,
> 새로운 기술을 배우고 적용하는 것에 열정을 가지고 있습니다.

### 기술 스택
**Frontend**
- HTML, CSS, JavaScript
- React, Vue.js
- TailwindCSS, Bootstrap

**Backend**
- Node.js, Express
- Python, Django

**Tools**
- Git, GitHub
- VS Code, Figma
- Docker

### 경력
1. **ABC 테크** - Frontend Developer (2022.03 ~ 현재)
   - React 기반 웹 애플리케이션 개발
   - 성능 최적화로 로딩 속도 40% 개선
   - 코드 리뷰 및 주니어 개발자 멘토링

2. **XYZ 스타트업** - Junior Developer (2020.06 ~ 2022.02)
   - 회사 홈페이지 리뉴얼 프로젝트 참여
   - 반응형 웹 디자인 구현
   - REST API 연동 작업

### 프로젝트
1. **쇼핑몰 웹사이트**
   - 설명: React 기반 이커머스 플랫폼
   - 기술: React, Redux, Node.js, MongoDB
   - 링크: [GitHub](https://github.com) | [Demo](https://demo.com)

2. **날씨 대시보드**
   - 설명: OpenWeather API를 활용한 날씨 정보 앱
   - 기술: JavaScript, HTML, CSS, API
   - 링크: [GitHub](https://github.com) | [Demo](https://demo.com)

3. **할일 관리 앱**
   - 설명: 드래그 앤 드롭 기능이 있는 Todo 앱
   - 기술: React, LocalStorage
   - 링크: [GitHub](https://github.com) | [Demo](https://demo.com)

### 학력 & 자격증
- **OO대학교** 컴퓨터공학과 학사 (2016 ~ 2020)
- 정보처리기사 (2020)
- AWS Solutions Architect Associate (2023)

---

## 디자인 가이드

### 색상 팔레트
| 용도 | 색상 코드 | 색상명 |
|------|----------|--------|
| Primary | `#3B82F6` | Blue |
| Secondary | `#1E293B` | Dark Slate |
| Accent | `#10B981` | Emerald |
| Background | `#F8FAFC` | Light Gray |
| Text | `#334155` | Slate |
| White | `#FFFFFF` | White |

### TailwindCSS 클래스 예시
```html
<!-- Primary 버튼 -->
<button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
  버튼
</button>

<!-- 카드 -->
<div class="bg-white rounded-xl shadow-lg p-6">
  카드 내용
</div>

<!-- 섹션 제목 -->
<h2 class="text-3xl font-bold text-slate-800 mb-6">
  섹션 제목
</h2>
```

### 폰트
- 제목: Pretendard Bold (700)
- 본문: Pretendard Regular (400)
- CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`

---

## 참고 자료
- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
- [Heroicons (아이콘)](https://heroicons.com/)
- [Pretendard 폰트](https://github.com/orioncactus/pretendard)
