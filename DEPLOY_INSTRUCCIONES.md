# Deploy GRATIS de Areté Galería de Arte - Instrucciones Completas

## Opción 1: Render (Recomendada - Más Fácil)

### Paso 1: Crear Cuenta en Render
1. Ve a [https://render.com](https://render.com)
2. Regístrate con tu cuenta de **GitHub** (es más fácil)
3. Verifica tu email

### Paso 2: Subir Código a GitHub
1. Ve a [https://github.com](https://github.com)
2. Crea nuevo repositorio: "arete-galeria-arte"
3. Sube todos tus archivos (menos node_modules)

```bash
# En tu carpeta del proyecto
git init
git add .
git commit -m "Primer commit - Tienda Areté"
git branch -M main
git remote add origin https://github.com/tu-usuario/arete-galeria-arte.git
git push -u origin main
```

### Paso 3: Deploy en Render
1. En Render, click "New +" -> "Web Service"
2. Conecta tu repositorio "arete-galeria-arte"
3. Render detectará automáticamente Node.js
4. Configura así:
   - **Name**: arete-galeria-arte
   - **Plan**: Free
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Paso 4: Variables de Entorno
En Render, agrega estas variables:
- `NODE_ENV`: `production`
- `MERCADO_PAGO_ACCESS_TOKEN`: `APP_USR-3189171814783754-041218-0cbfdf444a1a327e334f93c3b132127c-3330256767`
- `MERCADO_PAGO_PUBLIC_KEY`: `APP_USR-01923a1c-c6f1-41e0-9723-466f8d3b039c`
- `CONTACT_EMAIL`: `SoleMouse9650@gmail.com`

### Paso 5: Esperar Deploy
Render tomará 2-5 minutos en construir tu app. ¡Listo!

---

## Opción 2: Glitch (Más Rápido pero Limitado)

### Paso 1: Ir a Glitch
1. Ve a [https://glitch.com](https://glitch.com)
2. Click "New Project" -> "hello-express"

### Paso 2: Reemplazar Código
1. Borra todos los archivos por defecto
2. Sube tus archivos:
   - `server.js`
   - `package.json`
   - `index-new.html` (renombrar a `index.html`)
   - `styles.css`
   - `script.js`
   - Todas las imágenes

### Paso 3: Configurar Variables
En Glitch, click ".env" y agrega:
```
MERCADO_PAGO_ACCESS_TOKEN=APP_USR-3189171814783754-041218-0cbfdf444a1a327e334f93c3b132127c-3330256767
MERCADO_PAGO_PUBLIC_KEY=APP_USR-01923a1c-c6f1-41e0-9723-466f8d3b039c
CONTACT_EMAIL=SoleMouse9650@gmail.com
PORT=3000
NODE_ENV=production
```

### Paso 4: Probar
Click "Show" -> "In a New Window"

---

## Opción 3: Vercel + Netlify (Avanzado)

### Paso 1: Separar Frontend/Backend
1. **Frontend** -> Subir a Vercel
2. **Backend** -> Convertir a Serverless Functions

---

## Recomendación Final: **Render**

### ¿Por qué Render?
- **Totalmente gratis** para tu tienda
- **Soporte completo** de Node.js
- **No requiere cambios** en tu código
- **HTTPS automático**
- **URL profesional**: `arete-galeria-arte.onrender.com`
- **Fácil de configurar**

### Limitaciones del Plan Gratis:
- **Se duerme** después de 15 minutos sin actividad
- **Tarda 30 segundos** en despertar (normal en planes gratis)
- **750 horas/mes** (más que suficiente para una tienda)

### URL Final:
Tu web quedará en: `https://arete-galeria-arte.onrender.com`

---

## Después del Deploy:

### 1. Actualizar Mercado Pago
Ve a tu dashboard de Mercado Pago y cambia las URLs:
- **URL de Éxito**: `https://arete-galeria-arte.onrender.com/success`
- **URL de Fracaso**: `https://arete-galeria-arte.onrender.com/failure`
- **URL de Webhook**: `https://arete-galeria-arte.onrender.com/api/mercadopago/webhook`

### 2. Probar la Tienda
1. Visita tu URL
2. Agrega productos al carrito
3. Prueba el checkout
4. Verifica que lleguen los emails a SoleMouse9650@gmail.com

### 3. Dominio Personalizado (Opcional)
Si tienes dominio, puedes configurarlo en Render:
- Ve a "Custom Domains"
- Agrega tu dominio (ej: arete.com.ar)
- Sigue las instrucciones de DNS

---

## Soporte y Ayuda

Si tienes problemas:
1. **Render**: Revisa los logs en el dashboard
2. **Glitch**: Revisa la consola del editor
3. **Mercado Pago**: Verifica que las URLs estén correctas

¡Tu tienda estará online y funcionando en menos de 30 minutos!
