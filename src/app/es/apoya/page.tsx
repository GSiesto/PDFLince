import { SupportPageContent } from "../../../components/SupportPageContent";
import { createSupportMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "es" as const;

export const generateMetadata = createSupportMetadata(LOCALE);

export default function EsSupportPage() {
  return <SupportPageContent />;
}
