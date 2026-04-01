import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import { operationsIt } from "./operations";
import { faqsIt } from "./faqs";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";

const locale = "it" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
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

export const itDictionary: Dictionary = {
  locale,
  localeLabel: label,
  nativeName,
  htmlLang,
  hrefLang,
  routes: {
    home: homePath,
    faq: getRoutePath(locale, "faq"),
    support: getRoutePath(locale, "support"),
    operations: operationsRoutes,
  },
  metadata: {
    site: {
      title: "PDFLince – Unisci, comprimi e converti PDF gratuitamente, senza caricare file online",
      description:
        "PDFLince è un insieme di strumenti pensati per la privacy che ti permette di unire, comprimere, dividere, estrarre, riordinare e convertire PDF in immagini e viceversa direttamente nel browser. Tutto viene elaborato sul tuo dispositivo, quindi i tuoi file restano sempre sotto il tuo controllo.",
      keywords: [
        "unisci pdf",
        "comprimi pdf",
        "dividi pdf",
        "estrai pagine dal pdf",
        "riodrdina pdf",
        "da pdf a immagini",
        "da immagini a pdf",
        "converti pdf",
        "converti pdf online",
        "converti pdf in immagini png",
        "da jpg a pdf",
        "modifica pdf offline",
        "strumenti per PDF",
        "PDF pensato per la tua privacy",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "PDFLince – Unisci, comprimi, dividi e converti PDF in immagini e viceversa",
        description:
          "Unisci, comprimi, dividi, estrai, riordina e converti PDF senza caricare i file online. Gratis, privato e con elaborazione completamente locale.",
        url: `${siteUrl}${homePath}`,
        locale: "it_IT",
        type: "website",
        imageUrl: "https://pdflince.com/og-image.jpg",
        imageAlt: "PDFLince - Elaborazione PDF gratuita e privata",
      },
    },
    faq: {
      title: "Domande frequenti | PDFLince – Strumenti gratuiti per gestire i PDF",
      description:
        "Risposte alle domande più frequenti su PDFLince. Scopri come unire, comprimere, dividere, estrarre e riordinare PDF senza caricare i tuoi file online.",
      keywords: [
        "pdflince domande frequenti",
        "pdf domande",
        "pdf aiuto",
        "aiuto unione pdf",
        "aiuto compressione pdf",
        "aiuto separazione pdf",
        "riordinare pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Supporta PDFLince | Mantieni il toolkit gratuito e privato",
      description:
        "La tua donazione aiuta PDFLince a restare piccolo, indipendente e attento alla privacy. Contribuisci a coprire hosting e miglioramenti continui.",
      keywords: [
        "donare a pdflince",
        "supportare strumenti pdf",
        "finanziare progetti privacy",
        "donazioni pdflince stripe",
        "mantenere pdflince gratuito",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsIt,
  },
  brand: {
    name: "PDFLince",
    tagline: "Elaborazione locale • 100% privato",
  },

  components: {
    nav: {
      home: "Home",
      faq: "Domande frequenti",
      support: "Supporto",
      photo: "FotoLince",
      languageLabel: "Lingua",
      menuLabel: "Menù di navigazione",
    },

    footer: {
      privacy: "Elaborazione locale • 100% privato • Licenza open source",
      rights: `© ${new Date().getFullYear()} PDFLince — Strumenti per gestire PDF senza compromettere la privacy`,
      links: {
        home: "Home",
        faq: "Domande frequenti",
        support: "Supporto",
        photo: "FotoLince",
        contact: "Contatti",
      },
      capabilitiesLabel: "Azioni principali",
      operations: {
        merge: "Unisci PDF",
        compress: "Comprimi PDF",
        split: "Dividi PDF",
        extract: "Estrai pagine",
        crop: "Ritaglia pagine",
        rotate: "Ruota pagine",
        reorder: "Riordina pagine",
        pdfToImages: "PDF in immagini",
        imagesToPdf: "Immagini in PDF",
      },
      license: "PDF Processing: PDF-lib (MIT), PDF.js (Apache 2.0) • Font: Geist (MIT)",
      disclaimer: "Il servizio è fornito così com'è senza alcuna garanzia. L'utente è responsabile dell'uso dei file generati.",
    },
    notifications: {
      labels: {
        success: "Successo",
        error: "Errore",
        info: "Informazione",
        warning: "Avviso",
      },
      closeLabel: "Chiudi",
    },
    fotolinceBanner: {
      eyebrow: "Devi ottimizzare immagini?",
      title:
        "Comprimi, ridimensiona o converti foto con FotoLince",
      description:
        "Il nostro toolkit gemello gestisce JPG, PNG e WEBP in locale — perfetto per ridurre le immagini prima di creare un PDF.",
      ctaLabel: "Apri FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Logo FotoLince",
    },
    feedback: {
      question: "Ti è stato utile?",
      thanks: "Grazie per il tuo feedback!",
      whatWrong: "Dicci cosa non ha funzionato",
      emailSubject: "Feedback per PDFLince",
    },
    pdfProcessor: {
      title: "Scegli un'operazione",
      modes: {
        merge: {
          label: "Unisci PDF",
          helper: "Ordina i PDF per unirli in un unico documento.",
        },
        compress: {
          label: "Comprimi PDF",
          helper:
            "Riduci le dimensioni di un PDF. Elabora un file alla volta per il miglior equilibrio tra qualità e velocità.",
        },
        split: {
          label: "Dividi PDF",
          helper: "Seleziona PDF da suddividere in documenti separati.",
        },
        extract: {
          label: "Estrai pagine",
          helper: "Scegli pagine specifiche per creare un nuovo documento.",
        },
        crop: {
          label: "Ritaglia pagine",
          helper: "Riduci i margini visibili delle pagine selezionate senza uscire dal browser.",
        },
        rotate: {
          label: "Ruota pagine",
          helper: "Seleziona le pagine che hanno bisogno di un nuovo orientamento e ruota solo quelle.",
        },
        reorder: {
          label: "Riordina pagine",
          helper: "Cambia l’ordine delle pagine all’interno di un PDF.",
        },
        pdfToImages: {
          label: "PDF in immagini",
          helper:
            "Esporta ogni pagina del PDF come PNG o JPEG senza caricare file.",
        },
        imagesToPdf: {
          label: "Immagini in PDF",
          helper:
            "Combina immagini JPG, PNG o WEBP in un unico PDF con layout personalizzato.",
        },
      },

      upload: {
        title: "Seleziona i tuoi file",
        clearAll: "Rimuovi tutto",
        listHeadings: {
          merge:
            "File da unire (riordina per definire la sequenza finale):",
          extract: "Seleziona un file per lavorare sulle sue pagine:",
          crop: "Seleziona un file per lavorare sulle sue pagine:",
          rotate: "Seleziona un file per lavorare sulle sue pagine:",
          reorder: "Seleziona un file per lavorare sulle sue pagine:",
          pdfToImages:
            "PDF da convertire (elaborati uno alla volta):",
          imagesToPdf:
            "Immagini da combinare (riordina per la sequenza finale):",
          default:
            "File selezionati (riordina o rimuovi):",
        },
        hints: {
          compress:
            "Ogni file viene compresso individualmente con il miglior rapporto qualità/dimensione.",
          split:
            "Ogni PDF verrà suddiviso in base alle opzioni selezionate nel passaggio successivo.",
          crop:
            "Seleziona le pagine da ritagliare e definisci quanti punti rimuovere da ogni lato nel pannello opzioni.",
          pdfToImages:
            "Elaboriamo un PDF alla volta. Regola formato e DPI dal pannello opzioni prima di esportare.",
          imagesToPdf:
            "Trascina immagini JPG, PNG, WEBP o TIFF. Usa il pannello opzioni per scegliere dimensione pagina, margini e colore di sfondo.",
        },
      },

      downloadNames: {
        compress: "compresso_PDFLince",
        merge: "unito_PDFLince",
        split: "parte_PDFLince",
        extract: "estratto_PDFLince",
        crop: "ritagliato_PDFLince",
        rotate: "ruotato_PDFLince",
        reorder: "riordinato_PDFLince",
        pdfToImages: "immagini_PDFLince",
        imagesToPdf: "immagini_a_pdf_PDFLince",
      },

      processButton: {
        idleSingle: "Elabora 1 file",
        idleMultiple: (count: number) => `Elabora ${count} file`,
        processing: "Elaborazione...",
        extract: (count: number) =>
          `Estrai ${count} ${count === 1 ? "pagina" : "pagine"}`,
        crop: (count: number) =>
          count > 0 ? `Ritaglia ${count} ${count === 1 ? "pagina" : "pagine"}` : "Ritaglia PDF",
        rotate: (count: number) =>
          count > 0 ? `Ruota ${count} ${count === 1 ? "pagina" : "pagine"}` : "Ruota PDF",
        reorder: "Salva nuovo ordine",
        pdfToImages: {
          single: "Esporta immagini",
          multiple: (count: number) => `Esporta ${count} PDF`,
        },
        imagesToPdf: {
          single: "Crea PDF",
          multiple: (count: number) =>
            `Crea PDF da ${count} immagini`,
        },
      },

      statusMessages: {
        info: (mode: string) => `Elaborazione (${mode})...`,
        compressed: (
          reduction: string,
          original: string,
          next: string,
          seconds: string
        ) =>
          `Compresso. Riduzione: ${reduction}% (${original} → ${next}) in ${seconds}s`,
        merged: "Unione completata",
        split: (count: number) =>
          count > 1
            ? `Generati ${count} file. Download del primo in corso...`
            : "Divisione completata",
        extracted: (count: number) =>
          `Estratte ${count} ${count === 1 ? "pagina" : "pagine"}`,
        cropped: (count: number) =>
          `Ritagliate ${count} ${count === 1 ? "pagina" : "pagine"}`,
        rotated: (count: number) =>
          `Ruotate ${count} ${count === 1 ? "pagina" : "pagine"}`,
        reordered: "Riordinamento completato",
        pdfToImages: (
          count: number,
          format: "png" | "jpeg",
          zipped: boolean
        ) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `Esportate ${count} ${label} ${
                count === 1 ? "immagine" : "immagini"
              } in un archivio ZIP`
            : `Scaricate ${count} ${label} ${
                count === 1 ? "immagine" : "immagini"
              }`;
        },
        imagesToPdf: (count: number) =>
          `Creato un PDF da ${count} ${
            count === 1 ? "immagine" : "immagini"
          }`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },

      errors: {
        noFiles: "Nessun risultato prodotto",
        mergeRequiresTwo: "Seleziona almeno due file da unire",
        noPagesSelected: "Seleziona almeno una pagina",
        invalidFile: "Seleziona un file valido",
        reorderEmpty: "Nessun nuovo ordine rilevato",
        unknown: "Errore sconosciuto",
        modeNotSupported: "Modalità non supportata",
      },

      labels: {
        pagesToExtract: "Seleziona le pagine da estrarre:",
        pagesToCrop: "Seleziona le pagine da ritagliare:",
        pagesToRotate: "Seleziona le pagine da ruotare:",
        reorderPages: "Trascina le pagine per riordinarle:",
      },

      compressionPreview: {
        title: "Anteprima compressione",
        description:
          "Regola le impostazioni per stimare la dimensione finale prima di avviare la compressione.",
        running: "Calcolo anteprima…",
        readyLabel: "Risultato stimato",
        ratio: (percent: string) => `${percent}% più piccolo`,
        saved: (size: string) => `${size} risparmiati`,
        time: (seconds: string) => `≈ ${seconds}s`,
        original: "Originale",
        result: "Stimato",
        notice:
          "L’anteprima viene eseguita in locale. Quando clicchi Elabora riutilizziamo questo risultato, quindi nulla viene caricato.",
        error: "Impossibile generare l’anteprima.",
        retry: "Riprova anteprima",
        universalBadge: "Ottimizzazione universale",
      },

      compressionSummary: {
        title: "Ultima compressione",
        ratio: (percent: string) => `${percent}% più piccolo`,
        saved: (size: string) => `${size} risparmiati`,
        original: "Originale",
        result: "Compresso",
        duration: (seconds: string) =>
          `Completato in ${seconds}s`,
        download: "Scarica di nuovo",
        clear: "Cancella riepilogo",
      },

      donationReminder: {
        message:
          "PDFLince ti ha fatto risparmiare tempo oggi? Il tuo supporto lo mantiene gratuito e privato.",
        actionLabel: "Supporta PDFLince",
        withSavings: (percent: string, saved: string) =>
          `Risparmiati ${saved} (${percent}% in meno)? Aiutaci a mantenere PDFLince privato e senza pubblicità.`,
      },

      statusDialog: {
        processingTitle: "Elaborazione in locale",
        successTitle: "I tuoi file sono pronti",
        successDescription:
          "Il download parte automaticamente. Puoi scaricarli di nuovo.",
        resultsLabel: "Ultimo risultato",
        filesProcessedLabel: (count: number) =>
          `${count} ${
            count === 1 ? "file elaborato" : "file elaborati"
          }`,
        downloadAgainLabel: "Scarica di nuovo",
        errorTitle: "Elaborazione fallita",
        errorDescription:
          "Non siamo riusciti a completare l’operazione. Controlla i file e riprova.",
        retryLabel: "Riprova",
        closeLabel: "Chiudi",
      },

      compressionTotal: {
        title: "Risparmio totale (tutti i file)",
        savings: (size: string) => `${size} risparmiati in totale`,
        count: (count: number) => `${count} file ottimizzati`,
      },
    },
    fileUploader: {
      clickToSelect: "Clicca per selezionare",
      orDrop: (type: "pdf" | "images") =>
        type === "images"
          ? "oppure trascina qui le immagini"
          : "oppure trascina qui i file PDF",
      accepted: {
        pdf: "File PDF",
        images: "Formati accettati: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Dimensione consigliata: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Tipo di file non supportato: ${fileName}. Sono consentiti solo ${label}.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `File troppo grande: ${fileName}. La dimensione massima è ${sizeMb}MB.`,
      },
      dropImagesAlt: "Immagine segnaposto del documento PDF",
    },
    fileList: {
      moveUp: "Sposta su",
      moveDown: "Sposta giù",
      remove: "Rimuovi",
      removeAll: "Rimuovi tutto",
      imageLabel: "Immagine",
      fileLabel: "File",
      selected: "Selezionato",
      pdfLabel: "PDF",
      deselect: "Deseleziona",
      pagesLabel: (count: number) => `${count} ${count === 1 ? "pagina" : "pagine"}`,
      previewLoading: "Caricamento anteprima…",
    },
    pageSelector: {
      loading: "Caricamento pagine PDF...",
      error: "Impossibile caricare le informazioni del PDF",
      summary: (total: number, selected: number) =>
        `${total} pagine rilevate — ${selected} selezionate`,
      selectAll: "Seleziona tutto",
      deselectAll: "Deseleziona tutto",
      pageLabel: (pageNumber: number) => `Pagina ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Visualizzate ${shown} di ${total} pagine. Per estrarre altre pagine, inserisci i loro numeri qui sotto.`,
      manualLabel: "Inserisci numeri di pagina aggiuntivi (es. 21, 25-30, 42)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Caricamento pagine PDF...",
      error: "Impossibile caricare le informazioni del PDF",
      limitReached: (count: number) =>
        `Questo PDF ha ${count} pagine. Per motivi di prestazioni puoi riordinare fino a 120 pagine alla volta.`,
      limitHint:
        "Dividi prima il PDF in parti più piccole e poi riordina ciascuna parte.",
      summary: (count: number) => `${count} pagine pronte da riordinare`,
      reset: "Ripristina ordine originale",
      dragHint: "Trascina per cambiare l’ordine",
      pageLabel: (pageNumber: number) => `Pagina ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Originale: Pagina ${pageNumber}`,
      instructions:
        'Trascina le pagine o usa i pulsanti con le frecce. Quando hai finito, clicca su "Salva nuovo ordine" per applicare le modifiche.',
    },
    processingOptions: {
      compress: {
        title: "Compressione",
        level: "Livello",
        levels: {
          low: "Basso",
          medium: "Medio",
          high: "Alto",
        },
        removeMetadata: "Rimuovi metadati",
        removeMetadataHint:
          "Elimina dettagli nascosti come autore, oggetto e cronologia delle modifiche.",
        stripAnnotations: "Rimuovi annotazioni e commenti",
        stripAnnotationsHint:
          "Rimuove note, campi modulo, firme e azioni del documento.",
        downscaleImages: "Riduci la risoluzione delle immagini incorporate",
        downscaleHint:
          "Ideale per documenti scansionati e PDF ricchi di foto. Mantiene il testo nitido riducendo il peso delle immagini.",
        advancedTitle: "Pulizia avanzata",
        advancedDescription:
          "Mantieni impostazioni semplici oppure attiva solo le opzioni extra che ti servono.",
        activeLabel: "Attivo:",
      },
      merge: {
        title: "Unione",
        pageDivider: "Pagina vuota tra i documenti",
        metadataTitle: "Titolo del documento unito (opzionale)",
        metadataAuthor: "Autore del documento unito (opzionale)",
        metadataHint:
          "Imposta metadati personalizzati per il PDF unito. Lascia vuoto per mantenere quelli predefiniti.",
      },
      split: {
        title: "Divisione",
        pagesPerFile: "Pagine per file",
        pagesPerFileHint:
          "Creeremo un nuovo PDF dopo ogni gruppo di N pagine.",
      },
      extract: {
        title: "Estrazione",
        preserveMetadata: "Mantieni i metadati originali",
        preserveMetadataHint:
          "Conserva titolo, autore e altri dettagli del documento nel file estratto.",
      },
      crop: {
        title: "Ritaglio",
        hint: "Seleziona le pagine da ritagliare e definisci quanti punti rimuovere da ogni lato.",
        inputModeLabel: "Metodo di ritaglio",
        inputModes: {
          margins: "Imposta margini",
          manual: "Selezione manuale",
        },
        marginLabels: {
          top: "Margine superiore (pt)",
          right: "Margine destro (pt)",
          bottom: "Margine inferiore (pt)",
          left: "Margine sinistro (pt)",
        },
        marginHint: "72 pt corrispondono a circa 1 pollice. Inizia con valori piccoli per non tagliare il contenuto.",
        preserveMetadata: "Mantieni i metadati originali",
        preserveMetadataHint: "Conserva titolo, autore e altri dettagli del documento nel file ritagliato.",
        manual: {
          title: "Selezione manuale del ritaglio",
          hint: "Trascina sull'anteprima per definire l'area visibile. Convertiamo la selezione negli stessi margini usati dal flusso di ritaglio attuale.",
          loading: "Caricamento anteprima ritaglio...",
          error: "Impossibile caricare l'anteprima del ritaglio.",
          reset: "Reimposta selezione",
          pagePreview: (pageNumber: number) => `Anteprima pagina ${pageNumber}`,
        },
      },
      rotate: {
        title: "Rotazione",
        hint: "Scegli la direzione e poi seleziona le pagine da ruotare.",
        rotateRight90: "Ruota di 90 gradi a destra",
        rotate180: "Ruota di 180 gradi",
        rotateLeft90: "Ruota di 90 gradi a sinistra",
      },
      reorder: {
        title: "Riordino",
        hint: "Trascina le miniature per cambiare l’ordine.",
      },
      pdfToImages: {
        title: "Esportazione immagini",
        formatLabel: "Formato immagine",
        formatHint:
          "Scegli PNG per una qualità senza perdita o JPEG per file più leggeri.",
        pngLabel: "PNG (senza perdita)",
        jpegLabel: "JPEG (file più piccolo)",
        qualityLabel: "Qualità JPEG",
        qualityHint:
          "Una qualità più alta preserva più dettagli ma produce immagini più grandi.",
        dpiLabel: "DPI di rendering",
        dpiHint:
          "Un DPI più alto aumenta nitidezza e dimensione del file. 144 DPI è adatto per slide e schermi.",
        dpiPresets: {
          screen: "72 DPI · Schermo",
          balanced: "144 DPI · Bilanciato",
          print: "300 DPI · Stampa",
        },
        zipLabel: "Raggruppa le immagini in uno ZIP",
        zipHint:
          "Scarica un unico archivio invece di avviare un download per ogni pagina.",
        baseNameLabel: "Nome file di base",
        baseNamePlaceholder: "pagine_pdflince",
        baseNameHint:
          "Lo useremo come prefisso per i file esportati. Lascia vuoto per riutilizzare il nome del PDF.",
      },
      imagesToPdf: {
        title: "Layout",
        layoutTitle: "Layout pagina",
        fitLabel: "Adattamento immagine",
        fitOptions: {
          contain: "Contieni (mostra l’immagine intera)",
          cover: "Riempi (occupa tutta la pagina)",
        },
        sizeLabel: "Dimensione pagina",
        sizeOptions: {
          auto: "Automatica (adatta all’immagine)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "Orientamento",
        orientationOptions: {
          auto: "Automatico",
          portrait: "Verticale",
          landscape: "Orizzontale",
        },
        marginLabel: "Margini (pt)",
        marginHint:
          "Aggiunge spazio bianco intorno all’immagine. 72 pt ≈ 1 pollice.",
        backgroundLabel: "Colore di sfondo",
        backgroundHint:
          "Applicato dietro le immagini e in tutte le aree della pagina non coperte.",
      },
    },
    cookieBanner: {
      message:
        "Usiamo i cookie per analizzare il traffico e migliorare la tua esperienza. Non condividiamo i tuoi dati personali.",
      accept: "Accetta",
      decline: "Rifiuta",
    },
    },
    pages: {
      home: {
        hero: {
          title: "PDFLince: comprimi, unisci e converti PDF online gratis",
          subtitle:
            "Comprimi PDF, unisci PDF, dividi documenti, estrai pagine e converti PDF in immagini o immagini in PDF direttamente nel browser. Nessun upload, massima privacy, sempre gratis.",
          badges: [
            "Comprimi PDF velocemente",
            "Unisci PDF senza limiti",
            "Elaborazione locale",
            "Supporta PDFLince",
          ],
          imageAlt: "Illustrazione di un documento PDF",
          ctaLinks: [
            {
              label: "PDF in immagini",
              href: operationsRoutes.pdfToImages,
              description: "Esporta le pagine come PNG o JPEG",
            },
            {
              label: "Immagini in PDF",
              href: operationsRoutes.imagesToPdf,
              description: "Combina JPG, PNG o WEBP",
            },
          ],
        },
        why: {
          title: "Perché usare PDFLince?",
          cards: [
            {
              title: "Privacy prima di tutto",
              description:
                "I tuoi PDF non lasciano mai il tuo dispositivo. Tutto avviene nel browser.",
              icon: "🔒",
            },
            {
              title: "Veloce ed efficiente",
              description:
                "Il nostro motore locale offre prestazioni elevate senza upload nel cloud o elaborazioni in background.",
              icon: "⚡",
            },
            {
              title: "Funziona ovunque",
              description:
                "Desktop, tablet o telefono — se hai un browser moderno, sei pronto.",
              icon: "📱",
            },
          ],
        },
        callout: {
          title: "Aiutaci a mantenere PDFLince gratuito",
          description:
            "Ogni donazione copre hosting, tempo di sviluppo e ci permette di mantenere un’esperienza 100% privata, senza pubblicità né tracker.",
          ctaLabel: "Supporta il progetto",
          ctaUrl: getRoutePath(locale, "support"),
          secondaryLabel: "Scopri come usiamo i fondi",
          secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
        },
      },
      faq: {
        title: "Domande frequenti",
        intro: "Risposte alle domande più comuni su PDFLince",
        cta: {
          title: "Prova PDFLince ora",
          description:
            "Unisci, comprimi, dividi, estrai e riordina PDF con la massima privacy. Nessuna registrazione, nessun upload.",
          ctaLabel: "Vai agli strumenti",
        },
      },
      support: {
        hero: {
          eyebrow: "🌱 Progetto indipendente",
          title: "Aiutaci a mantenere PDFLince gratuito e privato",
          subtitle:
            "PDFLince è un piccolo progetto nato dalla passione. Il tuo supporto copre i server e ci dà il tempo di rifinire nuove funzionalità.",
          highlight: "Solo un piccolo strumento che rispetta la tua privacy.",
        },
        reasons: {
          title: "Perché donare?",
          cards: [
            {
              title: "Mantienilo gratuito",
              description:
                "Le donazioni ci permettono di mantenere PDFLince gratuito al 100% per tutti, senza piani premium o funzioni bloccate.",
              icon: "💚",
            },
            {
              title: "Migliora continuamente",
              description:
                "Il tuo supporto finanzia correzioni di bug, nuovi strumenti e tutte quelle rifiniture che rendono il lavoro sui PDF più veloce.",
              icon: "✨",
            },
            {
              title: "Proteggi la privacy",
              description:
                "Elaboriamo tutto in locale, così i tuoi PDF restano sul tuo dispositivo. Le donazioni ci aiutano a continuare così.",
              icon: "🔒",
            },
          ],
        },
        tiers: {
          title: "Dona ciò che puoi",
          description: "Ogni importo aiuta. Pagamento sicuro tramite Stripe.",
          cards: [
            {
              id: "coffee",
              title: "Offrici un caffè",
              amount: "€3",
              description: "Copre l’hosting per un paio di settimane.",
              ctaLabel: "Dona 3 €",
              ctaHref: "#stripe-checkout-coffee",
            },
            {
              id: "monthly",
              title: "Supporto mensile",
              amount: "€10/mese",
              description:
                "Ci dà tempo ogni settimana per migliorare PDFLince.",
              ctaLabel: "Dona 10 €/mese",
              ctaHref: "#stripe-checkout-monthly",
              badge: "💙 Grazie",
            },
            {
              id: "custom",
              title: "Importo personalizzato",
              amount: "Qualsiasi cifra",
              description:
                "Ogni euro conta. Scegli l’importo che preferisci.",
              ctaLabel: "Scegli importo",
              ctaHref: "#stripe-checkout-custom",
            },
          ],
          note:
            "Pagamenti sicuri con Stripe. Puoi annullare le donazioni ricorrenti quando vuoi.",
        },
        transparency: {
          title: "Come vengono usati i fondi",
          items: [
            "Hosting e CDN per mantenere il sito veloce in tutto il mondo",
            "Tempo di sviluppo per correzioni e nuove funzionalità",
            "Migliorie di design e UX per rendere tutto più fluido",
            "Traduzioni e documentazione per tutte le lingue supportate",
          ],
        },
        faq: {
          title: "Domande",
          entries: [
            {
              question: "E se non posso donare?",
              answer:
                "Nessun problema. PDFLince resterà gratuito. Condividere lo strumento o raccontarci come ti ha aiutato è già un supporto fantastico.",
            },
            {
              question: "Riceverò una ricevuta?",
              answer:
                "Sì. Stripe ti invierà automaticamente una ricevuta via email con tutti i dettagli del pagamento.",
            },
            {
              question: "Come annullo una donazione ricorrente?",
              answer:
                "Puoi gestirla dal tuo portale Stripe oppure scriverci via email e la annulleremo noi, senza fare domande.",
            },
          ],
        },
        closing: {
          title: "Grazie di essere qui",
          description:
            "Ogni persona che sostiene PDFLince aiuta a mantenere vivo per tutti un toolkit PDF utile e attento alla privacy.",
          ctaLabel: "Scrivi al team",
          ctaHref: "mailto:info@pdflince.com?subject=Ciao%20team%20PDFLince",
        },
        legalNotice: {
          title: "Note legali e di trasparenza",
          points: [
            "PDFLince è un progetto personale indipendente gestito da un piccolo team di volontari.",
            "I contributi sono volontari e aiutano a coprire hosting, strumenti e tempo di sviluppo.",
            "I pagamenti non sono donazioni di beneficenza e non danno diritto a detrazioni fiscali; Stripe invierà automaticamente una ricevuta.",
            "Il servizio è fornito così com’è, senza garanzie. Domande? Scrivici a info@pdflince.com.",
          ],
        },
      },
    },
    faqs: faqsIt,
    operations: operationsIt,
  };   
