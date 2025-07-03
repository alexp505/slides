document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.genai-card, .tool-card, .participant-card, .agent-card'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Chatbot simulation
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const messages = [
        { type: 'user', text: 'Помоги создать веб-приложение', delay: 0 },
        { type: 'agent analyst', text: 'Аналитик: Анализирую требования...', delay: 1000 },
        { type: 'agent executor', text: 'Исполнитель: Генерирую код...', delay: 2000 },
        { type: 'agent controller', text: 'Контролер: Проверяю качество...', delay: 3000 }
    ];
    
    function simulateChatbot() {
        // Clear existing messages
        chatbotMessages.innerHTML = '';
        
        messages.forEach((message, index) => {
            setTimeout(() => {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${message.type}`;
                messageElement.innerHTML = `<span>${message.text}</span>`;
                chatbotMessages.appendChild(messageElement);
                
                // Scroll to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, message.delay);
        });
    }
    
    // Start chatbot simulation when section is visible
    const chatbotSection = document.getElementById('project');
    const chatbotObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(simulateChatbot, 500);
                chatbotObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    chatbotObserver.observe(chatbotSection);
    
    // Floating animation for hero card
    const floatingCard = document.querySelector('.floating-card');
    if (floatingCard) {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCard() {
            const rect = floatingCard.getBoundingClientRect();
            const cardX = rect.left + rect.width / 2;
            const cardY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - cardX) * 0.01;
            const deltaY = (mouseY - cardY) * 0.01;
            
            floatingCard.style.transform = `translate(${deltaX}px, ${deltaY}px) rotateY(${deltaX * 0.5}deg) rotateX(${-deltaY * 0.5}deg)`;
            
            requestAnimationFrame(animateCard);
        }
        
        animateCard();
    }
    
    // Parallax effect for sections
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual, .tool-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            if (target === '10x' || target === '∞') return;
            
            const targetNum = parseInt(target);
            let current = 0;
            const increment = targetNum / 50;
            
            const updateCounter = () => {
                if (current < targetNum) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero');
    heroObserver.observe(heroSection);
});