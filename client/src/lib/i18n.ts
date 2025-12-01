import en from "../locales/en.json";
import ja from "../locales/ja.json";
import ko from "../locales/ko.json";
import type { Language } from "../types/locale";

const dictionaries = { en, ja, ko };

export const t = (key: string, lang: Language): string => {
  const dict = dictionaries[lang];

  // key: "home.welcome" → ["home", "welcome"]
  const parts = key.split(".");

  let value: any = dict;
  for (const part of parts) {
    value = value?.[part];
  }

  return value || key; // 키 못 찾으면 키 자체를 반환
};
