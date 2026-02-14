import { buildOperationMetadata, buildOperationPage } from "../../../(helpers)/operation-handlers";
import { DEFAULT_LOCALE } from "../../../../i18n/config";

const LOCALE = DEFAULT_LOCALE;
const OPERATION_KEY = "merge" as const;

export const generateMetadata = buildOperationMetadata(LOCALE, OPERATION_KEY);
export default buildOperationPage(LOCALE, OPERATION_KEY);
