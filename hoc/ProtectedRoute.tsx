import { useAuth } from "@/context/authContext";
import { PAGE_ROUTE } from "@/routes/routes";
import { useRouter } from "next/router";
import React, { JSX, ReactNode, useEffect } from "react";

interface IProtectedRoutes {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRoutes): JSX.Element => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const publicPaths = Object.values(PAGE_ROUTE.PUBLIC_ROUTES);
  const isPublicPath = publicPaths.includes(router.pathname);

  useEffect(() => {
    if (!loading && !user && !isPublicPath) {
      router.push("/sign-in");
    }
  }, [user, loading, isPublicPath, router]);

  if (loading && !user && !isPublicPath) {
    return (
      <div className="flex-col gap-4 w-full min-h-screen  flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
