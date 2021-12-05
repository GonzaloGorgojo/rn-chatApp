import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./english.json";
import espanol from "./espanol.json";

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  interpolation: {
    skipOnVariables: false,
  },
  lng: "en",
  resources: {
    es: espanol,
    en: english,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
