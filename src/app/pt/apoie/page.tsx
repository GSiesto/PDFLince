import { SupportPageContent } from "../../../components/SupportPageContent";
import { createSupportMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "pt" as const;

export const generateMetadata = createSupportMetadata(LOCALE);

export default function PtSupportPage() {
  return <SupportPageContent />;
}
