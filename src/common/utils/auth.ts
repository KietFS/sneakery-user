import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const cookieKey = ":token";

export const getUserCookies = (): any => {
  return cookies.get(cookieKey);
};

/**
 * Returns the logged in user
 */
export const getLoggedInAccount = () => {
  const account = getUserCookies();
  return account
    ? typeof account === "object"
      ? account
      : JSON.parse(account)
    : null;
};
