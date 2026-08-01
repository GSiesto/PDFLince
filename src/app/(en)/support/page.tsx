import { DEFAULT_LOCALE } from "../../../i18n/config";
import { SupportPageContent } from "../../../components/SupportPageContent";
import { createSupportMetadata } from "../../(helpers)/locale-metadata";

export const generateMetadata = createSupportMetadata(DEFAULT_LOCALE);

export default function SupportPage() {
  return <SupportPageContent />;
}
