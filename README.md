# 🎮 Pacgame — Proyecto Final Desarrollo Web · CoderHouse
 
Aplicación web interactiva desarrollada como **proyecto final de la carrera de Desarrollo Web en Coderhouse**.
 
Pacgame es un juego tipo **nonograma/pixel art** donde el jugador completa tableros a partir de pistas por filas y columnas. Incluye sistema de vidas, puntaje, cronómetro y perfil de usuario persistente.
  
---
 
## ✨ Funcionalidades
 
- 👤 **Perfil de usuario** — creación con nombre, email y avatar, guardado en `localStorage`
- 🎯 **4 niveles de dificultad** — tableros de 5×5, 10×10, 15×15 y 20×20
- 🧩 **Tableros predefinidos y aleatorios**
- ❤️ **Sistema de vidas** con pistas por filas y columnas
- ⏱️ **Cronómetro con pausa** y puntaje acumulado por partida
- 🌙 **Modo claro/oscuro** persistente
- 📊 **Vista de perfil** con historial de resultados
 
---
 
## 🛠️ Tecnologías utilizadas
 
| Tecnología | Uso |
|---|---|
| HTML5 | Estructura del juego |
| CSS3 | Estilos y modo oscuro |
| JavaScript Vanilla | Lógica del juego completa |
| LocalStorage | Persistencia de usuario, puntaje y preferencias |
| Fetch API | Carga de tableros desde archivos JSON |
| SweetAlert2 | Alertas y feedback visual |
 
---
 
## 📁 Estructura del proyecto
 
```
ProyectoFinal-Js/
└── proyecto-final-js/
    ├── index.html
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── pages/
    │   ├── jugar.html
    │   ├── perfil.html
    │   ├── juegos5x5/
    │   ├── juegos10x10/
    │   ├── juegos15x15/
    │   └── juegos20x20/
    ├── assets/
    └── json/
```
 
---
 
## 🚀 Cómo ejecutarlo localmente
 
### 1. Clonar el repositorio
```bash
git clone https://github.com/melibaran/TU-REPO.git
cd TU-REPO/proyecto-final-js
```
 
### 2. Abrir el proyecto
Abrí `index.html` con **Live Server** (recomendado) para evitar problemas con rutas relativas y carga de archivos JSON.
 
> Si no tenés Live Server, podés instalarlo como extensión de VS Code.
 
---
 
 
## 👩‍💻 Autora
 
**Melissa Nataly Barán**  
[GitHub](https://github.com/melibaran) · [LinkedIn](https://www.linkedin.com/in/melissa-baran-400b12239/)
