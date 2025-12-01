import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../lib/i18n";
import { LanguageSwitcher } from "../../components/common/LanguageSwitcher";

export const SettingsPage = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="space-y-8 py-8">
      <section>
        <h1 className="text-2xl font-semibold">
          {t("settings.title", language)}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {t("settings.description", language)}
        </p>
      </section>

      <section className="rounded-2xl bg-white shadow-sm p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            {t("settings.languageSectionTitle", language)}
          </h2>
          <p className="mt-1 text-xs text-gray-500 leading-relaxed">
            {t("settings.languageSectionDescription", language)}
          </p>
        </div>

        <LanguageSwitcher value={language} onChange={setLanguage} />

        <p className="mt-2 text-xs text-gray-400">
          Current language: <strong>{language}</strong>
        </p>
      </section>

      <section className="rounded-2xl border border-dashed border-gray-300 bg-white/40 p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          앞으로 이 페이지에는 알림 설정, 테마(라이트/다크), 타임존 등 디지털
          노마드 라이프에 필요한 옵션들이 추가될 예정입니다.
        </p>
      </section>
    </div>
  );
};
