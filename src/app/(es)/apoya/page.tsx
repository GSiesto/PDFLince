import NavMenu from "../../../components/NavMenu";
import Footer from "../../../components/Footer";
import FotoLinceBanner from "../../../components/FotoLinceBanner";
import { LocaleProvider } from "../../../i18n/LocaleProvider";
import { DEFAULT_LOCALE } from "../../../i18n/config";
import { SupportPageContent } from "../../../components/SupportPageContent";
import { createSupportMetadata } from "../../(helpers)/locale-metadata";

export const generateMetadata = createSupportMetadata(DEFAULT_LOCALE);

export default function SupportPage() {
  return (
    <LocaleProvider locale={DEFAULT_LOCALE}>
      <NavMenu />
      <main>
        <SupportPageContent />
      </main>
      <FotoLinceBanner />
      <Footer />
    </LocaleProvider>
  );
}
