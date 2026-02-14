export const commonFaqs = [
  {
    question: "¿Cómo funciona PDFLince sin subir mis documentos a servidores?",
    answer: "PDFLince procesa todos tus PDFs directamente en tu navegador con un motor local optimizado. Ningún archivo se sube a nuestros servidores, garantizando privacidad total y rapidez en el procesamiento."
  },
  {
    question: "¿Es seguro usar PDFLince con documentos confidenciales?",
    answer: "Sí, es completamente seguro ya que todos tus documentos se procesan localmente en tu dispositivo y nunca salen de él. Ni siquiera nosotros podemos ver el contenido de tus PDFs."
  },
  {
    question: "¿Hay algún límite en el tamaño o número de PDFs que puedo procesar?",
    answer: "El límite principal es la memoria de tu dispositivo. En general, PDFLince puede manejar archivos de hasta 50MB por documento, pero esto puede variar según tu dispositivo y navegador."
  },
  {
    question: "¿PDFLince funciona en dispositivos móviles?",
    answer: "Sí, PDFLince está optimizado tanto para ordenadores como para dispositivos móviles. La interfaz se adapta a cualquier tamaño de pantalla."
  }
];

export const spainFaqs = [
  {
    question: "¿PDFLince cumple con el RGPD europeo?",
    answer: "Sí, al procesar todos los documentos localmente en tu navegador, PDFLince garantiza el cumplimiento del RGPD ya que no almacenamos ni tratamos tus PDFs en servidores externos."
  },
  {
    question: "¿Puedo usar PDFLince para documentos oficiales o facturas?",
    answer: "Sí, PDFLince es ideal para optimizar cualquier tipo de documento, incluyendo facturas, contratos y documentos oficiales. La calidad se mantiene mientras se reduce el tamaño."
  },
  {
    question: "¿Cómo afecta la compresión a la validez legal de un documento?",
    answer: "La compresión de PDFLince está diseñada para mantener la integridad del documento. No obstante, para documentos legales importantes, recomendamos verificar que el resultado sigue cumpliendo los requisitos específicos de la entidad receptora."
  }
];

export const latamFaqs = [
  {
    question: "¿Es posible usar PDFLince con conexiones de Internet lentas?",
    answer: "Sí, PDFLince es ideal para conexiones lentas ya que una vez cargada la página, todas las operaciones se realizan localmente sin necesidad de subir o descargar datos adicionales durante el procesamiento."
  },
  {
    question: "¿PDFLince funciona con documentos generados por aplicaciones gubernamentales?",
    answer: "Sí, PDFLince es compatible con PDFs generados por cualquier aplicación, incluyendo formularios y documentos oficiales de entidades gubernamentales."
  },
  {
    question: "¿Puedo confiar en PDFLince para documentos de mi negocio?",
    answer: "Absolutamente. PDFLince está diseñado con la privacidad y seguridad como prioridades, haciéndolo ideal para documentos empresariales sensibles como contratos, facturas y reportes."
  }
];

export const techFaqs = [
  {
    question: "¿Qué tecnología utiliza PDFLince para procesar los PDFs?",
    answer: "PDFLince utiliza un motor ligero escrito en JavaScript moderno para manipular los PDFs de forma nativa en el navegador sin depender de componentes nativos. Esto reduce el tamaño del paquete y permite un mantenimiento mucho más sencillo."
  },
  {
    question: "¿Se pierden las características interactivas del PDF al comprimirlo?",
    answer: "En la mayoría de los casos, PDFLince preserva características como enlaces, formularios y marcadores. Sin embargo, con niveles de compresión muy altos, algunas características avanzadas podrían verse afectadas."
  },
  {
    question: "¿Qué navegadores son compatibles con PDFLince?",
    answer: "PDFLince es compatible con la mayoría de navegadores modernos como Chrome, Firefox, Safari, Edge y Opera. Solo necesitas un navegador actualizado con soporte para JavaScript moderno (ES2020), sin requisitos adicionales."
  },
  {
    question: "¿Cómo puedo convertir un PDF a otros formatos?",
    answer: "Actualmente nos enfocamos en convertir PDFs a imágenes (PNG o JPEG) y en crear PDFs a partir de imágenes. Para otros formatos especializados, recomendamos usar un conversor dedicado mientras seguimos ampliando el kit."
  }
];

export const defaultFaqs = [...commonFaqs, ...spainFaqs, ...techFaqs];
