import { DEFAULT_LOCALE } from "../../i18n/config";
import { getDictionary } from "../../i18n/get-dictionary";
import { HomePageContent } from "../../components/HomePageContent";

import { createHomeMetadata } from "../(helpers)/locale-metadata";

export const generateMetadata = createHomeMetadata(DEFAULT_LOCALE);

export default function RootHomePage() {
  const dictionary = getDictionary(DEFAULT_LOCALE);

  return <HomePageContent dictionary={dictionary} />;
}
