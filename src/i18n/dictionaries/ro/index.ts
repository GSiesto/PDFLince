import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import { operationsRo } from "./operations";
import { faqsRo } from "./faqs";
import { getMcpContent } from "../mcp-content";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";

const locale = "ro" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
const mcpContent = getMcpContent(locale);
const siteUrl = "https://pdflince.com";
const homePath = getRoutePath(locale, "home");

const operationsRoutes: Record<OperationKey, string> = {
  merge: getOperationPath(locale, "merge"),
  compress: getOperationPath(locale, "compress"),
  split: getOperationPath(locale, "split"),
  extract: getOperationPath(locale, "extract"),
  crop: getOperationPath(locale, "crop"),
  rotate: getOperationPath(locale, "rotate"),
  reorder: getOperationPath(locale, "reorder"),
  pdfToImages: getOperationPath(locale, "pdfToImages"),
  imagesToPdf: getOperationPath(locale, "imagesToPdf"),
};

export const roDictionary: Dictionary = {
  locale,
  localeLabel: label,
  nativeName,
  htmlLang,
  hrefLang,
  routes: {
    home: homePath,
    faq: getRoutePath(locale, "faq"),
    support: getRoutePath(locale, "support"),
    mcp: getRoutePath(locale, "mcp"),
    operations: operationsRoutes,
  },
  metadata: {
    site: {
      title: "PDFLince – Unește, comprimă și convertește PDF-uri gratuit",
      description:
        "PDFLince este un set de instrumente axat pe confidențialitate care unește, comprimă, divide, extrage, rotește și convertește PDF-uri direct în browser. Toată procesarea rămâne pe dispozitivul tău.",
      keywords: [
        "uneste pdf",
        "merge pdf",
        "comprima pdf",
        "compress pdf",
        "divide pdf",
        "split pdf",
        "extrage pagini pdf",
        "extract pdf pages",
        "roteste pagini pdf",
        "rotate pdf",
        "reordoneaza pdf",
        "reorder pdf",
        "pdf in imagini",
        "pdf to images",
        "imagini in pdf",
        "images to pdf",
        "converteste pdf",
        "converteste pdf online",
        "converteste pdf in png",
        "jpg in pdf",
        "modifica pdf offline",
        "set de instrumente pdf",
        "confidentialitate pdf",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "PDFLince – Unește, Comprimă, Divide, PDF în Imagine",
        description:
          "Unește, comprimă, divide, extrage, reordonează și convertește PDF-uri fără a încărca fișierele pe server. Gratuit, privat și susținut de o procesare locală.",
        url: `${siteUrl}${homePath}`,
        locale: "ro_RO",
        type: "website",
        imageUrl: "https://pdflince.com/og-images/og-image-ro.png",
        imageAlt: "PDFLince - Procesare PDF privată și gratuită",
      },
    },
    faq: {
      title: "FAQ | PDFLince – Set de instrumente gratuit pentru procesare PDF",
      description:
        "Răspunsuri la întrebări frecvente despre PDFLince. Află cum să unești, comprimi, divizezi, extragi și reordonezi PDF-uri fără a-ți încărca fișierele.",
      keywords: [
        "pdflince faq",
        "intrebari pdf",
        "ajutor pdf",
        "ajutor unire pdf",
        "ajutor compresie pdf",
        "ajutor divizare pdf",
        "rotire pagini pdf",
        "reordonare pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Susține PDFLince | Menține instrumentele gratuite și private",
      description:
        "Donația ta permite ca PDFLince să rămână un proiect mic, independent și axat pe confidențialitate. Ajută la acoperirea costurilor de găzduire și a îmbunătățirilor.",
      keywords: [
        "doneaza pdflince",
        "sustine set instrumente pdf",
        "sustine proiecte confidentialitate",
        "donatii stripe pdflince",
        "pastreaza pdflince gratuit",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    mcp: mcpContent.metadata,
    operations: operationsRo,
  },
  brand: {
    name: "PDFLince",
    tagline: "Procesare locală • 100% privată",
  },
  components: {
    nav: {
      home: "Acasă",
      faq: "Întrebări frecvente",
      support: "Susține",
      photo: "FotoLince",
      mcp: "Server MCP",
      languageLabel: "Limbă",
      menuLabel: "Comută meniul de navigare",
    },
    footer: {
      privacy: "Procesare locală • 100% privată • Licențe deschise",
      rights: `© ${new Date().getFullYear()} PDFLince — Instrumente pentru manipularea PDF-urilor fără a compromite confidențialitatea`,
      links: {
        home: "Acasă",
        faq: "Întrebări frecvente",
        support: "Susține",
        photo: "FotoLince",
        contact: "Contact",
        mcp: "Server MCP",
      },
      capabilitiesLabel: "Acțiuni populare",
      operations: {
        merge: "Unește PDF-uri",
        compress: "Comprimă un PDF",
        split: "Divide un PDF",
        extract: "Extrage pagini",
        crop: "Decupează pagini",
        rotate: "Rotește",
        reorder: "Reordonează",
        pdfToImages: "PDF în Imagini",
        imagesToPdf: "Imagini în PDF",
      },
      license: "Procesare PDF: PDF-lib (MIT), PDF.js (Apache 2.0) • Font: Geist (MIT)",
      disclaimer: "Serviciul este furnizat „ca atare”, fără garanții de niciun fel. Utilizatorul este singurul responsabil pentru utilizarea fișierelor.",
    },
    notifications: {
      labels: {
        success: "Succes",
        error: "Eroare",
        info: "Notificare",
        warning: "Avertisment",
      },
      closeLabel: "Închide",
    },
    fotolinceBanner: {
      eyebrow: "Ai nevoie să optimizezi imagini?",
      title: "Comprimă, redimensionează sau convertește cu FotoLince",
      description:
        "Setul nostru de instrumente procesează fișiere JPG, PNG și WEBP la nivel local — ideal pentru a reduce dimensiunea imaginilor înainte de a le transforma în PDF.",
      ctaLabel: "Deschide FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Logo FotoLince",
    },
    feedback: {
      question: "A fost util?",
      thanks: "Îți mulțumim pentru feedback!",
      whatWrong: "Spune-ne ce nu a funcționat bine",
      emailSubject: "Feedback pentru PDFLince",
    },
    pdfProcessor: {
      title: "Alege o operațiune",
      modes: {
        merge: {
          label: "Unește PDF",
          helper: "Organizează fișierele PDF pentru a le uni într-un singur document.",
        },
        compress: {
          label: "Comprimă PDF",
          helper: "Redu dimensiunea unui PDF. Procesează câte un singur fișier pentru cel mai bun echilibru între calitate și viteză.",
        },
        split: {
          label: "Divide PDF",
          helper: "Selectează fișierele PDF pentru a le diviza în documente separate.",
        },
        extract: {
          label: "Extrage Pagini",
          helper: "Alege pagini specifice pentru a crea un document nou.",
        },
        crop: {
          label: "Decupează Pagini",
          helper: "Elimină marginile vizibile ale paginilor selectate fără a părăsi browserul.",
        },
        rotate: {
          label: "Rotește Pagini",
          helper: "Selectează paginile care necesită o orientare nouă și rotește-le.",
        },
        reorder: {
          label: "Reordonează",
          helper: "Modifică ordinea paginilor din interiorul unui PDF.",
        },
        pdfToImages: {
          label: "PDF în Imagini",
          helper: "Exportă fiecare pagină PDF ca PNG sau JPEG fără încărcare pe server.",
        },
        imagesToPdf: {
          label: "Imagini în PDF",
          helper: "Combină imagini JPG, PNG sau WEBP într-un PDF cu un aspect personalizat.",
        },
      },
      upload: {
        title: "Selectează fișierele",
        clearAll: "Șterge tot",
        listHeadings: {
          merge: "Fișiere de unit (reordonează pentru a stabili secvența):",
          extract: "Selectează un fișier pentru a lucra cu paginile sale:",
          crop: "Selectează un fișier pentru a lucra cu paginile sale:",
          rotate: "Selectează un fișier pentru a lucra cu paginile sale:",
          reorder: "Selectează un fișier pentru a lucra cu paginile sale:",
          pdfToImages: "PDF de convertit (procesate pe rând):",
          imagesToPdf: "Imagini de combinat (reordonează pentru secvența finală):",
          default: "Fișiere selectate (reordonează sau elimină):",
        },
        hints: {
          compress: "Fiecare fișier este comprimat individual utilizând cel mai bun raport între calitate și dimensiune.",
          split: "Fiecare PDF va fi divizat pe baza opțiunilor selectate la pasul următor.",
          crop: "Alege paginile de decupat, apoi definește câte puncte să elimini de pe fiecare parte.",
          pdfToImages: "Procesăm câte un PDF pe rând. Ajustează formatul și DPI-ul înainte de export.",
          imagesToPdf: "Adaugă imagini JPG, PNG, WEBP sau TIFF. Folosește panoul de opțiuni pentru a alege dimensiunea, marginile și culoarea.",
        },
      },
      downloadNames: {
        compress: "comprimat_PDFLince",
        merge: "unit_PDFLince",
        split: "parte_PDFLince",
        extract: "extras_PDFLince",
        crop: "decupat_PDFLince",
        rotate: "rotit_PDFLince",
        reorder: "reordonat_PDFLince",
        pdfToImages: "imagini_PDFLince",
        imagesToPdf: "imagini_in_pdf_PDFLince",
      },
      processButton: {
        idleSingle: "Procesează 1 fișier",
        idleMultiple: (count: number) => `Procesează ${count} fișiere`,
        processing: "Se procesează...",
        extract: (count: number) => `Extrage ${count} pagin${count > 1 ? "i" : "ă"}`,
        crop: (count: number) =>
          count > 0 ? `Decupează ${count} pagin${count > 1 ? "i" : "ă"}` : "Decupează PDF",
        rotate: (count: number) =>
          count > 0 ? `Rotește ${count} pagin${count > 1 ? "i" : "ă"}` : "Rotește PDF",
        reorder: "Salvează ordinea",
        pdfToImages: {
          single: "Exportă imagini",
          multiple: (count: number) => `Exportă ${count} PDF-uri`,
        },
        imagesToPdf: {
          single: "Creează PDF",
          multiple: (count: number) => `Creează PDF din ${count} imagini`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Se procesează (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Comprimat. Reducere: ${reduction}% (${original} → ${next}) în ${seconds}s`,
        merged: "Unirea s-a finalizat",
        split: (count: number) =>
          count > 1
            ? `S-au generat ${count} fișiere. Se descarcă primul...`
            : "Divizarea s-a finalizat",
        extracted: (count: number) => `S-a extras ${count} pagin${count > 1 ? "i" : "ă"}`,
        cropped: (count: number) => `S-a decupat ${count} pagin${count > 1 ? "i" : "ă"}`,
        rotated: (count: number) => `S-a rotit ${count} pagin${count > 1 ? "i" : "ă"}`,
        reordered: "Reordonarea s-a finalizat",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `S-au exportat ${count} imagini ${label} într-o arhivă ZIP`
            : `S-au descărcat ${count} imagini ${label}`;
        },
        imagesToPdf: (count: number) =>
          `PDF creat din ${count} imagin${count > 1 ? "i" : "ă"}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Niciun rezultat generat",
        mergeRequiresTwo: "Selectează cel puțin două fișiere",
        noPagesSelected: "Alege cel puțin o pagină",
        invalidFile: "Alege un fișier valid",
        reorderEmpty: "Nu s-a detectat o nouă ordine",
        unknown: "Eroare necunoscută",
        modeNotSupported: "Mod neacceptat",
      },
      labels: {
        pagesToExtract: "Selectează paginile de extras:",
        pagesToCrop: "Selectează paginile de decupat:",
        pagesToRotate: "Selectează paginile de rotit:",
        reorderPages: "Trage paginile pentru a le reordona:",
      },
      compressionPreview: {
        title: "Previzualizare compresie",
        description:
          "Ajustează setările pentru a estima dimensiunea de ieșire înainte de a începe compresia.",
        running: "Se calculează previzualizarea…",
        readyLabel: "Dimensiune estimată",
        ratio: (percent: string) => `cu ${percent}% mai mic`,
        saved: (size: string) => `economisești ${size}`,
        time: (seconds: string) => `≈ ${seconds}s`,
        original: "Original",
        result: "Estimat",
        notice:
          "Previzualizarea rulează local. Nimic nu se încarcă pe serverele noastre.",
        error: "Previzualizarea nu a putut fi generată.",
        retry: "Reîncearcă previzualizarea",
        universalBadge: "Optimizare universală",
      },
      compressionSummary: {
        title: "Ultima compresie",
        ratio: (percent: string) => `cu ${percent}% mai mic`,
        saved: (size: string) => `economisit ${size}`,
        original: "Original",
        result: "Comprimat",
        duration: (seconds: string) => `Finalizat în ${seconds}s`,
        download: "Descarcă din nou",
        clear: "Șterge rezumatul",
      },
      donationReminder: {
        message: "Te-a ajutat PDFLince să economisești timp? Susținerea ta îl menține gratuit.",
        actionLabel: "Susține PDFLince",
        withSavings: (percent: string, saved: string) =>
          `Ai economisit ${saved} (${percent}%)? Ajută-ne să menținem PDFLince fără reclame.`,
      },
      statusDialog: {
        processingTitle: "Procesare locală",
        successTitle: "Fișierele tale sunt gata",
        successDescription:
          "Descărcarea va începe în mod automat.",
        resultsLabel: "Ultimul rezultat",
        filesProcessedLabel: (count: number) =>
          `${count} fișier${count > 1 ? "e" : ""} procesat${count > 1 ? "e" : ""}`,
        downloadAgainLabel: "Descarcă",
        errorTitle: "Procesarea a eșuat",
        errorDescription: "Nu am putut finaliza această operațiune. Verifică fișierele.",
        retryLabel: "Reîncearcă",
        closeLabel: "Închide",
        sharePrompt: {
          dialogMessage: "PDFLince este complet gratuit și îți respectă confidențialitatea. Ajută-ne să-l păstrăm așa recomandându-l unui coleg.",
          shareText: "Tocmai am folosit PDFLince pentru a-mi gestiona PDF-urile. Este un set de instrumente gratuit, rapid și complet privat pentru a diviza, comprima, uni și converti PDF-uri direct în browser. Excelent pentru documente sensibile!",
          actionLabel: "Partajează",
          copiedLabel: "Copiat!",
        },
      },
      compressionTotal: {
        title: "Total economisit",
        savings: (size: string) => `în total ${size} economisiți`,
        count: (count: number) => `${count} fișiere optimizate`,
      },
    },
    fileUploader: {
      clickToSelect: "Fă clic pentru a selecta",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "sau trage și plasează imagini aici" : "sau trage și plasează fișiere PDF aici",
      accepted: {
        pdf: "Fișiere PDF",
        images: "Formate acceptate: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Dimensiune recomandată: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Format neacceptat: ${fileName}. Sunt permise doar ${label}.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Fișier prea mare: ${fileName}. Dimensiunea maximă este de ${sizeMb}MB.`,
      },
      dropImagesAlt: "Imagine de fundal",
    },
    fileList: {
      moveUp: "Mută mai sus",
      moveDown: "Mută mai jos",
      remove: "Elimină",
      removeAll: "Elimină tot",
      imageLabel: "Imagine",
      fileLabel: "Fișier",
      selected: "Selectat",
      pdfLabel: "PDF",
      deselect: "Deselectează",
      pagesLabel: (count: number) => `${count} pagin${count > 1 ? "i" : "ă"}`,
      previewLoading: "Se încarcă previzualizarea…",
    },
    pageSelector: {
      loading: "Se încarcă paginile...",
      error: "Nu s-au putut încărca informațiile PDF-ului",
      summary: (total: number, selected: number) =>
        `${total} pagini detectate — ${selected} selectate`,
      selectAll: "Selectează tot",
      deselectAll: "Deselectează tot",
      pageLabel: (pageNumber: number) => `Pagina ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Se afișează ${shown} din ${total} pagini. Introdu numerele paginilor suplimentare.`,
      manualLabel: "Introdu numerele (ex. 21, 25-30)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Se încarcă paginile...",
      error: "Nu s-au putut încărca informațiile PDF-ului",
      limitReached: (count: number) =>
        `Acest PDF are ${count} pagini. Din motive de performanță, poți reordona maximum 120 de pagini.`,
      limitHint:
        "Împarte mai întâi PDF-ul în fragmente mai mici.",
      summary: (count: number) => `${count} pagini pregătite pentru reordonare`,
      reset: "Restabilește ordinea",
      dragHint: "Trage de pagini pentru a le modifica ordinea",
      pageLabel: (pageNumber: number) => `Pagina ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Pagina ${pageNumber}`,
      instructions:
        "Trage de pagini în ordinea dorită. Când ai terminat, fă clic pe „Salvează ordinea”.",
    },
    processingOptions: {
      compress: {
        title: "Compresie",
        level: "Nivel",
        levels: {
          low: "Redus",
          medium: "Mediu",
          high: "Ridicat",
        },
        removeMetadata: "Elimină metadatele",
        removeMetadataHint: "Șterge detaliile ascunse, precum autorul și istoricul.",
        stripAnnotations: "Elimină adnotările",
        stripAnnotationsHint: "Șterge notele, formularele și semnăturile.",
        downscaleImages: "Redimensionează imaginile",
        downscaleHint: "Ideal pentru documentele scanate.",
        advancedTitle: "Curățare avansată",
        advancedDescription: "Păstrează opțiunile simple sau activează suplimentele de care ai nevoie.",
        activeLabel: "Activat:",
      },
      merge: {
        title: "Unire",
        pageDivider: "Pagină goală între documente",
        metadataTitle: "Titlul documentului unit (opțional)",
        metadataAuthor: "Autorul documentului (opțional)",
        metadataHint: "Setează metadate personalizate.",
      },
      split: {
        title: "Divizare",
        pagesPerFile: "Pagini per fișier",
        pagesPerFileHint: "Vom crea un nou PDF la fiecare N pagini.",
      },
      extract: {
        title: "Extragere",
        preserveMetadata: "Păstrează metadatele",
        preserveMetadataHint: "Păstrează titlul, autorul și alte detalii.",
      },
      crop: {
        title: "Decupare",
        hint: "Selectează paginile de decupat și definește marginile.",
        inputModeLabel: "Metodă",
        inputModes: {
          margins: "Setare margini",
          manual: "Selecție manuală",
        },
        marginsTitle: "Margini",
        marginLabels: {
          top: "Margine superioară (pts)",
          right: "Margine dreaptă (pts)",
          bottom: "Margine inferioară (pts)",
          left: "Margine stângă (pts)",
        },
        marginHint: "72 de puncte echivalează cu aproximativ 1 inch.",
        preserveMetadata: "Păstrează metadatele",
        preserveMetadataHint: "Păstrează titlul, autorul și alte detalii.",
        manual: {
          title: "Selecție manuală",
          hint: "Trage de chenar pe previzualizare pentru a defini zona vizibilă.",
          loading: "Se încarcă...",
          error: "Previzualizarea nu a putut fi încărcată.",
          reset: "Resetează",
          pagePreview: (pageNumber: number) => `Previzualizare pagina ${pageNumber}`,
        },
      },
      rotate: {
        title: "Rotire",
        hint: "Alege direcția și selectează paginile.",
        rotateRight90: "Rotește la dreapta (90°)",
        rotate180: "Rotește (180°)",
        rotateLeft90: "Rotește la stânga (90°)",
      },
      reorder: {
        title: "Reordonare",
        hint: "Trage de miniaturi pentru a schimba ordinea.",
      },
      pdfToImages: {
        title: "Exportare",
        formatLabel: "Format",
        formatHint: "Alege PNG pentru calitate fără pierderi sau JPEG pentru dimensiuni mai mici.",
        pngLabel: "PNG (fără pierderi)",
        jpegLabel: "JPEG (mai mic)",
        qualityLabel: "Calitate JPEG",
        qualityHint: "O calitate mai mare păstrează mai multe detalii.",
        dpiLabel: "Rezoluție DPI",
        dpiHint: "Un DPI mai mare crește claritatea, dar și dimensiunea fișierului.",
        dpiPresets: {
          screen: "72 DPI · Ecran",
          balanced: "144 DPI · Echilibrat",
          print: "300 DPI · Imprimare",
        },
        zipLabel: "Grupează imaginile într-un ZIP",
        zipHint: "Descarcă o singură arhivă.",
        baseNameLabel: "Nume de bază al fișierului",
        baseNamePlaceholder: "pdflince_pagini",
        baseNameHint: "Lasă gol pentru a reutiliza numele PDF-ului original.",
      },
      imagesToPdf: {
        title: "Așezare în pagină",
        layoutTitle: "Așezare în pagină",
        fitLabel: "Potrivire image",
        fitOptions: {
          contain: "Încadrare (arată imaginea completă)",
          cover: "Umplere (acoperă pagina)",
        },
        sizeLabel: "Dimensiune pagină",
        sizeOptions: {
          auto: "Auto (se potrivește cu imaginea)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "Orientare",
        orientationOptions: {
          auto: "Auto",
          portrait: "Portret",
          landscape: "Pe lat",
        },
        marginLabel: "Margini (pts)",
        marginHint: "Adaugă spațiu alb. 72 pts ≈ 1 inch.",
        backgroundLabel: "Culoare fundal",
        backgroundHint: "Aplicată în spatele imaginilor.",
      },
    },
    cookieBanner: {
      message: "Folosim cookie-uri pentru a analiza traficul. Nu partajăm datele tale.",
      accept: "Acceptă",
      decline: "Refuză",
    },
  },
  pages: {
    home: {
      hero: {
        title: "PDFLince: Comprimă, unește și convertește PDF gratuit",
        subtitle:
          "Comprimă, unește, divide, extrage, rotește și convertește PDF-uri direct în browser. Fără încărcare pe server, complet privat.",
        badges: [
          "Comprimă PDF",
          "Unește PDF",
          "Procesare locală",
          "Susține PDFLince",
        ],
        imageAlt: "Ilustrație a unui document PDF",
        ctaLinks: [
          {
            label: "PDF în Imagini",
            href: operationsRoutes.pdfToImages,
            description: "Exportă în format PNG sau JPEG",
          },
          {
            label: "Images în PDF",
            href: operationsRoutes.imagesToPdf,
            description: "Combină JPG, PNG sau WEBP",
          },
        ],
      },
      why: {
        title: "De ce să folosești PDFLince?",
        cards: [
          {
            title: "Privat implicit",
            description:
              "PDF-urile tale nu părăsesc niciodată dispozitivul. Totul se întâmplă în browser.",
            icon: "🔒",
          },
          {
            title: "Rapid și eficient",
            description:
              "Motorul nostru local oferă o viteză optimă, fără a depinde de stocarea în cloud.",
            icon: "⚡",
          },
          {
            title: "Funcționează oriunde",
            description:
              "Pe computer, tabletă sau telefon — este suficient un browser modern.",
            icon: "📱",
          },
        ],
      },
      callout: {
        title: "Ajută-ne să menținem PDFLince gratuit",
        description:
          "Fiecare donație acoperă costurile de găzduire și ne permite să menținem experiența 100% privată, fără reclame și fără urmărire.",
        ctaLabel: "Susține proiectul",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Vezi cum utilizăm fondurile",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Întrebări Frecvente",
      intro: "Răspunsuri la cele mai comune întrebări despre PDFLince",
      cta: {
        title: "Încearcă PDFLince acum",
        description:
          "Unește, comprimă, divide, extrage, rotește și reordonează PDF-uri în deplină confidențialitate.",
        ctaLabel: "Mergi la instrumente",
      },
    },
    support: {
      hero: {
        eyebrow: "🌱 Proiect independent",
        title: "Ajută-ne să păstrăm PDFLince gratuit și privat",
        subtitle:
          "PDFLince este un proiect mic, dezvoltat din pasiune. Susținerea ta acoperă costurile serverelor.",
        highlight: "Doar un instrument simplu care îți respectă confidențialitatea.",
      },
      reasons: {
        title: "De ce să donezi ?",
        cards: [
          {
            title: "Păstrează-l gratuit",
            description:
              "Donațiile ne permit să menținem PDFLince 100% gratuit pentru toată lumea.",
            icon: "💚",
          },
          {
            title: "Îmbunătățiri continue",
            description:
              "Susținerea ta finanțează corectarea erorilor și dezvoltarea de noi instrumente.",
            icon: "✨",
          },
          {
            title: "Protejarea confidențialității",
            description:
              "Procesăm totul local. Donațiile ne permit să continuăm în acest mod.",
            icon: "🔒",
          },
        ],
      },
      tiers: {
        title: "Donează cât poți",
        description: "Orice sumă ne ajută. Plată securizată prin Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Cumpără o cafea",
            amount: "3 €",
            description: "Acoperă găzduirea pentru câteva săptămâni.",
            ctaLabel: "Donează 3 €",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Susținere lunară",
            amount: "10 €/lună",
            description: "Ne oferă timp dedicat în fiecare săptămână pentru a îmbunătăți PDFLince.",
            ctaLabel: "Donează 10 €/lună",
            ctaHref: "#stripe-checkout-monthly",
            badge: "💙 Mulțumim",
          },
          {
            id: "custom",
            title: "Sumă personalizată",
            amount: "Orice sumă",
            description: "Fiecare euro contează. Alege suma care ți se potrivește.",
            ctaLabel: "Alege suma",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Plăți securizate prin Stripe. Poți anula donația recurentă în orice moment.",
      },
      transparency: {
        title: "Unde merg banii",
        items: [
          "Găzduire și rețea de livrare de conținut (CDN) pentru ca site-ul să fie rapid la nivel global",
          "Timp de dezvoltare pentru rezolvarea erorilor și adăugarea de noi funcționalități",
          "Ajustări de design și UX pentru o experiență de utilizare cât mai fluidă",
          "Traduceri și documentație pentru fiecare limbă acceptată",
        ],
      },
      faq: {
        title: "Întrebări",
        entries: [
          {
            question: "Ce se întâmplă dacă nu pot dona ?",
            answer:
              "Nicio problemă. PDFLince va rămâne gratuit. Partajarea site-ului cu alții este deja un ajutor extraordinar.",
          },
          {
            question: "Voi primi o chitanță ?",
            answer:
              "Da. Stripe îți trimite automat pe e-mail o chitanță cu toate detaliile plății.",
          },
          {
            question: "Cum pot anula o donație recurentă ?",
            answer:
              "O poți gestiona din portalul tău Stripe sau trimite-ne un e-mail și o vom anula noi pentru tine.",
          },
        ],
      },
      closing: {
        title: "Îți mulțumim că ești aici",
        description:
          "Fiecare persoană care susține PDFLince ajută la menținerea în viață a unui set util de instrumente PDF.",
        ctaLabel: "Trimite un e-mail echipei",
        ctaHref: "mailto:info@pdflince.com?subject=Salut%20echipa%20PDFLince",
      },
      legalNotice: {
        title: "Informații legale și transparență",
        points: [
          "PDFLince este un proiect personal independent gestionat de o echipă mică de voluntari.",
          "Contribuțiile sunt voluntare și ajută exclusiv la acoperirea găzduirii și a timpului de dezvoltare.",
          "Plățile nu sunt donații deductibile fiscal; Stripe va emite o chitanță automată.",
          "Serviciul este furnizat ca atare, fără garanții. Întrebări? info@pdflince.com.",
        ],
      },
    },
    mcp: mcpContent.page,
  },
  faqs: faqsRo,
  operations: operationsRo,
};
