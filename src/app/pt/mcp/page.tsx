import { McpPageContent } from "../../../components/McpPageContent";
import { createMcpMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "pt" as const;

export const generateMetadata = createMcpMetadata(LOCALE);

export default function PtMcpPage() {
  return <McpPageContent />;
}
