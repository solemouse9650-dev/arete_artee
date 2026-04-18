# Deploy Gratuito en Render - Guía Paso a Paso

## Paso 1: Preparar el Proyecto

### 1.1 Crear archivo render.yaml
```yaml
services:
  - type: web
    name: arete-galeria-arte
    env: node
    plan: free
    buildCommand: "npm install"
    startCommand: "npm start"
    envVars:
      - key: NODE_ENV
        value: production
      - key: MERCADO_PAGO_ACCESS_TOKEN
        sync: false
      - key: MERCADO_PAGO_PUBLIC_KEY
        sync: false
      - key: CONTACT_EMAIL
        sync: false
```

### 1.2 Modificar package.json para producción
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "echo 'No build needed'"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

## Paso 2: Subir a GitHub

1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos (excepto node_modules)
3. Asegúrate de incluir .gitignore

## Paso 3: Deploy en Render

1. Ve a [render.com](https://render.com)
2. Regístrate con tu cuenta GitHub
3. Click en "New +" -> "Web Service"
4. Conecta tu repositorio de GitHub
5. Render detectará automáticamente que es Node.js
6. Configura las variables de entorno:
   - `NODE_ENV`: production
   - `MERCADO_PAGO_ACCESS_TOKEN`: tu token de Mercado Pago
   - `MERCADO_PAGO_PUBLIC_KEY`: tu public key
   - `CONTACT_EMAIL`: SoleMouse9650@gmail.com

## Paso 4: Configurar Mercado Pago

1. Ve al dashboard de Mercado Pago
2. Actualiza las URLs de retorno:
   - URL de Éxito: https://tu-app.onrender.com/success
   - URL de Fracaso: https://tu-app.onrender.com/failure
   - URL de Webhook: https://tu-app.onrender.com/api/mercadopago/webhook

## Paso 5: Dominio Personalizado (Opcional)

1. En el dashboard de Render, ve a "Custom Domains"
2. Agrega tu dominio (ej: arete.com.ar)
3. Configura los DNS según las instrucciones de Render

## Características del Plan Gratis de Render:

- **750 horas/mes** de runtime (suficiente para una tienda)
- **Sleep after 15 min** de inactividad (se reactiva en ~30 segundos)
- **SSL automático**
- **Base de datos PostgreSQL gratis** (si necesitas)
- **Monitoreo básico**
- **Logs en tiempo real**

## Alternativa: Vercel (si prefieres)

### Para Vercel necesitarás convertir el backend a Serverless Functions:

1. Crea carpeta `api/`
2. Mueve server.js a `api/server.js`
3. Exporta como handler function
4. Deploy automático desde GitHub

## Recomendación Final:

**Usa Render** porque:
- Es más fácil para tu proyecto actual
- Mantiene la estructura exacta de tu código
- No requiere cambios en el backend
- Es completamente gratis para empezar
- Soporte completo de Node.js + Express
