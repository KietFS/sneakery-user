import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useAppSelector } from "../../../hooks/useRedux";
import LoginPage from "../../../pages/auth/login";
import { IRootState } from "../../../redux";
export function withAuthorization<T>(
  Component: React.FC<T>
  //   authorizations: string[],
  //   Placeholder?: React.FC
) {
  return (props: T) => {
    const router = useRouter();
    const { user } = useAppSelector((state: IRootState) => state.auth);
    // const index = authorizations.findIndex(
    //   (authorization) => authorization === “manager”

    useEffect(() => {
      const isExited = localStorage.getItem("user");
      if (user === null && !isExited) {
        router.push("/auth/login");
      }
    }, [user]);
    // );

    return <Component {...(props as any)} />;
    // if (authorizations.length === 0 || index !== -1)
    //   return <Component {...(props as any)} />;
    // return Placeholder ? <Placeholder /> : <></>;
  };
}
