import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useSignInWithGoogle,
  useSignInWithFacebook,
} from "react-firebase-hooks/auth";
import { auth } from "../common/config/firebase";
import { IRootState } from "../redux";
import { setUser } from "../redux/slices/auth";
import { isExistedEmail, loginService, registerService } from "../services/api";
import { useAppDispatch, useAppSelector } from "./useRedux";

export const useAuth = () => {
  const [loginWithGoogle, googleUser] = useSignInWithGoogle(auth);
  const [loginWithFacebook] = useSignInWithFacebook(auth);
  const [loginError, setLoginError] = useState<any>();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [existed, setExisted] = useState<boolean | null>(null);
  const { user } = useAppSelector((state: IRootState) => state.auth);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      setLoginLoading(true);
      const data = await loginService(email, password);
      if (data) {
        dispatch(setUser(data.data));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setLoginError(error);
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    user && localStorage.setItem("token", user.accessToken);
    user && localStorage.setItem("user", JSON.stringify(user));
    console.log("User is  ", user);
  }, [user]);

  useEffect(() => {
    googleUser && checkIsFirstTimeWithGoogle(googleUser?.user?.email as string);
  }, [googleUser]);

  useEffect(() => {
    if (googleUser) {
      if (existed === true) {
        login(
          googleUser?.user?.email as string,
          googleUser?.user?.uid as string
        );
      } else {
        registerService(
          googleUser.user.displayName as string,
          googleUser.user.email as string,
          googleUser.user.uid
        );
      }
    }
  }, [googleUser, existed]);

  const checkIsFirstTimeWithGoogle = async (email: string) => {
    const isExisted = await isExistedEmail(email);
    isExisted ? setExisted(true) : setExisted(false);
  };

  const googleLogin = async () => {
    try {
      setLoginLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    login,
    loginError,
    googleLogin,
    loginLoading,
    loginWithFacebook,
    loginWithGoogle,
  };
};
