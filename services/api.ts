import axios from "axios";

export const loginService = async (email: string, password: string) => {
  try {
    const data = await axios.post(
      "http://teachers-values.at.ply.gg:46996/api/auth/signin",
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
      "http://teachers-values.at.ply.gg:46996/api/auth/signup",
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
      "http://teachers-values.at.ply.gg:46996/api/auth/checkemail",
      {
        email: email,
      }
    );
    return isExisted;
  } catch (error) {
    console.log(error);
  }
};
