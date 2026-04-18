const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mercadopago = require('mercadopago');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const EmailService = require('./email-service');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Mercado Pago
mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

// Initialize Email Service
const emailService = new EmailService();

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "https://sdk.mercadopago.com"],
            connectSrc: ["'self'", "https://api.mercadopago.com"]
        }
    }
}));

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://arete.com.ar' : 'http://localhost:3000',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes

/**
 * Create Mercado Pago preference
 * POST /api/mercadopago/create-preference
 */
app.post('/api/mercadopago/create-preference', async (req, res) => {
    try {
        const { items, payer } = req.body;

        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Items are required'
            });
        }

        if (!payer || !payer.email) {
            return res.status(400).json({
                success: false,
                error: 'Payer information is required'
            });
        }

        // Create preference items
        const preferenceItems = items.map(item => ({
            id: item.id.toString(),
            title: item.title,
            quantity: item.quantity,
            unit_price: parseFloat(item.unit_price),
            currency_id: item.currency_id || 'ARS'
        }));

        // Create preference
        const preference = {
            items: preferenceItems,
            payer: {
                name: payer.name || '',
                email: payer.email,
                phone: {
                    number: payer.phone || ''
                }
            },
            back_urls: {
                success: `${req.protocol}://${req.get('host')}/success`,
                failure: `${req.protocol}://${req.get('host')}/failure`,
                pending: `${req.protocol}://${req.get('host')}/pending`
            },
            auto_return: 'approved',
            external_reference: `ARETE_${Date.now()}`,
            notification_url: `${req.protocol}://${req.get('host')}/api/mercadopago/webhook`,
            statement_descriptor: 'ARETE GALERIA DE ARTE',
            expires: false,
            payment_methods: {
                excluded_payment_types: [
                    { id: 'ticket' },
                    { id: 'atm' }
                ],
                default_payment_method_id: null,
                default_installments: null,
                installments: 12
            }
        };

        // Create preference in Mercado Pago
        const response = await mercadopago.preferences.create(preference);
        
        res.json({
            success: true,
            data: {
                id: response.body.id,
                init_point: response.body.init_point,
                sandbox_init_point: response.body.sandbox_init_point
            }
        });

    } catch (error) {
        console.error('Mercado Pago preference error:', error);
        res.status(500).json({
            success: false,
            error: 'Error creating payment preference'
        });
    }
});

/**
 * Mercado Pago webhook
 * POST /api/mercadopago/webhook
 */
app.post('/api/mercadopago/webhook', async (req, res) => {
    try {
        const paymentData = req.body;
        
        // Log payment notification for debugging
        console.log('Mercado Pago webhook received:', paymentData);
        
        // Here you would typically:
        // 1. Verify the payment status
        // 2. Update order status in your database
        // 3. Send confirmation emails
        // 4. Notify admin
        
        if (paymentData.type === 'payment') {
            const paymentId = paymentData.data.id;
            
            // Get payment information
            const payment = await mercadopago.payment.findById(paymentId);
            
            if (payment.body.status === 'approved') {
                // Payment approved - process order
                console.log(`Payment ${paymentId} approved`);
                
                // Extract order data from payment
                const orderData = {
                    id: payment.body.external_reference,
                    items: payment.body.additional_info ? payment.body.additional_info.items : [],
                    customer: {
                        name: payment.body.payer.first_name + ' ' + payment.body.payer.last_name,
                        email: payment.body.payer.email,
                        phone: payment.body.payer.phone ? payment.body.payer.phone.number : '',
                        address: payment.body.additional_info ? payment.body.additional_info.shipping_address : ''
                    },
                    status: 'approved',
                    total: payment.body.transaction_amount
                };
                
                // Send email notification to SoleMouse9650
                await emailService.sendOrderNotification(orderData, 'mercadopago');
                
                console.log('Email notification sent for approved payment');
            }
        }
        
        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).send('Error processing webhook');
    }
});

/**
 * Create cash order
 * POST /api/orders
 */
app.post('/api/orders', async (req, res) => {
    try {
        const { items, customer, payment_method } = req.body;

        // Validate required fields
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Items are required'
            });
        }

        if (!customer || !customer.name || !customer.email) {
            return res.status(400).json({
                success: false,
                error: 'Customer information is required'
            });
        }

        // Calculate total
        const total = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);

        // Create order object
        const order = {
            id: `ORD_${Date.now()}`,
            items: items,
            customer: customer,
            payment_method: payment_method,
            total: total,
            status: 'pending',
            created_at: new Date().toISOString()
        };

        // TODO: Save order to database
        console.log('New cash order:', order);

        // Send email notification to SoleMouse9650
        const emailResult = await emailService.sendOrderNotification(order, 'efectivo');
        
        if (emailResult.success) {
            console.log('Email notification sent for cash order');
        } else {
            console.error('Failed to send email notification:', emailResult.error);
        }

        res.json({
            success: true,
            data: {
                order_id: order.id,
                message: 'Order created successfully'
            }
        });

    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            error: 'Error creating order'
        });
    }
});

/**
 * Contact form submission
 * POST /api/contact
 */
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Send email notification to SoleMouse9650
        const emailResult = await emailService.sendContactNotification({ name, email, message });
        
        // TODO: Save contact message to database
        console.log('Contact form submission:', { name, email, message });

        if (emailResult.success) {
            console.log('Contact email sent successfully');
        } else {
            console.error('Failed to send contact email:', emailResult.error);
        }

        res.json({
            success: true,
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            error: 'Error sending message'
        });
    }
});

/**
 * Get Mercado Pago public key
 * GET /api/mercadopago/public-key
 */
app.get('/api/mercadopago/public-key', (req, res) => {
    try {
        const publicKey = process.env.MERCADO_PAGO_PUBLIC_KEY;
        
        if (!publicKey) {
            return res.status(500).json({
                success: false,
                error: 'Mercado Pago public key not configured'
            });
        }
        
        res.json({
            success: true,
            public_key: publicKey
        });
    } catch (error) {
        console.error('Public key error:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching public key'
        });
    }
});

/**
 * Get products (if needed for dynamic loading)
 * GET /api/products
 */
app.get('/api/products', (req, res) => {
    try {
        // This could be used to serve products dynamically
        // For now, products are embedded in the frontend
        
        res.json({
            success: true,
            data: []
        });
    } catch (error) {
        console.error('Products error:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching products'
        });
    }
});

/**
 * Success page
 * GET /success
 */
app.get('/success', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pago Exitoso - Areté</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                .container {
                    text-align: center;
                    padding: 2rem;
                }
                .success-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                h1 {
                    margin-bottom: 1rem;
                }
                p {
                    margin-bottom: 2rem;
                    opacity: 0.9;
                }
                .btn {
                    background: white;
                    color: #667eea;
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    display: inline-block;
                    transition: transform 0.2s ease;
                }
                .btn:hover {
                    transform: translateY(-2px);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="success-icon">¡</div>
                <h1>¡Pago Exitoso!</h1>
                <p>Tu pedido ha sido procesado correctamente. Nos contactaremos pronto para coordinar el envío.</p>
                <a href="/" class="btn">Volver a la tienda</a>
            </div>
        </body>
        </html>
    `);
});

/**
 * Failure page
 * GET /failure
 */
app.get('/failure', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pago Fallido - Areté</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
                    color: white;
                }
                .container {
                    text-align: center;
                    padding: 2rem;
                }
                .error-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                h1 {
                    margin-bottom: 1rem;
                }
                p {
                    margin-bottom: 2rem;
                    opacity: 0.9;
                }
                .btn {
                    background: white;
                    color: #e53e3e;
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    display: inline-block;
                    transition: transform 0.2s ease;
                }
                .btn:hover {
                    transform: translateY(-2px);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="error-icon">!</div>
                <h1>Pago Fallido</h1>
                <p>Hubo un problema con tu pago. Por favor, intenta nuevamente o contactanos para ayudarte.</p>
                <a href="/" class="btn">Volver a la tienda</a>
            </div>
        </body>
        </html>
    `);
});

/**
 * Pending page
 * GET /pending
 */
app.get('/pending', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pago Pendiente - Areté</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background: linear-gradient(135deg, #f6ad55 0%, #ed8936 100%);
                    color: white;
                }
                .container {
                    text-align: center;
                    padding: 2rem;
                }
                .pending-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                h1 {
                    margin-bottom: 1rem;
                }
                p {
                    margin-bottom: 2rem;
                    opacity: 0.9;
                }
                .btn {
                    background: white;
                    color: #ed8936;
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    display: inline-block;
                    transition: transform 0.2s ease;
                }
                .btn:hover {
                    transform: translateY(-2px);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="pending-icon">...</div>
                <h1>Pago Pendiente</h1>
                <p>Tu pago está siendo procesado. Te enviaremos una confirmación cuando se complete.</p>
                <a href="/" class="btn">Volver a la tienda</a>
            </div>
        </body>
        </html>
    `);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Mercado Pago configured: ${!!process.env.MERCADO_PAGO_ACCESS_TOKEN}`);
});

module.exports = app;
