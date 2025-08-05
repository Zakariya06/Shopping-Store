import Header from "@/components/header/Header";
import React, { ReactNode } from "react";

interface IAppLayout {
  children: ReactNode;
}

const AppLayout: React.FC<IAppLayout> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-4">{children}</main>
    </>
  );
};

export default AppLayout;
