import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../lib/i18n";

export const HomePage = () => {
  const { language } = useLanguage();

  return (
    <div className="py-10 space-y-4 text-center">
      <h1 className="text-2xl font-semibold">{t("home.welcome", language)}</h1>
      <p className="text-sm text-gray-600">{t("home.description", language)}</p>

      <p className="mt-4 text-xs text-gray-400">
        Current language: <strong>{language}</strong>
      </p>
    </div>
  );
};
