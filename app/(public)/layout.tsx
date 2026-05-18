import React from "react";
import Navbar from "@/app/shared/Navbar";
import Footer from "@/app/shared/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </>
  );
}
