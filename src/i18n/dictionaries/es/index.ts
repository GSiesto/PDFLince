import { DEFAULT_LOCALE, localeLabels } from "../../config";
import { operationsEs } from "./operations";
import { faqsEs } from "./faqs";
import { getRoutePath, getOperationPath } from "../../routing";
import type { Dictionary } from "../dictionary-types";

const { label, nativeName, htmlLang, hrefLang } = localeLabels[DEFAULT_LOCALE];

const siteUrl = "https://pdflince.com";

export const esDictionary: Dictionary = {
  locale: DEFAULT_LOCALE,
  localeLabel: label,
  nativeName,
  htmlLang,
  hrefLang,
  routes: {
    home: getRoutePath(DEFAULT_LOCALE, "home"),
    faq: getRoutePath(DEFAULT_LOCALE, "faq"),
    support: getRoutePath(DEFAULT_LOCALE, "support"),
    operations: {
      merge: getOperationPath(DEFAULT_LOCALE, "merge"),
      compress: getOperationPath(DEFAULT_LOCALE, "compress"),
      split: getOperationPath(DEFAULT_LOCALE, "split"),
      extract: getOperationPath(DEFAULT_LOCALE, "extract"),
      crop: getOperationPath(DEFAULT_LOCALE, "crop"),
      rotate: getOperationPath(DEFAULT_LOCALE, "rotate"),
      reorder: getOperationPath(DEFAULT_LOCALE, "reorder"),
      pdfToImages: getOperationPath(DEFAULT_LOCALE, "pdfToImages"),
      imagesToPdf: getOperationPath(DEFAULT_LOCALE, "imagesToPdf"),
    },
  },
  metadata: {
    site: {
      title: "PDFLince - Unir, comprimir y convertir PDFs sin subir archivos",
      description:
        "PDFLince es un kit gratuito para unir, comprimir, dividir, extraer, reordenar y convertir PDFs a imágenes o viceversa directamente en tu navegador. Todo el procesamiento sucede de forma local, sin registros ni cargas.",
      keywords: [
        "unir pdf",
        "comprimir pdf",
        "dividir pdf",
        "extraer paginas pdf",
        "reordenar pdf",
        "pdf a imagenes",
        "imagenes a pdf",
        "convertir pdf",
        "convertir pdf online",
        "convertir pdf a png",
        "convertir jpg a pdf",
        "editar pdf sin subir archivos",
        "herramienta pdf privada",
        "procesar pdf en el navegador",
      ],
      canonical: `${siteUrl}`,
      openGraph: {
        title: "PDFLince – Unir, Comprimir, Dividir, PDF a Imagen e Imagen a PDF",
        description:
          "Une, comprime, divide, extrae, reordena y convierte PDFs sin subir archivos. Kit gratuito, privado y en español con procesamiento 100% local.",
        url: siteUrl,
        locale: "es_ES",
        type: "website",
        imageUrl: "https://pdflince.com/og-image.jpg",
        imageAlt: "PDFLince - Procesamiento de PDFs privado y gratuito",
      },
    },
    faq: {
      title: "Preguntas frecuentes | PDFLince - Herramienta para procesar PDFs",
      description:
        "Respuestas sobre cómo unir, comprimir, dividir, extraer y reordenar PDFs con PDFLince sin subir tus archivos a servidores.",
      keywords: [
        "PDFLince FAQ",
        "preguntas frecuentes PDFs",
        "ayuda optimización PDF",
        "unir PDF dudas",
        "comprimir PDF dudas",
        "dividir PDF ayuda",
        "reordenar PDF",
      ],
      canonical: `${siteUrl}${getRoutePath(DEFAULT_LOCALE, "faq")}`,
    },
    support: {
      title: "Apoya PDFLince | Mantén la herramienta privada y gratuita",
      description:
        "Tus donaciones financian el desarrollo de PDFLince, cubren la infraestructura y garantizan que siga siendo 100% privado y sin anuncios.",
      keywords: [
        "donar a PDFLince",
        "apoyar herramienta pdf",
        "financiar proyecto open web",
        "donación privacidad",
        "mantener pdflince gratis",
      ],
      canonical: `${siteUrl}${getRoutePath(DEFAULT_LOCALE, "support")}`,
    },
    operations: operationsEs,
  },
  brand: {
    name: "PDFLince",
    tagline: "Procesamiento local • 100% privado",
  },
  components: {
    nav: {
      home: "Inicio",
      faq: "Preguntas Frecuentes",
      support: "Apoyar",
      photo: "FotoLince",
      languageLabel: "Idioma",
      menuLabel: "Abrir menú de navegación",
    },
    footer: {
      privacy: "Procesamiento local • 100% privado • Licencias abiertas",
      rights: `© ${new Date().getFullYear()} PDFLince - Herramientas para manipular PDFs sin comprometer tu privacidad`,
      links: {
        home: "Inicio",
        faq: "Preguntas Frecuentes",
        support: "Apoyar",
        photo: "FotoLince",
        contact: "Contacto",
      },
      capabilitiesLabel: "Operaciones populares",
      operations: {
        merge: "Unir PDFs",
        compress: "Comprimir PDF",
        split: "Dividir PDF",
        extract: "Extraer Páginas",
        crop: "Recortar paginas",
        rotate: "Girar páginas",
        reorder: "Reordenar Páginas",
        pdfToImages: "PDF a imágenes",
        imagesToPdf: "Imágenes a PDF",
      },
      license: "Procesamiento de PDF: PDF-lib (MIT), PDF.js (Apache 2.0) • Fuente: Geist (MIT)",
      disclaimer: "El servicio se proporciona 'tal cual' sin garantía de ningún tipo. El usuario es responsable del uso de los archivos generados.",
    },
    notifications: {
      labels: {
        success: "¡Éxito!",
        error: "Error",
        info: "Aviso",
        warning: "Precaución",
      },
      closeLabel: "Cerrar",
    },
    fotolinceBanner: {
      eyebrow: "¿Necesitas optimizar imágenes?",
      title: "Comprime, redimensiona o convierte tus fotos con FotoLince",
      description:
        "Nuestra herramienta hermana procesa JPG, PNG y WEBP directamente en tu navegador: ideal antes de crear un PDF.",
      ctaLabel: "Visitar FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Logotipo de FotoLince",
    },
    feedback: {
      question: "¿Te ha sido útil?",
      thanks: "¡Gracias por tu opinión!",
      whatWrong: "Cuéntanos qué salió mal",
      emailSubject: "Feedback sobre PDFLince",
    },
    pdfProcessor: {
      title: "Selecciona una operación",
      modes: {
        merge: {
          label: "Unir PDFs",
          helper: "Selecciona el orden de los PDFs para unirlos en un solo documento.",
        },
        compress: {
          label: "Comprimir PDF",
          helper: "Comprime un PDF para reducir su tamaño. Procesa un archivo por vez para priorizar la calidad.",
        },
        split: {
          label: "Dividir PDF",
          helper: "Selecciona PDFs para dividirlos en documentos separados.",
        },
        extract: {
          label: "Extraer Páginas",
          helper: "Selecciona páginas específicas de un PDF para crear un nuevo documento.",
        },
        crop: {
          label: "Recortar paginas",
          helper: "Recorta los margenes visibles de las paginas seleccionadas sin salir del navegador.",
        },
        rotate: {
          label: "Girar páginas",
          helper: "Selecciona las páginas que necesitan otra orientación y rota solo esas hojas.",
        },
        reorder: {
          label: "Reordenar Páginas",
          helper: "Cambia el orden de las páginas dentro de un documento PDF.",
        },
        pdfToImages: {
          label: "PDF a imágenes",
          helper: "Exporta cada página del PDF como PNG o JPEG sin subir tus archivos.",
        },
        imagesToPdf: {
          label: "Imágenes a PDF",
          helper: "Combina JPG, PNG o WEBP en un único PDF con el diseño que prefieras.",
        },
      },
      upload: {
        title: "Selecciona tus archivos",
        clearAll: "Limpiar todo",
        listHeadings: {
          merge: "Archivos a unir (ordena para establecer el orden final):",
          extract: "Selecciona un archivo para trabajar con sus páginas:",
          crop: "Selecciona un archivo para trabajar con sus paginas:",
          rotate: "Selecciona un archivo para trabajar con sus páginas:",
          reorder: "Selecciona un archivo para trabajar con sus páginas:",
          pdfToImages: "PDFs a convertir (se procesarán uno a uno):",
          imagesToPdf: "Imágenes a combinar (ordénalas para definir la secuencia final):",
          default: "Archivos seleccionados (puedes ordenarlos o eliminarlos):",
        },
        hints: {
          compress: "Los archivos se comprimirán individualmente manteniendo el mejor balance entre calidad y tamaño.",
          split: "Cada archivo PDF será dividido según las opciones que elijas en el siguiente paso.",
          crop: "Selecciona las paginas a recortar y define cuantos puntos quitar de cada lado desde el panel de opciones.",
          pdfToImages: "Renderizamos un PDF por turno. Ajusta formato y DPI en el panel de opciones antes de exportar.",
          imagesToPdf: "Arrastra JPG, PNG, WEBP o TIFF. Usa las opciones para definir tamaño de página, orientación y márgenes.",
        },
      },
      downloadNames: {
        compress: "comprimido_PDFLince",
        merge: "unido_PDFLince",
        split: "parte_PDFLince",
        extract: "extraido_PDFLince",
        crop: "recortado_PDFLince",
        rotate: "rotado_PDFLince",
        reorder: "reordenado_PDFLince",
        pdfToImages: "imagenes_PDFLince",
        imagesToPdf: "imagenes_a_pdf_PDFLince",
      },
      processButton: {
        idleSingle: "Procesar 1 archivo",
        idleMultiple: (count: number) => `Procesar ${count} archivos`,
        processing: "Procesando...",
        extract: (count: number) => `Extraer ${count} ${count === 1 ? "página" : "páginas"}`,
        crop: (count: number) =>
          count > 0 ? `Recortar ${count} ${count === 1 ? "pagina" : "paginas"}` : "Recortar PDF",
        rotate: (count: number) =>
          count > 0 ? `Girar ${count} ${count === 1 ? "página" : "páginas"}` : "Girar PDF",
        reorder: "Guardar nueva ordenación",
        pdfToImages: {
          single: "Exportar imágenes",
          multiple: (count: number) => `Exportar ${count} PDFs`,
        },
        imagesToPdf: {
          single: "Crear PDF",
          multiple: (count: number) => `Crear PDF con ${count} imágenes`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Procesando (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Comprimido. Reducción: ${reduction}% (${original} → ${next}) en ${seconds}s`,
        merged: "Unión completada",
        split: (count: number) =>
          count > 1
            ? `Generados ${count} archivos. Descargando el primero...`
            : "División completada",
        extracted: (count: number) => `Extraídas ${count} páginas`,
        cropped: (count: number) => `Recortadas ${count} ${count === 1 ? "pagina" : "paginas"}`,
        rotated: (count: number) => `Rotadas ${count} ${count === 1 ? "página" : "páginas"}`,
        reordered: "Reordenación completada",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const etiqueta = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `Se exportaron ${count} ${etiqueta} ${count === 1 ? "imagen" : "imágenes"} en un archivo ZIP`
            : `Se descargaron ${count} ${etiqueta} ${count === 1 ? "imagen" : "imágenes"}`;
        },
        imagesToPdf: (count: number) =>
          `Se creó un PDF a partir de ${count} ${count === 1 ? "imagen" : "imágenes"}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "No se generó resultado",
        mergeRequiresTwo: "Se necesitan al menos dos archivos para unir",
        noPagesSelected: "Selecciona al menos una página",
        invalidFile: "Selecciona un archivo válido",
        reorderEmpty: "No hay nuevo orden de páginas",
        unknown: "Error desconocido",
        modeNotSupported: "Modo no soportado",
      },
      labels: {
        pagesToExtract: "Selecciona las páginas a extraer:",
        pagesToCrop: "Selecciona las paginas a recortar:",
        pagesToRotate: "Selecciona las páginas a girar:",
        reorderPages: "Arrastra las páginas para reordenarlas:",
      },
      compressionPreview: {
        title: "Vista previa de compresión",
        description:
          "Ajusta las opciones para estimar el tamaño del archivo antes de ejecutar la compresión.",
        running: "Calculando vista previa…",
        readyLabel: "Resultado estimado",
        ratio: (percent: string) => `${percent}% más pequeño`,
        saved: (size: string) => `${size} ahorrados`,
        time: (seconds: string) => `≈ ${seconds}s`,
        original: "Original",
        result: "Estimado",
        notice:
          "La vista previa se ejecuta de forma local. Cuando presiones Procesar reutilizaremos este resultado sin subir archivos.",
        error: "No se pudo generar la vista previa.",
        retry: "Reintentar vista previa",
        universalBadge: "Optimización universal",
      },
      compressionSummary: {
        title: "Última compresión",
        ratio: (percent: string) => `${percent}% más pequeño`,
        saved: (size: string) => `${size} ahorrados`,
        original: "Original",
        result: "Comprimido",
        duration: (seconds: string) => `Completado en ${seconds}s`,
        download: "Descargar de nuevo",
        clear: "Borrar resumen",
      },
      donationReminder: {
        message: "¿PDFLince te ahorró tiempo hoy? Tu aporte mantiene el proyecto privado y gratuito.",
        actionLabel: "Apoyar PDFLince",
        withSavings: (percent: string, saved: string) =>
          `¿Acabas de ahorrar ${saved} (${percent}% menos)? Tu apoyo mantiene PDFLince privado y gratuito.`,
      },
      statusDialog: {
        processingTitle: "Procesando de forma local",
        successTitle: "Tus archivos están listos",
        successDescription:
          "Las descargas se inician automáticamente. Aquí puedes volver a descargarlas.",
        resultsLabel: "Último resultado",
        filesProcessedLabel: (count: number) =>
          `${count} ${count === 1 ? "archivo procesado" : "archivos procesados"}`,
        downloadAgainLabel: "Descargar de nuevo",
        errorTitle: "El procesamiento falló",
        errorDescription: "No pudimos completar la operación. Revisa los archivos e inténtalo otra vez.",
        retryLabel: "Intentar nuevamente",
        closeLabel: "Cerrar",
      },
      compressionTotal: {
        title: "Ahorro total (todos los archivos)",
        savings: (size: string) => `${size} ahorrados en total`,
        count: (count: number) => `${count} archivos optimizados`,
      },
    },
    fileUploader: {
      clickToSelect: "Haz clic para seleccionar",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "o arrastra y suelta imágenes" : "o arrastra y suelta archivos PDF",
      accepted: {
        pdf: "Archivos PDF",
        images: "Formatos aceptados: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Tamaño recomendado: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Tipo de archivo no válido: ${fileName}. Solo se permiten archivos ${label}.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Archivo demasiado grande: ${fileName}. El tamaño máximo es ${sizeMb}MB.`,
      },
      dropImagesAlt: "Imagen del documento PDF",
    },
    fileList: {
      moveUp: "Mover hacia arriba",
      moveDown: "Mover hacia abajo",
      remove: "Eliminar",
      removeAll: "Eliminar todo",
      imageLabel: "Imagen",
      fileLabel: "Archivo",
      selected: "Seleccionado",
      pdfLabel: "PDF",
      deselect: "Deseleccionar",
      pagesLabel: (count: number) => `${count} ${count === 1 ? "página" : "páginas"}`,
      previewLoading: "Cargando vista previa…",
    },
    pageSelector: {
      loading: "Cargando páginas del PDF...",
      error: "No se pudo cargar la información del PDF",
      summary: (total: number, selected: number) =>
        `${total} páginas detectadas - ${selected} seleccionadas`,
      selectAll: "Seleccionar todas",
      deselectAll: "Deseleccionar todas",
      pageLabel: (pageNumber: number) => `Pág. ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Mostrando ${shown} de ${total} páginas. Para extraer páginas adicionales, ingresa los números de página en el campo a continuación.`,
      manualLabel: "Ingresa números de página adicionales (ej. 21, 25-30, 42)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Cargando páginas del PDF...",
      error: "No se pudo cargar la información del PDF",
      limitReached: (count: number) =>
        `Este PDF tiene ${count} páginas. Por rendimiento, puedes reordenar hasta 120 páginas a la vez.`,
      limitHint:
        "Te recomendamos dividir primero el PDF en partes más pequeñas y luego reordenar cada parte.",
      summary: (count: number) => `${count} páginas disponibles para reordenar`,
      reset: "Restaurar orden original",
      dragHint: "Arrastra para cambiar el orden",
      pageLabel: (pageNumber: number) => `Página ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Pág. ${pageNumber}`,
      instructions:
        'Arrastra las páginas o usa las flechas para moverlas. Cuando termines, haz clic en "Guardar nueva ordenación" para aplicar los cambios.',
    },
    processingOptions: {
      compress: {
        title: "Compresión",
        level: "Nivel",
        levels: {
          low: "Baja",
          medium: "Media",
          high: "Alta",
        },
        removeMetadata: "Eliminar metadatos",
        removeMetadataHint: "Borra detalles ocultos como autor, asunto e historial de edición.",
        stripAnnotations: "Quitar anotaciones y comentarios",
        stripAnnotationsHint: "Elimina notas, formularios, firmas y acciones del documento.",
        downscaleImages: "Reducir imágenes incrustadas",
        downscaleHint: "Ideal para documentos escaneados o PDFs con muchas fotos. Mantiene el texto nítido mientras reduce las fotos.",
        advancedTitle: "Limpieza avanzada",
        advancedDescription: "Mantén la simplicidad o activa solo los extras que necesites.",
        activeLabel: "Activado:",
      },
      merge: {
        title: "Unión",
        pageDivider: "Página en blanco entre documentos",
        metadataTitle: "Título final (opcional)",
        metadataAuthor: "Autor final (opcional)",
        metadataHint: "Define metadatos personalizados para el PDF unido. Déjalo en blanco para usar los valores por defecto.",
      },
      split: {
        title: "División",
        pagesPerFile: "Páginas por archivo",
        pagesPerFileHint: "Crearemos un nuevo PDF cada N páginas.",
      },
      extract: {
        title: "Extracción",
        preserveMetadata: "Conservar metadatos originales",
        preserveMetadataHint: "Mantiene título, autor y otros detalles en el PDF resultante.",
      },
      crop: {
        title: "Recorte",
        hint: "Selecciona las paginas a recortar y define cuantos puntos quitar de cada lado.",
        inputModeLabel: "Metodo de recorte",
        inputModes: {
          margins: "Cuatro margenes",
          manual: "Seleccion manual",
        },
        marginLabels: {
          top: "Margen superior (pt)",
          right: "Margen derecho (pt)",
          bottom: "Margen inferior (pt)",
          left: "Margen izquierdo (pt)",
        },
        marginHint: "72 pt equivalen aproximadamente a 1 pulgada. Empieza con valores pequenos para no cortar contenido.",
        preserveMetadata: "Conservar metadatos originales",
        preserveMetadataHint: "Mantiene titulo, autor y otros detalles en el PDF recortado.",
        manual: {
          title: "Seleccion manual de recorte",
          hint: "Arrastra sobre la vista previa para definir el area visible. Convertimos esa seleccion en los mismos margenes que usa el recorte actual.",
          loading: "Cargando vista previa del recorte...",
          error: "No se pudo cargar la vista previa del recorte.",
          reset: "Restablecer seleccion",
          pagePreview: (pageNumber: number) => `Vista previa de la pagina ${pageNumber}`,
        },
      },
      rotate: {
        title: "Girar",
        hint: "Elige la dirección y luego marca las páginas que quieres girar.",
        rotateRight90: "Girar 90 grados a la derecha",
        rotate180: "Girar 180 grados",
        rotateLeft90: "Girar 90 grados a la izquierda",
      },
      reorder: {
        title: "Reordenar",
        hint: "Arrastra las miniaturas para cambiar el orden.",
      },
      pdfToImages: {
        title: "Exportación de imágenes",
        formatLabel: "Formato de imagen",
        formatHint: "Elige PNG para calidad sin pérdidas o JPEG para archivos más ligeros.",
        pngLabel: "PNG (sin pérdidas)",
        jpegLabel: "JPEG (más ligero)",
        qualityLabel: "Calidad JPEG",
        qualityHint: "Con valores altos conservas más detalle a costa de un mayor tamaño.",
        dpiLabel: "DPI de renderizado",
        dpiHint: "Un DPI superior mejora la nitidez y el peso. 144 DPI es ideal para pantalla.",
        dpiPresets: {
          screen: "72 DPI · Pantalla",
          balanced: "144 DPI · Equilibrado",
          print: "300 DPI · Impresión",
        },
        zipLabel: "Agrupar imágenes en un ZIP",
        zipHint: "Descarga un archivo único en lugar de una imagen por página.",
        baseNameLabel: "Nombre base",
        baseNamePlaceholder: "pdflince_paginas",
        baseNameHint: "Usamos este prefijo para las imágenes exportadas. Déjalo vacío para reutilizar el nombre del PDF.",
      },
      imagesToPdf: {
        title: "Diseño",
        layoutTitle: "Diseño de página",
        fitLabel: "Ajuste de la imagen",
        fitOptions: {
          contain: "Ajustar (mostrar imagen completa)",
          cover: "Cubrir (llenar la página)",
        },
        sizeLabel: "Tamaño de página",
        sizeOptions: {
          auto: "Auto (igual que la imagen)",
          a4: "A4",
          letter: "Carta",
        },
        orientationLabel: "Orientación",
        orientationOptions: {
          auto: "Auto",
          portrait: "Vertical",
          landscape: "Horizontal",
        },
        marginLabel: "Márgenes (pt)",
        marginHint: "Añade espacio en blanco alrededor de la imagen. 72 pt ≈ 1 pulgada.",
        backgroundLabel: "Color de fondo",
        backgroundHint: "Se aplica detrás de la imagen y donde quede espacio libre en la página.",
      },
    },
    cookieBanner: {
      message: "Utilizamos cookies para analizar el tráfico y mejorar tu experiencia. No compartimos tus datos personales.",
      accept: "Aceptar",
      decline: "Rechazar",
    },
  },
  pages: {
    home: {
      hero: {
        title: "PDFLince: comprimir, unir y convertir PDF online gratis",
        subtitle:
          "Comprime PDF, une PDF, divide documentos, extrae páginas y convierte PDF a imágenes o imágenes a PDF directamente en tu navegador. Sin subidas, 100% privado y gratuito.",
        badges: [
          "Comprimir PDF rápido",
          "Unir PDF sin límites",
          "Procesamiento local",
          "Apoya PDFLince",
        ],
        imageAlt: "Ilustración de documento PDF",
        ctaLinks: [
          {
            label: "PDF a imágenes",
            href: getOperationPath(DEFAULT_LOCALE, "pdfToImages"),
            description: "Exporta páginas como PNG o JPEG",
          },
          {
            label: "Imágenes a PDF",
            href: getOperationPath(DEFAULT_LOCALE, "imagesToPdf"),
            description: "Combina JPG, PNG o WEBP",
          },
        ],
      },
      why: {
        title: "¿Por qué usar PDFLince?",
        cards: [
          {
            title: "100% Privado",
            description:
              "Tus PDFs nunca salen de tu dispositivo. Todo el procesamiento ocurre en tu navegador.",
            icon: "🔒",
          },
          {
            title: "Rápido y Eficiente",
            description:
              "Nuestro motor optimizado procesa tus PDFs a máxima velocidad sin necesidad de subirlos a servidores.",
            icon: "⚡",
          },
          {
            title: "Funciona en cualquier dispositivo",
            description:
              "Compatible con ordenadores, tablets y teléfonos móviles. Solo necesitas un navegador moderno.",
            icon: "📱",
          },
        ],
      },
      callout: {
        title: "Haz que PDFLince siga siendo gratuito",
        description:
          "Cada donación cubre servidores, tiempo de desarrollo y nos permite mantener una experiencia 100% privada sin anuncios ni rastreadores.",
        ctaLabel: "Apoyar el proyecto",
        ctaUrl: getRoutePath(DEFAULT_LOCALE, "support"),
        secondaryLabel: "Conoce cómo usamos los fondos",
        secondaryUrl: getRoutePath(DEFAULT_LOCALE, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Preguntas Frecuentes",
      intro:
        "Respuestas a las dudas más comunes sobre PDFLince y el procesamiento de documentos PDF",
      cta: {
        title: "Prueba PDFLince ahora",
        description:
          "Une, comprime, divide, extrae y reordena tus PDFs con total privacidad. Sin registros, sin subir archivos a servidores.",
        ctaLabel: "Ir a la herramienta",
      },
    },
    support: {
      hero: {
        eyebrow: "🌱 Proyecto independiente",
        title: "Ayuda a mantener PDFLince gratuito y privado",
        subtitle:
          "PDFLince es un proyecto pequeño hecho con cariño. Tu apoyo cubre los servidores y nos da tiempo para seguir mejorándolo.",
        highlight: "Solo una herramienta que respeta tu privacidad.",
      },
      reasons: {
        title: "¿Por qué donar?",
        cards: [
          {
            title: "Seguir siendo gratuito",
            description:
              "Cada donación nos ayuda a mantener PDFLince 100% gratis para todos, sin planes premium ni funciones bloqueadas.",
            icon: "❤️",
          },
          {
            title: "Mejoras constantes",
            description:
              "Con tu apoyo podemos dedicar tiempo a nuevas funciones, arreglar bugs y mantener la herramienta rápida.",
            icon: "✨",
          },
          {
            title: "Privacidad siempre",
            description:
              "Tu dinero nos permite seguir procesando todo localmente, sin necesidad de subir tus archivos a ningún servidor.",
            icon: "🔒",
          },
        ],
      },
      tiers: {
        title: "Aporta lo que puedas",
        description: "Cualquier cantidad nos ayuda. Pago seguro con Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Un café",
            amount: "€3",
            description: "Cubre el coste de hosting por unas semanas.",
            ctaLabel: "Donar €3",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Apoyo mensual",
            amount: "€10/mes",
            description: "Nos permite dedicar tiempo cada semana a mejorar PDFLince.",
            ctaLabel: "Donar €10/mes",
            ctaHref: "#stripe-checkout-monthly",
            badge: "💙 Gracias",
          },
          {
            id: "custom",
            title: "Otra cantidad",
            amount: "Lo que quieras",
            description: "Cada euro cuenta. Elige el importe que prefieras.",
            ctaLabel: "Donar otra cantidad",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Pagos seguros con Stripe. Puedes cancelar las donaciones recurrentes cuando quieras.",
      },
      transparency: {
        title: "¿En qué se gasta?",
        items: [
          "Hosting y CDN para que la web sea rápida en todo el mundo",
          "Tiempo de desarrollo para nuevas funciones y mantenimiento",
          "Mejoras de diseño y experiencia de usuario",
          "Traducciones a más idiomas",
        ],
      },
      faq: {
        title: "Preguntas",
        entries: [
          {
            question: "¿Qué pasa si no puedo donar?",
            answer:
              "¡No pasa nada! PDFLince seguirá siendo gratuito siempre. Si nos recomiendas a alguien o nos escribes contando cómo te ayudamos, eso también nos hace muy felices.",
          },
          {
            question: "¿Recibiré un comprobante de pago?",
            answer:
              "Sí. Stripe te enviará automáticamente un recibo por correo con todos los detalles de tu donación.",
          },
          {
            question: "¿Cómo cancelo una donación recurrente?",
            answer:
              "Puedes cancelar desde tu portal de Stripe o escribirnos y lo hacemos nosotros. Sin preguntas, sin problemas.",
          },
        ],
      },
      closing: {
        title: "Gracias por estar aquí",
        description:
          "Cada persona que apoya PDFLince hace posible que sigamos construyendo herramientas útiles, privadas y accesibles para todos.",
        ctaLabel: "Escribirnos",
        ctaHref: "mailto:info@pdflince.com?subject=Hola%20equipo%20de%20PDFLince",
      },
      legalNotice: {
        title: "Aviso legal y transparencia",
        points: [
          "PDFLince es un proyecto personal independiente gestionado por un pequeño equipo.",
          "Las donaciones son voluntarias y se destinan a cubrir gastos de infraestructura y tiempo de desarrollo.",
          "Las aportaciones no son donaciones benéficas ni generan ventajas fiscales; Stripe emitirá un recibo automático.",
          "El servicio se ofrece tal cual, sin garantías explícitas; para cualquier duda escríbenos a info@pdflince.com.",
        ],
      },
    },
  },
  faqs: faqsEs,
  operations: operationsEs,
};
