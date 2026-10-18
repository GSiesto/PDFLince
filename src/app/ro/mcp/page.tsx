import { McpPageContent } from "../../../components/McpPageContent";
import { createMcpMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "ro" as const;

export const generateMetadata = createMcpMetadata(LOCALE);

export default function RoMcpPage() {
  return <McpPageContent />;
}
