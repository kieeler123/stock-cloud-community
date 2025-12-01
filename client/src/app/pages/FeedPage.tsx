import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../lib/i18n";

export const FeedPage = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6 py-8">
      <header className="text-center">
        <h1 className="text-2xl font-semibold">{t("feed.title", language)}</h1>
        <p className="mt-2 text-sm text-gray-600">{t("feed.hint", language)}</p>
      </header>

      <section className="rounded-2xl border border-dashed border-gray-300 bg-white/60 p-6 text-center">
        <p className="text-gray-500 text-sm">{t("feed.empty", language)}</p>
      </section>
    </div>
  );
};
