import { SupportPageContent } from "../../../components/SupportPageContent";
import { createSupportMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "it" as const;

export const generateMetadata = createSupportMetadata(LOCALE);

export default function ItSupportPage() {
  return <SupportPageContent />;
}
