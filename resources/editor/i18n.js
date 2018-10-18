import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

const EDITOR_WORKSPACE = process.env.MIX_EDITOR_WORKSPACE;

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: "en-US",
    fallbackNS: "translate",
    ns: "translate",
    defaultNS: "translate",
    debug: true,
    load: "currentOnly",

    interpolation: {
      escapeValue: false
    },

    react: {
      wait: true,
      nsMode: "translate",
      bindStore: false,
      bindI18n: "languageChanged"
    },
    backend: {
      loadPath: "../editor/" + EDITOR_WORKSPACE + "/locales/{{lng}}/{{ns}}.json"
    }
  });

export default i18n;
