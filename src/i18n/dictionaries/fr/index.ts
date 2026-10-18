import { localeLabels } from "../../config";
import { getRoutePath, getOperationPath } from "../../routing";
import { operationsFr } from "./operations";
import { faqsFr } from "./faqs";
import { getMcpContent } from "../mcp-content";
import type { Dictionary } from "../dictionary-types";
import { OperationKey } from "../../../types/operations";

const locale = "fr" as const;
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

export const frDictionary: Dictionary = {
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
      title: "PDFLince – Fusionner, compresser et convertir des PDF gratuitement",
      description:
        "PDFLince est une boîte à outils axée sur la confidentialité qui fusionne, compresse, divise, extrait, pivote et convertit des PDF directement dans votre navigateur. Tout le traitement reste sur l'appareil.",
      keywords: [
        "fusionner pdf",
        "compresser pdf",
        "diviser pdf",
        "extraire pages pdf",
        "pivoter pages pdf",
        "réorganiser pdf",
        "pdf en images",
        "images en pdf",
        "convertir pdf",
        "convertir pdf en ligne",
        "convertir pdf en png",
        "jpg en pdf",
        "modifier pdf hors ligne",
        "boîte à outils pdf",
        "confidentialité pdf",
      ],
      canonical: `${siteUrl}${homePath}`,
      openGraph: {
        title: "PDFLince – Fusionner, Compresser, Diviser, PDF en Image",
        description:
          "Fusionnez, compressez, divisez, extrayez, réorganisez et convertissez des PDF sans télécharger de fichiers. Gratuit, privé et soutenu par un traitement entièrement local.",
        url: `${siteUrl}${homePath}`,
        locale: "fr_FR",
        type: "website",
        imageUrl: "https://pdflince.com/og-images/og-image-fr.png",
        imageAlt: "PDFLince - Traitement PDF privé et gratuit",
      },
    },
    faq: {
      title: "FAQ | PDFLince – Boîte à outils de traitement PDF gratuite",
      description:
        "Réponses aux questions fréquentes sur PDFLince. Apprenez comment fusionner, compresser, diviser, extraire et réorganiser des PDF sans télécharger vos fichiers.",
      keywords: [
        "pdflince faq",
        "questions pdf",
        "aide pdf",
        "aide fusion pdf",
        "aide compression pdf",
        "aide division pdf",
        "rotation pages pdf",
        "réorganiser pdf",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "faq")}`,
    },
    support: {
      title: "Soutenir PDFLince | Gardez la boîte à outils gratuite et privée",
      description:
        "Votre don permet à PDFLince de rester petit, indépendant et axé sur la confidentialité. Aidez à couvrir l'hébergement et les améliorations.",
      keywords: [
        "faire un don pdflince",
        "soutenir boîte outils pdf",
        "financer projets confidentialité",
        "dons stripe pdflince",
        "garder pdflince gratuit",
      ],
      canonical: `${siteUrl}${getRoutePath(locale, "support")}`,
    },
    mcp: mcpContent.metadata,
    operations: operationsFr,
  },
  brand: {
    name: "PDFLince",
    tagline: "Traitement local • 100% privé",
  },
  components: {
    nav: {
      home: "Accueil",
      faq: "FAQ",
      support: "Soutenir",
      photo: "FotoLince",
      mcp: "Serveur MCP",
      languageLabel: "Langue",
      menuLabel: "Basculer le menu de navigation",
    },
    footer: {
      privacy: "Traitement local • 100% privé • Licences ouvertes",
      rights: `© ${new Date().getFullYear()} PDFLince — Outils pour manipuler des PDF sans compromettre la confidentialité`,
      links: {
        home: "Accueil",
        faq: "FAQ",
        support: "Soutenir",
        photo: "FotoLince",
        contact: "Contact",
        mcp: "Serveur MCP",
      },
      capabilitiesLabel: "Actions populaires",
      operations: {
        merge: "Fusionner des PDF",
        compress: "Compresser un PDF",
        split: "Diviser un PDF",
        extract: "Extraire des pages",
        crop: "Recadrer des pages",
        rotate: "Faire pivoter",
        reorder: "Réorganiser",
        pdfToImages: "PDF en images",
        imagesToPdf: "Images en PDF",
      },
      license: "Traitement PDF: PDF-lib (MIT), PDF.js (Apache 2.0) • Police: Geist (MIT)",
      disclaimer: "Le service est fourni « tel quel » sans garantie d'aucune sorte. L'utilisateur est responsable de l'utilisation des fichiers.",
    },
    notifications: {
      labels: {
        success: "Succès",
        error: "Erreur",
        info: "Avis",
        warning: "Avertissement",
      },
      closeLabel: "Fermer",
    },
    fotolinceBanner: {
      eyebrow: "Besoin d'optimiser des images ?",
      title: "Compressez, redimensionnez ou convertissez avec FotoLince",
      description:
        "Notre boîte à outils gère les JPG, PNG et WEBP localement — parfait pour réduire les visuels avant de créer un PDF.",
      ctaLabel: "Ouvrir FotoLince",
      ctaHref: "https://fotolince.com",
      imageAlt: "Logo FotoLince",
    },
    feedback: {
      question: "Cela a-t-il été utile ?",
      thanks: "Merci pour vos commentaires !",
      whatWrong: "Dites-nous ce qui s'est mal passé",
      emailSubject: "Commentaires pour PDFLince",
    },
    pdfProcessor: {
      title: "Choisissez une opération",
      modes: {
        merge: {
          label: "Fusionner PDF",
          helper: "Organisez les PDF pour les fusionner en un seul document.",
        },
        compress: {
          label: "Compresser PDF",
          helper: "Réduisez la taille d'un PDF. Traitez un fichier à la fois pour le meilleur équilibre entre qualité et vitesse.",
        },
        split: {
          label: "Diviser PDF",
          helper: "Choisissez des PDF pour les diviser en documents séparés.",
        },
        extract: {
          label: "Extraire Pages",
          helper: "Choisissez des pages spécifiques pour créer un nouveau document.",
        },
        crop: {
          label: "Recadrer Pages",
          helper: "Coupez les marges visibles des pages sélectionnées sans quitter le navigateur.",
        },
        rotate: {
          label: "Faire Pivoter",
          helper: "Sélectionnez les pages qui nécessitent une nouvelle orientation et faites-les pivoter.",
        },
        reorder: {
          label: "Réorganiser",
          helper: "Modifiez l'ordre des pages à l'intérieur d'un PDF.",
        },
        pdfToImages: {
          label: "PDF en images",
          helper: "Exportez chaque page PDF au format PNG ou JPEG sans téléchargement.",
        },
        imagesToPdf: {
          label: "Images en PDF",
          helper: "Combinez des images JPG, PNG ou WEBP dans un PDF avec une mise en page personnalisée.",
        },
      },
      upload: {
        title: "Sélectionnez vos fichiers",
        clearAll: "Tout effacer",
        listHeadings: {
          merge: "Fichiers à fusionner (réorganiser pour définir la séquence) :",
          extract: "Sélectionnez un fichier pour travailler avec ses pages :",
          crop: "Sélectionnez un fichier pour travailler avec ses pages :",
          rotate: "Sélectionnez un fichier pour travailler avec ses pages :",
          reorder: "Sélectionnez un fichier pour travailler avec ses pages :",
          pdfToImages: "PDF à convertir (traités un par un) :",
          imagesToPdf: "Images à combiner (réorganiser pour la séquence finale) :",
          default: "Fichiers sélectionnés (réorganiser ou supprimer) :",
        },
        hints: {
          compress: "Chaque fichier est compressé individuellement en utilisant le meilleur équilibre qualité-taille.",
          split: "Chaque PDF sera divisé en fonction des options que vous sélectionnez à l'étape suivante.",
          crop: "Choisissez les pages à recadrer, puis définissez combien de points couper de chaque côté.",
          pdfToImages: "Nous traitons un PDF à la fois. Ajustez le format et le DPI avant d'exporter.",
          imagesToPdf: "Déposez des images JPG, PNG, WEBP ou TIFF. Utilisez le panneau d'options pour choisir la taille, les marges et la couleur.",
        },
      },
      downloadNames: {
        compress: "compresse_PDFLince",
        merge: "fusionne_PDFLince",
        split: "partie_PDFLince",
        extract: "extrait_PDFLince",
        crop: "recadre_PDFLince",
        rotate: "pivote_PDFLince",
        reorder: "reorganise_PDFLince",
        pdfToImages: "images_PDFLince",
        imagesToPdf: "images_vers_pdf_PDFLince",
      },
      processButton: {
        idleSingle: "Traiter 1 fichier",
        idleMultiple: (count: number) => `Traiter ${count} fichiers`,
        processing: "Traitement en cours...",
        extract: (count: number) => `Extraire ${count} page${count > 1 ? "s" : ""}`,
        crop: (count: number) =>
          count > 0 ? `Recadrer ${count} page${count > 1 ? "s" : ""}` : "Recadrer PDF",
        rotate: (count: number) =>
          count > 0 ? `Pivoter ${count} page${count > 1 ? "s" : ""}` : "Pivoter PDF",
        reorder: "Enregistrer l'ordre",
        pdfToImages: {
          single: "Exporter images",
          multiple: (count: number) => `Exporter ${count} PDF`,
        },
        imagesToPdf: {
          single: "Créer PDF",
          multiple: (count: number) => `Créer un PDF à partir de ${count} images`,
        },
      },
      statusMessages: {
        info: (mode: string) => `Traitement en cours (${mode})...`,
        compressed: (reduction: string, original: string, next: string, seconds: string) =>
          `Compressé. Réduction : ${reduction}% (${original} → ${next}) en ${seconds}s`,
        merged: "Fusion terminée",
        split: (count: number) =>
          count > 1
            ? `Généré ${count} fichiers. Téléchargement du premier...`
            : "Division terminée",
        extracted: (count: number) => `Extrait ${count} page${count > 1 ? "s" : ""}`,
        cropped: (count: number) => `Recadré ${count} page${count > 1 ? "s" : ""}`,
        rotated: (count: number) => `Pivoté ${count} page${count > 1 ? "s" : ""}`,
        reordered: "Réorganisation terminée",
        pdfToImages: (count: number, format: "png" | "jpeg", zipped: boolean) => {
          const label = format === "png" ? "PNG" : "JPEG";
          return zipped
            ? `Exporté ${count} image${count > 1 ? "s" : ""} ${label} dans une archive ZIP`
            : `Téléchargé ${count} image${count > 1 ? "s" : ""} ${label}`;
        },
        imagesToPdf: (count: number) =>
          `PDF créé à partir de ${count} image${count > 1 ? "s" : ""}`,
        imageFormatLabels: {
          png: "PNG",
          jpeg: "JPEG",
        },
      },
      errors: {
        noFiles: "Aucun résultat produit",
        mergeRequiresTwo: "Sélectionnez au moins deux fichiers",
        noPagesSelected: "Choisissez au moins une page",
        invalidFile: "Choisissez un fichier valide",
        reorderEmpty: "Aucun nouvel ordre détecté",
        unknown: "Erreur inconnue",
        modeNotSupported: "Mode non pris en charge",
      },
      labels: {
        pagesToExtract: "Sélectionnez les pages à extraire :",
        pagesToCrop: "Sélectionnez les pages à recadrer :",
        pagesToRotate: "Sélectionnez les pages à pivoter :",
        reorderPages: "Faites glisser les pages pour les réorganiser :",
      },
      compressionPreview: {
        title: "Aperçu de la compression",
        description:
          "Ajustez les paramètres pour estimer la taille de sortie avant de lancer la compression.",
        running: "Calcul de l'aperçu…",
        readyLabel: "Sortie estimée",
        ratio: (percent: string) => `${percent}% plus petit`,
        saved: (size: string) => `${size} économisés`,
        time: (seconds: string) => `≈ ${seconds}s`,
        original: "Original",
        result: "Estimé",
        notice:
          "L'aperçu s'exécute localement. Rien n'est téléchargé sur nos serveurs.",
        error: "L'aperçu n'a pas pu être généré.",
        retry: "Réessayer l'aperçu",
        universalBadge: "Optimisation Universelle",
      },
      compressionSummary: {
        title: "Dernière compression",
        ratio: (percent: string) => `${percent}% plus petit`,
        saved: (size: string) => `${size} économisés`,
        original: "Original",
        result: "Compressé",
        duration: (seconds: string) => `Terminé en ${seconds}s`,
        download: "Télécharger à nouveau",
        clear: "Effacer le résumé",
      },
      donationReminder: {
        message: "PDFLince vous a-t-il fait gagner du temps ? Votre soutien le garde gratuit.",
        actionLabel: "Soutenir PDFLince",
        withSavings: (percent: string, saved: string) =>
          `Économisé ${saved} (${percent}%) ? Aidez à garder PDFLince sans publicité.`,
      },
      statusDialog: {
        processingTitle: "Traitement local",
        successTitle: "Vos fichiers sont prêts",
        successDescription:
          "Les téléchargements démarrent automatiquement.",
        resultsLabel: "Dernier résultat",
        filesProcessedLabel: (count: number) =>
          `${count} fichier${count > 1 ? "s" : ""} traité${count > 1 ? "s" : ""}`,
        downloadAgainLabel: "Télécharger",
        errorTitle: "Échec du traitement",
        errorDescription: "Nous n'avons pas pu terminer cette opération. Vérifiez les fichiers.",
        retryLabel: "Réessayer",
        closeLabel: "Fermer",
        sharePrompt: {
          dialogMessage: "PDFLince est entièrement gratuit et respecte votre vie privée. Aidez-nous à le garder ainsi en le partageant avec un collègue.",
          shareText: "Je viens d'utiliser PDFLince pour gérer mes PDF. C'est une boîte à outils gratuite, rapide et totalement privée pour diviser, compresser, fusionner et convertir des PDF directement dans le navigateur. Idéal pour les documents sensibles !",
          actionLabel: "Partager",
          copiedLabel: "Copié !",
        },
      },
      compressionTotal: {
        title: "Économies totales",
        savings: (size: string) => `${size} économisés au total`,
        count: (count: number) => `${count} fichiers optimisés`,
      },
    },
    fileUploader: {
      clickToSelect: "Cliquez pour sélectionner",
      orDrop: (type: "pdf" | "images") =>
        type === "images" ? "ou glissez-déposez des images" : "ou glissez-déposez des fichiers PDF",
      accepted: {
        pdf: "Fichiers PDF",
        images: "Formats acceptés: JPG, PNG, WEBP, TIFF",
      },
      maxSize: (sizeMb: number) => `Taille recommandée : < ${sizeMb}Mo`,
      errors: {
        invalidType: (fileName: string, label: string) =>
          `Type non pris en charge: ${fileName}. Seuls ${label} sont autorisés.`,
        tooLarge: (fileName: string, sizeMb: number) =>
          `Fichier trop volumineux: ${fileName}. La taille maximale est de ${sizeMb}Mo.`,
      },
      dropImagesAlt: "Image d'espace réservé",
    },
    fileList: {
      moveUp: "Monter",
      moveDown: "Descendre",
      remove: "Retirer",
      removeAll: "Tout retirer",
      imageLabel: "Image",
      fileLabel: "Fichier",
      selected: "Sélectionné",
      pdfLabel: "PDF",
      deselect: "Désélectionner",
      pagesLabel: (count: number) => `${count} page${count > 1 ? "s" : ""}`,
      previewLoading: "Chargement de l'aperçu…",
    },
    pageSelector: {
      loading: "Chargement des pages...",
      error: "Les informations du PDF n'ont pas pu être chargées",
      summary: (total: number, selected: number) =>
        `${total} pages détectées — ${selected} sélectionnées`,
      selectAll: "Tout sélectionner",
      deselectAll: "Tout désélectionner",
      pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
      extraPages: (shown: number, total: number) =>
        `Affichage de ${shown} sur ${total} pages. Saisissez les numéros des pages supplémentaires.`,
      manualLabel: "Saisir numéros (ex. 21, 25-30)",
      manualPlaceholder: "21, 25-30, 42",
    },
    pageOrderer: {
      loading: "Chargement des pages...",
      error: "Les informations du PDF n'ont pas pu être chargées",
      limitReached: (count: number) =>
        `Ce PDF compte ${count} pages. Pour des raisons de performances, vous pouvez réorganiser jusqu'à 120 pages.`,
      limitHint:
        "Divisez d'abord le PDF en morceaux plus petits.",
      summary: (count: number) => `${count} pages prêtes à être réorganisées`,
      reset: "Restaurer l'ordre",
      dragHint: "Faites glisser pour modifier l'ordre",
      pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
      originalLabel: (pageNumber: number) => `Original: Page ${pageNumber}`,
      instructions:
        'Faites glisser les pages. Une fois terminé, cliquez sur "Enregistrer l\'ordre".',
    },
    processingOptions: {
      compress: {
        title: "Compression",
        level: "Niveau",
        levels: {
          low: "Faible",
          medium: "Moyen",
          high: "Élevé",
        },
        removeMetadata: "Supprimer métadonnées",
        removeMetadataHint: "Supprime les détails cachés comme l'auteur et l'historique.",
        stripAnnotations: "Supprimer les annotations",
        stripAnnotationsHint: "Supprime les notes, les formulaires et les signatures.",
        downscaleImages: "Réduire les images",
        downscaleHint: "Idéal pour les documents numérisés.",
        advancedTitle: "Nettoyage avancé",
        advancedDescription: "Gardez-le simple ou activez les extras dont vous avez besoin.",
        activeLabel: "Activé :",
      },
      merge: {
        title: "Fusionner",
        pageDivider: "Page vierge entre les documents",
        metadataTitle: "Titre du document fusionné (facultatif)",
        metadataAuthor: "Auteur du document (facultatif)",
        metadataHint: "Définissez des métadonnées personnalisées.",
      },
      split: {
        title: "Diviser",
        pagesPerFile: "Pages par fichier",
        pagesPerFileHint: "Nous créerons un nouveau PDF toutes les N pages.",
      },
      extract: {
        title: "Extraire",
        preserveMetadata: "Préserver les métadonnées",
        preserveMetadataHint: "Conserve le titre, l'auteur et les détails.",
      },
      crop: {
        title: "Recadrer",
        hint: "Sélectionnez les pages à recadrer et définissez les marges.",
        inputModeLabel: "Méthode",
        inputModes: {
          margins: "Définir les marges",
          manual: "Sélection manuelle",
        },
        marginsTitle: "Marges",
        marginLabels: {
          top: "Marge supérieure (pts)",
          right: "Marge droite (pts)",
          bottom: "Marge inférieure (pts)",
          left: "Marge gauche (pts)",
        },
        marginHint: "72 pts équivaut à environ 1 pouce.",
        preserveMetadata: "Préserver les métadonnées",
        preserveMetadataHint: "Conserve le titre, l'auteur et les détails.",
        manual: {
          title: "Sélection manuelle",
          hint: "Faites glisser sur l'aperçu pour définir la zone visible.",
          loading: "Chargement...",
          error: "L'aperçu n'a pas pu être chargé.",
          reset: "Réinitialiser",
          pagePreview: (pageNumber: number) => `Aperçu page ${pageNumber}`,
        },
      },
      rotate: {
        title: "Pivoter",
        hint: "Choisissez la direction et marquez les pages.",
        rotateRight90: "Pivoter à droite (90°)",
        rotate180: "Pivoter (180°)",
        rotateLeft90: "Pivoter à gauche (90°)",
      },
      reorder: {
        title: "Réorganiser",
        hint: "Faites glisser les vignettes pour modifier l'ordre.",
      },
      pdfToImages: {
        title: "Exportation",
        formatLabel: "Format",
        formatHint: "Choisissez PNG pour une qualité sans perte ou JPEG pour des fichiers plus petits.",
        pngLabel: "PNG (sans perte)",
        jpegLabel: "JPEG (plus petit)",
        qualityLabel: "Qualité JPEG",
        qualityHint: "Une qualité supérieure préserve plus de détails.",
        dpiLabel: "Rendu DPI",
        dpiHint: "Un DPI plus élevé augmente la netteté et la taille du fichier.",
        dpiPresets: {
          screen: "72 DPI · Écran",
          balanced: "144 DPI · Équilibré",
          print: "300 DPI · Impression",
        },
        zipLabel: "Regrouper les images dans un ZIP",
        zipHint: "Téléchargez une seule archive.",
        baseNameLabel: "Nom de fichier de base",
        baseNamePlaceholder: "pdflince_pages",
        baseNameHint: "Laissez vide pour réutiliser le nom du PDF.",
      },
      imagesToPdf: {
        title: "Mise en page",
        layoutTitle: "Mise en page",
        fitLabel: "Ajustement de l'image",
        fitOptions: {
          contain: "Contenir (afficher l'image entière)",
          cover: "Couvrir (remplir la page)",
        },
        sizeLabel: "Taille de page",
        sizeOptions: {
          auto: "Auto (correspond à l'image)",
          a4: "A4",
          letter: "Lettre",
        },
        orientationLabel: "Orientation",
        orientationOptions: {
          auto: "Auto",
          portrait: "Portrait",
          landscape: "Paysage",
        },
        marginLabel: "Marges (pts)",
        marginHint: "Ajoute un espace blanc. 72 pts ≈ 1 pouce.",
        backgroundLabel: "Couleur d'arrière-plan",
        backgroundHint: "Appliqué derrière les images.",
      },
    },
    cookieBanner: {
      message: "Nous utilisons des cookies pour analyser le trafic. Nous ne partageons pas vos données.",
      accept: "Accepter",
      decline: "Refuser",
    },
  },
  pages: {
    home: {
      hero: {
        title: "PDFLince: Compresser, fusionner et convertir PDF gratuitement",
        subtitle:
          "Compressez, fusionnez, divisez, extrayez, pivotez et convertissez des PDF directement dans votre navigateur. Aucun téléchargement, entièrement privé.",
        badges: [
          "Compresser PDF",
          "Fusionner PDF",
          "Traitement local",
          "Soutenir PDFLince",
        ],
        imageAlt: "Illustration d'un document PDF",
        ctaLinks: [
          {
            label: "PDF en images",
            href: operationsRoutes.pdfToImages,
            description: "Exportez au format PNG ou JPEG",
          },
          {
            label: "Images en PDF",
            href: operationsRoutes.imagesToPdf,
            description: "Combinez JPG, PNG ou WEBP",
          },
        ],
      },
      why: {
        title: "Pourquoi utiliser PDFLince ?",
        cards: [
          {
            title: "Privé par défaut",
            description:
              "Vos PDF ne quittent jamais votre appareil. Tout se passe dans votre navigateur.",
            icon: "🔒",
          },
          {
            title: "Rapide & efficace",
            description:
              "Notre moteur local offre une vitesse optimale sans téléchargement cloud.",
            icon: "⚡",
          },
          {
            title: "Fonctionne partout",
            description:
              "Ordinateur, tablette ou téléphone — un navigateur moderne suffit.",
            icon: "📱",
          },
        ],
      },
      callout: {
        title: "Aidez à garder PDFLince gratuit",
        description:
          "Chaque don couvre l'hébergement et nous permet de garder l'expérience 100% privée, sans publicité ni suivi.",
        ctaLabel: "Soutenir le projet",
        ctaUrl: getRoutePath(locale, "support"),
        secondaryLabel: "Voir comment nous utilisons les fonds",
        secondaryUrl: getRoutePath(locale, "support") + "#support-transparency",
      },
    },
    faq: {
      title: "Questions Fréquentes",
      intro: "Réponses aux questions les plus courantes sur PDFLince",
      cta: {
        title: "Essayez PDFLince maintenant",
        description:
          "Fusionnez, compressez, divisez, extrayez, pivotez et réorganisez des PDF en toute confidentialité.",
        ctaLabel: "Aller à la boîte à outils",
      },
    },
    support: {
      hero: {
        eyebrow: "🌱 Projet indépendant",
        title: "Aidez à garder PDFLince gratuit et privé",
        subtitle:
          "PDFLince est un petit projet de passionnés. Votre soutien couvre les serveurs.",
        highlight: "Juste un petit outil qui respecte votre vie privée.",
      },
      reasons: {
        title: "Pourquoi faire un don ?",
        cards: [
          {
            title: "Garder la gratuité",
            description:
              "Les dons nous permettent de garder PDFLince 100% gratuit pour tout le monde.",
            icon: "💚",
          },
          {
            title: "Améliorations",
            description:
              "Votre soutien finance les corrections de bugs et les nouveaux outils.",
            icon: "✨",
          },
          {
            title: "Protéger la confidentialité",
            description:
              "Nous traitons tout localement. Les dons nous permettent de continuer.",
            icon: "🔒",
          },
        ],
      },
      tiers: {
        title: "Donnez ce que vous pouvez",
        description: "Chaque montant aide. Paiement sécurisé via Stripe.",
        cards: [
          {
            id: "coffee",
            title: "Acheter un café",
            amount: "3 €",
            description: "Couvre l'hébergement pendant quelques semaines.",
            ctaLabel: "Donner 3 €",
            ctaHref: "#stripe-checkout-coffee",
          },
          {
            id: "monthly",
            title: "Soutien mensuel",
            amount: "10 €/mois",
            description: "Nous donne du temps chaque semaine pour améliorer PDFLince.",
            ctaLabel: "Donner 10 €/mois",
            ctaHref: "#stripe-checkout-monthly",
            badge: "💙 Merci",
          },
          {
            id: "custom",
            title: "Montant personnalisé",
            amount: "Tout montant",
            description: "Chaque euro compte. Choisissez le montant qui vous convient.",
            ctaLabel: "Choisir le montant",
            ctaHref: "#stripe-checkout-custom",
          },
        ],
        note: "Paiements Stripe sécurisés. Annulez les dons récurrents quand vous le souhaitez.",
      },
      transparency: {
        title: "Où va l'argent",
        items: [
          "Hébergement et CDN pour que le site reste rapide dans le monde entier",
          "Temps de développement pour les corrections et les nouvelles fonctionnalités",
          "Ajustements de conception et d'UX pour garder les choses fluides",
          "Traductions et documents pour chaque langue prise en charge",
        ],
      },
      faq: {
        title: "Questions",
        entries: [
          {
            question: "Et si je ne peux pas faire de don ?",
            answer:
              "Pas de soucis. PDFLince restera gratuit. Partager l'outil est déjà un soutien incroyable.",
          },
          {
            question: "Aurai-je un reçu ?",
            answer:
              "Oui. Stripe vous envoie automatiquement un reçu avec tous les détails.",
          },
          {
            question: "Comment annuler un don récurrent ?",
            answer:
              "Gérez-le via votre portail Stripe ou envoyez-nous un e-mail et nous l'annulerons pour vous.",
          },
        ],
      },
      closing: {
        title: "Merci d'être ici",
        description:
          "Chaque personne qui soutient PDFLince aide à maintenir en vie une boîte à outils PDF utile.",
        ctaLabel: "Envoyer un e-mail à l'équipe",
        ctaHref: "mailto:info@pdflince.com?subject=Hello%20PDFLince%20team",
      },
      legalNotice: {
        title: "Notes légales et transparence",
        points: [
          "PDFLince est un projet personnel indépendant géré par une petite équipe bénévole.",
          "Les contributions sont volontaires et aident à couvrir l'hébergement et le temps de développement.",
          "Les paiements ne sont pas des dons de bienfaisance; Stripe enverra un reçu automatique.",
          "Le service est fourni tel quel sans garantie. Des questions ? info@pdflince.com.",
        ],
      },
    },
    mcp: mcpContent.page,
  },
  faqs: faqsFr,
  operations: operationsFr,
};
