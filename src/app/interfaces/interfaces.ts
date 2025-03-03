export interface LoginData {
  email: string;
  pass: string;
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  token: string;
}

export interface LoginResult {
  status: string;
  user: UserInterface;
}

export interface RegisterData {
  email: string;
  name: string;
  pass: string;
  conf: string;
}
