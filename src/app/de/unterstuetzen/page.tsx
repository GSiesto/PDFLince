import { SupportPageContent } from "../../../components/SupportPageContent";
import { createSupportMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "de" as const;

export const generateMetadata = createSupportMetadata(LOCALE);

export default function DeSupportPage() {
  return <SupportPageContent />;
}
