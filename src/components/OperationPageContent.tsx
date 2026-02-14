import Image from "next/image";
import PDFProcessor from "./pdf-processor";
import FaqSection from "./faq-section";
import type { OperationContent } from "../i18n/dictionaries/operation-types";

export function OperationPageContent({
  operation,
}: {
  operation: OperationContent;
}) {
  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: operation.howTo.title,
    description: operation.hero.description,
    step: operation.howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.length > 80 ? `${operation.howTo.title} - ${index + 1}` : step,
      text: step,
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-soft relative">
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: "var(--max-width-wide-page)" }}>
        <section className="mb-10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left md:max-w-[70%]">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{operation.hero.title}</h1>
              <p className="text-xl text-[var(--tx-2)] max-w-3xl">{operation.hero.description}</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {operation.hero.bulletPoints.map((point) => (
                  <span
                    key={point}
                    className="inline-flex items-start gap-2 px-3 py-2 rounded-lg bg-[var(--ui)] text-sm text-left"
                  >
                    <span className="text-[var(--accent)]">✓</span>
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden md:block md:w-[30%] mt-8 md:mt-0">
              <Image
                src="/images/stickers/pdflince_logo_processed.webp"
                alt={operation.hero.imageAlt}
                width={240}
                height={240}
                className="w-full h-auto max-w-[240px] ml-auto opacity-85"
                priority
                unoptimized
              />
            </div>
          </div>
        </section>

        <PDFProcessor initialMode={operation.mode} />

        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6 text-center">{operation.benefitsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {operation.benefits.map((benefit) => (
              <div key={benefit.title} className="surface-card p-6 h-full">
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-[var(--tx-2)]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card bg-[var(--bg-2)]/80 p-8 my-12">
          <h2 className="text-2xl font-bold mb-4">{operation.howTo.title}</h2>
          <ol className="list-decimal list-inside space-y-3 text-[var(--tx-2)]">
            {operation.howTo.steps.map((step, index) => (
              <li key={`${operation.slug}-step-${index}`}>{step}</li>
            ))}
          </ol>
          {operation.howTo.note && (
            <p className="mt-4 text-sm text-[var(--tx-3)]">{operation.howTo.note}</p>
          )}
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold mb-4 text-center">{operation.useCasesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operation.useCases.map((useCase) => (
              <div key={useCase} className="surface-card p-5">
                <p className="text-[var(--tx-2)]">{useCase}</p>
              </div>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToStructuredData) }}
        />

        <FaqSection />
      </div>
    </div>
  );
}
