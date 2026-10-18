import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import { operationsHu } from "./operations";
import { faqsHu } from "./faqs";
import { getMcpContent } from "../mcp-content";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";

const locale = "hu" as const;
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

export const huDictionary: Dictionary = {
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
      title: "PDFLince – PDF tömörítése, összefűzése és konvertálása ingyen",
      description:
        "A PDFLince egy adatvédelemre összpontosító PDF-eszközkészlet, amely közvetlenül a böngésződben összefűzi, tömöríti, szétbontja, kinyeri, elforgatja és konvertálja a PDF-eket. Minden feldolgozás az eszközödön marad.",
      keywords: [
        "pdf tömörítés",
        "pdf compress",
        "pdf összefűzés",
        "pdf merge",
        "pdf split",
        "pdf szétbontása",
        "pdf oldalak kiválasztása",
        "extract pdf",
        "pdf forgatása",
        "pdf rotate",
        "pdf körülvágás",
        "pdf átrendezés",
        "pdf képekbe",
        "képek pdf-be",
        "pdf konvertálás",
        "pdf konvertálás online",
        "pdf png-be",
        "jpg pdf-be",
        "pdf szerkesztés offline",
        "pdf eszközkészlet",
        "pdf adatvédelem",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "PDFLince – PDF tömörítése, összefűzése, szétbontása, képekbe konvertálása",
        description:
          "Fűzd össze, tömörítsd, oszd fel, nyerd ki, rendezd át és konvertáld a PDF-eket szerverre való feltöltés nélkül. Ingyenes, privát, helyi feldolgozással.",
        url: `${siteUrl}${homePath}`,
        locale: "hu_HU",
        type: "website",
        imageUrl: "https://pdflince.com/og-images/og-image-hu.png",
        imageAlt: "PDFLince - Privát és ingyenes PDF-feldolgozás",
      },
    },
    faq: {
      title: "Gyakori kérdések | PDFLince – Ingyenes PDF-eszközkészlet",
      description:
        "Válaszok a PDFLince-re vonatkozó leggyakoribb kérdésekre. Tudd meg, hogyan fűzheted össze, tömörítheted, bonthatod szét, kinyerheted és rendezheted át a PDF-eket fájlok feltöltése nélkül.",
      keywords: [
        "pdflince gyakori kerdesek",
        "pdf kérdések",
        "pdf segítség",
        "pdf összefűzés segítség",
        "pdf tömörítés segítség",
        "pdf szétbontás segítség",
        "pdf elforgatása",
        "pdf átrendezés",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Támogasd a PDFLince-t | Tartsd fenn ingyenesen és privát módon",
      description:
        "A támogatásod lehetővé teszi, hogy a PDFLince kis, független és adatvédelemre összpontosító projekt maradjon. Segíts fedezni a tárhellyel és fejlesztéssel kapcsolatos költségeket.",
      keywords: [
        "pdflince támogatása",
        "pdf eszköz segítése",
        "adatvédelmi projektek támogatása",
        "pdflince stripe adomány",
        "pdflince ingyenesen megtartása",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    mcp: mcpContent.metadata,
    operations: operationsHu,
  },
  brand: {
    name: "PDFLince",
    tagline: "Helyi feldolgozás • 100% privát",
  },
  components: {
    nav: {
      home: "Főoldal",
      faq: "Gyakori kérdések",
      support: "Támogatás",
      photo: "FotoLince",
      mcp: "MCP Szerver",
      languageLabel: "Nyelv",
      menuLabel: "Navigációs menü megnyitása",
    },
    footer: {
      privacy: "Helyi feldolgozás • 100% privát • Nyílt licencek",
      rights: `© ${new Date().getFullYear()} PDFLince — PDF-eszközök az adatvédelem kompromisszuma nélkül`,
      links: {
        home: "Főoldal",
        faq: "Gyakori kérdések",
        support: "Támogatás",
        photo: "FotoLince",
        contact: "Kapcsolat",
        mcp: "MCP Szerver",
      },
      capabilitiesLabel: "Népszerű műveletek",
      operations: {
        merge: "PDF összefűzése",
        compress: "PDF tömörítése",
        split: "PDF szétbontása",
        extract: "Oldalak kinyerése",
        crop: "Oldalak vágása",
        rotate: "Forgatás",
        reorder: "Átrendezés",
        pdfToImages: "PDF képekbe",
        imagesToPdf: "Képek PDF-be",
      },
      license: "PDF-feldolgozás: PDF-lib (MIT), PDF.js (Apache 2.0) • Betűkészlet: Geist (MIT)",
      disclaimer:
        "A szolgáltatás \"jelenlegi állapotában\" kerül átadásra, mindenféle garancia nélkül. A fájlok felhasználásáért kizárólag a felhasználó felel.",
    },
    notifications: {
      labels: {
        success: "Sikeres",
        error: "Hiba",
        info: "Értesítés",
        warning: "Figyelmeztetés",
      },
      closeLabel: "Bezárás",
    },
    fotolinceBanner: {
      eyebrow: "Képeket kell optimalizálnod?",
      title: "Tömörítsd, méretezd át vagy konvertáld a FotoLince-szel",
      description:
        "Eszközkészletünk helyben dolgozza fel a JPG, PNG és WEBP fájlokat – tökéletes a képek méretének csökkentéséhez, mielőtt PDF-be konvertálnád őket.",
      ctaLabel: "FotoLince megnyitása",
      ctaHref: "https://fotolince.com",
      imageAlt: "FotoLince logó",
    },
    feedback: {
      question: "Hasznos volt?",
      thanks: "Köszönjük a visszajelzést!",
      whatWrong: "Mondd el, mi nem működött jól",
      emailSubject: "Visszajelzés a PDFLince-nek",
    },
    pdfProcessor: {
      title: "Válassz műveletet",
      modes: {
        merge: {
          label: "PDF összefűzése",
          helper: "Rendezd a PDF-fájlokat egyetlen dokumentumba való összefűzéshez.",
        },
        compress: {
          label: "PDF tömörítése",
          helper: "Csökkentsd a PDF méretét. A legjobb minőség-sebesség egyensúly érdekében egyszerre egy fájlt dolgozz fel.",
        },
        split: {
          label: "PDF szétbontása",
          helper: "Válassz PDF-fájlokat különálló dokumentumokra való szétbontáshoz.",
        },
        extract: {
          label: "Oldalak kinyerése",
          helper: "Válassz ki egyes oldalakat új dokumentum létrehozásához.",
        },
        crop: {
          label: "Oldalak vágása",
          helper: "Távolítsd el a kiválasztott oldalak látható margóit a böngésző elhagyása nélkül.",
        },
        rotate: {
          label: "Oldalak forgatása",
          helper: "Válassz ki helytelen tájolású oldalakat, és forgasd el őket.",
        },
        reorder: {
          label: "Átrendezés",
          helper: "Módosítsd az oldalak sorrendjét a PDF-ben.",
        },
        pdfToImages: {
          label: "PDF képekbe",
          helper: "Exportáld az egyes PDF-oldalakat PNG vagy JPEG formátumban szerverre feltöltés nélkül.",
        },
        imagesToPdf: {
          label: "Képek PDF-be",
          helper: "Kombinálj JPG, PNG vagy WEBP képeket PDF-be testre szabható elrendezéssel.",
        },
      },
      upload: {
        title: "Fájlok kiválasztása",
        clearAll: "Összes törlése",
        listHeadings: {
          merge: "Összefűzendő fájlok (húzd át a sorrend beállításához):",
          extract: "Válassz fájlt az oldalak feldolgozásához:",
          crop: "Válassz fájlt az oldalak feldolgozásához:",
          rotate: "Válassz fájlt az oldalak feldolgozásához:",
          reorder: "Válassz fájlt az oldalak feldolgozásához:",
          pdfToImages: "Konvertálandó PDF (egymás után dolgozva fel):",
          imagesToPdf: "Kombinálandó képek (húzd át a végső sorrend megadásához):",
          default: "Kiválasztott fájlok (húzd át vagy töröld):",
        },
        hints: {
          compress: "Minden fájl külön-külön kerül tömörítésre az optimális minőség-méret arány szerint.",
          split: "Minden PDF a következő lépésben megadott beállítások alapján kerül szétbontásra.",
          crop: "Válaszd ki a vágandó oldalakat, majd határozd meg, hány pontot kell eltávolítani minden oldalról.",
          pdfToImages: "Egyszerre egy PDF-et dolgozunk fel. Az exportálás előtt állítsd be a formátumot és a DPI-t.",
          imagesToPdf: "Adj hozzá JPG, PNG, WEBP vagy TIFF képeket. A méret, a margók és a szín a beállítások panelen módosítható.",
        },
      },
      downloadNames: {
        compress: "tomoritett_PDFLince",
        merge: "osszefuzott_PDFLince",
        split: "resz_PDFLince",
        extract: "kinyert_PDFLince",
        crop: "vagott_PDFLince",
        rotate: "forgatott_PDFLince",
        reorder: "atrendezett_PDFLince",
        pdfToImages: "kepek_PDFLince",
        imagesToPdf: "kepek_pdf_PDFLince",
      },
      processButton: {
        idleSingle: "1 fájl feldolgozása",
        idleMultiple: (count: number) => `${count} fájl feldolgozása`,
        processing: "Feldolgozás...",
        extract: (count: number) => `${count} oldal kinyerése`,
        crop: (count: number) =>
          count > 0 ? `${count} oldal vágása` : "PDF vágása",
        rotate: (count: number) =>
          count > 0 ? `${count} oldal forgatása` : "PDF forgatása",
        reorder: "Sorrend mentése",
        pdfToImages: {
          single: "Képek exportálása",
          multiple: (count: number) => `${count} PDF exportálása`,
        },
        imagesToPdf: {
          single: "PDF létrehozása",
          multiple: (count: number) => `PDF létrehozása ${count} képből`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Feldolgozás (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Tömörítve. Csökkentés: ${reduction}% (${original} → ${next}) ${seconds} mp alatt`,
        merged: "Összefűzés kész",
        split: (count: number) =>
          count > 1
            ? `${count} fájl létrehozva. Az első letöltése folyamatban...`
            : "Szétbontás kész",
        extracted: (count: number) => `${count} oldal kinyerve`,
        cropped: (count: number) => `${count} oldal levágva`,
        rotated: (count: number) => `${count} oldal elforgatva`,
        reordered: "Átrendezés kész",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `${count} ${label} kép exportálva ZIP-archívumba`
            : `${count} ${label} kép letöltve`;
        },
        imagesToPdf: (count: number) =>
          `PDF létrehozva ${count} képből`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Nincs generált eredmény",
        mergeRequiresTwo: "Válassz legalább két fájlt",
        noPagesSelected: "Válassz legalább egy oldalt",
        invalidFile: "Válassz érvényes fájlt",
        reorderEmpty: "Nem észlelhető új sorrend",
        unknown: "Ismeretlen hiba",
        modeNotSupported: "Nem támogatott mód",
      },
      labels: {
        pagesToExtract: "Kinyerni kívánt oldalak kiválasztása:",
        pagesToCrop: "Vágni kívánt oldalak kiválasztása:",
        pagesToRotate: "Forgatni kívánt oldalak kiválasztása:",
        reorderPages: "Húzd az oldalakat az átrendezéshez:",
      },
      compressionPreview: {
        title: "Tömörítési előnézet",
        description:
          "Állítsd be a paramétereket a kimeneti méret becslésének megtekintéséhez a tömörítés megkezdése előtt.",
        running: "Előnézet kiszámítása…",
        readyLabel: "Becsült méret",
        ratio: (percent: string) => `${percent}%-kal kisebb`,
        saved: (size: string) => `${size} megtakarítás`,
        time: (seconds: string) => `≈ ${seconds} mp`,
        original: "Eredeti",
        result: "Becsült",
        notice:
          "Az előnézet helyben fut. Semmi nem kerül fel a szervereinkre.",
        error: "Nem sikerült előnézetet létrehozni.",
        retry: "Előnézet újrapróbálása",
        universalBadge: "Univerzális optimalizálás",
      },
      compressionSummary: {
        title: "Utolsó tömörítés",
        ratio: (percent: string) => `${percent}%-kal kisebb`,
        saved: (size: string) => `${size} megtakarítva`,
        original: "Eredeti",
        result: "Tömörített",
        duration: (seconds: string) => `Befejezve ${seconds} mp alatt`,
        download: "Újra letöltés",
        clear: "Összesítés törlése",
      },
      donationReminder: {
        message: "A PDFLince segített időt megtakarítani? Támogatásoddal ingyenes marad.",
        actionLabel: "PDFLince támogatása",
        withSavings: (percent: string, saved: string) =>
          `Megtakarítottál ${saved}-t (${percent}%)? Segíts megőrizni a PDFLince-t reklámmentesen.`,
      },
      statusDialog: {
        processingTitle: "Helyi feldolgozás",
        successTitle: "A fájlaid készen állnak",
        successDescription:
          "A letöltés automatikusan elindul.",
        resultsLabel: "Utolsó eredmény",
        filesProcessedLabel: (count: number) =>
          `${count} fájl feldolgozva`,
        downloadAgainLabel: "Letöltés",
        errorTitle: "Feldolgozási hiba",
        errorDescription: "Nem sikerült végrehajtani a műveletet. Ellenőrizd a fájlokat.",
        retryLabel: "Újrapróbálás",
        closeLabel: "Bezárás",
        sharePrompt: {
          dialogMessage: "A PDFLince teljesen ingyenes, és tiszteletben tartja az adatvédelmedet. Segíts megőrizni ezt azzal, hogy ajánlod egy kollégádnak.",
          shareText: "Imént használtam a PDFLince-t PDF-fájlok kezelésére. Egy ingyenes, gyors és teljesen privát eszközkészlet PDF-ek szétbontásához, tömörítéséhez, összefűzéséhez és konvertálásához közvetlenül a böngészőben. Kiváló érzékeny dokumentumokhoz!",
          actionLabel: "Megosztás",
          copiedLabel: "Másolva!",
        },
      },
      compressionTotal: {
        title: "Összes megtakarítás",
        savings: (size: string) => `összesen ${size} megtakarítva`,
        count: (count: number) => `${count} fájl optimalizálva`,
      },
    },
    fileUploader: {
      clickToSelect: "Kattints a kiválasztáshoz",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "vagy húzd ide a képeket" : "vagy húzd ide a PDF-fájlokat",
      accepted: {
        pdf: "PDF-fájlok",
        images: "Elfogadott formátumok: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Ajánlott méret: < ${sizeMb} MB`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Nem támogatott formátum: ${fileName}. Csak ${label} engedélyezett.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Túl nagy fájl: ${fileName}. A maximális méret ${sizeMb} MB.`,
      },
      dropImagesAlt: "Háttérkép",
    },
    fileList: {
      moveUp: "Mozgatás fel",
      moveDown: "Mozgatás le",
      remove: "Eltávolítás",
      removeAll: "Összes eltávolítása",
      imageLabel: "Kép",
      fileLabel: "Fájl",
      selected: "Kiválasztva",
      pdfLabel: "PDF",
      deselect: "Kijelölés törlése",
      pagesLabel: (count: number) => `${count} oldal`,
      previewLoading: "Előnézet betöltése…",
    },
    pageSelector: {
      loading: "Oldalak betöltése...",
      error: "Nem sikerült betölteni a PDF adatait",
      summary: (total: number, selected: number) =>
        `${total} oldal észlelve – ${selected} kiválasztva`,
      selectAll: "Összes kijelölése",
      deselectAll: "Összes kijelölés törlése",
      pageLabel: (pageNumber: number) => `${pageNumber}. oldal`,
      extraPages: (shown: number, total: number) =>
        `${total} oldalból ${shown} jelenik meg. Add meg a további oldalak számát.`,
      manualLabel: "Oldalszámok megadása (pl. 21, 25-30)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Oldalak betöltése...",
      error: "Nem sikerült betölteni a PDF adatait",
      limitReached: (count: number) =>
        `Ez a PDF ${count} oldalt tartalmaz. Teljesítményi okokból legfeljebb 120 oldal rendezhető át.`,
      limitHint:
        "Először oszd fel a PDF-et kisebb részekre.",
      summary: (count: number) => `${count} oldal készen áll az átrendezésre`,
      reset: "Sorrend visszaállítása",
      dragHint: "Húzd az oldalakat a sorrend módosításához",
      pageLabel: (pageNumber: number) => `${pageNumber}. oldal`,
      originalLabel: (pageNumber: number) => `Eredeti: ${pageNumber}. oldal`,
      instructions:
        "Húzd az oldalakat a kívánt sorrendbe. Ha kész, kattints a \"Sorrend mentése\" gombra.",
    },
    processingOptions: {
      compress: {
        title: "Tömörítés",
        level: "Szint",
        levels: {
          low: "Alacsony",
          medium: "Közepes",
          high: "Magas",
        },
        removeMetadata: "Metaadatok eltávolítása",
        removeMetadataHint: "Törli a rejtett adatokat, mint a szerző és az előzmények.",
        stripAnnotations: "Megjegyzések eltávolítása",
        stripAnnotationsHint: "Törli a megjegyzéseket, az űrlapokat és az aláírásokat.",
        downscaleImages: "Képek átméretezése",
        downscaleHint: "Ideális beszkennelt dokumentumokhoz.",
        advancedTitle: "Speciális tisztítás",
        advancedDescription: "Maradj az egyszerű beállításoknál, vagy aktiváld a szükséges bővítményeket.",
        activeLabel: "Aktív:",
      },
      merge: {
        title: "Összefűzés",
        pageDivider: "Üres oldal a dokumentumok között",
        metadataTitle: "Az összefűzött dokumentum neve (nem kötelező)",
        metadataAuthor: "A dokumentum szerzője (nem kötelező)",
        metadataHint: "Egyéni metaadatok beállítása.",
      },
      split: {
        title: "Szétbontás",
        pagesPerFile: "Oldalak fájlonként",
        pagesPerFileHint: "Minden N oldalnál új PDF jön létre.",
      },
      extract: {
        title: "Kinyerés",
        preserveMetadata: "Metaadatok megőrzése",
        preserveMetadataHint: "Megtartja a címet, a szerzőt és más adatokat.",
      },
      crop: {
        title: "Vágás",
        hint: "Válaszd ki a vágandó oldalakat, és határozd meg a margókat.",
        inputModeLabel: "Módszer",
        inputModes: {
          margins: "Margók beállítása",
          manual: "Manuális kijelölés",
        },
        marginsTitle: "Margók",
        marginLabels: {
          top: "Felső margó (pont)",
          right: "Jobb margó (pont)",
          bottom: "Alsó margó (pont)",
          left: "Bal margó (pont)",
        },
        marginHint: "72 pont ≈ 1 hüvelyk.",
        preserveMetadata: "Metaadatok megőrzése",
        preserveMetadataHint: "Megtartja a címet, a szerzőt és más adatokat.",
        manual: {
          title: "Manuális kijelölés",
          hint: "Húzd a keretet az előnézeten a látható terület meghatározásához.",
          loading: "Betöltés...",
          error: "Nem sikerült betölteni az előnézetet.",
          reset: "Visszaállítás",
          pagePreview: (pageNumber: number) => `${pageNumber}. oldal előnézete`,
        },
      },
      rotate: {
        title: "Forgatás",
        hint: "Válassz irányt, és jelöld meg az oldalakat.",
        rotateRight90: "Forgatás jobbra (90°)",
        rotate180: "Forgatás (180°)",
        rotateLeft90: "Forgatás balra (90°)",
      },
      reorder: {
        title: "Átrendezés",
        hint: "Húzd az előnézeti képeket a sorrend módosításához.",
      },
      pdfToImages: {
        title: "Exportálás",
        formatLabel: "Formátum",
        formatHint: "Válassz PNG-t veszteségmentes minőségért, vagy JPEG-et kisebb méretért.",
        pngLabel: "PNG (veszteségmentes)",
        jpegLabel: "JPEG (kisebb)",
        qualityLabel: "JPEG minőség",
        qualityHint: "A magasabb minőség több részletet őriz meg.",
        dpiLabel: "DPI felbontás",
        dpiHint: "A magasabb DPI javítja az élességet, de növeli a fájlméretet.",
        dpiPresets: {
          screen: "72 DPI · Képernyő",
          balanced: "144 DPI · Kiegyensúlyozott",
          print: "300 DPI · Nyomtatás",
        },
        zipLabel: "Képek csomagolása ZIP-be",
        zipHint: "Letöltés egyetlen archívumban.",
        baseNameLabel: "Fájlnév alap",
        baseNamePlaceholder: "pdflince_oldalak",
        baseNameHint: "Hagyd üresen az eredeti PDF neve használatához.",
      },
      imagesToPdf: {
        title: "Oldal elrendezése",
        layoutTitle: "Oldal elrendezése",
        fitLabel: "Kép illesztése",
        fitOptions: {
          contain: "Beleférve (teljes kép megjelenítése)",
          cover: "Kitöltve (oldal lefedése)",
        },
        sizeLabel: "Oldalméret",
        sizeOptions: {
          auto: "Automatikus (képhez igazítva)",
          a4: "A4",
          letter: "Letter",
        },
        orientationLabel: "Tájolás",
        orientationOptions: {
          auto: "Automatikus",
          portrait: "Álló",
          landscape: "Fekvő",
        },
        marginLabel: "Margók (pont)",
        marginHint: "Adj hozzá fehér margót. 72 pont ≈ 1 hüvelyk.",
        backgroundLabel: "Háttérszín",
        backgroundHint: "A képek mögé alkalmazva.",
      },
    },
    cookieBanner: {
      message: "Sütiket használunk a forgalom elemzéséhez. Az adataidat nem osztjuk meg harmadik felekkel.",
      accept: "Elfogadás",
      decline: "Elutasítás",
    },
  },
  pages: {
    home: {
      hero: {
        title: "PDFLince: PDF tömörítése, összefűzése és konvertálása ingyen",
        subtitle:
          "Tömörítsd, fűzd össze, bontsd szét, nyerd ki, forgasd el és konvertáld a PDF-eket közvetlenül a böngésződben. Szerverre feltöltés nélkül, teljesen privát módon.",
        badges: [
          "PDF tömörítése",
          "PDF összefűzése",
          "Helyi feldolgozás",
          "PDFLince támogatása",
        ],
        imageAlt: "PDF dokumentum illusztrációja",
        ctaLinks: [
          {
            label: "PDF képekbe",
            href: operationsRoutes.pdfToImages,
            description: "Exportálás PNG vagy JPEG formátumban",
          },
          {
            label: "Képek PDF-be",
            href: operationsRoutes.imagesToPdf,
            description: "JPG, PNG vagy WEBP kombinálása",
          },
        ],
      },
      why: {
        title: "Miért válaszd a PDFLince-t?",
        cards: [
          {
            title: "Alapból privát",
            description:
              "A PDF-jeid soha nem hagyják el az eszközödet. Minden a böngésződben zajlik.",
            icon: "🔒",
          },
          {
            title: "Gyors és hatékony",
            description:
              "A helyi motor maximális sebességet biztosít felhőalapú tárhelytől való függés nélkül.",
            icon: "⚡",
          },
          {
            title: "Bárhol működik",
            description:
              "Számítógépen, tableten vagy okostelefonon – elegendő egy modern böngésző.",
            icon: "📱",
          },
        ],
      },
      callout: {
        title: "Segíts megőrizni a PDFLince-t ingyenesen",
        description:
          "Minden adományod fedezi a tárhelyköltségeket, és lehetővé teszi a 100%-ban privát, reklám- és nyomkövetés-mentes működés fenntartását.",
        ctaLabel: "Projekt támogatása",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Tudd meg, hogyan használjuk fel az összeget",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Gyakori kérdések",
      intro: "Válaszok a PDFLince-re vonatkozó leggyakoribb kérdésekre",
      cta: {
        title: "Próbáld ki a PDFLince-t most",
        description:
          "Fűzd össze, tömörítsd, bontsd szét, nyerd ki, forgasd el és rendezd át a PDF-eket teljes bizalmassággal.",
        ctaLabel: "Ugrás az eszközökhöz",
      },
    },
    support: {
      hero: {
        eyebrow: "🌱 Független projekt",
        title: "Segíts megőrizni a PDFLince-t ingyenesen és privát módon",
        subtitle:
          "A PDFLince egy kis, szenvedéllyel fejlesztett projekt. A támogatásod fedezi a szerverköltségeket.",
        highlight: "Csupán egy egyszerű eszköz, amely tiszteletben tartja az adatvédelmedet.",
      },
      reasons: {
        title: "Miért támogasd?",
        cards: [
          {
            title: "Maradjon ingyenes",
            description:
              "Az adományok lehetővé teszik, hogy a PDFLince 100%-ban ingyenes maradjon mindenki számára.",
            icon: "💚",
          },
          {
            title: "Folyamatos fejlesztés",
            description:
              "A támogatásod finanszírozza a hibajavításokat és az új eszközök fejlesztését.",
            icon: "✨",
          },
          {
            title: "Adatvédelem megőrzése",
            description:
              "Mindent helyben dolgozunk fel. Az adományok lehetővé teszik, hogy így folytassuk.",
            icon: "🔒",
          },
        ],
      },
      tiers: {
        title: "Adj annyit, amennyit tudsz",
        description: "Bármilyen összeg segít. Biztonságos fizetés Stripe-on keresztül.",
        cards: [
          {
            id: "coffee",
            title: "Vegyél egy kávét",
            amount: "3 €",
            description: "Néhány hétre fedezi a tárhelyköltségeket.",
            ctaLabel: "3 € adományozása",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Havi támogatás",
            amount: "10 €/hó",
            description: "Heti dedikált fejlesztési időt biztosít a PDFLince javítására.",
            ctaLabel: "10 €/hó adományozása",
            ctaHref: "#stripe-checkout-monthly",
            badge: "💙 Köszönjük",
          },
          {
            id: "custom",
            title: "Egyéni összeg",
            amount: "Bármilyen összeg",
            description: "Minden euró számít. Válaszd a számodra megfelelő összeget.",
            ctaLabel: "Összeg kiválasztása",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Biztonságos fizetés Stripe-on keresztül. Az ismétlődő adomány bármikor lemondható.",
      },
      transparency: {
        title: "Mire megy a pénz",
        items: [
          "Tárhelyszolgáltatás és tartalomszolgáltató hálózat (CDN) a webhely globálisan gyors működéséhez",
          "Fejlesztői idő a hibák javítására és új funkciók hozzáadására",
          "Dizájn és UX fejlesztések a lehető legjobb felhasználói élmény érdekében",
          "Fordítások és dokumentáció minden támogatott nyelvhez",
        ],
      },
      faq: {
        title: "Kérdések",
        entries: [
          {
            question: "Mi történik, ha nem tudok adományozni?",
            answer:
              "Semmi gond. A PDFLince ingyenes marad. Már az is óriási segítség, ha megosztod másokkal.",
          },
          {
            question: "Kapok nyugtát?",
            answer:
              "Igen. A Stripe automatikusan e-mailen küldi el a nyugtát a fizetés összes adatával.",
          },
          {
            question: "Hogyan mondhatom le az ismétlődő adományt?",
            answer:
              "A Stripe portálodon keresztül kezelheted, vagy írj nekünk e-mailt, és mi leállítjuk.",
          },
        ],
      },
      closing: {
        title: "Köszönjük, hogy itt vagy",
        description:
          "Mindenki, aki támogatja a PDFLince-t, hozzájárul egy hasznos PDF-eszközkészlet életben tartásához.",
        ctaLabel: "E-mail küldése a csapatnak",
        ctaHref: "mailto:info@pdflince.com?subject=Helló%20PDFLince%20csapat",
      },
      legalNotice: {
        title: "Jogi tájékoztató és átláthatóság",
        points: [
          "A PDFLince egy független személyes projekt, amelyet egy kis önkéntes csapat kezel.",
          "A hozzájárulások önkéntesek, és kizárólag a tárhellyel és fejlesztéssel kapcsolatos költségek fedezésére szolgálnak.",
          "A befizetések nem adókedvezményes adományok; a Stripe automatikus nyugtát állít ki.",
          "A szolgáltatás \"jelenlegi állapotában\" kerül nyújtásra, garancia nélkül. Kérdések? info@pdflince.com.",
        ],
      },
    },
    mcp: mcpContent.page,
  },
  faqs: faqsHu,
  operations: operationsHu,
};
