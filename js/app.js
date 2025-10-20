// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Scroll suave para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- FORMULARIO CONTACTO AJAX ---
    const form = document.querySelector('.form-contacto');
    if (form) {
        const statusMessage = document.createElement('p');
        statusMessage.classList.add('form-status');
        form.appendChild(statusMessage);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    statusMessage.textContent = "✅ Mensaje enviado con éxito. ¡Gracias por contactarnos!";
                    statusMessage.style.color = "green";
                    form.reset();
                } else {
                    statusMessage.textContent = "⚠️ Hubo un error al enviar tu mensaje. Intenta nuevamente.";
                    statusMessage.style.color = "red";
                }
            } catch (error) {
                statusMessage.textContent = "⚠️ Hubo un error al enviar tu mensaje. Intenta nuevamente.";
                statusMessage.style.color = "red";
                console.error(error);
            }
        });
    }



    // --- EXPANDIR IMÁGENES AL HACER CLICK ---
    // Solo seleccionar imágenes dentro de las páginas de artículos, NO del index
    const articleImages = document.querySelectorAll('.article-page article img, .article-page aside img');
    
    articleImages.forEach(img => {
        // Agregar cursor pointer para indicar que es clickeable
        img.style.cursor = 'pointer';
        
        // Función para expandir la imagen
        const expandImage = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Crear overlay oscuro
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: zoom-out;
                animation: fadeIn 0.3s ease;
            `;

            // Crear imagen expandida
            const expandedImg = document.createElement('img');
            expandedImg.src = img.src;
            expandedImg.alt = img.alt;
            expandedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.3s ease;
            `;

            // Crear botón de cerrar
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '✕';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.2);
                border: 2px solid white;
                color: white;
                font-size: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10000;
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
                closeBtn.style.transform = 'scale(1.1)';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                closeBtn.style.transform = 'scale(1)';
            });

            // Función para cerrar
            const closeOverlay = () => {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                    document.body.style.overflow = 'auto';
                }, 300);
            };

            // Eventos para cerrar (click y touch)
            closeBtn.addEventListener('click', closeOverlay);
            closeBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                closeOverlay();
            });
            
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeOverlay();
                }
            });
            
            overlay.addEventListener('touchend', (e) => {
                if (e.target === overlay) {
                    e.preventDefault();
                    closeOverlay();
                }
            });
            
            // Cerrar con tecla ESC
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeOverlay();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);

            // Agregar elementos al overlay
            overlay.appendChild(expandedImg);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            
            // Prevenir scroll del body
            document.body.style.overflow = 'hidden';
        };
        
        // Agregar eventos click y touch
        img.addEventListener('click', expandImage);
        img.addEventListener('touchend', expandImage);
    });

    // Agregar animaciones CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes zoomIn {
            from { 
                transform: scale(0.8);
                opacity: 0;
            }
            to { 
                transform: scale(1);
                opacity: 1;
            }
        }
        
        /* Mejorar el comportamiento táctil en móviles */
        .article-page article img, 
        .article-page aside img {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
        }
    `;
    document.head.appendChild(style);













     







});
