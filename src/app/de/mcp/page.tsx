import { McpPageContent } from "../../../components/McpPageContent";
import { createMcpMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "de" as const;

export const generateMetadata = createMcpMetadata(LOCALE);

export default function DeMcpPage() {
  return <McpPageContent />;
}
