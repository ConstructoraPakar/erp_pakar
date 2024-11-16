const fs = require('fs');
const path = require('path');

// Agregar constantes después de los requires
const COMPONENTES_REQUERIDOS = [
  'Layout',
  'Header',
  'Sidebar',
  'Button',
  'Card'
];

const PATRONES_ARCHIVO = {
  COMPONENTE: /\.jsx$/,
  ESTILO: /\.css$/,
  UTILIDAD: /\.js$/
};

const ESTRUCTURA_DIRECTORIOS = {
  COMPONENTS: '/src/components/',
  LAYOUT: '/src/components/layout/',
  LIB: '/src/lib/',
  PAGES: '/src/pages/'
};

// Escanear los archivos en el directorio /erp_pakar y sus subdirectorios, excepto /erp_pakar/script_informe y /erp_pakar/node_modules
console.log("Escaneando archivos en el directorio /erp_pakar...");
const archivos_codigo = {};

function escanearArchivos(directorio) {
  try {
    const archivos = fs.readdirSync(directorio);
    archivos.forEach(archivo => {
      const rutaArchivo = path.join(directorio, archivo);
      const estadoArchivo = fs.statSync(rutaArchivo);
      if (estadoArchivo.isDirectory()) {
        if (!['script_informe', 'node_modules', 'frontend/node_modules', 'backend/node_modules'].includes(path.basename(rutaArchivo))) {
          escanearArchivos(rutaArchivo);
        }
      } else {
        try {
          const extension = path.extname(rutaArchivo).toLowerCase();
          if (extension === '.js' || extension === '.json' || extension === '.jsx' || extension === '.css') {
            const contenido = fs.readFileSync(rutaArchivo, 'utf8');
            archivos_codigo[rutaArchivo] = contenido;
          }
        } catch (error) {
          console.log(`No se puede leer el archivo: ${rutaArchivo}`);
        }
      }
    });
  } catch (error) {
    console.log(`No se puede acceder al directorio: ${directorio}`);
  }
}

// Obtener la ruta completa del directorio /erp_pakar
const directorio_erp_pakar = path.resolve(__dirname, '..');

escanearArchivos(directorio_erp_pakar);

// Borrar los archivos de informe JSON existentes
console.log("Verificando archivos de informe JSON existentes...");
const archivos_informe = fs.readdirSync(__dirname).filter(archivo => archivo.startsWith('informe_parte') && archivo.endsWith('.json'));
if (archivos_informe.length > 0) {
  console.log("Borrando archivos de informe existentes...");
  archivos_informe.forEach(archivo => {
    fs.unlinkSync(path.join(__dirname, archivo));
    console.log(`Archivo borrado: ${archivo}`);
  });
} else {
  console.log("No se encontraron archivos de informe existentes.");
}

// Realizar verificación de consistencia
console.log("Verificando consistencia de componentes...");
const resultados_verificacion = verificarConsistencia(archivos_codigo);

// Generar el contenido del informe en formato JSON
const informe = {
  titulo: "Informe de Progreso del Proyecto ERP Multiplataforma - Constructora Pakar LTDA",
  descripcion: "Este proyecto tiene como objetivo desarrollar un ERP web multiplataforma para la Constructora Pakar LTDA, accesible desde cualquier dispositivo (ordenador, tablet, móvil) y compatible con sistemas operativos como Windows, macOS, Linux, Android e iOS.",
  plan_trabajo: [
    {
      tarea: "Configuración del Entorno de Desarrollo Local",
      descripcion: "Preparar el entorno local para el desarrollo, asegurando que todas las dependencias estén instaladas y configuradas para una aplicación multiplataforma.",
      estado: "Completado",
      detalles: "Se ha configurado Node.js v18, npm, y las dependencias necesarias para el backend y frontend"
    },
    {
      tarea: "Implementación del Sistema de Autenticación de Usuarios",
      descripcion: "Desarrollar un sistema de autenticación para controlar el acceso al ERP mediante correo y contraseña.",
      estado: "Pendiente",
      detalles: `El sistema de autenticación incluirá:
    
      1. **Configuración de la Base de Datos para Autenticación**
         - Crear una tabla en la base de datos para almacenar correos, contraseñas encriptadas y roles.
      
      2. **Desarrollo de la Interfaz de Login**
         - Crear una pantalla de inicio de sesión que contenga los campos de correo y contraseña.
      
      3. **Implementación de Autenticación en el Backend**
         - Crear un endpoint que valide las credenciales y devuelva un token de autenticación en caso de éxito.
      
      4. **Gestión de Sesiones y Redireccionamiento**
         - Almacenar el token en el navegador y redirigir a la pantalla de login si el usuario no está autenticado.
      
      5. **Protección de Rutas y Autorización Basada en Roles**
         - Configurar permisos según el rol del usuario, permitiendo acceso solo a usuarios autorizados.
      
      6. **Pruebas de Seguridad y Validación de Acceso**
         - Realizar pruebas de seguridad para validar que el sistema esté seguro y funcione correctamente.`
    },   
    {
      tarea: "Diseño de la Arquitectura del ERP",
      descripcion: "Definir una estructura base que permita la ejecución del ERP en múltiples plataformas, garantizando compatibilidad en diferentes dispositivos y sistemas operativos.",
      estado: "Completado",
      detalles: "Se ha implementado una arquitectura separada en backend, frontend, assets y utilidades"
    },
    {
      tarea: "Desarrollo de los Modelos de Datos",
      descripcion: "Crear los modelos que representarán las entidades clave del sistema (Usuarios, Bodega, Finanzas, etc.) y asegurar que funcionen en cualquier plataforma.",
      estado: "Completado",
      detalles: "Modelos implementados en backend/models/"
    },
    {
      tarea: "Desarrollo de la API RESTful",
      descripcion: "Implementar una API que permita la interacción de los módulos del ERP con otros servicios externos y que funcione en todas las plataformas.",
      estado: "Completado",
      detalles: "APIs implementadas en backend/routes/"
    },
    {
      tarea: "Diseño de la Interfaz de Usuario Multiplataforma",
      descripcion: "Diseñar una interfaz adaptable y responsiva, optimizada para distintos dispositivos, desde móviles hasta pantallas grandes.",
      estado: "En Progreso",
      detalles: "Frontend iniciado con React + Vite + Tailwind CSS"
    },
    {
      tarea: "Desarrollo de la Interfaz Maestra",
      descripcion: `Crear una interfaz maestra estandarizada que incluya colores, tipografías, botones, menús desplegables, notificaciones y otros componentes visuales. Esto garantizará un diseño intuitivo, profesional y consistente en todo el ERP. Los componentes incluyen:

- Paleta de Colores:
  * Primario (#17a2b8)
  * Secundario (#00949a)
  * Fondo (#f8f9fa)
  * Botones: Afirmativo (#28a745), Negativo (#dc3545), Informativo (#17a2b8), Advertencia (#ffc107)
  * Sombras y bordes (#rgba(0, 0, 0, 0.1))

- Menús Desplegables:
  * Menú Usuario: Perfil y configuración
  * Menú Notificaciones: Panel de avisos
  * Menú Acciones: Opciones contextuales
  * Menú Filtros: Filtrado avanzado
  * Menú Documentos: Gestión de archivos
  * Menú Reportes: Vista en grid de informes

- Componentes Comunes:
  * Bordes redondeados (rounded-lg)
  * Sombras suaves para profundidad
  * Transiciones animadas
  * Espaciado consistente
  * Iconografía unificada
  * Tipografía estandarizada`,
      estado: "En Progreso",
      detalles: "Diseño base implementado, componentes en desarrollo. Se agregó la campana de notificaciones en el Header, preparada para futura integración con API de notificaciones."
    },
    {
      tarea: "Integración de Sistema de Notificaciones",
      descripcion: "Añadir un icono de campana en el encabezado para mostrar notificaciones pendientes y preparar la infraestructura para futuras integraciones con APIs que provean notificaciones en tiempo real a los usuarios.",
      estado: "En Progreso",
      detalles: "Icono de campana añadido en Header.jsx mostrando número de notificaciones pendientes. Pendiente integración con API real."
    },
    {
      "tarea": "Implementación del Sistema de Autenticación de Usuarios",
      "descripcion": "Desarrollar un sistema de autenticación para controlar el acceso al ERP mediante correo y contraseña.",
      "estado": "Completado",
      "detalles": "Se ha implementado un sistema de autenticación con JWT para proteger las rutas del ERP."
    },
    {
      "tarea": "Gestión de Usuarios",
      "descripcion": "Crear, editar, eliminar y proteger usuarios del ERP, con validación de contraseña para acciones críticas.",
      "estado": "Completado",
      "detalles": "Se implementaron las funcionalidades de gestión de usuarios, incluyendo validación de contraseña para eliminaciones."
    },    
    {
      tarea: "Instalación de Handsontable y Hyperformulas",
      descripcion: "Se han instalado las librerías Handsontable y Hyperformulas en el proyecto para su uso futuro en módulos que requieran funcionalidad de hoja de cálculo y fórmulas avanzadas.",
      estado: "Completado",
      detalles: "Las librerías están listas para ser utilizadas en el ERP cuando sea necesario en el módulo de Proyectos u otros."
    },
    {
      tarea: "Desarrollo del Módulo de Administración",
      descripcion: "Implementar el módulo de administración con funcionalidades de configuración de usuarios, permisos, reportes de datos y auditoría, asegurando la seguridad y eficiencia en el acceso a los datos.",
      estado: "Completado",
      detalles: "Módulo implementado en el backend"
    },
    {
      tarea: "Reorganización de la Estructura del Proyecto",
      descripcion: "Reorganizar la estructura del proyecto para mejor mantenimiento y escalabilidad.",
      estado: "Completado",
      detalles: "Proyecto organizado en carpetas: backend/, frontend/, assets/, script_informe/"
    }
  ],
  checklist: [
    "✓ Configuración del Entorno de Desarrollo Local",
    "✓ Diseño de la Arquitectura del ERP",
    "✓ Desarrollo de los Modelos de Datos",
    "✓ Desarrollo de la API RESTful",
    "⟳ Diseño de la Interfaz de Usuario Multiplataforma",
    "⟳ Desarrollo de la Interfaz Maestra",
    "⟳ Integración de Sistema de Notificaciones",
    "✓ Desarrollo del Módulo de Administración",
    "✓ Reorganización de la Estructura del Proyecto",
    "✓ Instalación de Handsontable y Hyperformulas",
    "Integración de Seguridad y Autenticación",
    "Pruebas y Validación de APIs",
    "Control de Versiones con GitHub",
    "Despliegue en el Servidor",
    "Documentación Técnica y Manual de Usuario",
    "Reportes en el módulo de Administración",
    "Validaciones y Manejo de Errores",
    "✓ Instalación de pgAdmin4"
  ],
  estructura_actual: {
    directorios: [
      "/erp_pakar",
      "/erp_pakar/assets",
      "/erp_pakar/backend",
      "/erp_pakar/backend/models",
      "/erp_pakar/backend/routes",
      "/erp_pakar/frontend",
      "/erp_pakar/frontend/src",
      "/erp_pakar/frontend/src/components",
      "/erp_pakar/frontend/src/components/layout",
      "/erp_pakar/frontend/src/lib",
      "/erp_pakar/script_informe"
    ],
    archivos_principales: [
      "backend/app.js",
      "backend/config.js",
      "backend/package.json",
      "frontend/package.json",
      "frontend/tailwind.config.js",
      "frontend/postcss.config.js",
      "frontend/src/App.jsx",
      "frontend/src/main.jsx",
      "frontend/src/index.css",
      "frontend/src/components/layout/Layout.jsx",
      "frontend/src/components/layout/Header.jsx",
      "frontend/src/components/layout/Sidebar.jsx",
      "frontend/src/lib/utils.js",
      "backend/routes/auth.js",
      "frontend/src/pages/Login.jsx",
      "frontend/src/pages/UserManagement.jsx"
    ]
  },
  informacion_adicional: {
    repositorio: "https://github.com/usuario/ERP_PAKAR",
    servidor: {
      ip: "192.168.0.1",
      usuario: "admin",
      contrasena: "p@ssw0rd"
    },
    colores: {
      primario: "#17a2b8",
      secundario: "#00949a",
      fondo: "#f8f9fa",
      positivo: "#28a745",
      negativo: "#dc3545",
      informacion: "#17a2b8",
      advertencia: "#ffc107",
      sombra_borde: "rgba(0, 0, 0, 0.1)"
    },
    componentes_base: {
      layout: {
        archivo: "src/components/layout/Layout.jsx",
        uso: "Componente contenedor principal para todas las páginas",
        estructura: "Header + Sidebar + Main Content"
      },
      header: {
        archivo: "src/components/layout/Header.jsx",
        uso: "Barra superior de navegación",
        elementos: ["Menú móvil", "Perfil usuario", "Icono de notificaciones"]
      },
      sidebar: {
        archivo: "src/components/layout/Sidebar.jsx",
        uso: "Navegación principal",
        elementos: ["Logo", "Links de navegación"]
      }
    },
    dependencias_criticas: {
      frontend: {
        "tailwindcss": "^3.4.14",
        "@headlessui/react": "^2.2.0",
        "clsx": "^2.1.1",
        "lucide-react": "^0.454.0",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "tailwind-merge": "^2.5.4",
        "handsontable": "^11.0.0", // Librería añadida para vista de hoja de cálculo
        "hyperformulas": "^1.4.0" // Librería añadida para fórmulas en hoja de cálculo
      }
    },
    estructura_frontend: {
      src: {
        components: {
          descripcion: "Componentes reutilizables organizados por funcionalidad",
          estructura: {
            layout: "Componentes de estructura base",
            common: "Componentes compartidos",
            features: "Componentes específicos de funcionalidad"
          }
        },
        lib: {
          descripcion: "Utilidades y funciones helper",
          archivos: ["utils.js"]
        },
        pages: {
          descripcion: "Páginas principales de la aplicación",
          estructura: "Una carpeta por módulo"
        }
      }
    }
  },
  "configuracion_env": {
  "entorno_local": {
    "descripcion": "Configuración del entorno local para desarrollo",
    "variables": {
      "VITE_API_URL": "http://localhost:3000/api"
    }
  },
  "entorno_servidor": {
    "descripcion": "Configuración del entorno de producción para despliegue",
    "instrucciones": [
      "Editar el archivo .env en el servidor para reflejar la URL pública de la API.",
      "Ejemplo:",
      {
        "VITE_API_URL": "https://tu-dominio.com/api"
      }
    ]
  }
},
"migracion_servidor": {
  "descripcion": "Pasos para migrar el ERP al servidor de producción.",
  "pasos": [
    "1. Configurar el archivo .env en el servidor con la URL pública de la API.",
    "2. Instalar las dependencias en el servidor (`npm install` en backend y frontend).",
    "3. Construir la aplicación frontend con `npm run build`.",
    "4. Configurar un servidor web (por ejemplo, Nginx o Apache) para servir la aplicación frontend.",
    "5. Configurar el backend para escuchar en un puerto público, asegurándose de que las rutas estén protegidas."
  ]
},

  prompts_ia: [
    "Realizar solo los cambios solicitados explícitamente.",
    "Las nuevas vistas deben seguir el diseño y componentes de la interfaz maestra.",
    "Utilizar exclusivamente los componentes base definidos en la interfaz maestra para menús y botones.",
    "Mantener la consistencia visual siguiendo los estilos y colores establecidos.",
    "Implementar los menús desplegables usando los modelos proporcionados en la documentación.",
    "Toda nueva página o componente debe seguir la estructura de archivos establecida en frontend/src/components.",
    "Los componentes deben utilizar las utilidades de TailwindCSS existentes en el proyecto.",
    "Los estilos deben seguir el formato establecido en el archivo tailwind.config.js.",
    "Mantener la estructura de Layout -> Página -> Componentes.",
    "Utilizar los componentes base existentes (Layout, Header, Sidebar) como plantilla para nuevos desarrollos.",
    "No crear nuevos archivos de estilos CSS, utilizar las clases de Tailwind.",
    "Seguir el patrón de organización de componentes establecido en la carpeta components/layout",
    "Considerar la configuración del archivo .env tanto en local como en producción al desarrollar nuevas funcionalidades.",
    "Documentar en el informe cualquier cambio que afecte la migración al servidor."
  ],
  diagrama_archivos: Object.keys(archivos_codigo),
  archivos_codigo: archivos_codigo,
  verificacion_consistencia: {
    fecha_verificacion: new Date().toISOString(),
    resultados: resultados_verificacion,
    recomendaciones: [
      "Asegurar que todos los componentes importen las utilidades de Tailwind",
      "Evitar el uso de estilos inline y archivos CSS adicionales",
      "Mantener la estructura estándar de componentes",
      "Utilizar las clases de Tailwind para todos los estilos"
    ]
  },
  guias_desarrollo: {
    componentes: {
      estructura_requerida: [
        "Importar utils de Tailwind",
        "Usar export default function",
        "Implementar PropTypes",
        "Usar clases de Tailwind para estilos"
      ],
      ejemplos: {
        correcto: `
import { cn } from '../../lib/utils';

export default function MiComponente({ titulo, children }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{titulo}</h2>
      {children}
    </div>
  );
}
        `,
        incorrecto: `
// ❌ No usar estilos inline
export const MiComponente = (props) => {
  return (
    <div style={{padding: '1rem'}}>
      {props.children}
    </div>
  );
}
        `
      }
    }
  }
};

// Escribir el informe en un archivo JSON
const informe_json = JSON.stringify(informe, null, 2);
fs.writeFileSync(path.join(__dirname, 'informe_erp.json'), informe_json);
console.log("El informe JSON se ha generado exitosamente.");

// Definir la función verificarConsistencia
function verificarConsistencia(archivos_codigo) {
  const resultados = {
    componentes_verificados: [],
    advertencias: [],
    errores: [],
    estadisticas: {
      total_componentes: 0,
      componentes_validos: 0,
      archivos_css_encontrados: 0,
      uso_tailwind: 0
    }
  };

  // Patrones a verificar
  const patrones = {
    importTailwind: /import\s+\{\s*cn\s*\}\s+from\s+['"].*\/lib\/utils['"]/,
    clasesTailwind: /className=['"`]([\w\s-\[\]\/:{}@]+)['"`]/g,
    estilosInline: /style={{/g,
    componentesBase: new RegExp(`(${COMPONENTES_REQUERIDOS.join('|')})\\.jsx$`),
    cssArchivos: /\.css$/,
    estructuraComponente: /export\s+default\s+function\s+\w+/
  };

  // Verificar cada archivo
  for (const [ruta, contenido] of Object.entries(archivos_codigo)) {
    // Solo verificar archivos de componentes React
    if (ruta.includes('/src/components/') && ruta.endsWith('.jsx')) {
      resultados.estadisticas.total_componentes++;
      
      // Verificar importación de utilidades de Tailwind
      if (!patrones.importTailwind.test(contenido)) {
        resultados.advertencias.push(`${ruta}: No importa las utilidades de Tailwind`);
      }

      // Verificar uso de clases Tailwind
      const clasesEncontradas = contenido.match(patrones.clasesTailwind);
      if (clasesEncontradas) {
        resultados.estadisticas.uso_tailwind++;
      }

      // Verificar estilos inline
      if (patrones.estilosInline.test(contenido)) {
        resultados.advertencias.push(`${ruta}: Contiene estilos inline que deberían usar Tailwind`);
      }

      // Verificar estructura del componente
      if (!patrones.estructuraComponente.test(contenido)) {
        resultados.errores.push(`${ruta}: No sigue la estructura estándar de componentes`);
      }

      resultados.componentes_verificados.push({
        ruta,
        valido: !patrones.estilosInline.test(contenido) && patrones.estructuraComponente.test(contenido),
        usa_tailwind: !!clasesEncontradas
      });
    }

    // Verificar archivos CSS (solo debería existir index.css)
    if (patrones.cssArchivos.test(ruta) && !ruta.endsWith('index.css')) {
      resultados.estadisticas.archivos_css_encontrados++;
      resultados.advertencias.push(`${ruta}: Archivo CSS detectado. Considerar usar Tailwind`);
    }
  }

  resultados.estadisticas.componentes_validos = resultados.componentes_verificados.filter(c => c.valido).length;

  return resultados;
}
