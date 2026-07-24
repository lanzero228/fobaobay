/**
 * ФОБАОБАУ - Вьетнамский ресторан
 * Основной JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== HEADER SCROLL ====================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Добавляем класс scrolled при прокрутке
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ==================== MOBILE MENU ====================
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    const body = document.body;
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Закрываем меню при клике на ссылку
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            });
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
    
    // ==================== SCROLL ANIMATIONS ====================
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Опционально: прекращаем наблюдение после появления
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // ==================== BACK TO TOP BUTTON ====================
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== ACTIVE NAV LINK ====================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (currentPage === linkPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ==================== IMAGE LAZY LOADING ====================
    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает lazy loading
        document.querySelectorAll('img').forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback для старых браузеров
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // ==================== PARALLAX EFFECT FOR HERO ====================
    const hero = document.querySelector('.hero-bg');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition < window.innerHeight) {
                hero.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        });
    }
    
    // ==================== CONSOLE GREETING ====================
    console.log('🍜 Фобаобау - Добро пожаловать!');
    console.log('📍 Альметьевск, ул. Ленина, 45');
    console.log('📞 +7 (917) 123-45-67');
});

/**
 * Меню - навигация по категориям
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MENU CATEGORY NAVIGATION ====================
    const categoryLinks = document.querySelectorAll('.menu-category');
    const menuSections = document.querySelectorAll('.menu-section');
    
    // Плавный скролл к категории
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const menuNavHeight = document.querySelector('.menu-nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - menuNavHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем активную категорию
                categoryLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Определение активной категории при скролле
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        menuSections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        categoryLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ==================== MENU ITEM ANIMATION ====================
    const menuItems = document.querySelectorAll('.menu-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
});
/**
 * Галерея - фильтрация и лайтбокс
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== GALLERY FILTER ====================
    const filterButtons = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-full-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Фильтруем элементы
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ==================== LIGHTBOX ====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const alt = img.getAttribute('alt');
            
            lightboxImage.src = img.src;
            lightboxImage.alt = alt;
            lightboxCaption.textContent = alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Закрытие лайтбокса
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImage.src = '';
    }
    
    // ==================== INITIAL SETUP ====================
    galleryItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
    });
});
/**
 * Бронирование - форма и валидация
 */

document.addEventListener('DOMContentLoaded', function() {
    
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (bookingForm) {
        // Установка минимальной даты (сегодня)
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        // Маска для телефона
        const phoneInput = document.getElementById('phone');
        
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.startsWith('7') || value.startsWith('8')) {
                value = value.substring(1);
            }
            
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            let formattedValue = '+7 (';
            
            if (value.length > 0) {
                formattedValue += value.substring(0, 3);
            }
            if (value.length >= 3) {
                formattedValue += ') ';
                formattedValue += value.substring(3, 6);
            }
            if (value.length >= 6) {
                formattedValue += '-';
                formattedValue += value.substring(6, 8);
            }
            if (value.length >= 8) {
                formattedValue += '-';
                formattedValue += value.substring(8, 10);
            }
            
            this.value = formattedValue;
        });
        
        // Отправка формы
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Базовая валидация
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            
            if (!name || !phone || !date || !time || !guests) {
                alert('Пожалуйста, заполните все обязательные поля.');
                return;
            }
            
            // Проверка телефона
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length < 11) {
                alert('Пожалуйста, введите корректный номер телефона.');
                return;
            }
            
            // Имитация отправки
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                bookingForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Прокрутка к сообщению об успехе
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }
    
    // Валидация количества гостей
    const guestsSelect = document.getElementById('guests');
    if (guestsSelect) {
        guestsSelect.addEventListener('change', function() {
            if (this.value === 'more') {
                const exactGuests = prompt('Укажите точное количество гостей:');
                if (exactGuests && !isNaN(exactGuests) && exactGuests > 0) {
                    // Создаем новую опцию
                    const option = document.createElement('option');
                    option.value = exactGuests;
                    option.textContent = `${exactGuests} гостей`;
                    option.selected = true;
                    this.appendChild(option);
                } else {
                    this.value = '';
                }
            }
        });
    }
});