import { OperationContent } from "../operation-types";
import { OperationKey } from "../../../types/operations";

const operationsItContent: Record<OperationKey, OperationContent> = {
  compress: {
    key: "compress",
    slug: "compress",
    mode: "compress",
    meta: {
      title: "Comprimi PDF online gratis | Riduci dimensione | PDFLince",
      description:
        "Riduci la dimensione dei file PDF in modo efficiente senza perdita di qualità. Compressione gratuita e privata direttamente nel tuo browser.",
      keywords: [
        "comprimi pdf",
        "riduci dimensione pdf",
        "ottimizza pdf",
        "compressore pdf",
        "pdf leggero",
      ],
      ogTitle: "Comprimi PDF senza perdere qualità | PDFLince",
      ogDescription:
        "Carica il tuo file, scegli il livello di compressione ottimale e scarica un PDF molto più leggero in pochi secondi — completamente sicuro senza caricamenti su server.",
      ogImageAlt: "Interfaccia dello strumento di compressione PDFLince",
    },
    hero: {
      title: "Comprimi PDF online con risultati chiari",
      description:
        "Riduci la dimensione del documento per rispettare i limiti di email, piattaforme o procedure pubbliche mantenendo ogni pagina leggibile.",
      bulletPoints: [
        "Elaborazione 100% locale — i tuoi file non lasciano mai il browser",
        "Scegli compressione base, media o aggressiva in base alle tue esigenze",
        "Mantieni metadati e struttura del documento quando necessario",
      ],
      imageAlt: "Flusso di compressione PDF in PDFLince",
    },
    benefitsTitle: "Perché comprimere PDF con PDFLince",
    benefits: [
      {
        title: "Qualità bilanciata",
        description:
          "Il nostro motore di compressione analizza ogni elemento per ottenere la massima riduzione senza sfocare testo o grafica.",
      },
      {
        title: "Pronto per l’invio",
        description:
          "Crea file che rispettano i limiti di caricamento su portali pubblici, università o workflow aziendali.",
      },
      {
        title: "Privacy by design",
        description:
          "Evita caricamenti su server e riduci i rischi di fuga di dati rispettando le policy interne senza sforzo.",
      },
    ],
    howTo: {
      title: "Come comprimere un PDF con PDFLince",
      steps: [
        "Clicca su “Carica i tuoi file” e seleziona il PDF da ottimizzare.",
        "Scegli il livello di compressione e regola le opzioni avanzate come il mantenimento dei metadati.",
        "Premi “Processa” e scarica il documento compresso in pochi secondi.",
      ],
      note:
        "Hai più documenti? Comprimili uno alla volta senza limiti giornalieri o filigrane.",
    },
    useCasesTitle: "Quando ha senso comprimere",
    useCases: [
      "Invia contratti, fatture o manuali via email senza superare i limiti degli allegati.",
      "Carica compiti su Moodle, Canvas o qualsiasi LMS con limiti rigorosi.",
      "Riduci tesi, cataloghi o articoli per migliorare la velocità di download.",
      "Archivia documenti nel cloud risparmiando spazio senza perdere dettagli importanti.",
    ],
  },

  imagesToPdf: {
    key: "imagesToPdf",
    slug: "images-to-pdf",
    mode: "imagesToPdf",
    meta: {
      title: "Crea PDF da immagini | JPG, PNG in PDF | PDFLince",
      description:
        "Crea un PDF professionale dalle tue immagini. Ordina le foto, personalizza layout e margini e genera il documento localmente nel browser.",
      keywords: [
        "immagini in pdf",
        "jpg in pdf",
        "png in pdf",
        "webp in pdf",
        "crea pdf da immagini",
      ],
      ogTitle: "Crea un PDF pulito dalle tue immagini | PDFLince",
      ogDescription:
        "Trascina le immagini, definisci il layout ed esporta un PDF pronto per la stampa — senza caricamenti o filigrane.",
      ogImageAlt: "Creazione di un PDF da immagini in PDFLince",
    },
    hero: {
      title: "Crea un PDF ordinato dalle immagini",
      description:
        "Raggruppa scansioni, foto o grafiche in un unico PDF pronto da condividere.",
      bulletPoints: [
        "Trascina per definire l’ordine delle pagine",
        "Scegli dimensione pagina, orientamento e margini",
        "Imposta uno sfondo solido per evitare trasparenze indesiderate",
      ],
      imageAlt: "Flusso immagini a PDF",
    },
    benefitsTitle: "Perché creare PDF da immagini con PDFLince",
    benefits: [
      {
        title: "Layout coerente",
        description:
          "Uniforma diversi formati immagine in un PDF senza distorsioni o tagli imprevisti.",
      },
      {
        title: "Pronto per stampa e revisione",
        description:
          "Regola margini e orientamento per ottenere un PDF perfetto su schermo e carta.",
      },
      {
        title: "Elaborazione sicura",
        description:
          "Tutto avviene localmente nel browser, ideale per documenti sensibili.",
      },
    ],
    howTo: {
      title: "Come convertire immagini in PDF",
      steps: [
        "Aggiungi le immagini e riordinalle.",
        "Configura layout, dimensioni e margini.",
        "Clicca su “Crea PDF” per scaricare il file.",
      ],
      note:
        "Hai molti file? Puoi comprimere o dividere il PDF dopo senza ricaricare le immagini.",
    },
    useCasesTitle: "Quando usare immagini in PDF",
    useCases: [
      "Unire scansioni di esercizi o test.",
      "Raggruppare ricevute in un unico file.",
      "Creare cataloghi o presentazioni.",
      "Raccogliere prove fotografiche in un documento.",
    ],
  },

  merge: {
    key: "merge",
    slug: "merge",
    mode: "merge",
    meta: {
      title: "Unisci PDF online | Combina più PDF gratis | PDFLince",
      description:
        "Combina più file PDF in un unico documento organizzato senza limiti di pagine.",
      keywords: [
        "unisci pdf",
        "combina pdf",
        "unire file pdf",
        "pdf merger",
        "unire documenti",
      ],
      ogTitle: "Unisci PDF in pochi secondi | PDFLince",
      ogDescription:
        "Organizza i documenti e scarica un unico PDF senza caricare dati nel cloud.",
      ogImageAlt: "Unione PDF",
    },
    hero: {
      title: "Unisci PDF online — veloce e sicuro",
      description:
        "Crea un unico file pronto da inviare o archiviare.",
      bulletPoints: [
        "Drag and drop per l’ordine",
        "Nessun limite nascosto",
        "Mantieni segnalibri e metadati",
      ],
      imageAlt: "Unione documenti PDF",
    },
    benefitsTitle: "Vantaggi dell’unione PDF",
    benefits: [
      {
        title: "Consegna coerente",
        description: "Un unico file con formattazione uniforme.",
      },
      {
        title: "Risparmio di tempo",
        description: "Nessun software pesante richiesto.",
      },
      {
        title: "Privato",
        description: "Nessun dato salvato o richiesto.",
      },
    ],
    howTo: {
      title: "Come unire PDF",
      steps: [
        "Carica almeno due PDF.",
        "Riordina i file.",
        "Scarica il PDF unito.",
      ],
      note: "Puoi aggiungere file in qualsiasi momento.",
    },
    useCasesTitle: "Quando unire PDF",
    useCases: [
      "Creare dossier completi.",
      "Unire fatture.",
      "Materiale per studenti.",
      "Pacchetti legali.",
    ],
  },

  split: {
    key: "split",
    slug: "split",
    mode: "split",
    meta: {
      title: "Dividi PDF per pagine | Tool gratuito | PDFLince",
      description:
        "Dividi PDF in più file senza caricamenti su server.",
      keywords: [
        "dividi pdf",
        "separa pdf",
        "pdf splitter",
      ],
      ogTitle: "Dividi PDF con precisione | PDFLince",
      ogDescription:
        "Scegli come dividere il documento e scaricalo subito.",
      ogImageAlt: "Divisione PDF",
    },
    hero: {
      title: "Dividi PDF per pagine",
      description:
        "Estrai sezioni specifiche.",
      bulletPoints: [
        "Configura divisioni",
        "Più file in una volta",
        "Nessun limite",
      ],
      imageAlt: "Divisione PDF",
    },
    benefitsTitle: "Vantaggi",
    benefits: [
      {
        title: "Controllo",
        description: "Condividi solo ciò che serve.",
      },
      {
        title: "Scalabilità",
        description: "Più file insieme.",
      },
      {
        title: "Flessibilità",
        description: "Adatta al workflow.",
      },
    ],
    howTo: {
      title: "Come dividere PDF",
      steps: [
        "Carica il file.",
        "Scegli modalità.",
        "Scarica i file.",
      ],
      note: "Download automatico.",
    },
    useCasesTitle: "Uso",
    useCases: [
      "Corsi online.",
      "Separare allegati.",
      "Report.",
      "Documenti clienti.",
    ],
  },

  extract: {
    key: "extract",
    slug: "extract",
    mode: "extract",
    meta: {
      title: "Estrai pagine PDF | PDFLince",
      description:
        "Seleziona pagine specifiche e crea un nuovo PDF.",
      keywords: [
        "estrai pagine pdf",
      ],
      ogTitle: "Estrai pagine | PDFLince",
      ogDescription:
        "Crea PDF personalizzati.",
      ogImageAlt: "Estrazione PDF",
    },
    hero: {
      title: "Estrai pagine PDF",
      description:
        "Crea documenti su misura.",
      bulletPoints: [
        "Selezione facile",
        "Numerazione",
        "Download rapido",
      ],
      imageAlt: "Estrazione",
    },
    benefitsTitle: "Vantaggi",
    benefits: [
      {
        title: "Documenti rilevanti",
        description: "Solo contenuto utile.",
      },
      {
        title: "Controllo",
        description: "Tutto nel browser.",
      },
      {
        title: "Qualità",
        description: "PDF puliti.",
      },
    ],
    howTo: {
      title: "Come estrarre",
      steps: [
        "Carica PDF.",
        "Seleziona pagine.",
        "Scarica.",
      ],
      note: "Puoi combinarlo con altre operazioni.",
    },
    useCasesTitle: "Uso",
    useCases: [
      "Manuali.",
      "Contratti.",
      "Dossier.",
      "Archiviazione.",
    ],
  },

  crop: {
    key: "crop",
    slug: "ritaglia",
    mode: "crop",
    meta: {
      title: "Ritaglia pagine PDF online | Riduci margini | PDFLince",
      description:
        "Ritaglia pagine PDF e rimuovi i margini in eccesso direttamente nel browser. Tutto resta locale e privato.",
      keywords: [
        "ritaglia pdf",
        "taglia margini pdf",
        "riduci margini pdf",
        "crop pdf",
        "ritaglia pagine pdf",
      ],
      ogTitle: "Ritaglia pagine PDF in locale | PDFLince",
      ogDescription:
        "Seleziona le pagine, imposta i margini e scarica un PDF piu pulito senza caricare file.",
      ogImageAlt: "Ritaglio di pagine PDF in PDFLince",
    },
    hero: {
      title: "Ritaglia pagine PDF e pulisci i margini",
      description:
        "Rimuovi spazio bianco superfluo dalle pagine selezionate e scarica un documento piu compatto in pochi secondi.",
      bulletPoints: [
        "Seleziona solo le pagine da ritagliare",
        "Regola margini superiore, destro, inferiore e sinistro con precisione",
        "Elaborazione 100% locale senza server",
      ],
      imageAlt: "Flusso di ritaglio PDF",
    },
    benefitsTitle: "Perche ritagliare PDF con PDFLince",
    benefits: [
      {
        title: "Pagine piu pulite",
        description: "Riduci bordi vuoti e concentra l'attenzione sul contenuto utile.",
      },
      {
        title: "Modifica selettiva",
        description: "Applica il ritaglio solo alle pagine che ne hanno bisogno senza rifare l'intero documento.",
      },
      {
        title: "Privacy totale",
        description: "I file restano sul tuo dispositivo per tutta l'operazione.",
      },
    ],
    howTo: {
      title: "Come ritagliare pagine PDF",
      steps: [
        "Carica il PDF e scegli il file che vuoi modificare.",
        "Seleziona le pagine e imposta i margini superiore, destro, inferiore e sinistro.",
        "Clicca su Processa per scaricare un nuovo PDF con il ritaglio applicato.",
      ],
      note:
        "Se gruppi diversi di pagine richiedono ritagli differenti, ripeti il processo separatamente.",
    },
    useCasesTitle: "Quando ritagliare un PDF",
    useCases: [
      "Rimuovere bordi di scanner da moduli, ricevute o documenti firmati.",
      "Ridurre margini prima di stampare o unire file.",
      "Uniformare pagine esportate da strumenti diversi.",
      "Preparare report, manuali o materiali di studio con un layout piu compatto.",
    ],
  },

  rotate: {
    key: "rotate",
    slug: "ruota",
    mode: "rotate",
    meta: {
      title: "Ruota pagine PDF online | Correggi orientamento | PDFLince",
      description:
        "Ruota pagine PDF selezionate di 90 o 180 gradi direttamente nel browser. Gratis, privato e senza upload.",
      keywords: [
        "ruota pdf",
        "ruota pagine pdf",
        "correggi orientamento pdf",
        "pdf storto",
        "rotazione pagine pdf",
      ],
      ogTitle: "Ruota pagine PDF in pochi secondi | PDFLince",
      ogDescription:
        "Seleziona le pagine con orientamento errato, scegli 90 o 180 gradi e scarica il PDF corretto senza caricare nulla.",
      ogImageAlt: "Rotazione di pagine PDF in PDFLince",
    },
    hero: {
      title: "Ruota pagine PDF senza perdere qualita",
      description:
        "Correggi scansioni storte, pagine capovolte o documenti con orientamenti misti in pochi clic.",
      bulletPoints: [
        "Ruota solo le pagine selezionate e non l'intero documento",
        "Scegli 90 gradi a destra, 180 gradi o 90 gradi a sinistra",
        "Tutto avviene nel browser senza upload",
      ],
      imageAlt: "Flusso di rotazione PDF",
    },
    benefitsTitle: "Perche ruotare pagine con PDFLince",
    benefits: [
      {
        title: "Correzioni precise",
        description: "Regola solo le pagine che ne hanno bisogno, ideale per scansioni e report lunghi.",
      },
      {
        title: "Correzione rapida",
        description: "Sistema l'orientamento in pochi secondi senza aprire editor pesanti.",
      },
      {
        title: "Privacy by design",
        description: "I documenti restano sul tuo dispositivo perche la rotazione e locale.",
      },
    ],
    howTo: {
      title: "Come ruotare pagine PDF",
      steps: [
        "Carica il PDF e scegli il file con le pagine da correggere.",
        "Seleziona le pagine e imposta 90 gradi a destra, 180 gradi o 90 gradi a sinistra.",
        "Clicca su Processa per scaricare il PDF con il nuovo orientamento.",
      ],
      note:
        "Dopo puoi anche riordinare, estrarre o comprimere il file corretto.",
    },
    useCasesTitle: "Quando ruotare pagine aiuta",
    useCases: [
      "Correggere contratti o moduli scansionati di lato.",
      "Sistemare pagine capovolte in report creati da fonti diverse.",
      "Preparare dispense e manuali prima della condivisione.",
      "Rendere piu comodi da leggere a schermo i PDF di archivio.",
    ],
  },

  reorder: {
    key: "reorder",
    slug: "reorder",
    mode: "reorder",
    meta: {
      title: "Riordina pagine PDF | PDFLince",
      description:
        "Organizza le pagine facilmente.",
      keywords: [
        "riordina pdf",
      ],
      ogTitle: "Riordina PDF",
      ogDescription:
        "Sistema l’ordine delle pagine.",
      ogImageAlt: "Riordino PDF",
    },
    hero: {
      title: "Riordina pagine PDF",
      description:
        "Sistema l’ordine velocemente.",
      bulletPoints: [
        "Anteprime grandi",
        "Drag and drop",
        "Mantieni link",
      ],
      imageAlt: "Riordino",
    },
    benefitsTitle: "Vantaggi",
    benefits: [
      {
        title: "Velocità",
        description: "Correzioni rapide.",
      },
      {
        title: "Precisione",
        description: "Controllo visivo.",
      },
      {
        title: "Privacy",
        description: "Locale.",
      },
    ],
    howTo: {
      title: "Come riordinare",
      steps: [
        "Carica PDF.",
        "Trascina pagine.",
        "Scarica.",
      ],
      note: "Modifiche continue.",
    },
    useCasesTitle: "Uso",
    useCases: [
      "Presentazioni.",
      "Documenti.",
      "Scansioni.",
      "Manuali.",
    ],
  },

  pdfToImages: {
    key: "pdfToImages",
    slug: "pdf-to-images",
    mode: "pdfToImages",
    meta: {
      title: "PDF in immagini | PNG o JPEG | PDFLince",
      description:
        "Converti PDF in immagini di alta qualità.",
      keywords: [
        "pdf in immagini",
      ],
      ogTitle: "PDF in immagini",
      ogDescription:
        "Esporta pagine.",
      ogImageAlt: "PDF immagini",
    },
    hero: {
      title: "Converti PDF in immagini",
      description:
        "Ottieni immagini di ogni pagina.",
      bulletPoints: [
        "PNG o JPEG",
        "ZIP",
        "Locale",
      ],
      imageAlt: "Conversione",
    },
    benefitsTitle: "Vantaggi",
    benefits: [
      {
        title: "Qualità",
        description: "Alta risoluzione.",
      },
      {
        title: "Flessibilità",
        description: "Download vari.",
      },
      {
        title: "Privacy",
        description: "Sicuro.",
      },
    ],
    howTo: {
      title: "Come convertire",
      steps: [
        "Carica PDF.",
        "Scegli formato.",
        "Scarica.",
      ],
      note: "Puoi estrarre prima.",
    },
    useCasesTitle: "Uso",
    useCases: [
      "Preview.",
      "CMS.",
      "Tablet.",
      "Revisioni.",
    ],
  },
};

export const operationsIt: Record<OperationKey, OperationContent> = {
  merge: operationsItContent.merge,
  compress: operationsItContent.compress,
  split: operationsItContent.split,
  extract: operationsItContent.extract,
  crop: operationsItContent.crop,
  rotate: operationsItContent.rotate,
  reorder: operationsItContent.reorder,
  pdfToImages: operationsItContent.pdfToImages,
  imagesToPdf: operationsItContent.imagesToPdf,
};
