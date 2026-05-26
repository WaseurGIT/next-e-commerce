import AuthProvider from "./auth/AuthProvider";
import "./globals.css";


export const metadata = {
  title: "LUXURA",
  description: "Premium Luxury Products for Discerning Tastes",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
