# Pistis - Gestión de Eliminación de Cuentas

Aplicación web para gestionar solicitudes de eliminación de cuentas de usuario, cumpliendo con los requisitos de App Store y Google Play Store.

## Requisitos

- [Bun](https://bun.sh/) v1.0 o superior

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/[tu-org]/pistis-delete-account.git
cd pistis-delete-account

# Instalar dependencias
bun install
```

## Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://api.pistisgroup.com
```

## Scripts Disponibles

```bash
bun run dev       # Servidor de desarrollo (frontend)
bun run build     # Build de producción
bun run preview   # Preview del build
bun run server    # Servidor de prueba (backend mock)
bun run dev:all   # Frontend + Backend de prueba
```

## Deploy a GitHub Pages

### Opción 1: Deploy Manual

1. **Configurar el base path** en `vite.config.ts`:
   ```typescript
   base: '/nombre-del-repositorio/',
   ```

2. **Configurar el basename del router** en `src/App.tsx`:
   ```typescript
   <BrowserRouter basename="/nombre-del-repositorio">
   ```

3. **Generar el build**:
   ```bash
   bun run build
   ```

4. **Subir la carpeta `dist/`** a la rama `gh-pages`:
   ```bash
   # Instalar gh-pages si no lo tienes
   bun add -d gh-pages

   # Deploy
   bunx gh-pages -d dist
   ```

### Opción 2: GitHub Actions (Recomendado)

Crear el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build
        env:
          VITE_API_URL: ${{ vars.VITE_API_URL }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Configuración en GitHub

1. Ir a **Settings > Pages**
2. En "Source", seleccionar **GitHub Actions**
3. Ir a **Settings > Secrets and variables > Actions > Variables**
4. Crear variable `VITE_API_URL` con la URL del backend de producción

## Estructura del Proyecto

```
├── public/
│   ├── logo.png          # Logo de Pistis
│   ├── thinking.png      # Ilustración página confirmación
│   ├── success.png       # Ilustración página éxito
│   └── favicon.svg
├── server/
│   └── index.ts          # Servidor de prueba (mock backend)
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── LoadingSpinner.tsx
│   ├── pages/
│   │   ├── HomePage.tsx           # Formulario de email
│   │   ├── CheckEmailPage.tsx     # "Revisa tu correo"
│   │   ├── ConfirmDeletePage.tsx  # Confirmación de eliminación
│   │   └── SuccessPage.tsx        # Proceso iniciado
│   ├── services/
│   │   └── api.ts        # Llamadas al backend
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── vite.config.ts
└── package.json
```

## API Endpoints (Para el equipo de Backend)

### 1. POST /user/delete-request

Inicia el proceso de eliminación y envía correo al usuario.

**Request:**
```json
{
  "mail": "usuario@email.com"
}
```

**Response (200):**
```json
{
  "success": true
}
```

### 2. GET /user/delete-request?user_id=xxx

Obtiene la descripción de los datos que serán eliminados.

**Response (200):**
```json
{
  "description": "Datos que serán eliminados:\n• Tu perfil...\n\nDatos que se conservarán..."
}
```

### 3. GET /user/delete-request?user_id=xxx&action=true

Confirma la eliminación de la cuenta.

**Response (200):**
```json
{
  "message": "El proceso de eliminación para el usuario usuario@email.com ha sido iniciado."
}
```

## Flujo de la Aplicación

1. **Usuario ingresa email** → POST /user/delete-request
2. **Sistema envía correo** con link: `https://tudominio.com/user/delete-request?user_id=xxx`
3. **Usuario hace clic en el link** → GET /user/delete-request?user_id=xxx → Muestra descripción
4. **Usuario confirma** → GET /user/delete-request?user_id=xxx&action=true
5. **Sistema muestra confirmación** de proceso iniciado

## URL Final

Una vez desplegado, la URL será:
```
https://[tu-org].github.io/pistis-delete-account/
```

Esta URL debe configurarse en:
- Google Play Console → Ficha de la app → Política de privacidad / Eliminación de datos
- App Store Connect → App Information → Privacy Policy URL
