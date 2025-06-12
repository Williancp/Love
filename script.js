// Variáveis globais
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
let slideInterval;

// Data de início do relacionamento (ajuste conforme necessário)
const relationshipStart = new Date('2019-12-07'); // Altere para a data real

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    startCounter();
    createParticles();
    initializeScrollAnimations();
    startAutoSlide();
});

// Função para rolar suavemente para uma seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Inicializar carrossel
function initializeCarousel() {
    if (slides.length === 0) return;
    
    showSlide(0);
    
    // Adicionar event listeners para navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
}

// Mudar slide do carrossel
function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Ir para slide específico
function goToSlide(slideIndex) {
    currentSlideIndex = slideIndex;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Mostrar slide específico
function showSlide(slideIndex) {
    const wrapper = document.querySelector('.carousel-wrapper');
    if (!wrapper) return;
    
    // Remover classe active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Adicionar classe active ao slide e indicador atuais
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    if (indicators[slideIndex]) {
        indicators[slideIndex].classList.add('active');
    }
    
    // Mover o wrapper
    wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
}

// Auto slide
function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Muda slide a cada 5 segundos
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// Contador de tempo juntos
function startCounter() {
    function updateCounter() {
        const now = new Date();
        const diff = now - relationshipStart;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Animar números
        animateNumber('days-counter', days);
        animateNumber('hours-counter', hours);
        animateNumber('minutes-counter', minutes);
        animateNumber('seconds-counter', seconds);
    }
    
    updateCounter();
    setInterval(updateCounter, 1000);
}

// Animar números do contador
function animateNumber(elementId, targetNumber) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentNumber = parseInt(element.textContent) || 0;
    
    if (currentNumber !== targetNumber) {
        element.textContent = targetNumber;
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// Criar partículas flutuantes
function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 5 + 3) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Cores aleatórias românticas
        const colors = ['#ff6b9d', '#c44569', '#ffeb3b', '#ff9800', '#e91e63'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(particle);
        
        // Remover partícula após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }
    
    // Criar partículas periodicamente
    for (let i = 0; i < 20; i++) {
        createParticle();
    }
    setInterval(createParticle, 500);
}

// Animações ao rolar a página
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll(
        '.timeline-item, .promise-card, .counter-item, .message-card'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Modal de surpresa
function showSurprise() {
    const modal = document.getElementById('surprise-modal');
    if (modal) {
        modal.style.display = 'block';
        createConfetti();
    }
}

function closeSurprise() {
    const modal = document.getElementById('surprise-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Criar efeito de confete
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    
    // Limpar confetes existentes
    container.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 3000);
    }
}

// Cores aleatórias para confete
function getRandomColor() {
    const colors = ['#ffeb3b', '#ff9800', '#e91e63', '#9c27b0', '#2196f3', '#4caf50', '#ff5722'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('surprise-modal');
    if (event.target === modal) {
        closeSurprise();
    }
}

// Adicionar estilos dinâmicos para o modal
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
    }
    
    .modal-content {
        background-color: #fff;
        margin: 10% auto;
        padding: 20px;
        border-radius: 10px;
        width: 80%;
        max-width: 500px;
        position: relative;
        text-align: center;
    }
    
    .close-modal {
        position: absolute;
        right: 15px;
        top: 10px;
        font-size: 24px;
        cursor: pointer;
    }
    
    .confetti {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #f00;
        animation: confettiFall 3s linear forwards;
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(500px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(modalStyle);

// Adicionar estilos para o carrossel
const carouselStyle = document.createElement('style');
carouselStyle.textContent = `
    .carousel-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .carousel-wrapper {
        display: flex;
        transition: transform 0.5s ease;
    }
    
    .carousel-slide {
        min-width: 100%;
        position: relative;
    }
    
    .carousel-slide img {
        width: 100%;
        height: 500px;
        object-fit: cover;
    }
    
    .carousel-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.5);
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 10;
    }
    
    .prev-btn {
        left: 15px;
    }
    
    .next-btn {
        right: 15px;
    }
    
    .carousel-indicators {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
    }
    
    .indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255,255,255,0.5);
        cursor: pointer;
    }
    
    .indicator.active {
        background: #fff;
    }
`;
document.head.appendChild(carouselStyle);

console.log('💖 Site do Dia dos Namorados carregado com amor! 💖');