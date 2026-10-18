import { McpPageContent } from "../../../components/McpPageContent";
import { createMcpMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "hu" as const;

export const generateMetadata = createMcpMetadata(LOCALE);

export default function HuMcpPage() {
  return <McpPageContent />;
}
