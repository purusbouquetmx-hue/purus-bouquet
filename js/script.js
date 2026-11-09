// ============================================
// BASE DE DATOS
// ============================================
const products = [
    { id: 1, name: "Corona Escarlata", price: 1190, img: "images/p-corona-escarlata.jpg", badge: "Edición Permanente", desc: "Frasco artesanal de 15ml con forma de corona dorada. Fragancia intensa y magnética de rosas rojas, ámbar y especias orientales.", category: "tienda" },
    { id: 2, name: "Huitzilin / Catrin", price: 3499, img: "images/catrin-huitzilin.png", badge: "Edición Limitada", desc: "Sarcófago impreso en 3D con filamento PETG. Explosión luminosa de cempasúchil, vainilla ahumada y ámbar dorado.", category: "tienda" },
    { id: 3, name: "Odisea Eterna", price: 799, img: "images/p-legado.jpg", badge: "Exclusivo", desc: "Estuche premium impreso en 3D con acabado mate. Fragancia amaderada natural, sobria y perdurable.", category: "tienda" },
    { id: 110, name: "Legado", price: 1150, img: "images/legado.jpg", badge: "Edición de Autor", desc: "Una interpretación maestra de la elegancia masculina mexicana. Abre con pimienta negra y bergamota, corazón de cardamomo y lavanda, fondo de cedro, sándalo y ocote.", category: "tienda" }
];

const collectionsData = [
    { id: 101, name: "Huitzilin / Catrin", category: "muertos", categoryName: "Día de los Muertos", price: 3499, img: "images/catrin-huitzilin.png", desc: "Sarcófago 3D artesanal con explosión luminosa de cempasúchil, vainilla ahumada y ámbar dorado." },
    { id: 102, name: "Xóchitl / Catrina", category: "muertos", categoryName: "Día de los Muertos", price: 3499, img: "images/catrina-xochitl.png", desc: "Sarcófago 3D artesanal con capas de copal ceremonial, resinas dulces y especias envolventes." },
    { id: 103, name: "Amor Eterno", category: "madres", categoryName: "Día de las Madres", price: 899, img: "images/p-amor.jpg", desc: "Portaretrato-perfume colgante en acabado bronce con corazón verde y purpurina morada." },
    { id: 104, name: "Dulce Abrazo", category: "madres", categoryName: "Día de las Madres", price: 899, img: "images/p-corazon.jpg", desc: "Portaretrato-perfume colgante en rosa magenta con corazón rojo, lazo dorado y corazones brillantes." },
    { id: 105, name: "Serenna", category: "madres", categoryName: "Día de las Madres", price: 899, img: "images/p-eternidad.jpg", desc: "Portaretrato-perfume colgante en rojo intenso con corazón de silueta madre-hijo y estrellas doradas." },
    { id: 106, name: "Odisea Eterna", category: "padre", categoryName: "Día del Padre", price: 799, img: "images/p-legado.jpg", desc: "Estuche premium con fragancia amaderada natural, sobria y perdurable." },
    { id: 107, name: "Corona Escarlata", category: "ella", categoryName: "Para Ella", price: 1190, img: "images/p-corona-escarlata.jpg", desc: "Corona dorada de 15ml con fragancia intensa de rosas rojas, ámbar y especias orientales." },
    { id: 110, name: "Legado", category: "el", categoryName: "Para Él", price: 1150, img: "images/legado.jpg", desc: "Una interpretación maestra de la elegancia masculina mexicana." },
    { id: 108, name: "Yoyolino", category: "nino", categoryName: "Día del Niño", price: 799, img: "images/p-explorador.jpg", desc: "Su primera fragancia: suave, frutal y llena de aventura." },
    { id: 109, name: "Ternapomella", category: "nino", categoryName: "Día del Niño", price: 890, img: "images/p-princesa.jpg", desc: "Castillo encantado con aroma dulce y floral." }
];

let cart = [];
let favorites = [];

// ============================================
// HELPERS
// ============================================
function findProductById(id) {
    return collectionsData.find(p => p.id === id) || products.find(p => p.id === id);
}

// ============================================
// CARRITO
// ============================================
window.addToCart = function(id) {
    const product = findProductById(id);
    if (!product) return;
    const itemInCart = cart.find(i => i.id === id);
    if (itemInCart) {
        itemInCart.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel) cartPanel.classList.add('active');
};

window.removeFromCart = function(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
};

window.increaseQty = function(id) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity++;
        updateCartUI();
    }
};

window.decreaseQty = function(id) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
};

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems || !cartCount || !cartTotal) return;

    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Tu carrito está vacío</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const imgHTML = `<img src="${item.img}" alt="${item.name}" class="panel-item-img"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="panel-item-img-fallback" style="display:none;">📦</div>`;

            cartItems.innerHTML += `
                <div class="panel-item">
                    ${imgHTML}
                    <div class="panel-item-info">
                        <h4 title="${item.name}">${item.name}</h4>
                        <p>$${item.price.toLocaleString('es-MX')} c/u</p>
                    </div>
                    <div class="panel-item-actions">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="decreaseQty(${item.id})" title="Quitar uno">−</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="increaseQty(${item.id})" title="Agregar uno">+</button>
                        </div>
                        <button class="icon-btn remove" onclick="removeFromCart(${item.id})" title="Eliminar del carrito">✕</button>
                    </div>
                </div>`;
        });
    }

    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString('es-MX');
}

window.checkoutWhatsApp = function() {
    if (cart.length === 0) {
        alert("Agrega productos al carrito primero.");
        return;
    }
    let message = "Hola Purus Bouquet, me gustaría hacer el siguiente pedido:\n\n";
    let total = 0;
    cart.forEach(item => {
        message += `- ${item.name} (x${item.quantity}): $${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });
    message += `\n*Total a pagar: $${total}*`;
    const phoneNumber = "5215658104298";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
};

// ============================================
// FAVORITOS
// ============================================
window.toggleFavorite = function(id) {
    const index = favorites.indexOf(id);
    if (index > -1) favorites.splice(index, 1);
    else favorites.push(id);
    updateFavoritesUI();
    renderProducts();
};

function updateFavoritesUI() {
    const favoritesItems = document.getElementById('favorites-items');
    const favCount = document.getElementById('fav-count');
    if (!favoritesItems || !favCount) return;

    favCount.textContent = favorites.length;
    favoritesItems.innerHTML = '';

    if (favorites.length === 0) {
        favoritesItems.innerHTML = '<p class="empty-msg">Aún no tienes favoritos</p>';
        return;
    }

    favorites.forEach(id => {
        const product = findProductById(id);
        if (!product) return;

        const imgHTML = `<img src="${product.img}" alt="${product.name}" class="panel-item-img"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="panel-item-img-fallback" style="display:none;">📦</div>`;

        favoritesItems.innerHTML += `
            <div class="panel-item">
                ${imgHTML}
                <div class="panel-item-info">
                    <h4 title="${product.name}">${product.name}</h4>
                    <p>$${product.price.toLocaleString('es-MX')}</p>
                </div>
                <div class="panel-item-actions">
                    <button class="icon-btn" onclick="addToCart(${product.id})" title="Agregar al carrito">🛒</button>
                    <button class="icon-btn remove" onclick="toggleFavorite(${product.id})" title="Quitar de favoritos">✕</button>
                </div>
            </div>`;
    });
}

// ============================================
// RENDER PRODUCTOS
// ============================================
const grid = document.getElementById('product-grid');
function renderProducts() {
    if (!grid) return;
    grid.innerHTML = '';
    products.forEach(product => {
        const isFav = favorites.includes(product.id);
        const imgHTML = `<img src="${product.img}" alt="${product.name}"
            style="width:100%; height:100%; object-fit:cover; border-radius:10px;"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:4rem;\\'>📦</span>';">`;
        grid.innerHTML += `
            <div class="card">
                <button class="card-fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
                    ${isFav ? '⭐' : '☆'}
                </button>
                <div class="card-img">${imgHTML}</div>
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toLocaleString('es-MX')}</p>
                <button class="btn-add" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            </div>`;
    });
}

// ============================================
// RENDER COLECCIONES
// ============================================
const collectionsGrid = document.getElementById('collections-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderCollections(filter = 'all') {
    if (!collectionsGrid) return;
    collectionsGrid.innerHTML = '';
    const filtered = filter === 'all' ? collectionsData : collectionsData.filter(item => item.category === filter);

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'collection-card';
        const imgHTML = `<img src="${item.img}" alt="${item.name}"
            style="width:100%; height:100%; object-fit:cover;"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:5rem;\\'>📦</span>';">`;
        card.innerHTML = `
            <div class="facet-line"></div>
            <div class="card-image">${imgHTML}</div>
            <div class="card-content">
                <span class="card-category">${item.categoryName}</span>
                <h3 class="card-title">${item.name}</h3>
                <p class="card-description">${item.desc}</p>
                <div class="card-footer">
                    <span class="card-price">$${item.price.toLocaleString('es-MX')}</span>
                    <button class="card-add-btn" onclick="addToCart(${item.id})">Agregar</button>
                </div>
            </div>`;
        collectionsGrid.appendChild(card);
    });
}

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCollections(btn.getAttribute('data-filter'));
        });
    });
    renderCollections();
}

// ============================================
// NAVBAR SCROLL
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
    updateActiveNav();
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}

// ============================================
// HAMBURGER
// ============================================
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');
if (hamburger && navbarMenu) {
    hamburger.addEventListener('click', () => navbarMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navbarMenu.classList.remove('active'));
    });
}

// ============================================
// PANELES
// ============================================
const btnCart = document.getElementById('btn-cart');
const cartPanel = document.getElementById('cart-panel');
const closeCart = document.getElementById('close-cart');
if (btnCart && cartPanel) {
    btnCart.addEventListener('click', () => cartPanel.classList.add('active'));
    closeCart.addEventListener('click', () => cartPanel.classList.remove('active'));
}

const btnFavorites = document.getElementById('btn-favorites');
const favoritesPanel = document.getElementById('favorites-panel');
const closeFavorites = document.getElementById('close-favorites');
if (btnFavorites && favoritesPanel) {
    btnFavorites.addEventListener('click', () => favoritesPanel.classList.add('active'));
    closeFavorites.addEventListener('click', () => favoritesPanel.classList.remove('active'));
}

// ============================================
// BÚSQUEDA
// ============================================
const btnSearch = document.getElementById('btn-search');
const searchModal = document.getElementById('search-modal');
const closeSearch = document.getElementById('close-search');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

if (btnSearch && searchModal) {
    btnSearch.addEventListener('click', () => {
        searchModal.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
    });
    closeSearch.addEventListener('click', () => {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        if (query.length === 0) return;
        const allProducts = [...products, ...collectionsData];
        const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)
        );
        if (filtered.length === 0) {
            searchResults.innerHTML = '<p style="text-align:center; color:#777; padding:20px;">No se encontraron productos</p>';
            return;
        }
        filtered.forEach(product => {
            const imgHTML = `<img src="${product.img}" alt="${product.name}"
                style="width:100%; height:100%; object-fit:cover; border-radius:10px;"
                onerror="this.style.display='none'; this.parentElement.innerHTML='📦';">`;
            searchResults.innerHTML += `
                <div class="search-result-item" onclick="scrollToProduct(${product.id})">
                    <div class="search-result-img">${imgHTML}</div>
                    <div class="search-result-info">
                        <h4>${product.name}</h4>
                        <p>$${product.price.toLocaleString('es-MX')}</p>
                    </div>
                </div>`;
        });
    });
}

function scrollToProduct(id) {
    if (searchModal) searchModal.classList.remove('active');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
    const tienda = document.getElementById('tienda');
    if (tienda) tienda.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// ANIMACIÓN 3D GOTA
// ============================================
const dropWrapper = document.getElementById('drop-wrapper');
const essenceDrop = document.getElementById('essence-drop');
const shine = document.getElementById('shine');
if (dropWrapper && essenceDrop) {
    dropWrapper.addEventListener('mousemove', (e) => {
        const rect = dropWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        const rotateX = (mouseY / (rect.height / 2)) * -25;
        const rotateY = (mouseX / (rect.width / 2)) * 25;
        essenceDrop.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        if (shine) {
            const svgX = 100 + (mouseX / rect.width) * 80;
            const svgY = 100 + (mouseY / rect.height) * 80;
            shine.setAttribute('cx', svgX);
            shine.setAttribute('cy', svgY);
            shine.style.opacity = '1';
        }
    });
    dropWrapper.addEventListener('mouseleave', () => {
        essenceDrop.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        if (shine) shine.style.opacity = '0';
    });
}

// ============================================
// FILTRO FAMILIAS OLFATIVAS
// ============================================
const familyBtns = document.querySelectorAll('.family-btn');
const noteTop = document.getElementById('note-top');
const noteHeart = document.getElementById('note-heart');
const noteBase = document.getElementById('note-base');
const scentData = {
    floral: { colors: { top: '#D4AF37' }, notes: { top: '🌹 Salida: Rosa Búlgara', heart: '💮 Corazón: Jazmín', base: '🌿 Fondo: Almizcle' } },
    amaderado: { colors: { top: '#D2691E' }, notes: { top: '🍊 Salida: Bergamota', heart: '🌲 Corazón: Cedro', base: '🪵 Fondo: Sándalo' } },
    citrico: { colors: { top: '#9ACD32' }, notes: { top: '🍋 Salida: Limón', heart: '🌿 Corazón: Vetiver', base: '🌱 Fondo: Musgo' } },
    oriental: { colors: { top: '#9370DB' }, notes: { top: '🌶️ Salida: Pimienta', heart: '🌸 Corazón: Iris', base: '🍫 Fondo: Ámbar' } }
};
familyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        familyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (essenceDrop) {
            essenceDrop.classList.add('shaking');
            setTimeout(() => essenceDrop.classList.remove('shaking'), 600);
        }
        const familyKey = btn.getAttribute('data-family');
        const data = scentData[familyKey];
        document.querySelectorAll('.liquid-stop').forEach(stop => {
            stop.style.stopColor = data.colors.top;
        });
        if (noteTop) noteTop.textContent = data.notes.top;
        if (noteHeart) noteHeart.textContent = data.notes.heart;
        if (noteBase) noteBase.textContent = data.notes.base;
    });
});

// ============================================
// PARTÍCULAS
// ============================================
const particlesContainer = document.getElementById('aroma-particles');
if (particlesContainer) {
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '80%';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        particle.style.animationDelay = Math.random() * 1 + 's';
        particlesContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 4000);
    }
    setInterval(createParticle, 500);
}

// ============================================
// FOOTER LÍQUIDO
// ============================================
const footer = document.getElementById('footer');
const liquidRipple = document.getElementById('liquid-ripple');
const liquidBubbles = document.getElementById('liquid-bubbles');
if (footer && liquidRipple && liquidBubbles) {
    let lastRippleTime = 0;
    let lastBubbleTime = 0;
    footer.addEventListener('mousemove', (e) => {
        const rect = footer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        liquidRipple.style.left = x + 'px';
        liquidRipple.style.top = y + 'px';
        liquidRipple.classList.add('active');
        const now = Date.now();
        if (now - lastRippleTime > 100) {
            createRipple(x, y);
            lastRippleTime = now;
        }
        if (now - lastBubbleTime > 150) {
            createBubble(x, y);
            lastBubbleTime = now;
        }
    });
    footer.addEventListener('mouseleave', () => liquidRipple.classList.remove('active'));

    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'liquid-ripple active';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        footer.appendChild(ripple);
        setTimeout(() => {
            ripple.classList.remove('active');
            setTimeout(() => ripple.remove(), 300);
        }, 300);
    }
    function createBubble(x, y) {
        const bubble = document.createElement('div');
        bubble.className = 'liquid-bubble';
        const size = Math.random() * 15 + 8;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = x + 'px';
        bubble.style.bottom = '0px';
        bubble.style.animationDuration = (Math.random() * 2 + 3) + 's';
        const isGold = Math.random() > 0.5;
        bubble.style.background = isGold
            ? 'radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.8), rgba(212, 175, 55, 0.2))'
            : 'radial-gradient(circle at 30% 30%, rgba(232, 213, 183, 0.8), rgba(232, 213, 183, 0.2))';
        liquidBubbles.appendChild(bubble);
        setTimeout(() => bubble.remove(), 4000);
    }
}

// ============================================
// INICIALIZAR
// ============================================
renderProducts();
updateFavoritesUI();
updateCartUI();
updateActiveNav();

// ============================================
// FIREBASE AUTH
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyCxdsRywxaUauzjO1ulvrPT-BBGoq5DlwQ",
    authDomain: "purus-bouquet-12911.firebaseapp.com",
    projectId: "purus-bouquet-12911",
    storageBucket: "purus-bouquet-12911.firebasestorage.app",
    messagingSenderId: "818904058165",
    appId: "1:818904058165:web:67a18a65ee03bd418ca47c"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const authModal = document.getElementById('auth-modal');
const authClose = document.getElementById('auth-close');
const btnAccount = document.getElementById('btn-account');
const authForm = document.getElementById('auth-form');
const authEmail = document.getElementById('auth-email');
const authPassword = document.getElementById('auth-password');
const authName = document.getElementById('auth-name');
const authError = document.getElementById('auth-error');
const authSubmit = document.getElementById('auth-submit');
const authTitle = document.getElementById('auth-title');
const authSwitchLink = document.getElementById('auth-switch-link');
const authSwitchText = document.getElementById('auth-switch-text');
const nameGroup = document.getElementById('name-group');
let isLoginMode = true;

btnAccount.addEventListener('click', () => {
    if (auth.currentUser) {
        if (confirm(`Hola ${auth.currentUser.displayName || 'Usuario'}, ¿quieres cerrar sesión?`)) {
            auth.signOut();
        }
    } else {
        authModal.classList.add('active');
    }
});

authClose.addEventListener('click', () => {
    authModal.classList.remove('active');
    authError.textContent = '';
});

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
        authError.textContent = '';
    }
});

authSwitchLink.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        authTitle.textContent = 'Bienvenido a Purus Bouquet';
        authSubmit.textContent = 'Iniciar Sesión';
        authSwitchText.textContent = '¿No tienes cuenta?';
        authSwitchLink.textContent = 'Regístrate aquí';
        nameGroup.style.display = 'none';
    } else {
        authTitle.textContent = 'Crear tu cuenta';
        authSubmit.textContent = 'Registrarme';
        authSwitchText.textContent = '¿Ya tienes cuenta?';
        authSwitchLink.textContent = 'Inicia sesión';
        nameGroup.style.display = 'flex';
    }
    authError.textContent = '';
});

document.getElementById('btn-google').addEventListener('click', async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        authModal.classList.remove('active');
    } catch (error) {
        authError.textContent = 'Error al iniciar con Google: ' + error.message;
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authError.textContent = '';
    authSubmit.textContent = 'Procesando...';
    authSubmit.disabled = true;
    try {
        if (isLoginMode) {
            await auth.signInWithEmailAndPassword(authEmail.value, authPassword.value);
        } else {
            const userCredential = await auth.createUserWithEmailAndPassword(authEmail.value, authPassword.value);
            if (authName.value) {
                await userCredential.user.updateProfile({ displayName: authName.value });
            }
        }
        authModal.classList.remove('active');
        authForm.reset();
    } catch (error) {
        authError.textContent = traducirError(error.code, error.message);
    } finally {
        authSubmit.textContent = isLoginMode ? 'Iniciar Sesión' : 'Registrarme';
        authSubmit.disabled = false;
    }
});

function traducirError(code, message) {
    const errores = {
        'auth/email-already-in-use': 'Este correo ya está registrado.',
        'auth/invalid-email': 'Correo electrónico no válido.',
        'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
        'auth/user-not-found': 'No existe una cuenta con este correo.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.',
        'auth/network-request-failed': 'Error de conexión. Revisa tu internet.',
        'auth/invalid-credential': 'Credenciales inválidas.',
        'auth/operation-not-allowed': 'Este método de inicio de sesión no está habilitado.',
        'auth/internal-error': 'Error interno. Intenta de nuevo.'
    };
    return errores[code] || `Error: ${code || 'desconocido'}`;
}

auth.onAuthStateChanged((user) => {
    if (user) {
        const avatarUrl = user.photoURL ||
            'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email) + '&background=D4AF37&color=000';
        btnAccount.innerHTML = `<img src="${avatarUrl}" class="user-avatar" alt="${user.displayName || 'Usuario'}" title="${user.displayName || user.email}">`;
    } else {
        btnAccount.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
    }
});

// ============================================
// SCROLL TO TOP
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) scrollToTopBtn.classList.add('show');
    else scrollToTopBtn.classList.remove('show');
});
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// HERBARIO — CON IMÁGENES REALES
// ============================================
const aromaIngredients = [
    { id: 1, image: "images/ing-vainilla.jpg", name: "Vainilla de Papantla", family: "Gourmand / Resina", desc: "La reina de las especias. Usamos la vaina entera de Papantla, Veracruz, macerada pacientemente en alcohol. Su aroma es cremoso, balsámico y profundamente cálido, actuando como el corazón dulce y reconfortante de nuestras fragancias.", role: "Nota de Fondo (Fijador Natural)" },
    { id: 2, image: "images/ing-cempasuchil.jpg", name: "Cempasúchil", family: "Floral Especiado", desc: "La flor sagrada de México. Casi inexplorada en la perfumería comercial, nuestra tintura captura su alma verde, especiosa y terrosa, creando un puente olfativo entre los altares ancestrales y la alta perfumería.", role: "Nota de Corazón" },
    { id: 3, image: "images/ing-cacahuate.jpg", name: "Cacahuate (Hojas y Semilla)", family: "Verde / Tostado", desc: "Nuestra firma única. Las hojas aportan un matiz verde, fresco y herbal, mientras la semilla tostada brinda una base terrosa y cálida. Un acorde imposible de encontrar en perfumes industriales.", role: "Nota de Corazón y Fondo" },
    { id: 4, image: "images/ing-cacao.jpg", name: "Cacao", family: "Gourmand", desc: "Cacao puro y amargo. Lejos del chocolate dulce comercial, aporta una profundidad terrosa, ligeramente afrutada y rica que eleva cualquier composición hacia el lujo absoluto.", role: "Nota de Fondo" },
    { id: 5, image: "images/ing-campeche.jpg", name: "Palo de Campeche", family: "Madera Dulce", desc: "Nativo de las selvas de Campeche. Sus trozos son macerados lentamente para extraer su resina dulce, rojiza y terrosa. Aporta una base misteriosa y profundamente mexicana.", role: "Nota de Fondo" },
    { id: 6, image: "images/ing-hierbasanta.jpg", name: "Hierba Santa", family: "Especia Verde", desc: "La reina de la botánica mexicana. Nuestra tintura captura sus complejas notas de anís, albahaca y pimienta, añadiendo un giro sofisticado y vibrante a las notas de salida.", role: "Nota de Salida / Corazón" },
    { id: 7, image: "images/ing-cedron.jpg", name: "Cedrón", family: "Cítrico Herbal", desc: "Más sutil, elegante y persistente que el limón común. Maceramos sus hojas para capturar una frescura luminosa que eleva y da brillo a las aperturas de nuestros perfumes.", role: "Nota de Salida" },
    { id: 8, image: "images/ing-sandalo.jpg", name: "Sándalo en Polvo", family: "Madera Cremosa", desc: "Utilizamos sándalo en polvo de alta calidad para una maceración profunda. Su aroma cremoso, suave y espiritual actúa como un fijador natural que redondea las notas más complejas.", role: "Nota de Fondo" },
    { id: 9, image: "images/ing-rompezaraguey.jpg", name: "Rompe Zaragüey", family: "Resina Herbal", desc: "Una planta mística de la herbolaria mexicana. Su perfil resinoso y herbal, con sutiles toques de pino y alcanfor, aporta un carácter purificador y terroso a nuestras composiciones.", role: "Nota de Corazón" },
    { id: 10, image: "images/ing-naranjo.jpg", name: "Flor de Naranjo / Nardo", family: "Floral Blanco", desc: "El clásico indiscutible de la alta perfumería. Ya sea la luminosidad del Azahar o la intensidad cremosa del Nardo, aportan el corazón romántico y sofisticado que equilibra nuestras notas exóticas.", role: "Nota de Corazón" }
];

const aromaGrid = document.getElementById('aroma-grid');
const aromaModal = document.getElementById('aroma-modal');
const closeAromaModal = document.getElementById('close-aroma-modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDesc = document.getElementById('modal-desc');
const modalRole = document.getElementById('modal-role');

if (aromaGrid) {
    aromaIngredients.forEach(ing => {
        const card = document.createElement('div');
        card.className = 'aroma-card';
        card.innerHTML = `
            <img src="${ing.image}" alt="${ing.name}" class="aroma-card-image"
                onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:3.5rem; margin-bottom:15px;\\'>🌿</div><h4 class=\\'aroma-card-name\\'>${ing.name}</h4><span class=\\'aroma-card-family\\'>${ing.family}</span>';">
            <h4 class="aroma-card-name">${ing.name}</h4>
            <span class="aroma-card-family">${ing.family}</span>
        `;
        card.addEventListener('click', () => {
            // Imagen grande dentro del modal
            modalIcon.innerHTML = `<img src="${ing.image}" alt="${ing.name}" class="aroma-modal-image"
                onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:5rem;\\'>🌿</div>';">`;
            modalTitle.textContent = ing.name;
            modalCategory.textContent = ing.family;
            modalDesc.textContent = ing.desc;
            modalRole.textContent = ing.role;
            aromaModal.classList.add('active');
        });
        aromaGrid.appendChild(card);
    });
}

if (closeAromaModal && aromaModal) {
    closeAromaModal.addEventListener('click', () => aromaModal.classList.remove('active'));
    aromaModal.addEventListener('click', (e) => {
        if (e.target === aromaModal) aromaModal.classList.remove('active');
    });
}