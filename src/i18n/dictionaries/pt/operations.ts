import { OperationContent } from "../operation-types";
import { OperationKey } from "../../../types/operations";

const operationsPtContent: Record<OperationKey, OperationContent> = {
  compress: {
    key: "compress",
    slug: "comprimir",
    mode: "compress",
    meta: {
      title: "Comprimir PDF Online GrÃ¡tis | Reduzir Tamanho | PDFLince",
      description:
        "Reduza o tamanho do seu PDF eficientemente sem perda de qualidade. CompressÃ£o privada e gratuita direto no navegador.",
      keywords: [
        "comprimir pdf",
        "reduzir tamanho pdf",
        "otimizar pdf",
        "compressor pdf online",
        "pdf leve",
      ],
      ogTitle: "Comprimir PDFs sem perder qualidade | PDFLince",
      ogDescription:
        "Arraste seu arquivo, escolha o nÃ­vel de compressÃ£o ideal e baixe um PDF significativamente menor em segundos â€” totalmente seguro e sem uploads para servidores.",
      ogImageAlt: "Interface do PDFLince comprimindo um documento",
    },
    hero: {
      title: "Comprimir PDF online com qualidade",
      description:
        "Reduza o tamanho de documentos para caber em limites de e-mail, plataformas educacionais ou portais pÃºblicos mantendo a legibilidade.",
      bulletPoints: [
        "Processamento 100% local: seus arquivos nÃ£o saem do navegador",
        "Escolha compressÃ£o bÃ¡sica, intermediÃ¡ria ou agressiva conforme a necessidade",
        "Preserve metadados e estrutura quando for importante",
      ],
      imageAlt: "Fluxo de compressÃ£o de PDF no PDFLince",
    },
    benefitsTitle: "Por que comprimir PDFs com o PDFLince",
    benefits: [
      {
        title: "Qualidade equilibrada",
        description:
          "Nosso motor de compressÃ£o analisa cada recurso para entregar a maior reduÃ§Ã£o sem borrar textos ou grÃ¡ficos.",
      },
      {
        title: "Pronto para envios",
        description:
          "Gere arquivos que passam em limites rÃ­gidos de portais governamentais, universidades ou fluxos corporativos.",
      },
      {
        title: "Privacidade por padrÃ£o",
        description:
          "Evite uploads em servidores e reduza o risco de vazamentos cumprindo polÃ­ticas internas de privacidade.",
      },
    ],
    howTo: {
      title: "Como comprimir um PDF com o PDFLince",
      steps: [
        "Clique em â€œEnvie seus arquivosâ€ e escolha o PDF que deseja otimizar.",
        "Selecione o nÃ­vel de compressÃ£o e defina opÃ§Ãµes avanÃ§adas como manter metadados.",
        "Pressione â€œProcessarâ€ e baixe o documento comprimido em segundos.",
      ],
      note:
        "Precisa comprimir vÃ¡rios relatÃ³rios? FaÃ§a um por vez sem limites diÃ¡rios ou marcas d'Ã¡gua.",
    },
    useCasesTitle: "Quando vale a pena comprimir um PDF",
    useCases: [
      "Enviar contratos, notas fiscais ou manuais por e-mail sem estourar o limite de anexos.",
      "Enviar trabalhos para Moodle, Canvas ou qualquer AVA com limite rÃ­gido de arquivo.",
      "Deixar teses, catÃ¡logos ou relatÃ³rios mais leves para download.",
      "Arquivar documentos na nuvem economizando espaÃ§o sem perder informaÃ§Ãµes relevantes.",
    ],
  },
  merge: {
    key: "merge",
    slug: "juntar",
    mode: "merge",
    meta: {
      title: "Juntar PDF Online | Combinar VÃ¡rios PDFs GrÃ¡tis | PDFLince",
      description:
        "Combine vÃ¡rios PDF em um Ãºnico documento sem limites. Arraste, reordene e baixe seu arquivo unificado com privacidade.",
      keywords: [
        "juntar pdf",
        "combinar pdf",
        "unir arquivos pdf",
        "fundir pdf",
        "merge pdf",
      ],
      ogTitle: "Una mÃºltiplos PDFs em segundos | PDFLince",
      ogDescription:
        "Organize seus documentos na ordem perfeita, ajuste as configuraÃ§Ãµes e baixe um arquivo PDF unificado sem nunca enviar seus dados para a nuvem.",
      ogImageAlt: "JunÃ§Ã£o de arquivos PDF no PDFLince",
    },
    hero: {
      title: "Juntar PDFs online â€” rÃ¡pido e seguro",
      description:
        "Crie um arquivo polido com contratos, notas de aula ou polÃ­ticas prontas para enviar, assinar ou arquivar.",
      bulletPoints: [
        "Arraste e solte para definir a ordem final",
        "Sem limites ocultos: una documentos longos gratuitamente",
        "Mantenha marcadores e metadados quando necessÃ¡rio",
      ],
      imageAlt: "Ferramenta de junÃ§Ã£o de PDFs",
    },
    benefitsTitle: "Vantagens de juntar com o PDFLince",
    benefits: [
      {
        title: "Entrega consistente",
        description:
          "Garanta material em um Ãºnico arquivo com numeraÃ§Ã£o contÃ­nua e formato padronizado.",
      },
      {
        title: "Economia de tempo",
        description:
          "EsqueÃ§a editores pesados. Arraste, organize e baixe um documento pronto para compartilhar.",
      },
      {
        title: "Privado e sem cadastro",
        description:
          "NÃ£o armazenamos cÃ³pias nem pedimos dados pessoais â€” ideal para informaÃ§Ãµes confidenciais.",
      },
    ],
    howTo: {
      title: "Como juntar PDFs com o PDFLince",
      steps: [
        "Clique em â€œEnvie seus arquivosâ€ e selecione pelo menos dois PDFs.",
        "Use as setas ou o arrastar para definir a ordem final.",
        "Escolha as opÃ§Ãµes de marcadores e toque em â€œProcessarâ€ para baixar o PDF combinado.",
      ],
      note:
        "Precisa adicionar mais arquivos depois? Basta arrastar sem reiniciar o processo.",
    },
    useCasesTitle: "Quando juntar PDFs",
    useCases: [
      "Montar um dossiÃª com anexos, propostas e condiÃ§Ãµes comerciais.",
      "Enviar vÃ¡rias notas fiscais mensais em um Ãºnico arquivo.",
      "Reunir anotaÃ§Ãµes escaneadas e apresentaÃ§Ãµes em um PDF para alunos.",
      "Criar pacotes jurÃ­dicos completos para assinatura eletrÃ´nica.",
    ],
  },
  split: {
    key: "split",
    slug: "dividir",
    mode: "split",
    meta: {
      title: "Dividir PDF por PÃ¡ginas ou CapÃ­tulos | GrÃ¡tis | PDFLince",
      description:
        "Separe seu PDF em vÃ¡rios arquivos por intervalos ou capÃ­tulos. Controle total sobre a estrutura sem uploads para o servidor.",
      keywords: [
        "dividir pdf",
        "separar pdf",
        "dividir pdf por pÃ¡ginas",
        "split pdf",
        "partir pdf",
      ],
      ogTitle: "Divida PDFs com precisÃ£o | PDFLince",
      ogDescription:
        "Escolha exatamente como dividir seu documento, gere quantos arquivos individuais precisar e baixe-os instantaneamente para o seu dispositivo.",
      ogImageAlt: "Processo de divisÃ£o de PDF",
    },
    hero: {
      title: "Dividir PDFs por pÃ¡ginas ou segmentos",
      description:
        "Extraia capÃ­tulos, anexos ou seÃ§Ãµes especÃ­ficas em arquivos independentes prontos para compartilhar.",
      bulletPoints: [
        "Configure divisÃµes por nÃºmero de pÃ¡ginas ou por tamanho",
        "Gere vÃ¡rios PDFs em um Ãºnico processamento",
        "Trabalhe sem limites de pÃ¡ginas ou marcas d'Ã¡gua",
      ],
      imageAlt: "DivisÃ£o de documento PDF",
    },
    benefitsTitle: "O que a divisÃ£o com o PDFLince oferece",
    benefits: [
      {
        title: "Controle sobre o que compartilhar",
        description:
          "Entregue apenas a parte relevante sem expor informaÃ§Ãµes sensÃ­veis do restante do documento.",
      },
      {
        title: "Entrega escalÃ¡vel",
        description:
          "Gere mÃºltiplos arquivos de uma vez e faÃ§a o download automÃ¡tico para arquivar ou enviar.",
      },
      {
        title: "Ajustes avanÃ§ados",
        description:
          "Crie lotes, adicione separadores ou defina formatos que combinam com seu fluxo.",
      },
    ],
    howTo: {
      title: "Como dividir um PDF com o PDFLince",
      steps: [
        "Envie o PDF que deseja segmentar.",
        "Escolha se vai dividir por nÃºmero fixo de pÃ¡ginas ou por tamanho do arquivo.",
        "Clique em â€œProcessarâ€ e baixe automaticamente os novos documentos.",
      ],
      note:
        "O PDFLince baixa o primeiro arquivo na hora e salva os demais sem etapas extras.",
    },
    useCasesTitle: "CenÃ¡rios comuns para dividir PDFs",
    useCases: [
      "Publicar cada capÃ­tulo de um livro digital em um curso online.",
      "Separar anexos que precisam ser enviados por canais diferentes.",
      "Extrair resumos trimestrais de relatÃ³rios financeiros extensos.",
      "Criar pacotes enxutos para clientes sem expor documentos internos.",
    ],
  },
  extract: {
    key: "extract",
    slug: "extrair",
    mode: "extract",
    meta: {
      title: "Extrair PÃ¡ginas de um PDF | Salvar SeleÃ§Ã£o | PDFLince",
      description:
        "Selecione pÃ¡ginas de qualquer PDF e crie um novo documento na hora. Processamento privado e ilimitado direto no navegador.",
      keywords: [
        "extraer paginas pdf",
        "salvar paginas pdf",
        "selecionar paginas pdf",
        "extrair paginas pdf",
        "novo pdf",
      ],
      ogTitle: "Extraia apenas as pÃ¡ginas necessÃ¡rias | PDFLince",
      ogDescription:
        "Marque as pÃ¡ginas relevantes que deseja manter, gere um novo arquivo PDF em segundos e garanta que seus dados permaneÃ§am seguros no seu prÃ³prio dispositivo.",
      ogImageAlt: "SeleÃ§Ã£o de pÃ¡ginas no PDFLince",
    },
    hero: {
      title: "Extrair pÃ¡ginas especÃ­ficas de um PDF",
      description:
        "Monte documentos sob medida mantendo apenas as pÃ¡ginas que vocÃª precisa compartilhar ou arquivar.",
      bulletPoints: [
        "Visualize miniaturas e marque pÃ¡ginas individuais",
        "Mantenha a numeraÃ§Ã£o original ou crie novas seÃ§Ãµes",
        "Baixe o PDF resultante imediatamente",
      ],
      imageAlt: "ExtraÃ§Ã£o de pÃ¡ginas em PDF",
    },
    benefitsTitle: "Vantagens de extrair pÃ¡ginas com o PDFLince",
    benefits: [
      {
        title: "Documentos mais relevantes",
        description:
          "Compartilhe apenas o conteÃºdo Ãºtil com equipe ou clientes evitando dados redundantes.",
      },
      {
        title: "Controle total no navegador",
        description:
          "Selecione, visualize e confirme cada pÃ¡gina sem softwares pesados ou conexÃ£o estÃ¡vel.",
      },
      {
        title: "Resultado limpo",
        description:
          "O novo PDF preserva qualidade e metadados conforme as opÃ§Ãµes escolhidas.",
      },
    ],
    howTo: {
      title: "Como extrair pÃ¡ginas com o PDFLince",
      steps: [
        "Envie o PDF e selecione o arquivo desejado.",
        "Marque as pÃ¡ginas necessÃ¡rias no painel de miniaturas.",
        "Clique em â€œProcessarâ€ para baixar um PDF com as pÃ¡ginas selecionadas.",
      ],
      note:
        "Combine a extraÃ§Ã£o com outras operaÃ§Ãµes como juntar ou comprimir em sessÃµes diferentes.",
    },
    useCasesTitle: "Ideias para extrair pÃ¡ginas",
    useCases: [
      "Compartilhar apenas o capÃ­tulo designado de um manual com a equipe.",
      "Enviar pÃ¡ginas especÃ­ficas de um contrato para revisÃ£o jurÃ­dica.",
      "Montar dossiÃªs personalizados com informaÃ§Ã£o relevante para cada cliente.",
      "Guardar somente pÃ¡ginas com formulÃ¡rios ou comprovantes que precisam ser arquivados.",
    ],
  },
  rotate: {
    key: "rotate",
    slug: "girar",
    mode: "rotate",
    meta: {
      title: "Girar paginas PDF online | Corrigir orientacao | PDFLince",
      description:
        "Gire paginas selecionadas de um PDF em 90 ou 180 graus direto no navegador. Gratis, privado e sem upload.",
      keywords: [
        "girar pdf",
        "girar paginas pdf",
        "corrigir orientacao pdf",
        "rotacao de paginas pdf",
        "pdf torto",
      ],
      ogTitle: "Gire paginas PDF em segundos | PDFLince",
      ogDescription:
        "Selecione as paginas com orientacao errada, escolha 90 ou 180 graus e baixe o PDF corrigido sem enviar nada.",
      ogImageAlt: "Rotacao de paginas PDF no PDFLince",
    },
    hero: {
      title: "Gire paginas PDF sem perder qualidade",
      description:
        "Corrija digitalizacoes inclinadas, paginas invertidas ou documentos com orientacoes misturadas em poucos cliques.",
      bulletPoints: [
        "Gire apenas as paginas selecionadas",
        "Escolha 90 graus para a direita, 180 graus ou 90 graus para a esquerda",
        "Tudo acontece localmente no navegador",
      ],
      imageAlt: "Fluxo de rotacao de paginas PDF",
    },
    benefitsTitle: "Por que girar paginas com o PDFLince",
    benefits: [
      {
        title: "Correcao precisa",
        description:
          "Ajuste apenas as folhas que precisam de correcao, ideal para lotes digitalizados e relatorios longos.",
      },
      {
        title: "Ajuste rapido",
        description:
          "Corrija a orientacao sem abrir editores pesados no desktop.",
      },
      {
        title: "Privacidade total",
        description:
          "Os documentos continuam no seu dispositivo porque a rotacao roda localmente.",
      },
    ],
    howTo: {
      title: "Como girar paginas PDF",
      steps: [
        "Envie o PDF e escolha o arquivo com as paginas que deseja corrigir.",
        "Marque as paginas e selecione 90 graus para a direita, 180 graus ou 90 graus para a esquerda.",
        "Clique em Processar para baixar o PDF com a nova orientacao.",
      ],
      note:
        "Depois voce ainda pode reordenar, extrair ou comprimir o arquivo corrigido.",
    },
    useCasesTitle: "Quando girar paginas ajuda",
    useCases: [
      "Corrigir contratos ou formularios escaneados de lado.",
      "Ajustar paginas invertidas dentro de relatorios montados com varias fontes.",
      "Preparar apostilas e manuais antes de compartilhar.",
      "Deixar arquivos antigos mais confortaveis para leitura na tela.",
    ],
  },
  reorder: {
    key: "reorder",
    slug: "reordenar",
    mode: "reorder",
    meta: {
      title: "Reordenar PÃ¡ginas PDF | Mudar Ordem RÃ¡pido | PDFLince",
      description:
        "Reorganize facilmente as pÃ¡ginas do seu PDF arrastando e soltando. Corrija a ordem e salve o resultado instantaneamente, tudo localmente.",
      keywords: [
        "reordenar pdf",
        "mudar ordem paginas pdf",
        "organizar pdf",
        "rearranjar pdf",
        "ordenar paginas pdf",
      ],
      ogTitle: "Organize PDFs sem reinstalar software | PDFLince",
      ogDescription:
        "Mova as pÃ¡ginas para a posiÃ§Ã£o correta, corrija erros de ordenaÃ§Ã£o e baixe seu documento PDF perfeitamente organizado em apenas alguns momentos.",
      ogImageAlt: "ReordenaÃ§Ã£o de pÃ¡ginas no PDFLince",
    },
    hero: {
      title: "Reordenar pÃ¡ginas de um PDF com arrastar e soltar",
      description:
        "Corrija a sequÃªncia de notas fiscais escaneadas, apresentaÃ§Ãµes ou relatÃ³rios extensos em segundos.",
      bulletPoints: [
        "Miniaturas grandes ajudam a evitar erros",
        "Arraste as pÃ¡ginas e confirme a nova ordem rapidamente",
        "Exporte o PDF reorganizado sem perder marcadores ou links internos",
      ],
      imageAlt: "Interface de reordenaÃ§Ã£o de pÃ¡ginas",
    },
    benefitsTitle: "Por que reordenar com o PDFLince",
    benefits: [
      {
        title: "Fluxos mais Ã¡geis",
        description:
          "Corrija digitalizaÃ§Ãµes bagunÃ§adas sem redigitalizar ou instalar editores complexos.",
      },
      {
        title: "PrecisÃ£o visual",
        description:
          "As miniaturas permitem validar cada pÃ¡gina antes de exportar a nova sequÃªncia.",
      },
      {
        title: "Sem rastros",
        description:
          "Todo o processo fica no seu dispositivo â€” ideal para documentos sensÃ­veis ou confidenciais.",
      },
    ],
    howTo: {
      title: "Como reordenar pÃ¡ginas com o PDFLince",
      steps: [
        "Envie o PDF e escolha o arquivo que deseja editar.",
        "Arraste cada miniatura atÃ© alcanÃ§ar a ordem correta.",
        "Clique em â€œProcessarâ€ para baixar o documento com a nova sequÃªncia.",
      ],
      note:
        "Continue ajustando a ordem mesmo apÃ³s exportar, sem reenviar o arquivo.",
    },
    useCasesTitle: "Quando reorganizar um PDF",
    useCases: [
      "Alinhar propostas, anexos e assinaturas antes de enviar.",
      "Preparar apresentaÃ§Ãµes impressas com a sequÃªncia certa.",
      "Corrigir pÃ¡ginas duplicadas ou invertidas apÃ³s digitalizaÃ§Ãµes em lote.",
      "Atualizar manuais ou catÃ¡logos reaproveitando conteÃºdo existente sem diagramar do zero.",
    ],
  },
  pdfToImages: {
    key: "pdfToImages",
    slug: "pdf-para-imagens",
    mode: "pdfToImages",
    meta: {
      title: "Converter PDF em Imagens | Exportar PNG/JPEG | PDFLince",
      description:
        "Converta cada pÃ¡gina do seu PDF em imagens PNG ou JPEG de alta qualidade. Escolha sua resoluÃ§Ã£o e baixe como um arquivo ZIP â€” 100% privado e seguro.",
      keywords: [
        "pdf para imagens",
        "pdf para png",
        "pdf para jpeg",
        "exportar paginas pdf",
        "baixar pdf como imagem",
      ],
      ogTitle: "Exporte pÃ¡ginas de PDF como imagens nÃ­tidas | PDFLince",
      ogDescription:
        "Renderize cada pÃ¡gina como uma imagem nÃ­tida diretamente no seu navegador. Ajuste a qualidade, defina nomes e obtenha um arquivo ZIP organizado instantaneamente.",
      ogImageAlt: "PDFLince convertendo um PDF em imagens",
    },
    hero: {
      title: "Converter pÃ¡ginas PDF em PNG ou JPEG",
      description:
        "Gere imagens prontas para apresentaÃ§Ãµes, revisÃµes ou handoffs sem depender de editores pesados.",
      bulletPoints: [
        "Selecione PNG ou JPEG e controle o DPI de exportaÃ§Ã£o",
        "Baixe um Ãºnico ZIP ou uma imagem por pÃ¡gina",
        "Processamento 100% local no seu navegador â€” nada Ã© enviado",
      ],
      imageAlt: "Fluxo de PDF para imagens",
    },
    benefitsTitle: "Por que exportar PDFs com o PDFLince",
    benefits: [
      {
        title: "Qualidade pronta para apresentaÃ§Ãµes",
        description:
          "Escolha a resoluÃ§Ã£o ideal para slides, intranets ou fluxos de design sem perder nitidez.",
      },
      {
        title: "Downloads flexÃ­veis",
        description:
          "Mantenha um ZIP organizado para documentos longos ou baixe somente as pÃ¡ginas necessÃ¡rias.",
      },
      {
        title: "Privacidade garantida",
        description:
          "Todo o render acontece no navegador, ideal para documentos sigilosos ou sob NDA.",
      },
    ],
    howTo: {
      title: "Como converter um PDF em imagens",
      steps: [
        "Envie o PDF que deseja converter. Trabalhamos um arquivo por vez para preservar a qualidade.",
        "Escolha PNG ou JPEG, ajuste o DPI e defina se deseja agrupar tudo em um ZIP.",
        "Clique em â€œExportar imagensâ€ para baixar o arquivo comprimido ou as pÃ¡ginas individuais.",
      ],
      note:
        "Precisa apenas de algumas pÃ¡ginas? Extraia ou divida antes e depois exporte para imagens.",
    },
    useCasesTitle: "Quando a conversÃ£o PDFâ†’imagem ajuda",
    useCases: [
      "Compartilhar prÃ©vias de design sem enviar o PDF completo.",
      "Inserir pÃ¡ginas em CMS, apresentaÃ§Ãµes ou ferramentas que aceitam apenas imagens.",
      "Criar materiais para tablets ou e-readers que lidam melhor com PNG/JPEG.",
      "Documentar revisÃµes internas com capturas de cada pÃ¡gina.",
    ],
  },
  imagesToPdf: {
    key: "imagesToPdf",
    slug: "imagens-para-pdf",
    mode: "imagesToPdf",
    meta: {
      title: "Criar PDF de Imagens | JPG, PNG para PDF | PDFLince",
      description:
        "Crie um PDF profissional a partir de suas imagens. Organize fotos, personalize o layout e as margens, e gere seu documento localmente no seu navegador.",
      keywords: [
        "imagens para pdf",
        "jpg para pdf",
        "png para pdf",
        "webp para pdf",
        "criar pdf com fotos",
      ],
      ogTitle: "Monte um PDF impecÃ¡vel com suas imagens | PDFLince",
      ogDescription:
        "Arraste suas imagens para o lugar, defina as configuraÃ§Ãµes de layout e exporte um arquivo PDF pronto para impressÃ£o â€” sem uploads ou marcas d'Ã¡gua anexadas.",
      ogImageAlt: "CriaÃ§Ã£o de PDF a partir de imagens no PDFLince",
    },
    hero: {
      title: "Agrupe JPG ou PNG em um PDF profissional",
      description:
        "Junte digitalizaÃ§Ãµes, fotos ou grÃ¡ficos em um Ãºnico documento pronto para equipes, alunos ou clientes.",
      bulletPoints: [
        "Reordene as imagens com arrastar e soltar",
        "Defina tamanho de pÃ¡gina, orientaÃ§Ã£o e margens",
        "Escolha uma cor de fundo sÃ³lida para evitar transparÃªncias",
      ],
      imageAlt: "Fluxo de imagens para PDF",
    },
    benefitsTitle: "Vantagens de criar PDFs a partir de imagens",
    benefits: [
      {
        title: "Layout consistente",
        description:
          "Alinhe formatos diferentes em um PDF uniforme sem esticar ou cortar demais.",
      },
      {
        title: "Pronto para impressÃ£o e revisÃ£o",
        description:
          "Ajuste margens, orientaÃ§Ã£o e fundo para que o PDF fique perfeito no papel e na tela.",
      },
      {
        title: "Processamento seguro",
        description:
          "A conversÃ£o acontece inteiramente no navegador, ideal para recibos, identidades ou material educacional.",
      },
    ],
    howTo: {
      title: "Como converter imagens em PDF",
      steps: [
        "Adicione as imagens que deseja incluir e organize na ordem final.",
        "Ajuste o modo de encaixe, tamanho de pÃ¡gina, orientaÃ§Ã£o e margens.",
        "Clique em â€œCriar PDFâ€ para baixar o documento pronto para compartilhar ou arquivar.",
      ],
      note:
        "O PDF ficou pesado? Comprima ou divida depois sem reenviar as imagens.",
    },
    useCasesTitle: "Boas ideias para imagemâ†’PDF",
    useCases: [
      "Agrupar provas, tarefas ou atividades escaneadas antes de devolvÃª-las aos alunos.",
      "Reunir recibos e comprovantes em um Ãºnico PDF para prestaÃ§Ã£o de contas.",
      "Montar catÃ¡logos, portfolios ou lookbooks a partir de exportaÃ§Ãµes de design.",
      "Enviar relatÃ³rios fotogrÃ¡ficos ou inspeÃ§Ãµes sem anexar dezenas de arquivos.",
    ],
  },
};

export const operationsPt: Record<OperationKey, OperationContent> = {
  merge: operationsPtContent.merge,
  compress: operationsPtContent.compress,
  split: operationsPtContent.split,
  extract: operationsPtContent.extract,
  rotate: operationsPtContent.rotate,
  reorder: operationsPtContent.reorder,
  pdfToImages: operationsPtContent.pdfToImages,
  imagesToPdf: operationsPtContent.imagesToPdf,
};
