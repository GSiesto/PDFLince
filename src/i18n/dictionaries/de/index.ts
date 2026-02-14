import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";
import { operationsDe } from "./operations";
import { faqsDe } from "./faqs";

const locale = "de" as const;
const { label, nativeName, htmlLang, hrefLang } = localeLabels[locale];
const siteUrl = "https://pdflince.com";
const homePath = getRoutePath(locale, "home");

const operationRoutes: Record<OperationKey, string> = {
  merge: getOperationPath(locale, "merge"),
  compress: getOperationPath(locale, "compress"),
  split: getOperationPath(locale, "split"),
  extract: getOperationPath(locale, "extract"),
  reorder: getOperationPath(locale, "reorder"),
  pdfToImages: getOperationPath(locale, "pdfToImages"),
  imagesToPdf: getOperationPath(locale, "imagesToPdf"),
};

export const deDictionary: Dictionary = {
  locale,
  localeLabel: label,
  nativeName,
  htmlLang,
  hrefLang,
  routes: {
    home: homePath,
    faq: getRoutePath(locale, "faq"),
    support: getRoutePath(locale, "support"),
    operations: operationRoutes,
  },
  metadata: {
    site: {
      title: "PDFLince – PDFs zusammenführen, komprimieren und konvertieren | Keine Uploads",
      description:
        "PDFLince ist ein datenschutzfreundliches PDF-Toolkit zum Zusammenführen, Komprimieren, Teilen, Extrahieren, Neuordnen und Konvertieren von PDFs in Bilder oder wieder zurück – alles direkt im Browser auf deinem Gerät, ganz ohne Uploads.",
      keywords: [
        "pdf zusammenführen",
        "pdf komprimieren",
        "pdf teilen",
        "pdf seiten extrahieren",
        "pdf seiten neu ordnen",
        "pdf zu bildern",
        "bilder zu pdf",
        "pdf konvertieren",
        "pdf online konvertieren",
        "pdf zu png",
        "jpg zu pdf",
        "pdf offline bearbeiten",
        "pdf toolkit",
        "pdf datenschutz",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "PDFLince – Zusammenführen, Komprimieren, Teilen, PDF zu Bild & Bild zu PDF",
        description:
          "Zusammenführen, komprimieren, teilen, extrahieren, neu ordnen und in Bilder konvertieren – alles ohne Upload. Kostenlos, privat und mit vollständig lokaler Verarbeitung.",
        url: `${siteUrl}${homePath}`,
        locale: "de_DE",
        type: "website",
        imageUrl: "https://pdflince.com/og-image.jpg",
        imageAlt: "PDFLince – Private und kostenlose PDF-Bearbeitung",
      },
    },
    faq: {
      title: "Häufige Fragen | PDFLince – Kostenloses PDF-Toolkit",
      description:
        "Antworten auf die wichtigsten Fragen zu PDFLince. Erfahre, wie du PDFs zusammenführst, komprimierst, teilst, Seiten extrahierst, neu ordnest und in Bilder oder PDFs umwandelst – ganz ohne Upload.",
      keywords: [
        "pdflince faq",
        "pdf fragen",
        "pdf hilfe",
        "pdf zusammenführen tipps",
        "pdf komprimieren tipps",
        "pdf teilen hilfe",
        "seiten neu ordnen",
        "pdf zu bildern",
        "bilder zu pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "PDFLince unterstützen | Halte das Tool privat und kostenlos",
      description:
        "Deine Spende hält PDFLince klein, unabhängig und datenschutzfreundlich. Hilf mit, Hosting und Weiterentwicklung zu finanzieren.",
      keywords: [
        "pdflince spende",
        "pdf toolkit unterstützen",
        "projekt datenschutz finanzieren",
        "pdflince stripe",
        "pdflince kostenlos halten",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    operations: operationsDe,
  },
  brand: {
    name: "PDFLince",
    tagline: "Lokale Verarbeitung • 100 % privat",
  },
  components: {
    nav: {
      home: "Startseite",
      faq: "FAQ",
      support: "Unterstützen",
      photo: "FotoLince",
      languageLabel: "Sprache",
      menuLabel: "Navigationsmenü öffnen",
    },
    footer: {
      privacy: "Lokale Verarbeitung • 100 % privat • Offene Lizenzen",
      rights: `© ${new Date().getFullYear()} PDFLince — Werkzeuge zur PDF-Bearbeitung ohne Datenschutzkompromisse`,
      links: {
        home: "Startseite",
        faq: "FAQ",
        support: "Unterstützen",
        photo: "FotoLince",
        contact: "Kontakt",
      },
      capabilitiesLabel: "Beliebte Aktionen",
      operations: {
        merge: "PDFs zusammenführen",
        compress: "PDF komprimieren",
        split: "PDF teilen",
        extract: "Seiten extrahieren",
        reorder: "Seiten neu ordnen",
        pdfToImages: "PDF in Bilder",
        imagesToPdf: "Bilder zu PDF",
      },
      license: "PDF-Verarbeitung: PDF-lib (MIT), PDF.js (Apache 2.0) • Schriftart: Geist (MIT)",
      disclaimer: "Der Dienst wird 'wie besehen' ohne jegliche Gewährleistung bereitgestellt. Der Benutzer ist für die Verwendung der generierten Dateien verantwortlich.",
    },
    notifications: {
      labels: {
        success: "Erfolg",
        error: "Fehler",
        info: "Hinweis",
        warning: "Warnung",
      },
      closeLabel: "Schließen",
    },
    fotolinceBanner: {
      eyebrow: "Bilder schnell optimieren?",
      title: "Komprimiere, skaliere oder konvertiere Fotos mit FotoLince",
      description:
        "Unser Schwester-Tool verarbeitet JPG, PNG und WEBP direkt im Browser – ideal, bevor du sie in ein PDF einfügst.",
      ctaLabel: "Zu FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "FotoLince Logo",
    },
    feedback: {
      question: "War das hilfreich?",
      thanks: "Danke für dein Feedback!",
      whatWrong: "Sag uns, was schiefgelaufen ist",
      emailSubject: "Feedback zu PDFLince",
    },
    pdfProcessor: {
      title: "Wähle eine Operation",
      modes: {
        merge: {
          label: "PDFs zusammenführen",
          helper: "Ordne PDFs, um sie zu einem Dokument zu kombinieren.",
        },
        compress: {
          label: "PDF komprimieren",
          helper: "Reduziere die Dateigröße eines PDFs. Verarbeite pro Durchlauf eine Datei, um die Qualität zu sichern.",
        },
        split: {
          label: "PDF teilen",
          helper: "Wähle PDFs aus und trenne sie in mehrere Dateien.",
        },
        extract: {
          label: "Seiten extrahieren",
          helper: "Markiere spezifische Seiten für ein neues Dokument.",
        },
        reorder: {
          label: "Seiten neu ordnen",
          helper: "Ändere die Reihenfolge der Seiten innerhalb eines PDFs.",
        },
        pdfToImages: {
          label: "PDF in Bilder",
          helper: "Exportiere jede PDF-Seite als PNG oder JPEG – komplett ohne Upload.",
        },
        imagesToPdf: {
          label: "Bilder zu PDF",
          helper: "Kombiniere JPG, PNG oder WEBP zu einem einzigen PDF mit passendem Layout.",
        },
      },
      upload: {
        title: "Dateien auswählen",
        clearAll: "Alles löschen",
        listHeadings: {
          merge: "Dateien zum Zusammenführen (Reihenfolge festlegen):",
          extract: "Datei auswählen, um mit den Seiten zu arbeiten:",
          reorder: "Datei auswählen, um mit den Seiten zu arbeiten:",
          pdfToImages: "PDFs zum Konvertieren (werden nacheinander verarbeitet):",
          imagesToPdf: "Bilder zum Kombinieren (Reihenfolge festlegen):",
          default: "Ausgewählte Dateien (neu anordnen oder entfernen):",
        },
        hints: {
          compress: "Jede Datei wird einzeln komprimiert und balanciert Qualität und Größe.",
          split: "Jedes PDF wird entsprechend der Optionen im nächsten Schritt geteilt.",
          pdfToImages: "Wir rendern ein PDF nach dem einen. Stelle Format und DPI im Optionsbereich vor dem Export ein.",
          imagesToPdf: "Ziehe JPG, PNG, WEBP oder TIFF hinein. Wähle Seitenformat, Ausrichtung und Ränder im Optionspanel.",
        },
      },
      downloadNames: {
        compress: "komprimiert_PDFLince",
        merge: "zusammengefuegt_PDFLince",
        split: "teil_PDFLince",
        extract: "extrahiert_PDFLince",
        reorder: "neu_geordnet_PDFLince",
        pdfToImages: "bilder_PDFLince",
        imagesToPdf: "bilder_zu_pdf_PDFLince",
      },
      processButton: {
        idleSingle: "1 Datei verarbeiten",
        idleMultiple: (count: number) => `${count} Dateien verarbeiten`,
        processing: "Verarbeitung läuft...",
        extract: (count: number) =>
          `${count} ${count === 1 ? "Seite" : "Seiten"} extrahieren`,
        reorder: "Neue Reihenfolge speichern",
        pdfToImages: {
          single: "Bilder exportieren",
          multiple: (count: number) => `${count} PDFs exportieren`,
        },
        imagesToPdf: {
          single: "PDF erstellen",
          multiple: (count: number) => `PDF aus ${count} Bildern erstellen`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Verarbeite (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Komprimiert. Reduktion: ${reduction}% (${original} → ${next}) in ${seconds}s`,
        merged: "Zusammenführen abgeschlossen",
        split: (count: number) =>
          count > 1
            ? `${count} Dateien erzeugt. Erste Datei wird heruntergeladen...`
            : "Teilung abgeschlossen",
        extracted: (count: number) => `${count} ${count === 1 ? "Seite" : "Seiten"} extrahiert`,
        reordered: "Neuordnung abgeschlossen",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `${count} ${label}-${count === 1 ? "Bild" : "Bilder"} im ZIP gespeichert`
            : `${count} ${label}-${count === 1 ? "Bild" : "Bilder"} heruntergeladen`;
        },
        imagesToPdf: (count: number) =>
          `PDF aus ${count} ${count === 1 ? "Bild" : "Bildern"} erstellt`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Kein Ergebnis erzeugt",
        mergeRequiresTwo: "Mindestens zwei Dateien zum Zusammenführen auswählen",
        noPagesSelected: "Wähle mindestens eine Seite",
        invalidFile: "Gültige Datei auswählen",
        reorderEmpty: "Keine neue Reihenfolge erkannt",
        unknown: "Unbekannter Fehler",
        modeNotSupported: "Modus nicht unterstützt",
      },
      labels: {
        pagesToExtract: "Seiten zum Extrahieren auswählen:",
        reorderPages: "Seiten ziehen, um sie neu zu ordnen:",
      },
      compressionPreview: {
        title: "Komprimierungs-Vorschau",
        description:
          "Passe die Optionen an, um die Zielgröße zu schätzen, bevor du die Komprimierung startest.",
        running: "Vorschau wird berechnet…",
        readyLabel: "Geschätztes Ergebnis",
        ratio: (percent: string) => `${percent}% kleiner`,
        saved: (size: string) => `${size} eingespart`,
        time: (seconds: string) => `≈ ${seconds}s`,
        original: "Original",
        result: "Geschätzt",
        notice:
          "Die Vorschau läuft lokal. Beim Klick auf Verarbeiten nutzen wir dieses Ergebnis erneut – kein Upload nötig.",
        error: "Die Vorschau konnte nicht erstellt werden.",
        retry: "Vorschau erneut versuchen",
        universalBadge: "Universelle Optimierung",
      },
      compressionSummary: {
        title: "Letzte Komprimierung",
        ratio: (percent: string) => `${percent}% kleiner`,
        saved: (size: string) => `${size} eingespart`,
        original: "Original",
        result: "Komprimiert",
        duration: (seconds: string) => `Abgeschlossen in ${seconds}s`,
        download: "Erneut herunterladen",
        clear: "Zusammenfassung löschen",
      },
      donationReminder: {
        message: "PDFLince hat dir heute Zeit gespart? Deine Unterstützung hält das Projekt privat und kostenlos.",
        actionLabel: "PDFLince unterstützen",
        withSavings: (percent: string, saved: string) =>
          `Gerade ${saved} gespart (${percent}% kleiner)? Hilf mit, PDFLince privat und kostenlos zu halten.`,
      },
      statusDialog: {
        processingTitle: "Verarbeitung läuft lokal",
        successTitle: "Deine Dateien sind bereit",
        successDescription:
          "Die Downloads starten automatisch. Hier kannst du sie erneut herunterladen.",
        resultsLabel: "Aktuelles Ergebnis",
        filesProcessedLabel: (count: number) =>
          `${count} ${count === 1 ? "Datei verarbeitet" : "Dateien verarbeitet"}`,
        downloadAgainLabel: "Erneut herunterladen",
        errorTitle: "Verarbeitung fehlgeschlagen",
        errorDescription: "Die Operation konnte nicht abgeschlossen werden. Prüfe die Dateien und versuche es erneut.",
        retryLabel: "Erneut versuchen",
        closeLabel: "Schließen",
      },
      compressionTotal: {
        title: "Gesamteinsparung (alle Dateien)",
        savings: (size: string) => `Insgesamt ${size} eingespart`,
        count: (count: number) => `${count} Dateien optimiert`,
      },
    },
    fileUploader: {
      clickToSelect: "Zum Auswählen klicken",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "oder Bilder ziehen und ablegen" : "oder PDF-Dateien ziehen und ablegen",
      accepted: {
        pdf: "PDF-Dateien",
        images: "Unterstützte Formate: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Empfohlene Größe: < ${sizeMb}MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Dateityp nicht unterstützt: ${fileName}. Zugelassen sind nur ${label}.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Datei zu groß: ${fileName}. Maximal sind ${sizeMb} MB erlaubt.`,
      },
      dropImagesAlt: "PDF Platzhaltergrafik",
    },
    fileList: {
      moveUp: "Nach oben",
      moveDown: "Nach unten",
      remove: "Entfernen",
      removeAll: "Alle entfernen",
      imageLabel: "Bild",
      fileLabel: "Datei",
      selected: "Ausgewählt",
      pdfLabel: "PDF",
      deselect: "Abwählen",
      pagesLabel: (count: number) => `${count} ${count === 1 ? "Seite" : "Seiten"}`,
      previewLoading: "Vorschau wird geladen…",
    },
    pageSelector: {
      loading: "Lade Seiten...",
      error: "Fehler beim Laden",
      summary: (total: number, selected: number) => `${selected} von ${total} ${total === 1 ? "Seite" : "Seiten"} ausgewählt`,
      selectAll: "Alle auswählen",
      deselectAll: "Alle abwählen",
      pageLabel: (pageNumber: number) => `Seite ${pageNumber}`,
      extraPages: (shown: number, total: number) => `${shown} von ${total} Seiten sichtbar`,
      manualLabel: "Seiten manuell wählen",
      manualPlaceholder: "z. B. 1-3, 6, 9",
    },
    pageOrderer: {
      loading: "Seiten werden geladen...",
      error: "Seiten konnten nicht geladen werden",
      limitReached: (count: number) => `Limit von ${count} Seiten erreicht. Aus Performance-Gründen lassen sich bis zu 120 Seiten gleichzeitig neu anordnen.`,
      limitHint: "Für größere Dateien bitte am Desktop öffnen.",
      summary: (count: number) => `${count} Seiten bereit`,
      reset: "Zurücksetzen",
      dragHint: "Seiten ziehen, um die Reihenfolge zu ändern",
      pageLabel: (pageNumber: number) => `Seite ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Seite ${pageNumber}`,
      instructions:
        'Ziehe die Seiten oder nutze die Pfeiltasten. Klicke anschließend auf "Neue Reihenfolge speichern", um die Änderungen zu übernehmen.',
    },
    processingOptions: {
      compress: {
        title: "Komprimierung",
        level: "Stufe",
        levels: {
          low: "Leicht",
          medium: "Ausgewogen",
          high: "Stark",
        },
        removeMetadata: "Metadaten entfernen",
        removeMetadataHint: "Entfernt versteckte Angaben wie Autor, Betreff und Bearbeitungshistorie.",
        stripAnnotations: "Annotationen und Kommentare entfernen",
        stripAnnotationsHint: "Löscht Notizen, Formularfelder, Signaturen und Dokumentaktionen.",
        downscaleImages: "Eingebettete Bilder verkleinern",
        downscaleHint: "Ideal für gescannte Dokumente oder fotolastige PDFs. Hält Text scharf und reduziert Fotos.",
        advancedTitle: "Erweiterte Bereinigung",
        advancedDescription: "Belasse es einfach oder aktiviere nur die Extras, die du brauchst.",
        activeLabel: "Aktiv:",
      },
      merge: {
        title: "Zusammenführen",
        pageDivider: "Leerseite zwischen Dokumenten",
        metadataTitle: "Titel für das Ergebnis (optional)",
        metadataAuthor: "Autor für das Ergebnis (optional)",
        metadataHint: "Lege eigene Metadaten für das zusammengeführte PDF fest. Leer lassen, um Standardwerte zu verwenden.",
      },
      split: {
        title: "Teilen",
        pagesPerFile: "Seiten pro Datei",
        pagesPerFileHint: "Wir erstellen nach jeweils N Seiten eine neue PDF-Datei.",
      },
      extract: {
        title: "Extrahieren",
        preserveMetadata: "Metadaten beibehalten",
        preserveMetadataHint: "Behält Titel, Autor und weitere Details in der extrahierten Datei.",
      },
      reorder: {
        title: "Neu ordnen",
        hint: "Seiten ziehen, um die gewünschte Reihenfolge zu erhalten",
      },
      pdfToImages: {
        title: "Bildexport",
        formatLabel: "Bildformat",
        formatHint: "PNG liefert verlustfreie Qualität, JPEG erzeugt kleinere Dateien.",
        pngLabel: "PNG (verlustfrei)",
        jpegLabel: "JPEG (kleinere Datei)",
        qualityLabel: "JPEG-Qualität",
        qualityHint: "Höhere Werte bewahren mehr Details, vergrößern aber die Ausgabedateien.",
        dpiLabel: "Render-DPI",
        dpiHint: "Mehr DPI bedeuten mehr Schärfe und größere Dateien. 144 DPI eignen sich gut für Präsentationen.",
        dpiPresets: {
          screen: "72 DPI · Bildschirm",
          balanced: "144 DPI · Ausgewogen",
          print: "300 DPI · Druck",
        },
        zipLabel: "Als ZIP bündeln",
        zipHint: "Ein Archiv herunterladen statt einer Datei pro Seite.",
        baseNameLabel: "Basisdateiname",
        baseNamePlaceholder: "pdflince_seiten",
        baseNameHint: "Wir verwenden diesen Text als Präfix. Leer lassen, um den PDF-Namen zu übernehmen.",
      },
      imagesToPdf: {
        title: "Layout",
        layoutTitle: "Seitenlayout",
        fitLabel: "Bildanpassung",
        fitOptions: {
          contain: "Einpassen (gesamtes Bild anzeigen)",
          cover: "Ausfüllen (Seite vollständig füllen)",
        },
        sizeLabel: "Seitengröße",
        sizeOptions: {
          auto: "Auto (Bildgröße verwenden)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "Ausrichtung",
        orientationOptions: {
          auto: "Auto",
          portrait: "Hochformat",
          landscape: "Querformat",
        },
        marginLabel: "Ränder (pt)",
        marginHint: "Fügt weißen Rand um das Bild hinzu. 72 pt ≈ 1 Zoll.",
        backgroundLabel: "Hintergrundfarbe",
        backgroundHint: "Wird hinter Bildern sowie an freien Stellen der Seite angezeigt.",
      },
    },
    cookieBanner: {
      message: "Wir verwenden Cookies, um den Verkehr zu analysieren und Ihre Erfahrung zu verbessern. Wir geben Ihre persönlichen Daten nicht weiter.",
      accept: "Akzeptieren",
      decline: "Ablehnen",
    },
  },
  pages: {
    home: {
      hero: {
        title: "PDFLince: PDF zusammenführen, komprimieren und konvertieren online",
        subtitle:
          "PDF komprimieren, PDFs zusammenführen, Dokumente teilen, Seiten extrahieren und PDF in Bilder oder Bilder in PDF umwandeln – direkt im Browser ohne Uploads.",
        badges: [
          "PDF schnell komprimieren",
          "PDFs ohne Limit zusammenführen",
          "Lokale Verarbeitung",
          "PDFLince unterstützen",
        ],
        imageAlt: "PDFLince Illustration",
        ctaLinks: [
          {
            label: "PDF in Bilder",
            href: operationRoutes.pdfToImages,
            description: "Seiten als PNG oder JPEG exportieren",
          },
          {
            label: "Bilder zu PDF",
            href: operationRoutes.imagesToPdf,
            description: "JPG, PNG oder WEBP kombinieren",
          },
        ],
      },
      why: {
        title: "Warum PDFLince?",
        cards: [
          {
            title: "Datenschutz garantiert",
            description: "Deine PDFs verlassen dein Gerät nicht. Alles passiert lokal im Browser.",
            icon: "🔒",
          },
          {
            title: "Schnell & effizient",
            description: "Die lokale Engine verarbeitet PDFs ohne Upload-Wartezeiten.",
            icon: "⚡",
          },
          {
            title: "Auf jedem Gerät",
            description: "Funktioniert auf Desktop, Tablet und Smartphone mit modernen Browsern.",
            icon: "📱",
          },
        ],
      },
      callout: {
        title: "Hilf, PDFLince kostenlos zu halten",
        description:
          "Jede Spende deckt Hosting, Entwicklungszeit und sorgt für ein 100 % privates Erlebnis ohne Werbung oder Tracker.",
        ctaLabel: "Projekt unterstützen",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "So setzen wir die Mittel ein",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Häufig gestellte Fragen",
      intro: "Antworten auf die häufigsten Fragen zu PDFLince",
      cta: {
        title: "PDFLince jetzt ausprobieren",
        description:
          "PDFs zusammenfügen, komprimieren, teilen, extrahieren und neu ordnen – mit voller Privatsphäre. Keine Anmeldung, kein Hochladen.",
        ctaLabel: "Zum Toolkit",
      },
    },
    support: {
      hero: {
        eyebrow: "🌱 Kleines Indie-Projekt",
        title: "Hilf, PDFLince kostenlos und privat zu halten",
        subtitle:
          "PDFLince ist ein kleines Herzensprojekt. Deine Unterstützung finanziert die Server und schafft Zeit für neue Funktionen.",
        highlight: "Ein kleines Tool, das deine Privatsphäre respektiert.",
      },
      reasons: {
        title: "Warum spenden?",
        cards: [
          {
            title: "Kostenlos erhalten",
            description:
              "Spenden ermöglichen es, PDFLince für alle kostenlos zu lassen – ohne Premium-Stufen oder gesperrte Funktionen.",
            icon: "💚",
          },
          {
            title: "Weiterentwickeln",
            description:
              "Deine Hilfe bezahlt Fehlerbehebungen, neue Werkzeuge und den Feinschliff für schnelle Abläufe.",
            icon: "✨",
          },
          {
            title: "Privatsphäre schützen",
            description:
              "Wir verarbeiten alles lokal, damit deine PDFs auf deinem Gerät bleiben. Spenden sichern dieses Konzept.",
            icon: "🔒",
          },
        ],
      },
      tiers: {
        title: "Gib, was möglich ist",
        description: "Jeder Betrag hilft. Sichere Zahlung über Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Ein Kaffee",
            amount: "€3",
            description: "Deckt das Hosting für ein paar Wochen.",
            ctaLabel: "€3 spenden",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Monatliche Unterstützung",
            amount: "€10/Monat",
            description: "Schenkt uns jede Woche Zeit, um PDFLince besser zu machen.",
            ctaLabel: "€10/Monat spenden",
            ctaHref: "#stripe-checkout-monthly",
            badge: "💙 Danke",
          },
          {
            id: "custom",
            title: "Eigener Betrag",
            amount: "Beliebig",
            description: "Jeder Euro zählt. Wähle den Betrag, der für dich passt.",
            ctaLabel: "Betrag wählen",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Stripe-Zahlungen sind sicher. Wiederkehrende Spenden kannst du jederzeit stoppen.",
      },
      transparency: {
        title: "Wofür wir es ausgeben",
        items: [
          "Hosting und CDN, damit die Seite überall schnell bleibt",
          "Entwicklungszeit für Fehlerbehebungen und neue Features",
          "Design- und UX-Verbesserungen, damit alles leicht zu bedienen ist",
          "Übersetzungen und Dokumentation für alle unterstützten Sprachen",
        ],
      },
      faq: {
        title: "Fragen",
        entries: [
          {
            question: "Was ist, wenn ich nicht spenden kann?",
            answer:
              "Kein Problem. PDFLince bleibt kostenlos. Wenn du das Tool teilst oder uns Feedback schickst, hilfst du uns genauso.",
          },
          {
            question: "Bekomme ich eine Bestätigung?",
            answer:
              "Ja. Stripe sendet dir automatisch eine E-Mail mit der Zahlungsbestätigung.",
          },
          {
            question: "Wie kündige ich eine wiederkehrende Spende?",
            answer:
              "Du kannst das im Stripe-Portal erledigen oder uns schreiben – wir beenden sie sofort und ohne Nachfragen.",
          },
        ],
      },
      closing: {
        title: "Danke, dass du da bist",
        description:
          "Jede Person, die PDFLince unterstützt, hilft dabei, ein nützliches, datenschutzfreundliches PDF-Toolkit für alle zu erhalten.",
        ctaLabel: "Team kontaktieren",
        ctaHref: "mailto:info@pdflince.com?subject=Hallo%20PDFLince-Team",
      },
      legalNotice: {
        title: "Rechtlicher Hinweis & Transparenz",
        points: [
          "PDFLince ist ein unabhängiges persönliches Projekt eines kleinen ehrenamtlichen Teams.",
          "Beiträge sind freiwillig und finanzieren Hosting, Werkzeuge sowie Entwicklungszeit.",
          "Zahlungen sind keine Spenden im steuerlichen Sinne und berechtigen nicht zu Abzügen; Stripe verschickt automatisch eine Quittung.",
          "Der Dienst wird ohne Gewähr bereitgestellt. Fragen? Schreib an info@pdflince.com.",
        ],
      },
    },
  },
  faqs: {
    common: faqsDe.common,
    regional: faqsDe.regional,
    tech: faqsDe.tech,
  },
  operations: operationsDe,
};
