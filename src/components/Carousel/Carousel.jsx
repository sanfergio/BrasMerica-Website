import React, { useState, useEffect, useRef, useCallback } from 'react';

// ==========================
// CSS inline
// ==========================
const carouselCss = `
    .carousel-container {
        width: 100vw;   
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        height: 45vh;
        background-color: #f4f4f5;
        position: relative;
    }

    .carousel-inner {
        border-radius: 10px;
        width: 95%;
        max-width: 96rem;
        height: 100%;
        position: relative;
        touch-action: pan-y;
    }

    .carousel-item {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 500ms;
        pointer-events: none;
    }

    .carousel-item.active {
        opacity: 1;
        pointer-events: auto;
    }

    .carousel-item img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        display: block;
    }

    .carousel-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 9999px;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 0.5rem;
        color: #09090b;
        transition: background-color 200ms;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }

    .carousel-button:hover {
        background-color: rgba(255, 255, 255, 1);
    }

    .carousel-button-prev {
        left: 1rem;
    }

    .carousel-button-next {
        right: 1rem;
    }

    .carousel-button svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    .carousel-dots {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
        z-index: 10;
    }

    .carousel-dot {
        height: 0.5rem;
        width: 0.5rem;
        border-radius: 9999px;
        background-color: #f5f5f5;
        transition: all 200ms;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .carousel-dot:hover {
        background-color: #ccc;
    }

    .carousel-dot.active {
        background-color: #ccc;
        width: 2rem;
    }
`;

// ==========================
// Imagens
// ==========================

const carouselImagesDesktop = [
    { src: "https://riodejaneiro.pernambucomotos.com.br//k/banners/2102113.png", href: "#", alt: "" },
    { src: "https://riodejaneiro.pernambucomotos.com.br//k/banners/6265448.png", href: "#", alt: "" },
];

const carouselImagesMobile = [
    { src: "https://riodejaneiro.pernambucomotos.com.br//k/banners/2221742.png", href: "#", alt: "" },
    { src: "https://riodejaneiro.pernambucomotos.com.br//k/banners/6264980.png", href: "#", alt: "" },
];

// ==========================
// Configurações
// ==========================
const autoPlayTime = 5000;
const swipeThreshold = 50;

// Debounce
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// ==========================
// Componente
// ==========================
const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentImages, setCurrentImages] = useState(
        window.innerWidth <= 768 ? carouselImagesMobile : carouselImagesDesktop
    );

    const autoPlayIntervalRef = useRef(null);
    const touchStartX = useRef(0);
    const lastWindowWidth = useRef(window.innerWidth);

    const goToNext = useCallback(() => {
        setCurrentIndex(prevIndex =>
            prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
        );
    }, [currentImages.length]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
        );
    }, [currentImages.length]);

    const goToSlide = index => {
        setCurrentIndex(index);
    };

    const startAutoPlay = useCallback(() => {
        if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = setInterval(goToNext, autoPlayTime);
    }, [goToNext]);

    const resetAutoPlay = useCallback(() => {
        startAutoPlay();
    }, [startAutoPlay]);

    useEffect(() => {
        startAutoPlay();
        return () => {
            if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
        };
    }, [startAutoPlay]);

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const isMobileNow = newWidth <= 768;
            const wasMobile = lastWindowWidth.current <= 768;

            if (isMobileNow !== wasMobile) {
                setCurrentImages(isMobileNow ? carouselImagesMobile : carouselImagesDesktop);
                setCurrentIndex(0);
            }
            lastWindowWidth.current = newWidth;
        };

        const debouncedHandleResize = debounce(handleResize, 250);
        window.addEventListener('resize', debouncedHandleResize);

        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, []);

    const handlePrevClick = () => {
        goToPrevious();
        resetAutoPlay();
    };

    const handleNextClick = () => {
        goToNext();
        resetAutoPlay();
    };

    const handleDotClick = index => {
        goToSlide(index);
        resetAutoPlay();
    };

    const handleTouchStart = e => {
        touchStartX.current = e.changedTouches[0].screenX;
        if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };

    const handleTouchEnd = e => {
        const touchEndX = e.changedTouches[0].screenX;

        if (touchEndX < touchStartX.current - swipeThreshold) goToNext();
        else if (touchEndX > touchStartX.current + swipeThreshold) goToPrevious();

        resetAutoPlay();
    };

    return (
        <>
            <style>{carouselCss}</style>

            <div className="carousel-container">
                <div
                    className="carousel-inner"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {currentImages.map((image, index) => (
                        <a
                            key={image.src}
                            href={image.href}
                            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                            aria-hidden={index !== currentIndex}
                        >
                            <img src={image.src} alt={image.alt} />
                        </a>
                    ))}

                    <button
                        className="carousel-button carousel-button-prev"
                        onClick={handlePrevClick}
                        aria-label="Previous image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <button
                        className="carousel-button carousel-button-next"
                        onClick={handleNextClick}
                        aria-label="Next image"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>

                    <div className="carousel-dots">
                        {currentImages.map((_, index) => (
                            <button
                                key={index}
                                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(index)}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carousel;
