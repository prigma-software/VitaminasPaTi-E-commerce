# Informe de Sincronización y Merge con Marca Blanca
**Proyecto:** `VitaminasPaTi-E-commerce` (Hijo)  
**Origen:** `E-commerce` (Marca Blanca / Padre)  
**Fecha:** 10 de Septiembre de 2026  
**Rama:** `master`  
**Estado:** ✅ Sincronizado, migrado y validado con éxito

---

## 1. Contexto y Objetivos

Bajo la arquitectura de **Marca Blanca Unidireccional**, `VitaminasPaTi-E-commerce` hereda las actualizaciones centrales de seguridad, arquitectura y mejoras de experiencia de usuario desarrolladas en el repositorio base (`E-commerce`).

### Reglas Específicas para Vitaminas Para Ti:
1. **Pasarela Wompi:** ❌ **Desactivada** (`wompi: false`). No se utiliza Wompi en esta tienda.
2. **Pago Manual / Contra Entrega:** ✅ **Activo** (`manual: true`). El cliente compra mediante pago manual / contra entrega sujeto a disponibilidad de su zona de envío.
3. **WhatsApp Business Cloud API:** ❌ **Desactivado** (`ENABLE_WHATSAPP_NOTIFICATIONS=false`, `WHATSAPP_USE_TEMPLATES=false`).
4. **Preservación Estética Absoluta:**
   - Modo Claro por defecto (`theme.defaultTheme: "light"`).
   - Logotipos propios de Vitaminas Para Ti (`isotipo.png`, `logotipo.png`, `imagotipo.png` en `public/images/brandClient/`).
   - Contenido e historia corporativa de la marca.
5. **Módulo de Reparaciones / Taller:** ❌ **Desactivado** (`workOrders: false`). Al ser una tienda puramente de productos/suplementos, no requiere módulos de servicio técnico.

---

## 2. Resumen de Cambios Funcionales Heredados

| Módulo / Archivo | Cambio Realizado | Justificación y Beneficio |
| :--- | :--- | :--- |
| **Licenciamiento PRIGMA**<br>`app/layout.tsx`<br>`app/admin/layout.tsx` | Verificación de licencia reubicada exclusivamente en rutas administrativas `/admin`. | Evita bloqueos en la tienda pública si hay latencia en el servidor de licencias. |
| **Navegación Admin / Perfil**<br>`src/shared/components/Navbar.tsx`<br>`admin-sidebar.tsx` | Navegación bidireccional entre `/profile` ("Mi Cuenta") y `/admin`, con filtrado estricto por rol. | Facilita la administración de pedidos sin exponer rutas privadas a clientes regulares. |
| **Seguridad de Base de Datos (RLS)**<br>`20260907120000_security_hardening.sql` | Políticas RLS reforzadas en tablas de órdenes, usuarios, auditoría y funciones de inventario. | Protege la integridad de datos contra alteraciones indebidas. |
| **Sanitización y Anti-XSS**<br>`docs/security_audit_report.md` | Filtros de sanitización y suite de pruebas contra ataques XSS e inyecciones. | Blindaje preventivo de formularios de checkout y registro de clientes. |

---

## 3. Preservación Estética y de Marca (Garantía de Intactitud)

Se auditó que los archivos propios de Vitaminas Para Ti permanecieran intactos:
- ✅ **`lib/constants/branding-store.ts`:** Nombre comercial "Vitaminas Pa' Ti", teléfonos, historia y configuración de flags intacta.
- ✅ **`public/images/brandClient/`:** Todos los recursos gráficos propios se conservan sin modificaciones.
- ✅ **`lib/theme/` y `app/globals.css`:** Tema claro propio validado mediante `npm run generate:theme` (30 tokens generados correctamente).

---

## 4. Base de Datos y Migraciones

1. **Aislamiento Preventivo:** El script de rollback de emergencia se ubicó de manera segura en `supabase/rollbacks/` para que no se ejecute accidentalmente.
2. **Aplicación Exitosa:** Se ejecutó `npm run supabase db push` conectando directamente al proyecto Supabase de Vitaminas Para Ti (`csukmupxfyejcxrgypar`).
3. **Resultado:** 24 migraciones sincronizadas en paridad total (`local: 20260907120000` / `remote: 20260907120000`).

---

## 5. Configuración de Variables de Entorno (`.env`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://csukmupxfyejcxrgypar.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Licencia PRIGMA
PRIGMA_URL=https://prigma.net
LICENSE_KEY=lk_6912...[CONFIGURADO_LOCALMENTE]

# Email (Resend)
RESEND_API_KEY=re_L1jA...[CONFIGURADO_LOCALMENTE]
RESEND_FROM_EMAIL="Vitaminas Pa' Ti <contacto@vitaminaspati.net>"
NEXT_PUBLIC_APP_URL=https://vitaminaspati.com/

# Notificaciones
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_WHATSAPP_NOTIFICATIONS=false
WHATSAPP_USE_TEMPLATES=false

# Mantenimiento y CLI
SUPABASE_ACCESS_TOKEN=sbp_9c87...[CONFIGURADO_LOCALMENTE]
CRON_SECRET=cron_secret_...[CONFIGURADO_LOCALMENTE]
```

---

## 6. Estado en Control de Versiones (Git)

- **Repositorio Remoto:** `prigma-software/VitaminasPaTi-E-commerce.git`
- **Rama:** `master`
- **Commits:** Sincronizado con upstream y listo para publicar a `origin master`.
