const track = document.getElementById('promo-carousel');
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carousel-dots'); // Seleciona o container dos dots
const totalSlides = slides.length;

let currentSlide = 0;
let startX = 0;
let endX = 0;
let autoSlideInterval;
let dots = []; // Array para guardar os elementos HTML de cada dot

// === INICIALIZAÇÃO DOS DOTS ===
function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        
        if (i === 0) dot.classList.add('active'); // O primeiro começa ativo

        // Adiciona um evento de clique: se o usuário tocar no dot, vai direto para a imagem correspondente
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateCarousel();
            resetAutoPlay();
        });

        dotsContainer.appendChild(dot);
        dots.push(dot); // Guarda no array para usarmos depois
    }
}

// === LÓGICA DE MOVIMENTO E ATUALIZAÇÃO ===
function moveSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

// Atualiza a posição das imagens e a cor dos dots
function updateCarousel() {
    // Move as imagens
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Atualiza qual dot tem a classe 'active'
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// === GERENCIAMENTO DE AUTOPLAY ===
function startAutoPlay() {
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 4500);
}

function resetAutoPlay() {
    clearInterval(autoSlideInterval);
    startAutoPlay();
}

// === LÓGICA DE SWIPE (DESLIZAR) ===
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    endX = startX; 
});

track.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

track.addEventListener('touchend', () => {
    const threshold = 50; 
    const diffX = startX - endX;

    if (diffX > threshold) {
        moveSlide(1);
        resetAutoPlay();
    } else if (diffX < -threshold) {
        moveSlide(-1);
        resetAutoPlay();
    }
});

// === INICIA TUDO ===
createDots();      // Cria os pontinhos na tela
startAutoPlay();   // Inicia a rotação automática