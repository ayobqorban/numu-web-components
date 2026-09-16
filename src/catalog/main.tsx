import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CatalogApp } from "./CatalogApp";
import "../theme/styles.css";
import "./catalog.css";

const root = document.getElementById("root");
if (!root) throw new Error("Catalog root element was not found.");

createRoot(root).render(
  <StrictMode>
    <CatalogApp />
  </StrictMode>,
);
