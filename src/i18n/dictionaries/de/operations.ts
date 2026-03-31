import { OperationContent } from "../operation-types";
import { OperationKey } from "../../../types/operations";

const operationsDeContent: Record<OperationKey, OperationContent> = {
  compress: {
    key: "compress",
    slug: "komprimieren",
    mode: "compress",
    meta: {
      title: "PDF online komprimieren | GrÃ¶ÃŸe reduzieren | PDFLince",
      description:
        "Reduziere PDF-GrÃ¶ÃŸe effizient ohne QualitÃ¤tsverlust. 100% privat und kostenlos direkt im Browser.",
      keywords: [
        "pdf komprimieren",
        "pdf verkleinern",
        "pdf optimieren",
        "pdf kompressor",
        "leichtes pdf",
      ],
      ogTitle: "PDFs komprimieren ohne QualitÃ¤tsverlust | PDFLince",
      ogDescription:
        "Ziehe deine Datei in das Feld, wÃ¤hle die optimale Kompressionsstufe und lade das verkleinerte PDF in Sekunden herunter â€“ sicher und ohne Server-Upload.",
      ogImageAlt: "PDFLince OberflÃ¤che beim Komprimieren",
    },
    hero: {
      title: "PDF online komprimieren â€“ mit klaren Ergebnissen",
      description:
        "Reduziere die DateigrÃ¶ÃŸe, damit Dokumente in E-Mails, Lernplattformen oder BehÃ¶rdenportale passen und trotzdem gut lesbar bleiben.",
      bulletPoints: [
        "100Â % lokale Verarbeitung â€“ Dateien verlassen den Browser nicht",
        "Zwischen leichter, mittlerer oder starker Kompression wÃ¤hlen",
        "Metadaten und Struktur bei Bedarf beibehalten",
      ],
      imageAlt: "PDF Komprimierungsablauf in PDFLince",
    },
    benefitsTitle: "Warum PDFs mit PDFLince komprimieren",
    benefits: [
      {
        title: "Ausgewogenes Ergebnis",
        description:
          "Unsere lokale Kompressions-Engine analysiert Ressourcen und sorgt fÃ¼r maximale Reduktion ohne unscharfe Texte oder Grafiken.",
      },
      {
        title: "Bereit fÃ¼r Abgaben",
        description:
          "Erstelle Dateien, die strenge Upload-Limits in BehÃ¶rdenportalen, Hochschulen oder Unternehmen einhalten.",
      },
      {
        title: "Datenschutz by Design",
        description:
          "Keine Server-Uploads, keine Datenlecks â€“ interne Datenschutzvorgaben lassen sich mÃ¼helos erfÃ¼llen.",
      },
    ],
    howTo: {
      title: "So komprimierst du ein PDF mit PDFLince",
      steps: [
        "Auf \"Dateien hochladen\" klicken und das gewÃ¼nschte PDF auswÃ¤hlen.",
        "Kompressionsstufe wÃ¤hlen und optional Metadaten erhalten.",
        "\"Verarbeiten\" drÃ¼cken und das verkleinerte Dokument nach wenigen Sekunden herunterladen.",
      ],
      note:
        "Mehrere Berichte? Einfach nacheinander komprimieren â€“ ohne Tageslimits oder Wasserzeichen.",
    },
    useCasesTitle: "Wann sich Komprimieren lohnt",
    useCases: [
      "VertrÃ¤ge, Rechnungen oder HandbÃ¼cher per E-Mail verschicken ohne GrÃ¶ÃŸenlimit zu Ã¼berschreiten.",
      "Unterlagen in Moodle, Canvas oder anderen LMS hochladen, die strenge Grenzen setzen.",
      "Abschlussarbeiten, Kataloge oder Studien fÃ¼r schnellere Downloads verschlanken.",
      "Dokumente in der Cloud archivieren und Speicherplatz sparen ohne Informationsverlust.",
    ],
  },
  merge: {
    key: "merge",
    slug: "zusammenfuehren",
    mode: "merge",
    meta: {
      title: "PDFs online zusammenfÃ¼hren | Kombinieren | PDFLince",
      description:
        "FÃ¼ge mehrere PDF-Dateien zu einem einzigen, geordneten Dokument zusammen. Einfach per Drag & Drop sortieren und sofort sicher herunterladen â€“ ohne Seitenlimit.",
      keywords: [
        "pdf zusammenfÃ¼hren",
        "pdfs kombinieren",
        "pdfs zusammenfÃ¼gen",
        "pdf merger",
        "dokumente vereinen",
      ],
      ogTitle: "Mehrere PDFs in Sekunden kombinieren | PDFLince",
      ogDescription:
        "Ordne deine Dokumente beliebig an, passe die Einstellungen an und erhalte ein perfekt zusammengefÃ¼gtes PDF, ohne dass Daten in die Cloud gelangen.",
      ogImageAlt: "ZusammenfÃ¼hren von PDFs mit PDFLince",
    },
    hero: {
      title: "PDFs online zusammenfÃ¼hren â€“ schnell und sicher",
      description:
        "Erstelle eine saubere Datei mit VertrÃ¤gen, Kursunterlagen oder Richtlinien, bereit zum Versenden, Signieren oder Archivieren.",
      bulletPoints: [
        "Per Drag & Drop die finale Reihenfolge bestimmen",
        "Keine versteckten Limits â€“ auch lange Dokumente frei vereinen",
        "Lesezeichen und Metadaten bei Bedarf behalten",
      ],
      imageAlt: "PDF ZusammenfÃ¼hrung",
    },
    benefitsTitle: "Vorteile der ZusammenfÃ¼hrung mit PDFLince",
    benefits: [
      {
        title: "Konsistente Ãœbergabe",
        description:
          "Sorge fÃ¼r einen einzigen, durchgehend nummerierten und einheitlich formatierten Dateistapel.",
      },
      {
        title: "Zeitersparnis",
        description:
          "Keine schweren Desktop-Editoren mehr. Dateien ziehen, sortieren, fertig zum Teilen.",
      },
      {
        title: "Privat & anonym",
        description:
          "Keine Speicherung, keine persÃ¶nlichen Daten â€“ ideal fÃ¼r vertrauliche Inhalte.",
      },
    ],
    howTo: {
      title: "So fÃ¼hrst du PDFs mit PDFLince zusammen",
      steps: [
        "Auf \"Dateien hochladen\" klicken und mindestens zwei PDFs auswÃ¤hlen.",
        "Mit Pfeilen oder Drag & Drop die gewÃ¼nschte Reihenfolge festlegen.",
        "Lesezeichen-Optionen wÃ¤hlen und \"Verarbeiten\" drÃ¼cken, um das kombinierte PDF zu laden.",
      ],
      note:
        "Weitere Dateien spÃ¤ter? Einfach hinzufÃ¼gen, ohne von vorne zu beginnen.",
    },
    useCasesTitle: "Wann PDFs vereinen?",
    useCases: [
      "Ein Dossier mit AnhÃ¤ngen, Angeboten und Konditionen erstellen.",
      "Mehrere Monatsrechnungen in einer Datei an die Buchhaltung senden.",
      "Gesammelte Notizen und PrÃ¤sentationen fÃ¼r Lernende bÃ¼ndeln.",
      "Juristische Unterlagen fÃ¼r elektronische Signaturen vorbereiten.",
    ],
  },
  split: {
    key: "split",
    slug: "teilen",
    mode: "split",
    meta: {
      title: "PDF nach Seiten oder Kapiteln teilen | Kostenlos | PDFLince",
      description:
        "Teile groÃŸe PDFs in handliche Dateien auf. Volle Kontrolle Ã¼ber deine Daten mit lokaler Verarbeitung.",
      keywords: [
        "pdf teilen",
        "pdf aufteilen",
        "pdf seiten trennen",
        "pdf splitter",
        "pdf zerlegen",
      ],
      ogTitle: "PDFs prÃ¤zise aufteilen | PDFLince",
      ogDescription:
        "WÃ¤hle deinen bevorzugten Teilungsmodus, generiere so viele Einzeldateien wie nÃ¶tig und speichere sie direkt ab â€“ schnell, einfach und sicher.",
      ogImageAlt: "PDF aufteilen mit PDFLince",
    },
    hero: {
      title: "PDFs nach Seiten oder Segmenten teilen",
      description:
        "Kapitel, AnhÃ¤nge oder gezielte Abschnitte als eigenstÃ¤ndige Dateien exportieren â€“ bereit zum Teilen.",
      bulletPoints: [
        "Teilungen nach Seitenanzahl oder DateigrÃ¶ÃŸe konfigurieren",
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
          "Ãœbermittle nur relevante Passagen, ohne sensible Inhalte offenzulegen.",
      },
      {
        title: "Skalierbare Auslieferung",
        description:
          "Mehrere Dateien in einem Schritt erzeugen und automatisch herunterladen.",
      },
      {
        title: "Feineinstellungen",
        description:
          "Batchs bilden, Trenner einfÃ¼gen oder Ausgabeformate exakt anpassen.",
      },
    ],
    howTo: {
      title: "So teilst du ein PDF mit PDFLince",
      steps: [
        "Das gewÃ¼nschte PDF vom GerÃ¤t hochladen.",
        "Festlegen, ob nach Seitenanzahl oder DateigrÃ¶ÃŸe geteilt wird.",
        "\"Verarbeiten\" drÃ¼cken und die erzeugten Dateien automatisch herunterladen.",
      ],
      note:
        "PDFLince lÃ¤dt die erste Datei sofort und speichert weitere ohne zusÃ¤tzliche Schritte.",
    },
    useCasesTitle: "Typische AnwendungsfÃ¤lle",
    useCases: [
      "Jedes Kapitel eines E-Books in einem Online-Kurs einzeln bereitstellen.",
      "AnhÃ¤nge trennen, die Ã¼ber verschiedene KanÃ¤le versandt werden mÃ¼ssen.",
      "Quartalszusammenfassungen aus umfangreichen Finanzberichten extrahieren.",
      "Schlanke Pakete fÃ¼r Kund:innen erstellen, ohne interne Dokumente offenzulegen.",
    ],
  },
  extract: {
    key: "extract",
    slug: "seiten-extrahieren",
    mode: "extract",
    meta: {
      title: "PDF-Seiten extrahieren | Seiten speichern | PDFLince",
      description:
        "WÃ¤hle einzelne Seiten aus und speichere sie als neues Dokument. Private Verarbeitung direkt im Browser.",
      keywords: [
        "pdf seiten extrahieren",
        "pdf seiten speichern",
        "pdf seiten auswÃ¤hlen",
        "pdf page extractor",
        "neues pdf erstellen",
      ],
      ogTitle: "Nur die benÃ¶tigten Seiten extrahieren | PDFLince",
      ogDescription:
        "Markiere einfach die relevanten Seiten, erstelle in Sekunden ein neues PDF und behalte deine Daten sicher auf deinem eigenen GerÃ¤t.",
      ogImageAlt: "Seiten in PDFLince auswÃ¤hlen",
    },
    hero: {
      title: "Gezielte PDF-Seiten extrahieren",
      description:
        "Stelle maÃŸgeschneiderte Dokumente zusammen, indem du ausschlieÃŸlich die benÃ¶tigten Seiten bewahrst.",
      bulletPoints: [
        "Miniaturen anzeigen und einzelne Seiten markieren",
        "Originale Seitennummerierung oder neue Abschnitte verwenden",
        "Ergebnis sofort ohne Wartezeit herunterladen",
      ],
      imageAlt: "PDF-Seiten auswÃ¤hlen",
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
          "Seiten auswÃ¤hlen, prÃ¼fen und bestÃ¤tigen ohne schwere Software oder stabile Leitung.",
      },
      {
        title: "Saubere Ergebnisse",
        description:
          "Das neue PDF behÃ¤lt QualitÃ¤t und Metadaten je nach gewÃ¤hlten Optionen.",
      },
    ],
    howTo: {
      title: "So extrahierst du Seiten mit PDFLince",
      steps: [
        "PDF hochladen und die gewÃ¼nschte Datei auswÃ¤hlen.",
        "BenÃ¶tigte Seiten im Miniaturbereich markieren.",
        "\"Verarbeiten\" klicken, um ein PDF mit den markierten Seiten zu laden.",
      ],
      note:
        "Extraktion lÃ¤sst sich mit anderen Operationen wie ZusammenfÃ¼hren oder Komprimieren kombinieren.",
    },
    useCasesTitle: "Ideen zum Extrahieren",
    useCases: [
      "Nur das relevante Kapitel eines Handbuchs mit dem Team teilen.",
      "Bestimmte Seiten eines Vertrags fÃ¼r die RechtsprÃ¼fung senden.",
      "Individuelle Dossiers fÃ¼r Kund:innen mit passenden Informationen zusammenstellen.",
      "Nur Formular- oder Belegseiten sichern, die archiviert werden mÃ¼ssen.",
    ],
  },
  crop: {
    key: "crop",
    slug: "zuschneiden",
    mode: "crop",
    meta: {
      title: "PDF-Seiten zuschneiden | Ränder entfernen | PDFLince",
      description:
        "Schneide PDF-Seiten direkt im Browser zu und entferne überflüssige Ränder. Alles läuft lokal und ohne Uploads.",
      keywords: [
        "pdf zuschneiden",
        "pdf ränder entfernen",
        "pdf crop",
        "seiten zuschneiden",
        "pdf beschneiden",
      ],
      ogTitle: "PDF-Seiten lokal zuschneiden | PDFLince",
      ogDescription:
        "Wähle die Seiten aus, definiere die Ränder und lade ein sauber zugeschnittenes PDF herunter, ohne Dateien hochzuladen.",
      ogImageAlt: "PDF-Seiten in PDFLince zuschneiden",
    },
    hero: {
      title: "PDF-Seiten zuschneiden und Ränder verkleinern",
      description:
        "Entferne unnötige Leerräume von ausgewählten Seiten und lade in Sekunden ein kompakteres Dokument herunter.",
      bulletPoints: [
        "Nur die Seiten auswählen, die angepasst werden sollen",
        "Oben, rechts, unten und links präzise Randwerte festlegen",
        "Vollständig lokale Verarbeitung ohne Server",
      ],
      imageAlt: "PDF-Zuschneide-Workflow",
    },
    benefitsTitle: "Warum PDFs mit PDFLince zuschneiden",
    benefits: [
      {
        title: "Saubere Seiten",
        description:
          "Reduziere leere Ränder und lenke den Fokus auf den eigentlichen Inhalt.",
      },
      {
        title: "Gezielte Bearbeitung",
        description:
          "Passe nur die betroffenen Seiten an, statt das ganze Dokument neu aufzubauen.",
      },
      {
        title: "Privat standardmäßig",
        description:
          "Die Dateien bleiben während des gesamten Vorgangs auf deinem Gerät.",
      },
    ],
    howTo: {
      title: "So schneidest du PDF-Seiten mit PDFLince zu",
      steps: [
        "Lade das PDF hoch und wähle die Datei aus, die du anpassen möchtest.",
        "Markiere die Seiten und lege die oberen, rechten, unteren und linken Ränder fest.",
        "Klicke auf „Verarbeiten“, um ein neues zugeschnittenes PDF herunterzuladen.",
      ],
      note:
        "Wenn verschiedene Seiten unterschiedliche Zuschnitte brauchen, führe den Vorgang mehrfach aus.",
    },
    useCasesTitle: "Wann Zuschneiden sinnvoll ist",
    useCases: [
      "Scanner-Ränder von Formularen, Rechnungen oder unterschriebenen Dokumenten entfernen.",
      "Überflüssige Ränder vor dem Drucken oder Zusammenführen von Dateien reduzieren.",
      "Seiten aus unterschiedlichen Tools optisch vereinheitlichen.",
      "Berichte, Handbücher oder Lernmaterial mit kompakterem Seitenrahmen vorbereiten.",
    ],
  },
  rotate: {
    key: "rotate",
    slug: "drehen",
    mode: "rotate",
    meta: {
      title: "PDF-Seiten drehen | Ausrichtung korrigieren | PDFLince",
      description:
        "Drehe ausgewahlte PDF-Seiten um 90 oder 180 Grad direkt im Browser. Kostenlos, privat und ohne Upload.",
      keywords: [
        "pdf drehen",
        "pdf seiten drehen",
        "pdf ausrichtung korrigieren",
        "gedrehte pdf seiten",
        "seitenrotation pdf",
      ],
      ogTitle: "PDF-Seiten in Sekunden drehen | PDFLince",
      ogDescription:
        "Wahle die Seiten mit falscher Ausrichtung, stelle 90 oder 180 Grad ein und lade das korrigierte PDF ohne Upload herunter.",
      ogImageAlt: "PDF-Seiten in PDFLince drehen",
    },
    hero: {
      title: "PDF-Seiten ohne Qualitatsverlust drehen",
      description:
        "Korrigiere schiefe Scans, kopfstehende Seiten oder gemischte Ausrichtungen mit wenigen Klicks.",
      bulletPoints: [
        "Nur die ausgewahlten Seiten drehen statt das ganze Dokument",
        "90 Grad nach rechts, 180 Grad oder 90 Grad nach links wahlen",
        "Alles bleibt lokal im Browser ohne Upload",
      ],
      imageAlt: "Workflow zum Drehen von PDF-Seiten",
    },
    benefitsTitle: "Warum Seiten mit PDFLince drehen",
    benefits: [
      {
        title: "Gezielte Korrekturen",
        description:
          "Passe nur die Seiten an, die wirklich falsch ausgerichtet sind.",
      },
      {
        title: "Schneller sauber",
        description:
          "Korrigiere die Lesrichtung in Sekunden ohne schweren Desktop-Editor.",
      },
      {
        title: "Privat standardmassig",
        description:
          "Vertrauliche Dokumente bleiben auf deinem Gerat, weil alles lokal verarbeitet wird.",
      },
    ],
    howTo: {
      title: "So drehst du PDF-Seiten",
      steps: [
        "PDF hochladen und die Datei mit den zu korrigierenden Seiten auswahlen.",
        "Seiten markieren und 90 Grad nach rechts, 180 Grad oder 90 Grad nach links auswahlen.",
        "Auf Verarbeiten klicken und das korrigierte PDF herunterladen.",
      ],
      note:
        "Danach kannst du das Ergebnis weiterhin neu ordnen, extrahieren oder komprimieren.",
    },
    useCasesTitle: "Wann sich das Drehen lohnt",
    useCases: [
      "Seitlich gescannte Vertrage oder Formulare korrigieren.",
      "Kopfstehende Seiten in Berichten aus mehreren Quellen richten.",
      "Unterlagen vor dem Teilen mit Team oder Kundschaft lesbar machen.",
      "Archiv-PDFs fur bequemes Lesen am Bildschirm bereinigen.",
    ],
  },
  reorder: {
    key: "reorder",
    slug: "seiten-sortieren",
    mode: "reorder",
    meta: {
      title: "PDF-Seiten neu sortieren | Ordnung Ã¤ndern | PDFLince",
      description:
        "Bringe deine PDF-Seiten per Drag & Drop ganz einfach in die richtige Reihenfolge. Organisiere Dokumente neu und speichere das Ergebnis sofort und sicher ab.",
      keywords: [
        "pdf neu anordnen",
        "pdf seiten sortieren",
        "pdf reihenfolge Ã¤ndern",
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
        "In wenigen Sekunden die Reihenfolge von gescannten Rechnungen, PrÃ¤sentationen oder umfangreichen Berichten korrigieren.",
      bulletPoints: [
        "GroÃŸe Miniaturen vermeiden Fehlgriffe",
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
        title: "Visuelle PrÃ¤zision",
        description:
          "Miniaturen erlauben die Kontrolle jeder Seite vor dem Export.",
      },
      {
        title: "Keine Spuren",
        description:
          "Der komplette Vorgang bleibt auf dem eigenen GerÃ¤t â€“ ideal fÃ¼r vertrauliche Unterlagen.",
      },
    ],
    howTo: {
      title: "So sortierst du Seiten mit PDFLince neu",
      steps: [
        "PDF hochladen und gewÃ¼nschte Datei wÃ¤hlen.",
        "Miniaturen per Drag & Drop in die richtige Reihenfolge bringen.",
        "Auf \"Verarbeiten\" klicken, um das Dokument mit neuer Reihenfolge herunterzuladen.",
      ],
      note:
        "Auch nach einem Export weiter anpassen â€“ ohne die Datei erneut hochzuladen.",
    },
    useCasesTitle: "Wann Seiten sortieren?",
    useCases: [
      "Angebote, AnhÃ¤nge und Unterschriften logisch anordnen, bevor sie versendet werden.",
      "Gedruckte PrÃ¤sentationen in der richtigen Reihenfolge vorbereiten.",
      "Doppelte oder vertauschte Seiten nach einem Massenscan korrigieren.",
      "HandbÃ¼cher oder Kataloge aktualisieren, indem vorhandene Inhalte neu sortiert werden.",
    ],
  },
  pdfToImages: {
    key: "pdfToImages",
    slug: "pdf-zu-bildern",
    mode: "pdfToImages",
    meta: {
      title: "PDF in Bilder umwandeln | PNG/JPEG Export | PDFLince",
      description:
        "Wandle jede Seite deines PDFs in hochwertige PNG- oder JPEG-Bilder um. Bestimme die AuflÃ¶sung selbst und lade alles als ZIP-Datei herunter â€“ 100% privat.",
      keywords: [
        "pdf zu bildern",
        "pdf zu png",
        "pdf zu jpeg",
        "pdf seiten exportieren",
        "pdf als bilder herunterladen",
      ],
      ogTitle: "PDF-Seiten als saubere Bilder exportieren | PDFLince",
      ogDescription:
        "Render jede Seite direkt im Browser als scharfes Bild. WÃ¤hle Format und QualitÃ¤t und erhalte sofort ein strukturiertes ZIP-Archiv.",
      ogImageAlt: "PDFLince konvertiert PDF-Seiten in Bilder",
    },
    hero: {
      title: "PDF-Seiten als PNG oder JPEG speichern",
      description:
        "Erzeuge gestochen scharfe Bilder fÃ¼r PrÃ¤sentationen, Reviews oder Design-Handovers ohne schwere Desktop-Software.",
      bulletPoints: [
        "Zwischen PNG und JPEG wÃ¤hlen und die DPI exakt festlegen",
        "Alles als einzelnes ZIP bÃ¼ndeln oder Seiten einzeln herunterladen",
        "Rendering lÃ¤uft direkt im Browser â€“ keine Uploads, keine Spuren",
      ],
      imageAlt: "Workflow von PDF zu Bildern in PDFLince",
    },
    benefitsTitle: "Warum PDFs mit PDFLince exportieren",
    benefits: [
      {
        title: "QualitÃ¤t nach Bedarf",
        description:
          "Passe die AuflÃ¶sung an Slides, Intranet oder Review-Tools an und stelle sicher, dass jede Seite scharf bleibt.",
      },
      {
        title: "Flexible Auslieferung",
        description:
          "Entscheide, ob du ein komplettes Archiv brauchst oder nur ausgewÃ¤hlte Seiten als Bild exportierst.",
      },
      {
        title: "Datenschutzfreundlich",
        description:
          "Alle Berechnungen passieren im Browser. Vertrauliche Unterlagen verlassen dein GerÃ¤t nie.",
      },
    ],
    howTo: {
      title: "So wandelst du ein PDF in Bilder um",
      steps: [
        "PDF hochladen, das konvertiert werden soll. Wir bearbeiten eine Datei nach der anderen fÃ¼r beste QualitÃ¤t.",
        "PNG oder JPEG wÃ¤hlen, DPI einstellen und entscheiden, ob ein ZIP erzeugt werden soll.",
        "Auf \"Bilder exportieren\" klicken, um das Archiv oder einzelne Dateien sofort herunterzuladen.",
      ],
      note:
        "Du brauchst nur einzelne Seiten? Teile oder extrahiere sie zuerst und exportiere dann als Bilder.",
    },
    useCasesTitle: "Wann sich PDF-zu-Bild lohnt",
    useCases: [
      "Design-Freigaben als statische Bilder teilen, ohne das Original-PDF zu verschicken.",
      "PDF-Seiten in CMS, Wikis oder PrÃ¤sentationen einbauen, die Bilddateien erwarten.",
      "Tablets oder E-Reader versorgen, die groÃŸe PDFs schlecht darstellen.",
      "Schritt-fÃ¼r-Schritt-Dokumentationen mit Screenshots jeder PDF-Seite erstellen.",
    ],
  },
  imagesToPdf: {
    key: "imagesToPdf",
    slug: "bilder-zu-pdf",
    mode: "imagesToPdf",
    meta: {
      title: "PDF aus Bildern erstellen | JPG, PNG zu PDF | PDFLince",
      description:
        "Erstelle aus deinen Bildern ein professionelles PDF. Passe Layout, RÃ¤nder und Ausrichtung an und generiere dein Dokument sicher und lokal im Browser.",
      keywords: [
        "bilder zu pdf",
        "jpg zu pdf",
        "png zu pdf",
        "webp zu pdf",
        "pdf aus bildern erstellen",
      ],
      ogTitle: "Ein ordentliches PDF aus Bildern bauen | PDFLince",
      ogDescription:
        "Ziehe deine Bilder in die Liste, lege die Reihenfolge fest und exportiere ein druckfertiges PDF â€“ ganz ohne Uploads oder Wasserzeichen.",
      ogImageAlt: "PDFLince erstellt ein PDF aus Bildern",
    },
    hero: {
      title: "Ein aufgerÃ¤umtes PDF aus Bildern erstellen",
      description:
        "Fasse Scans, Fotos oder Grafiken zu einem einzigen PDF zusammen, das sich leicht teilen oder archivieren lÃ¤sst.",
      bulletPoints: [
        "Per Drag & Drop die Seitenreihenfolge bestimmen",
        "SeitengrÃ¶ÃŸe, Ausrichtung und RÃ¤nder fÃ¼r Print oder Bildschirm anpassen",
        "Eine Hintergrundfarbe setzen, um Transparenzen zu vermeiden",
      ],
      imageAlt: "Bilder-zu-PDF-Workflow in PDFLince",
    },
    benefitsTitle: "Warum Bilder mit PDFLince bÃ¼ndeln",
    benefits: [
      {
        title: "Konsequentes Layout",
        description:
          "Vereinheitliche unterschiedliche BildgrÃ¶ÃŸen und -formate, ohne dass etwas verzerrt wird.",
      },
      {
        title: "Bereit fÃ¼r PrÃ¼fung & Druck",
        description:
          "Steuere RÃ¤nder, Orientierung und Hintergrund, damit das PDF auf Papier und Displays Ã¼berzeugt.",
      },
      {
        title: "Sicherer Prozess",
        description:
          "Die Umwandlung bleibt komplett im Browser â€“ ideal fÃ¼r Belege, Ausweise oder Unterrichtsmaterial.",
      },
    ],
    howTo: {
      title: "So wandelst du Bilder in ein PDF um",
      steps: [
        "Die gewÃ¼nschten Bilder hinzufÃ¼gen und die Reihenfolge so anordnen, wie sie im PDF erscheinen sollen.",
        "Anpassungen fÃ¼r Bildanpassung, SeitengrÃ¶ÃŸe, Ausrichtung und RÃ¤nder vornehmen.",
        "Auf \"PDF erstellen\" klicken, um das Dokument herunterzuladen und direkt zu teilen oder zu archivieren.",
      ],
      note:
        "GroÃŸe Sammlungen? Das Ergebnis danach komprimieren oder aufteilen â€“ ohne die Bilder erneut hochzuladen.",
    },
    useCasesTitle: "Typische EinsÃ¤tze fÃ¼r Bild-zu-PDF",
    useCases: [
      "Eingescannte ArbeitsblÃ¤tter oder PrÃ¼fungen bÃ¼ndeln, bevor sie zurÃ¼ck an Lernende gehen.",
      "Spesenbelege als ein einziges PDF einreichen statt vieler einzelner AnhÃ¤nge.",
      "Lookbooks oder Produktkataloge aus Design-Exports in Sekunden erzeugen.",
      "Fotodokumentationen oder Inspektionsberichte fÃ¼r Stakeholder zusammenstellen.",
    ],
  },
};

export const operationsDe: Record<OperationKey, OperationContent> = {
  merge: operationsDeContent.merge,
  compress: operationsDeContent.compress,
  split: operationsDeContent.split,
  extract: operationsDeContent.extract,
  crop: operationsDeContent.crop,
  rotate: operationsDeContent.rotate,
  reorder: operationsDeContent.reorder,
  pdfToImages: operationsDeContent.pdfToImages,
  imagesToPdf: operationsDeContent.imagesToPdf,
};
