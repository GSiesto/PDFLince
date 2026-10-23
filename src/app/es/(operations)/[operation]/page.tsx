import { createLocaleOperationHandlers } from "../../../(helpers)/operation-handlers";

const LOCALE = "es" as const;

const { generateStaticParams, generateMetadata, OperationPage } = createLocaleOperationHandlers(LOCALE);

export const dynamicParams = false;
export { generateStaticParams, generateMetadata };
export default OperationPage;
