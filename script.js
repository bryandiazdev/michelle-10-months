// Global variables
let currentScreen = 0;
let currentQuestion = 1;
let currentPhoto = 0;
let quizScore = 0;
let isTransitioning = false;

const screens = [
    'welcome-screen',
    'anniversary-screen', 
    'quiz-screen',
    'gallery-screen',
    'dreams-screen',
    'final-screen'
];

const totalPhotos = 4;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupTouchGestures();
    setupKeyboardNavigation();
    createFloatingElements();
});

function initializeWebsite() {
    // Add entrance animations
    setTimeout(() => {
        document.querySelector('.welcome-content').style.animation = 'fadeInUp 1s ease-out';
    }, 500);
    
    // Initialize carousel dots
    updateCarouselDots();
    
    // Add timeline animations when anniversary screen becomes active
    setupTimelineAnimations();
    
    // Setup quiz functionality
    setupQuiz();
    
    // Add sparkle effects
    createSparkles();
}

// Screen Navigation
function nextScreen() {
    if (isTransitioning) return;
    
    if (currentScreen < screens.length - 1) {
        isTransitioning = true;
        
        // Special handling for quiz screen
        if (currentScreen === 2 && currentQuestion <= 3) {
            // Don't advance screen, just continue quiz
            isTransitioning = false;
            return;
        }
        
        transitionToScreen(currentScreen + 1);
    }
}

function transitionToScreen(screenIndex) {
    const currentScreenEl = document.getElementById(screens[currentScreen]);
    const nextScreenEl = document.getElementById(screens[screenIndex]);
    
    // Add exit animation to current screen
    currentScreenEl.classList.add('prev');
    currentScreenEl.classList.remove('active');
    
    // Add entrance animation to next screen
    setTimeout(() => {
        nextScreenEl.classList.add('active');
        currentScreen = screenIndex;
        
        // Trigger screen-specific animations
        triggerScreenAnimations(screenIndex);
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }, 100);
}

function triggerScreenAnimations(screenIndex) {
    switch(screenIndex) {
        case 1: // Anniversary screen
            animateTimeline();
            break;
        case 2: // Quiz screen
            resetQuiz();
            break;
        case 3: // Gallery screen
            resetGallery();
            break;
        case 4: // Dreams screen
            animateDreamCards();
            break;
        case 5: // Final screen
            animatePromises();
            createFinalHearts();
            break;
    }
}

// Timeline Animations
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${0.2 + (index * 0.2)}s`;
    });
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'slideInLeft 0.8s ease-out forwards';
        }, index * 200);
    });
}

// Quiz Functionality
function setupQuiz() {
    // Initialize first question
    updateProgressBar();
}

function selectAnswer(button, isCorrect) {
    const options = button.parentElement.querySelectorAll('button');
    
    // Disable all buttons
    options.forEach(btn => btn.disabled = true);
    
    // Show result
    if (isCorrect) {
        button.classList.add('correct');
        quizScore++;
        createHeartBurst(button);
    } else {
        button.classList.add('incorrect');
        // Show correct answer
        options.forEach(btn => {
            if (btn.onclick.toString().includes('true')) {
                btn.classList.add('correct');
            }
        });
    }
    
    // Move to next question after delay
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

function nextQuestion() {
    if (currentQuestion < 3) {
        // Hide current question
        document.getElementById(`q${currentQuestion}`).classList.remove('active');
        
        currentQuestion++;
        
        // Show next question
        setTimeout(() => {
            document.getElementById(`q${currentQuestion}`).classList.add('active');
            updateProgressBar();
        }, 300);
    } else {
        // Quiz completed, show results and move to next screen
        setTimeout(() => {
            showQuizResults();
        }, 1000);
    }
}

function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const currentQ = document.getElementById('current-q');
    
    progressFill.style.width = `${(currentQuestion / 3) * 100}%`;
    currentQ.textContent = currentQuestion;
}

function showQuizResults() {
    const quizContainer = document.querySelector('.quiz-container');
    let message = '';
    
    if (quizScore === 3) {
        message = '💕 Perfect! You know us so well! 💕';
    } else if (quizScore === 2) {
        message = '😊 Almost perfect! You know me well! 😊';
    } else {
        message = '😄 We still have so much to learn about each other! 😄';
    }
    
    quizContainer.innerHTML = `
        <div class="quiz-result">
            <h2>${message}</h2>
            <p>You got ${quizScore} out of 3 correct!</p>
        </div>
    `;
    
    // Mark quiz as completed so nextScreen() will work
    currentQuestion = 4;
    
    setTimeout(() => {
        nextScreen();
    }, 3000);
}

function resetQuiz() {
    currentQuestion = 1;
    quizScore = 0;
    
    // Reset all questions
    document.querySelectorAll('.question').forEach((q, index) => {
        q.classList.remove('active');
        if (index === 0) q.classList.add('active');
        
        // Reset buttons
        q.querySelectorAll('button').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('correct', 'incorrect');
        });
    });
    
    updateProgressBar();
}

// Photo Gallery
function nextPhoto() {
    if (currentPhoto < totalPhotos - 1) {
        changePhoto(currentPhoto + 1);
    } else {
        changePhoto(0); // Loop back to first
    }
}

function prevPhoto() {
    if (currentPhoto > 0) {
        changePhoto(currentPhoto - 1);
    } else {
        changePhoto(totalPhotos - 1); // Loop to last
    }
}

function changePhoto(photoIndex) {
    const photos = document.querySelectorAll('.photo');
    
    photos[currentPhoto].classList.remove('active');
    photos[photoIndex].classList.add('active');
    
    currentPhoto = photoIndex;
    updateCarouselDots();
}

function updateCarouselDots() {
    const dots = document.querySelector('.carousel-dots');
    let dotsHTML = '';
    
    for (let i = 0; i < totalPhotos; i++) {
        dotsHTML += i === currentPhoto ? '●' : '○';
        if (i < totalPhotos - 1) dotsHTML += ' ';
    }
    
    dots.innerHTML = dotsHTML;
}

function resetGallery() {
    currentPhoto = 0;
    const photos = document.querySelectorAll('.photo');
    photos.forEach((photo, index) => {
        photo.classList.remove('active');
        if (index === 0) photo.classList.add('active');
    });
    updateCarouselDots();
}

// Dreams Screen
function activateDream(card) {
    // Remove active class from all cards
    document.querySelectorAll('.dream-card').forEach(c => c.classList.remove('active'));
    
    // Add active class to clicked card
    card.classList.add('active');
    
    // Create sparkle effect
    createSparkleEffect(card);
    
    // Auto-deactivate after 4 seconds
    setTimeout(() => {
        card.classList.remove('active');
    }, 4000);
}

function animateDreamCards() {
    const dreamCards = document.querySelectorAll('.dream-card');
    dreamCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, index * 200);
    });
}

// Final Screen Animations
function animatePromises() {
    const promises = document.querySelectorAll('.promise');
    promises.forEach((promise, index) => {
        promise.style.animationDelay = `${0.5 + (index * 0.5)}s`;
    });
}

function createFinalHearts() {
    const container = document.querySelector('.floating-hearts-final');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.fontSize = '20px';
        heart.style.animation = 'finalFloat 3s ease-out forwards';
        heart.style.pointerEvents = 'none';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }, 1000);
}

// Touch Gestures for Mobile
function setupTouchGestures() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (currentScreen === 3) { // Gallery screen
                if (diffX > 0) {
                    nextPhoto();
                } else {
                    prevPhoto();
                }
            }
        }
        
        startX = 0;
        startY = 0;
    });
}

// Keyboard Navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                if (currentScreen === 3) {
                    nextPhoto();
                } else {
                    nextScreen();
                }
                break;
            case 'ArrowLeft':
                if (currentScreen === 3) {
                    prevPhoto();
                }
                break;
            case 'Enter':
                nextScreen();
                break;
        }
    });
}

// Special Effects
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        heart.style.animation = `heartBurst 1s ease-out forwards`;
        heart.style.setProperty('--endX', endX + 'px');
        heart.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        sparkle.style.fontSize = '16px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkleEffect 2s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
}

function createFloatingElements() {
    // Create floating hearts periodically
    setInterval(() => {
        if (currentScreen === 0) { // Only on welcome screen
            const heart = document.createElement('div');
            heart.innerHTML = Math.random() > 0.5 ? '💕' : '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = '24px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '5';
            heart.style.animation = 'floatUp 6s linear forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }
    }, 2000);
}

function createSparkles() {
    // Add sparkle animations to various elements
    const sparkleElements = document.querySelectorAll('.main-title, .final-title');
    
    sparkleElements.forEach(element => {
        setInterval(() => {
            const sparkle = document.createElement('span');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '12px';
            sparkle.style.animation = 'sparkleEffect 2s ease-out forwards';
            sparkle.style.pointerEvents = 'none';
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }, 3000);
    });
}

// Music Control (placeholder - you can add actual audio)
function toggleMusic() {
    const button = document.getElementById('music-toggle');
    const icon = button.querySelector('i');
    const audio = document.getElementById('background-music');
    
    if (icon.classList.contains('fa-music')) {
        icon.classList.remove('fa-music');
        icon.classList.add('fa-pause');
        audio.play();
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-music');
        audio.pause();
    }
}

// Restart Journey
function restartJourney() {
    // Reset all variables
    currentScreen = 0;
    currentQuestion = 1;
    currentPhoto = 0;
    quizScore = 0;
    isTransitioning = false;
    
    // Reset all screens
    document.querySelectorAll('.screen').forEach((screen, index) => {
        screen.classList.remove('active', 'prev');
        if (index === 0) screen.classList.add('active');
    });
    
    // Reset quiz
    resetQuiz();
    
    // Reset gallery
    resetGallery();
    
    // Reset dream cards
    document.querySelectorAll('.dream-card').forEach(card => {
        card.classList.remove('active');
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(var(--endX) - 50vw), calc(var(--endY) - 50vh)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
