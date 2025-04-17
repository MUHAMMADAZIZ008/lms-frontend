import { create } from "zustand";
import Cookie from "js-cookie";
import { TokenData, UserT } from "../common/interface";
import { CookiesEnum } from "../common/enum";
import { GetCookie, RemoveCookie, SaveCookie } from "../config/cookie";
interface storeT {
  user: UserT | null;
  token: string | null;
  isLogged: boolean;
  logIn: ({ user, data }: { user: UserT; data: TokenData }) => void;
  logOut: () => void;
}

export const useAuthStore = create<storeT>()((set) => ({
  user:
    (GetCookie(CookiesEnum.LOGIN_USER) && GetCookie(CookiesEnum.LOGIN_USER)) ||
    null,
  token: Cookie.get(CookiesEnum.ACCESS_TOKEN) as string,
  isLogged: !!Cookie.get(CookiesEnum.ACCESS_TOKEN),
  logIn: ({ user, data }: { user: UserT; data: TokenData }) => {
    SaveCookie(CookiesEnum.LOGIN_USER, user, data.access_token_expire);
    Cookie.set(CookiesEnum.ACCESS_TOKEN, data.accessToken);
    set({ user, token: data.accessToken, isLogged: true });
  },
  logOut: () => {
    RemoveCookie(CookiesEnum.LOGIN_USER);
    RemoveCookie(CookiesEnum.ACCESS_TOKEN);
    set({ user: null, token: null, isLogged: false });
  },
}));
