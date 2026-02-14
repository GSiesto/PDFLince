import { SupportPageContent } from "../../../components/SupportPageContent";
import { createSupportMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "en" as const;

export const generateMetadata = createSupportMetadata(LOCALE);

export default function EnSupportPage() {
  return <SupportPageContent />;
}
