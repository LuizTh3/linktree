let currentSlide = 0;
        const track = document.getElementById('promo-carousel');
        const slides = document.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;

        function moveSlide(direction) {
            currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
            updateCarousel();
        }

        function updateCarousel() {
            // Move a trilha para a esquerda baseado no índice atual
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Opcional: Faz o carrossel passar as fotos sozinho a cada 3 segundos
        setInterval(() => {
            moveSlide(1);
        }, 4500);