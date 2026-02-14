import { HomePageContent } from "../../components/HomePageContent";
import { getDictionary } from "../../i18n/get-dictionary";
import { createHomeMetadata } from "../(helpers)/locale-metadata";

const LOCALE = "pt" as const;

export const generateMetadata = createHomeMetadata(LOCALE);

export default function PtHomePage() {
  const dictionary = getDictionary(LOCALE);
  return <HomePageContent dictionary={dictionary} />;
}
