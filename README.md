<div align="center">
  <img src="public/escudo.png" alt="Cruz Azul Logo" width="120" />
  <h1>🚂 Cruz Azul Fan Portal</h1>
  <p><strong>El Hub Definitivo para La Máquina: Experiencia Premium, Datos en Tiempo Real y Comunidad</strong></p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/InsForge-BaaS-FF6B6B?style=for-the-badge&logo=databricks&logoColor=white" alt="InsForge" />
    <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
  </p>
</div>

---

## 📖 Visión General

**Cruz Azul Fan Portal** es una aplicación web full-stack moderna diseñada para revolucionar la forma en que los aficionados interactúan con el equipo. Más allá de un simple sitio informativo, este portal actúa como un *Fan Hub interactivo*, centralizando noticias en formato *Bento Grid*, venta de boletos, estadísticas de jugadores en vivo y una plataforma de comunidad privada. 

El proyecto fue concebido poniendo la **experiencia de usuario (UX)** y el **rendimiento** en primer plano, ofreciendo una navegación ultra rápida y un diseño institucional que respira la identidad del club.

---

## 📸 Demo y Capturas

> **Nota de Diseño:** La interfaz de usuario premium y el sistema de diseño (tokens de color, tipografía y layouts) fueron orquestados utilizando **Stitch - Design with AI**, logrando una estética visual de vanguardia y una traducción impecable a componentes funcionales de React.

<details open>
<summary><b>🖼️ Galería del Portal (Click para expandir)</b></summary>
<br>

| Landing Page (Bento Grid) | Calendario de Partidos | Modal de Autenticación |
| :---: | :---: | :---: |
| *(Agrega tu GIF/Imagen aquí)* | *(Agrega tu GIF/Imagen aquí)* | *(Agrega tu GIF/Imagen aquí)* |

</details>

---

## 🛠 Core Stack & Engineering Decisions

La arquitectura de este proyecto no fue elegida al azar. Cada tecnología resuelve un problema específico del dominio:

* **[Next.js (App Router)](https://nextjs.org/):** Elegido por su capacidad de *Server-Side Rendering (SSR)*. Al tratar con datos públicos (resultados de partidos, noticias), el SEO y el *First Contentful Paint* son críticos.
* **[React Server Actions](https://react.dev/reference/react/use-server):** Reemplazan las APIs tradicionales por mutaciones directas y seguras en el servidor. Esto elimina la necesidad de endpoints intermediarios, reduciendo la superficie de ataque y el tiempo de carga del cliente, especialmente vital para los flujos de autenticación.
* **[InsForge (BaaS)](https://insforge.com/):** Proporciona la capa de datos (PostgreSQL) y el sistema de Auth. Al delegar la infraestructura backend, el desarrollo se enfocó 100% en la lógica de negocio y la experiencia frontend.
* **[TypeScript](https://www.typescriptlang.org/):** Tipado estricto extremo a extremo (End-to-End Type Safety). Las interfaces compartidas entre la base de datos y los componentes de UI erradican los errores de *runtime* asociados a la mutación de datos.
* **[Tailwind CSS v3](https://tailwindcss.com/):** Sistema de utilidad de bajo nivel acoplado a tokens de diseño estrictos (`theme.extend`) para garantizar consistencia absoluta en colores corporativos (Ej. `primary: '#001b3d'`) sin lidiar con CSS global frágil.

---

## ✨ Características Principales

1. **🔐 Autenticación Robusta:** Flujo de registro e inicio de sesión gestionado a través de InsForge, con protección de rutas privadas mediante Next.js Middleware y JWT almacenados en cookies seguras HTTP-only.
2. **👥 Gestión Dinámica de Plantilla (`/squad`):** Grid interactivo de jugadores hidratado desde la base de datos. Implementa filtrado *client-side* ultrarrápido por posiciones (Porteros, Defensas, etc.) sin recargar la página.
3. **📅 Línea de Tiempo Condicional (`/matches`):** Un *Match Timeline* inteligente. Utiliza utilidades de renderizado condicional (`clsx` / `tailwind-merge`) para cambiar de forma dinámica los estilos de las tarjetas si el equipo juega de Local/Visitante, o si el partido está Pendiente/Finalizado.
4. **📰 Dashboard 'Bento Grid':** Una página de inicio asimétrica y moderna que prioriza el contenido de alto impacto visual, optimizado con el componente `<Image />` de Next.js para carga perezosa (*lazy loading*).

---

## 📂 Arquitectura del Proyecto

El código está estructurado siguiendo los principios de *Separation of Concerns* (SoC) y escalabilidad:

```text
📦 src
 ┣ 📂 actions       # Server Actions de Next.js (Capa de Control/Mutación)
 ┃ ┣ 📜 auth.ts     # Lógica de SignIn / SignUp / SignOut
 ┃ ┣ 📜 data.ts     # Consultas genéricas a la BD
 ┃ ┗ 📜 players.ts  # Lógica de negocio específica del Squad
 ┣ 📂 app           # Next.js App Router (Páginas y Layouts)
 ┃ ┣ 📂 comunidad   # Ruta protegida por middleware
 ┃ ┣ 📂 matches     # Línea de tiempo de partidos
 ┃ ┣ 📂 squad       # Filtros y lista de la plantilla
 ┃ ┗ 📜 layout.tsx  # Proveedores globales y configuración de fuentes
 ┣ 📂 components    # Componentes de UI modulares y reutilizables
 ┃ ┣ 📜 AuthModal.tsx
 ┃ ┣ 📜 MatchTimelineItem.tsx
 ┃ ┗ 📜 PlayerCard.tsx
 ┗ 📂 lib           # Utilidades y configuración de servicios
   ┣ 📜 insforge.ts # Singleton del SDK de la base de datos
   ┣ 📜 session.ts  # Manejo y desencriptación de Cookies JWT
   ┗ 📜 types.ts    # Contratos TypeScript / Esquemas de BD
```

---

## 🚀 Guía de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/cruz-azul-fan-portal.git
   cd cruz-azul-fan-portal
   ```

2. **Instalar dependencias:**
   Usamos `pnpm` para un manejo de dependencias estricto y veloz.
   ```bash
   pnpm install
   ```

3. **Configurar Variables de Entorno:**
   Crea un archivo `.env.local` en la raíz del proyecto.
   ```env
   NEXT_PUBLIC_INSFORGE_URL=tu_url_de_insforge
   NEXT_PUBLIC_INSFORGE_ANON_KEY=tu_anon_key_de_insforge
   SESSION_SECRET=tu_secreto_seguro_para_jwt_de_32_caracteres
   ```

4. **Ejecutar servidor de desarrollo:**
   ```bash
   pnpm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

---

## 🧠 Desafíos Técnicos y Aprendizajes

Como ingeniero, enfrenté dos retos críticos durante este desarrollo:

**1. Integración de Diseño Asistido por IA (Stitch) con Lógica de Servidor:**
* **Reto:** El diseño generado por la IA producía componentes HTML/Tailwind estáticos masivos. 
* **Solución:** Implementé un proceso de refactorización "quirúrgica". Extraje el HTML en pequeños *Server Components* de React, separando estrictamente la UI del estado. Para interactividad compleja (como el modal de autenticación o los filtros de jugadores), utilicé el patrón de "Client Component Wrappers" (`AuthModalController`, `SquadClient`), manteniendo la inmensa mayoría del árbol renderizado en el servidor para no sacrificar SEO.

**2. Optimización del Fetching de Datos (Waterfall Avoidance):**
* **Reto:** Al tener componentes anidados que requerían datos distintos (Partidos, Jugadores), corría el riesgo de crear un "waterfall" de peticiones de red, ralentizando la página.
* **Solución:** Centralicé el fetching en el nivel más alto de las rutas de página (`page.tsx`) aprovechando `async/await` a nivel componente, y pasé los datos hacia abajo mediante *props*. Esto permite que Next.js resuelva todas las consultas a InsForge en una sola pasada en el servidor, enviando al cliente un HTML completamente pre-renderizado.

---

## 📫 Contacto

¿Te interesa hablar de código, arquitectura web o este proyecto? Conectemos:

* **LinkedIn:** [Tu Nombre](https://linkedin.com/in/tu-perfil)
* **GitHub:** [@tu-usuario](https://github.com/tu-usuario)
* **Email:** [tu.correo@ejemplo.com](mailto:tu.correo@ejemplo.com)

---
<div align="center">
  <sub>Construido con dedicación e ingeniería de primer nivel. © 2026</sub>
</div>
