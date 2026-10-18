import { McpPageContent } from "../../../components/McpPageContent";
import { createMcpMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "fr" as const;

export const generateMetadata = createMcpMetadata(LOCALE);

export default function FrMcpPage() {
  return <McpPageContent />;
}
