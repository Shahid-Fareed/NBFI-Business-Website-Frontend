"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import i18n from "i18next";

interface LanguageContextProps {
  language: string;
  changeLanguage: (lng: string) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "en",
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    // Initialize language from i18next or fallback to default
    const storedLanguage = localStorage.getItem("i18nextLng") || "en";
    setLanguage(storedLanguage);
    i18n.changeLanguage(storedLanguage);
  }, []);

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
