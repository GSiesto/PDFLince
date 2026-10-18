import type { Locale } from "../config";
import type { McpPageStrings, McpToolItem } from "./dictionary-types";

export interface McpMetadataStrings {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
}

const siteUrl = "https://pdflince.com";

const DEFAULT_CLIENT_SNIPPET = JSON.stringify(
  {
    mcpServers: {
      pdflince: {
        command: "npx",
        args: ["-y", "pdflince-mcp@latest"],
      },
    },
  },
  null,
  2
);

interface LocalizedToolCopy {
  title: string;
  badge: string;
  description: string;
  paramDescriptions: Record<string, string>;
  promptExample: string;
}

type ToolName =
  | "pdflince_inspect"
  | "pdflince_merge"
  | "pdflince_split"
  | "pdflince_extract"
  | "pdflince_reorder"
  | "pdflince_rotate"
  | "pdflince_crop"
  | "pdflince_compress"
  | "pdflince_pdf_to_images"
  | "pdflince_images_to_pdf";

const BASE_TOOL_PARAMS: Record<
  ToolName,
  Array<{ name: string; type: string; required: boolean }>
> = {
  pdflince_inspect: [{ name: "filePath", type: "string", required: true }],
  pdflince_merge: [
    { name: "filePaths", type: "string[]", required: true },
    { name: "outputPath", type: "string", required: true },
    { name: "addPageDividers", type: "boolean", required: false },
    { name: "metadata", type: "object", required: false },
  ],
  pdflince_split: [
    { name: "filePath", type: "string", required: true },
    { name: "outputDirectory", type: "string", required: true },
    { name: "pagesPerFile", type: "number", required: false },
    { name: "outputPrefix", type: "string", required: false },
    { name: "preserveMetadata", type: "boolean", required: false },
    { name: "bundleAsZip", type: "boolean", required: false },
  ],
  pdflince_extract: [
    { name: "filePath", type: "string", required: true },
    { name: "outputPath", type: "string", required: true },
    { name: "pages", type: "string | number[]", required: true },
    { name: "preserveMetadata", type: "boolean", required: false },
  ],
  pdflince_reorder: [
    { name: "filePath", type: "string", required: true },
    { name: "outputPath", type: "string", required: true },
    { name: "pageOrder", type: "number[]", required: true },
    { name: "preserveMetadata", type: "boolean", required: false },
  ],
  pdflince_rotate: [
    { name: "filePath", type: "string", required: true },
    { name: "outputPath", type: "string", required: true },
    { name: "rotationDegrees", type: "number", required: false },
    { name: "pages", type: "string | number[]", required: false },
    { name: "preserveMetadata", type: "boolean", required: false },
  ],
  pdflince_crop: [
    { name: "filePath", type: "string", required: true },
    { name: "outputPath", type: "string", required: true },
    { name: "margins", type: "object", required: true },
    { name: "pages", type: "string | number[]", required: false },
    { name: "preserveMetadata", type: "boolean", required: false },
  ],
  pdflince_compress: [
    { name: "filePath", type: "string", required: true },
    { name: "outputPath", type: "string", required: true },
    { name: "compressionLevel", type: "'low' | 'medium' | 'high'", required: false },
    { name: "downscaleImages", type: "boolean", required: false },
    { name: "downscaleImagesDpi", type: "number", required: false },
    { name: "imageQuality", type: "number", required: false },
    { name: "preserveMetadata", type: "boolean", required: false },
    { name: "stripAnnotations", type: "boolean", required: false },
  ],
  pdflince_pdf_to_images: [
    { name: "filePath", type: "string", required: true },
    { name: "outputDirectory", type: "string", required: true },
    { name: "format", type: "'png' | 'jpeg'", required: false },
    { name: "quality", type: "number", required: false },
    { name: "dpi", type: "number", required: false },
    { name: "pages", type: "string | number[]", required: false },
    { name: "bundleAsZip", type: "boolean", required: false },
    { name: "outputPrefix", type: "string", required: false },
  ],
  pdflince_images_to_pdf: [
    { name: "imagePaths", type: "string[]", required: true },
    { name: "outputPath", type: "string", required: true },
    { name: "imageFit", type: "'contain' | 'cover'", required: false },
    { name: "pageSize", type: "'auto' | 'a4' | 'letter'", required: false },
    { name: "pageOrientation", type: "'auto' | 'portrait' | 'landscape'", required: false },
    { name: "pageMarginPoints", type: "number", required: false },
    { name: "backgroundColor", type: "string", required: false },
  ],
};

const TOOL_ORDER: ToolName[] = [
  "pdflince_inspect",
  "pdflince_merge",
  "pdflince_split",
  "pdflince_extract",
  "pdflince_reorder",
  "pdflince_rotate",
  "pdflince_crop",
  "pdflince_compress",
  "pdflince_pdf_to_images",
  "pdflince_images_to_pdf",
];

function buildToolsList(copyMap: Record<ToolName, LocalizedToolCopy>): McpToolItem[] {
  return TOOL_ORDER.map((name) => {
    const copy = copyMap[name];
    return {
      name,
      title: copy.title,
      badge: copy.badge,
      description: copy.description,
      promptExample: copy.promptExample,
      parameters: BASE_TOOL_PARAMS[name].map((p) => ({
        ...p,
        description: copy.paramDescriptions[p.name] || "",
      })),
    };
  });
}

function buildClientTabs(descriptions: {
  claude: string;
  cursor: string;
  antigravity: string;
  windsurf: string;
  vscode: string;
}) {
  return [
    {
      id: "claude-desktop",
      name: "Claude Desktop",
      description: descriptions.claude,
      configPath: "~/Library/Application Support/Claude/claude_desktop_config.json (macOS)",
      snippet: DEFAULT_CLIENT_SNIPPET,
    },
    {
      id: "cursor",
      name: "Cursor",
      description: descriptions.cursor,
      configPath: "Cursor Settings > Features > MCP > Add New MCP Server",
      snippet: DEFAULT_CLIENT_SNIPPET,
    },
    {
      id: "antigravity",
      name: "Antigravity / Gemini IDE",
      description: descriptions.antigravity,
      configPath: "~/.gemini/antigravity/mcp_config.json",
      snippet: DEFAULT_CLIENT_SNIPPET,
    },
    {
      id: "windsurf",
      name: "Windsurf",
      description: descriptions.windsurf,
      configPath: "~/.codeium/windsurf/mcp_config.json",
      snippet: DEFAULT_CLIENT_SNIPPET,
    },
    {
      id: "vscode-cline",
      name: "VS Code (Cline / Roo Code)",
      description: descriptions.vscode,
      configPath: "Cline MCP Settings / roo-cline_mcp_settings.json",
      snippet: DEFAULT_CLIENT_SNIPPET,
    },
  ];
}

// ============================================================================
// 1. ENGLISH (en)
// ============================================================================
export const mcpPageEn: McpPageStrings = {
  hero: {
    eyebrow: "Model Context Protocol • Local Stdio Server",
    title: "PDFLince MCP Server",
    subtitle:
      "Connect Claude Desktop, Cursor, Antigravity, Windsurf, or VS Code to a local, zero-cloud PDF engine. Inspect, merge, split, extract, reorder, rotate, crop, compress, and convert PDFs directly on your filesystem.",
    installCommand: "npx -y pdflince-mcp@latest",
    copyLabel: "Copy command",
    copiedLabel: "Copied",
    stats: [
      { value: "10", label: "MCP Tools" },
      { value: "0", label: "External Requests" },
      { value: "100%", label: "Local Execution" },
      { value: "< 30ms", label: "Typical Overhead" },
    ],
  },
  privacyNotice: {
    title: "Local-First Security Architecture",
    description:
      "AI clients communicate with PDFLince over standard input/output (stdio JSON-RPC) via the open Model Context Protocol specification. Document bytes remain in local memory and never leave your machine.",
    points: [
      "Zero network egress or telemetry: all operations execute inside a local Node.js or Bun process.",
      "Designed for regulated workflows and strict data governance (GDPR, HIPAA, SOC 2).",
      "Non-destructive file handling: transformation tools write to explicit output paths without mutating source files.",
    ],
  },
  features: {
    title: "Engineered for Agentic Document Workflows",
    subtitle: "Deterministic PDF primitives for software engineers, researchers, and automated pipelines.",
    cards: [
      {
        icon: "shield",
        title: "Strict Data Sovereignty",
        description:
          "Process contracts, financial statements, medical records, and internal documentation locally without exposing files to third-party APIs.",
      },
      {
        icon: "zap",
        title: "Native In-Memory Execution",
        description:
          "Powered by pdf-lib and native image pipelines on Node.js and Bun. Operations complete in milliseconds without upload or download bottlenecks.",
      },
      {
        icon: "blocks",
        title: "Universal Host & Model Support",
        description:
          "Works with Claude Desktop, Cursor, Antigravity, Windsurf, Cline, Roo Code, Zed, and Open WebUI—across Claude, Grok, GPT-4o, or local Ollama models (Nous Hermes, DeepSeek).",
      },
      {
        icon: "layers",
        title: "Full UI Feature Parity",
        description:
          "Exposes all 9 operations from the PDFLince web application—merge, compress, split, extract, reorder, rotate, crop, PDF-to-images, and images-to-PDF—plus deep document inspection.",
      },
      {
        icon: "file-check",
        title: "Deterministic Metadata Handling",
        description:
          "Reads raw document headers without mutating existing producer fields, and preserves original authoring metadata when generating new files.",
      },
      {
        icon: "package",
        title: "Single-Command Setup",
        description:
          "Run directly via `npx -y pdflince-mcp@latest` with Node.js 18+ or Bun. No Python virtual environments or Docker containers required.",
      },
    ],
  },
  clients: {
    title: "Client Configuration",
    subtitle: "Add the server definition to your MCP client configuration file.",
    tabs: buildClientTabs({
      claude: "Register PDFLince in Claude Desktop to inspect and transform local PDFs during conversations.",
      cursor: "Enable Cursor agents to inspect and process PDF assets directly within your project workspace.",
      antigravity: "Configure PDFLince as a local MCP server in Google Antigravity IDE.",
      windsurf: "Allow Cascade to inspect, split, compress, and convert PDFs in local development sessions.",
      vscode: "Integrate PDFLince with autonomous coding agents in Visual Studio Code.",
    }),
  },
  tools: {
    title: "Tool Reference",
    subtitle: "Ten structured MCP tools mirroring every operation and option available in the PDFLince interface.",
    items: buildToolsList({
      pdflince_inspect: {
        title: "Inspect PDF",
        badge: "Read",
        description:
          "Reads a local PDF without modifying it. Returns total page count, per-page dimensions, rotation angles, orientation, and document metadata.",
        paramDescriptions: {
          filePath: "Absolute or relative path to the local PDF file.",
        },
        promptExample: "Inspect financial-report.pdf and return the page count, dimensions, and author metadata.",
      },
      pdflince_merge: {
        title: "Merge PDFs",
        badge: "Compose",
        description:
          "Combines two or more PDF files in sequential order, with optional blank divider pages and custom document metadata.",
        paramDescriptions: {
          filePaths: "Ordered list of PDF file paths to merge (minimum 2).",
          outputPath: "Destination path for the merged PDF.",
          addPageDividers: "Insert a blank divider page between merged documents.",
          metadata: "Custom metadata ({ title, author, subject, keywords }).",
        },
        promptExample: "Merge section1.pdf and section2.pdf into complete-guide.pdf with blank divider pages.",
      },
      pdflince_split: {
        title: "Split PDF",
        badge: "Split",
        description: "Splits a PDF into multiple documents of N pages each, with optional ZIP archiving.",
        paramDescriptions: {
          filePath: "Path to the source PDF file.",
          outputDirectory: "Directory where split PDF files will be written.",
          pagesPerFile: "Pages per output file (default: 1).",
          outputPrefix: "Custom filename prefix for generated files.",
          preserveMetadata: "Retain source document metadata (default: true).",
          bundleAsZip: "Also package all split files into a .zip archive.",
        },
        promptExample: "Split documentation.pdf into 4-page files inside ./modules and bundle them as a ZIP.",
      },
      pdflince_extract: {
        title: "Extract Pages",
        badge: "Extract",
        description: "Extracts specific pages or ranges (e.g. '1-3, 5, 8') into a new PDF document.",
        paramDescriptions: {
          filePath: "Path to the source PDF file.",
          outputPath: "Destination path for the extracted PDF.",
          pages: "1-indexed page range string ('1-3, 5') or number array.",
          preserveMetadata: "Retain source document metadata (default: true).",
        },
        promptExample: "Extract pages 1-3 and page 7 from agreement.pdf into summary.pdf.",
      },
      pdflince_reorder: {
        title: "Reorder Pages",
        badge: "Organize",
        description: "Rearranges pages of a PDF according to a 1-indexed sequence array.",
        paramDescriptions: {
          filePath: "Path to the source PDF file.",
          outputPath: "Destination path for the reordered PDF.",
          pageOrder: "1-indexed page order array (e.g. [3, 1, 2]).",
          preserveMetadata: "Retain source document metadata (default: true).",
        },
        promptExample: "Reorder pitch-deck.pdf using the page sequence [4, 1, 2, 3].",
      },
      pdflince_rotate: {
        title: "Rotate Pages",
        badge: "Transform",
        description: "Rotates all or selected pages by 90, 180, 270, -90, -180, or -270 degrees.",
        paramDescriptions: {
          filePath: "Path to the source PDF file.",
          outputPath: "Destination path for the rotated PDF.",
          rotationDegrees: "Rotation angle (90, 180, 270, -90, -180, -270; default: 90).",
          pages: "Target pages ('all' or '1, 3-5'; default: 'all').",
          preserveMetadata: "Retain source document metadata (default: true).",
        },
        promptExample: "Rotate page 3 of scanned-docs.pdf by 90 degrees clockwise.",
      },
      pdflince_crop: {
        title: "Crop Margins",
        badge: "Crop",
        description:
          "Trims top, bottom, left, and right margins from all or selected pages in typographic points (72 pt = 1 inch).",
        paramDescriptions: {
          filePath: "Path to the source PDF file.",
          outputPath: "Destination path for the cropped PDF.",
          margins: "Margin values { top, bottom, left, right } in points.",
          pages: "Target pages ('all' or range; default: 'all').",
          preserveMetadata: "Retain source document metadata (default: true).",
        },
        promptExample: "Crop 36pt from all four margins across all pages of presentation.pdf.",
      },
      pdflince_compress: {
        title: "Compress PDF",
        badge: "Optimize",
        description:
          "Reduces PDF file size using UI-matched presets (low, medium, high), embedded image downscaling (150/72 DPI), object stream compression, annotation stripping, and metadata removal.",
        paramDescriptions: {
          filePath: "Path to the source PDF file.",
          outputPath: "Destination path for the compressed PDF.",
          compressionLevel: "Compression preset (default: 'medium').",
          downscaleImages: "Downscale and recompress embedded images (default: true for medium/high).",
          downscaleImagesDpi: "Target image DPI (default: 150 for medium, 72 for high).",
          imageQuality: "JPEG quality between 0.1 and 1.0 (default: 0.82).",
          preserveMetadata: "Retain metadata (default: true for low/medium, false for high).",
          stripAnnotations: "Remove page annotations (default: true for high).",
        },
        promptExample: "Compress large-manual.pdf using high compression and save to manual-compact.pdf.",
      },
      pdflince_pdf_to_images: {
        title: "PDF to Images",
        badge: "Export",
        description:
          "Renders all or selected PDF pages into PNG or JPEG images at configurable DPI (72, 144, 300), with optional ZIP archiving.",
        paramDescriptions: {
          filePath: "Path to the source PDF file.",
          outputDirectory: "Directory where rendered images will be saved.",
          format: "Output image format (default: 'png').",
          quality: "JPEG quality between 0.1 and 1.0 (default: 0.9).",
          dpi: "Render resolution in DPI (72, 144, 300; default: 144).",
          pages: "Pages to render ('all' or '1-3, 5'; default: 'all').",
          bundleAsZip: "Also generate a .zip archive of the exported images.",
          outputPrefix: "Custom filename prefix for exported images.",
        },
        promptExample: "Render pages 1-3 of brochure.pdf as 300 DPI PNG files in ./exported-pages.",
      },
      pdflince_images_to_pdf: {
        title: "Images to PDF",
        badge: "Convert",
        description:
          "Compiles local images (PNG, JPG, WebP, TIFF) into a formatted PDF document with configurable fit, page size, orientation, margins, and background color.",
        paramDescriptions: {
          imagePaths: "Ordered list of image paths (PNG, JPG, WebP, TIFF).",
          outputPath: "Destination path for the generated PDF.",
          imageFit: "Image scaling mode (default: 'contain').",
          pageSize: "Page dimensions (default: 'auto').",
          pageOrientation: "Page orientation (default: 'auto').",
          pageMarginPoints: "Page margin in points (default: 18).",
          backgroundColor: "Page background hex color (default: '#ffffff').",
        },
        promptExample: "Convert scan1.png and scan2.webp into an A4 portrait PDF at ./scans.pdf.",
      },
    }),
  },
  faq: {
    title: "Frequently Asked Questions",
    entries: [
      {
        question: "How does the MCP server operate offline?",
        answer:
          "The `pdflince-mcp` binary runs as a local child process spawned by your MCP host (Claude Desktop, Cursor, Antigravity) and communicates over stdio JSON-RPC. It opens no network ports and makes no external HTTP requests.",
      },
      {
        question: "What are the runtime requirements?",
        answer:
          "Node.js 18+ (Node 20+ recommended) or Bun. No Python environment or external cloud API keys are required.",
      },
      {
        question: "Does it work with local LLMs (Ollama, Nous Hermes, DeepSeek)?",
        answer:
          "Yes. Because PDFLince implements the standard stdio Model Context Protocol, it is model-agnostic. You can pair it with local open-weights models (Nous Hermes 3, DeepSeek-R1/V3, Llama 3 via Ollama, LM Studio, or vLLM) as well as commercial models (Claude, Grok, GPT-4o).",
      },
      {
        question: "Are source PDF files modified in place?",
        answer:
          "No. Every write operation requires an explicit `outputPath` or `outputDirectory`, leaving original source files untouched.",
      },
    ],
  },
  cta: {
    title: "Deploy PDFLince MCP Locally",
    description: "Zero-cloud PDF processing for your IDE and AI agents in under a minute.",
    command: "npx -y pdflince-mcp@latest",
    webAppLabel: "Open Web Application",
    webAppHref: "/en",
    githubLabel: "View Source on GitHub",
    githubHref: "https://github.com/GSiesto/pdflince",
  },
  ui: {
    copyPath: "Copy path",
    copiedPath: "Path copied",
    copyJson: "Copy JSON",
    copiedJson: "Copied",
    parametersHeading: "Parameters",
    paramName: "Name",
    paramType: "Type",
    paramRequired: "Required",
    paramDescription: "Description",
    yes: "Yes",
    no: "No",
    promptExampleHeading: "Example Prompt",
    copyPrompt: "Copy prompt",
    copiedPrompt: "Copied",
    clickToCopy: "Click to copy",
    copyCommandPrefix: "Copy",
    commandCopied: "Command copied",
    directCliLabel: "Direct CLI / stdio invocation:",
  },
};

export const mcpMetadataEn: McpMetadataStrings = {
  title: "PDFLince MCP Server | Local PDF Tools for AI Agents",
  description:
    "Open-source, local Model Context Protocol (MCP) server for Claude Desktop, Cursor, Antigravity, Windsurf, and local Ollama agents. Inspect, compress, merge, split, and convert PDFs without cloud uploads.",
  keywords: [
    "mcp",
    "model context protocol",
    "pdflince mcp",
    "mcp pdf server",
    "claude desktop pdf mcp",
    "cursor mcp pdf",
    "antigravity mcp",
    "windsurf mcp",
    "ollama mcp pdf",
    "local llm pdf tools",
    "merge pdf mcp",
    "compress pdf mcp",
  ],
  canonical: `${siteUrl}/en/mcp`,
};

// ============================================================================
// 2. SPANISH (es)
// ============================================================================
export const mcpPageEs: McpPageStrings = {
  hero: {
    eyebrow: "Model Context Protocol • Servidor Local Stdio",
    title: "Servidor MCP de PDFLince",
    subtitle:
      "Conecta Claude Desktop, Cursor, Antigravity, Windsurf o VS Code a un motor PDF local sin depender de la nube. Inspecciona, une, divide, extrae, reordena, gira, recorta, comprime y convierte PDFs directamente en tu sistema de archivos.",
    installCommand: "npx -y pdflince-mcp@latest",
    copyLabel: "Copiar comando",
    copiedLabel: "Copiado",
    stats: [
      { value: "10", label: "Herramientas MCP" },
      { value: "0", label: "Peticiones externas" },
      { value: "100%", label: "Ejecución local" },
      { value: "< 30ms", label: "Latencia típica" },
    ],
  },
  privacyNotice: {
    title: "Arquitectura de Seguridad Local",
    description:
      "Los clientes de IA se comunican con PDFLince mediante entrada/salida estándar (stdio JSON-RPC) bajo la especificación abierta Model Context Protocol. Los documentos se procesan en memoria local y nunca salen de tu equipo.",
    points: [
      "Sin tráfico de red ni telemetría: todas las operaciones se ejecutan dentro de un proceso local de Node.js o Bun.",
      "Diseñado para entornos corporativos con normativas estrictas de protección de datos (RGPD, HIPAA, SOC 2).",
      "Operaciones no destructivas: las herramientas escriben en rutas de salida explícitas sin alterar los archivos de origen.",
    ],
  },
  features: {
    title: "Diseñado para Flujos Documentales con Agentes",
    subtitle: "Operaciones PDF deterministas para desarrolladores, investigadores y flujos de automatización.",
    cards: [
      {
        icon: "shield",
        title: "Soberanía de Datos",
        description:
          "Procesa contratos, estados financieros, historiales médicos y documentación interna localmente sin exponer archivos a APIs de terceros.",
      },
      {
        icon: "zap",
        title: "Ejecución Nativa en Memoria",
        description:
          "Impulsado por pdf-lib y procesamiento nativo de imágenes sobre Node.js y Bun. Transformaciones en milisegundos sin tiempos de subida ni descarga.",
      },
      {
        icon: "blocks",
        title: "Compatibilidad Universal",
        description:
          "Integración directa con Claude Desktop, Cursor, Antigravity, Windsurf, Cline, Roo Code, Zed y Open WebUI, tanto con Claude, Grok y GPT-4o como con modelos locales en Ollama (Nous Hermes, DeepSeek).",
      },
      {
        icon: "layers",
        title: "Paridad Total con la Interfaz Web",
        description:
          "Incluye las 9 operaciones de la aplicación web de PDFLince —unir, comprimir, dividir, extraer, reordenar, girar, recortar, PDF a imágenes e imágenes a PDF— más inspección técnica.",
      },
      {
        icon: "file-check",
        title: "Gestión Precisa de Metadatos",
        description:
          "Lectura fiel de cabeceras sin alterar productores existentes, preservando la autoría original al generar nuevos documentos.",
      },
      {
        icon: "package",
        title: "Despliegue en un Comando",
        description:
          "Ejecución directa mediante `npx -y pdflince-mcp@latest` con Node.js 18+ o Bun, sin entornos de Python ni contenedores Docker.",
      },
    ],
  },
  clients: {
    title: "Configuración del Cliente",
    subtitle: "Añade la definición del servidor al archivo de configuración de tu cliente MCP.",
    tabs: buildClientTabs({
      claude: "Registra PDFLince en Claude Desktop para inspeccionar y transformar PDFs locales desde el chat.",
      cursor: "Permite a los agentes de Cursor auditar y procesar archivos PDF directamente en tu repositorio.",
      antigravity: "Configura PDFLince como servidor MCP local en Google Antigravity IDE.",
      windsurf: "Habilita a Cascade para inspeccionar, dividir, comprimir y convertir PDFs en sesiones locales.",
      vscode: "Integra PDFLince con extensiones de agentes autónomos en Visual Studio Code.",
    }),
  },
  tools: {
    title: "Referencia de Herramientas",
    subtitle: "Diez herramientas MCP con paridad completa respecto a las operaciones y opciones de la interfaz web de PDFLince.",
    items: buildToolsList({
      pdflince_inspect: {
        title: "Inspeccionar PDF",
        badge: "Lectura",
        description:
          "Analiza un archivo PDF local sin modificarlo. Devuelve número total de páginas, dimensiones por página, rotación, orientación y metadatos del documento.",
        paramDescriptions: {
          filePath: "Ruta absoluta o relativa al archivo PDF local.",
        },
        promptExample: "Inspecciona balance-2025.pdf e indícame su número de páginas, dimensiones y autor.",
      },
      pdflince_merge: {
        title: "Unir PDFs",
        badge: "Composición",
        description:
          "Combina dos o más archivos PDF en orden secuencial, con soporte opcional para páginas separadoras en blanco y metadatos personalizados.",
        paramDescriptions: {
          filePaths: "Lista ordenada de rutas PDF a unir (mínimo 2).",
          outputPath: "Ruta de destino para el PDF combinado.",
          addPageDividers: "Inserta una página en blanco entre cada documento.",
          metadata: "Metadatos personalizados ({ title, author, subject, keywords }).",
        },
        promptExample: "Une anexo1.pdf y anexo2.pdf en informe-completo.pdf con páginas separadoras.",
      },
      pdflince_split: {
        title: "Dividir PDF",
        badge: "División",
        description: "Divide un documento PDF en múltiples archivos de N páginas cada uno, con empaquetado opcional en ZIP.",
        paramDescriptions: {
          filePath: "Ruta al archivo PDF de origen.",
          outputDirectory: "Directorio donde se guardarán los fragmentos generados.",
          pagesPerFile: "Páginas por archivo generado (por defecto: 1).",
          outputPrefix: "Prefijo de nombre para los archivos resultantes.",
          preserveMetadata: "Conserva los metadatos del documento original (por defecto: true).",
          bundleAsZip: "Genera también un archivo .zip con todos los fragmentos.",
        },
        promptExample: "Divide manual.pdf en bloques de 5 páginas dentro de ./capitulos y genera un ZIP.",
      },
      pdflince_extract: {
        title: "Extraer Páginas",
        badge: "Extracción",
        description: "Extrae páginas específicas o rangos (ej. '1-3, 5, 8') en un nuevo documento PDF.",
        paramDescriptions: {
          filePath: "Ruta al archivo PDF de origen.",
          outputPath: "Ruta de destino para el PDF extraído.",
          pages: "Rango de páginas ('1-3, 5') o lista numérica en base 1.",
          preserveMetadata: "Conserva los metadatos del documento original (por defecto: true).",
        },
        promptExample: "Extrae las páginas 1-3 y 7 de auditoria.pdf en resumen-ejecutivo.pdf.",
      },
      pdflince_reorder: {
        title: "Reordenar Páginas",
        badge: "Organización",
        description: "Reorganiza las páginas de un PDF según una secuencia numérica en base 1.",
        paramDescriptions: {
          filePath: "Ruta al archivo PDF de origen.",
          outputPath: "Ruta de destino para el PDF reordenado.",
          pageOrder: "Secuencia de páginas en base 1 (ej. [3, 1, 2]).",
          preserveMetadata: "Conserva los metadatos del documento original (por defecto: true).",
        },
        promptExample: "Reordena presentacion.pdf aplicando la secuencia de páginas [4, 1, 2, 3].",
      },
      pdflince_rotate: {
        title: "Girar Páginas",
        badge: "Transformación",
        description: "Rota páginas seleccionadas o todo el documento en múltiplos de 90 grados (90, 180, 270, -90, -180, -270).",
        paramDescriptions: {
          filePath: "Ruta al archivo PDF de origen.",
          outputPath: "Ruta de destino para el PDF rotado.",
          rotationDegrees: "Ángulo de rotación (90, 180, 270, -90, -180, -270; por defecto: 90).",
          pages: "Páginas a rotar ('all' o '1, 3-5'; por defecto: 'all').",
          preserveMetadata: "Conserva los metadatos del documento original (por defecto: true).",
        },
        promptExample: "Gira la página 2 de escaneo.pdf 90 grados en sentido horario.",
      },
      pdflince_crop: {
        title: "Recortar Márgenes",
        badge: "Recorte",
        description: "Recorta los márgenes superior, inferior, izquierdo y derecho en puntos tipográficos (72 pt = 1 pulgada).",
        paramDescriptions: {
          filePath: "Ruta al archivo PDF de origen.",
          outputPath: "Ruta de destino para el PDF recortado.",
          margins: "Márgenes { top, bottom, left, right } en puntos.",
          pages: "Páginas a recortar ('all' o rango; por defecto: 'all').",
          preserveMetadata: "Conserva los metadatos del documento original (por defecto: true).",
        },
        promptExample: "Recorta 36 puntos en los cuatro márgenes de todas las páginas de documento.pdf.",
      },
      pdflince_compress: {
        title: "Comprimir PDF",
        badge: "Optimización",
        description:
          "Reduce el tamaño del PDF mediante los perfiles de la interfaz web (low, medium, high), reescalado de imágenes incrustadas (150/72 DPI), compresión de flujos y limpieza de metadatos.",
        paramDescriptions: {
          filePath: "Ruta al archivo PDF a comprimir.",
          outputPath: "Ruta de destino para el PDF comprimido.",
          compressionLevel: "Perfil de compresión (por defecto: 'medium').",
          downscaleImages: "Reescala y optimiza imágenes incrustadas (true en medium/high).",
          downscaleImagesDpi: "DPI objetivo para imágenes (150 en medium, 72 en high).",
          imageQuality: "Calidad JPEG entre 0.1 y 1.0 (por defecto: 0.82).",
          preserveMetadata: "Conserva metadatos (true en low/medium, false en high).",
          stripAnnotations: "Elimina anotaciones de página (true en high).",
        },
        promptExample: "Comprime catalogo-pesado.pdf en nivel high y guárdalo en catalogo-optimizado.pdf.",
      },
      pdflince_pdf_to_images: {
        title: "PDF a Imágenes",
        badge: "Exportación",
        description:
          "Renderiza todas o determinadas páginas de un PDF en imágenes PNG o JPEG a resolución configurable (72, 144, 300 DPI), con empaquetado opcional en ZIP.",
        paramDescriptions: {
          filePath: "Ruta al archivo PDF de origen.",
          outputDirectory: "Directorio donde se guardarán las imágenes renderizadas.",
          format: "Formato de salida (por defecto: 'png').",
          quality: "Calidad JPEG entre 0.1 y 1.0 (por defecto: 0.9).",
          dpi: "Resolución en DPI (72, 144, 300; por defecto: 144).",
          pages: "Páginas a exportar ('all' o '1-3, 5'; por defecto: 'all').",
          bundleAsZip: "Genera también un archivo .zip con las imágenes.",
          outputPrefix: "Prefijo personalizado para los nombres de archivo.",
        },
        promptExample: "Exporta las páginas 1 a 3 de folleto.pdf como imágenes PNG a 300 DPI en ./imagenes.",
      },
      pdflince_images_to_pdf: {
        title: "Imágenes a PDF",
        badge: "Conversión",
        description:
          "Convierte imágenes locales (PNG, JPG, WebP, TIFF) en un documento PDF con ajuste, tamaño de página, orientación, márgenes y color de fondo configurables.",
        paramDescriptions: {
          imagePaths: "Lista ordenada de rutas de imagen (PNG, JPG, WebP, TIFF).",
          outputPath: "Ruta de destino para el PDF generado.",
          imageFit: "Modo de ajuste de imagen (por defecto: 'contain').",
          pageSize: "Tamaño de página (por defecto: 'auto').",
          pageOrientation: "Orientación de página (por defecto: 'auto').",
          pageMarginPoints: "Margen en puntos (por defecto: 18).",
          backgroundColor: "Color de fondo en hexadecimal (por defecto: '#ffffff').",
        },
        promptExample: "Convierte captura1.png y captura2.webp en un PDF A4 vertical en ./capturas.pdf.",
      },
    }),
  },
  faq: {
    title: "Preguntas Frecuentes",
    entries: [
      {
        question: "¿Cómo funciona el servidor MCP sin conexión a internet?",
        answer:
          "El binario `pdflince-mcp` se ejecuta como un subproceso local iniciado por tu cliente MCP (Claude Desktop, Cursor, Antigravity) y se comunica mediante stdio JSON-RPC. No abre puertos de red ni realiza peticiones HTTP externas.",
      },
      {
        question: "¿Cuáles son los requisitos de ejecución?",
        answer:
          "Node.js 18+ (recomendado Node 20+) o Bun. No requiere entornos de Python ni claves de API externas.",
      },
      {
        question: "¿Es compatible con modelos locales (Ollama, Nous Hermes, DeepSeek)?",
        answer:
          "Sí. Al implementar el estándar abierto Model Context Protocol sobre stdio, es independiente del modelo. Funciona tanto con modelos locales ejecutados en Ollama, LM Studio o vLLM (Nous Hermes 3, DeepSeek-R1/V3, Llama 3) como con modelos comerciales (Claude, Grok, GPT-4o).",
      },
      {
        question: "¿Modifica los archivos PDF originales?",
        answer:
          "No. Todas las herramientas de escritura requieren un `outputPath` o `outputDirectory` explícito, manteniendo intactos los documentos originales.",
      },
    ],
  },
  cta: {
    title: "Ejecuta PDFLince MCP en Local",
    description: "Procesamiento PDF privado para tu IDE y agentes de IA en menos de un minuto.",
    command: "npx -y pdflince-mcp@latest",
    webAppLabel: "Abrir Aplicación Web",
    webAppHref: "/",
    githubLabel: "Ver Código en GitHub",
    githubHref: "https://github.com/GSiesto/pdflince",
  },
  ui: {
    copyPath: "Copiar ruta",
    copiedPath: "Ruta copiada",
    copyJson: "Copiar JSON",
    copiedJson: "Copiado",
    parametersHeading: "Parámetros",
    paramName: "Nombre",
    paramType: "Tipo",
    paramRequired: "Obligatorio",
    paramDescription: "Descripción",
    yes: "Sí",
    no: "No",
    promptExampleHeading: "Ejemplo de Prompt",
    copyPrompt: "Copiar prompt",
    copiedPrompt: "Copiado",
    clickToCopy: "Clic para copiar",
    copyCommandPrefix: "Copiar",
    commandCopied: "Comando copiado",
    directCliLabel: "Ejecución directa CLI / stdio:",
  },
};

export const mcpMetadataEs: McpMetadataStrings = {
  title: "Servidor MCP de PDFLince | Herramientas PDF Locales para Agentes de IA",
  description:
    "Servidor Model Context Protocol (MCP) de código abierto y 100% local para Claude Desktop, Cursor, Antigravity, Windsurf y agentes en Ollama. Inspecciona, comprime, une, divide y convierte PDFs sin subir archivos.",
  keywords: [
    "mcp",
    "model context protocol",
    "pdflince mcp",
    "servidor mcp pdf",
    "claude desktop pdf",
    "cursor mcp pdf",
    "antigravity mcp",
    "windsurf mcp",
    "ollama mcp pdf",
    "agentes ia pdf local",
  ],
  canonical: `${siteUrl}/mcp`,
};

// ============================================================================
// 3. PORTUGUESE (pt)
// ============================================================================
export const mcpPagePt: McpPageStrings = {
  hero: {
    eyebrow: "Model Context Protocol • Servidor Local Stdio",
    title: "Servidor MCP do PDFLince",
    subtitle:
      "Conecte Claude Desktop, Cursor, Antigravity, Windsurf ou VS Code a um motor PDF local sem nuvem. Inspecione, junte, divida, extraia, reordene, gire, recorte, comprima e converta PDFs diretamente no seu sistema de arquivos.",
    installCommand: "npx -y pdflince-mcp@latest",
    copyLabel: "Copiar comando",
    copiedLabel: "Copiado",
    stats: [
      { value: "10", label: "Ferramentas MCP" },
      { value: "0", label: "Requisições externas" },
      { value: "100%", label: "Execução local" },
      { value: "< 30ms", label: "Latência típica" },
    ],
  },
  privacyNotice: {
    title: "Arquitetura de Segurança Local",
    description:
      "Os clientes de IA comunicam-se com o PDFLince via entrada/saída padrão (stdio JSON-RPC) seguindo o protocolo aberto Model Context Protocol. Os documentos permanecem na memória local e nunca saem da sua máquina.",
    points: [
      "Zero tráfego de rede ou telemetria: todas as operações são executadas localmente via Node.js ou Bun.",
      "Projetado para fluxos corporativos e conformidade rigorosa de dados (LGPD, RGPD, HIPAA, SOC 2).",
      "Operações não destrutivas: as ferramentas gravam em caminhos de saída explícitos sem alterar os arquivos originais.",
    ],
  },
  features: {
    title: "Projetado para Fluxos de Documentos com Agentes",
    subtitle: "Operações PDF determinísticas para desenvolvedores, pesquisadores e automação local.",
    cards: [
      {
        icon: "shield",
        title: "Soberania Total de Dados",
        description:
          "Processe contratos, relatórios financeiros, prontuários e documentos internos localmente sem expor arquivos a APIs externas.",
      },
      {
        icon: "zap",
        title: "Execução Nativa em Memória",
        description:
          "Baseado em pdf-lib e pipelines nativos de imagem em Node.js e Bun. Operações concluídas em milissegundos sem upload.",
      },
      {
        icon: "blocks",
        title: "Compatibilidade Universal",
        description:
          "Funciona com Claude Desktop, Cursor, Antigravity, Windsurf, Cline, Roo Code, Zed e Open WebUI — tanto com Claude, Grok e GPT-4o quanto com modelos locais via Ollama (Nous Hermes, DeepSeek).",
      },
      {
        icon: "layers",
        title: "Paridade Total com a Web",
        description:
          "Expõe todas as 9 operações da aplicação web PDFLince — juntar, comprimir, dividir, extrair, reordenar, girar, recortar, PDF para imagens e imagens para PDF — além de inspeção detalhada.",
      },
      {
        icon: "file-check",
        title: "Preservação de Metadados",
        description:
          "Lê cabeçalhos originais sem alterar campos existentes e preserva os metadados de autoria ao gerar novos arquivos.",
      },
      {
        icon: "package",
        title: "Configuração em Um Comando",
        description:
          "Execute diretamente via `npx -y pdflince-mcp@latest` com Node.js 18+ ou Bun, sem necessidade de Python ou Docker.",
      },
    ],
  },
  clients: {
    title: "Configuração do Cliente",
    subtitle: "Adicione a definição do servidor ao arquivo de configuração do seu cliente MCP.",
    tabs: buildClientTabs({
      claude: "Registre o PDFLince no Claude Desktop para inspecionar e transformar PDFs locais durante as conversas.",
      cursor: "Permita que os agentes do Cursor inspecionem e processem arquivos PDF diretamente no seu repositório.",
      antigravity: "Configure o PDFLince como servidor MCP local no Google Antigravity IDE.",
      windsurf: "Habilite o Cascade para inspecionar, dividir, comprimir e converter PDFs em sessões locais.",
      vscode: "Integre o PDFLince com agentes autônomos de código no Visual Studio Code.",
    }),
  },
  tools: {
    title: "Referência de Ferramentas",
    subtitle: "Dez ferramentas MCP estruturadas que espelham todas as operações e opções da interface web do PDFLince.",
    items: buildToolsList({
      pdflince_inspect: {
        title: "Inspecionar PDF",
        badge: "Leitura",
        description:
          "Lê um arquivo PDF local sem modificá-lo. Retorna o total de páginas, dimensões por página, rotação, orientação e metadados.",
        paramDescriptions: {
          filePath: "Caminho absoluto ou relativo para o arquivo PDF local.",
        },
        promptExample: "Inspecione relatorio-2025.pdf e informe o número de páginas, dimensões e autor.",
      },
      pdflince_merge: {
        title: "Juntar PDFs",
        badge: "Composição",
        description:
          "Combina dois ou mais arquivos PDF em ordem sequencial, com páginas divisórias opcionais e metadados personalizados.",
        paramDescriptions: {
          filePaths: "Lista ordenada de caminhos PDF para juntar (mínimo 2).",
          outputPath: "Caminho de destino para o PDF combinado.",
          addPageDividers: "Insere uma página em branco entre os documentos unidos.",
          metadata: "Metadados personalizados ({ title, author, subject, keywords }).",
        },
        promptExample: "Junte parte1.pdf e parte2.pdf em guia-completo.pdf com páginas divisórias em branco.",
      },
      pdflince_split: {
        title: "Dividir PDF",
        badge: "Divisão",
        description: "Divide um PDF em vários documentos de N páginas cada, com compactação ZIP opcional.",
        paramDescriptions: {
          filePath: "Caminho para o arquivo PDF de origem.",
          outputDirectory: "Diretório onde os arquivos divididos serão salvos.",
          pagesPerFile: "Páginas por arquivo gerado (padrão: 1).",
          outputPrefix: "Prefixo personalizado para os arquivos gerados.",
          preserveMetadata: "Preserva os metadados do documento original (padrão: true).",
          bundleAsZip: "Empacota também todos os arquivos gerados em um arquivo .zip.",
        },
        promptExample: "Divida manual.pdf em arquivos de 4 páginas dentro de ./modulos e gere um arquivo ZIP.",
      },
      pdflince_extract: {
        title: "Extrair Páginas",
        badge: "Extração",
        description: "Extrai páginas específicas ou intervalos (ex.: '1-3, 5, 8') para um novo documento PDF.",
        paramDescriptions: {
          filePath: "Caminho para o arquivo PDF de origem.",
          outputPath: "Caminho de destino para o PDF extraído.",
          pages: "Intervalo de páginas ('1-3, 5') ou lista numérica baseada em 1.",
          preserveMetadata: "Preserva os metadados do documento original (padrão: true).",
        },
        promptExample: "Extraia as páginas 1-3 e a página 7 de contrato.pdf para resumo.pdf.",
      },
      pdflince_reorder: {
        title: "Reordenar Páginas",
        badge: "Organização",
        description: "Reorganiza as páginas de um PDF de acordo com uma sequência numérica baseada em 1.",
        paramDescriptions: {
          filePath: "Caminho para o arquivo PDF de origem.",
          outputPath: "Caminho de destino para o PDF reordenado.",
          pageOrder: "Sequência de páginas baseada em 1 (ex.: [3, 1, 2]).",
          preserveMetadata: "Preserva os metadados do documento original (padrão: true).",
        },
        promptExample: "Reordene apresentacao.pdf usando a sequência de páginas [4, 1, 2, 3].",
      },
      pdflince_rotate: {
        title: "Girar Páginas",
        badge: "Transformação",
        description: "Gira todas ou determinadas páginas em 90, 180, 270, -90, -180 ou -270 graus.",
        paramDescriptions: {
          filePath: "Caminho para o arquivo PDF de origem.",
          outputPath: "Caminho de destino para o PDF girado.",
          rotationDegrees: "Ângulo de rotação (90, 180, 270, -90, -180, -270; padrão: 90).",
          pages: "Páginas-alvo ('all' ou '1, 3-5'; padrão: 'all').",
          preserveMetadata: "Preserva os metadados do documento original (padrão: true).",
        },
        promptExample: "Gire a página 3 de digitalizacao.pdf em 90 graus no sentido horário.",
      },
      pdflince_crop: {
        title: "Recortar Margens",
        badge: "Recorte",
        description: "Recorta as margens superior, inferior, esquerda e direita em pontos tipográficos (72 pt = 1 polegada).",
        paramDescriptions: {
          filePath: "Caminho para o arquivo PDF de origem.",
          outputPath: "Caminho de destino para o PDF recortado.",
          margins: "Valores de margem { top, bottom, left, right } em pontos.",
          pages: "Páginas-alvo ('all' ou intervalo; padrão: 'all').",
          preserveMetadata: "Preserva os metadados do documento original (padrão: true).",
        },
        promptExample: "Recorte 36pt de todas as quatro margens em todas as páginas de apostila.pdf.",
      },
      pdflince_compress: {
        title: "Comprimir PDF",
        badge: "Otimização",
        description:
          "Reduz o tamanho do PDF usando os perfis da interface (low, medium, high), redução de resolução de imagens (150/72 DPI), compressão de fluxos e limpeza de metadados.",
        paramDescriptions: {
          filePath: "Caminho para o arquivo PDF de origem.",
          outputPath: "Caminho de destino para o PDF comprimido.",
          compressionLevel: "Perfil de compressão (padrão: 'medium').",
          downscaleImages: "Redimensiona e recomprime imagens incorporadas (true em medium/high).",
          downscaleImagesDpi: "DPI alvo para imagens (150 em medium, 72 em high).",
          imageQuality: "Qualidade JPEG entre 0.1 e 1.0 (padrão: 0.82).",
          preserveMetadata: "Preserva metadados (true em low/medium, false em high).",
          stripAnnotations: "Remove anotações de página (true em high).",
        },
        promptExample: "Comprima catalogo.pdf usando compressão high e salve em catalogo-compacto.pdf.",
      },
      pdflince_pdf_to_images: {
        title: "PDF para Imagens",
        badge: "Exportação",
        description:
          "Renderiza todas ou determinadas páginas de um PDF em imagens PNG ou JPEG em DPI configurável (72, 144, 300), com arquivo ZIP opcional.",
        paramDescriptions: {
          filePath: "Caminho para o arquivo PDF de origem.",
          outputDirectory: "Diretório onde as imagens renderizadas serão salvas.",
          format: "Formato da imagem de saída (padrão: 'png').",
          quality: "Qualidade JPEG entre 0.1 e 1.0 (padrão: 0.9).",
          dpi: "Resolução de renderização em DPI (72, 144, 300; padrão: 144).",
          pages: "Páginas para renderizar ('all' ou '1-3, 5'; padrão: 'all').",
          bundleAsZip: "Gera também um arquivo .zip com as imagens exportadas.",
          outputPrefix: "Prefixo personalizado para as imagens exportadas.",
        },
        promptExample: "Renderize as páginas 1-3 de folheto.pdf como PNG a 300 DPI em ./paginas-exportadas.",
      },
      pdflince_images_to_pdf: {
        title: "Imagens para PDF",
        badge: "Conversão",
        description:
          "Converte imagens locais (PNG, JPG, WebP, TIFF) em um documento PDF com ajuste, tamanho de página, orientação, margens e cor de fundo configuráveis.",
        paramDescriptions: {
          imagePaths: "Lista ordenada de caminhos de imagem (PNG, JPG, WebP, TIFF).",
          outputPath: "Caminho de destino para o PDF gerado.",
          imageFit: "Modo de ajuste da imagem (padrão: 'contain').",
          pageSize: "Dimensões da página (padrão: 'auto').",
          pageOrientation: "Orientação da página (padrão: 'auto').",
          pageMarginPoints: "Margem da página em pontos (padrão: 18).",
          backgroundColor: "Cor de fundo hexadecimal (padrão: '#ffffff').",
        },
        promptExample: "Converta scan1.png e scan2.webp em um PDF A4 retrato em ./digitalizacoes.pdf.",
      },
    }),
  },
  faq: {
    title: "Perguntas Frequentes",
    entries: [
      {
        question: "Como o servidor MCP funciona offline?",
        answer:
          "O binário `pdflince-mcp` é executado como um subprocesso local iniciado pelo seu cliente MCP (Claude Desktop, Cursor, Antigravity) e se comunica via stdio JSON-RPC. Ele não abre portas de rede nem faz requisições HTTP externas.",
      },
      {
        question: "Quais são os requisitos de execução?",
        answer:
          "Node.js 18+ (recomendado Node 20+) ou Bun. Não requer Python nem chaves de API em nuvem.",
      },
      {
        question: "Funciona com LLMs locais (Ollama, Nous Hermes, DeepSeek)?",
        answer:
          "Sim. Como implementa o padrão aberto Model Context Protocol sobre stdio, é independente de modelo. Você pode usá-lo com modelos locais (Nous Hermes 3, DeepSeek-R1/V3, Llama 3 via Ollama, LM Studio ou vLLM) e modelos comerciais (Claude, Grok, GPT-4o).",
      },
      {
        question: "Os arquivos PDF originais são modificados?",
        answer:
          "Não. Todas as operações de gravação exigem um `outputPath` ou `outputDirectory` explícito, mantendo os arquivos de origem intactos.",
      },
    ],
  },
  cta: {
    title: "Execute o PDFLince MCP Localmente",
    description: "Processamento de PDF sem nuvem para sua IDE e agentes de IA em menos de um minuto.",
    command: "npx -y pdflince-mcp@latest",
    webAppLabel: "Abrir Aplicação Web",
    webAppHref: "/pt",
    githubLabel: "Ver Código no GitHub",
    githubHref: "https://github.com/GSiesto/pdflince",
  },
  ui: {
    copyPath: "Copiar caminho",
    copiedPath: "Caminho copiado",
    copyJson: "Copiar JSON",
    copiedJson: "Copiado",
    parametersHeading: "Parâmetros",
    paramName: "Nome",
    paramType: "Tipo",
    paramRequired: "Obrigatório",
    paramDescription: "Descrição",
    yes: "Sim",
    no: "Não",
    promptExampleHeading: "Exemplo de Prompt",
    copyPrompt: "Copiar prompt",
    copiedPrompt: "Copiado",
    clickToCopy: "Clique para copiar",
    copyCommandPrefix: "Copiar",
    commandCopied: "Comando copiado",
    directCliLabel: "Execução direta CLI / stdio:",
  },
};

export const mcpMetadataPt: McpMetadataStrings = {
  title: "Servidor MCP do PDFLince | Ferramentas PDF Locais para Agentes de IA",
  description:
    "Servidor Model Context Protocol (MCP) local e de código aberto para Claude Desktop, Cursor, Antigravity, Windsurf e agentes Ollama. Inspecione, comprima, junte, divida e converta PDFs sem nuvem.",
  keywords: [
    "mcp",
    "model context protocol",
    "pdflince mcp",
    "servidor mcp pdf",
    "claude desktop pdf",
    "cursor mcp pdf",
    "antigravity mcp",
    "windsurf mcp",
    "ollama mcp pdf",
  ],
  canonical: `${siteUrl}/pt/mcp`,
};

// ============================================================================
// 4. FRENCH (fr)
// ============================================================================
export const mcpPageFr: McpPageStrings = {
  hero: {
    eyebrow: "Model Context Protocol • Serveur Local Stdio",
    title: "Serveur MCP PDFLince",
    subtitle:
      "Connectez Claude Desktop, Cursor, Antigravity, Windsurf ou VS Code à un moteur PDF local sans cloud. Inspectez, fusionnez, divisez, extrayez, réorganisez, pivotez, recadrez, compressez et convertissez vos PDF directement sur votre disque.",
    installCommand: "npx -y pdflince-mcp@latest",
    copyLabel: "Copier la commande",
    copiedLabel: "Copié",
    stats: [
      { value: "10", label: "Outils MCP" },
      { value: "0", label: "Requêtes externes" },
      { value: "100%", label: "Exécution locale" },
      { value: "< 30ms", label: "Latence typique" },
    ],
  },
  privacyNotice: {
    title: "Architecture de Sécurité Locale",
    description:
      "Les clients IA communiquent avec PDFLince via l'entrée/sortie standard (stdio JSON-RPC) selon la spécification ouverte Model Context Protocol. Les octets de vos documents restent en mémoire locale et ne quittent jamais votre machine.",
    points: [
      "Aucun trafic réseau ni télémétrie : toutes les opérations s'exécutent dans un processus local Node.js ou Bun.",
      "Conçu pour les environnements réglementés et la gouvernance stricte des données (RGPD, HIPAA, SOC 2).",
      "Traitement non destructif : les outils écrivent vers des chemins de sortie explicites sans modifier les fichiers sources.",
    ],
  },
  features: {
    title: "Conçu pour les Flux Documentaires Agentiques",
    subtitle: "Primitives PDF déterministes pour les ingénieurs logiciels, chercheurs et pipelines automatisés.",
    cards: [
      {
        icon: "shield",
        title: "Souveraineté des Données",
        description:
          "Traitez contrats, bilans financiers, dossiers médicaux et documents internes localement sans exposer vos fichiers à des API tierces.",
      },
      {
        icon: "zap",
        title: "Exécution Native en Mémoire",
        description:
          "Propulsé par pdf-lib et des pipelines d'images natifs sur Node.js et Bun. Opérations exécutées en quelques millisecondes sans téléversement.",
      },
      {
        icon: "blocks",
        title: "Compatibilité Universelle",
        description:
          "Fonctionne avec Claude Desktop, Cursor, Antigravity, Windsurf, Cline, Roo Code, Zed et Open WebUI — avec Claude, Grok, GPT-4o ou des modèles locaux via Ollama (Nous Hermes, DeepSeek).",
      },
      {
        icon: "layers",
        title: "Parité Complète avec l'Interface Web",
        description:
          "Expose les 9 opérations de l'application web PDFLince — fusionner, compresser, diviser, extraire, réorganiser, pivoter, recadrer, PDF en images et images en PDF — plus l'inspection complète.",
      },
      {
        icon: "file-check",
        title: "Gestion Déterministe des Métadonnées",
        description:
          "Lit les en-têtes bruts sans altérer les champs existants et préserve les métadonnées d'origine lors de la création de nouveaux fichiers.",
      },
      {
        icon: "package",
        title: "Installation en Une Commande",
        description:
          "Exécution directe via `npx -y pdflince-mcp@latest` avec Node.js 18+ ou Bun, sans environnement Python ni conteneur Docker.",
      },
    ],
  },
  clients: {
    title: "Configuration du Client",
    subtitle: "Ajoutez la définition du serveur au fichier de configuration de votre client MCP.",
    tabs: buildClientTabs({
      claude: "Enregistrez PDFLince dans Claude Desktop pour inspecter et transformer des PDF locaux pendant vos conversations.",
      cursor: "Permettez aux agents Cursor d'inspecter et de traiter des fichiers PDF directement dans votre espace de travail.",
      antigravity: "Configurez PDFLince comme serveur MCP local dans Google Antigravity IDE.",
      windsurf: "Autorisez Cascade à inspecter, diviser, compresser et convertir des PDF lors de vos sessions locales.",
      vscode: "Intégrez PDFLince aux agents de codage autonomes dans Visual Studio Code.",
    }),
  },
  tools: {
    title: "Référence des Outils",
    subtitle: "Dix outils MCP structurés reproduisant chaque opération et option de l'interface PDFLince.",
    items: buildToolsList({
      pdflince_inspect: {
        title: "Inspecter un PDF",
        badge: "Lecture",
        description:
          "Analyse un fichier PDF local sans le modifier. Renvoie le nombre de pages, les dimensions par page, la rotation, l'orientation et les métadonnées.",
        paramDescriptions: {
          filePath: "Chemin absolu ou relatif vers le fichier PDF local.",
        },
        promptExample: "Inspecte rapport-financier.pdf et donne-moi le nombre de pages, les dimensions et l'auteur.",
      },
      pdflince_merge: {
        title: "Fusionner des PDF",
        badge: "Composition",
        description:
          "Combine deux fichiers PDF ou plus dans l'ordre séquentiel, avec pages intercalaires vierges optionnelles et métadonnées personnalisées.",
        paramDescriptions: {
          filePaths: "Liste ordonnée des chemins PDF à fusionner (minimum 2).",
          outputPath: "Chemin de destination pour le PDF fusionné.",
          addPageDividers: "Insérer une page vierge entre chaque document fusionné.",
          metadata: "Métadonnées personnalisées ({ title, author, subject, keywords }).",
        },
        promptExample: "Fusionne partie1.pdf et partie2.pdf dans guide-complet.pdf avec des pages intercalaires.",
      },
      pdflince_split: {
        title: "Diviser un PDF",
        badge: "Division",
        description: "Divise un PDF en plusieurs documents de N pages chacun, avec archivage ZIP optionnel.",
        paramDescriptions: {
          filePath: "Chemin vers le fichier PDF source.",
          outputDirectory: "Répertoire où les fichiers PDF divisés seront enregistrés.",
          pagesPerFile: "Pages par fichier généré (par défaut : 1).",
          outputPrefix: "Préfixe de nom de fichier personnalisé.",
          preserveMetadata: "Conserver les métadonnées du document source (par défaut : true).",
          bundleAsZip: "Regrouper également tous les fichiers générés dans une archive .zip.",
        },
        promptExample: "Divise documentation.pdf en fichiers de 4 pages dans ./modules et crée une archive ZIP.",
      },
      pdflince_extract: {
        title: "Extraire des Pages",
        badge: "Extraction",
        description: "Extrait des pages spécifiques ou des plages (ex. '1-3, 5, 8') dans un nouveau document PDF.",
        paramDescriptions: {
          filePath: "Chemin vers le fichier PDF source.",
          outputPath: "Chemin de destination pour le PDF extrait.",
          pages: "Plage de pages indexée à 1 ('1-3, 5') ou tableau de numéros.",
          preserveMetadata: "Conserver les métadonnées du document source (par défaut : true).",
        },
        promptExample: "Extrais les pages 1 à 3 et la page 7 de contrat.pdf dans resume.pdf.",
      },
      pdflince_reorder: {
        title: "Réorganiser les Pages",
        badge: "Organisation",
        description: "Réorganise les pages d'un PDF selon une séquence numérique indexée à 1.",
        paramDescriptions: {
          filePath: "Chemin vers le fichier PDF source.",
          outputPath: "Chemin de destination pour le PDF réorganisé.",
          pageOrder: "Tableau de l'ordre des pages indexé à 1 (ex. [3, 1, 2]).",
          preserveMetadata: "Conserver les métadonnées du document source (par défaut : true).",
        },
        promptExample: "Réorganise presentation.pdf selon la séquence de pages [4, 1, 2, 3].",
      },
      pdflince_rotate: {
        title: "Pivoter les Pages",
        badge: "Transformation",
        description: "Fait pivoter toutes les pages ou une sélection de 90, 180, 270, -90, -180 ou -270 degrés.",
        paramDescriptions: {
          filePath: "Chemin vers le fichier PDF source.",
          outputPath: "Chemin de destination pour le PDF pivoté.",
          rotationDegrees: "Angle de rotation (90, 180, 270, -90, -180, -270 ; par défaut : 90).",
          pages: "Pages cibles ('all' ou '1, 3-5' ; par défaut : 'all').",
          preserveMetadata: "Conserver les métadonnées du document source (par défaut : true).",
        },
        promptExample: "Fais pivoter la page 3 de scan.pdf de 90 degrés dans le sens horaire.",
      },
      pdflince_crop: {
        title: "Recadrer les Marges",
        badge: "Recadrage",
        description: "Rogner les marges supérieure, inférieure, gauche et droite en points typographiques (72 pt = 1 pouce).",
        paramDescriptions: {
          filePath: "Chemin vers le fichier PDF source.",
          outputPath: "Chemin de destination pour le PDF recadré.",
          margins: "Valeurs des marges { top, bottom, left, right } en points.",
          pages: "Pages cibles ('all' ou plage ; par défaut : 'all').",
          preserveMetadata: "Conserver les métadonnées du document source (par défaut : true).",
        },
        promptExample: "Recadre 36pt sur les quatre marges de toutes les pages de support.pdf.",
      },
      pdflince_compress: {
        title: "Compresser un PDF",
        badge: "Optimisation",
        description:
          "Réduit la taille du PDF via les profils de l'interface (low, medium, high), le sous-échantillonnage d'images (150/72 DPI), la compression des flux et le nettoyage des métadonnées.",
        paramDescriptions: {
          filePath: "Chemin vers le fichier PDF source.",
          outputPath: "Chemin de destination pour le PDF compressé.",
          compressionLevel: "Profil de compression (par défaut : 'medium').",
          downscaleImages: "Réduire et recompresser les images intégrées (true pour medium/high).",
          downscaleImagesDpi: "DPI cible des images (150 pour medium, 72 pour high).",
          imageQuality: "Qualité JPEG entre 0.1 et 1.0 (par défaut : 0.82).",
          preserveMetadata: "Conserver les métadonnées (true pour low/medium, false pour high).",
          stripAnnotations: "Supprimer les annotations de page (true pour high).",
        },
        promptExample: "Compresse manuel-volumineux.pdf en niveau high et enregistre sous manuel-compact.pdf.",
      },
      pdflince_pdf_to_images: {
        title: "PDF en Images",
        badge: "Exportation",
        description:
          "Convertit toutes les pages ou une sélection en images PNG ou JPEG à résolution configurable (72, 144, 300 DPI), avec archive ZIP optionnelle.",
        paramDescriptions: {
          filePath: "Chemin vers le fichier PDF source.",
          outputDirectory: "Répertoire où les images seront enregistrées.",
          format: "Format d'image de sortie (par défaut : 'png').",
          quality: "Qualité JPEG entre 0.1 et 1.0 (par défaut : 0.9).",
          dpi: "Résolution de rendu en DPI (72, 144, 300 ; par défaut : 144).",
          pages: "Pages à exporter ('all' ou '1-3, 5' ; par défaut : 'all').",
          bundleAsZip: "Générer également une archive .zip des images exportées.",
          outputPrefix: "Préfixe personnalisé pour les fichiers exportés.",
        },
        promptExample: "Exporte les pages 1 à 3 de brochure.pdf en PNG 300 DPI dans ./pages-exportees.",
      },
      pdflince_images_to_pdf: {
        title: "Images en PDF",
        badge: "Conversion",
        description:
          "Compile des images locales (PNG, JPG, WebP, TIFF) dans un document PDF avec ajustement, format de page, orientation, marges et couleur de fond configurables.",
        paramDescriptions: {
          imagePaths: "Liste ordonnée des chemins d'images (PNG, JPG, WebP, TIFF).",
          outputPath: "Chemin de destination pour le PDF généré.",
          imageFit: "Mode d'ajustement de l'image (par défaut : 'contain').",
          pageSize: "Format de page (par défaut : 'auto').",
          pageOrientation: "Orientation de page (par défaut : 'auto').",
          pageMarginPoints: "Marge de page en points (par défaut : 18).",
          backgroundColor: "Couleur de fond hexadécimale (par défaut : '#ffffff').",
        },
        promptExample: "Convertis scan1.png et scan2.webp en un PDF A4 portrait dans ./scans.pdf.",
      },
    }),
  },
  faq: {
    title: "Questions Fréquentes",
    entries: [
      {
        question: "Comment le serveur MCP fonctionne-t-il hors ligne ?",
        answer:
          "Le binaire `pdflince-mcp` s'exécute comme un sous-processus local lancé par votre hôte MCP (Claude Desktop, Cursor, Antigravity) et communique via stdio JSON-RPC. Il n'ouvre aucun port réseau et n'effectue aucune requête HTTP externe.",
      },
      {
        question: "Quels sont les prérequis système ?",
        answer:
          "Node.js 18+ (Node 20+ recommandé) ou Bun. Aucun environnement Python ni clé API cloud n'est requis.",
      },
      {
        question: "Fonctionne-t-il avec les LLM locaux (Ollama, Nous Hermes, DeepSeek) ?",
        answer:
          "Oui. Comme PDFLince implémente le standard ouvert Model Context Protocol sur stdio, il est indépendant du modèle. Vous pouvez l'utiliser avec des modèles locaux (Nous Hermes 3, DeepSeek-R1/V3, Llama 3 via Ollama, LM Studio ou vLLM) ainsi qu'avec Claude, Grok ou GPT-4o.",
      },
      {
        question: "Les fichiers PDF sources sont-ils modifiés ?",
        answer:
          "Non. Chaque opération d'écriture nécessite un `outputPath` ou `outputDirectory` explicite, laissant vos fichiers originaux intacts.",
      },
    ],
  },
  cta: {
    title: "Déployer PDFLince MCP Localement",
    description: "Traitement PDF sans cloud pour votre IDE et vos agents IA en moins d'une minute.",
    command: "npx -y pdflince-mcp@latest",
    webAppLabel: "Ouvrir l'Application Web",
    webAppHref: "/fr",
    githubLabel: "Voir le Code sur GitHub",
    githubHref: "https://github.com/GSiesto/pdflince",
  },
  ui: {
    copyPath: "Copier le chemin",
    copiedPath: "Chemin copié",
    copyJson: "Copier le JSON",
    copiedJson: "Copié",
    parametersHeading: "Paramètres",
    paramName: "Nom",
    paramType: "Type",
    paramRequired: "Requis",
    paramDescription: "Description",
    yes: "Oui",
    no: "Non",
    promptExampleHeading: "Exemple de Prompt",
    copyPrompt: "Copier le prompt",
    copiedPrompt: "Copié",
    clickToCopy: "Cliquer pour copier",
    copyCommandPrefix: "Copier",
    commandCopied: "Commande copiée",
    directCliLabel: "Exécution directe CLI / stdio :",
  },
};

export const mcpMetadataFr: McpMetadataStrings = {
  title: "Serveur MCP PDFLince | Outils PDF Locaux pour Agents IA",
  description:
    "Serveur Model Context Protocol (MCP) open-source et 100 % local pour Claude Desktop, Cursor, Antigravity, Windsurf et Ollama. Inspectez, compressez, fusionnez, divisez et convertissez vos PDF sans cloud.",
  keywords: [
    "mcp",
    "model context protocol",
    "pdflince mcp",
    "serveur mcp pdf",
    "claude desktop pdf",
    "cursor mcp pdf",
    "antigravity mcp",
    "windsurf mcp",
    "ollama mcp pdf",
  ],
  canonical: `${siteUrl}/fr/mcp`,
};

// ============================================================================
// 5. GERMAN (de)
// ============================================================================
export const mcpPageDe: McpPageStrings = {
  hero: {
    eyebrow: "Model Context Protocol • Lokaler Stdio-Server",
    title: "PDFLince MCP-Server",
    subtitle:
      "Verbinden Sie Claude Desktop, Cursor, Antigravity, Windsurf oder VS Code mit einer lokalen, cloud-freien PDF-Engine. PDFs direkt im Dateisystem prüfen, zusammenführen, teilen, extrahieren, neu anordnen, drehen, zuschneiden, komprimieren und konvertieren.",
    installCommand: "npx -y pdflince-mcp@latest",
    copyLabel: "Befehl kopieren",
    copiedLabel: "Kopiert",
    stats: [
      { value: "10", label: "MCP-Tools" },
      { value: "0", label: "Externe Anfragen" },
      { value: "100%", label: "Lokale Ausführung" },
      { value: "< 30ms", label: "Typische Latenz" },
    ],
  },
  privacyNotice: {
    title: "Lokale Sicherheitsarchitektur",
    description:
      "KI-Clients kommunizieren mit PDFLince über Standard-Ein-/Ausgabe (stdio JSON-RPC) gemäß der offenen Model-Context-Protocol-Spezifikation. Dokumentdaten verbleiben im lokalen Arbeitsspeicher und verlassen niemals Ihren Rechner.",
    points: [
      "Kein Netzwerkverkehr oder Telemetrie: Alle Operationen laufen in einem lokalen Node.js- oder Bun-Prozess.",
      "Entwickelt für regulierte Workflows und strenge Datenschutzanforderungen (DSGVO, HIPAA, SOC 2).",
      "Nicht-destruktive Dateiverarbeitung: Alle Schreiboperationen nutzen explizite Ausgabepfade, ohne Quelldateien zu verändern.",
    ],
  },
  features: {
    title: "Entwickelt für Agentische Dokumenten-Workflows",
    subtitle: "Deterministische PDF-Operationen für Softwareentwickler, Forscher und automatisierte Pipelines.",
    cards: [
      {
        icon: "shield",
        title: "Strikte Datensouveränität",
        description:
          "Verarbeiten Sie Verträge, Finanzberichte, Patientenakten und interne Dokumente lokal, ohne Dateien an Drittanbieter-APIs zu senden.",
      },
      {
        icon: "zap",
        title: "Native In-Memory-Ausführung",
        description:
          "Angetrieben von pdf-lib und nativen Bild-Pipelines unter Node.js und Bun. Verarbeitung in Millisekunden ohne Upload-Engpässe.",
      },
      {
        icon: "blocks",
        title: "Universelle Host- & Modell-Unterstützung",
        description:
          "Kompatibel mit Claude Desktop, Cursor, Antigravity, Windsurf, Cline, Roo Code, Zed und Open WebUI – mit Claude, Grok, GPT-4o oder lokalen Ollama-Modellen (Nous Hermes, DeepSeek).",
      },
      {
        icon: "layers",
        title: "Volle Funktionsparität zur Web-App",
        description:
          "Bietet alle 9 Operationen der PDFLince-Webanwendung – Zusammenführen, Komprimieren, Teilen, Extrahieren, Neu anordnen, Drehen, Zuschneiden, PDF in Bilder und Bilder in PDF – plus Dokumenteninspektion.",
      },
      {
        icon: "file-check",
        title: "Deterministische Metadaten-Verwaltung",
        description:
          "Liest Dokument-Header unverändert aus und erhält bestehende Autoren-Metadaten beim Erzeugen neuer Dateien.",
      },
      {
        icon: "package",
        title: "Einrichtung mit einem Befehl",
        description:
          "Direkte Ausführung über `npx -y pdflince-mcp@latest` mit Node.js 18+ oder Bun. Keine Python-Umgebung oder Docker erforderlich.",
      },
    ],
  },
  clients: {
    title: "Client-Konfiguration",
    subtitle: "Fügen Sie die Serverdefinition zur Konfigurationsdatei Ihres MCP-Clients hinzu.",
    tabs: buildClientTabs({
      claude: "Registrieren Sie PDFLince in Claude Desktop, um lokale PDFs direkt im Chat zu prüfen und zu bearbeiten.",
      cursor: "Ermöglichen Sie Cursor-Agenten, PDF-Dateien direkt in Ihrem Projekt-Workspace zu analysieren und zu verarbeiten.",
      antigravity: "Konfigurieren Sie PDFLince als lokalen MCP-Server in der Google Antigravity IDE.",
      windsurf: "Erlauben Sie Cascade, PDFs in lokalen Entwicklungssitzungen zu prüfen, zu teilen, zu komprimieren und zu konvertieren.",
      vscode: "Integrieren Sie PDFLince mit autonomen Coding-Agenten in Visual Studio Code.",
    }),
  },
  tools: {
    title: "Tool-Referenz",
    subtitle: "Zehn strukturierte MCP-Tools, die jede Operation und Option der PDFLince-Oberfläche abbilden.",
    items: buildToolsList({
      pdflince_inspect: {
        title: "PDF prüfen",
        badge: "Lesen",
        description:
          "Liest eine lokale PDF-Datei ohne sie zu verändern. Liefert Gesamtseitenzahl, Seitenmaße, Drehung, Ausrichtung und Dokument-Metadaten.",
        paramDescriptions: {
          filePath: "Absoluter oder relativer Pfad zur lokalen PDF-Datei.",
        },
        promptExample: "Prüfe finanzbericht.pdf und gib Seitenzahl, Abmessungen und Autor zurück.",
      },
      pdflince_merge: {
        title: "PDFs zusammenführen",
        badge: "Kombinieren",
        description:
          "Führt zwei oder mehr PDF-Dateien sequenziell zusammen, optional mit leeren Trennseiten und eigenen Metadaten.",
        paramDescriptions: {
          filePaths: "Geordnete Liste der zusammenzuführenden PDF-Dateipfade (mindestens 2).",
          outputPath: "Zielpfad für die zusammengeführte PDF-Datei.",
          addPageDividers: "Leere Trennseite zwischen zusammengeführten Dokumenten einfügen.",
          metadata: "Benutzerdefinierte Metadaten ({ title, author, subject, keywords }).",
        },
        promptExample: "Führe teil1.pdf und teil2.pdf mit Trennseiten zu handbuch-komplett.pdf zusammen.",
      },
      pdflince_split: {
        title: "PDF teilen",
        badge: "Teilen",
        description: "Teilt ein PDF in mehrere Dokumente mit jeweils N Seiten auf, optional mit ZIP-Archivierung.",
        paramDescriptions: {
          filePath: "Pfad zur Quell-PDF-Datei.",
          outputDirectory: "Ausgabeverzeichnis für die geteilten PDF-Dateien.",
          pagesPerFile: "Seiten pro Ausgabedatei (Standard: 1).",
          outputPrefix: "Eigenes Dateinamenspräfix für erzeugte Dateien.",
          preserveMetadata: "Metadaten des Quelldokuments beibehalten (Standard: true).",
          bundleAsZip: "Alle geteilten Dateien zusätzlich in ein .zip-Archiv packen.",
        },
        promptExample: "Teile dokumentation.pdf in 4-Seiten-Dateien unter ./module und erstelle ein ZIP-Archiv.",
      },
      pdflince_extract: {
        title: "Seiten extrahieren",
        badge: "Extrahieren",
        description: "Extrahiert bestimmte Seiten oder Seitenbereiche (z. B. '1-3, 5, 8') in ein neues PDF-Dokument.",
        paramDescriptions: {
          filePath: "Pfad zur Quell-PDF-Datei.",
          outputPath: "Zielpfad für die extrahierte PDF-Datei.",
          pages: "1-basierter Seitenbereich ('1-3, 5') oder Zahlen-Array.",
          preserveMetadata: "Metadaten des Quelldokuments beibehalten (Standard: true).",
        },
        promptExample: "Extrahiere die Seiten 1-3 und Seite 7 aus vertrag.pdf nach zusammenfassung.pdf.",
      },
      pdflince_reorder: {
        title: "Seiten neu anordnen",
        badge: "Ordnen",
        description: "Ordnet die Seiten eines PDFs anhand einer 1-basierten Zahlenfolge neu an.",
        paramDescriptions: {
          filePath: "Pfad zur Quell-PDF-Datei.",
          outputPath: "Zielpfad für die neu angeordnete PDF-Datei.",
          pageOrder: "1-basiertes Array der Seitenreihenfolge (z. B. [3, 1, 2]).",
          preserveMetadata: "Metadaten des Quelldokuments beibehalten (Standard: true).",
        },
        promptExample: "Ordne praesentation.pdf mit der Seitenfolge [4, 1, 2, 3] neu an.",
      },
      pdflince_rotate: {
        title: "Seiten drehen",
        badge: "Transformieren",
        description: "Dreht alle oder ausgewählte Seiten um 90, 180, 270, -90, -180 oder -270 Grad.",
        paramDescriptions: {
          filePath: "Pfad zur Quell-PDF-Datei.",
          outputPath: "Zielpfad für die gedrehte PDF-Datei.",
          rotationDegrees: "Drehwinkel (90, 180, 270, -90, -180, -270; Standard: 90).",
          pages: "Zielseiten ('all' oder '1, 3-5'; Standard: 'all').",
          preserveMetadata: "Metadaten des Quelldokuments beibehalten (Standard: true).",
        },
        promptExample: "Drehe Seite 3 von scan.pdf um 90 Grad im Uhrzeigersinn.",
      },
      pdflince_crop: {
        title: "Ränder zuschneiden",
        badge: "Zuschneiden",
        description: "Schneidet den oberen, unteren, linken und rechten Rand in typografischen Punkten zu (72 pt = 1 Zoll).",
        paramDescriptions: {
          filePath: "Pfad zur Quell-PDF-Datei.",
          outputPath: "Zielpfad für die zugeschnittene PDF-Datei.",
          margins: "Randwerte { top, bottom, left, right } in Punkten.",
          pages: "Zielseiten ('all' oder Bereich; Standard: 'all').",
          preserveMetadata: "Metadaten des Quelldokuments beibehalten (Standard: true).",
        },
        promptExample: "Schneide bei allen Seiten von folien.pdf an allen vier Rändern 36pt ab.",
      },
      pdflince_compress: {
        title: "PDF komprimieren",
        badge: "Optimieren",
        description:
          "Reduziert die Dateigröße mit den Profilen der Web-App (low, medium, high), Bildskalierung (150/72 DPI), Objektstrom-Komprimierung und Metadaten-Bereinigung.",
        paramDescriptions: {
          filePath: "Pfad zur Quell-PDF-Datei.",
          outputPath: "Zielpfad für die komprimierte PDF-Datei.",
          compressionLevel: "Komprimierungsprofil (Standard: 'medium').",
          downscaleImages: "Eingebettete Bilder herunterskalieren und neu komprimieren (true bei medium/high).",
          downscaleImagesDpi: "Ziel-DPI für Bilder (150 bei medium, 72 bei high).",
          imageQuality: "JPEG-Qualität zwischen 0.1 und 1.0 (Standard: 0.82).",
          preserveMetadata: "Metadaten erhalten (true bei low/medium, false bei high).",
          stripAnnotations: "Seitenanmerkungen entfernen (true bei high).",
        },
        promptExample: "Komprimiere katalog-gross.pdf mit Stufe high und speichere es unter katalog-kompakt.pdf.",
      },
      pdflince_pdf_to_images: {
        title: "PDF in Bilder",
        badge: "Exportieren",
        description:
          "Rendert alle oder ausgewählte PDF-Seiten als PNG- oder JPEG-Bilder mit wählbarer Auflösung (72, 144, 300 DPI), optional als ZIP-Archiv.",
        paramDescriptions: {
          filePath: "Pfad zur Quell-PDF-Datei.",
          outputDirectory: "Verzeichnis, in dem die gerenderten Bilder gespeichert werden.",
          format: "Ausgabeformat (Standard: 'png').",
          quality: "JPEG-Qualität zwischen 0.1 und 1.0 (Standard: 0.9).",
          dpi: "Render-Auflösung in DPI (72, 144, 300; Standard: 144).",
          pages: "Zu rendernde Seiten ('all' oder '1-3, 5'; Standard: 'all').",
          bundleAsZip: "Zusätzlich ein .zip-Archiv der exportierten Bilder erstellen.",
          outputPrefix: "Eigenes Dateinamenspräfix für exportierte Bilder.",
        },
        promptExample: "Exportiere die Seiten 1-3 von broschuere.pdf als 300-DPI-PNGs nach ./exportierte-seiten.",
      },
      pdflince_images_to_pdf: {
        title: "Bilder in PDF",
        badge: "Konvertieren",
        description:
          "Erstellt aus lokalen Bildern (PNG, JPG, WebP, TIFF) ein PDF-Dokument mit konfigurierbarer Anpassung, Seitengröße, Ausrichtung, Rändern und Hintergrundfarbe.",
        paramDescriptions: {
          imagePaths: "Geordnete Liste der Bildpfade (PNG, JPG, WebP, TIFF).",
          outputPath: "Zielpfad für die erzeugte PDF-Datei.",
          imageFit: "Bildanpassungsmodus (Standard: 'contain').",
          pageSize: "Seitenformat (Standard: 'auto').",
          pageOrientation: "Seitenausrichtung (Standard: 'auto').",
          pageMarginPoints: "Seitenrand in Punkten (Standard: 18).",
          backgroundColor: "Hintergrundfarbe als Hex-Wert (Standard: '#ffffff').",
        },
        promptExample: "Konvertiere scan1.png und scan2.webp in ein A4-Hochformat-PDF unter ./scans.pdf.",
      },
    }),
  },
  faq: {
    title: "Häufig gestellte Fragen",
    entries: [
      {
        question: "Wie arbeitet der MCP-Server komplett offline?",
        answer:
          "Das Binary `pdflince-mcp` läuft als lokaler Kindprozess Ihres MCP-Hosts (Claude Desktop, Cursor, Antigravity) und kommuniziert über stdio JSON-RPC. Es öffnet keine Netzwerk-Ports und sendet keine externen HTTP-Anfragen.",
      },
      {
        question: "Welche Laufzeitanforderungen gibt es?",
        answer:
          "Node.js 18+ (Node 20+ empfohlen) oder Bun. Es werden weder Python-Umgebungen noch externe Cloud-API-Schlüssel benötigt.",
      },
      {
        question: "Funktioniert er mit lokalen LLMs (Ollama, Nous Hermes, DeepSeek)?",
        answer:
          "Ja. Da PDFLince den offenen stdio-Standard des Model Context Protocol implementiert, ist er modellunabhängig. Er funktioniert mit lokalen Modellen (Nous Hermes 3, DeepSeek-R1/V3, Llama 3 über Ollama, LM Studio oder vLLM) ebenso wie mit Claude, Grok oder GPT-4o.",
      },
      {
        question: "Werden Original-PDF-Dateien überschrieben?",
        answer:
          "Nein. Jede Schreiboperation erfordert einen expliziten `outputPath` oder ein `outputDirectory`, sodass Ihre Quelldateien unverändert bleiben.",
      },
    ],
  },
  cta: {
    title: "PDFLince MCP lokal einsetzen",
    description: "Cloud-freie PDF-Verarbeitung für Ihre IDE und KI-Agenten in weniger als einer Minute.",
    command: "npx -y pdflince-mcp@latest",
    webAppLabel: "Web-App öffnen",
    webAppHref: "/de",
    githubLabel: "Quellcode auf GitHub",
    githubHref: "https://github.com/GSiesto/pdflince",
  },
  ui: {
    copyPath: "Pfad kopieren",
    copiedPath: "Pfad kopiert",
    copyJson: "JSON kopieren",
    copiedJson: "Kopiert",
    parametersHeading: "Parameter",
    paramName: "Name",
    paramType: "Typ",
    paramRequired: "Erforderlich",
    paramDescription: "Beschreibung",
    yes: "Ja",
    no: "Nein",
    promptExampleHeading: "Beispiel-Prompt",
    copyPrompt: "Prompt kopieren",
    copiedPrompt: "Kopiert",
    clickToCopy: "Klicken zum Kopieren",
    copyCommandPrefix: "Kopieren",
    commandCopied: "Befehl kopiert",
    directCliLabel: "Direkter CLI- / stdio-Aufruf:",
  },
};

export const mcpMetadataDe: McpMetadataStrings = {
  title: "PDFLince MCP-Server | Lokale PDF-Tools für KI-Agenten",
  description:
    "Lokaler Open-Source Model Context Protocol (MCP) Server für Claude Desktop, Cursor, Antigravity, Windsurf und Ollama. PDFs ohne Cloud-Upload prüfen, komprimieren, zusammenführen, teilen und konvertieren.",
  keywords: [
    "mcp",
    "model context protocol",
    "pdflince mcp",
    "mcp pdf server",
    "claude desktop pdf",
    "cursor mcp pdf",
    "antigravity mcp",
    "windsurf mcp",
    "ollama mcp pdf",
  ],
  canonical: `${siteUrl}/de/mcp`,
};

// ============================================================================
// 6. ITALIAN (it)
// ============================================================================
export const mcpPageIt: McpPageStrings = {
  hero: {
    eyebrow: "Model Context Protocol • Server Locale Stdio",
    title: "Server MCP di PDFLince",
    subtitle:
      "Collega Claude Desktop, Cursor, Antigravity, Windsurf o VS Code a un motore PDF locale senza cloud. Ispeziona, unisci, dividi, estrai, riordina, ruota, ritaglia, comprimi e converti file PDF direttamente sul tuo file system.",
    installCommand: "npx -y pdflince-mcp@latest",
    copyLabel: "Copia comando",
    copiedLabel: "Copiato",
    stats: [
      { value: "10", label: "Strumenti MCP" },
      { value: "0", label: "Richieste esterne" },
      { value: "100%", label: "Esecuzione locale" },
      { value: "< 30ms", label: "Latenza tipica" },
    ],
  },
  privacyNotice: {
    title: "Architettura di Sicurezza Locale",
    description:
      "I client IA comunicano con PDFLince tramite standard input/output (stdio JSON-RPC) secondo la specifica aperta Model Context Protocol. I byte dei documenti restano nella memoria locale e non lasciano mai il tuo dispositivo.",
    points: [
      "Zero traffico di rete o telemetria: tutte le operazioni vengono eseguite in un processo locale Node.js o Bun.",
      "Progettato per flussi regolamentati e rigorosa governance dei dati (GDPR, HIPAA, SOC 2).",
      "Elaborazione non distruttiva: gli strumenti scrivono su percorsi di output espliciti senza modificare i file originali.",
    ],
  },
  features: {
    title: "Progettato per Flussi Documentali con Agenti IA",
    subtitle: "Primitive PDF deterministiche per sviluppatori, ricercatori e pipeline di automazione.",
    cards: [
      {
        icon: "shield",
        title: "Sovranità dei Dati",
        description:
          "Elabora contratti, bilanci, cartelle cliniche e documentazione interna localmente senza esporre file ad API di terze parti.",
      },
      {
        icon: "zap",
        title: "Esecuzione Nativa in Memoria",
        description:
          "Basato su pdf-lib e pipeline di immagini native su Node.js e Bun. Operazioni completate in millisecondi senza tempi di caricamento.",
      },
      {
        icon: "blocks",
        title: "Compatibilità Universale",
        description:
          "Funziona con Claude Desktop, Cursor, Antigravity, Windsurf, Cline, Roo Code, Zed e Open WebUI — con Claude, Grok, GPT-4o o modelli locali tramite Ollama (Nous Hermes, DeepSeek).",
      },
      {
        icon: "layers",
        title: "Piena Parità con l'Applicazione Web",
        description:
          "Include tutte le 9 operazioni dell'app web PDFLince — unisci, comprimi, dividi, estrai, riordina, ruota, ritaglia, da PDF a immagini e da immagini a PDF — più l'ispezione approfondita.",
      },
      {
        icon: "file-check",
        title: "Gestione Deterministica dei Metadati",
        description:
          "Legge le intestazioni originali senza alterare i campi esistenti e preserva i metadati d'autore durante la generazione di nuovi file.",
      },
      {
        icon: "package",
        title: "Configurazione con un Solo Comando",
        description:
          "Esecuzione diretta tramite `npx -y pdflince-mcp@latest` con Node.js 18+ o Bun, senza ambienti Python né container Docker.",
      },
    ],
  },
  clients: {
    title: "Configurazione del Client",
    subtitle: "Aggiungi la definizione del server al file di configurazione del tuo client MCP.",
    tabs: buildClientTabs({
      claude: "Registra PDFLince in Claude Desktop per ispezionare e trasformare PDF locali durante le conversazioni.",
      cursor: "Consenti agli agenti di Cursor di ispezionare ed elaborare file PDF direttamente nel tuo workspace.",
      antigravity: "Configura PDFLince come server MCP locale in Google Antigravity IDE.",
      windsurf: "Abilita Cascade a ispezionare, dividere, comprimere e convertire PDF nelle sessioni di sviluppo locali.",
      vscode: "Integra PDFLince con gli agenti di programmazione autonomi in Visual Studio Code.",
    }),
  },
  tools: {
    title: "Riferimento Strumenti",
    subtitle: "Dieci strumenti MCP strutturati che rispecchiano ogni operazione e opzione dell'interfaccia PDFLince.",
    items: buildToolsList({
      pdflince_inspect: {
        title: "Ispeziona PDF",
        badge: "Lettura",
        description:
          "Legge un PDF locale senza modificarlo. Restituisce numero totale di pagine, dimensioni per pagina, rotazione, orientamento e metadati.",
        paramDescriptions: {
          filePath: "Percorso assoluto o relativo al file PDF locale.",
        },
        promptExample: "Ispeziona bilancio-2025.pdf e restituisci numero di pagine, dimensioni e autore.",
      },
      pdflince_merge: {
        title: "Unisci PDF",
        badge: "Composizione",
        description:
          "Combina due o più file PDF in ordine sequenziale, con pagine divisorie bianche opzionali e metadati personalizzati.",
        paramDescriptions: {
          filePaths: "Elenco ordinato dei percorsi PDF da unire (minimo 2).",
          outputPath: "Percorso di destinazione per il PDF unito.",
          addPageDividers: "Inserisce una pagina bianca tra i documenti uniti.",
          metadata: "Metadati personalizzati ({ title, author, subject, keywords }).",
        },
        promptExample: "Unisci parte1.pdf e parte2.pdf in guida-completa.pdf con pagine divisorie bianche.",
      },
      pdflince_split: {
        title: "Dividi PDF",
        badge: "Divisione",
        description: "Divide un PDF in più documenti di N pagine ciascuno, con archiviazione ZIP opzionale.",
        paramDescriptions: {
          filePath: "Percorso del file PDF di origine.",
          outputDirectory: "Cartella in cui verranno salvati i file PDF divisi.",
          pagesPerFile: "Pagine per file generato (predefinito: 1).",
          outputPrefix: "Prefisso personalizzato per i file generati.",
          preserveMetadata: "Conserva i metadati del documento originale (predefinito: true).",
          bundleAsZip: "Racchiude inoltre tutti i file generati in un archivio .zip.",
        },
        promptExample: "Dividi manuale.pdf in file da 4 pagine dentro ./moduli e crea un archivio ZIP.",
      },
      pdflince_extract: {
        title: "Estrai Pagine",
        badge: "Estrazione",
        description: "Estrae pagine specifiche o intervalli (es. '1-3, 5, 8') in un nuovo documento PDF.",
        paramDescriptions: {
          filePath: "Percorso del file PDF di origine.",
          outputPath: "Percorso di destinazione per il PDF estratto.",
          pages: "Intervallo di pagine in base 1 ('1-3, 5') o array di numeri.",
          preserveMetadata: "Conserva i metadati del documento originale (predefinito: true).",
        },
        promptExample: "Estrai le pagine 1-3 e la pagina 7 da contratto.pdf in riepilogo.pdf.",
      },
      pdflince_reorder: {
        title: "Riordina Pagine",
        badge: "Organizzazione",
        description: "Riordina le pagine di un PDF secondo una sequenza numerica in base 1.",
        paramDescriptions: {
          filePath: "Percorso del file PDF di origine.",
          outputPath: "Percorso di destinazione per il PDF riordinato.",
          pageOrder: "Sequenza di pagine in base 1 (es. [3, 1, 2]).",
          preserveMetadata: "Conserva i metadati del documento originale (predefinito: true).",
        },
        promptExample: "Riordina presentazione.pdf usando la sequenza di pagine [4, 1, 2, 3].",
      },
      pdflince_rotate: {
        title: "Ruota Pagine",
        badge: "Trasformazione",
        description: "Ruota tutte le pagine o quelle selezionate di 90, 180, 270, -90, -180 o -270 gradi.",
        paramDescriptions: {
          filePath: "Percorso del file PDF di origine.",
          outputPath: "Percorso di destinazione per il PDF ruotato.",
          rotationDegrees: "Angolo di rotazione (90, 180, 270, -90, -180, -270; predefinito: 90).",
          pages: "Pagine da ruotare ('all' o '1, 3-5'; predefinito: 'all').",
          preserveMetadata: "Conserva i metadati del documento originale (predefinito: true).",
        },
        promptExample: "Ruota la pagina 3 di scansione.pdf di 90 gradi in senso orario.",
      },
      pdflince_crop: {
        title: "Ritaglia Margini",
        badge: "Ritaglio",
        description: "Ritaglia i margini superiore, inferiore, sinistro e destro in punti tipografici (72 pt = 1 pollice).",
        paramDescriptions: {
          filePath: "Percorso del file PDF di origine.",
          outputPath: "Percorso di destinazione per il PDF ritagliato.",
          margins: "Valori dei margini { top, bottom, left, right } in punti.",
          pages: "Pagine da ritagliare ('all' o intervallo; predefinito: 'all').",
          preserveMetadata: "Conserva i metadati del documento originale (predefinito: true).",
        },
        promptExample: "Ritaglia 36pt da tutti e quattro i margini su tutte le pagine di slide.pdf.",
      },
      pdflince_compress: {
        title: "Comprimi PDF",
        badge: "Ottimizzazione",
        description:
          "Riduce le dimensioni del PDF usando i profili dell'interfaccia (low, medium, high), ridimensionamento immagini (150/72 DPI), compressione dei flussi e pulizia dei metadati.",
        paramDescriptions: {
          filePath: "Percorso del file PDF di origine.",
          outputPath: "Percorso di destinazione per il PDF compresso.",
          compressionLevel: "Profilo di compressione (predefinito: 'medium').",
          downscaleImages: "Ridimensiona e ricomprimi le immagini incorporate (true per medium/high).",
          downscaleImagesDpi: "DPI target per le immagini (150 per medium, 72 per high).",
          imageQuality: "Qualità JPEG tra 0.1 e 1.0 (predefinito: 0.82).",
          preserveMetadata: "Conserva i metadati (true per low/medium, false per high).",
          stripAnnotations: "Rimuove le annotazioni di pagina (true per high).",
        },
        promptExample: "Comprimi catalogo-pesante.pdf con livello high e salva in catalogo-compatto.pdf.",
      },
      pdflince_pdf_to_images: {
        title: "Da PDF a Immagini",
        badge: "Esportazione",
        description:
          "Renderizza tutte o alcune pagine di un PDF in immagini PNG o JPEG a DPI configurabili (72, 144, 300), con archivio ZIP opzionale.",
        paramDescriptions: {
          filePath: "Percorso del file PDF di origine.",
          outputDirectory: "Cartella in cui verranno salvate le immagini renderizzate.",
          format: "Formato immagine di output (predefinito: 'png').",
          quality: "Qualità JPEG tra 0.1 e 1.0 (predefinito: 0.9).",
          dpi: "Risoluzione di rendering in DPI (72, 144, 300; predefinito: 144).",
          pages: "Pagine da esportare ('all' o '1-3, 5'; predefinito: 'all').",
          bundleAsZip: "Genera anche un archivio .zip delle immagini esportate.",
          outputPrefix: "Prefisso personalizzato per i file esportati.",
        },
        promptExample: "Esporta le pagine 1-3 di brochure.pdf come file PNG a 300 DPI in ./pagine-esportate.",
      },
      pdflince_images_to_pdf: {
        title: "Da Immagini a PDF",
        badge: "Conversione",
        description:
          "Compila immagini locali (PNG, JPG, WebP, TIFF) in un documento PDF con adattamento, formato pagina, orientamento, margini e colore di sfondo configurabili.",
        paramDescriptions: {
          imagePaths: "Elenco ordinato dei percorsi immagine (PNG, JPG, WebP, TIFF).",
          outputPath: "Percorso di destinazione per il PDF generato.",
          imageFit: "Modalità di adattamento immagine (predefinito: 'contain').",
          pageSize: "Formato pagina (predefinito: 'auto').",
          pageOrientation: "Orientamento pagina (predefinito: 'auto').",
          pageMarginPoints: "Margine pagina in punti (predefinito: 18).",
          backgroundColor: "Colore di sfondo esadecimale (predefinito: '#ffffff').",
        },
        promptExample: "Converti scan1.png e scan2.webp in un PDF A4 verticale in ./scansioni.pdf.",
      },
    }),
  },
  faq: {
    title: "Domande Frequenti",
    entries: [
      {
        question: "Come funziona il server MCP offline?",
        answer:
          "Il binario `pdflince-mcp` viene eseguito come processo figlio locale avviato dal tuo host MCP (Claude Desktop, Cursor, Antigravity) e comunica tramite stdio JSON-RPC. Non apre porte di rete e non effettua richieste HTTP esterne.",
      },
      {
        question: "Quali sono i requisiti di esecuzione?",
        answer:
          "Node.js 18+ (consigliato Node 20+) o Bun. Non sono richiesti ambienti Python né chiavi API cloud.",
      },
      {
        question: "Funziona con gli LLM locali (Ollama, Nous Hermes, DeepSeek)?",
        answer:
          "Sì. Implementando lo standard aperto Model Context Protocol su stdio, è indipendente dal modello. Puoi usarlo con modelli locali (Nous Hermes 3, DeepSeek-R1/V3, Llama 3 tramite Ollama, LM Studio o vLLM) e modelli commerciali (Claude, Grok, GPT-4o).",
      },
      {
        question: "I file PDF originali vengono modificati?",
        answer:
          "No. Ogni operazione di scrittura richiede un `outputPath` o `outputDirectory` esplicito, lasciando intatti i file di origine.",
      },
    ],
  },
  cta: {
    title: "Esegui PDFLince MCP in Locale",
    description: "Elaborazione PDF senza cloud per il tuo IDE e i tuoi agenti IA in meno di un minuto.",
    command: "npx -y pdflince-mcp@latest",
    webAppLabel: "Apri Applicazione Web",
    webAppHref: "/it",
    githubLabel: "Vedi Codice su GitHub",
    githubHref: "https://github.com/GSiesto/pdflince",
  },
  ui: {
    copyPath: "Copia percorso",
    copiedPath: "Percorso copiato",
    copyJson: "Copia JSON",
    copiedJson: "Copiato",
    parametersHeading: "Parametri",
    paramName: "Nome",
    paramType: "Tipo",
    paramRequired: "Obbligatorio",
    paramDescription: "Descrizione",
    yes: "Sì",
    no: "No",
    promptExampleHeading: "Esempio di Prompt",
    copyPrompt: "Copia prompt",
    copiedPrompt: "Copiato",
    clickToCopy: "Clicca per copiare",
    copyCommandPrefix: "Copia",
    commandCopied: "Comando copiato",
    directCliLabel: "Esecuzione diretta CLI / stdio:",
  },
};

export const mcpMetadataIt: McpMetadataStrings = {
  title: "Server MCP di PDFLince | Strumenti PDF Locali per Agenti IA",
  description:
    "Server Model Context Protocol (MCP) open-source e 100% locale per Claude Desktop, Cursor, Antigravity, Windsurf e Ollama. Ispeziona, comprimi, unisci, dividi e converti PDF senza cloud.",
  keywords: [
    "mcp",
    "model context protocol",
    "pdflince mcp",
    "server mcp pdf",
    "claude desktop pdf",
    "cursor mcp pdf",
    "antigravity mcp",
    "windsurf mcp",
    "ollama mcp pdf",
  ],
  canonical: `${siteUrl}/it/mcp`,
};

// ============================================================================
// 7. ROMANIAN (ro)
// ============================================================================
export const mcpPageRo: McpPageStrings = {
  hero: {
    eyebrow: "Model Context Protocol • Server Local Stdio",
    title: "Serverul MCP PDFLince",
    subtitle:
      "Conectează Claude Desktop, Cursor, Antigravity, Windsurf sau VS Code la un motor PDF local, fără cloud. Inspectează, unește, împarte, extrage, reordonează, rotește, decupează, comprimă și convertește fișiere PDF direct pe sistemul tău de fișiere.",
    installCommand: "npx -y pdflince-mcp@latest",
    copyLabel: "Copiază comanda",
    copiedLabel: "Copiat",
    stats: [
      { value: "10", label: "Instrumente MCP" },
      { value: "0", label: "Cereri externe" },
      { value: "100%", label: "Execuție locală" },
      { value: "< 30ms", label: "Latență tipică" },
    ],
  },
  privacyNotice: {
    title: "Arhitectură de Securitate Locală",
    description:
      "Clienții AI comunică cu PDFLince prin intrare/ieșire standard (stdio JSON-RPC) conform specificației deschise Model Context Protocol. Octeții documentelor rămân în memoria locală și nu părăsesc niciodată dispozitivul tău.",
    points: [
      "Zero trafic de rețea sau telemetrie: toate operațiunile rulează într-un proces local Node.js sau Bun.",
      "Proiectat pentru fluxuri de lucru reglementate și guvernanță strictă a datelor (GDPR, HIPAA, SOC 2).",
      "Procesare nedistructivă: instrumentele scriu în căi de ieșire explicite fără a modifica fișierele sursă.",
    ],
  },
  features: {
    title: "Proiectat pentru Fluxuri Documentare cu Agenți AI",
    subtitle: "Operațiuni PDF deterministe pentru dezvoltatori, cercetători și fluxuri automatizate.",
    cards: [
      {
        icon: "shield",
        title: "Suveranitatea Datelor",
        description:
          "Procesează contracte, rapoarte financiare, dosare medicale și documente interne local, fără a expune fișierele unor API-uri terțe.",
      },
      {
        icon: "zap",
        title: "Execuție Nativă în Memorie",
        description:
          "Bazat pe pdf-lib și procesare nativă de imagini pe Node.js și Bun. Operațiunile se finalizează în milisecunde fără încărcare în cloud.",
      },
      {
        icon: "blocks",
        title: "Compatibilitate Universală",
        description:
          "Funcționează cu Claude Desktop, Cursor, Antigravity, Windsurf, Cline, Roo Code, Zed și Open WebUI — cu Claude, Grok, GPT-4o sau modele locale prin Ollama (Nous Hermes, DeepSeek).",
      },
      {
        icon: "layers",
        title: "Paritate Completă cu Interfața Web",
        description:
          "Expune toate cele 9 operațiuni din aplicația web PDFLince — unire, comprimare, împărțire, extragere, reordonare, rotire, decupare, PDF în imagini și imagini în PDF — plus inspecție detaliată.",
      },
      {
        icon: "file-check",
        title: "Gestionare Deterministă a Metadatelor",
        description:
          "Citește anteturile brute fără a modifica câmpurile existente și păstrează metadatele originale la generarea fișierelor noi.",
      },
      {
        icon: "package",
        title: "Configurare printr-o Singură Comandă",
        description:
          "Rulează direct prin `npx -y pdflince-mcp@latest` cu Node.js 18+ sau Bun, fără medii Python sau containere Docker.",
      },
    ],
  },
  clients: {
    title: "Configurarea Clientului",
    subtitle: "Adaugă definiția serverului în fișierul de configurare al clientului tău MCP.",
    tabs: buildClientTabs({
      claude: "Înregistrează PDFLince în Claude Desktop pentru a inspecta și transforma PDF-uri locale în timpul conversațiilor.",
      cursor: "Permite agenților Cursor să inspecteze și să proceseze fișiere PDF direct în spațiul de lucru al proiectului.",
      antigravity: "Configurează PDFLince ca server MCP local în Google Antigravity IDE.",
      windsurf: "Permite-i lui Cascade să inspecteze, să împartă, să comprime și să convertească PDF-uri în sesiunile locale.",
      vscode: "Integrează PDFLince cu agenții autonomi de programare în Visual Studio Code.",
    }),
  },
  tools: {
    title: "Referință Instrumente",
    subtitle: "Zece instrumente MCP structurate care reflectă fiecare operațiune și opțiune din interfața PDFLince.",
    items: buildToolsList({
      pdflince_inspect: {
        title: "Inspectează PDF",
        badge: "Citire",
        description:
          "Citește un PDF local fără a-l modifica. Returnează numărul total de pagini, dimensiunile fiecărei pagini, rotația, orientarea și metadatele.",
        paramDescriptions: {
          filePath: "Calea absolută sau relativă către fișierul PDF local.",
        },
        promptExample: "Inspectează raport-financiar.pdf și returnează numărul de pagini, dimensiunile și autorul.",
      },
      pdflince_merge: {
        title: "Unește PDF-uri",
        badge: "Compunere",
        description:
          "Combină două sau mai multe fișiere PDF în ordine secvențială, cu pagini separatoare albe opționale și metadate personalizate.",
        paramDescriptions: {
          filePaths: "Lista ordonată a căilor PDF de unit (minimum 2).",
          outputPath: "Calea de destinație pentru PDF-ul rezultat.",
          addPageDividers: "Inserează o pagină albă între documentele unite.",
          metadata: "Metadate personalizate ({ title, author, subject, keywords }).",
        },
        promptExample: "Unește partea1.pdf și partea2.pdf în ghid-complet.pdf cu pagini separatoare albe.",
      },
      pdflince_split: {
        title: "Împarte PDF",
        badge: "Împărțire",
        description: "Împarte un PDF în mai multe documente a câte N pagini fiecare, cu arhivare ZIP opțională.",
        paramDescriptions: {
          filePath: "Calea către fișierul PDF sursă.",
          outputDirectory: "Directorul în care vor fi salvate fișierele PDF împărțite.",
          pagesPerFile: "Pagini per fișier generat (implicit: 1).",
          outputPrefix: "Prefix personalizat pentru numele fișierelor generate.",
          preserveMetadata: "Păstrează metadatele documentului sursă (implicit: true).",
          bundleAsZip: "Împachetează de asemenea toate fișierele rezultate într-o arhivă .zip.",
        },
        promptExample: "Împarte documentatie.pdf în fișiere de câte 4 pagini în ./module și creează o arhivă ZIP.",
      },
      pdflince_extract: {
        title: "Extrage Pagini",
        badge: "Extragere",
        description: "Extrage pagini specifice sau intervale (ex. '1-3, 5, 8') într-un document PDF nou.",
        paramDescriptions: {
          filePath: "Calea către fișierul PDF sursă.",
          outputPath: "Calea de destinație pentru PDF-ul extras.",
          pages: "Interval de pagini indexat de la 1 ('1-3, 5') sau vector de numere.",
          preserveMetadata: "Păstrează metadatele documentului sursă (implicit: true).",
        },
        promptExample: "Extrage paginile 1-3 și pagina 7 din contract.pdf în rezumat.pdf.",
      },
      pdflince_reorder: {
        title: "Reordonează Pagini",
        badge: "Organizare",
        description: "Rearanjează paginile unui PDF conform unei secvențe numerice indexate de la 1.",
        paramDescriptions: {
          filePath: "Calea către fișierul PDF sursă.",
          outputPath: "Calea de destinație pentru PDF-ul reordonat.",
          pageOrder: "Vector cu ordinea paginilor indexat de la 1 (ex. [3, 1, 2]).",
          preserveMetadata: "Păstrează metadatele documentului sursă (implicit: true).",
        },
        promptExample: "Reordonează prezentare.pdf folosind secvența de pagini [4, 1, 2, 3].",
      },
      pdflince_rotate: {
        title: "Rotește Pagini",
        badge: "Transformare",
        description: "Rotește toate paginile sau paginile selectate cu 90, 180, 270, -90, -180 sau -270 de grade.",
        paramDescriptions: {
          filePath: "Calea către fișierul PDF sursă.",
          outputPath: "Calea de destinație pentru PDF-ul rotit.",
          rotationDegrees: "Unghiul de rotație (90, 180, 270, -90, -180, -270; implicit: 90).",
          pages: "Paginile țintă ('all' sau '1, 3-5'; implicit: 'all').",
          preserveMetadata: "Păstrează metadatele documentului sursă (implicit: true).",
        },
        promptExample: "Rotește pagina 3 din scanare.pdf cu 90 de grade în sensul acelor de ceasornic.",
      },
      pdflince_crop: {
        title: "Decupează Margini",
        badge: "Decupare",
        description: "Decupează marginile de sus, jos, stânga și dreapta în puncte tipografice (72 pt = 1 inch).",
        paramDescriptions: {
          filePath: "Calea către fișierul PDF sursă.",
          outputPath: "Calea de destinație pentru PDF-ul decupat.",
          margins: "Valorile marginilor { top, bottom, left, right } în puncte.",
          pages: "Paginile țintă ('all' sau interval; implicit: 'all').",
          preserveMetadata: "Păstrează metadatele documentului sursă (implicit: true).",
        },
        promptExample: "Decupează 36pt din toate cele patru margini pe toate paginile din suport.pdf.",
      },
      pdflince_compress: {
        title: "Comprimă PDF",
        badge: "Optimizare",
        description:
          "Reduce dimensiunea PDF-ului folosind profilurile din interfața web (low, medium, high), redimensionarea imaginilor (150/72 DPI), comprimarea fluxurilor și curățarea metadatelor.",
        paramDescriptions: {
          filePath: "Calea către fișierul PDF sursă.",
          outputPath: "Calea de destinație pentru PDF-ul comprimat.",
          compressionLevel: "Profilul de comprimare (implicit: 'medium').",
          downscaleImages: "Redimensionează și recomprimă imaginile încorporate (true pentru medium/high).",
          downscaleImagesDpi: "DPI țintă pentru imagini (150 pentru medium, 72 pentru high).",
          imageQuality: "Calitatea JPEG între 0.1 și 1.0 (implicit: 0.82).",
          preserveMetadata: "Păstrează metadatele (true pentru low/medium, false pentru high).",
          stripAnnotations: "Elimină adnotările paginilor (true pentru high).",
        },
        promptExample: "Comprimă catalog-mare.pdf folosind nivelul high și salvează în catalog-compact.pdf.",
      },
      pdflince_pdf_to_images: {
        title: "PDF în Imagini",
        badge: "Export",
        description:
          "Randează toate paginile sau paginile selectate în imagini PNG sau JPEG la DPI configurabil (72, 144, 300), cu arhivă ZIP opțională.",
        paramDescriptions: {
          filePath: "Calea către fișierul PDF sursă.",
          outputDirectory: "Directorul în care vor fi salvate imaginile randate.",
          format: "Formatul imaginilor de ieșire (implicit: 'png').",
          quality: "Calitatea JPEG între 0.1 și 1.0 (implicit: 0.9).",
          dpi: "Rezoluția de randare în DPI (72, 144, 300; implicit: 144).",
          pages: "Paginile de randat ('all' sau '1-3, 5'; implicit: 'all').",
          bundleAsZip: "Generează și o arhivă .zip cu imaginile exportate.",
          outputPrefix: "Prefix personalizat pentru fișierele exportate.",
        },
        promptExample: "Randează paginile 1-3 din brosura.pdf ca fișiere PNG la 300 DPI în ./pagini-exportate.",
      },
      pdflince_images_to_pdf: {
        title: "Imagini în PDF",
        badge: "Conversie",
        description:
          "Compilează imagini locale (PNG, JPG, WebP, TIFF) într-un document PDF cu încadrare, format de pagină, orientare, margini și culoare de fundal configurabile.",
        paramDescriptions: {
          imagePaths: "Lista ordonată a căilor imaginilor (PNG, JPG, WebP, TIFF).",
          outputPath: "Calea de destinație pentru PDF-ul generat.",
          imageFit: "Modul de încadrare a imaginii (implicit: 'contain').",
          pageSize: "Dimensiunea paginii (implicit: 'auto').",
          pageOrientation: "Orientarea paginii (implicit: 'auto').",
          pageMarginPoints: "Marginea paginii în puncte (implicit: 18).",
          backgroundColor: "Culoarea de fundal în format hex (implicit: '#ffffff').",
        },
        promptExample: "Convertește scan1.png și scan2.webp într-un PDF A4 portret la ./scanari.pdf.",
      },
    }),
  },
  faq: {
    title: "Întrebări Frecvente",
    entries: [
      {
        question: "Cum funcționează serverul MCP offline?",
        answer:
          "Binarul `pdflince-mcp` rulează ca un subproces local pornit de gazda ta MCP (Claude Desktop, Cursor, Antigravity) și comunică prin stdio JSON-RPC. Nu deschide porturi de rețea și nu efectuează cereri HTTP externe.",
      },
      {
        question: "Care sunt cerințele de rulare?",
        answer:
          "Node.js 18+ (recomandat Node 20+) sau Bun. Nu sunt necesare medii Python sau chei API în cloud.",
      },
      {
        question: "Funcționează cu modele LLM locale (Ollama, Nous Hermes, DeepSeek)?",
        answer:
          "Da. Deoarece implementează standardul deschis Model Context Protocol peste stdio, este independent de model. Îl poți folosi cu modele locale (Nous Hermes 3, DeepSeek-R1/V3, Llama 3 prin Ollama, LM Studio sau vLLM), precum și cu Claude, Grok sau GPT-4o.",
      },
      {
        question: "Sunt modificate fișierele PDF originale?",
        answer:
          "Nu. Fiecare operațiune de scriere necesită un `outputPath` sau `outputDirectory` explicit, lăsând fișierele sursă intacte.",
      },
    ],
  },
  cta: {
    title: "Rulează PDFLince MCP Local",
    description: "Procesare PDF fără cloud pentru IDE-ul tău și agenții AI în mai puțin de un minut.",
    command: "npx -y pdflince-mcp@latest",
    webAppLabel: "Deschide Aplicația Web",
    webAppHref: "/ro",
    githubLabel: "Vezi Codul pe GitHub",
    githubHref: "https://github.com/GSiesto/pdflince",
  },
  ui: {
    copyPath: "Copiază calea",
    copiedPath: "Cale copiată",
    copyJson: "Copiază JSON",
    copiedJson: "Copiat",
    parametersHeading: "Parametri",
    paramName: "Nume",
    paramType: "Tip",
    paramRequired: "Obligatoriu",
    paramDescription: "Descriere",
    yes: "Da",
    no: "Nu",
    promptExampleHeading: "Exemplu de Prompt",
    copyPrompt: "Copiază promptul",
    copiedPrompt: "Copiat",
    clickToCopy: "Clic pentru copiere",
    copyCommandPrefix: "Copiază",
    commandCopied: "Comandă copiată",
    directCliLabel: "Rulare directă CLI / stdio:",
  },
};

export const mcpMetadataRo: McpMetadataStrings = {
  title: "Server MCP PDFLince | Instrumente PDF Locale pentru Agenți AI",
  description:
    "Server Model Context Protocol (MCP) open-source și 100% local pentru Claude Desktop, Cursor, Antigravity, Windsurf și Ollama. Inspectează, comprimă, unește, împarte și convertește PDF-uri fără cloud.",
  keywords: [
    "mcp",
    "model context protocol",
    "pdflince mcp",
    "server mcp pdf",
    "claude desktop pdf",
    "cursor mcp pdf",
    "antigravity mcp",
    "windsurf mcp",
    "ollama mcp pdf",
  ],
  canonical: `${siteUrl}/ro/mcp`,
};

// ============================================================================
// 8. HUNGARIAN (hu)
// ============================================================================
export const mcpPageHu: McpPageStrings = {
  hero: {
    eyebrow: "Model Context Protocol • Helyi Stdio Szerver",
    title: "PDFLince MCP Szerver",
    subtitle:
      "Csatlakoztassa a Claude Desktop, Cursor, Antigravity, Windsurf vagy VS Code környezetet egy helyi, felhőmentes PDF-motorhoz. PDF-ek vizsgálata, összefűzése, szétbontása, kinyerése, átrendezése, forgatása, körbevágása, tömörítése és konvertálása közvetlenül a fájlrendszeren.",
    installCommand: "npx -y pdflince-mcp@latest",
    copyLabel: "Parancs másolása",
    copiedLabel: "Másolva",
    stats: [
      { value: "10", label: "MCP eszköz" },
      { value: "0", label: "Külső kérés" },
      { value: "100%", label: "Helyi futtatás" },
      { value: "< 30ms", label: "Tipikus késleltetés" },
    ],
  },
  privacyNotice: {
    title: "Helyi Biztonsági Architektúra",
    description:
      "Az AI-kliensek szabványos bemeneten/kimeneten (stdio JSON-RPC) keresztül kommunikálnak a PDFLince-szel a nyílt Model Context Protocol specifikáció alapján. A dokumentumok bájtjai a helyi memóriában maradnak, és soha nem hagyják el a számítógépét.",
    points: [
      "Nulla hálózati forgalom vagy telemetria: minden művelet helyi Node.js vagy Bun folyamatban fut.",
      "Szabályozott munkafolyamatokhoz és szigorú adatvédelmi előírásokhoz (GDPR, HIPAA, SOC 2) tervezve.",
      "Roncsolásmentes fájlkezelés: az eszközök külön kimeneti útvonalakra írnak, az eredeti fájlok módosítása nélkül.",
    ],
  },
  features: {
    title: "Ágensalapú Dokumentum-munkafolyamatokhoz Tervezve",
    subtitle: "Determinisztikus PDF-műveletek szoftvermérnököknek, kutatóknak és automatizált folyamatokhoz.",
    cards: [
      {
        icon: "shield",
        title: "Teljes Adatszuverenitás",
        description:
          "Dolgozzon fel szerződéseket, pénzügyi kimutatásokat, orvosi leleteket és belső dokumentumokat helyben, külső API-k igénybevétele nélkül.",
      },
      {
        icon: "zap",
        title: "Natív Memóriabeli Végrehajtás",
        description:
          "A pdf-lib és natív képfeldolgozó motorok erejével Node.js és Bun alatt. A műveletek ezredmásodpercek alatt, feltöltési várakozás nélkül lefutnak.",
      },
      {
        icon: "blocks",
        title: "Univerzális Kliens- és Modelltámogatás",
        description:
          "Működik Claude Desktop, Cursor, Antigravity, Windsurf, Cline, Roo Code, Zed és Open WebUI környezetekkel — Claude, Grok, GPT-4o vagy helyi Ollama modellekkel (Nous Hermes, DeepSeek) egyaránt.",
      },
      {
        icon: "layers",
        title: "Teljes Funkcionális Egyezés a Webes Felülettel",
        description:
          "Tartalmazza a PDFLince webalkalmazás mind a 9 műveletét — összefűzés, tömörítés, szétbontás, kinyerés, átrendezés, forgatás, körbevágás, PDF képekké és képek PDF-fé — valamint a részletes dokumentumvizsgálatot.",
      },
      {
        icon: "file-check",
        title: "Determinisztikus Metaadat-kezelés",
        description:
          "Módosítás nélkül olvassa a dokumentumfejléceket, és új fájlok létrehozásakor megőrzi az eredeti szerzői metaadatokat.",
      },
      {
        icon: "package",
        title: "Egyparancsos Beállítás",
        description:
          "Futtatható közvetlenül az `npx -y pdflince-mcp@latest` paranccsal Node.js 18+ vagy Bun alatt, Python vagy Docker nélkül.",
      },
    ],
  },
  clients: {
    title: "Kliens Konfiguráció",
    subtitle: "Adja hozzá a szerverdefiníciót az MCP-kliens konfigurációs fájljához.",
    tabs: buildClientTabs({
      claude: "Regisztrálja a PDFLince-t a Claude Desktopban helyi PDF-ek vizsgálatához és átalakításához.",
      cursor: "Tegye lehetővé a Cursor ágensek számára a PDF-fájlok közvetlen feldolgozását a projekt munkaterületén.",
      antigravity: "Állítsa be a PDFLince-t helyi MCP-szerverként a Google Antigravity IDE-ben.",
      windsurf: "Engedélyezze a Cascade számára a PDF-ek vizsgálatát, szétbontását, tömörítését és konvertálását.",
      vscode: "Integrálja a PDFLince-t a Visual Studio Code autonóm kódoló ágenseivel.",
    }),
  },
  tools: {
    title: "Eszközreferencia",
    subtitle: "Tíz strukturált MCP-eszköz, amely lefedi a PDFLince felületének minden műveletét és beállítását.",
    items: buildToolsList({
      pdflince_inspect: {
        title: "PDF vizsgálata",
        badge: "Olvasás",
        description:
          "Beolvas egy helyi PDF-et módosítás nélkül. Visszaadja az oldalszámot, az oldalankénti méreteket, a forgatást, a tájolást és a metaadatokat.",
        paramDescriptions: {
          filePath: "A helyi PDF-fájl abszolút vagy relatív elérési útja.",
        },
        promptExample: "Vizsgáld meg a penzugyi-jelentes.pdf fájlt, és add meg az oldalszámot, a méreteket és a szerzőt.",
      },
      pdflince_merge: {
        title: "PDF-ek összefűzése",
        badge: "Összeállítás",
        description:
          "Két vagy több PDF-fájlt fűz össze sorrendben, opcionális üres elválasztó oldalakkal és egyéni metaadatokkal.",
        paramDescriptions: {
          filePaths: "Az összefűzendő PDF-fájlok rendezett elérési útjai (minimum 2).",
          outputPath: "Az összefűzött PDF mentési útvonala.",
          addPageDividers: "Üres elválasztó oldal beszúrása a dokumentumok közé.",
          metadata: "Egyéni metaadatok ({ title, author, subject, keywords }).",
        },
        promptExample: "Fűzd össze az 1-resz.pdf és 2-resz.pdf fájlokat a teljes-utmutato.pdf fájlba elválasztó oldalakkal.",
      },
      pdflince_split: {
        title: "PDF szétbontása",
        badge: "Szétbontás",
        description: "Egy PDF-et több, egyenként N oldalas dokumentumra bont szét, opcionális ZIP-csomagolással.",
        paramDescriptions: {
          filePath: "A forrás PDF-fájl elérési útja.",
          outputDirectory: "A célmappa, ahová a szétbontott PDF-fájlok kerülnek.",
          pagesPerFile: "Oldalak száma kimeneti fájlonként (alapértelmezett: 1).",
          outputPrefix: "Egyéni fájlnév-előtag a létrehozott fájlokhoz.",
          preserveMetadata: "A forrásdokumentum metaadatainak megőrzése (alapértelmezett: true).",
          bundleAsZip: "Az összes szétbontott fájl becsomagolása egy .zip archívumba is.",
        },
        promptExample: "Bontsd szét a dokumentacio.pdf fájlt 4 oldalas részekre a ./modulok mappába, és készíts ZIP-et.",
      },
      pdflince_extract: {
        title: "Oldalak kinyerése",
        badge: "Kinyerés",
        description: "Megadott oldalakat vagy tartományokat (pl. '1-3, 5, 8') nyer ki egy új PDF-dokumentumba.",
        paramDescriptions: {
          filePath: "A forrás PDF-fájl elérési útja.",
          outputPath: "A kinyert PDF mentési útvonala.",
          pages: "1-től indexelt oldaltartomány ('1-3, 5') vagy számtömb.",
          preserveMetadata: "A forrásdokumentum metaadatainak megőrzése (alapértelmezett: true).",
        },
        promptExample: "Nyerd ki az 1-3. és a 7. oldalt a szerzodes.pdf fájlból az osszefoglalo.pdf fájlba.",
      },
      pdflince_reorder: {
        title: "Oldalak átrendezése",
        badge: "Rendezés",
        description: "Átrendezi a PDF oldalait egy 1-től indexelt számsorrend alapján.",
        paramDescriptions: {
          filePath: "A forrás PDF-fájl elérési útja.",
          outputPath: "Az átrendezett PDF mentési útvonala.",
          pageOrder: "1-től indexelt oldalsorrend-tömb (pl. [3, 1, 2]).",
          preserveMetadata: "A forrásdokumentum metaadatainak megőrzése (alapértelmezett: true).",
        },
        promptExample: "Rendezd át a prezentacio.pdf oldalait a [4, 1, 2, 3] sorrend szerint.",
      },
      pdflince_rotate: {
        title: "Oldalak forgatása",
        badge: "Transzformáció",
        description: "Az összes vagy a kijelölt oldalakat 90, 180, 270, -90, -180 vagy -270 fokkal elforgatja.",
        paramDescriptions: {
          filePath: "A forrás PDF-fájl elérési útja.",
          outputPath: "Az elforgatott PDF mentési útvonala.",
          rotationDegrees: "Forgatási szög (90, 180, 270, -90, -180, -270; alapértelmezett: 90).",
          pages: "Céloldalak ('all' vagy '1, 3-5'; alapértelmezett: 'all').",
          preserveMetadata: "A forrásdokumentum metaadatainak megőrzése (alapértelmezett: true).",
        },
        promptExample: "Forgasd el a szkennelt.pdf 3. oldalát 90 fokkal az óramutató járásával megegyezően.",
      },
      pdflince_crop: {
        title: "Margók körbevágása",
        badge: "Körbevágás",
        description: "Levágja a felső, alsó, bal és jobb margót tipográfiai pontban (72 pt = 1 hüvelyk).",
        paramDescriptions: {
          filePath: "A forrás PDF-fájl elérési útja.",
          outputPath: "A körbevágott PDF mentési útvonala.",
          margins: "Margóértékek { top, bottom, left, right } pontban.",
          pages: "Céloldalak ('all' vagy tartomány; alapértelmezett: 'all').",
          preserveMetadata: "A forrásdokumentum metaadatainak megőrzése (alapértelmezett: true).",
        },
        promptExample: "Vágj le 36 pontot mind a négy margóból az eloadas.pdf összes oldalán.",
      },
      pdflince_compress: {
        title: "PDF tömörítése",
        badge: "Optimalizálás",
        description:
          "Csökkenti a PDF fájlméretét a webes profilokkal (low, medium, high), a beágyazott képek átméretezésével (150/72 DPI), folyam-tömörítéssel és metaadat-tisztítással.",
        paramDescriptions: {
          filePath: "A forrás PDF-fájl elérési útja.",
          outputPath: "A tömörített PDF mentési útvonala.",
          compressionLevel: "Tömörítési profil (alapértelmezett: 'medium').",
          downscaleImages: "Beágyazott képek átméretezése és újratömörítése (medium/high esetén true).",
          downscaleImagesDpi: "Cél képfelbontás DPI-ben (medium: 150, high: 72).",
          imageQuality: "JPEG-minőség 0.1 és 1.0 között (alapértelmezett: 0.82).",
          preserveMetadata: "Metaadatok megőrzése (low/medium: true, high: false).",
          stripAnnotations: "Oldaljegyzetek eltávolítása (high esetén true).",
        },
        promptExample: "Tömörítsd a nagy-kezikonyv.pdf fájlt high szinten, és mentsd kezikonyv-kompakt.pdf néven.",
      },
      pdflince_pdf_to_images: {
        title: "PDF képekké",
        badge: "Exportálás",
        description:
          "A PDF összes vagy kijelölt oldalát PNG vagy JPEG képekké rendereli választható DPI-vel (72, 144, 300), opcionális ZIP-archívummal.",
        paramDescriptions: {
          filePath: "A forrás PDF-fájl elérési útja.",
          outputDirectory: "A mappa, ahová a renderelt képek kerülnek.",
          format: "Kimeneti képformátum (alapértelmezett: 'png').",
          quality: "JPEG-minőség 0.1 és 1.0 között (alapértelmezett: 0.9).",
          dpi: "Renderelési felbontás DPI-ben (72, 144, 300; alapértelmezett: 144).",
          pages: "Renderelendő oldalak ('all' vagy '1-3, 5'; alapértelmezett: 'all').",
          bundleAsZip: "Az exportált képek becsomagolása .zip archívumba is.",
          outputPrefix: "Egyéni fájlnév-előtag az exportált képekhez.",
        },
        promptExample: "Rendereld a prospektus.pdf 1-3. oldalát 300 DPI-s PNG-ként az ./exportalt-oldalak mappába.",
      },
      pdflince_images_to_pdf: {
        title: "Képek PDF-fé",
        badge: "Konvertálás",
        description:
          "Helyi képeket (PNG, JPG, WebP, TIFF) fűz össze formázott PDF-dokumentummá, testreszabható illesztéssel, oldalmérettel, tájolással, margókkal és háttérszínnel.",
        paramDescriptions: {
          imagePaths: "A képfájlok rendezett elérési útjai (PNG, JPG, WebP, TIFF).",
          outputPath: "A létrehozott PDF mentési útvonala.",
          imageFit: "Képillesztési mód (alapértelmezett: 'contain').",
          pageSize: "Oldalméret (alapértelmezett: 'auto').",
          pageOrientation: "Oldaltájolás (alapértelmezett: 'auto').",
          pageMarginPoints: "Oldalmargó pontban (alapértelmezett: 18).",
          backgroundColor: "Háttérszín hexadecimális kódban (alapértelmezett: '#ffffff').",
        },
        promptExample: "Alakítsd át a scan1.png és scan2.webp képeket álló A4-es PDF-fé a ./szkennelesek.pdf fájlba.",
      },
    }),
  },
  faq: {
    title: "Gyakran Ismételt Kérdések",
    entries: [
      {
        question: "Hogyan működik az MCP-szerver internetkapcsolat nélkül?",
        answer:
          "A `pdflince-mcp` bináris az MCP-kliens (Claude Desktop, Cursor, Antigravity) által indított helyi gyermekfolyamatként fut, és stdio JSON-RPC-n keresztül kommunikál. Nem nyit hálózati portokat, és nem végez külső HTTP-kéréseket.",
      },
      {
        question: "Mik a futtatási követelmények?",
        answer:
          "Node.js 18+ (Node 20+ ajánlott) vagy Bun. Nincs szükség Python-környezetre vagy felhőalapú API-kulcsokra.",
      },
      {
        question: "Működik helyi LLM-modellekkel (Ollama, Nous Hermes, DeepSeek)?",
        answer:
          "Igen. Mivel a PDFLince a szabványos stdio Model Context Protocolt valósítja meg, modellfüggetlen. Használható helyi modellekkel (Nous Hermes 3, DeepSeek-R1/V3, Llama 3 Ollamán, LM Studión vagy vLLM-en keresztül) és kereskedelmi modellekkel (Claude, Grok, GPT-4o) is.",
      },
      {
        question: "Módosulnak az eredeti PDF-fájlok?",
        answer:
          "Nem. Minden írási művelet külön `outputPath` vagy `outputDirectory` megadását igényli, így a forrásfájlok érintetlenek maradnak.",
      },
    ],
  },
  cta: {
    title: "Futtassa a PDFLince MCP-t Helyben",
    description: "Felhőmentes PDF-feldolgozás az IDE-hez és AI-ágensekhez kevesebb mint egy perc alatt.",
    command: "npx -y pdflince-mcp@latest",
    webAppLabel: "Webalkalmazás Megnyitása",
    webAppHref: "/hu",
    githubLabel: "Forráskód a GitHubon",
    githubHref: "https://github.com/GSiesto/pdflince",
  },
  ui: {
    copyPath: "Útvonal másolása",
    copiedPath: "Útvonal másolva",
    copyJson: "JSON másolása",
    copiedJson: "Másolva",
    parametersHeading: "Paraméterek",
    paramName: "Név",
    paramType: "Típus",
    paramRequired: "Kötelező",
    paramDescription: "Leírás",
    yes: "Igen",
    no: "Nem",
    promptExampleHeading: "Példa Prompt",
    copyPrompt: "Prompt másolása",
    copiedPrompt: "Másolva",
    clickToCopy: "Kattintson a másoláshoz",
    copyCommandPrefix: "Másolás",
    commandCopied: "Parancs másolva",
    directCliLabel: "Közvetlen CLI / stdio indítás:",
  },
};

export const mcpMetadataHu: McpMetadataStrings = {
  title: "PDFLince MCP Szerver | Helyi PDF Eszközök AI Ágensekhez",
  description:
    "Nyílt forráskódú, 100%-ban helyi Model Context Protocol (MCP) szerver Claude Desktop, Cursor, Antigravity, Windsurf és Ollama ágensekhez. PDF-ek vizsgálata, tömörítése, összefűzése, szétbontása és konvertálása felhő nélkül.",
  keywords: [
    "mcp",
    "model context protocol",
    "pdflince mcp",
    "mcp pdf szerver",
    "claude desktop pdf",
    "cursor mcp pdf",
    "antigravity mcp",
    "windsurf mcp",
    "ollama mcp pdf",
  ],
  canonical: `${siteUrl}/hu/mcp`,
};

// ============================================================================
// 9. RUSSIAN (ru)
// ============================================================================
export const mcpPageRu: McpPageStrings = {
  hero: {
    eyebrow: "Model Context Protocol • Локальный Stdio-сервер",
    title: "MCP-сервер PDFLince",
    subtitle:
      "Подключите Claude Desktop, Cursor, Antigravity, Windsurf или VS Code к локальному PDF-движку без облака. Проверяйте, объединяйте, разделяйте, извлекайте, меняйте порядок, поворачивайте, обрезайте, сжимайте и конвертируйте PDF прямо в вашей файловой системе.",
    installCommand: "npx -y pdflince-mcp@latest",
    copyLabel: "Копировать команду",
    copiedLabel: "Скопировано",
    stats: [
      { value: "10", label: "Инструментов MCP" },
      { value: "0", label: "Внешних запросов" },
      { value: "100%", label: "Локальная работа" },
      { value: "< 30ms", label: "Типичная задержка" },
    ],
  },
  privacyNotice: {
    title: "Локальная Архитектура Безопасности",
    description:
      "ИИ-клиенты взаимодействуют с PDFLince через стандартный ввод/вывод (stdio JSON-RPC) по открытой спецификации Model Context Protocol. Байты документов остаются в оперативной памяти и никогда не покидают ваш компьютер.",
    points: [
      "Никакого сетевого трафика и телеметрии: все операции выполняются внутри локального процесса Node.js или Bun.",
      "Разработано для защищённых контуров и строгих требований к конфиденциальности (GDPR, HIPAA, SOC 2).",
      "Безопасная работа с файлами: инструменты записывают результат в явно указанный путь, не изменяя исходные файлы.",
    ],
  },
  features: {
    title: "Создано для Агентных Документооборотов",
    subtitle: "Детерминированные операции с PDF для разработчиков, исследователей и автоматизированных пайплайнов.",
    cards: [
      {
        icon: "shield",
        title: "Полный Суверенитет Данных",
        description:
          "Обрабатывайте договоры, финансовую отчётность, медицинские карты и внутреннюю документацию локально, не передавая файлы сторонним API.",
      },
      {
        icon: "zap",
        title: "Нативное Выполнение в Памяти",
        description:
          "На базе pdf-lib и нативных конвейеров обработки изображений в Node.js и Bun. Операции выполняются за миллисекунды без загрузки в сеть.",
      },
      {
        icon: "blocks",
        title: "Универсальная Поддержка Клиентов и Моделей",
        description:
          "Работает с Claude Desktop, Cursor, Antigravity, Windsurf, Cline, Roo Code, Zed и Open WebUI — как с Claude, Grok и GPT-4o, так и с локальными моделями через Ollama (Nous Hermes, DeepSeek).",
      },
      {
        icon: "layers",
        title: "Полное Соответствие Веб-версии",
        description:
          "Включает все 9 операций веб-приложения PDFLince — объединение, сжатие, разделение, извлечение, сортировку, поворот, обрезку, PDF в изображения и изображения в PDF — плюс инспекцию документа.",
      },
      {
        icon: "file-check",
        title: "Бережная Работа с Метаданными",
        description:
          "Читает исходные заголовки без перезаписи полей и сохраняет авторские метаданные при создании новых документов.",
      },
      {
        icon: "package",
        title: "Запуск Одной Командой",
        description:
          "Прямой запуск через `npx -y pdflince-mcp@latest` с Node.js 18+ или Bun. Без окружений Python и контейнеров Docker.",
      },
    ],
  },
  clients: {
    title: "Настройка Клиента",
    subtitle: "Добавьте описание сервера в конфигурационный файл вашего MCP-клиента.",
    tabs: buildClientTabs({
      claude: "Подключите PDFLince в Claude Desktop для анализа и обработки локальных PDF прямо в диалоге.",
      cursor: "Позвольте агентам Cursor проверять и обрабатывать PDF-файлы непосредственно в рабочем пространстве проекта.",
      antigravity: "Настройте PDFLince как локальный MCP-сервер в Google Antigravity IDE.",
      windsurf: "Разрешите Cascade инспектировать, разделять, сжимать и конвертировать PDF в локальных сессиях разработки.",
      vscode: "Интегрируйте PDFLince с автономными ИИ-агентами в Visual Studio Code.",
    }),
  },
  tools: {
    title: "Справочник Инструментов",
    subtitle: "Десять структурированных MCP-инструментов, полностью повторяющих все операции и настройки веб-интерфейса PDFLince.",
    items: buildToolsList({
      pdflince_inspect: {
        title: "Инспекция PDF",
        badge: "Чтение",
        description:
          "Читает локальный PDF без изменений. Возвращает количество страниц, размеры каждой страницы, угол поворота, ориентацию и метаданные.",
        paramDescriptions: {
          filePath: "Абсолютный или относительный путь к локальному PDF-файлу.",
        },
        promptExample: "Проверь report-2025.pdf и выведи количество страниц, размеры и автора документа.",
      },
      pdflince_merge: {
        title: "Объединить PDF",
        badge: "Сборка",
        description:
          "Объединяет два или более PDF-файла последовательно, с опциональными пустыми страницами-разделителями и пользовательскими метаданными.",
        paramDescriptions: {
          filePaths: "Упорядоченный список путей к PDF-файлам для объединения (минимум 2).",
          outputPath: "Путь сохранения итогового PDF-файла.",
          addPageDividers: "Вставлять пустую страницу-разделитель между документами.",
          metadata: "Пользовательские метаданные ({ title, author, subject, keywords }).",
        },
        promptExample: "Объедини part1.pdf и part2.pdf в full-guide.pdf с пустыми страницами-разделителями.",
      },
      pdflince_split: {
        title: "Разделить PDF",
        badge: "Разделение",
        description: "Разделяет PDF на несколько файлов по N страниц в каждом, с опциональной упаковкой в ZIP-архив.",
        paramDescriptions: {
          filePath: "Путь к исходному PDF-файлу.",
          outputDirectory: "Директория для сохранения разделённых PDF-файлов.",
          pagesPerFile: "Количество страниц в каждом выходном файле (по умолчанию: 1).",
          outputPrefix: "Пользовательский префикс имени для создаваемых файлов.",
          preserveMetadata: "Сохранять метаданные исходного документа (по умолчанию: true).",
          bundleAsZip: "Дополнительно упаковать все созданные файлы в .zip-архив.",
        },
        promptExample: "Раздели manual.pdf на файлы по 4 страницы в папке ./modules и упакуй их в ZIP.",
      },
      pdflince_extract: {
        title: "Извлечь Страницы",
        badge: "Извлечение",
        description: "Извлекает указанные страницы или диапазоны (например, '1-3, 5, 8') в новый PDF-документ.",
        paramDescriptions: {
          filePath: "Путь к исходному PDF-файлу.",
          outputPath: "Путь сохранения извлечённого PDF-файла.",
          pages: "Строка диапазонов страниц с нумерацией от 1 ('1-3, 5') или массив номеров.",
          preserveMetadata: "Сохранять метаданные исходного документа (по умолчанию: true).",
        },
        promptExample: "Извлеки страницы 1-3 и страницу 7 из contract.pdf в файл summary.pdf.",
      },
      pdflince_reorder: {
        title: "Изменить Порядок Страниц",
        badge: "Порядок",
        description: "Меняет порядок страниц PDF в соответствии с массивом номеров (нумерация с 1).",
        paramDescriptions: {
          filePath: "Путь к исходному PDF-файлу.",
          outputPath: "Путь сохранения PDF-файла с новым порядком страниц.",
          pageOrder: "Массив порядка страниц с нумерацией от 1 (например, [3, 1, 2]).",
          preserveMetadata: "Сохранять метаданные исходного документа (по умолчанию: true).",
        },
        promptExample: "Измени порядок страниц в deck.pdf по последовательности [4, 1, 2, 3].",
      },
      pdflince_rotate: {
        title: "Повернуть Страницы",
        badge: "Поворот",
        description: "Поворачивает все или выбранные страницы на 90, 180, 270, -90, -180 или -270 градусов.",
        paramDescriptions: {
          filePath: "Путь к исходному PDF-файлу.",
          outputPath: "Путь сохранения повёрнутого PDF-файла.",
          rotationDegrees: "Угол поворота (90, 180, 270, -90, -180, -270; по умолчанию: 90).",
          pages: "Целевые страницы ('all' или '1, 3-5'; по умолчанию: 'all').",
          preserveMetadata: "Сохранять метаданные исходного документа (по умолчанию: true).",
        },
        promptExample: "Поверни страницу 3 файла scan.pdf на 90 градусов по часовой стрелке.",
      },
      pdflince_crop: {
        title: "Обрезать Поля",
        badge: "Обрезка",
        description: "Обрезает верхнее, нижнее, левое и правое поля страниц в типографских пунктах (72 pt = 1 дюйм).",
        paramDescriptions: {
          filePath: "Путь к исходному PDF-файлу.",
          outputPath: "Путь сохранения обрезанного PDF-файла.",
          margins: "Значения полей { top, bottom, left, right } в пунктах.",
          pages: "Целевые страницы ('all' или диапазон; по умолчанию: 'all').",
          preserveMetadata: "Сохранять метаданные исходного документа (по умолчанию: true).",
        },
        promptExample: "Обрежь по 36 пунктов со всех четырёх сторон на всех страницах presentation.pdf.",
      },
      pdflince_compress: {
        title: "Сжать PDF",
        badge: "Оптимизация",
        description:
          "Уменьшает размер PDF с помощью профилей веб-интерфейса (low, medium, high), уменьшения разрешения изображений (150/72 DPI), сжатия объектных потоков и очистки метаданных.",
        paramDescriptions: {
          filePath: "Путь к исходному PDF-файлу.",
          outputPath: "Путь сохранения сжатого PDF-файла.",
          compressionLevel: "Профиль сжатия (по умолчанию: 'medium').",
          downscaleImages: "Уменьшать разрешение и пережимать встроенные изображения (true для medium/high).",
          downscaleImagesDpi: "Целевое разрешение изображений в DPI (150 для medium, 72 для high).",
          imageQuality: "Качество JPEG от 0.1 до 1.0 (по умолчанию: 0.82).",
          preserveMetadata: "Сохранять метаданные (true для low/medium, false для high).",
          stripAnnotations: "Удалять аннотации страниц (true для high).",
        },
        promptExample: "Сожми large-manual.pdf с уровнем high и сохрани результат в manual-compact.pdf.",
      },
      pdflince_pdf_to_images: {
        title: "PDF в Изображения",
        badge: "Экспорт",
        description:
          "Рендерит все или выбранные страницы PDF в изображения PNG или JPEG с настраиваемым DPI (72, 144, 300) и опциональной упаковкой в ZIP.",
        paramDescriptions: {
          filePath: "Путь к исходному PDF-файлу.",
          outputDirectory: "Директория для сохранения отрендеренных изображений.",
          format: "Формат выходных изображений (по умолчанию: 'png').",
          quality: "Качество JPEG от 0.1 до 1.0 (по умолчанию: 0.9).",
          dpi: "Разрешение рендеринга в DPI (72, 144, 300; по умолчанию: 144).",
          pages: "Страницы для экспорта ('all' или '1-3, 5'; по умолчанию: 'all').",
          bundleAsZip: "Дополнительно создать .zip-архив экспортированных изображений.",
          outputPrefix: "Пользовательский префикс имени для экспортируемых файлов.",
        },
        promptExample: "Экспортируй страницы 1-3 из brochure.pdf в PNG 300 DPI в папку ./exported-pages.",
      },
      pdflince_images_to_pdf: {
        title: "Изображения в PDF",
        badge: "Конвертация",
        description:
          "Собирает локальные изображения (PNG, JPG, WebP, TIFF) в PDF-документ с настройкой заполнения, формата страницы, ориентации, полей и цвета фона.",
        paramDescriptions: {
          imagePaths: "Упорядоченный список путей к изображениям (PNG, JPG, WebP, TIFF).",
          outputPath: "Путь сохранения создаваемого PDF-файла.",
          imageFit: "Режим вписывания изображения (по умолчанию: 'contain').",
          pageSize: "Формат страницы (по умолчанию: 'auto').",
          pageOrientation: "Ориентация страницы (по умолчанию: 'auto').",
          pageMarginPoints: "Поля страницы в пунктах (по умолчанию: 18).",
          backgroundColor: "Цвет фона в формате HEX (по умолчанию: '#ffffff').",
        },
        promptExample: "Конвертируй scan1.png и scan2.webp в книжный PDF формата A4 по пути ./scans.pdf.",
      },
    }),
  },
  faq: {
    title: "Часто Задаваемые Вопросы",
    entries: [
      {
        question: "Как MCP-сервер работает полностью офлайн?",
        answer:
          "Бинарный файл `pdflince-mcp` запускается вашим MCP-хостом (Claude Desktop, Cursor, Antigravity) как локальный дочерний процесс и обменивается данными по stdio JSON-RPC. Он не открывает сетевых портов и не отправляет внешних HTTP-запросов.",
      },
      {
        question: "Какие системные требования?",
        answer:
          "Node.js 18+ (рекомендуется Node 20+) или Bun. Никаких окружений Python или облачных API-ключей не требуется.",
      },
      {
        question: "Работает ли сервер с локальными LLM (Ollama, Nous Hermes, DeepSeek)?",
        answer:
          "Да. Поскольку PDFLince реализует открытый стандарт Model Context Protocol поверх stdio, он не зависит от конкретной модели. Вы можете использовать его с локальными моделями (Nous Hermes 3, DeepSeek-R1/V3, Llama 3 через Ollama, LM Studio или vLLM) и с коммерческими моделями (Claude, Grok, GPT-4o).",
      },
      {
        question: "Изменяются ли исходные PDF-файлы?",
        answer:
          "Нет. Каждая операция записи требует явного указания `outputPath` или `outputDirectory`, поэтому исходные документы остаются нетронутыми.",
      },
    ],
  },
  cta: {
    title: "Запустите PDFLince MCP Локально",
    description: "Локальная обработка PDF для вашей IDE и ИИ-агентов менее чем за минуту.",
    command: "npx -y pdflince-mcp@latest",
    webAppLabel: "Открыть Веб-приложение",
    webAppHref: "/ru",
    githubLabel: "Исходный код на GitHub",
    githubHref: "https://github.com/GSiesto/pdflince",
  },
  ui: {
    copyPath: "Копировать путь",
    copiedPath: "Путь скопирован",
    copyJson: "Копировать JSON",
    copiedJson: "Скопировано",
    parametersHeading: "Параметры",
    paramName: "Имя",
    paramType: "Тип",
    paramRequired: "Обязательный",
    paramDescription: "Описание",
    yes: "Да",
    no: "Нет",
    promptExampleHeading: "Пример Промпта",
    copyPrompt: "Копировать промпт",
    copiedPrompt: "Скопировано",
    clickToCopy: "Нажмите, чтобы скопировать",
    copyCommandPrefix: "Копировать",
    commandCopied: "Команда скопирована",
    directCliLabel: "Прямой запуск через CLI / stdio:",
  },
};

export const mcpMetadataRu: McpMetadataStrings = {
  title: "MCP-сервер PDFLince | Локальные PDF-инструменты для ИИ-агентов",
  description:
    "Открытый локальный сервер Model Context Protocol (MCP) для Claude Desktop, Cursor, Antigravity, Windsurf и Ollama. Инспекция, сжатие, объединение, разделение и конвертация PDF без облака.",
  keywords: [
    "mcp",
    "model context protocol",
    "pdflince mcp",
    "mcp pdf сервер",
    "claude desktop pdf",
    "cursor mcp pdf",
    "antigravity mcp",
    "windsurf mcp",
    "ollama mcp pdf",
  ],
  canonical: `${siteUrl}/ru/mcp`,
};

const MCP_CONTENT_BY_LOCALE: Record<Locale, { page: McpPageStrings; metadata: McpMetadataStrings }> = {
  en: { page: mcpPageEn, metadata: mcpMetadataEn },
  es: { page: mcpPageEs, metadata: mcpMetadataEs },
  pt: { page: mcpPagePt, metadata: mcpMetadataPt },
  fr: { page: mcpPageFr, metadata: mcpMetadataFr },
  de: { page: mcpPageDe, metadata: mcpMetadataDe },
  it: { page: mcpPageIt, metadata: mcpMetadataIt },
  ro: { page: mcpPageRo, metadata: mcpMetadataRo },
  hu: { page: mcpPageHu, metadata: mcpMetadataHu },
  ru: { page: mcpPageRu, metadata: mcpMetadataRu },
};

export function getMcpContent(locale: Locale): { page: McpPageStrings; metadata: McpMetadataStrings } {
  return MCP_CONTENT_BY_LOCALE[locale] ?? MCP_CONTENT_BY_LOCALE.en;
}
