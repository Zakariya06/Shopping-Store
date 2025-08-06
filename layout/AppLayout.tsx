import Header from "@/components/header/Header";
import withAuth from "@/hoc/withAuth";
import React, { ReactNode } from "react";

interface IAppLayout {
  children: ReactNode;
}

const AppLayout: React.FC<IAppLayout> = React.forwardRef(
  ({ children }, ref) => {
    return (
      <>
        <Header />
        <main className="container mx-auto py-4">{children}</main>
      </>
    );
  }
);

export default withAuth(AppLayout);
