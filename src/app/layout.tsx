import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BFM - Bildung für Mühlacker",
  description: "Qualifizierte Nachhilfe in Mühlacker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
