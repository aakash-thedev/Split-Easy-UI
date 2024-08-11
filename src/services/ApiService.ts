import axios, { AxiosInstance } from "axios";
import environment from "../environments/environment";
import { JWT_TOKEN, getCookie, removeCookie } from "./cookieService";
import { Subject } from "rxjs";

// Created a Singleton Api Service class so we use a single Instance always
const ApiService = (() => {
  let instance: { loadingSubject: Subject<boolean>; client: AxiosInstance };

  function createInstance() {
    const loadingSubject = new Subject<boolean>();
    const customApiService = axios.create({
      baseURL: environment.baseUrl,
    });
    customApiService.interceptors.request.use((config) => {
      loadingSubject.next(true);
      config.headers["Authorization"] = `Bearer ${getCookie(JWT_TOKEN)}`;
      return config;
    });
    customApiService.interceptors.response.use(
      (response) => {
        setTimeout(() => {
          loadingSubject.next(false);
        }, 1000);
        return response;
      },
      (error) => {
        loadingSubject.next(false);
        return Promise.reject(error);
      },
    );
    return {
      loadingSubject,
      client: customApiService,
    };
  }

  return () => {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  };
})();

export default ApiService;
