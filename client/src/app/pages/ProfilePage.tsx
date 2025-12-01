import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../lib/i18n";

export const ProfilePage = () => {
  const { language } = useLanguage();

  const name = t("profile.placeholderName", language);
  const bio = t("profile.placeholderBio", language);

  return (
    <div className="py-8">
      <header className="text-center space-y-2 mb-6">
        <h1 className="text-2xl font-semibold">
          {t("profile.title", language)}
        </h1>
        <p className="text-sm text-gray-600">
          {t("profile.subtitle", language)}
        </p>
      </header>

      <section className="mx-auto max-w-md rounded-2xl bg-white shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-gray-200" />
          <div>
            <p className="text-base font-semibold">{name}</p>
            <p className="text-xs text-gray-500">stock cloud member</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
        </div>
      </section>
    </div>
  );
};
