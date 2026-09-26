document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;

    // ─── Theme Toggle ───
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    themeToggle.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeIcon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    // ─── Language Switcher ───
    const langButtons = document.querySelectorAll('.lang-opt');
    const savedLang = localStorage.getItem('lang') || 'en';

    function setLanguage(lang) {
        html.setAttribute('data-lang', lang);
        html.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);

        // Update active button
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.langVal === lang);
        });

        // Update all translatable elements
        document.querySelectorAll('[data-en][data-tr]').forEach(el => {
            const text = el.getAttribute('data-' + lang);
            if (text) el.innerHTML = text;
        });

        // Update CV link based on language
        const cvLink = document.getElementById('cv-link');
        if (cvLink) {
            cvLink.href = lang === 'en' ? 'docs/CV_ENG.pdf' : 'docs/CV_İstanbul.pdf';
        }

        // Update page title
        document.title = lang === 'en'
            ? 'Yahya Ahmet Öğütcü | Electrical-Electronics Engineer'
            : 'Yahya Ahmet Öğütcü | Elektrik-Elektronik Mühendisi';
    }

    setLanguage(savedLang);

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.langVal));
    });

    // ─── Mobile Menu ───
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.className = navLinks.classList.contains('active') ? 'fas fa-xmark' : 'fas fa-bars';
    });

    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.className = 'fas fa-bars';
        });
    });

    // ─── Intern Detail Panels ───
    document.querySelectorAll('.intern-detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = document.getElementById('detail-' + btn.dataset.intern);
            if (!panel) return;
            const isOpen = panel.classList.contains('open');
            // Close all panels first
            document.querySelectorAll('.intern-detail-panel.open').forEach(p => p.classList.remove('open'));
            // Toggle clicked one
            if (!isOpen) panel.classList.add('open');
        });
    });

    // ─── Scroll Animations ───
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // ─── Smooth Scroll ───
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // ─── Modals ───
    document.querySelectorAll('[data-modal]').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('.btn-github')) return; // let github link work normally
            if (e.target.closest('.view-details')) {
                const modal = document.getElementById(card.dataset.modal);
                if (modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
            }
        });
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => closeModal());
    });

    document.querySelectorAll('.modal').forEach(m => {
        m.addEventListener('click', e => { if (e.target === m) closeModal(); });
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    function closeModal() {
        document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
    }
});
