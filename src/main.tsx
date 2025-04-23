import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MyRecipeBook from "./MyRecipeBook.tsx";
import "./lib/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MyRecipeBook />
  </StrictMode>
);
