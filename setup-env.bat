@echo off
echo Configurando variables de entorno para Mercado Pago...

(
echo MERCADO_PAGO_ACCESS_TOKEN=APP_USR-3189171814783754-041218-0cbfdf444a1a327e334f93c3b132127c-3330256767
echo MERCADO_PAGO_PUBLIC_KEY=APP_USR-01923a1c-c6f1-41e0-9723-466f8d3b039c
echo PORT=3001
echo NODE_ENV=development
) > .env

echo Archivo .env creado correctamente!
echo.
echo Contenido del archivo .env:
type .env
echo.
echo Iniciando servidor...
npm run dev
