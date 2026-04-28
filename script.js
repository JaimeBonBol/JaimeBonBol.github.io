// ====== Smooth Scroll Para Links ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetAttr = this.getAttribute('href');
        if (targetAttr && targetAttr !== '#') {
            const targetEl = document.querySelector(targetAttr);
            if (targetEl) {
                mobileMenu.classList.remove('open');
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ====== Intersection Observer (Scroll Animations) ======
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden-scroll').forEach(el => observer.observe(el));

// ====== Lógica de Hamburguesa Menú ======
const hamburgerBtn = document.querySelector('.hamburger-menu');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });
}

// ====== Lógica de Expansion Tech Stack ======
// Oculta/Muestra los LI categorizados como 'extra-tech' 
const techGrid = document.getElementById('techGrid');
const showMoreTechBtn = document.getElementById('showMoreTechBtn');

if (showMoreTechBtn && techGrid) {
    showMoreTechBtn.addEventListener('click', () => {
        techGrid.classList.toggle('expanded');
        // Alternativamente reciclar el botón para toggle
        if (techGrid.classList.contains('expanded')) {
            showMoreTechBtn.textContent = 'Ver menos';
        } else {
            showMoreTechBtn.textContent = 'Ver todo el ecosistema';
        }
    });
}

// ====== Lógica de Filtro de Proyectos ====== //
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0 && projectCards.length > 0) {
    // Lógica de Filtrado de Botones
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                // Al dividir por espacio permitimos multiples categorías eje: data-category="backend frontend"
                const matches = filterValue === 'all' || category.split(' ').includes(filterValue);
                
                if (matches) {
                    card.classList.remove('hidden-project'); 
                    setTimeout(() => {
                        card.classList.remove('hiding'); 
                    }, 20); 
                } else {
                    card.classList.add('hiding'); 
                    setTimeout(() => {
                        card.classList.add('hidden-project'); 
                    }, 300); 
                }
            });
        });
    });
}


// ====== Modal de Certificaciones ====== //
const certCircles = document.querySelectorAll('.cert-circle');
const certModal = document.getElementById('certModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

if (certModal && certCircles.length > 0) {
    certCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            const title = circle.getAttribute('data-title');
            const desc = circle.getAttribute('data-desc');
            
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            certModal.classList.add('active');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        certModal.classList.remove('active');
    });

    // Cerrar al hacer clic fuera del modal
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) {
            certModal.classList.remove('active');
        }
    });
}

// ====== Volver Arriba ======
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.6) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====== Botones Magnéticos ======
const magneticButtons = document.querySelectorAll('.mag-btn');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = `translate(0px, 0px)`;
    });
});

// ====== Canvas Terrain Waves ======
const canvas = document.getElementById('hero-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Performance optimization: cache gradients
    const numLines = 20; // Reducido para evitar lag crítico
    let cachedGradients = [];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Re-cache gradients when resized
        cachedGradients = [];
        for (let i = 0; i < numLines; i++) {
            const progress = i / numLines;
            const alpha = Math.max(0, 0.7 - progress * 0.6); 
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            gradient.addColorStop(0, `rgba(56, 189, 248, 0)`); 
            gradient.addColorStop(0.2, `rgba(56, 189, 248, ${alpha})`);
            gradient.addColorStop(0.8, `rgba(59, 130, 246, ${alpha})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, 0)`); 
            cachedGradients.push(gradient);
        }
    }
    
    // Performance optimization: Debounce resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 150);
    });
    resizeCanvas();
    
    // Performance optimization: Pause animation if not in viewport
    let isCanvasVisible = true;
    let animationFrameId = null;

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            isCanvasVisible = entries[0].isIntersecting;
            if (isCanvasVisible) {
                // Restart animation loop if we just became visible
                if (!animationFrameId) {
                    drawWaves(); 
                }
            } else {
                // Stop the loop completely
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            }
        }, { threshold: 0.05 });
        observer.observe(heroSection);
    }

    let time = 0;

    function drawWaves() {
        if (!isCanvasVisible) return; // Ultimate safeguard

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 1.5;
        
        for (let i = 0; i < numLines; i++) {
            ctx.beginPath();
            
            // Progreso lineal para transparencia, pero para posicionamiento 3D usamos curva (perspectiva)
            const progress = i / numLines; // 0 to 1
            const perspective = Math.pow(progress, 2); // Agrupa líneas en la lejanía (3D)
            
            ctx.strokeStyle = cachedGradients[i];
            
            // Y base de la linea: empezamos mucho más abajo (75%) para despejar el texto
            const base_y = height * 0.75 + (perspective * height * 0.25);
            
            for (let x = 0; x <= width; x += 35) { // Aumentado step de 15 a 35 para aliviar la GPU
                const xNormalized = (x / width) * 2 - 1; // -1 (izq) a 1 (der)
                
                // Efecto "Valle" 3D: Los bordes suben fuertemente, y suben más en líneas más cercanas
                const valleyEffect = Math.pow(Math.abs(xNormalized), 2.2);
                const valleyHeight = height * 0.4 + (perspective * height * 0.2); 
                
                // Animación de honda (Amplitud afectada por perspectiva para que al fondo se muevan menos)
                const wave1 = Math.sin(x * 0.002 + time + i * 0.05) * 45 * (1 - valleyEffect * 0.5);
                const wave2 = Math.cos(x * 0.005 - time * 0.5 + i * 0.08) * 25;
                const wave3 = Math.sin(x * 0.01 + time * 0.8) * 10;
                
                // Amplitud combinada multiplicada por la perspectiva (más plano de lejos, más revuelto de cerca)
                const yOffset = (wave1 + wave2 + wave3) * (0.2 + perspective * 0.8);
                const y = base_y - (valleyEffect * valleyHeight) + yOffset;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        
        time += 0.015;
        animationFrameId = requestAnimationFrame(drawWaves);
    }
    
    drawWaves();
}

// ====== Efecto Máquina de Escribir (Subtítulo) ======
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.innerHTML = ''; // Limpiamos texto inicial
    
    // Lo ocultamos al inicio evitando saltos (opacity se manejará por CSS)
    subtitle.style.opacity = '1';
    
    // Creamos un cursor simulado
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s step-end infinite';
    cursor.style.color = 'var(--accent)';
    cursor.style.fontWeight = 'bold';
    
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            // Insertar caracter
            const charSpan = document.createElement('span');
            charSpan.textContent = text.charAt(i);
            
            // Si el cursor ya está, meter la letra justo antes
            if (subtitle.contains(cursor)) {
                subtitle.insertBefore(charSpan, cursor);
            } else {
                subtitle.appendChild(charSpan);
                subtitle.appendChild(cursor); // Añadir cursor al final
            }
            
            i++;
            // Velocidad de tecleo variable
            setTimeout(typeWriter, Math.random() * 30 + 15);
        } else {
            // Dejar el cursor un rato y luego quitarlo
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 3000);
        }
    }
    
    // Esperar a que la página cargue un poco para empezar a escribir
    setTimeout(typeWriter, 500);
}

