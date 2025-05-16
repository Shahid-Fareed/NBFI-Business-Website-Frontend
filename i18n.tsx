"use client";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./languages/en.json";
import ur from "./languages/ur.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      ur: {
        translation: ur,
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Disable detection of localStorage and cookies for SSR safety
      order: ["navigator", "htmlTag"],
      caches: [],
    },
  });

export default i18n;