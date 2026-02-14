import { FaqPageContent } from "../../../components/FaqPageContent";
import { getDictionary } from "../../../i18n/get-dictionary";
import { createFaqMetadata } from "../../(helpers)/locale-metadata";
import { DEFAULT_LOCALE } from "../../../i18n/config";

const LOCALE = DEFAULT_LOCALE;

export const generateMetadata = createFaqMetadata(LOCALE);

export default function EsFaqPage() {
    const dictionary = getDictionary(LOCALE);
    return <FaqPageContent dictionary={dictionary} />;
}
