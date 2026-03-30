import { OperationContent } from "../operation-types";
import { OperationKey } from "../../../types/operations";

const operationsEsContent: Record<OperationKey, OperationContent> = {
  compress: {
    key: "compress",
    slug: "comprimir",
    mode: "compress",
    meta: {
      title: "Comprimir PDF Online Gratis | Reducir Tamaño | PDFLince",
      description:
        "Reduce el tamaño de tus PDF eficientemente sin perder calidad. Compresión privada y gratuita directamente en tu navegador.",
      keywords: [
        "comprimir pdf",
        "reducir tamaño pdf",
        "optimizar pdf",
        "compresor pdf online",
        "pdf ligero",
      ],
      ogTitle: "Comprime PDFs sin perder calidad | PDFLince",
      ogDescription:
        "Arrastra tu archivo, selecciona el nivel de compresión ideal y descarga un PDF optimizado en segundos. Todo seguro y sin subir documentos a servidores.",
      ogImageAlt: "Herramienta para comprimir PDF con PDFLince",
    },
    hero: {
      title: "Comprimir PDF online sin perder calidad",
      description:
        "Optimiza el tamaño de tus documentos para enviarlos por correo, plataformas educativas o trámites oficiales sin sacrificar legibilidad.",
      bulletPoints: [
        "Procesamiento 100% local, tus archivos nunca salen del navegador",
        "Elige entre compresión básica, media o agresiva según tu prioridad",
        "Preserva metadatos y estructura del documento si lo necesitas",
      ],
      imageAlt: "Compresión de un documento PDF con PDFLince",
    },
    benefitsTitle: "Por qué comprimir PDFs con PDFLince",
    benefits: [
      {
        title: "Calidad equilibrada",
        description:
          "Nuestro motor de compresión analiza cada recurso para ofrecer la mayor reducción sin perder nitidez en textos ni gráficos.",
      },
      {
        title: "Preparado para trámites",
        description:
          "Obtén archivos listos para subir a plataformas de administración pública, universidades o portales de empleo que imponen límites estrictos de peso.",
      },
      {
        title: "Seguridad por diseño",
        description:
          "Al no subir tus PDFs a servidores externos, evitas fugas de información y cumples con políticas de privacidad corporativas.",
      },
    ],
    howTo: {
      title: "Cómo comprimir un PDF con PDFLince",
      steps: [
        "Haz clic en \"Sube tus archivos\" y elige el PDF que quieres optimizar.",
        "Selecciona el nivel de compresión y las opciones avanzadas, como preservar metadatos.",
        "Pulsa \"Procesar\" y descarga el archivo comprimido en segundos.",
      ],
      note:
        "Si trabajas con varios informes, puedes comprimirlos uno a uno sin límites de uso diarios ni marcas de agua.",
    },
    useCasesTitle: "Cuándo conviene comprimir un PDF",
    useCases: [
      "Enviar contratos, facturas o manuales por correo electrónico sin rebotar en el límite de adjuntos.",
      "Subir archivos a aulas virtuales, Moodle o Canvas que exigen un máximo por documento.",
      "Reducir el peso de memorias, tesis o catálogos para mejorar la velocidad de descarga.",
      "Archivar documentación en la nube ahorrando espacio sin perder información relevante.",
    ],
  },
  merge: {
    key: "merge",
    slug: "unir",
    mode: "merge",
    meta: {
      title: "Unir PDF Online | Combinar Varios PDFs Gratis | PDFLince",
      description:
        "Combina múltiples PDF en un único documento sin límites. Arrastra, ordena y descarga tu archivo fusionado al instante con total privacidad.",
      keywords: [
        "unir pdf",
        "combinar pdf",
        "juntar archivos pdf",
        "fusionar pdf online",
        "merge pdf",
      ],
      ogTitle: "Une varios PDFs en segundos | PDFLince",
      ogDescription:
        "Organiza tus documentos en el orden perfecto, ajusta las opciones y descarga un PDF unificado sin subir nada a la nube.",
      ogImageAlt: "Unión de múltiples PDFs en la plataforma PDFLince",
    },
    hero: {
      title: "Unir PDF online rápido y seguro",
      description:
        "Combina contratos, notas de clase o pólizas en un único archivo listo para enviar, firmar o archivar.",
      bulletPoints: [
        "Ordena los PDFs con arrastrar y soltar para controlar el resultado",
        "Sin límites ocultos: une documentos extensos sin coste",
        "Preserva marcadores y metadatos si así lo prefieres",
      ],
      imageAlt: "Fusión de archivos PDF en PDFLince",
    },
    benefitsTitle: "Ventajas de unir PDFs con PDFLince",
    benefits: [
      {
        title: "Consistencia en la presentación",
        description:
          "Garantiza que todo el material se entregue en un documento único, con numeración continua y formato homogéneo.",
      },
      {
        title: "Ahorro de tiempo",
        description:
          "Evita reabrir editores pesados. Arrastra los archivos, ordénalos y descárgalos listos para compartir.",
      },
      {
        title: "Privado y sin registros",
        description:
          "No almacenamos copias ni solicitamos datos personales. Ideal para información sensible o confidencial.",
      },
    ],
    howTo: {
      title: "Cómo unir PDFs con PDFLince",
      steps: [
        "Clica en \"Sube tus archivos\" y selecciona al menos dos PDFs.",
        "Utiliza las flechas o arrastra cada archivo para definir el orden definitivo.",
        "Elige las opciones de marcadores y pulsa \"Procesar\" para descargar el documento combinado.",
      ],
      note:
        "Puedes añadir más archivos incluso después de haber cargado los primeros sin reiniciar el proceso.",
    },
    useCasesTitle: "Cuándo necesitas unir PDFs",
    useCases: [
      "Preparar un único dossier con anexos, presupuestos y condiciones comerciales.",
      "Enviar varias facturas mensuales en un solo archivo a contabilidad.",
      "Reunir apuntes escaneados y presentaciones en un PDF para los estudiantes.",
      "Crear un paquete de documentos legales para firma electrónica.",
    ],
  },
  split: {
    key: "split",
    slug: "dividir",
    mode: "split",
    meta: {
      title: "Dividir PDF por Páginas o Capítulos | Gratis | PDFLince",
      description:
        "Separa tu PDF en varios archivos por rangos o capítulos. Control total sobre la estructura de tu documento sin subir nada al servidor.",
      keywords: [
        "dividir pdf",
        "separar pdf",
        "dividir pdf por paginas",
        "split pdf",
        "partir pdf",
      ],
      ogTitle: "Divide tus PDFs con precisión | PDFLince",
      ogDescription:
        "Elige exactamente cómo dividir tu documento, genera tantos archivos individuales como necesites y descárgalos al instante en tu dispositivo.",
      ogImageAlt: "Proceso de división de un PDF en PDFLince",
    },
    hero: {
      title: "Dividir PDF por páginas o segmentos",
      description:
        "Extrae capítulos, anexos o secciones concretas en archivos independientes listos para compartir.",
      bulletPoints: [
        "Configura divisiones por número de páginas o tamaño",
        "Obtén varios PDFs listos en un único procesamiento",
        "Trabaja sin límites de páginas ni marcas de agua",
      ],
      imageAlt: "Separación de capítulos de un documento PDF",
    },
    benefitsTitle: "Qué aporta dividir PDFs con PDFLince",
    benefits: [
      {
        title: "Mayor control sobre la información",
        description:
          "Entrega únicamente la parte relevante del documento para cada destinatario sin revelar datos sensibles del resto.",
      },
      {
        title: "Entrega escalable",
        description:
          "Genera múltiples archivos en un solo paso y descárgalos automáticamente listos para archivar o enviar.",
      },
      {
        title: "Ajustes avanzados",
        description:
          "Selecciona páginas por lotes, añade separadores o decide el formato de salida según tus flujos de trabajo.",
      },
    ],
    howTo: {
      title: "Cómo dividir un PDF con PDFLince",
      steps: [
        "Carga el PDF que quieres segmentar desde tu equipo.",
        "Elige si prefieres dividir por número fijo de páginas o según el tamaño del archivo.",
        "Pulsa \"Procesar\" y descarga los documentos generados automáticamente.",
      ],
      note:
        "PDFLince descargará el primer archivo de inmediato y guardará los siguientes en tu dispositivo sin pasos extra.",
    },
    useCasesTitle: "Escenarios habituales para dividir PDFs",
    useCases: [
      "Publicar cada capítulo de un libro digital en una plataforma educativa.",
      "Separar anexos que deben enviarse por canales distintos.",
      "Extraer resúmenes trimestrales de reportes financieros extensos.",
      "Crear paquetes compactos para clientes sin incluir toda la documentación interna.",
    ],
  },
  extract: {
    key: "extract",
    slug: "extraer",
    mode: "extract",
    meta: {
      title: "Extraer Páginas de un PDF | Guardar Sueltas | PDFLince",
      description:
        "Selecciona páginas de cualquier PDF y crea un nuevo documento al instante. Procesamiento privado y sin límites en tu navegador.",
      keywords: [
        "extraer paginas pdf",
        "guardar paginas pdf",
        "seleccionar paginas pdf",
        "extract pdf pages",
        "crear nuevo pdf",
      ],
      ogTitle: "Extrae solo las páginas que necesitas | PDFLince",
      ogDescription:
        "Marca las páginas relevantes que quieres conservar, genera un nuevo archivo PDF en segundos y mantén tus datos seguros en tu propio dispositivo.",
      ogImageAlt: "Selección de páginas dentro de un PDF",
    },
    hero: {
      title: "Extraer páginas específicas de un PDF",
      description:
        "Construye documentos a medida seleccionando únicamente las páginas que necesitas compartir o archivar.",
      bulletPoints: [
        "Visualiza miniaturas y marca páginas individuales",
        "Mantén la numeración original o crea nuevas secciones",
        "Descarga el PDF resultante al instante sin esperas",
      ],
      imageAlt: "Selección de páginas en PDFLince",
    },
    benefitsTitle: "Ventajas de extraer páginas con PDFLince",
    benefits: [
      {
        title: "Documentos más relevantes",
        description:
          "Comparte solo la información útil para tu equipo o clientes evitando datos redundantes.",
      },
      {
        title: "Control total desde tu navegador",
        description:
          "Selecciona, visualiza y verifica cada página sin depender de software pesado ni conexión estable.",
      },
      {
        title: "Resultados limpios",
        description:
          "El nuevo PDF conserva la calidad y los metadatos que definas en las opciones avanzadas.",
      },
    ],
    howTo: {
      title: "Cómo extraer páginas con PDFLince",
      steps: [
        "Sube el PDF y elige el archivo con el que quieres trabajar.",
        "Marca las páginas que necesitas desde el panel de miniaturas.",
        "Haz clic en \"Procesar\" para descargar un PDF con las páginas seleccionadas.",
      ],
      note:
        "Puedes combinar la extracción con otras operaciones como unir o comprimir en diferentes sesiones.",
    },
    useCasesTitle: "Ideas para extraer páginas de un PDF",
    useCases: [
      "Compartir solo el capítulo asignado de un manual con tu equipo.",
      "Enviar páginas concretas de una hipoteca o contrato para revisión legal.",
      "Crear dossiers personalizados para clientes con información relevante.",
      "Guardar solo las páginas con formularios o comprobantes que necesitas archivar.",
    ],
  },
  rotate: {
    key: "rotate",
    slug: "girar",
    mode: "rotate",
    meta: {
      title: "Girar páginas PDF online | Girar hojas seleccionadas | PDFLince",
      description:
        "Rota páginas concretas de un PDF en 90 o 180 grados directamente en tu navegador. Gratis, privado y sin subir archivos.",
      keywords: [
        "girar pdf",
        "girar paginas pdf",
        "cambiar orientacion pdf",
        "corregir pdf torcido",
        "giracion de paginas pdf",
      ],
      ogTitle: "Gira páginas PDF en segundos | PDFLince",
      ogDescription:
        "Selecciona las páginas que necesitan otra orientación, elige 90 o 180 grados y descarga el PDF corregido sin subir nada.",
      ogImageAlt: "Girar páginas PDF en PDFLince",
    },
    hero: {
      title: "Gira páginas PDF sin perder calidad",
      description:
        "Corrige escaneos girados, exportaciones boca abajo o documentos con orientaciones mezcladas en pocos clics.",
      bulletPoints: [
        "Rota solo las páginas que selecciones, no todo el documento",
        "Elige girar 90 grados a la derecha, 180 grados o 90 grados a la izquierda",
        "Todo sucede en tu navegador, sin subidas ni esperas",
      ],
      imageAlt: "Flujo de rotación de páginas PDF",
    },
    benefitsTitle: "Por qué girar páginas con PDFLince",
    benefits: [
      {
        title: "Correcciones precisas",
        description:
          "Ajusta solo las hojas que lo necesitan, ideal para lotes escaneados o informes largos con orientaciones mixtas.",
      },
      {
        title: "Arreglo rápido",
        description:
          "Corrige la orientación en segundos sin reabrir el archivo en un editor pesado de escritorio.",
      },
      {
        title: "Privacidad total",
        description:
          "Los documentos sensibles permanecen en tu dispositivo porque la rotación se ejecuta localmente.",
      },
    ],
    howTo: {
      title: "Cómo girar páginas PDF",
      steps: [
        "Sube el PDF y elige el archivo con las páginas que quieres corregir.",
        "Marca las páginas y selecciona 90 grados a la derecha, 180 grados o 90 grados a la izquierda.",
        "Pulsa \"Procesar\" para descargar un nuevo PDF con la orientación ya corregida.",
      ],
      note:
        "Si luego necesitas más ajustes, puedes reordenar, extraer o comprimir el PDF resultante en otro paso.",
    },
    useCasesTitle: "Cuándo conviene girar páginas",
    useCases: [
      "Enderezar contratos, formularios o recibos escaneados de lado.",
      "Corregir páginas boca abajo dentro de informes montados desde varias fuentes.",
      "Preparar apuntes o manuales antes de compartirlos con alumnado o clientes.",
      "Limpiar archivos históricos para que todas las páginas se lean con comodidad.",
    ],
  },
  reorder: {
    key: "reorder",
    slug: "reordenar",
    mode: "reorder",
    meta: {
      title: "Reordenar Páginas PDF | Cambiar Orden Rápido | PDFLince",
      description:
        "Reorganiza fácilmente las páginas de tu PDF arrastrando y soltando. Corrige el orden y guarda el resultado al instante, todo localmente.",
      keywords: [
        "reordenar pdf",
        "cambiar orden paginas pdf",
        "organizar pdf",
        "rearrange pdf",
        "ordenar paginas documento",
      ],
      ogTitle: "Organiza tus PDFs sin reinstalar software | PDFLince",
      ogDescription:
        "Mueve las páginas a su posición correcta, corrige errores de orden y descarga tu documento PDF perfectamente organizado en solo unos momentos.",
      ogImageAlt: "Reordenación de páginas dentro de la interfaz PDFLince",
    },
    hero: {
      title: "Reordenar páginas de un PDF con arrastrar y soltar",
      description:
        "Corrige el orden de facturas escaneadas, presentaciones o informes extensos en cuestión de segundos.",
      bulletPoints: [
        "Visualiza miniaturas grandes para evitar errores",
        "Arrastra páginas y confirma el nuevo orden al instante",
        "Genera un PDF reorganizado sin perder marcadores ni enlaces internos",
      ],
      imageAlt: "Reordenación visual de páginas PDF",
    },
    benefitsTitle: "Beneficios de reorganizar PDFs con PDFLince",
    benefits: [
      {
        title: "Flujos de trabajo más ágiles",
        description:
          "Corrige escaneos desordenados sin volver a digitalizar ni instalar editores complejos.",
      },
      {
        title: "Precisión visual",
        description:
          "Las miniaturas permiten validar cada página antes de exportar el nuevo orden.",
      },
      {
        title: "Sin dejar rastro",
        description:
          "Todo el proceso sucede en tu dispositivo, ideal para documentación sensible o confidencial.",
      },
    ],
    howTo: {
      title: "Cómo reordenar páginas con PDFLince",
      steps: [
        "Sube el PDF y selecciona el archivo que quieres editar.",
        "Arrastra cada miniatura hasta lograr el orden correcto.",
        "Haz clic en \"Procesar\" para descargar el documento con la nueva secuencia.",
      ],
      note:
        "Puedes seguir ajustando el orden incluso después de una exportación sin tener que cargar el archivo de nuevo.",
    },
    useCasesTitle: "Cuándo reorganizar un PDF",
    useCases: [
      "Alinear presupuestos, anexos y firmas en un orden lógico antes de enviar.",
      "Preparar presentaciones impresas con la secuencia correcta.",
      "Resolver errores de páginas duplicadas o invertidas tras un escaneo masivo.",
      "Actualizar manuales o catálogos reutilizando contenido existente sin maquetar desde cero.",
    ],
  },
  pdfToImages: {
    key: "pdfToImages",
    slug: "convertir-pdf-a-imagenes",
    mode: "pdfToImages",
    meta: {
      title: "Convertir PDF a Imágenes | Exportar a PNG/JPEG | PDFLince",
      description:
        "Convierte cada página de tu PDF en imágenes PNG o JPEG de alta calidad. Elige tu resolución y descarga todo como un archivo ZIP — 100% privado y seguro.",
      keywords: [
        "pdf a imagenes",
        "pdf a png",
        "pdf a jpeg",
        "exportar paginas pdf",
        "descargar pdf como imagen",
      ],
      ogTitle: "Exporta páginas PDF como imágenes nítidas | PDFLince",
      ogDescription:
        "Renderiza cada página como una imagen nítida directamente en tu navegador. Ajusta la calidad, define nombres y obtén un archivo ZIP ordenado al instante.",
      ogImageAlt: "PDFLince exportando un PDF a imágenes",
    },
    hero: {
      title: "Convierte páginas PDF en PNG o JPEG",
      description:
        "Genera imágenes listas para presentaciones, revisiones o entregables sin depender de editores pesados.",
      bulletPoints: [
        "Elige PNG o JPEG y controla el DPI de salida",
        "Descarga un ZIP único o cada imagen por separado",
        "Procesamiento 100% local en tu navegador, sin subidas",
      ],
      imageAlt: "Exportación de PDF a imágenes",
    },
    benefitsTitle: "Por qué exportar PDFs con PDFLince",
    benefits: [
      {
        title: "Calidad lista para presentaciones",
        description:
          "Selecciona la resolución ideal para diapositivas, intranets o flujos de diseño sin perder nitidez.",
      },
      {
        title: "Descargas flexibles",
        description:
          "Mantén un ZIP ordenado para documentos extensos o descarga solo las páginas que necesitas.",
      },
      {
        title: "Privacidad garantizada",
        description:
          "El render se ejecuta en tu navegador, perfecto para documentos confidenciales o bajo NDA.",
      },
    ],
    howTo: {
      title: "Cómo convertir un PDF a imágenes",
      steps: [
        "Sube el PDF que quieres convertir. Trabajamos un archivo a la vez para asegurar la calidad.",
        "Elige PNG o JPEG, ajusta el DPI y decide si quieres agrupar los resultados en un ZIP.",
        "Haz clic en \"Exportar imágenes\" para descargar el archivo comprimido o las páginas individuales.",
      ],
      note:
        "¿Solo necesitas algunas páginas? Usa primero la extracción o división y luego conviértelas a imágenes.",
    },
    useCasesTitle: "Cuándo ayuda convertir PDF a imágenes",
    useCases: [
      "Compartir avances de diseño sin enviar el PDF completo.",
      "Insertar páginas en CMS, presentaciones o herramientas que solo aceptan imágenes.",
      "Crear material para tabletas o e-readers que manejan mejor PNG/JPEG que PDFs.",
      "Documentar revisiones internas con capturas de cada página.",
    ],
  },
  imagesToPdf: {
    key: "imagesToPdf",
    slug: "crear-pdf-desde-imagenes",
    mode: "imagesToPdf",
    meta: {
      title: "Crear PDF desde Imágenes | JPG, PNG a PDF | PDFLince",
      description:
        "Crea un PDF profesional a partir de tus imágenes. Organiza fotos, personaliza el diseño y los márgenes, y genera tu documento localmente en tu navegador.",
      keywords: [
        "imagenes a pdf",
        "jpg a pdf",
        "png a pdf",
        "webp a pdf",
        "crear pdf con fotos",
      ],
      ogTitle: "Crea un PDF impecable a partir de tus imágenes | PDFLince",
      ogDescription:
        "Arrastra tus imágenes, define la configuración de diseño y exporta un archivo PDF listo para imprimir, sin subidas ni marcas de agua.",
      ogImageAlt: "Creación de PDF a partir de imágenes en PDFLince",
    },
    hero: {
      title: "Reúne JPG o PNG en un PDF profesional",
      description:
        "Compila escaneos, fotos o gráficos en un único documento listo para tu equipo, alumnado o clientes.",
      bulletPoints: [
        "Reordena las imágenes con arrastrar y soltar",
        "Configura tamaño de página, orientación y márgenes",
        "Define un color de fondo sólido para evitar transparencias",
      ],
      imageAlt: "Flujo de imágenes a PDF",
    },
    benefitsTitle: "Ventajas de crear PDFs desde imágenes",
    benefits: [
      {
        title: "Diseño consistente",
        description:
          "Alinea formatos distintos en un PDF uniforme sin estiramientos ni recortes inesperados.",
      },
      {
        title: "Listo para imprimir o revisar",
        description:
          "Controla márgenes, orientación y fondo para que el PDF luzca bien en papel y en pantalla.",
      },
      {
        title: "Procesamiento seguro",
        description:
          "La conversión sucede íntegramente en tu navegador, ideal para recibos, identificaciones o material educativo.",
      },
    ],
    howTo: {
      title: "Cómo convertir imágenes a PDF",
      steps: [
        "Añade las imágenes que quieres incluir y ordénalas según el documento final.",
        "Ajusta el modo de ajuste, el tamaño de página, la orientación y los márgenes.",
        "Pulsa \"Crear PDF\" para descargar el archivo listo para compartir o archivar.",
      ],
      note:
        "¿El PDF final pesa mucho? Puedes comprimirlo o dividirlo sin volver a subir las imágenes.",
    },
    useCasesTitle: "Ideas para convertir imágenes a PDF",
    useCases: [
      "Agrupar tareas escaneadas o exámenes para devolverlos al alumnado.",
      "Juntar recibos y comprobantes en un único PDF de gastos.",
      "Crear catálogos, portfolios o lookbooks a partir de exportaciones de diseño.",
      "Enviar reportes fotográficos o inspecciones sin adjuntar decenas de archivos.",
    ],
  },
};

export const operationsEs: Record<OperationKey, OperationContent> = {
  merge: operationsEsContent.merge,
  compress: operationsEsContent.compress,
  split: operationsEsContent.split,
  extract: operationsEsContent.extract,
  rotate: operationsEsContent.rotate,
  reorder: operationsEsContent.reorder,
  pdfToImages: operationsEsContent.pdfToImages,
  imagesToPdf: operationsEsContent.imagesToPdf,
};
