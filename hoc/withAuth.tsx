import React, { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { PAGE_ROUTE } from "@/routes/routes";

// Define a generic HOC type
const withAuth = (WrappedComponent: any) => {
  const ProtectedComponent = (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useLayoutEffect(() => {
      if (!loading && !user) {
        router.push(PAGE_ROUTE.PUBLIC_ROUTES.SIGNIN);
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="flex-col gap-4 w-full min-h-screen flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full" />
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
