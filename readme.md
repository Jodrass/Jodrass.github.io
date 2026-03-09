Citas Clínicas Platform
Una plataforma profesional de gestión de citas clínicas construida con React 19 + Vite 7, completamente responsive y con autenticación completa para pacientes y administradores clínicos.

✨ Características principales
✅ Rutas completas con React Router DOM v7 (pacientes, citas, admin)

✅ CRUD completo (GET, POST, PUT, DELETE) con APIs externas

✅ Responsive 100%: Full HD (1920px), Laptop (990px), Tablet (767px), Móvil grande (510px), Móvil clásico (480px)

✅ Sistema de login para pacientes + panel admin clínico separado

✅ Tailwind CSS + React Hook Form + Zustand + SweetAlert2 + React Router (6 librerías extra)

✅ PWA lista para instalar (VitePWA)

✅ Desplegada en GitHub Pages

🛠️ Framework y librerías
Librería	Versión	Uso
React	19.2.0	Framework principal
React DOM	19.2.0	Renderizado
Vite	7.3.1	Build tool ultra-rápido
Tailwind CSS	3.4.19	OBLIGATORIO - Diseño responsive
React Router DOM	7.13.1	Rutas (OBLIGATORIO)
React Hook Form	7.71.2	Formularios optimizados (citas/login)
Zustand	5.0.11	Estado global (NO Axios)
SweetAlert2	11.26.22	Notificaciones elegantes
VitePWA	1.2.0	PWA instalable


📜 Licencia
MIT License - Puedes usar, modificar y distribuir libremente este código para aprendizaje y proyectos personales/comerciales.

text
Copyright (c) 2026 Jodrass

Permission is hereby granted, free of charge, to any person obtaining a copy...
🚀 Guía de instalación
1. Clonar el proyecto
bash
git clone https://github.com/Jodrass/Jodrass.github.io.git
cd Jodrass.github.io
2. Instalar dependencias
bash
npm install
3. Desarrollo local
bash
npm run dev
Abrir http://localhost:5173

4. Build para producción
bash
npm run build
Genera carpeta dist lista para deploy.

5. Vista previa del build
bash
npm run preview
🔗 Enlaces
Demo en vivo: https://jodrass.github.io/

Repo: https://github.com/Jodrass/Jodrass.github.io

📱 Despliegue automático
GitHub Actions construye y despliega automáticamente cada push a main usando la carpeta dist.

