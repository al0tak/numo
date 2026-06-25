import "./global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RootLayout } from "./components/shared/RootLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootLayout />
  </StrictMode>,
);
