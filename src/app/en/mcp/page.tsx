import { McpPageContent } from "../../../components/McpPageContent";
import { createMcpMetadata } from "../../(helpers)/locale-metadata";

const LOCALE = "en" as const;

export const generateMetadata = createMcpMetadata(LOCALE);

export default function EnMcpPage() {
  return <McpPageContent />;
}
