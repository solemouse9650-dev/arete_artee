# Guía de Configuración de Mercado Pago

## Paso 1: Crear Cuenta en Mercado Pago

1. Ve a [https://www.mercadopago.com.ar/](https://www.mercadopago.com.ar/)
2. Crea una cuenta o inicia sesión
3. Completa tu perfil de vendedor

## Paso 2: Obtener Credenciales

1. Inicia sesión en tu dashboard de Mercado Pago
2. Ve a la sección **"Credenciales"** en el menú lateral
3. Copia las siguientes credenciales:

### Para Desarrollo (Pruebas):
- **Access Token de Prueba**: `TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Public Key de Prueba`: `TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### Para Producción:
- **Access Token de Producción**: `APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Public Key de Producción**: `APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

## Paso 3: Configurar Variables de Entorno

Edita tu archivo `.env` con las credenciales:

```env
# Mercado Pago Credentials
MERCADO_PAGO_ACCESS_TOKEN=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
MERCADO_PAGO_PUBLIC_KEY=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Paso 4: Configurar URLs de Retorno

En tu dashboard de Mercado Pago, configura las URLs de retorno:

### URLs de Redirección:
- **URL de Éxito**: `http://localhost:3000/success`
- **URL de Fracaso**: `http://localhost:3000/failure`
- **URL de Pendiente**: `http://localhost:3000/pending`

### URL de Notificaciones (Webhook):
- **URL de Webhook**: `http://localhost:3000/api/mercadopago/webhook`

## Paso 5: Probar el Sistema

1. Inicia el servidor:
   ```bash
   npm run dev
   ```

2. Abre `http://localhost:3000` en tu navegador

3. Agrega productos al carrito

4. Procede al checkout y selecciona "Mercado Pago"

5. Completa el formulario y haz clic en "Pagar"

6. Serás redirigido a la página de pago de Mercado Pago

## Paso 6: Pasar a Producción

Cuando estés listo para producción:

1. Cambia las credenciales en tu `.env` a las de producción
2. Actualiza `NODE_ENV=production`
3. Configura las URLs de producción en Mercado Pago
4. Asegúrate de tener tu dominio configurado con HTTPS

## Notas Importantes:

- **Nunca expongas tus credenciales en el frontend**
- **Usa siempre credenciales de prueba para desarrollo**
- **Las URLs deben ser HTTPS en producción**
- **Configura correctamente los webhooks para recibir notificaciones**

## Solución de Problemas Comunes:

### Error: "Invalid access token"
- Verifica que el Access Token sea correcto
- Asegúrate de usar el token adecuado (prueba vs producción)

### Error: "CORS policy"
- Verifica la configuración de CORS en el servidor
- Asegúrate de que el origen esté permitido

### Error: "Webhook not working"
- Verifica que la URL del webhook sea accesible públicamente
- Revisa los logs del servidor para ver las notificaciones

### Error: "Payment not approved"
- Usa tarjetas de prueba de Mercado Pago para desarrollo
- Verifica la configuración de tu cuenta de Mercado Pago
