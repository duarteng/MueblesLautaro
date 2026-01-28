
document.addEventListener('DOMContentLoaded', () => {
    createCarrusel('carrusel', "carrusel__slides", "dot");
})

/**
 * carruselId = Toma el ID del contenedor en donde se va a mostrar el Carrusel
 * classSlides = Toma la Class del contenedor de la Imagen
 * classDots = Toma la Class del dot (span)
 * autoSlideInterval = Parametro por default, su valor es = 5s
 * 
 *** adjustSlideIndex() = 
*/
export default function createCarrusel(carruselId, classSlides, classDots, autoSlideInterval = 5000) {
    const carousel = document.getElementById(carruselId);
    const slides = carousel.getElementsByClassName(classSlides);
    const dots = carousel.getElementsByClassName(classDots);
    let currentSlideIndex = 1;
    let autoSlideTimer;

    function adjustSlideIndex(requestedIndex, totalSlides) {
        return requestedIndex > totalSlides ? 1 : requestedIndex < 1 ? totalSlides : requestedIndex;
    }

    function showSlide(slideIndex) {
        currentSlideIndex = adjustSlideIndex(slideIndex, slides.length);
        Array.from(slides).forEach((slide, index) => {
            slide.style.display = (index + 1 === currentSlideIndex) ? "block" : "none";
        });
        Array.from(dots).forEach((dot, index) => {
            dot.className = (index + 1 === currentSlideIndex) ? "dot active" : "dot";
        });
    }

    function navigateSlides(direction) {
        clearInterval(autoSlideTimer);
        showSlide(currentSlideIndex + direction);
        startAutoSlide();
    }

    function goToSlide(slideIndex) {
        clearInterval(autoSlideTimer);
        showSlide(slideIndex);
        startAutoSlide();
    }

    function startAutoSlide() {
        autoSlideTimer = setInterval(() => navigateSlides(1), autoSlideInterval);
    }

    function handleSwipeEvent() {
        let startX, endX = null;
        const swipeThreshold = 50;

        carousel.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        }, {passive: true});

        carousel.addEventListener('touchmove', e => {
            endX = e.touches[0].clientX;
        }, {passive: true});

        carousel.addEventListener('touchend', e => {
            if (startX === null || endX === null) {
                return; // Asegura que ninguna posición sea nula
            }
            if (Math.abs(startX - endX) > swipeThreshold) {
                if (startX - endX > 0) {
                    // Swipe hacia la izquierda, siguiente imagen
                    navigateSlides(1);
                } else {
                    // Swipe hacia la derecha, imagen anterior
                    navigateSlides(-1);
                }
            }
            // Reiniciar valores
            startX = null;
            endX = null;
        }, {passive: true});
    }

    carousel.querySelector('.prev').addEventListener('click', () => navigateSlides(-1));
    carousel.querySelector('.next').addEventListener('click', () => navigateSlides(1));
    Array.from(dots).forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index + 1));
    });

    // Initialize
    showSlide(currentSlideIndex);
    startAutoSlide();
    handleSwipeEvent();

    // Public methods
    return {
        next: () => navigateSlides(1),
        prev: () => navigateSlides(-1),
        goTo: (slideIndex) => goToSlide(slideIndex)
    };
}