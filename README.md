# Areté Galería de Arte - Tienda Online

Una tienda online moderna para Areté Galería de Arte, especializada en piezas únicas de vitrofusión creadas artesanalmente en Apóstoles, Misiones, Argentina.

## Características Principales

### Frontend Moderno
- **Diseño UI/UX Profesional**: Interfaz limpia y moderna con animaciones sutiles
- **Fully Responsive**: Adaptado perfectamente para móviles, tablets y desktop
- **Carrito de Compras**: Sistema completo con persistencia en localStorage
- **Lightbox**: Visualización ampliada de productos
- **Filtros y Búsqueda**: Organización por categorías y ordenamiento
- **Optimización de Performance**: Lazy loading, compresión y SEO técnico

### Backend Node.js + Express
- **API RESTful**: Endpoints para productos, pagos y contacto
- **Seguridad**: Helmet, CORS y rate limiting
- **Variables de Entorno**: Manejo seguro de credenciales
- **Logging**: Morgan para registro de peticiones

### Sistema de Pagos
- **Mercado Pago Integration**: Pagos online con tarjeta y otros métodos
- **Pago en Efectivo**: Opción para coordinar pago manual
- **Webhooks**: Notificaciones de estado de pago en tiempo real
- **Páginas de Resultado**: Success, failure y pending

## Tecnologías Utilizadas

### Frontend
- **HTML5 Semántico**
- **CSS3 Moderno** con CSS Variables y Grid/Flexbox
- **JavaScript Vanilla** (ES6+)
- **Font Awesome** para iconos
- **Google Fonts** (Poppins + Playfair Display)

### Backend
- **Node.js** (v16+)
- **Express.js** para servidor web
- **Mercado Pago SDK** para integración de pagos
- **Dotenv** para variables de entorno
- **Helmet** para seguridad
- **CORS** para peticiones cruzadas
- **Rate Limiting** para protección contra abusos

## Instalación y Configuración

### 1. Requisitos Previos
- Node.js 16.0 o superior
- npm o yarn
- Credenciales de Mercado Pago (Access Token y Public Key)

### 2. Instalación de Dependencias
```bash
npm install
```

### 3. Configuración de Variables de Entorno
Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:
```env
# Mercado Pago Credentials
MERCADO_PAGO_ACCESS_TOKEN=TU_ACCESS_TOKEN
MERCADO_PAGO_PUBLIC_KEY=TU_PUBLIC_KEY

# Server Configuration
PORT=3000
NODE_ENV=development

# Email Configuration (opcional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña

# Contact Email
CONTACT_EMAIL=contacto@arete.com.ar
```

### 4. Obtener Credenciales de Mercado Pago
1. Crea una cuenta en [Mercado Pago](https://www.mercadopago.com.ar/)
2. Ve a la sección de **Credenciales** en tu dashboard
3. Copia el **Access Token** y **Public Key**
4. Agrega estas credenciales a tu archivo `.env`

### 5. Ejecutar la Aplicación
Para desarrollo:
```bash
npm run dev
```

Para producción:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
arete-galeria-arte/
  |
  |-- index-new.html          # Frontend principal
  |-- styles.css              # Estilos CSS modernos
  |-- script.js               # Lógica JavaScript del frontend
  |-- server.js               # Servidor Node.js + Express
  |-- package.json            # Dependencias y scripts
  |-- .env.example            # Plantilla de variables de entorno
  |-- .env                    # Variables de entorno (creado por usuario)
  |-- README.md               # Documentación
  |
  |-- images/                 # Imágenes de productos
  |   |-- *.jpg
  |   |-- *.jpeg
  |   |-- *.png
  |
  |-- node_modules/           # Dependencias instaladas
```

## Flujo de Compra

### 1. Navegación y Selección
- Usuario navega por categorías de productos
- Puede filtrar por categoría y ordenar productos
- Hace clic en productos para verlos ampliados

### 2. Carrito de Compras
- Agrega productos al carrito con cantidad
- Puede modificar cantidades o eliminar items
- El carrito persiste en localStorage
- Ve el total dinámico en tiempo real

### 3. Checkout
- Completa datos de contacto y envío
- Elige método de pago:
  - **Mercado Pago**: Redirección a gateway de pago
  - **Efectivo**: Generación de orden para contacto manual

### 4. Procesamiento de Pago
- **Mercado Pago**: 
  - Se crea preferencia de pago
  - Usuario es redirigido a Mercado Pago
  - Webhook recibe notificación de estado
  - Redirección a página de éxito/fallo
  
- **Efectivo**:
  - Se genera orden con estado "pending"
  - Administrador contacta al cliente
  - Se coordina pago y envío manualmente

## API Endpoints

### Mercado Pago
- `POST /api/mercadopago/create-preference` - Crear preferencia de pago
- `POST /api/mercadopago/webhook` - Recibir notificaciones de pago

### Órdenes
- `POST /api/orders` - Crear orden de pago en efectivo

### Contacto
- `POST /api/contact` - Enviar formulario de contacto

### Productos
- `GET /api/products` - Obtener lista de productos (futuro)

## Configuración de Mercado Pago

### 1. Configuración Básica
```javascript
// En server.js
mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});
```

### 2. Creación de Preferencia
```javascript
const preference = {
    items: [
        {
            id: 'product_id',
            title: 'Nombre del producto',
            quantity: 1,
            unit_price: 1000,
            currency_id: 'ARS'
        }
    ],
    payer: {
        email: 'customer@example.com'
    },
    back_urls: {
        success: 'https://tu-sitio.com/success',
        failure: 'https://tu-sitio.com/failure',
        pending: 'https://tu-sitio.com/pending'
    },
    auto_return: 'approved'
};
```

### 3. Webhooks
Configura la URL del webhook en tu dashboard de Mercado Pago:
```
https://tu-sitio.com/api/mercadopago/webhook
```

## Seguridad

### Variables de Entorno
- **NUNCA** exponer credenciales en el frontend
- Usar siempre `process.env` para datos sensibles
- El archivo `.env` debe estar en `.gitignore`

### Headers de Seguridad
- Helmet configura headers CSP, HSTS, X-Frame-Options
- CORS restringe orígenes permitidos
- Rate limiting previene abusos

### Validación
- Validación de inputs en backend
- Sanitización de datos de usuario
- Verificación de formatos de email

## Optimización y Performance

### Frontend
- **Lazy Loading**: Imágenes cargan bajo demanda
- **CSS Variables**: Mantenimiento fácil y consistencia
- **Event Delegation**: Mejor performance en eventos
- **LocalStorage**: Persistencia del carrito sin backend

### Backend
- **Compression**: Middleware de compresión gzip
- **Caching**: Headers de cache para assets estáticos
- **Logging**: Registro de peticiones para monitoreo

## SEO y Metadatos

### Meta Tags
```html
<meta name="description" content="Areté - Galería de arte en vitrofusión en Apóstoles, Misiones">
<meta name="keywords" content="vitrofusión, arte en vidrio, bijou, decoración">
<meta property="og:title" content="Areté | Galería de Arte en Vitrofusión">
<meta property="og:image" content="https://arete.com.ar/og-image.jpg">
```

### Estructura Semántica
- Uso de etiquetas HTML5 semánticas
- Headers estructurados correctamente
- Alt text en todas las imágenes

## Deploy en Producción

### 1. Variables de Entorno
```env
NODE_ENV=production
PORT=80
MERCADO_PAGO_ACCESS_TOKEN=prod_token
MERCADO_PAGO_PUBLIC_KEY=prod_key
```

### 2. HTTPS
Configura SSL/TLS en tu servidor (recomendado Let's Encrypt)

### 3. Dominio
Apunta tu dominio a la IP del servidor

### 4. PM2 (Proceso Manager)
```bash
npm install -g pm2
pm2 start server.js --name "arete-api"
pm2 startup
pm2 save
```

## Monitoreo y Logs

### Logs de Aplicación
- Morgan registra todas las peticiones HTTP
- Console.log para eventos importantes
- Webhooks de Mercado Pago registrados

### Métricas Clave
- Tiempo de carga
- Tasa de conversión
- Errores de pago
- Tráfico del sitio

## Soporte y Contacto

Para soporte técnico o preguntas:
- **Email**: contacto@arete.com.ar
- **WhatsApp**: +54 9 3758 567371
- **Instagram**: @arete.galeriadearte

## Licencia

MIT License - Puedes usar este código para tu proyecto comercial.

---

**Nota**: Este proyecto fue desarrollado como ejemplo de implementación de e-commerce con Mercado Pago. Las credenciales de Mercado Pago deben ser configuradas por el propietario del negocio.
