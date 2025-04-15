import axios from "axios";
import Cookie from "js-cookie";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { GetCookie } from "./cookie";
import { CookiesEnum } from "../common/enum";

export const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

request.interceptors.request.use((config) => {
  if (config.url !== "/auth/refresh") {
    const accessToken = Cookie.get(CookiesEnum.ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

const refreshAuthLogic = async (failedRequest: {
  response: { config: { headers: { [x: string]: string } } };
}) => {
  try {
    const response = await request.post(
      "/auth/refresh",
      GetCookie(CookiesEnum.REFRESH_TOKEN)
    );
    const newAccessToken = response.data.accessToken;
    Cookie.set(CookiesEnum.ACCESS_TOKEN, newAccessToken);
    failedRequest.response.config.headers[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;
    return Promise.resolve();
  } catch (err) {
    Cookie.remove(CookiesEnum.ACCESS_TOKEN);
    Cookie.remove(CookiesEnum.REFRESH_TOKEN);
    console.error("Error refreshing access token:", err);
    window.location.href = "/login";
    return Promise.reject(err);
  }
};

createAuthRefreshInterceptor(request, refreshAuthLogic, {
  statusCodes: [401],
});
