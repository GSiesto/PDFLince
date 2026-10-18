import { McpPageContent } from "../../../components/McpPageContent";
import { createMcpMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "ru" as const;

export const generateMetadata = createMcpMetadata(LOCALE);

export default function RuMcpPage() {
  return <McpPageContent />;
}
