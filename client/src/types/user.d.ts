interface InitialUserState {
  authenticated: boolean;
  user: User | null;
}

interface User {
  accessToken: string;
  gender: string;
  id: string;
  name: string;
  refreshToken: string;
  __typename: string;
}
