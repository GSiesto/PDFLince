import { DEFAULT_LOCALE } from "../../../i18n/config";
import { McpPageContent } from "../../../components/McpPageContent";
import { createMcpMetadata } from "../../(helpers)/locale-metadata";

export const generateMetadata = createMcpMetadata(DEFAULT_LOCALE);

export default function McpPage() {
  return <McpPageContent />;
}
