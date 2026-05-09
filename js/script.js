document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.querySelector('i').classList.remove('ph-x');
                mobileBtn.querySelector('i').classList.add('ph-list');
            });
        });
    }

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Number Counter Animation
    const stats = document.querySelectorAll('.stat-value[data-target]');
    let hasCounted = false;

    const startCounting = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    // check if it needs to add "M" or "+" 
                    let displayValue = Math.ceil(current);
                    if (target === 380) stat.innerText = `+R$ ${displayValue}M`;
                    else stat.innerText = `+${displayValue}`;
                    
                    requestAnimationFrame(updateCount);
                } else {
                    if (target === 380) stat.innerText = `+R$ ${target}M`;
                    else stat.innerText = `+${target}`;
                }
            };
            updateCount();
        });
    };

    // Check if stats are in view
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                setTimeout(startCounting, 500); // Slight delay for effect
            }
        });
        statsObserver.observe(statsSection);
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // If mobile menu is open, close it (dummy implementation for now)
            }
        });
    });

});

// Simulator Logic
function simulateEconomy() {
    const btn = document.querySelector('#sim-form button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Animate button
    btn.innerHTML = '<i class="ph-bold ph-spinner" style="animation: spin 1s linear infinite;"></i> CALCULANDO...';
    btn.disabled = true;

    setTimeout(() => {
        const billValue = parseFloat(document.getElementById('bill-value').value);
        if (isNaN(billValue) || billValue <= 0) {
            alert('Por favor, insira um valor válido da conta.');
            btn.innerHTML = originalText;
            btn.disabled = false;
            return;
        }

        // Calculation logic (Example: 20% average savings)
        const avgSavingPercent = 0.20;
        const monthlySaving = billValue * avgSavingPercent;
        const yearlySaving = monthlySaving * 12;

        // Update DOM
        document.getElementById('monthly-saving').innerText = monthlySaving.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        document.getElementById('yearly-saving').innerText = yearlySaving.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Show result, hide form
        document.getElementById('sim-form').style.display = 'none';
        document.getElementById('sim-result').classList.remove('hidden');

    }, 1500); // Fake delay for UX
}

// Add keyframes for spinner if not in css
const style = document.createElement('style');
style.innerHTML = `
@keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(style);

// VTurb Video Logic
function playVturbVideo(containerElement) {
    const video = containerElement.querySelector('video');
    const overlay = containerElement.querySelector('.vturb-overlay');
    
    if (video && overlay) {
        video.currentTime = 0; // Reinicia o vídeo
        video.muted = false;   // Ativa o som
        video.loop = false;    // Desativa o loop
        video.play();          // Garante que continue tocando
        video.setAttribute('controls', 'true');
        overlay.style.display = 'none';
        
        // Remove click logic so video controls can be used freely
        containerElement.style.cursor = 'default';
        containerElement.onclick = null;
    }
}
