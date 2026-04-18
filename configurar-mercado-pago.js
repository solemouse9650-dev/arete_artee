// Script para configurar Mercado Pago dinámicamente
// Este script obtiene la public key del backend y configura Mercado Pago

async function configurarMercadoPago() {
    try {
        // Obtener la public key del backend
        const response = await fetch('/api/mercadopago/public-key');
        const data = await response.json();
        
        if (data.success) {
            // Inicializar Mercado Pago con la public key del servidor
            window.mp = new MercadoPago(data.public_key, {
                locale: 'es-AR'
            });
            console.log('Mercado Pago configurado correctamente');
        } else {
            console.error('Error al obtener la public key de Mercado Pago');
        }
    } catch (error) {
        console.error('Error al configurar Mercado Pago:', error);
    }
}

// Llamar a la configuración cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', configurarMercadoPago);
