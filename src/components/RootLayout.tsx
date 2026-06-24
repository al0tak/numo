import { BrowserRouter, Route, Routes } from "react-router-dom";

import { EditorPage } from "@/components/pages/editor/EditorPage";
import { HomePage } from "@/components/pages/home/HomePage";
import { SettingsPage } from "@/components/pages/settings/SettingsPage";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* `basename` matches Vite's `base` so routing works under the GitHub Pages subpath. */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <div className="h-screen overflow-hidden bg-background">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/invoices/new" element={<EditorPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
