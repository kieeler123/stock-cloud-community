import type { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
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
