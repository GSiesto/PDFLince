import { OperationContent } from "../operation-types";
import { OperationKey } from "../../../types/operations";

const operationsPtContent: Record<OperationKey, OperationContent> = {
  compress: {
    key: "compress",
    slug: "comprimir",
    mode: "compress",
    meta: {
      title: "Comprimir PDF Online Grátis | Reduzir Tamanho | PDFLince",
      description:
        "Reduza o tamanho do seu PDF eficientemente sem perda de qualidade. Compressão privada e gratuita direto no navegador.",
      keywords: [
        "comprimir pdf",
        "reduzir tamanho pdf",
        "otimizar pdf",
        "compressor pdf online",
        "pdf leve",
      ],
      ogTitle: "Comprimir PDFs sem perder qualidade | PDFLince",
      ogDescription:
        "Arraste seu arquivo, escolha o nível de compressão ideal e baixe um PDF significativamente menor em segundos — totalmente seguro e sem uploads para servidores.",
      ogImageAlt: "Interface do PDFLince comprimindo um documento",
    },
    hero: {
      title: "Comprimir PDF online com qualidade",
      description:
        "Reduza o tamanho de documentos para caber em limites de e-mail, plataformas educacionais ou portais públicos mantendo a legibilidade.",
      bulletPoints: [
        "Processamento 100% local: seus arquivos não saem do navegador",
        "Escolha compressão básica, intermediária ou agressiva conforme a necessidade",
        "Preserve metadados e estrutura quando for importante",
      ],
      imageAlt: "Fluxo de compressão de PDF no PDFLince",
    },
    benefitsTitle: "Por que comprimir PDFs com o PDFLince",
    benefits: [
      {
        title: "Qualidade equilibrada",
        description:
          "Nosso motor de compressão analisa cada recurso para entregar a maior redução sem borrar textos ou gráficos.",
      },
      {
        title: "Pronto para envios",
        description:
          "Gere arquivos que passam em limites rígidos de portais governamentais, universidades ou fluxos corporativos.",
      },
      {
        title: "Privacidade por padrão",
        description:
          "Evite uploads em servidores e reduza o risco de vazamentos cumprindo políticas internas de privacidade.",
      },
    ],
    howTo: {
      title: "Como comprimir um PDF com o PDFLince",
      steps: [
        "Clique em “Envie seus arquivos” e escolha o PDF que deseja otimizar.",
        "Selecione o nível de compressão e defina opções avançadas como manter metadados.",
        "Pressione “Processar” e baixe o documento comprimido em segundos.",
      ],
      note:
        "Precisa comprimir vários relatórios? Faça um por vez sem limites diários ou marcas d'água.",
    },
    useCasesTitle: "Quando vale a pena comprimir um PDF",
    useCases: [
      "Enviar contratos, notas fiscais ou manuais por e-mail sem estourar o limite de anexos.",
      "Enviar trabalhos para Moodle, Canvas ou qualquer AVA com limite rígido de arquivo.",
      "Deixar teses, catálogos ou relatórios mais leves para download.",
      "Arquivar documentos na nuvem economizando espaço sem perder informações relevantes.",
    ],
  },
  merge: {
    key: "merge",
    slug: "juntar",
    mode: "merge",
    meta: {
      title: "Juntar PDF Online | Combinar Vários PDFs Grátis | PDFLince",
      description:
        "Combine vários PDF em um único documento sem limites. Arraste, reordene e baixe seu arquivo unificado com privacidade.",
      keywords: [
        "juntar pdf",
        "combinar pdf",
        "unir arquivos pdf",
        "fundir pdf",
        "merge pdf",
      ],
      ogTitle: "Una múltiplos PDFs em segundos | PDFLince",
      ogDescription:
        "Organize seus documentos na ordem perfeita, ajuste as configurações e baixe um arquivo PDF unificado sem nunca enviar seus dados para a nuvem.",
      ogImageAlt: "Junção de arquivos PDF no PDFLince",
    },
    hero: {
      title: "Juntar PDFs online — rápido e seguro",
      description:
        "Crie um arquivo polido com contratos, notas de aula ou políticas prontas para enviar, assinar ou arquivar.",
      bulletPoints: [
        "Arraste e solte para definir a ordem final",
        "Sem limites ocultos: una documentos longos gratuitamente",
        "Mantenha marcadores e metadados quando necessário",
      ],
      imageAlt: "Ferramenta de junção de PDFs",
    },
    benefitsTitle: "Vantagens de juntar com o PDFLince",
    benefits: [
      {
        title: "Entrega consistente",
        description:
          "Garanta material em um único arquivo com numeração contínua e formato padronizado.",
      },
      {
        title: "Economia de tempo",
        description:
          "Esqueça editores pesados. Arraste, organize e baixe um documento pronto para compartilhar.",
      },
      {
        title: "Privado e sem cadastro",
        description:
          "Não armazenamos cópias nem pedimos dados pessoais — ideal para informações confidenciais.",
      },
    ],
    howTo: {
      title: "Como juntar PDFs com o PDFLince",
      steps: [
        "Clique em “Envie seus arquivos” e selecione pelo menos dois PDFs.",
        "Use as setas ou o arrastar para definir a ordem final.",
        "Escolha as opções de marcadores e toque em “Processar” para baixar o PDF combinado.",
      ],
      note:
        "Precisa adicionar mais arquivos depois? Basta arrastar sem reiniciar o processo.",
    },
    useCasesTitle: "Quando juntar PDFs",
    useCases: [
      "Montar um dossiê com anexos, propostas e condições comerciais.",
      "Enviar várias notas fiscais mensais em um único arquivo.",
      "Reunir anotações escaneadas e apresentações em um PDF para alunos.",
      "Criar pacotes jurídicos completos para assinatura eletrônica.",
    ],
  },
  split: {
    key: "split",
    slug: "dividir",
    mode: "split",
    meta: {
      title: "Dividir PDF por Páginas ou Capítulos | Grátis | PDFLince",
      description:
        "Separe seu PDF em vários arquivos por intervalos ou capítulos. Controle total sobre a estrutura sem uploads para o servidor.",
      keywords: [
        "dividir pdf",
        "separar pdf",
        "dividir pdf por páginas",
        "split pdf",
        "partir pdf",
      ],
      ogTitle: "Divida PDFs com precisão | PDFLince",
      ogDescription:
        "Escolha exatamente como dividir seu documento, gere quantos arquivos individuais precisar e baixe-os instantaneamente para o seu dispositivo.",
      ogImageAlt: "Processo de divisão de PDF",
    },
    hero: {
      title: "Dividir PDFs por páginas ou segmentos",
      description:
        "Extraia capítulos, anexos ou seções específicas em arquivos independentes prontos para compartilhar.",
      bulletPoints: [
        "Configure divisões por número de páginas ou por tamanho",
        "Gere vários PDFs em um único processamento",
        "Trabalhe sem limites de páginas ou marcas d'água",
      ],
      imageAlt: "Divisão de documento PDF",
    },
    benefitsTitle: "O que a divisão com o PDFLince oferece",
    benefits: [
      {
        title: "Controle sobre o que compartilhar",
        description:
          "Entregue apenas a parte relevante sem expor informações sensíveis do restante do documento.",
      },
      {
        title: "Entrega escalável",
        description:
          "Gere múltiplos arquivos de uma vez e faça o download automático para arquivar ou enviar.",
      },
      {
        title: "Ajustes avançados",
        description:
          "Crie lotes, adicione separadores ou defina formatos que combinam com seu fluxo.",
      },
    ],
    howTo: {
      title: "Como dividir um PDF com o PDFLince",
      steps: [
        "Envie o PDF que deseja segmentar.",
        "Escolha se vai dividir por número fixo de páginas ou por tamanho do arquivo.",
        "Clique em “Processar” e baixe automaticamente os novos documentos.",
      ],
      note:
        "O PDFLince baixa o primeiro arquivo na hora e salva os demais sem etapas extras.",
    },
    useCasesTitle: "Cenários comuns para dividir PDFs",
    useCases: [
      "Publicar cada capítulo de um livro digital em um curso online.",
      "Separar anexos que precisam ser enviados por canais diferentes.",
      "Extrair resumos trimestrais de relatórios financeiros extensos.",
      "Criar pacotes enxutos para clientes sem expor documentos internos.",
    ],
  },
  extract: {
    key: "extract",
    slug: "extrair",
    mode: "extract",
    meta: {
      title: "Extrair Páginas de um PDF | Salvar Seleção | PDFLince",
      description:
        "Selecione páginas de qualquer PDF e crie um novo documento na hora. Processamento privado e ilimitado direto no navegador.",
      keywords: [
        "extraer paginas pdf",
        "salvar paginas pdf",
        "selecionar paginas pdf",
        "extrair paginas pdf",
        "novo pdf",
      ],
      ogTitle: "Extraia apenas as páginas necessárias | PDFLince",
      ogDescription:
        "Marque as páginas relevantes que deseja manter, gere um novo arquivo PDF em segundos e garanta que seus dados permaneçam seguros no seu próprio dispositivo.",
      ogImageAlt: "Seleção de páginas no PDFLince",
    },
    hero: {
      title: "Extrair páginas específicas de um PDF",
      description:
        "Monte documentos sob medida mantendo apenas as páginas que você precisa compartilhar ou arquivar.",
      bulletPoints: [
        "Visualize miniaturas e marque páginas individuais",
        "Mantenha a numeração original ou crie novas seções",
        "Baixe o PDF resultante imediatamente",
      ],
      imageAlt: "Extração de páginas em PDF",
    },
    benefitsTitle: "Vantagens de extrair páginas com o PDFLince",
    benefits: [
      {
        title: "Documentos mais relevantes",
        description:
          "Compartilhe apenas o conteúdo útil com equipe ou clientes evitando dados redundantes.",
      },
      {
        title: "Controle total no navegador",
        description:
          "Selecione, visualize e confirme cada página sem softwares pesados ou conexão estável.",
      },
      {
        title: "Resultado limpo",
        description:
          "O novo PDF preserva qualidade e metadados conforme as opções escolhidas.",
      },
    ],
    howTo: {
      title: "Como extrair páginas com o PDFLince",
      steps: [
        "Envie o PDF e selecione o arquivo desejado.",
        "Marque as páginas necessárias no painel de miniaturas.",
        "Clique em “Processar” para baixar um PDF com as páginas selecionadas.",
      ],
      note:
        "Combine a extração com outras operações como juntar ou comprimir em sessões diferentes.",
    },
    useCasesTitle: "Ideias para extrair páginas",
    useCases: [
      "Compartilhar apenas o capítulo designado de um manual com a equipe.",
      "Enviar páginas específicas de um contrato para revisão jurídica.",
      "Montar dossiês personalizados com informação relevante para cada cliente.",
      "Guardar somente páginas com formulários ou comprovantes que precisam ser arquivados.",
    ],
  },
  reorder: {
    key: "reorder",
    slug: "reordenar",
    mode: "reorder",
    meta: {
      title: "Reordenar Páginas PDF | Mudar Ordem Rápido | PDFLince",
      description:
        "Reorganize facilmente as páginas do seu PDF arrastando e soltando. Corrija a ordem e salve o resultado instantaneamente, tudo localmente.",
      keywords: [
        "reordenar pdf",
        "mudar ordem paginas pdf",
        "organizar pdf",
        "rearranjar pdf",
        "ordenar paginas pdf",
      ],
      ogTitle: "Organize PDFs sem reinstalar software | PDFLince",
      ogDescription:
        "Mova as páginas para a posição correta, corrija erros de ordenação e baixe seu documento PDF perfeitamente organizado em apenas alguns momentos.",
      ogImageAlt: "Reordenação de páginas no PDFLince",
    },
    hero: {
      title: "Reordenar páginas de um PDF com arrastar e soltar",
      description:
        "Corrija a sequência de notas fiscais escaneadas, apresentações ou relatórios extensos em segundos.",
      bulletPoints: [
        "Miniaturas grandes ajudam a evitar erros",
        "Arraste as páginas e confirme a nova ordem rapidamente",
        "Exporte o PDF reorganizado sem perder marcadores ou links internos",
      ],
      imageAlt: "Interface de reordenação de páginas",
    },
    benefitsTitle: "Por que reordenar com o PDFLince",
    benefits: [
      {
        title: "Fluxos mais ágeis",
        description:
          "Corrija digitalizações bagunçadas sem redigitalizar ou instalar editores complexos.",
      },
      {
        title: "Precisão visual",
        description:
          "As miniaturas permitem validar cada página antes de exportar a nova sequência.",
      },
      {
        title: "Sem rastros",
        description:
          "Todo o processo fica no seu dispositivo — ideal para documentos sensíveis ou confidenciais.",
      },
    ],
    howTo: {
      title: "Como reordenar páginas com o PDFLince",
      steps: [
        "Envie o PDF e escolha o arquivo que deseja editar.",
        "Arraste cada miniatura até alcançar a ordem correta.",
        "Clique em “Processar” para baixar o documento com a nova sequência.",
      ],
      note:
        "Continue ajustando a ordem mesmo após exportar, sem reenviar o arquivo.",
    },
    useCasesTitle: "Quando reorganizar um PDF",
    useCases: [
      "Alinhar propostas, anexos e assinaturas antes de enviar.",
      "Preparar apresentações impressas com a sequência certa.",
      "Corrigir páginas duplicadas ou invertidas após digitalizações em lote.",
      "Atualizar manuais ou catálogos reaproveitando conteúdo existente sem diagramar do zero.",
    ],
  },
  pdfToImages: {
    key: "pdfToImages",
    slug: "pdf-para-imagens",
    mode: "pdfToImages",
    meta: {
      title: "Converter PDF em Imagens | Exportar PNG/JPEG | PDFLince",
      description:
        "Converta cada página do seu PDF em imagens PNG ou JPEG de alta qualidade. Escolha sua resolução e baixe como um arquivo ZIP — 100% privado e seguro.",
      keywords: [
        "pdf para imagens",
        "pdf para png",
        "pdf para jpeg",
        "exportar paginas pdf",
        "baixar pdf como imagem",
      ],
      ogTitle: "Exporte páginas de PDF como imagens nítidas | PDFLince",
      ogDescription:
        "Renderize cada página como uma imagem nítida diretamente no seu navegador. Ajuste a qualidade, defina nomes e obtenha um arquivo ZIP organizado instantaneamente.",
      ogImageAlt: "PDFLince convertendo um PDF em imagens",
    },
    hero: {
      title: "Converter páginas PDF em PNG ou JPEG",
      description:
        "Gere imagens prontas para apresentações, revisões ou handoffs sem depender de editores pesados.",
      bulletPoints: [
        "Selecione PNG ou JPEG e controle o DPI de exportação",
        "Baixe um único ZIP ou uma imagem por página",
        "Processamento 100% local no seu navegador — nada é enviado",
      ],
      imageAlt: "Fluxo de PDF para imagens",
    },
    benefitsTitle: "Por que exportar PDFs com o PDFLince",
    benefits: [
      {
        title: "Qualidade pronta para apresentações",
        description:
          "Escolha a resolução ideal para slides, intranets ou fluxos de design sem perder nitidez.",
      },
      {
        title: "Downloads flexíveis",
        description:
          "Mantenha um ZIP organizado para documentos longos ou baixe somente as páginas necessárias.",
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
        "Clique em “Exportar imagens” para baixar o arquivo comprimido ou as páginas individuais.",
      ],
      note:
        "Precisa apenas de algumas páginas? Extraia ou divida antes e depois exporte para imagens.",
    },
    useCasesTitle: "Quando a conversão PDF→imagem ajuda",
    useCases: [
      "Compartilhar prévias de design sem enviar o PDF completo.",
      "Inserir páginas em CMS, apresentações ou ferramentas que aceitam apenas imagens.",
      "Criar materiais para tablets ou e-readers que lidam melhor com PNG/JPEG.",
      "Documentar revisões internas com capturas de cada página.",
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
      ogTitle: "Monte um PDF impecável com suas imagens | PDFLince",
      ogDescription:
        "Arraste suas imagens para o lugar, defina as configurações de layout e exporte um arquivo PDF pronto para impressão — sem uploads ou marcas d'água anexadas.",
      ogImageAlt: "Criação de PDF a partir de imagens no PDFLince",
    },
    hero: {
      title: "Agrupe JPG ou PNG em um PDF profissional",
      description:
        "Junte digitalizações, fotos ou gráficos em um único documento pronto para equipes, alunos ou clientes.",
      bulletPoints: [
        "Reordene as imagens com arrastar e soltar",
        "Defina tamanho de página, orientação e margens",
        "Escolha uma cor de fundo sólida para evitar transparências",
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
        title: "Pronto para impressão e revisão",
        description:
          "Ajuste margens, orientação e fundo para que o PDF fique perfeito no papel e na tela.",
      },
      {
        title: "Processamento seguro",
        description:
          "A conversão acontece inteiramente no navegador, ideal para recibos, identidades ou material educacional.",
      },
    ],
    howTo: {
      title: "Como converter imagens em PDF",
      steps: [
        "Adicione as imagens que deseja incluir e organize na ordem final.",
        "Ajuste o modo de encaixe, tamanho de página, orientação e margens.",
        "Clique em “Criar PDF” para baixar o documento pronto para compartilhar ou arquivar.",
      ],
      note:
        "O PDF ficou pesado? Comprima ou divida depois sem reenviar as imagens.",
    },
    useCasesTitle: "Boas ideias para imagem→PDF",
    useCases: [
      "Agrupar provas, tarefas ou atividades escaneadas antes de devolvê-las aos alunos.",
      "Reunir recibos e comprovantes em um único PDF para prestação de contas.",
      "Montar catálogos, portfolios ou lookbooks a partir de exportações de design.",
      "Enviar relatórios fotográficos ou inspeções sem anexar dezenas de arquivos.",
    ],
  },
};

export const operationsPt: Record<OperationKey, OperationContent> = {
  merge: operationsPtContent.merge,
  compress: operationsPtContent.compress,
  split: operationsPtContent.split,
  extract: operationsPtContent.extract,
  reorder: operationsPtContent.reorder,
  pdfToImages: operationsPtContent.pdfToImages,
  imagesToPdf: operationsPtContent.imagesToPdf,
};
