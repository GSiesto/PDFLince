import { OperationContent } from "../operation-types";
import { OperationKey } from "../../../types/operations";

const operationsDeContent: Record<OperationKey, OperationContent> = {
  compress: {
    key: "compress",
    slug: "komprimieren",
    mode: "compress",
    meta: {
      title: "PDF online komprimieren | Größe reduzieren | PDFLince",
      description:
        "Reduziere PDF-Größe effizient ohne Qualitätsverlust. 100% privat und kostenlos direkt im Browser.",
      keywords: [
        "pdf komprimieren",
        "pdf verkleinern",
        "pdf optimieren",
        "pdf kompressor",
        "leichtes pdf",
      ],
      ogTitle: "PDFs komprimieren ohne Qualitätsverlust | PDFLince",
      ogDescription:
        "Ziehe deine Datei in das Feld, wähle die optimale Kompressionsstufe und lade das verkleinerte PDF in Sekunden herunter – sicher und ohne Server-Upload.",
      ogImageAlt: "PDFLince Oberfläche beim Komprimieren",
    },
    hero: {
      title: "PDF online komprimieren – mit klaren Ergebnissen",
      description:
        "Reduziere die Dateigröße, damit Dokumente in E-Mails, Lernplattformen oder Behördenportale passen und trotzdem gut lesbar bleiben.",
      bulletPoints: [
        "100 % lokale Verarbeitung – Dateien verlassen den Browser nicht",
        "Zwischen leichter, mittlerer oder starker Kompression wählen",
        "Metadaten und Struktur bei Bedarf beibehalten",
      ],
      imageAlt: "PDF Komprimierungsablauf in PDFLince",
    },
    benefitsTitle: "Warum PDFs mit PDFLince komprimieren",
    benefits: [
      {
        title: "Ausgewogenes Ergebnis",
        description:
          "Unsere lokale Kompressions-Engine analysiert Ressourcen und sorgt für maximale Reduktion ohne unscharfe Texte oder Grafiken.",
      },
      {
        title: "Bereit für Abgaben",
        description:
          "Erstelle Dateien, die strenge Upload-Limits in Behördenportalen, Hochschulen oder Unternehmen einhalten.",
      },
      {
        title: "Datenschutz by Design",
        description:
          "Keine Server-Uploads, keine Datenlecks – interne Datenschutzvorgaben lassen sich mühelos erfüllen.",
      },
    ],
    howTo: {
      title: "So komprimierst du ein PDF mit PDFLince",
      steps: [
        "Auf \"Dateien hochladen\" klicken und das gewünschte PDF auswählen.",
        "Kompressionsstufe wählen und optional Metadaten erhalten.",
        "\"Verarbeiten\" drücken und das verkleinerte Dokument nach wenigen Sekunden herunterladen.",
      ],
      note:
        "Mehrere Berichte? Einfach nacheinander komprimieren – ohne Tageslimits oder Wasserzeichen.",
    },
    useCasesTitle: "Wann sich Komprimieren lohnt",
    useCases: [
      "Verträge, Rechnungen oder Handbücher per E-Mail verschicken ohne Größenlimit zu überschreiten.",
      "Unterlagen in Moodle, Canvas oder anderen LMS hochladen, die strenge Grenzen setzen.",
      "Abschlussarbeiten, Kataloge oder Studien für schnellere Downloads verschlanken.",
      "Dokumente in der Cloud archivieren und Speicherplatz sparen ohne Informationsverlust.",
    ],
  },
  merge: {
    key: "merge",
    slug: "zusammenfuehren",
    mode: "merge",
    meta: {
      title: "PDFs online zusammenführen | Kombinieren | PDFLince",
      description:
        "Füge mehrere PDF-Dateien zu einem einzigen, geordneten Dokument zusammen. Einfach per Drag & Drop sortieren und sofort sicher herunterladen – ohne Seitenlimit.",
      keywords: [
        "pdf zusammenführen",
        "pdfs kombinieren",
        "pdfs zusammenfügen",
        "pdf merger",
        "dokumente vereinen",
      ],
      ogTitle: "Mehrere PDFs in Sekunden kombinieren | PDFLince",
      ogDescription:
        "Ordne deine Dokumente beliebig an, passe die Einstellungen an und erhalte ein perfekt zusammengefügtes PDF, ohne dass Daten in die Cloud gelangen.",
      ogImageAlt: "Zusammenführen von PDFs mit PDFLince",
    },
    hero: {
      title: "PDFs online zusammenführen – schnell und sicher",
      description:
        "Erstelle eine saubere Datei mit Verträgen, Kursunterlagen oder Richtlinien, bereit zum Versenden, Signieren oder Archivieren.",
      bulletPoints: [
        "Per Drag & Drop die finale Reihenfolge bestimmen",
        "Keine versteckten Limits – auch lange Dokumente frei vereinen",
        "Lesezeichen und Metadaten bei Bedarf behalten",
      ],
      imageAlt: "PDF Zusammenführung",
    },
    benefitsTitle: "Vorteile der Zusammenführung mit PDFLince",
    benefits: [
      {
        title: "Konsistente Übergabe",
        description:
          "Sorge für einen einzigen, durchgehend nummerierten und einheitlich formatierten Dateistapel.",
      },
      {
        title: "Zeitersparnis",
        description:
          "Keine schweren Desktop-Editoren mehr. Dateien ziehen, sortieren, fertig zum Teilen.",
      },
      {
        title: "Privat & anonym",
        description:
          "Keine Speicherung, keine persönlichen Daten – ideal für vertrauliche Inhalte.",
      },
    ],
    howTo: {
      title: "So führst du PDFs mit PDFLince zusammen",
      steps: [
        "Auf \"Dateien hochladen\" klicken und mindestens zwei PDFs auswählen.",
        "Mit Pfeilen oder Drag & Drop die gewünschte Reihenfolge festlegen.",
        "Lesezeichen-Optionen wählen und \"Verarbeiten\" drücken, um das kombinierte PDF zu laden.",
      ],
      note:
        "Weitere Dateien später? Einfach hinzufügen, ohne von vorne zu beginnen.",
    },
    useCasesTitle: "Wann PDFs vereinen?",
    useCases: [
      "Ein Dossier mit Anhängen, Angeboten und Konditionen erstellen.",
      "Mehrere Monatsrechnungen in einer Datei an die Buchhaltung senden.",
      "Gesammelte Notizen und Präsentationen für Lernende bündeln.",
      "Juristische Unterlagen für elektronische Signaturen vorbereiten.",
    ],
  },
  split: {
    key: "split",
    slug: "teilen",
    mode: "split",
    meta: {
      title: "PDF nach Seiten oder Kapiteln teilen | Kostenlos | PDFLince",
      description:
        "Teile große PDFs in handliche Dateien auf. Volle Kontrolle über deine Daten mit lokaler Verarbeitung.",
      keywords: [
        "pdf teilen",
        "pdf aufteilen",
        "pdf seiten trennen",
        "pdf splitter",
        "pdf zerlegen",
      ],
      ogTitle: "PDFs präzise aufteilen | PDFLince",
      ogDescription:
        "Wähle deinen bevorzugten Teilungsmodus, generiere so viele Einzeldateien wie nötig und speichere sie direkt ab – schnell, einfach und sicher.",
      ogImageAlt: "PDF aufteilen mit PDFLince",
    },
    hero: {
      title: "PDFs nach Seiten oder Segmenten teilen",
      description:
        "Kapitel, Anhänge oder gezielte Abschnitte als eigenständige Dateien exportieren – bereit zum Teilen.",
      bulletPoints: [
        "Teilungen nach Seitenanzahl oder Dateigröße konfigurieren",
        "Mehrere PDFs in einem Durchlauf erzeugen",
        "Ohne Seitenlimit oder Wasserzeichen arbeiten",
      ],
      imageAlt: "PDF-Teilung",
    },
    benefitsTitle: "Vorteile des Teilens mit PDFLince",
    benefits: [
      {
        title: "Sharing mit Kontrolle",
        description:
          "Übermittle nur relevante Passagen, ohne sensible Inhalte offenzulegen.",
      },
      {
        title: "Skalierbare Auslieferung",
        description:
          "Mehrere Dateien in einem Schritt erzeugen und automatisch herunterladen.",
      },
      {
        title: "Feineinstellungen",
        description:
          "Batchs bilden, Trenner einfügen oder Ausgabeformate exakt anpassen.",
      },
    ],
    howTo: {
      title: "So teilst du ein PDF mit PDFLince",
      steps: [
        "Das gewünschte PDF vom Gerät hochladen.",
        "Festlegen, ob nach Seitenanzahl oder Dateigröße geteilt wird.",
        "\"Verarbeiten\" drücken und die erzeugten Dateien automatisch herunterladen.",
      ],
      note:
        "PDFLince lädt die erste Datei sofort und speichert weitere ohne zusätzliche Schritte.",
    },
    useCasesTitle: "Typische Anwendungsfälle",
    useCases: [
      "Jedes Kapitel eines E-Books in einem Online-Kurs einzeln bereitstellen.",
      "Anhänge trennen, die über verschiedene Kanäle versandt werden müssen.",
      "Quartalszusammenfassungen aus umfangreichen Finanzberichten extrahieren.",
      "Schlanke Pakete für Kund:innen erstellen, ohne interne Dokumente offenzulegen.",
    ],
  },
  extract: {
    key: "extract",
    slug: "seiten-extrahieren",
    mode: "extract",
    meta: {
      title: "PDF-Seiten extrahieren | Seiten speichern | PDFLince",
      description:
        "Wähle einzelne Seiten aus und speichere sie als neues Dokument. Private Verarbeitung direkt im Browser.",
      keywords: [
        "pdf seiten extrahieren",
        "pdf seiten speichern",
        "pdf seiten auswählen",
        "pdf page extractor",
        "neues pdf erstellen",
      ],
      ogTitle: "Nur die benötigten Seiten extrahieren | PDFLince",
      ogDescription:
        "Markiere einfach die relevanten Seiten, erstelle in Sekunden ein neues PDF und behalte deine Daten sicher auf deinem eigenen Gerät.",
      ogImageAlt: "Seiten in PDFLince auswählen",
    },
    hero: {
      title: "Gezielte PDF-Seiten extrahieren",
      description:
        "Stelle maßgeschneiderte Dokumente zusammen, indem du ausschließlich die benötigten Seiten bewahrst.",
      bulletPoints: [
        "Miniaturen anzeigen und einzelne Seiten markieren",
        "Originale Seitennummerierung oder neue Abschnitte verwenden",
        "Ergebnis sofort ohne Wartezeit herunterladen",
      ],
      imageAlt: "PDF-Seiten auswählen",
    },
    benefitsTitle: "Vorteile der Seitenextraktion",
    benefits: [
      {
        title: "Relevante Unterlagen",
        description:
          "Nur die wichtigen Informationen teilen und redundante Daten vermeiden.",
      },
      {
        title: "Volle Kontrolle im Browser",
        description:
          "Seiten auswählen, prüfen und bestätigen ohne schwere Software oder stabile Leitung.",
      },
      {
        title: "Saubere Ergebnisse",
        description:
          "Das neue PDF behält Qualität und Metadaten je nach gewählten Optionen.",
      },
    ],
    howTo: {
      title: "So extrahierst du Seiten mit PDFLince",
      steps: [
        "PDF hochladen und die gewünschte Datei auswählen.",
        "Benötigte Seiten im Miniaturbereich markieren.",
        "\"Verarbeiten\" klicken, um ein PDF mit den markierten Seiten zu laden.",
      ],
      note:
        "Extraktion lässt sich mit anderen Operationen wie Zusammenführen oder Komprimieren kombinieren.",
    },
    useCasesTitle: "Ideen zum Extrahieren",
    useCases: [
      "Nur das relevante Kapitel eines Handbuchs mit dem Team teilen.",
      "Bestimmte Seiten eines Vertrags für die Rechtsprüfung senden.",
      "Individuelle Dossiers für Kund:innen mit passenden Informationen zusammenstellen.",
      "Nur Formular- oder Belegseiten sichern, die archiviert werden müssen.",
    ],
  },
  reorder: {
    key: "reorder",
    slug: "seiten-sortieren",
    mode: "reorder",
    meta: {
      title: "PDF-Seiten neu sortieren | Ordnung ändern | PDFLince",
      description:
        "Bringe deine PDF-Seiten per Drag & Drop ganz einfach in die richtige Reihenfolge. Organisiere Dokumente neu und speichere das Ergebnis sofort und sicher ab.",
      keywords: [
        "pdf neu anordnen",
        "pdf seiten sortieren",
        "pdf reihenfolge ändern",
        "pdf reorganisieren",
        "pdf seiten ordnen",
      ],
      ogTitle: "PDFs organisieren ohne Zusatzsoftware | PDFLince",
      ogDescription:
        "Verschiebe Seiten an die richtige Stelle, korrigiere die Reihenfolge und lade dein perfekt sortiertes PDF im Handumdrehen herunter.",
      ogImageAlt: "Seiten neu anordnen in PDFLince",
    },
    hero: {
      title: "PDF-Seiten mit Drag & Drop neu anordnen",
      description:
        "In wenigen Sekunden die Reihenfolge von gescannten Rechnungen, Präsentationen oder umfangreichen Berichten korrigieren.",
      bulletPoints: [
        "Große Miniaturen vermeiden Fehlgriffe",
        "Seiten ziehen und neue Reihenfolge sofort sehen",
        "Neu sortiertes PDF ohne Verlust von Lesezeichen oder Verlinkungen speichern",
      ],
      imageAlt: "Seitenanordnung in PDFLince",
    },
    benefitsTitle: "Warum mit PDFLince neu sortieren",
    benefits: [
      {
        title: "Schnellere Workflows",
        description:
          "Unsortierte Scans korrigieren ohne erneutes Digitalisieren oder komplexe Software.",
      },
      {
        title: "Visuelle Präzision",
        description:
          "Miniaturen erlauben die Kontrolle jeder Seite vor dem Export.",
      },
      {
        title: "Keine Spuren",
        description:
          "Der komplette Vorgang bleibt auf dem eigenen Gerät – ideal für vertrauliche Unterlagen.",
      },
    ],
    howTo: {
      title: "So sortierst du Seiten mit PDFLince neu",
      steps: [
        "PDF hochladen und gewünschte Datei wählen.",
        "Miniaturen per Drag & Drop in die richtige Reihenfolge bringen.",
        "Auf \"Verarbeiten\" klicken, um das Dokument mit neuer Reihenfolge herunterzuladen.",
      ],
      note:
        "Auch nach einem Export weiter anpassen – ohne die Datei erneut hochzuladen.",
    },
    useCasesTitle: "Wann Seiten sortieren?",
    useCases: [
      "Angebote, Anhänge und Unterschriften logisch anordnen, bevor sie versendet werden.",
      "Gedruckte Präsentationen in der richtigen Reihenfolge vorbereiten.",
      "Doppelte oder vertauschte Seiten nach einem Massenscan korrigieren.",
      "Handbücher oder Kataloge aktualisieren, indem vorhandene Inhalte neu sortiert werden.",
    ],
  },
  pdfToImages: {
    key: "pdfToImages",
    slug: "pdf-zu-bildern",
    mode: "pdfToImages",
    meta: {
      title: "PDF in Bilder umwandeln | PNG/JPEG Export | PDFLince",
      description:
        "Wandle jede Seite deines PDFs in hochwertige PNG- oder JPEG-Bilder um. Bestimme die Auflösung selbst und lade alles als ZIP-Datei herunter – 100% privat.",
      keywords: [
        "pdf zu bildern",
        "pdf zu png",
        "pdf zu jpeg",
        "pdf seiten exportieren",
        "pdf als bilder herunterladen",
      ],
      ogTitle: "PDF-Seiten als saubere Bilder exportieren | PDFLince",
      ogDescription:
        "Render jede Seite direkt im Browser als scharfes Bild. Wähle Format und Qualität und erhalte sofort ein strukturiertes ZIP-Archiv.",
      ogImageAlt: "PDFLince konvertiert PDF-Seiten in Bilder",
    },
    hero: {
      title: "PDF-Seiten als PNG oder JPEG speichern",
      description:
        "Erzeuge gestochen scharfe Bilder für Präsentationen, Reviews oder Design-Handovers ohne schwere Desktop-Software.",
      bulletPoints: [
        "Zwischen PNG und JPEG wählen und die DPI exakt festlegen",
        "Alles als einzelnes ZIP bündeln oder Seiten einzeln herunterladen",
        "Rendering läuft direkt im Browser – keine Uploads, keine Spuren",
      ],
      imageAlt: "Workflow von PDF zu Bildern in PDFLince",
    },
    benefitsTitle: "Warum PDFs mit PDFLince exportieren",
    benefits: [
      {
        title: "Qualität nach Bedarf",
        description:
          "Passe die Auflösung an Slides, Intranet oder Review-Tools an und stelle sicher, dass jede Seite scharf bleibt.",
      },
      {
        title: "Flexible Auslieferung",
        description:
          "Entscheide, ob du ein komplettes Archiv brauchst oder nur ausgewählte Seiten als Bild exportierst.",
      },
      {
        title: "Datenschutzfreundlich",
        description:
          "Alle Berechnungen passieren im Browser. Vertrauliche Unterlagen verlassen dein Gerät nie.",
      },
    ],
    howTo: {
      title: "So wandelst du ein PDF in Bilder um",
      steps: [
        "PDF hochladen, das konvertiert werden soll. Wir bearbeiten eine Datei nach der anderen für beste Qualität.",
        "PNG oder JPEG wählen, DPI einstellen und entscheiden, ob ein ZIP erzeugt werden soll.",
        "Auf \"Bilder exportieren\" klicken, um das Archiv oder einzelne Dateien sofort herunterzuladen.",
      ],
      note:
        "Du brauchst nur einzelne Seiten? Teile oder extrahiere sie zuerst und exportiere dann als Bilder.",
    },
    useCasesTitle: "Wann sich PDF-zu-Bild lohnt",
    useCases: [
      "Design-Freigaben als statische Bilder teilen, ohne das Original-PDF zu verschicken.",
      "PDF-Seiten in CMS, Wikis oder Präsentationen einbauen, die Bilddateien erwarten.",
      "Tablets oder E-Reader versorgen, die große PDFs schlecht darstellen.",
      "Schritt-für-Schritt-Dokumentationen mit Screenshots jeder PDF-Seite erstellen.",
    ],
  },
  imagesToPdf: {
    key: "imagesToPdf",
    slug: "bilder-zu-pdf",
    mode: "imagesToPdf",
    meta: {
      title: "PDF aus Bildern erstellen | JPG, PNG zu PDF | PDFLince",
      description:
        "Erstelle aus deinen Bildern ein professionelles PDF. Passe Layout, Ränder und Ausrichtung an und generiere dein Dokument sicher und lokal im Browser.",
      keywords: [
        "bilder zu pdf",
        "jpg zu pdf",
        "png zu pdf",
        "webp zu pdf",
        "pdf aus bildern erstellen",
      ],
      ogTitle: "Ein ordentliches PDF aus Bildern bauen | PDFLince",
      ogDescription:
        "Ziehe deine Bilder in die Liste, lege die Reihenfolge fest und exportiere ein druckfertiges PDF – ganz ohne Uploads oder Wasserzeichen.",
      ogImageAlt: "PDFLince erstellt ein PDF aus Bildern",
    },
    hero: {
      title: "Ein aufgeräumtes PDF aus Bildern erstellen",
      description:
        "Fasse Scans, Fotos oder Grafiken zu einem einzigen PDF zusammen, das sich leicht teilen oder archivieren lässt.",
      bulletPoints: [
        "Per Drag & Drop die Seitenreihenfolge bestimmen",
        "Seitengröße, Ausrichtung und Ränder für Print oder Bildschirm anpassen",
        "Eine Hintergrundfarbe setzen, um Transparenzen zu vermeiden",
      ],
      imageAlt: "Bilder-zu-PDF-Workflow in PDFLince",
    },
    benefitsTitle: "Warum Bilder mit PDFLince bündeln",
    benefits: [
      {
        title: "Konsequentes Layout",
        description:
          "Vereinheitliche unterschiedliche Bildgrößen und -formate, ohne dass etwas verzerrt wird.",
      },
      {
        title: "Bereit für Prüfung & Druck",
        description:
          "Steuere Ränder, Orientierung und Hintergrund, damit das PDF auf Papier und Displays überzeugt.",
      },
      {
        title: "Sicherer Prozess",
        description:
          "Die Umwandlung bleibt komplett im Browser – ideal für Belege, Ausweise oder Unterrichtsmaterial.",
      },
    ],
    howTo: {
      title: "So wandelst du Bilder in ein PDF um",
      steps: [
        "Die gewünschten Bilder hinzufügen und die Reihenfolge so anordnen, wie sie im PDF erscheinen sollen.",
        "Anpassungen für Bildanpassung, Seitengröße, Ausrichtung und Ränder vornehmen.",
        "Auf \"PDF erstellen\" klicken, um das Dokument herunterzuladen und direkt zu teilen oder zu archivieren.",
      ],
      note:
        "Große Sammlungen? Das Ergebnis danach komprimieren oder aufteilen – ohne die Bilder erneut hochzuladen.",
    },
    useCasesTitle: "Typische Einsätze für Bild-zu-PDF",
    useCases: [
      "Eingescannte Arbeitsblätter oder Prüfungen bündeln, bevor sie zurück an Lernende gehen.",
      "Spesenbelege als ein einziges PDF einreichen statt vieler einzelner Anhänge.",
      "Lookbooks oder Produktkataloge aus Design-Exports in Sekunden erzeugen.",
      "Fotodokumentationen oder Inspektionsberichte für Stakeholder zusammenstellen.",
    ],
  },
};

export const operationsDe: Record<OperationKey, OperationContent> = {
  merge: operationsDeContent.merge,
  compress: operationsDeContent.compress,
  split: operationsDeContent.split,
  extract: operationsDeContent.extract,
  reorder: operationsDeContent.reorder,
  pdfToImages: operationsDeContent.pdfToImages,
  imagesToPdf: operationsDeContent.imagesToPdf,
};
