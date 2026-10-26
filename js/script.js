/* ============================================
   PURUS BOUQUET - FUNCIONALIDADES
   Pasión y Arte en Perfume
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. HEADER CON EFECTO SCROLL
    // ==========================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ==========================================
    // 2. MENÚ MÓVIL
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Dropdown en móvil
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !link.parentElement.classList.contains('dropdown')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // ==========================================
    // 3. CARRUSEL HERO
    // ==========================================
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Iniciar autoplay
    if (slides.length > 0) {
        startAutoSlide();
    }
    
    // Pausar en hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    // ==========================================
    // 4. SCROLL SUAVE
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // 5. ANIMACIONES AL SCROLL (Reveal)
    // ==========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.esencia-card, .producto-card, .testimonio-card, .feature-item, .gallery-item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Agregar clase revealed con estilos
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================
    // 6. CARRITO DE COMPRAS (Simulado)
    // ==========================================
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            if (cartCount) {
                cartCount.textContent = cartItems;
                cartCount.style.animation = 'none';
                setTimeout(() => {
                    cartCount.style.animation = 'pulseCart 0.5s ease';
                }, 10);
            }
            
            // Feedback visual
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> ¡Agregado!';
            this.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 1500);
            
            // Mostrar notificación
            showNotification('Producto agregado al carrito');
        });
    });
    
    // Animación del contador del carrito
    const cartStyle = document.createElement('style');
    cartStyle.textContent = `
        @keyframes pulseCart {
            0% { transform: scale(1); }
            50% { transform: scale(1.4); background: var(--dorado-principal); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(cartStyle);
    
    // ==========================================
    // 7. NOTIFICACIONES
    // ==========================================
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: linear-gradient(135deg, var(--purpura-oscuro), var(--purpura-medio));
            color: var(--blanco-puro);
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 5px 20px rgba(74, 20, 140, 0.3);
            border-left: 4px solid var(--dorado-principal);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 0.95rem;
            animation: slideInRight 0.4s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Estilos de la animación
        if (!document.getElementById('notification-styles')) {
            const notifStyle = document.createElement('style');
            notifStyle.id = 'notification-styles';
            notifStyle.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(400px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(400px); opacity: 0; }
                }
            `;
            document.head.appendChild(notifStyle);
        }
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }
    
    // ==========================================
    // 8. FORMULARIO NEWSLETTER
    // ==========================================
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && validateEmail(email)) {
                showNotification('¡Gracias por suscribirte a Purus Bouquet!');
                emailInput.value = '';
            } else {
                showNotification('Por favor ingresa un correo válido');
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ==========================================
    // 9. VISTA RÁPIDA DE PRODUCTOS
    // ==========================================
    const quickViewButtons = document.querySelectorAll('.btn-quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.producto-card');
            const productName = card.querySelector('.producto-nombre').textContent;
            showNotification(`Vista rápida: ${productName}`);
        });
    });
    
    // ==========================================
    // 10. EFECTO PARALLAX SUAVE EN HERO
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-slide.active .hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
    
    // ==========================================
    // 11. EFECTO DE BRILLO EN PRODUCTOS
    // ==========================================
    const productCards = document.querySelectorAll('.producto-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.08), var(--blanco-puro) 60%)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
    
    // ==========================================
    // 12. DETECCIÓN DE TEMPORADA
    // ==========================================
    function checkSeason() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        
        // Día de Muertos: 31 octubre - 2 noviembre
        if ((month === 10 && day >= 25) || (month === 11 && day <= 3)) {
            document.body.classList.add('season-dia-muertos');
        }
        // Día de las Madres: Mayo (especialmente cerca del 10)
        else if (month === 5 && day <= 15) {
            document.body.classList.add('season-dia-madres');
        }
        // Día del Padre: Junio (especialmente cerca del tercer domingo)
        else if (month === 6 && day <= 20) {
            document.body.classList.add('season-dia-padres');
        }
        // Día del Niño: 30 abril
        else if (month === 4 && day >= 25) {
            document.body.classList.add('season-dia-ninos');
        }
    }
    
    checkSeason();
    
    // ==========================================
    // 13. LAZY LOADING DE IMÁGENES (Preparación)
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ==========================================
    // 14. CONTADOR DE TIEMPO PARA PRÓXIMA CELEBRACIÓN
    // ==========================================
    function getNextCelebration() {
        const today = new Date();
        const year = today.getFullYear();
        
        const celebrations = [
            { name: 'Día del Niño', date: new Date(year, 3, 30) },
            { name: 'Día de las Madres', date: new Date(year, 4, 10) },
            { name: 'Día del Padre', date: getThirdSundayOfJune(year) },
            { name: 'Día de Muertos', date: new Date(year, 9, 31) }
        ];
        
        // Buscar la próxima celebración
        const upcoming = celebrations.find(c => c.date >= today);
        return upcoming || celebrations[0];
    }
    
    function getThirdSundayOfJune(year) {
        const june1 = new Date(year, 5, 1);
        const dayOfWeek = june1.getDay();
        const firstSunday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
        return new Date(year, 5, firstSunday + 14);
    }
    
    // ==========================================
    // 15. CONSOLA DE BIENVENIDA
    // ==========================================
    console.log('%c✨ Purus Bouquet ✨', 
        'color: #D4AF37; font-size: 30px; font-weight: bold; text-shadow: 2px 2px 4px #4A148C;');
    console.log('%cPasión y Arte en Perfume', 
        'color: #7B1FA2; font-size: 16px; font-style: italic;');
    console.log('%c🌺 Fragancias naturales inspiradas en las tradiciones mexicanas 🌺', 
        'color: #C41E3A; font-size: 12px;');
    
});