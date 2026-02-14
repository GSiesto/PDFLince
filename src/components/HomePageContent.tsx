import Image from "next/image";
import PDFProcessor from "./pdf-processor";
import type { Dictionary } from "../i18n/dictionaries/dictionary-types";

export function HomePageContent({ dictionary }: { dictionary: Dictionary }) {
  const {
    pages: { home },
  } = dictionary;

  return (
    <div className="min-h-screen bg-gradient-soft relative">
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: "var(--max-width-wide-page)" }}>
        <section className="mb-12 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left md:max-w-[80%]">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{home.hero.title}</h1>
              <p className="text-xl text-[var(--tx-2)] max-w-3xl">{home.hero.subtitle}</p>

              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                {home.hero.badges.map((badge) => (
                  <span key={badge} className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--ui)] text-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden md:block md:w-[20%] mt-8 md:mt-0">
              <Image
                src="/images/stickers/pdflince_logo_processed.webp"
                alt={home.hero.imageAlt}
                width={220}
                height={220}
                className="w-full h-auto max-w-[220px] ml-auto opacity-85"
                priority
                unoptimized
              />
            </div>
          </div>
        </section>

        <PDFProcessor />

        <section className="my-16">
          <h2 className="text-2xl font-bold mb-8 text-center">{home.why.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {home.why.cards.map((card) => (
              <div key={card.title} className="surface-card p-6">
                <div className="text-3xl mb-4 text-[var(--accent)]">{card.icon}</div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-[var(--tx-2)]">{card.description}</p>
              </div>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
}
