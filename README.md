# 📘 Stock Cloud Community — 프론트엔드 구조 전체 정리 (2025)

## 01. 프로젝트 개요

### 기술 스택

- **React + TypeScript**
- **React Router v6**
- **Context API** (언어 상태 전역 관리)
- **Tailwind CSS** (스타일)
- **JSON 기반 i18n**
- **Vite 또는 CRA 기반 번들러** (환경에 따라)

### 핵심 목표

- 일본을 베이스로 하는 **글로벌 서비스**
- **영어 / 일본어 / 한국어** 다국어 지원
- 향후 기능 확장(경영, 콘텐츠, 커뮤니티 등)을 고려한 **유연한 폴더 구조**

  **팁**  
  프로젝트 문서에서 “기술 스택 + 목표”를 맨 위에 적어두면, 교수·면접관·협업자가 이 프로젝트가 어떤 레벨인지 한눈에 파악하기 쉽다.

## 02. 폴더 구조 (정석 구조)

```txt
client/
  src/
    app/
      App.tsx
      pages/
        HomePage.tsx
        FeedPage.tsx
        ProfilePage.tsx
        SettingsPage.tsx

    components/
      layout/
        MainLayout.tsx
      common/
        LanguageSwitcher.tsx

    contexts/
      LanguageContext.tsx

    lib/
      i18n.ts

    locales/
      en.json
      ja.json
      ko.json

    types/
      locale.ts
      # (선택) localeSchema.ts

    styles/
      index.css

    main.tsx
```

팁

app/ : 라우팅과 페이지 흐름

components/ : 재사용 가능한 UI

contexts/ : 전역 상태(Context)

lib/ : 유틸·도메인 로직

locales/ : 번역 파일
이렇게 역할별로 나누면 규모가 커져도 구조가 잘 버틴다.

## 03. 라우팅 구조

📌 가장 중요한 원칙
BrowserRouter는 앱 전체에서 단 한 번만 사용한다.
위치는 main.tsx 또는 App.tsx 둘 중 하나.

현재 사용 중인 패턴은 main.tsx에 Router를 두는 방식:

```tsx
コードをコピーする;
// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>
);
```

App.tsx는 Router 없이, Routes만 가진다:

```tsx
コードをコピーする;
// app/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { FeedPage } from "./pages/FeedPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";

export const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
```

---

팁
main.tsx에 Router를 두면, App은 “순수하게 화면만” 담당해서 역할 분리가 더 깔끔해진다.

## 04. 언어 상태 관리 (LanguageContext)

역할
전체 앱의 언어 상태를 전역으로 관리

localStorage와 연동해서 새로고침 후에도 언어 유지

setLanguage 호출 시 전 페이지가 즉시 리렌더링

### 04-01. 언어 타입

```ts
コードをコピーする;
// types/locale.ts
export type Language = "en" | "ja" | "ko";
```

컨텍스트 구현

```tsx
コードをコピーする;
// contexts/LanguageContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Language } from "../types/locale";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const DEFAULT_LANG: Language = "en";

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANG);

  // 초기 로드 시 localStorage 값 적용
  useEffect(() => {
    const saved = window.localStorage.getItem(
      "scc_language"
    ) as Language | null;
    if (saved) {
      setLanguageState(saved);
    }
  }, []);

  // 언어 변경 시: 상태 + localStorage 둘 다 업데이트
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem("scc_language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
};
```

팁

전역 상태는 항상 한 곳에서만 관리한다.

여기서는 LanguageProvider가 “언어의 단일 출처(single source of truth)”.

## 05. i18n 시스템 (JSON 기반)

### 05-01. JSON 구조 예시

```json
コードをコピーする
// locales/en.json
{
"app": {
"title": "Stock Cloud Community",
"tagline": "From Japan to the world"
},
"nav": {
"home": "Home",
"feed": "Feed",
"profile": "My Page"
}
}
```

```json
コードをコピーする
// locales/ja.json
{
"app": {
"title": "Stock Cloud コミュニティ",
"tagline": "日本から世界へ"
},
"nav": {
"home": "ホーム",
"feed": "フィード",
"profile": "マイページ"
}
}
```

```json
コードをコピーする
// locales/ko.json
{
"app": {
"title": "Stock Cloud 커뮤니티",
"tagline": "일본에서 세계로"
},
"nav": {
"home": "홈",
"feed": "피드",
"profile": "마이페이지"
}
}
```

### 05-02. t() 함수 구현

```ts
コードをコピーする;
// lib/i18n.ts
import en from "../locales/en.json";
import ja from "../locales/ja.json";
import ko from "../locales/ko.json";
import type { Language } from "../types/locale";

const dictionaries = {
  en,
  ja,
  ko,
};

export const t = (key: string, lang: Language): string => {
  const dict = dictionaries[lang];

  const parts = key.split(".");
  let value: any = dict;

  for (const part of parts) {
    value = value?.[part];
  }

  return value ?? key; // 못 찾으면 key 그대로 반환
};
```

핵심 포인트

"app.title" → JSON의 app → title 위치를 찾아서 문자열 반환

"nav.home" → JSON의 nav → home 위치를 찾아감

값을 못 찾으면 key를 그대로 반환 → 오타 디버깅에 도움

팁
모든 텍스트를 JSON에서 관리하면, 코드 수정 없이도 문구를 변경할 수 있다.
(기획자/디자이너가 JSON 파일만 수정해도 됨)

## 06. MainLayout — 언어 변경 + 네비게이션 UI

역할
상단 헤더(UI 공통)

네비게이션 메뉴

언어 변경 컴포넌트 (LanguageSwitcher)

메인 페이지 컨테이너 (children)

Footer

LanguageSwitcher

```tsx
コードをコピーする;
// components/common/LanguageSwitcher.tsx
import type { FC } from "react";
import type { Language } from "../../types/locale";

const LABEL: Record<Language, string> = {
  en: "EN",
  ja: "日本語",
  ko: "한국어",
};

type LanguageSwitcherProps = {
  value: Language;
  onChange: (lang: Language) => void;
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
```

MainLayout 구현 (Context 사용)

```tsx
コードをコピーする;
// components/layout/MainLayout.tsx
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import { useLanguage } from "../../contexts/LanguageContext";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-brand-soft text-brand-primary font-sans">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="text-xl font-semibold tracking-tight">
            Stock Cloud
            <span className="ml-1 text-sm font-normal text-gray-500">
              community
            </span>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4 text-sm text-gray-600">
              <Link
                to="/"
                className={
                  "hover:text-brand-primary " +
                  (isActive("/") ? "font-semibold text-brand-primary" : "")
                }
              >
                Home
              </Link>
              <Link
                to="/feed"
                className={
                  "hover:text-brand-primary " +
                  (isActive("/feed") ? "font-semibold text-brand-primary" : "")
                }
              >
                Feed
              </Link>
              <Link
                to="/profile"
                className={
                  "hover:text-brand-primary " +
                  (isActive("/profile")
                    ? "font-semibold text-brand-primary"
                    : "")
                }
              >
                My Page
              </Link>
              <Link
                to="/settings"
                className={
                  "hover:text-brand-primary " +
                  (isActive("/settings")
                    ? "font-semibold text-brand-primary"
                    : "")
                }
              >
                Settings
              </Link>
            </nav>

            <LanguageSwitcher value={language} onChange={setLanguage} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

      <footer className="border-t border-gray-200 bg-white/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} Stock Cloud Community</span>
          <span>JP → Global</span>
        </div>
      </footer>
    </div>
  );
};
```

팁
예전에 MainLayout이 Context 대신 props로 언어를 받았을 때,
App.tsx의 상태와 Context 상태가 따로 놀아서 새로고침해야 언어 변경이 반영되는 버그가 있었다.
지금은 useLanguage()만 쓰도록 통일해서 이 문제가 해결된 상태.

## 07. Language 버튼 이슈 정리 (에러 로그용)

### 07-01. 상황

React + TypeScript + Context + i18n 사용

언어 변경 버튼을 눌러도 텍스트가 바로 안 바뀌고,
새로고침 후에야 변경된 언어가 적용되는 현상 발생

### 07-02. 원인

언어 상태가

App.tsx의 useState(language)

LanguageProvider의 language
두 군데에서 따로 관리되고 있었음

화면(HomePage 등)은 **Context의 language**를 보고 있었지만,
버튼은 App 내부 상태만 변경하고 있었음 → 상태 불일치

i18n 키와 JSON 구조도 일부 불일치 (home.welcome vs app.title)

### 07-03. 해결

언어 상태를 LanguageProvider(Conte
xt) 하나로 통일

App.tsx에서 언어 관련 useState/useEffect 삭제

MainLayout과 페이지들은 모두 useLanguage()만 사용

LanguageProvider에서만 localStorage read/write 처리

i18n 키와 JSON 구조를 실제 호출 형태에 맞추어 수정

t("app.title", language) ↔ en.json.app.title

### 07-04. 결과

언어 변경 시 전 페이지 UI가 즉시 리렌더링

새로고침 없이 자연스럽게 전환

전역 상태 관리 구조 안정화

### 07-05. 배운 점

전역 상태(언어, 테마, 사용자 설정 등)는 반드시 한 군데에서만 관리한다.

Context + localStorage 조합을 사용할 때:

Context = 진짜 소스

localStorage = 초기값 + 영구 저장소 역할

i18n은 코드의 key("app.title")와 JSON 구조를 항상 맞춰야 한다.

## 08. 현재 시스템의 완성도

### 08-01. 현재 프로젝트는:

글로벌 언어 시스템(i18n) 기본 구조 완성

Context 기반 전역 언어 상태 안정적으로 구성

Layout / Routes / Pages 구조가 실무 레벨에 가깝게 정리

유지보수성과 확장성 모두 확보

### 08-02. 언어부분 수정내용

✔ 주요 작업 내용

i18n JSON(en/ja/ko) 확장

home / feed / profile / settings 영역에 필요한 문구 추가

일본어는 감성맞게 자연스러운 표현으로 조정

이제 모든 페이지가 통일된 i18n 패턴을 사용하도록 세팅됨

FeedPage 기본 레이아웃 구성

제목, 설명, 빈 피드 안내문 추가

향후 게시글·댓글 UI를 얹기 쉬운 구조로 설계

ProfilePage 기본 UI 제작

사용자 이름/프로필/바이오의 placeholder 문구 i18n 적용

실제 데이터 연동을 대비한 구조로 구축

SettingsPage의 언어 설정 섹션 구축

제목/설명/언어 선택 영역을 i18n으로 연결

LanguageSwitcher를 페이지 내부에서도 사용할 수 있도록 설정

향후 “테마/알림/타임존” 같은 설정을 추가할 공간 마련

MainLayout 전체 페이지에서 Context 기반 언어 전환 정상 동작 확인

nav는 아직 i18n 옵션 적용 전이지만, 적용 가능하도록 준비됨

전역 상태 적용 방식이 안정적으로 유지됨

✔ 배운 점 / 기록

페이지가 늘어나더라도, 언어 상태는 Context 하나로 관리하면 UI 반영이 항상 즉시 이뤄진다.

i18n JSON을 확장할 때는 “키 구조 통일”이 가장 중요하며,
이번 작업으로 전체 키 구조가 일관된 형태를 갖추게 됨.

페이지를 먼저 *“레이아웃 중심”*으로 만들면 나중에 DB 연결 시 훨씬 편하다.

📌 다음 작업 예정(TODO)

MainLayout 내 nav.menu 부분을 i18n으로 전환

SettingsPage → 테마 전역 상태 추가 준비

FeedPage → 게시글 카드 UI 설계

ProfilePage → 이름/소개 입력 폼 추가

### 08-03. 앞으로 추가하기 좋은 기능:

인증(Auth: 로그인/회원가입)

프로필 편집

게시글/댓글 기능

UI 세련화 (Tailwind + 일본 감성)

DB 연결 (초기 MongoDB → 이후 AWS로 마이그레이션)

팁
이 문서를 v1으로 두고, 기능이 늘어날 때마다 v2, v3 문서를 추가로 작성하면
“프로젝트 성장 히스토리” 자체가 포트폴리오가 된다.
