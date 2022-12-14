import axios from "axios";

export const loginService = async (email: string, password: string) => {
  try {
    const data = await axios.post(
      "https://sneakery.herokuapp.com/api/auth/signin",
      {
        email,
        password,
      }
    );
    if (data) return data;
  } catch (error) {
    console.log(error);
  }
};

export const registerService = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const data = await axios.post(
      "https://sneakery.herokuapp.com/api/auth/signup",
      {
        username,
        email,
        password,
      }
    );
    if (data) return data;
  } catch (error) {
    console.log(error);
  }
};

export const isExistedEmail = async (email: string) => {
  try {
    const isExisted = await axios.post(
      "https://sneakery.herokuapp.com/api/auth/checkemail",

      {
        email: email,
      },
      {
        withCredentials: true,
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }
    );
    return isExisted;
  } catch (error) {
    console.log(error);
  }
};
