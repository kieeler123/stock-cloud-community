import type { FC } from "react";
import type { Language } from "../../types/locale";

type LanguageSwitcherProps = {
  value: Language;
  onChange: (lang: Language) => void;
};

const LABEL: Record<Language, string> = {
  en: "EN",
  ja: "日本語",
  ko: "한국어",
};

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-400">Language</span>
      <div className="inline-flex rounded-full bg-gray-100 p-1">
        {(["en", "ja", "ko"] as Language[]).map((lang) => {
          const isActive = value === lang;
          return (
            <button
              key={lang}
              type="button"
              onClick={() => onChange(lang)}
              className={[
                "px-2 py-1 rounded-full transition",
                isActive
                  ? "bg-white shadow-sm text-brand-primary"
                  : "text-gray-500 hover:text-brand-primary",
              ].join(" ")}
            >
              {LABEL[lang]}
            </button>
          );
        })}
      </div>
    </div>
  );
};
