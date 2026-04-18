const nodemailer = require('nodemailer');

// Configuración del servicio de email
class EmailService {
    constructor() {
        this.contactEmail = process.env.CONTACT_EMAIL || 'SoleMouse9650@gmail.com';
        
        // Si no hay credenciales de email, usar modo de consola
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            this.transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST || 'smtp.gmail.com',
                port: process.env.EMAIL_PORT || 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            this.mode = 'email';
        } else {
            this.mode = 'console';
            console.log('Email service running in console mode - emails will be logged');
        }
    }

    async sendOrderNotification(orderData, paymentMethod = 'mercadopago') {
        try {
            const contactEmail = this.contactEmail;
            
            // Formatear el contenido del email
            const emailContent = this.formatOrderEmail(orderData, paymentMethod);
            
            if (this.mode === 'email') {
                // Modo email real
                const mailOptions = {
                    from: `"Areté Galería de Arte" <${process.env.EMAIL_USER || 'noreply@arete.com.ar'}>`,
                    to: contactEmail,
                    subject: `Nuevo Pedido - Areté Galería de Arte (${paymentMethod.toUpperCase()})`,
                    html: emailContent
                };

                // Enviar email
                const info = await this.transporter.sendMail(mailOptions);
                console.log('Email de pedido enviado:', info.messageId);
                
                return { success: true, messageId: info.messageId };
            } else {
                // Modo consola - mostrar datos completos
                console.log('\n' + '='.repeat(80));
                console.log('NUEVO PEDIDO RECIBIDO - ENVIAR A: ' + contactEmail);
                console.log('Método de Pago:', paymentMethod.toUpperCase());
                console.log('='.repeat(80));
                
                // Mostrar datos del cliente
                const customer = orderData.customer || {};
                console.log('DATOS DEL CLIENTE:');
                console.log('Nombre:', customer.name || 'No especificado');
                console.log('Email:', customer.email || 'No especificado');
                console.log('Teléfono:', customer.phone || 'No especificado');
                console.log('Dirección:', customer.address || 'No especificada');
                
                // Mostrar items del pedido
                const items = orderData.items || [];
                console.log('\nPRODUCTOS PEDIDOS:');
                items.forEach((item, index) => {
                    console.log(`${index + 1}. ${item.title || item.nombre}`);
                    console.log('   Cantidad:', item.quantity);
                    console.log('   Precio Unitario: $' + item.unit_price.toLocaleString());
                    console.log('   Subtotal: $' + (item.unit_price * item.quantity).toLocaleString());
                });
                
                // Mostrar total
                const total = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
                console.log('\nTOTAL DEL PEDIDO: $' + total.toLocaleString());
                console.log('ID del Pedido:', orderData.id || 'N/A');
                console.log('Fecha:', new Date().toLocaleString('es-AR'));
                console.log('Estado:', orderData.status || 'Pendiente');
                console.log('='.repeat(80) + '\n');
                
                return { success: true, mode: 'console', contactEmail };
            }
            
        } catch (error) {
            console.error('Error al enviar email de pedido:', error);
            return { success: false, error: error.message };
        }
    }

    async sendContactNotification(contactData) {
        try {
            const contactEmail = this.contactEmail;
            
            if (this.mode === 'email') {
                // Modo email real
                const mailOptions = {
                    from: `"Areté Galería de Arte" <${process.env.EMAIL_USER || 'noreply@arete.com.ar'}>`,
                    to: contactEmail,
                    subject: 'Nuevo Contacto - Areté Galería de Arte',
                    html: this.formatContactEmail(contactData)
                };

                const info = await this.transporter.sendMail(mailOptions);
                console.log('Email de contacto enviado:', info.messageId);
                
                return { success: true, messageId: info.messageId };
            } else {
                // Modo consola - mostrar datos completos
                console.log('\n' + '='.repeat(80));
                console.log('NUEVO CONTACTO RECIBIDO - ENVIAR A: ' + contactEmail);
                console.log('='.repeat(80));
                console.log('DATOS DE CONTACTO:');
                console.log('Nombre:', contactData.name);
                console.log('Email:', contactData.email);
                console.log('Fecha:', new Date().toLocaleString('es-AR'));
                console.log('\nMENSAJE:');
                console.log(contactData.message);
                console.log('='.repeat(80) + '\n');
                
                return { success: true, mode: 'console', contactEmail };
            }
            
        } catch (error) {
            console.error('Error al enviar email de contacto:', error);
            return { success: false, error: error.message };
        }
    }

    formatOrderEmail(orderData, paymentMethod) {
        const items = orderData.items || [];
        const customer = orderData.customer || {};
        const total = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
        
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .order-info { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
                .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                .items-table th { background: #667eea; color: white; }
                .total { font-size: 1.2em; font-weight: bold; color: #667eea; }
                .payment-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; color: white; font-weight: bold; margin-bottom: 20px; }
                .payment-mercadopago { background: #009ee3; }
                .payment-efectivo { background: #48bb78; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1> Nuevo Pedido Recibido </h1>
                    <p> Areté Galería de Arte - Vitrofusión </p>
                </div>
                
                <div class="content">
                    <div class="payment-badge payment-${paymentMethod}">
                        Método de Pago: ${paymentMethod === 'mercadopago' ? 'Mercado Pago' : 'Efectivo'}
                    </div>
                    
                    <div class="order-info">
                        <h3> Datos del Cliente </h3>
                        <p><strong>Nombre:</strong> ${customer.name || 'No especificado'}</p>
                        <p><strong>Email:</strong> ${customer.email || 'No especificado'}</p>
                        <p><strong>Teléfono:</strong> ${customer.phone || 'No especificado'}</p>
                        <p><strong>Dirección:</strong> ${customer.address || 'No especificada'}</p>
                    </div>
                    
                    <h3> Detalle del Pedido </h3>
                    <table class="items-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.map(item => `
                                <tr>
                                    <td>${item.title || item.nombre}</td>
                                    <td>${item.quantity}</td>
                                    <td>$${item.unit_price.toLocaleString()}</td>
                                    <td>$${(item.unit_price * item.quantity).toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    
                    <div class="total">
                        Total del Pedido: $${total.toLocaleString()}
                    </div>
                    
                    <div class="order-info">
                        <h3> Información Adicional </h3>
                        <p><strong>ID del Pedido:</strong> ${orderData.id || 'N/A'}</p>
                        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
                        <p><strong>Estado:</strong> ${orderData.status || 'Pendiente'}</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p> Este email fue generado automáticamente por el sistema de Areté Galería de Arte </p>
                    <p> Por favor, contactar al cliente para coordinar los próximos pasos </p>
                </div>
            </div>
        </body>
        </html>
        `;
    }

    formatContactEmail(contactData) {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: 'Poppins', sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .contact-info { background: white; padding: 20px; border-radius: 8px; }
                .message { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1> Nuevo Contacto </h1>
                    <p> Areté Galería de Arte - Vitrofusión </p>
                </div>
                
                <div class="content">
                    <div class="contact-info">
                        <h3> Datos de Contacto </h3>
                        <p><strong>Nombre:</strong> ${contactData.name}</p>
                        <p><strong>Email:</strong> ${contactData.email}</p>
                        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
                    </div>
                    
                    <div class="message">
                        <h3> Mensaje </h3>
                        <p>${contactData.message}</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p> Este email fue generado automáticamente por el sistema de Areté Galería de Arte </p>
                    <p> Por favor, responder a la brevedad posible </p>
                </div>
            </div>
        </body>
        </html>
        `;
    }
}

module.exports = EmailService;
