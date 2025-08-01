import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/notifications/styles.css";

createRoot(document.getElementById("root")!).render(
  <MantineProvider defaultColorScheme="dark">
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
);
