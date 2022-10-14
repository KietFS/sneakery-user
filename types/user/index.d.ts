type IRole = "ROLE_USER";

interface IUser {
  id: string;
  username: string;
  email: string;
  roles: IRole[];
}

interface ILoginResponse {
  user: IUser;
  accessToken: string;
}
