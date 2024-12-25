import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const languages = ["uk", "en"];

  const currentLang =
    languages.find((lang) => i18n.language.toLowerCase().includes(lang)) ||
    "en";

  return (
    <>
      {languages.map((lang) => (
        <button
          onClick={() => changeLanguage(lang)}
          key={lang}
          className={`${lang === currentLang ? "active" : ""}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </>
  );
}
