import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ProtectedRoute from "@/hoc/ProtectedRoute";
import { AuthContextProvider } from "@/context/authContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ProtectedRoute>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </ProtectedRoute>
    </AuthContextProvider>
  );
}
