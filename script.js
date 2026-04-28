document.addEventListener("DOMContentLoaded", function() {
    // 1. Manejo del scroll para el enlace del menú y el botón del Hero
    const linksNosotros = document.querySelectorAll('a[href="#nosotros"]');

    linksNosotros.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetSection = document.getElementById("nosotros");

            if (targetSection) {
                // Calculamos un pequeño margen para que el menú no tape el título
                const headerOffset = 80; 
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

// Tu función de alerta para la tienda
function sendPrompt(message) {
    console.log("Prompt enviado:", message);
    alert("Función de tienda: " + message);
}