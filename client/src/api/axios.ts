import axios from "axios";
import { type User } from "../schemas/DbSchema";

let onUserRefresh: ((user: User) => void) | null = null;
export function setUserRefreshHandler(fn: (user: User) => void) {
  onUserRefresh = fn;
}

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

api.interceptors.response.use(
  (res) => res,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && error.response.data?.message === "ACCESS_EXPIRED") {

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const userInfo = await api.post("/refresh");
          onUserRefresh?.(userInfo.data);

          isRefreshing = false;
          pendingRequests.forEach((cb) => cb());
          pendingRequests = [];

          return api(originalRequest);

        } catch (err) {
          isRefreshing = false;
          pendingRequests = [];

          if (error.config.url !== "/me") {
            window.location.href = "/login";
          }
          return Promise.reject(err);
        }
      }

      return new Promise((resolve) => {
        pendingRequests.push(() => resolve(api(originalRequest)));
      });
    }

    if (error.response?.status === 401) {
      if (error.config.url !== "/me") {
        window.location.href = "/login";
      }
    }


    return Promise.reject(error);
  }
);
