// Providers.tsx
"use client"; // Ensure this file is treated as a client component

import { Provider } from "react-redux";
import store from "./store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
