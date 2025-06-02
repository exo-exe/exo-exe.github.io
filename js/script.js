document.addEventListener('DOMContentLoaded', () => {
    function detectDeviceType() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Simple regex to detect common mobile OS
        if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            document.body.classList.add('is-mobile');
            document.body.classList.remove('is-desktop');
            console.log("Device detected: Mobile");
        } else {
            document.body.classList.add('is-desktop');
            document.body.classList.remove('is-mobile');
            console.log("Device detected: Desktop");
        }
    }


    detectDeviceType();
    window.addEventListener('resize', detectDeviceType);


    const pageTransitionOverlay = document.getElementById('page-transition-overlay');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            console.log('Clicked anchor:', this);
            console.log('Target ID:', targetId);
            console.log('Target Element:', targetElement);

            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.warn('Target element not found for ID:', targetId);
            }


            const nav = document.querySelector('.nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !link.target && !link.download) {
            link.addEventListener('click', function(e) {
                const newPageURL = this.href;
                e.preventDefault();

                pageTransitionOverlay.style.visibility = 'visible';
                pageTransitionOverlay.style.opacity = '1';

                setTimeout(() => {
                    window.location.href = newPageURL;
                }, 300);
            });
        }
    });

    if (pageTransitionOverlay) {
        window.addEventListener('load', () => {
            pageTransitionOverlay.style.opacity = '0';
            pageTransitionOverlay.style.visibility = 'hidden';
        });
    }

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    const rotatingTexts = [
        "CTF Enthusiast",
        "Infosec Student",
        "Threat Hunter",
        "Ethical Hacker",
        "Puzzle Breaker",
        "Linux Tinkerer",
        "Digital Sleuth"
    ];
    const rotatingTextElement = document.getElementById('rotating-text');
    const heroTypingCursor = document.getElementById('typing-cursor');
    let currentTextIndex = 0;
    let charIndex = 0;
    const typingSpeed = 70;
    const erasingSpeed = 40;
    const delayBeforeErase = 1500;
    const delayBeforeNextType = 500;

    function typeHeroText() {
        const currentText = rotatingTexts[currentTextIndex];
        if (charIndex < currentText.length) {
            rotatingTextElement.textContent += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(typeHeroText, typingSpeed);
        } else {
            heroTypingCursor.style.opacity = '1';
            setTimeout(eraseHeroText, delayBeforeErase);
        }
        heroTypingCursor.style.opacity = '1';
    }

    function eraseHeroText() {
        const currentText = rotatingTexts[currentTextIndex];
        if (charIndex > 0) {
            rotatingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseHeroText, erasingSpeed);
        } else {
            currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
            setTimeout(typeHeroText, delayBeforeNextType);
        }
    }

    setTimeout(() => {
        typeHeroText();
    }, 1500);


    const logoTexts = [
        "exo-exe",
        "Olly Wright"
    ];
    const logoTextElement = document.getElementById('header-logo').querySelector('.logo-text');
    const logoCursor = document.getElementById('header-logo').querySelector('.blink-cursor');
    let currentLogoIndex = 0;
    let logoCharIndex = 0;
    const logoTypingSpeed = 100;
    const logoErasingSpeed = 50;
    const logoDelayBeforeErase = 2500;
    const logoDelayBeforeNextType = 1000;

    function typeLogoText() {
        const currentLogoText = logoTexts[currentLogoIndex];
        if (logoCharIndex < currentLogoText.length) {
            logoTextElement.textContent += currentLogoText.charAt(logoCharIndex);
            logoCharIndex++;
            setTimeout(typeLogoText, logoTypingSpeed);
        } else {
            logoCursor.style.opacity = '1';
            setTimeout(eraseLogoText, logoDelayBeforeErase);
        }
        logoTextElement.style.opacity = '1';
        logoCursor.style.opacity = '1';
    }

    function eraseLogoText() {
        const currentLogoText = logoTexts[currentLogoIndex];
        if (logoCharIndex > 0) {
            logoTextElement.textContent = currentLogoText.substring(0, logoCharIndex - 1);
            logoCharIndex--;
            setTimeout(eraseLogoText, logoErasingSpeed);
        } else {
            currentLogoIndex = (currentLogoIndex + 1) % logoTexts.length;
            setTimeout(typeLogoText, logoDelayBeforeNextType);
        }
    }

    setTimeout(() => {
        typeLogoText();
    }, 500);


    const canvas = document.getElementById('matrix-background');
    const ctx = canvas.getContext('2d');

    let animationFrameId;

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    setCanvasSize();

    window.addEventListener('resize', setCanvasSize);

    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function drawMatrixRain() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px Source Code Pro`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }

        animationFrameId = requestAnimationFrame(drawMatrixRain);
    }

    drawMatrixRain();


    const revealItems = document.querySelectorAll('.reveal-item');

    console.log('Number of reveal items found:', revealItems.length);

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealItems.forEach(item => {
        observer.observe(item);
    });

    console.log("%cSystem.log: Initiating connection to digital matrix...", "color: #00ff41; font-family: 'Source Code Pro', monospace; font-size: 1.2em;");
    console.log("%cSystem.log: Access granted. Keep your eyes open, agent.", "color: #33ff77; font-family: 'Source Code Pro', monospace; font-size: 1.1em;");
    console.log("%cSystem.log: Some secrets are not meant for the surface web. Check the source for clues.", "color: #77ff99; font-family: 'Source Code Pro', monospace; font-size: 0.9em;");

    const konamiCode = [
        'arrowup', 'arrowup',
        'arrowdown', 'arrowdown',
        'arrowleft', 'arrowright',
        'arrowleft', 'arrowright',
        'b', 'a'
    ];
    var konamiCodePosition = 0;

    document.addEventListener('keydown', (e) => {
        const pressedKey = e.key.toLowerCase(); 
        if (pressedKey == konamiCode[konamiCodePosition].toLowerCase()) {
            konamiCodePosition++;
            if (konamiCodePosition == konamiCode.length) {
                console.log("%cKonami Code Activated!", "color: yellow; font-size: 2em; text-shadow: 0 0 10px yellow;");
                const messageBox = document.createElement('div');
                messageBox.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(0, 0, 0, 0.9);
                    border: 2px solid #00ff41;
                    padding: 20px;
                    color: #00ff41;
                    font-family: 'Source Code Pro', monospace;
                    text-align: center;
                    box-shadow: 0 0 20px rgba(0, 255, 65, 0.7);
                    z-index: 10000;
                    border-radius: 8px;
                    max-width: 80%;
                `;
                messageBox.innerHTML = `
                    <p style="font-size: 1.2em; margin-bottom: 15px;">// ACCESS GRANTED // <br> Well done finding on finding this easter egg.</p>
                    <button onclick="this.parentNode.remove()" style="
                        background-color: #00ff41;
                        color: #000;
                        border: none;
                        padding: 10px 20px;
                        cursor: pointer;
                        border-radius: 5px;
                        font-size: 1em;
                        transition: background-color 0.3s ease;
                    ">OK</button>
                `;
                document.body.appendChild(messageBox);
                konamiCodePosition = 0;
            }
        } else {
            konamiCodePosition = 0;
        }
    });

});
