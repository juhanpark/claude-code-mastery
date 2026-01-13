/**
 * 블로그 메인 JavaScript
 * 다크모드, 애니메이션, 포스트 로딩, 폼 처리 등 모든 기능 포함
 */

// ===================================
// 다크모드 관리
// ===================================

const ThemeManager = {
    init() {
        this.bindEvents();
        this.updateToggleIcon();
    },

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');

        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', () => this.toggle());
        }

        // 시스템 테마 변경 감지
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.theme) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    },

    toggle() {
        const isDark = document.documentElement.classList.contains('dark');
        this.setTheme(isDark ? 'light' : 'dark');
    },

    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
        this.updateToggleIcon();
    },

    updateToggleIcon() {
        // 아이콘은 CSS의 dark: 클래스로 자동 처리됨
    }
};

// ===================================
// 모바일 메뉴
// ===================================

const MobileMenu = {
    init() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');

        if (menuBtn && menu) {
            menuBtn.addEventListener('click', () => {
                menu.classList.toggle('open');
            });

            // 메뉴 링크 클릭 시 닫기
            menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('open');
                });
            });
        }
    }
};

// ===================================
// 네비게이션 스크롤 효과
// ===================================

const NavbarScroll = {
    lastScrollY: 0,

    init() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // 스크롤 방향에 따라 숨김/표시
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }

            // 스크롤 시 그림자 추가
            if (currentScrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            this.lastScrollY = currentScrollY;
        });
    }
};

// ===================================
// 스크롤 애니메이션 (Intersection Observer)
// ===================================

const ScrollAnimation = {
    init() {
        const fadeElements = document.querySelectorAll('.fade-in');

        if (fadeElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => observer.observe(el));
    }
};

// ===================================
// 타이핑 효과
// ===================================

const TypingEffect = {
    texts: [
        '개발 블로그에 오신 것을 환영합니다',
        '프론트엔드 개발 이야기',
        '코드와 함께하는 일상'
    ],
    currentIndex: 0,
    currentText: '',
    isDeleting: false,
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseTime: 2000,

    init() {
        const element = document.getElementById('typing-text');
        if (!element) return;

        this.element = element;
        this.type();
    },

    type() {
        const fullText = this.texts[this.currentIndex];

        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }

        this.element.textContent = this.currentText;

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.currentText === fullText) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
};

// ===================================
// 포스트 관리
// ===================================

const PostManager = {
    posts: [],
    categories: [],
    currentCategory: 'all',

    async init() {
        await this.loadPosts();
        this.renderCategories();
        this.renderPosts();
        this.bindCategoryFilter();
    },

    async loadPosts() {
        const loading = document.getElementById('loading');
        const postsContainer = document.getElementById('posts-container');

        if (!postsContainer) return;

        try {
            const response = await fetch('data/posts.json');
            const data = await response.json();
            this.posts = data.posts;
            this.categories = data.categories || [];

            if (loading) loading.classList.add('hidden');
        } catch (error) {
            console.error('포스트 로딩 실패:', error);
            if (loading) {
                loading.innerHTML = '<p class="text-red-500">포스트를 불러오는데 실패했습니다.</p>';
            }
        }
    },

    renderCategories() {
        const filterContainer = document.getElementById('category-filter');
        if (!filterContainer || this.categories.length === 0) return;

        this.categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn px-4 py-2 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
            btn.dataset.category = category;
            btn.textContent = category;
            filterContainer.appendChild(btn);
        });
    },

    bindCategoryFilter() {
        const filterContainer = document.getElementById('category-filter');
        if (!filterContainer) return;

        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                // 활성화 상태 변경
                filterContainer.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');

                this.currentCategory = e.target.dataset.category;
                this.renderPosts();
            }
        });
    },

    renderPosts() {
        const container = document.getElementById('posts-container');
        const emptyState = document.getElementById('empty-state');

        if (!container) return;

        const filteredPosts = this.currentCategory === 'all'
            ? this.posts
            : this.posts.filter(post => post.category === this.currentCategory);

        if (filteredPosts.length === 0) {
            container.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        container.innerHTML = filteredPosts.map(post => this.createPostCard(post)).join('');

        // 새로 추가된 카드에 애니메이션 적용
        container.querySelectorAll('.post-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in', 'visible');
        });
    },

    createPostCard(post) {
        return `
            <article class="post-card bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                <a href="post.html?id=${post.id}" class="block">
                    <div class="h-48 bg-gradient-to-br from-primary/20 to-primary-dark/20 dark:from-primary/10 dark:to-primary-dark/10 flex items-center justify-center">
                        <span class="text-4xl">${this.getCategoryEmoji(post.category)}</span>
                    </div>
                    <div class="p-6">
                        <span class="inline-block px-3 py-1 bg-primary/10 text-primary dark:text-primary-light rounded-full text-xs font-medium mb-3">
                            ${post.category}
                        </span>
                        <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2">
                            ${post.title}
                        </h3>
                        <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                            ${post.excerpt}
                        </p>
                        <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>${post.date}</span>
                            <span>${post.readTime} 읽기</span>
                        </div>
                    </div>
                </a>
            </article>
        `;
    },

    getCategoryEmoji(category) {
        const emojis = {
            'JavaScript': '💛',
            'CSS': '💙',
            'React': '⚛️',
            '개발도구': '🛠️',
            '성능': '⚡',
            'TypeScript': '💙'
        };
        return emojis[category] || '📝';
    }
};

// ===================================
// 개별 포스트 페이지
// ===================================

const PostPage = {
    async init() {
        const postContent = document.getElementById('post-content');
        if (!postContent) return;

        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));

        if (!postId) {
            window.location.href = 'index.html';
            return;
        }

        await this.loadPost(postId);
    },

    async loadPost(postId) {
        try {
            const response = await fetch('data/posts.json');
            const data = await response.json();
            const post = data.posts.find(p => p.id === postId);

            if (!post) {
                window.location.href = 'index.html';
                return;
            }

            this.renderPost(post);
            this.renderNavigation(data.posts, postId);
            this.renderRelatedPosts(data.posts, post);

        } catch (error) {
            console.error('포스트 로딩 실패:', error);
        }
    },

    renderPost(post) {
        document.title = `${post.title} | 개발 블로그`;

        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-category').textContent = post.category;
        document.getElementById('post-author').innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            ${post.author}
        `;
        document.getElementById('post-date').innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            ${post.date}
        `;
        document.getElementById('post-readtime').innerHTML = `
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            ${post.readTime}
        `;

        // 태그 렌더링
        const tagsContainer = document.getElementById('post-tags');
        tagsContainer.innerHTML = post.tags.map(tag => `
            <span class="tag px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm">
                #${tag}
            </span>
        `).join('');

        // 본문 렌더링
        document.getElementById('post-content').innerHTML = post.content;
    },

    renderNavigation(posts, currentId) {
        const currentIndex = posts.findIndex(p => p.id === currentId);

        const prevPost = posts[currentIndex + 1];
        const nextPost = posts[currentIndex - 1];

        const prevEl = document.getElementById('prev-post');
        const nextEl = document.getElementById('next-post');

        if (prevPost && prevEl) {
            prevEl.href = `post.html?id=${prevPost.id}`;
            document.getElementById('prev-post-title').textContent = prevPost.title;
            prevEl.classList.remove('hidden');
        }

        if (nextPost && nextEl) {
            nextEl.href = `post.html?id=${nextPost.id}`;
            document.getElementById('next-post-title').textContent = nextPost.title;
            nextEl.classList.remove('hidden');
        }
    },

    renderRelatedPosts(posts, currentPost) {
        const container = document.getElementById('related-posts');
        if (!container) return;

        const relatedPosts = posts
            .filter(p => p.id !== currentPost.id && p.category === currentPost.category)
            .slice(0, 3);

        if (relatedPosts.length === 0) {
            container.parentElement.classList.add('hidden');
            return;
        }

        container.innerHTML = relatedPosts.map(post => `
            <a href="post.html?id=${post.id}" class="block bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <span class="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mb-2">
                    ${post.category}
                </span>
                <h3 class="font-bold text-slate-800 dark:text-white mb-2">${post.title}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">${post.date}</p>
            </a>
        `).join('');
    }
};

// ===================================
// 공유 기능
// ===================================

function shareToTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('링크가 복사되었습니다!', 'success');
    }).catch(() => {
        showToast('링크 복사에 실패했습니다.', 'error');
    });
}

// ===================================
// 토스트 메시지
// ===================================

function showToast(message, type = 'success') {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // 표시
    setTimeout(() => toast.classList.add('show'), 10);

    // 3초 후 제거
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===================================
// 문의 폼 처리
// ===================================

const ContactForm = {
    init() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        this.form = form;
        this.submitBtn = document.getElementById('submit-btn');
        this.submitText = document.getElementById('submit-text');
        this.submitSpinner = document.getElementById('submit-spinner');
        this.modal = document.getElementById('success-modal');
        this.closeModalBtn = document.getElementById('close-modal');

        this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // 실시간 유효성 검사
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });

        // 모달 닫기
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.closeModal());
        }

        // 모달 배경 클릭 시 닫기
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal || e.target.classList.contains('bg-black/50')) {
                    this.closeModal();
                }
            });
        }
    },

    validateField(input) {
        const errorEl = document.getElementById(`${input.id}-error`);
        let isValid = true;

        if (input.required && !input.value.trim()) {
            isValid = false;
        }

        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
            }
        }

        if (!isValid) {
            input.classList.add('error');
            if (errorEl) errorEl.classList.remove('hidden');
        } else {
            this.clearError(input);
        }

        return isValid;
    },

    clearError(input) {
        input.classList.remove('error');
        const errorEl = document.getElementById(`${input.id}-error`);
        if (errorEl) errorEl.classList.add('hidden');
    },

    async handleSubmit(e) {
        e.preventDefault();

        // 모든 필드 유효성 검사
        let isValid = true;
        this.form.querySelectorAll('input, textarea').forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // 로딩 상태
        this.setLoading(true);

        // 모의 API 호출 (2초 대기)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 성공 처리
        this.setLoading(false);
        this.form.reset();
        this.showModal();
    },

    setLoading(loading) {
        this.submitBtn.disabled = loading;

        if (loading) {
            this.submitText.textContent = '전송 중...';
            this.submitSpinner.classList.remove('hidden');
        } else {
            this.submitText.textContent = '메시지 보내기';
            this.submitSpinner.classList.add('hidden');
        }
    },

    showModal() {
        if (this.modal) {
            this.modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    },

    closeModal() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
};

// ===================================
// 스무스 스크롤
// ===================================

const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// ===================================
// 초기화
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // 공통 기능
    ThemeManager.init();
    MobileMenu.init();
    NavbarScroll.init();
    ScrollAnimation.init();
    SmoothScroll.init();

    // 페이지별 기능
    const currentPage = window.location.pathname;

    if (currentPage.includes('index.html') || currentPage.endsWith('/') || currentPage.endsWith('/blog/')) {
        TypingEffect.init();
        PostManager.init();
    } else if (currentPage.includes('post.html')) {
        PostPage.init();
    } else if (currentPage.includes('contact.html')) {
        ContactForm.init();
    }
});
