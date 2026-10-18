import { McpPageContent } from "../../../components/McpPageContent";
import { createMcpMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "it" as const;

export const generateMetadata = createMcpMetadata(LOCALE);

export default function ItMcpPage() {
  return <McpPageContent />;
}
